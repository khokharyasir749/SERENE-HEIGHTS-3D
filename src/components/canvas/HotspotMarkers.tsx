import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { OFFICIAL_AMENITIES_DATA, useTourStore } from '../../store/useTourStore';
import type { Hotspot } from '../../types/tour';
import {
  Sparkles,
  Mountain,
  Flame,
  Zap,
  Car,
  ArrowUpDown,
  Home,
} from 'lucide-react';

export const HotspotMarkers: React.FC = () => {
  const activeViewMode = useTourStore((state) => state.activeViewMode);
  const setSelectedAmenity = useTourStore((state) => state.setSelectedAmenity);

  // Show 3D spatial badges during Drone Overview or Rooftop terrace mode
  if (activeViewMode !== 'DRONE_OVERVIEW' && activeViewMode !== 'ROOFTOP_TERRACE') {
    return null;
  }

  return (
    <group>
      {OFFICIAL_AMENITIES_DATA.map((amenity) => (
        <SingleAmenityBadge
          key={amenity.id}
          amenity={amenity}
          onSelect={() => setSelectedAmenity(amenity)}
        />
      ))}
    </group>
  );
};

const SingleAmenityBadge: React.FC<{ amenity: Hotspot; onSelect: () => void }> = ({
  amenity,
  onSelect,
}) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() * 2 + amenity.position[0];
      meshRef.current.position.y = amenity.position[1] + Math.sin(t) * 0.35;
    }
  });

  const getIcon = () => {
    switch (amenity.id) {
      case 'amenity-altitude':
        return <Mountain className="w-3.5 h-3.5 text-amber-300" />;
      case 'amenity-hotel-model':
        return <Home className="w-3.5 h-3.5 text-emerald-300" />;
      case 'amenity-climate':
        return <Zap className="w-3.5 h-3.5 text-amber-400" />;
      case 'amenity-rooftop-bbq':
        return <Flame className="w-3.5 h-3.5 text-orange-400" />;
      case 'amenity-parking':
        return <Car className="w-3.5 h-3.5 text-cyan-300" />;
      case 'amenity-elevators':
        return <ArrowUpDown className="w-3.5 h-3.5 text-purple-300" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-amber-300" />;
    }
  };

  return (
    <group ref={meshRef} position={amenity.position}>
      <Html center distanceFactor={35}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-950/90 backdrop-blur-xl border border-amber-400/50 text-xs font-semibold text-amber-100 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:scale-110 hover:border-amber-300 hover:bg-slate-900 transition-all duration-300 cursor-pointer pointer-events-auto whitespace-nowrap"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          {getIcon()}
          <span>{amenity.title}</span>
        </button>
      </Html>
    </group>
  );
};
