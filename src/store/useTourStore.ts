import { create } from 'zustand';
import type {
  ViewMode,
  NavigationMode,
  ApartmentTier,
  RoomType,
  WeatherMode,
  CameraPose,
  Hotspot,
  ApartmentDetails,
  CinematicStep,
} from '../types/tour';

// Exact camera poses for official hotel apartment vantage points
export const CAMERA_POSES: Record<string, CameraPose> = {
  // 1. Drone Valley Overview
  DRONE_OVERVIEW: {
    position: [42, 32, 46],
    target: [0, 8, 0],
    fov: 48,
    minDistance: 15,
    maxDistance: 120,
  },
  // 2. Rooftop Sky Lounge & Fine Dining BBQ Terrace
  ROOFTOP_TERRACE: {
    position: [0, 21.2, 4.2],
    target: [0, 20.8, -18],
    fov: 55,
    minDistance: 1.5,
    maxDistance: 35,
  },
  // 3. Cantilevered Balcony Panorama
  BALCONY_PANORAMA: {
    position: [5.2, 12.25, 8.4],
    target: [14.0, 12.0, 36.0],
    fov: 62,
    minDistance: 1.0,
    maxDistance: 25,
  },
  // 4. Official Hotel Suite Room Vantage Points
  'APARTMENT_INTERIOR:FOYER': {
    position: [1.2, 12.25, -4.5],
    target: [2.5, 12.1, 2.0],
    fov: 60,
    minDistance: 1.0,
    maxDistance: 18,
  },
  'APARTMENT_INTERIOR:LIVING_ROOM': {
    position: [2.2, 12.25, 2.8],
    target: [4.8, 12.2, 12.0],
    fov: 60,
    minDistance: 1.0,
    maxDistance: 18,
  },
  'APARTMENT_INTERIOR:KITCHENETTE': {
    position: [-0.8, 12.25, -2.8],
    target: [2.8, 12.2, -3.8],
    fov: 62,
    minDistance: 1.0,
    maxDistance: 18,
  },
  'APARTMENT_INTERIOR:MASTER_SUITE': {
    position: [-4.2, 12.25, 2.6],
    target: [-2.0, 12.2, 10.0],
    fov: 60,
    minDistance: 1.0,
    maxDistance: 18,
  },
  'APARTMENT_INTERIOR:EXECUTIVE_DESK': {
    position: [-5.4, 12.25, -1.8],
    target: [-5.4, 12.1, 8.0],
    fov: 62,
    minDistance: 1.0,
    maxDistance: 18,
  },
  'APARTMENT_INTERIOR:BALCONY_DECK': {
    position: [5.2, 12.25, 8.4],
    target: [8.0, 12.0, 42.0],
    fov: 65,
    minDistance: 0.8,
    maxDistance: 22,
  },
  'APARTMENT_INTERIOR:ROOFTOP_LOUNGE': {
    position: [0, 21.2, 4.2],
    target: [0, 20.8, -25.0],
    fov: 58,
    minDistance: 1.2,
    maxDistance: 35,
  },
};

