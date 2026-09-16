# Serene Heights Nathia Gali — 3D Scrollytelling Experience

An ultra-luxury real estate digital showcase crafted for **Serene Heights Nathia Gali**, located at an elevation of 7,906 FT in the Himalayas. Built with an Apple-inspired scroll-driven architectural assembly, dynamic environmental atmospheres, and an interactive 13-photo luxury gallery.

---

## Key Highlights

* **Photorealistic 2.5D Architectural Assembly**: Scroll-driven modular structural assembly using authentic architectural renders with 3D perspective tilt and golden window luminescence.
* **Atmospheric Scene Switcher**: Real-time toggling across three distinct mountain environments:
  * **Daylight**: Crisp Himalayan sunlight over lush alpine valleys.
  * **Golden Hour**: Sunset alpenglow paired with warm amber interior illumination.
  * **Winter**: Alpine snowscapes enhanced with real-time 3D snowfall particles.
* **Luxury Gallery Modal**: 13 high-resolution official photos categorized across Architecture, Mountain Views, and Balcony Suites with full keyboard-navigable lightbox viewing.
* **Frosted Glass UI**: Responsive layout with glassmorphic cards docked strictly to the left to maintain an unobstructed view of the central architectural elevations.
* **Direct Lead Capture**: Integrated WhatsApp booking triggers pre-configured with unit queries and investment plans.

---

## Tech Stack

* **Frontend**: React 19, TypeScript, Vite
* **Styling**: Tailwind CSS, Lucide Icons
* **3D & Canvas**: Three.js, @react-three/fiber, @react-three/drei
* **State Management**: Zustand
* **Animation & Motion**: Custom lerp damping controllers & CSS 3D perspective transforms

---

## Getting Started

### Prerequisites

Ensure Node.js (v18+ recommended) is installed on your local machine.

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/khokharyasir749/SERENE-HEIGHTS-3D.git](https://github.com/khokharyasir749/SERENE-HEIGHTS-3D.git)
   cd SERENE-HEIGHTS-3D
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

---

## Project Structure

```text
├── public/
│   ├── gallery/               # 13 high-res categorized official property photos
│   ├── nathia_gali_day.jpg    # Clear daylight environment backdrop
│   ├── nathia_gali_sunset.jpg # Golden hour environment backdrop
│   └── nathia_gali_nature.jpg # Winter snow environment backdrop
├── src/
│   ├── components/
│   │   ├── canvas/            # Three.js scene, snowfall particles, lighting rigs
│   │   ├── scrollytelling/    # Scroll assembly controller & docked story cards
│   │   └── ui/                # Navigation header, gallery modal & weather switcher
│   ├── store/                 # Zustand store for tour, weather & modal states
│   ├── App.tsx                # Main viewport layout & atmospheric transitions
│   └── main.tsx               # App entry point
└── package.json
```

---

## License

Private repository for Serene Heights luxury development showcase. All architectural assets and renderings are property of their respective owners.
