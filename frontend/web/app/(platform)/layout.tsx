import { PlatformNav } from "../../features/platform/components/platform-nav";
import { PlatformSessionStatus } from "../../features/platform/components/platform-session-status";

export default function PlatformLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="platform-shell">
      <header className="platform-header">
        <div className="platform-header-inner">
          <div className="platform-header-main">
            <div className="brand-block">
              <h1 className="brand-title">供应链寻源课程学习平台</h1>
            </div>

            <PlatformNav />
          </div>

          <div className="platform-header-tools">
            <PlatformSessionStatus />
          </div>
        </div>
      </header>

      <main className="platform-body">{children}</main>

      <footer className="site-icp">
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
          沪ICP备2024080226号
        </a>
      </footer>
    </div>
  );
}