// Official 5-Stage Guided Cinematic Auto-Tour Sequence
export const CINEMATIC_TOUR_STAGES: CinematicStep[] = [
  {
    title: 'SERENE HEIGHTS NATHIA GALI',
    subtitle: 'High-Altitude Alpine Sanctuary (7,906 FT)',
    description: 'Nestled on the pine-clad peaks of Nathia Gali, offering 360° unobstructed views of Mukshpuri and Miranjani mountain ranges.',
    viewMode: 'DRONE_OVERVIEW',
    cameraPose: {
      position: [48, 36, 52],
      target: [0, 10, 0],
      fov: 46,
    },
    durationSeconds: 7,
  },
  {
    title: 'ROOFTOP SKY DINING & FIRE PIT',
    subtitle: 'Open-Air Alpine Lounge & BBQ Deck',
    description: 'Panoramic outdoor heated sky lounge featuring live BBQ stations, cedar pergolas, and glowing fire pits at 7,906 FT.',
    viewMode: 'ROOFTOP_TERRACE',
    cameraPose: {
      position: [0, 21.2, 4.5],
      target: [0, 20.8, -22.0],
      fov: 58,
    },
    durationSeconds: 7,
  },
  {
    title: 'EXECUTIVE SERVICED SUITE',
    subtitle: 'Bespoke Luxury Living & Electric Fireplace',
    description: 'Fully furnished hotel apartment with warm oak acoustic paneling, linear glass fireplace, Calacatta marble island, and floor-to-ceiling vista glazing.',
    viewMode: 'APARTMENT_INTERIOR',
    room: 'LIVING_ROOM',
    cameraPose: {
      position: [2.2, 12.25, 2.6],
      target: [4.8, 12.2, 12.0],
      fov: 60,
    },
    durationSeconds: 7,
  },
  {
    title: 'MASTER BEDROOM SUITE',
    subtitle: 'King Suite with Bedside Pine Vista',
    description: 'Ergonomic plush king bed with emerald velvet tufting, solid walnut platform, brass pendant sconces, and panoramic morning vistas.',
    viewMode: 'APARTMENT_INTERIOR',
    room: 'MASTER_SUITE',
    cameraPose: {
      position: [-4.2, 12.25, 2.5],
      target: [-1.8, 12.2, 11.0],
      fov: 60,
    },
    durationSeconds: 7,
  },
  {
    title: 'CANTILEVERED PRIVATE BALCONY',
    subtitle: '180° Uninhibited Valley Panorama',
    description: 'Step onto the private cedar balcony overlooking Mukshpuri ridge, with crystal clear glass balustrades floating above the pine mist.',
    viewMode: 'BALCONY_PANORAMA',
    room: 'BALCONY_DECK',
    cameraPose: {
      position: [5.2, 12.25, 8.4],
      target: [8.0, 12.0, 42.0],
      fov: 65,
    },
    durationSeconds: 8,
  },
];

// Official Apartment Typologies from sereneheightsnathiagali.com
export const APARTMENT_TIERS_INFO: Record<ApartmentTier, ApartmentDetails> = {
  EXECUTIVE_SUITE: {
    id: 'EXECUTIVE_SUITE',
    name: 'Executive Serviced Hotel Suite',
    tagline: 'Fully Furnished Luxury Studio Suite with Private Mountain Balcony',
    sqft: 550,
    beds: '1 King Bed Suite',
    baths: '1 Luxury Spa Bath',
    level: 'Levels 2 to 5',
    hotelModel: 'Managed Hotel Rental Pool Program',
    rentalYield: 'Estimated 14% – 18% Annual Rental ROI',
    features: [
      'Full hotel furniture & electronic appliances included',
      'Floor-to-ceiling double-glazed alpine vista balcony doors',
      'Integrated underfloor heating & smart climate system',
      'Designer kitchenette station with granite countertop',
      'Quarterly rental revenue dividend distribution',
    ],
    pricePKR: 'PKR 1.65 Crore',
    downPayment: 'PKR 41.25 Lakh (25%)',
    quarterlyInstallment: 'PKR 10.31 Lakh (12 Quarters)',
  },
  '2_BED_LUXURY': {
    id: '2_BED_LUXURY',
    name: '2-Bedroom Luxury Serviced Residence',
    tagline: 'Expansive Dual-Aspect Suite with Panoramic Valley Balcony',
    sqft: 950,
    beds: '2 Executive Bedrooms',
    baths: '2 Ensuite Designer Baths',
    level: 'Levels 5 to 7',
    hotelModel: 'Managed Hotel Rental Pool Program',
    rentalYield: 'Estimated 15% – 19% Annual Rental ROI',
    features: [
      'Corner layout with 180° dual-orientation mountain views',
      'Spacious living & dining lounge with electric fireplace',
      'Two master suites with bespoke walnut hotel cabinetry',
      'High rental demand for luxury family vacationers',
      'Full concierge, housekeeping & 24/7 room service',
    ],
    pricePKR: 'PKR 2.85 Crore',
    downPayment: 'PKR 71.25 Lakh (25%)',
    quarterlyInstallment: 'PKR 17.81 Lakh (12 Quarters)',
  },
  SKY_PENTHOUSE: {
    id: 'SKY_PENTHOUSE',
    name: 'Royal Sky Penthouse Suite',
    tagline: 'Crown Jewel Duplex with Direct Sky Deck & Fireplace Lounge',
    sqft: 1850,
    beds: '3 King Suites + Lounge',
    baths: '3.5 Designer Baths',
    level: 'Top Floor (Level 8 & Sky Terrace)',
    hotelModel: 'Exclusive Presidential Rental & Private Use',
    rentalYield: 'High-Yield Ultra-Luxury Flagship Suite',
    features: [
      'Cathedral double-height living room with timber beam detailing',
      'Private access to open-air rooftop BBQ & fire pit terrace',
      'Bespoke Italian marble finishes and acoustic oak paneling',
      'Direct priority elevator keycard access',
      'Highest residential elevation in Nathia Gali (7,906 FT)',
    ],
    pricePKR: 'PKR 5.50 Crore',
    downPayment: 'PKR 1.37 Crore (25%)',
    quarterlyInstallment: 'PKR 34.37 Lakh (12 Quarters)',
  },
};

