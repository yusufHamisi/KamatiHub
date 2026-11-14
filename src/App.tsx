import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./components/Dashboard";
import Events from "./components/Events";
import EventDetails from "./components/EventDetails";
import Members from "./components/Members";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex">

        <Sidebar />

        <div className="flex-1 flex flex-col">

          <Topbar />

          <main className="flex-1 p-8">

            <Routes>

              {/* Dashboard */}
              <Route path="/" element={<Dashboard />} />

              {/* Events */}
              <Route path="/events" element={<Events />} />
              <Route
                path="/events/:eventId"
                element={<EventDetails />}
              />

              {/* Members */}
              <Route path="/members" element={<Members />} />

            </Routes>

          </main>

        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;