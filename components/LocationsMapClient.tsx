"use client";

import dynamic from "next/dynamic";

const OpenStreetMap = dynamic(() => import("@/components/OpenStreetMap"), {
  ssr: false,
});

export default function LocationsMapClient({ points }: { points: any[] }) {
  return <OpenStreetMap points={points} />;
}