// Official Project Amenity Badges (sereneheightsnathiagali.com)
export const OFFICIAL_AMENITIES_DATA: Hotspot[] = [
  {
    id: 'amenity-altitude',
    title: '7,906 FT Elevation',
    category: 'VIEW',
    tagline: 'Pure Alpine Atmosphere in Nathia Gali',
    description: 'Perched at one of the highest vantage points in Galiyat, offering unobstructed vistas of Mukshpuri & Miranjani pine ranges and crisp Himalayan air.',
    specs: ['7,906 FT Above Sea Level', '360° Pine Ridge Vistas', 'Cool Summer Retreat (14°C - 20°C)'],
    position: [-22, 28, -25],
    targetViewMode: 'DRONE_OVERVIEW',
  },
  {
    id: 'amenity-hotel-model',
    title: 'Fully Furnished Serviced Suites',
    category: 'INTERIOR',
    tagline: 'Turnkey Luxury with Professional Hotel Management',
    description: 'Delivered 100% turnkey with premium hotel furniture, electronics, and hotel-grade linens. Professionally managed with hassle-free rental returns for investors.',
    specs: ['Turnkey Hotel Furnishing', 'Full Property Management', 'Quarterly Revenue Sharing'],
    position: [0, 11.5, 9.5],
    targetViewMode: 'APARTMENT_INTERIOR',
    targetRoom: 'LIVING_ROOM',
  },
  {
    id: 'amenity-climate',
    title: '24/7 Power Backup & Central Heating',
    category: 'ENGINEERING',
    tagline: 'Uninterrupted Alpine Warmth & Comfort',
    description: 'Engineered for sub-zero alpine winters with dedicated heavy-duty backup generators and energy-efficient radiant underfloor central heating throughout all residences.',
    specs: ['100% Redundant Backup Power', 'Central Radiant Heating', 'European Double Glazed Windows'],
    position: [18, 5, 12],
    targetViewMode: 'DRONE_OVERVIEW',
  },
  {
    id: 'amenity-rooftop-bbq',
    title: 'Rooftop BBQ & Sky Dining Lounge',
    category: 'AMENITY',
    tagline: 'Open-Air Fine Dining at 7,906 FT',
    description: 'Panoramic open-air rooftop sky deck featuring outdoor heated fire pits, live BBQ stations, and lounge seating overlooking the Nathia Gali pine forest.',
    specs: ['Live BBQ & Fine Dining', 'Heated Outdoor Fire Pits', 'Panoramic Sunset Views'],
    position: [0, 21.5, 0],
    targetViewMode: 'ROOFTOP_TERRACE',
  },
  {
    id: 'amenity-parking',
    title: 'Covered Multi-Level Parking',
    category: 'ENGINEERING',
    tagline: 'Secure All-Weather Heated Parking',
    description: 'Dedicated multi-level covered parking garage with heated ramp access ensuring your vehicles are protected from snow, rain, and winter frost.',
    specs: ['Secure Multi-Level Bays', 'Heated Access Ramps', '24/7 CCTV & Valet Service'],
    position: [-16, -1.5, 15],
    targetViewMode: 'DRONE_OVERVIEW',
  },
  {
    id: 'amenity-elevators',
    title: 'High-Speed Passenger Elevators',
    category: 'ENGINEERING',
    tagline: 'Seamless Access Across All Floors',
    description: 'High-capacity, smooth-ride passenger elevators with emergency automatic rescue devices and direct access from parking to the rooftop sky lounge.',
    specs: ['High-Speed Elevators', 'Direct Sky Deck Access', 'Automatic Rescue Device'],
    position: [8, 14, -8],
    targetViewMode: 'DRONE_OVERVIEW',
  },
];

