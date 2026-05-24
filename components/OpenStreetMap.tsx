"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function OpenStreetMap({ points }: { points: any[] }) {
  const validPoints = points.filter((p) => p.latitude && p.longitude);

  const center =
    validPoints.length > 0
      ? [validPoints[0].latitude, validPoints[0].longitude]
      : [55.755864, 37.617698];

  return (
    <div className="min-h-[620px] rounded-[42px] overflow-hidden">
      <MapContainer
        center={center as [number, number]}
        zoom={12}
        scrollWheelZoom={false}
        className="h-[620px] w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {validPoints.map((point) => (
          <Marker
            key={point.id}
            position={[point.latitude, point.longitude]}
            icon={markerIcon}
          >
            <Popup>
              <b>{point.title}</b>
              <br />
              {point.address}
              <br />
              {point.hours}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}