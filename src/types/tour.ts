export type ViewMode =
  | 'DRONE_OVERVIEW'
  | 'ROOFTOP_TERRACE'
  | 'BALCONY_PANORAMA'
  | 'APARTMENT_INTERIOR';

export type NavigationMode = 'ORBIT' | 'FIRST_PERSON';

export type ApartmentTier =
  | 'EXECUTIVE_SUITE'
  | '2_BED_LUXURY'
  | 'SKY_PENTHOUSE';

export type RoomType =
  | 'FOYER'
  | 'LIVING_ROOM'
  | 'KITCHENETTE'
  | 'MASTER_SUITE'
  | 'EXECUTIVE_DESK'
  | 'BALCONY_DECK'
  | 'ROOFTOP_LOUNGE';

export type WeatherMode =
  | 'MORNING_MIST'
  | 'GOLDEN_HOUR'
  | 'SNOWY_WINTER';

export interface CameraPose {
  position: [number, number, number];
  target: [number, number, number];
  fov?: number;
  minDistance?: number;
  maxDistance?: number;
}

export interface Hotspot {
  id: string;
  title: string;
  category: 'AMENITY' | 'VIEW' | 'INTERIOR' | 'ENGINEERING';
  tagline: string;
  description: string;
  specs?: string[];
  position: [number, number, number];
  targetViewMode?: ViewMode;
  targetRoom?: RoomType;
}

export interface ApartmentDetails {
  id: ApartmentTier;
  name: string;
  tagline: string;
  sqft: number;
  beds: string;
  baths: string;
  level: string;
  hotelModel: string;
  rentalYield: string;
  features: string[];
  pricePKR: string;
  downPayment: string;
  quarterlyInstallment: string;
}

export interface CinematicStep {
  title: string;
  subtitle: string;
  description: string;
  viewMode: ViewMode;
  room?: RoomType;
  cameraPose: CameraPose;
  durationSeconds: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'EXTERIOR' | 'BLUEPRINT' | 'FLOORPLAN';
  description: string;
  specs?: string;
  imageSvgType: 'EXTERIOR' | 'BLUEPRINT' | 'FLOORPLAN';
}
