import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Route } from "@/lib/data";
import { Link } from "wouter";
import { Icon } from "leaflet";
import { useEffect } from "react";

// Fix Leaflet default icon issue in React
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface MapComponentProps {
  routes: Route[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  interactive?: boolean;
}

function MapController({ center, zoom }: { center?: [number, number], zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || 10);
    }
  }, [center, zoom, map]);
  return null;
}

export default function MapComponent({ 
  routes, 
  center = [40.8, 48.0], 
  zoom = 8, 
  height = "100%",
  interactive = true
}: MapComponentProps) {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-inner border border-border" style={{ height }}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={interactive}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController center={center} zoom={zoom} />
        {routes.map((route) => (
          <Marker key={route.id} position={route.coordinates}>
            <Popup>
              <div className="min-w-[150px] p-1">
                <h3 className="font-bold text-base mb-1">{route.name}</h3>
                <div className="text-xs text-gray-600 mb-2">
                  {route.distance_km} km • {route.difficulty}
                </div>
                <Link href={`/route/${route.id}`}>
                  <a className="block w-full text-center bg-primary text-white text-xs py-1.5 rounded hover:bg-primary/90">
                    View Details
                  </a>
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
