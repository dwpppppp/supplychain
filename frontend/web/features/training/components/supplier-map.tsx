"use client";

import { useEffect } from "react";
import L, { type LatLngBoundsExpression } from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

import type { TrainingSupplier } from "../api/training";

type SupplierLeafletMapProps = {
  suppliers: TrainingSupplier[];
  selectedSupplierCode: string | null;
  onSelectSupplier: (supplierCode: string | null) => void;
};

function supplierLatLng(supplier: TrainingSupplier): [number, number] {
  return [Number(supplier.latitude ?? 35), Number(supplier.longitude ?? 105)];
}

function supplierMarkerIcon(code?: string | null, active = false) {
  return L.divIcon({
    className: "",
    iconSize: [34, 42],
    iconAnchor: [17, 42],
    html: `<span class="jam-leaflet-pin${active ? " is-active" : ""}"><b>${code ?? ""}</b></span>`,
  });
}

function SupplierMapBounds({ suppliers }: { suppliers: TrainingSupplier[] }) {
  const map = useMap();

  useEffect(() => {
    if (!suppliers.length) return;
    const bounds = suppliers.map(supplierLatLng) as LatLngBoundsExpression;
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 7 });
  }, [map, suppliers]);

  return null;
}

export function SupplierLeafletMap({
  suppliers,
  selectedSupplierCode,
  onSelectSupplier,
}: SupplierLeafletMapProps) {
  return (
    <MapContainer
      className="jam-leaflet-map"
      center={[35.8617, 104.1954]}
      zoom={4}
      minZoom={3}
      maxZoom={12}
      scrollWheelZoom
      zoomControl
      attributionControl={false}
    >
      <TileLayer
        url="https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
        subdomains={["1", "2", "3", "4"]}
      />
      <SupplierMapBounds suppliers={suppliers} />
      {suppliers.map((supplier) => (
        <Marker
          key={supplier.id}
          position={supplierLatLng(supplier)}
          icon={supplierMarkerIcon(supplier.code, selectedSupplierCode === supplier.code)}
          eventHandlers={{
            click: () => onSelectSupplier(supplier.code ?? null),
          }}
          title={`${supplier.code ?? ""} ${supplier.name}`}
        />
      ))}
    </MapContainer>
  );
}
