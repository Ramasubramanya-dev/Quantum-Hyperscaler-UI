// src/pages/optimization/FleetPlanning/Map/MapView.jsx
import React, { useEffect, useRef, useState } from "react";
import styles from "./MapView.module.css";
import {
  MapContainer, TileLayer, CircleMarker, Tooltip, Polyline, Marker, useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import FloatingParams from "./FloatingParams";
import { on } from "../../../../lib/eventBus";
import { getProblemCities } from "../../../../store/problemStore";

/* --- helpers --- */
function FitToAll({ depots, routes }) {
  const map = useMap();
  useEffect(() => {
    const latlngs = [];
    depots?.forEach(p => latlngs.push([p.lat, p.lng]));
    routes?.forEach(rt => rt.latlngs?.forEach(ll => latlngs.push(ll)));
    if (!latlngs.length) return;
    map.fitBounds(L.latLngBounds(latlngs), { padding: [40, 40] });
  }, [depots, routes, map]);
  return null;
}

function UseInvalidateOnLayout() {
  const map = useMap();
  useEffect(() => {
    const off = on("layout:changed", () => setTimeout(() => map.invalidateSize(), 0));
    setTimeout(() => map.invalidateSize(), 0); // initial
    return () => off && off();
  }, [map]);
  return null;
}

// tiny arrow icons
function makeArrowIcon(color = "#fff", angle = 0) {
  const size = 10;
  const html = `<div style="
    transform: rotate(${angle}deg);
    width:0;height:0;border-left:${size/2}px solid transparent;
    border-right:${size/2}px solid transparent;border-top:${size}px solid ${color};
    transform-origin:50% 50%;
  "></div>`;
  return L.divIcon({ html, className: "", iconSize: [size, size] });
}
const toRad = d => (d * Math.PI) / 180;
const toDeg = r => (r * 180) / Math.PI;
function bearing(a, b) {
  const [lat1, lon1] = a, [lat2, lon2] = b;
  const y = Math.sin(toRad(lon2 - lon1)) * Math.cos(toRad(lat2));
  const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
            Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(toRad(lon2 - lon1));
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}
const interp = (a, b, t) => [a[0] + (b[0]-a[0])*t, a[1] + (b[1]-a[1])*t];

export default function MapView() {
  const cardRef = useRef(null);
  const [depots, setDepots] = useState([]);
  const [routes, setRoutes] = useState([]);
  const centerUSA = [39.8283, -98.5795];

  const handleGenerate = (payload) => {
    // Prefer the fresh list sent from FloatingParams
    if (payload && Array.isArray(payload.cities)) {
      setDepots(payload.cities);
      return;
    }
    // Fallback: read from the store
    const list = getProblemCities();
    setDepots(Array.isArray(list) ? list : []);
    
  };

  const buildRoutes = (trucks) => {
    const cities = getProblemCities();
    return trucks.map((t) => {
      const latlngs = t.nodes
        .map(idx => cities[idx - 1])
        .filter(Boolean)
        .map(c => [c.lat, c.lng]);

      const arrows = [];
      for (let i = 0; i < latlngs.length - 1; i++) {
        const a = latlngs[i], b = latlngs[i+1];
        [0.6, 0.85].forEach(tt => {
          const pos = interp(a, b, tt);
          const angle = (bearing(a, b) + 180) % 360;
          arrows.push({ pos, angle, color: t.color || "#fff" });
        });
      }
      return { ...t, latlngs, arrows };
    });
  };

  useEffect(() => {
    const offSet = on("routes:set", (trucks) => setRoutes(buildRoutes(trucks)));
    const offToggle = on("route:toggle", ({ id, visible }) =>
      setRoutes(rs => rs.map(r => (r.id === id ? { ...r, visible } : r)))
    );
    return () => { offSet(); offToggle(); };
  }, []);

  const cityColorMap = {};
  routes.forEach(rt => {
    if (rt.visible && rt.latlngs) rt.nodes?.forEach(id => { cityColorMap[id] = rt.color; });
  });

  return (
    <div className={styles.card} ref={cardRef}>
      <FloatingParams parentRef={cardRef} onGenerate={handleGenerate} />

      {/* SINGLE MapContainer, full-bleed */}
      <MapContainer
        center={centerUSA}
        zoom={4}
        scrollWheelZoom
        className={styles.map}
      >
        <UseInvalidateOnLayout />
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {depots.map(p => (
          <CircleMarker
            key={`d-${p.id ?? `${p.lat},${p.lng}`}`}
            center={[p.lat, p.lng]}
            radius={6}
            pathOptions={{
              color: "#000", weight: 1,
              fillColor: cityColorMap[p.id] || "#ffcc00", fillOpacity: 1
            }}
          >
            <Tooltip direction="top" offset={[0, -6]} opacity={0.9}>
              <div style={{ fontWeight: 700 }}>#{p.id ?? "?"} — {p.name}</div>
              {"demand" in p && <div>Demand: {p.demand}</div>}
            </Tooltip>
          </CircleMarker>
        ))}

        {routes.map(rt => (
          rt.visible && rt.latlngs.length > 1 ? (
            <React.Fragment key={`rt-${rt.id}`}>
              <Polyline positions={rt.latlngs} pathOptions={{ color: rt.color, weight: 4, opacity: 0.9 }} />
              {rt.arrows.map((a, i) => (
                <Marker key={`arr-${rt.id}-${i}`} position={a.pos} icon={makeArrowIcon(rt.color, a.angle)} />
              ))}
            </React.Fragment>
          ) : null
        ))}

        <FitToAll depots={depots} routes={routes} />
      </MapContainer>
    </div>
  );
}
