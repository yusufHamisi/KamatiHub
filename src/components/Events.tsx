import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Plus,
  MapPin,
  Clock,
  X,
} from "lucide-react";
import { events as defaultEvents } from "../data/events";
import type { Event } from "../data/events";

function Events() {
  const navigate = useNavigate();

  const [events, setEvents] = useState<Event[]>(() => {
    const savedEvents = localStorage.getItem("kamatihub-events");

    if (savedEvents) {
      return JSON.parse(savedEvents);
    }

    return defaultEvents;
  });

  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleCreateEvent = () => {
    if (!title || !location || !date || !time) {
      return;
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      title,
      location,
      time,
      date,
      status: "Upcoming",
      description:
        "This event was created using KamatiHub.",
    };

    const updatedEvents = [...events, newEvent];

    setEvents(updatedEvents);

    localStorage.setItem(
      "kamatihub-events",
      JSON.stringify(updatedEvents)
    );

    setTitle("");
    setLocation("");
    setDate("");
    setTime("");
    setShowForm(false);
  };

  return (
    <div className="w-full">

      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Events
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your committee events.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="
            flex
            items-center
            gap-2
            bg-blue-600
            text-white
            px-5
            py-2.5
            rounded-lg
            font-semibold
            hover:bg-blue-700
            transition
          "
        >
          <Plus size={20} />
          Create Event
        </button>

      </div>


      {/* Create Event Form */}
      {showForm && (
        <div className="mb-8 bg-white rounded-xl border border-gray-200 shadow-sm">

          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Create New Event
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add the details of your committee event.
              </p>
            </div>

            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-600 transition"
              aria-label="Close form"
            >
              <X size={22} />
            </button>

          </div>


          {/* Form */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Event Name */}
            <div className="md:col-span-2">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Name
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Annual General Meeting"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  px-4
                  py-2.5
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                "
              />

            </div>


            {/* Location */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Main Hall"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  px-4
                  py-2.5
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                "
              />

            </div>


            {/* Date */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  px-4
                  py-2.5
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                "
              />

            </div>


            {/* Time */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>

              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  px-4
                  py-2.5
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                "
              />

            </div>

          </div>


          {/* Form Buttons */}
          <div className="flex justify-end gap-3 px-6 py-5 border-t border-gray-200">

            <button
              onClick={() => setShowForm(false)}
              className="
                px-5
                py-2.5
                rounded-lg
                border
                border-gray-300
                text-gray-700
                font-semibold
                hover:bg-gray-50
                transition
              "
            >
              Cancel
            </button>

            <button
              onClick={handleCreateEvent}
              className="
                px-5
                py-2.5
                rounded-lg
                bg-blue-600
                text-white
                font-semibold
                hover:bg-blue-700
                transition
              "
            >
              Create Event
            </button>

          </div>

        </div>
      )}


      {/* Events Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200">

          <h2 className="text-lg font-semibold text-gray-900">
            All Events
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View and manage your scheduled events.
          </p>

        </div>


        {/* Events List */}
        <div>

          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => navigate(`/events/${event.id}`)}
              className="
                flex
                items-center
                justify-between
                gap-6
                px-6
                py-5
                border-b
                border-gray-100
                last:border-b-0
                hover:bg-gray-50
                transition
                cursor-pointer
              "
            >

              {/* Left */}
              <div className="flex items-center gap-4 min-w-0">

                <div
                  className="
                    w-12
                    h-12
                    shrink-0
                    rounded-xl
                    bg-blue-50
                    flex
                    items-center
                    justify-center
                  "
                >
                  <CalendarDays
                    size={23}
                    className="text-blue-600"
                  />
                </div>

                <div className="min-w-0">

                  <h3 className="font-semibold text-gray-900">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">

                    <span className="flex items-center gap-1">
                      <MapPin size={15} />
                      {event.location}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock size={15} />
                      {event.time}
                    </span>

                  </div>

                </div>

              </div>


              {/* Right */}
              <div className="flex items-center gap-5 shrink-0">

                <span className="text-sm font-semibold text-gray-800">
                  {event.date}
                </span>

                <span
                  className="
                    hidden
                    sm:inline-flex
                    rounded-full
                    bg-green-50
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-green-600
                  "
                >
                  {event.status}
                </span>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Events;