interface TourState {
  // Active states
  activeViewMode: ViewMode;
  navigationMode: NavigationMode;
  selectedApartmentType: ApartmentTier;
  currentRoom: RoomType;
  weatherLightingMode: WeatherMode;
  audioAmbientMuted: boolean;
  isInquiryModalOpen: boolean;
  isInvestmentDrawerOpen: boolean;
  isFloorPlanOpen: boolean;
  isGalleryModalOpen: boolean;
  selectedAmenity: Hotspot | null;
  cameraTransitioning: boolean;

  // Cinematic Guided Auto-Tour State
  isCinematicTourActive: boolean;
  cinematicStageIndex: number;

  // Live Minimap Camera Tracking
  cameraPosition: [number, number, number];
  cameraYaw: number;

  // Scrollytelling Assembly State
  scrollProgress: number;
  activeAssemblySection: number;

  // Actions
  setScrollProgress: (progress: number) => void;
  setActiveAssemblySection: (section: number) => void;
  setViewMode: (mode: ViewMode) => void;
  setNavigationMode: (mode: NavigationMode) => void;
  setApartmentType: (tier: ApartmentTier) => void;
  setCurrentRoom: (room: RoomType) => void;
  stepOntoBalcony: () => void;
  setWeatherMode: (weather: WeatherMode) => void;
  toggleAudio: () => void;
  setAudioMuted: (muted: boolean) => void;
  setInquiryModalOpen: (open: boolean) => void;
  setInvestmentDrawerOpen: (open: boolean) => void;
  setFloorPlanOpen: (open: boolean) => void;
  setGalleryModalOpen: (open: boolean) => void;
  setSelectedAmenity: (amenity: Hotspot | null) => void;
  setCameraTransitioning: (transitioning: boolean) => void;
  updateCameraTelemetry: (pos: [number, number, number], yaw: number) => void;

  // Cinematic Tour Controls
  startCinematicTour: () => void;
  stopCinematicTour: () => void;
  nextCinematicStage: () => void;
  setCinematicStage: (index: number) => void;

  // Getters
  getCurrentCameraPose: () => CameraPose;
}

