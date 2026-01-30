
# 🚚 Logistics Shipment Dashboard

A simplified, interactive web dashboard component to track and manage logistics shipments. Built as an assignment submission to demonstrate modern React patterns, responsive design, and a polished, accessible user experience.

## 🚀 Features
- Live Tracking Dashboard: View key shipment fields (Tracking #, Status, Location, Estimated Delivery).
- Dynamic Stats: Summary cards for total, in-transit, and delivered counts.
- Advanced Filtering:
  - Instant search by tracking number.
  - Filter by shipment status (Pending, In Transit, Delivered, Cancelled).
- Smart Sorting: Sort shipments by Estimated Delivery (Latest / Earliest).
- Detailed View: Modal-based drill-down showing sender, receiver, and full shipment details.
- Simulated API: Delayed Promise to demonstrate loading and error states.
- Responsive: Works on Desktop, Tablet, and Mobile with a mobile-first Tailwind layout.

## 🛠️ Tech Stack
- Framework: React (Vite)
- Styling: Tailwind CSS
- Icons: Lucide React
- State: React Hooks (`useState`, `useEffect`, `useMemo`)

## 📦 Installation & Setup
1. Clone the repository

```bash
git clone https://github.com/abhiJunior/ShipVyom-Frontend-Assignment.git
cd client
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

Notes:
- The project is contained in the `client` folder. Use the `dev` script created by Vite to preview the UI locally.

## 🧠 Design Choices & Challenges

1. Architectural Patterns
- Business logic for filtering and sorting is kept inside the `ShipmentList` component to maintain a single source of truth for displayed shipments. Data fetching is simulated with a delayed Promise to exercise loading and error UI states.

2. UI / UX Strategy
- Visual Hierarchy: A Slate & Indigo theme provides an enterprise aesthetic.
- Feedback Loops: A clear “No Results Found” state appears when filters return no matches.
- Accessibility: Semantic HTML and high-contrast status badges were prioritized for readability.

3. Challenges Faced
- Date Handling: Mock date strings required careful parsing and fallback handling (e.g., `N/A` for cancelled shipments) to avoid runtime errors during sorting.
- Responsive Cards: A mobile-first Tailwind grid keeps information density manageable on small screens.

## 📝 Commit Convention
This project follows Conventional Commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation updates
- `style:` for UI/CSS changes

## ⚙️ Project Structure (high level)
- `src/` — main source
  - `components/` — UI components (FilterBar, ShipmentCard, ShipmentList, Modal, StatusBadge)
  - `data/mockData.js` — sample shipment data and simulated API
  - `pages/Home.jsx` — main dashboard page

## ✅ Assignment Notes
- This repository is prepared as an assignment submission showcasing React fundamentals, component decomposition, and a production-lean front-end stack.

---



