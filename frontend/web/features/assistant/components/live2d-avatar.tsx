"use client";

import { useEffect, useRef, useState } from "react";

import type { AssistantPresence } from "../types/chat";

const MODEL_URL = "/characters/Haru-2/Haru-2.model3.json";
const CORE_SCRIPT_URL = "/live2d/live2dcubismcore.min.js";
const PIXI_SCRIPT_URL =
  "https://cdn.jsdelivr.net/npm/pixi.js@7.4.3/dist/pixi.min.js";
const PIXI_LIVE2D_SCRIPT_URL =
  "https://cdn.jsdelivr.net/npm/pixi-live2d-display@0.4.0/dist/cubism4.min.js";

type ScriptWindow = Window & {
  PIXI?: {
    Application: new (options: Record<string, unknown>) => PixiApplication;
    live2d?: {
      Live2DModel?: {
        from: (
          modelUrl: string,
          options?: Record<string, unknown>,
        ) => Promise<Live2DModel>;
      };
    };
  };
  Live2DCubismCore?: unknown;
};

type PixiApplication = {
  renderer: {
    resize: (width: number, height: number) => void;
  };
  stage: {
    addChild: (child: Live2DModel) => void;
  };
  view: HTMLCanvasElement;
  destroy: (removeView?: boolean, options?: Record<string, unknown>) => void;
};

type Live2DModel = {
  scale: { set: (value: number) => void };
  pivot: { set: (x: number, y: number) => void };
  position: { set: (x: number, y: number) => void };
  getLocalBounds: () => {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  motion?: (group: string, index?: number) => void;
  expression?: (name: string) => void;
  destroy?: (options?: Record<string, unknown>) => void;
  eventMode?: string;
  cursor?: string;
};

const scriptPromises = new Map<string, Promise<void>>();

function loadScript(src: string, test: () => boolean) {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (test()) {
    return Promise.resolve();
  }

  const existingPromise = scriptPromises.get(src);
  if (existingPromise) {
    return existingPromise;
  }

  const promise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-src="${src}"]`,
    );

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error(`Failed to load script: ${src}`)),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });

  scriptPromises.set(src, promise);
  return promise;
}

async function ensureLive2DScripts() {
  const globalWindow = window as ScriptWindow;

  await loadScript(CORE_SCRIPT_URL, () => Boolean(globalWindow.Live2DCubismCore));
  await loadScript(
    PIXI_SCRIPT_URL,
    () => Boolean(globalWindow.PIXI?.Application),
  );
  await loadScript(
    PIXI_LIVE2D_SCRIPT_URL,
    () => Boolean(globalWindow.PIXI?.live2d?.Live2DModel),
  );
}

function applyPresenceMotion(model: Live2DModel, presence: AssistantPresence) {
  if (presence === "thinking") {
    model.expression?.("coldness");
    model.motion?.("Idle", 3);
    return;
  }

  if (presence === "speaking") {
    model.expression?.("happy-01");
    model.motion?.("TapBody", 8);
    return;
  }

  if (presence === "error") {
    model.expression?.("sad");
    model.motion?.("TapBody", 24);
    return;
  }

  model.expression?.("smile");
  model.motion?.("Idle", 0);
}

type Live2DAvatarProps = {
  presence: AssistantPresence;
};

export function Live2DAvatar({ presence }: Live2DAvatarProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<PixiApplication | null>(null);
  const modelRef = useRef<Live2DModel | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const lastPresenceRef = useRef<AssistantPresence | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let disposed = false;

    const fitModel = () => {
      const stageElement = stageRef.current;
      const app = appRef.current;
      const model = modelRef.current;

      if (!stageElement || !app || !model) {
        return;
      }

      const { width, height } = stageElement.getBoundingClientRect();
      app.renderer.resize(width, height);

      const bounds = model.getLocalBounds();
      const safeWidth = Math.max(bounds.width, 1);
      const safeHeight = Math.max(bounds.height, 1);
      const availableWidth = width * 1.24;
      const availableHeight = height * 1.62;
      const scale = Math.min(
        availableWidth / safeWidth,
        availableHeight / safeHeight,
      );

      model.scale.set(scale);
      model.pivot.set(bounds.x + safeWidth / 2, bounds.y + safeHeight);
      model.position.set(width * 0.52, height * 1.65);
    };

    const init = async () => {
      const stageElement = stageRef.current;
      if (!stageElement) {
        return;
      }

      setStatus("loading");
      setErrorMessage(null);

      try {
        await ensureLive2DScripts();

        if (disposed) {
          return;
        }

        const globalWindow = window as ScriptWindow;
        const Application = globalWindow.PIXI?.Application;
        const Live2DModelFactory = globalWindow.PIXI?.live2d?.Live2DModel;

        if (!Application || !Live2DModelFactory) {
          throw new Error("PIXI or pixi-live2d-display is unavailable");
        }

        const app = new Application({
          resizeTo: stageElement,
          autoDensity: true,
          antialias: true,
          backgroundAlpha: 0,
        });

        stageElement.innerHTML = "";
        stageElement.appendChild(app.view);

        const model = await Live2DModelFactory.from(MODEL_URL, {
          autoInteract: false,
        });

        if (disposed) {
          app.destroy(true, { children: true });
          model.destroy?.({ children: true });
          return;
        }

        model.eventMode = "none";
        model.cursor = "default";
        app.stage.addChild(model);

        appRef.current = app;
        modelRef.current = model;

        fitModel();
        applyPresenceMotion(model, presence);
        lastPresenceRef.current = presence;
        setStatus("ready");

        if (typeof ResizeObserver !== "undefined") {
          resizeObserverRef.current = new ResizeObserver(() => {
            fitModel();
          });
          resizeObserverRef.current.observe(stageElement);
        } else {
          window.addEventListener("resize", fitModel);
        }
      } catch (error) {
        if (disposed) {
          return;
        }

        setStatus("error");
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Failed to initialize Live2D",
        );
      }
    };

    void init();

    return () => {
      disposed = true;
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      window.removeEventListener("resize", fitModel);
      modelRef.current?.destroy?.({ children: true });
      appRef.current?.destroy(true, { children: true });
      modelRef.current = null;
      appRef.current = null;
    };
  }, []);

  useEffect(() => {
    const model = modelRef.current;
    if (!model) {
      return;
    }

    if (lastPresenceRef.current === presence) {
      return;
    }

    applyPresenceMotion(model, presence);
    lastPresenceRef.current = presence;
  }, [presence]);

  return (
    <div className={`assistant-live2d-shell is-${status}`}>
      <div ref={stageRef} className="assistant-live2d-stage" />

      {status === "loading" ? (
        <div className="assistant-live2d-overlay">Loading Live2D...</div>
      ) : null}

      {status === "error" ? (
        <div className="assistant-live2d-overlay is-error">
          {errorMessage || "Failed to load Live2D"}
        </div>
      ) : null}
    </div>
  );
}
