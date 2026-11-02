# CoHaven — Award-Worthy Premium Shared Living & Spatial Simulation

> **"Find your space. Live with your people."**  
> A Scandinavian-inspired shared living ecosystem combining editorial property presentation, algorithmic flatmate compatibility matching, mathematical fair-share rent splitting, and real-time 3D WebGL spatial walkthroughs.

---

## 🌟 Visual & Architectural Principles
- **Aesthetic Direction:** Warm Scandinavian minimalism (Warm Ivory `#FBFBF9`, Deep Charcoal `#1E2229`, Terracotta `#E07A5F`, Sage Green `#3D5A50`, Soft Beige `#F1EEE7`).
- **Interactive 3D Simulation Engine:** Powered by Three.js with real-time daylight simulation (Morning Mist, Golden Hour, Midnight Lounge), telemetry HUD, acoustic ratings, and interactive room hotspots.
- **Micro-Interactions & Audio:** Built-in ambient Web Audio API synthesizer for tactile UI clicks, spatial warp sounds, and ambient harmonic drones.

---

## 🚀 Key Interactive Features

1. **3D Spatial Walkthrough & Room Simulation:**
   - Real-time 3D Three.js architectural suite with interactive camera orbit, pan, and zoom.
   - Circadian lighting controls (Morning, Golden Hour, Midnight).
   - Interactive 3D hotspots for Living Commons, Chef's Kitchen Island, and Available Suites.
   - Live telemetry (FPS, Lux, Acoustics, Temperature, CO2 levels).

2. **Curated Property Discovery & Editorial Grid:**
   - Multi-photo image carousels with smooth arrow and dot navigation.
   - Real-time filtering by destination city, room configuration, budget slider, and lifestyle tags.
   - Compatibility score indicator, verified status badges, and resident avatar previews.
   - Persistent favorites system saved to `localStorage`.

3. **VibeMatch™ Flatmate Compatibility Engine:**
   - 6-step interactive visual quiz covering circadian sleep schedules, cleanliness standards, work habits, and guest protocols.
   - Animated SVG circular progress ring displaying real-time harmony score.
   - Curated property recommendations tailored to quiz results.

4. **Smart Fair-Share Rent & Utility Split Calculator:**
   - Mathematical algorithm calculating fair rent based on bedroom square footage, private en-suite bathroom (+18%), and private balconies (+8%).
   - Shared utility pool (Gigabit fiber, electricity, water, bi-weekly cleaning) split evenly.
   - Stacked proportional distribution bar chart.
   - One-click "Copy Breakdown" to clipboard.

5. **Tour Booking & Move-In Application:**
   - Multi-step booking modal for either 3D Virtual Tours or In-Person Walkthroughs.
   - Integrated applicant profile and personal introduction note.
   - Instant confetti celebration with booking reference ID and direct flatmate chat trigger.

6. **Interactive Resident Dashboard:**
   - Overview of applications, viewings, and compatibility score.
   - Saved spaces gallery with instant view and remove options.
   - Real-time simulated chat with housemates with dynamic reply simulations.
   - Lifestyle and circadian profile settings.

7. **Owner "List Your Space" Workflow:**
   - 3-step listing creation wizard (Location, Room Specs, Curated Photography).
   - Immediately publishes custom listings to the live discovery grid and persists to `localStorage`.

8. **Community Living Blueprint:**
   - Interactive editorial tabs for The Clean Counter Pledge, Acoustic Quiet Hours, Guest Etiquette, and Frictionless Expense Pools.

---

## 🛠️ Tech Stack
- **Framework:** React 18 + Vite 6
- **Styling:** Tailwind CSS + Custom CSS Variables & Glassmorphism
- **3D Graphics:** Three.js (WebGL Architectural Scene)
- **Audio:** Web Audio API (Zero external assets, client-side synthesized)
- **Icons:** Lucide React
- **Celebration FX:** Canvas-Confetti
- **State & Storage:** React Hooks + `localStorage` & `sessionStorage`

---

## 🏃 Running the Project Locally

```bash
# Navigate to the project directory
cd Psyducks

# Install dependencies (if not already installed)
npm install

# Start the Vite local development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