export const useTourStore = create<TourState>((set, get) => ({
  activeViewMode: 'DRONE_OVERVIEW',
  navigationMode: 'ORBIT',
  selectedApartmentType: 'EXECUTIVE_SUITE',
  currentRoom: 'LIVING_ROOM',
  weatherLightingMode: 'GOLDEN_HOUR',
  audioAmbientMuted: true,
  isInquiryModalOpen: false,
  isInvestmentDrawerOpen: false,
  isFloorPlanOpen: true,
  isGalleryModalOpen: false,
  selectedAmenity: null,
  cameraTransitioning: false,

  isCinematicTourActive: false,
  cinematicStageIndex: 0,

  scrollProgress: 0,
  activeAssemblySection: 0,

  cameraPosition: [42, 32, 46],
  cameraYaw: 0,

  setScrollProgress: (progress: number) => {
    set({ scrollProgress: progress });
  },

  setActiveAssemblySection: (section: number) => {
    set({ activeAssemblySection: section });
  },

  setViewMode: (mode: ViewMode) => {
    if (mode === 'DRONE_OVERVIEW') {
      set({ activeViewMode: mode, navigationMode: 'ORBIT', selectedAmenity: null });
    } else {
      set({ activeViewMode: mode, selectedAmenity: null });
    }
  },

  setNavigationMode: (mode: NavigationMode) => {
    set({ navigationMode: mode });
  },

  setApartmentType: (tier: ApartmentTier) => {
    set({ selectedApartmentType: tier });
  },

  setCurrentRoom: (room: RoomType) => {
    set({ currentRoom: room, activeViewMode: 'APARTMENT_INTERIOR', selectedAmenity: null });
  },

  stepOntoBalcony: () => {
    set({
      activeViewMode: 'APARTMENT_INTERIOR',
      currentRoom: 'BALCONY_DECK',
      selectedAmenity: null,
    });
  },

  setWeatherMode: (weather: WeatherMode) => {
    set({ weatherLightingMode: weather });
  },

  toggleAudio: () => {
    set((state) => ({ audioAmbientMuted: !state.audioAmbientMuted }));
  },

  setAudioMuted: (muted: boolean) => {
    set({ audioAmbientMuted: muted });
  },

  setInquiryModalOpen: (open: boolean) => {
    set({ isInquiryModalOpen: open });
  },

  setInvestmentDrawerOpen: (open: boolean) => {
    set({ isInvestmentDrawerOpen: open });
  },

  setFloorPlanOpen: (open: boolean) => {
    set({ isFloorPlanOpen: open });
  },

  setGalleryModalOpen: (open: boolean) => {
    set({ isGalleryModalOpen: open });
  },

  setSelectedAmenity: (amenity: Hotspot | null) => {
    set({ selectedAmenity: amenity });
  },

  setCameraTransitioning: (transitioning: boolean) => {
    set({ cameraTransitioning: transitioning });
  },

  updateCameraTelemetry: (pos: [number, number, number], yaw: number) => {
    set({ cameraPosition: pos, cameraYaw: yaw });
  },

  startCinematicTour: () => {
    const firstStage = CINEMATIC_TOUR_STAGES[0];
    set({
      isCinematicTourActive: true,
      cinematicStageIndex: 0,
      activeViewMode: firstStage.viewMode,
      currentRoom: firstStage.room || 'LIVING_ROOM',
      navigationMode: 'ORBIT',
      selectedAmenity: null,
    });
  },

  stopCinematicTour: () => {
    set({ isCinematicTourActive: false });
  },

  nextCinematicStage: () => {
    const { cinematicStageIndex } = get();
    const nextIndex = (cinematicStageIndex + 1) % CINEMATIC_TOUR_STAGES.length;
    const stage = CINEMATIC_TOUR_STAGES[nextIndex];
    set({
      cinematicStageIndex: nextIndex,
      activeViewMode: stage.viewMode,
      currentRoom: stage.room || 'LIVING_ROOM',
    });
  },

  setCinematicStage: (index: number) => {
    const stage = CINEMATIC_TOUR_STAGES[index];
    if (stage) {
      set({
        cinematicStageIndex: index,
        activeViewMode: stage.viewMode,
        currentRoom: stage.room || 'LIVING_ROOM',
      });
    }
  },

  getCurrentCameraPose: () => {
    const { activeViewMode, currentRoom, isCinematicTourActive, cinematicStageIndex } = get();
    if (isCinematicTourActive) {
      const stage = CINEMATIC_TOUR_STAGES[cinematicStageIndex];
      if (stage) return stage.cameraPose;
    }
    if (activeViewMode === 'APARTMENT_INTERIOR') {
      const key = `APARTMENT_INTERIOR:${currentRoom}`;
      return CAMERA_POSES[key] || CAMERA_POSES['APARTMENT_INTERIOR:LIVING_ROOM'];
    }
    return CAMERA_POSES[activeViewMode] || CAMERA_POSES['DRONE_OVERVIEW'];
  },
}));
