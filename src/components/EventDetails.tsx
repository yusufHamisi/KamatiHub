import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { events as defaultEvents } from "../data/events";
import type { Event } from "../data/events";

function EventDetails() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [events, setEvents] = useState<Event[]>(() => {
    const savedEvents = localStorage.getItem("kamatihub-events");

    if (savedEvents) {
      return JSON.parse(savedEvents);
    }

    return defaultEvents;
  });

  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const event = events.find((item) => item.id === eventId);

  const [title, setTitle] = useState(event?.title ?? "");
  const [location, setLocation] = useState(event?.location ?? "");
  const [date, setDate] = useState(event?.date ?? "");
  const [time, setTime] = useState(event?.time ?? "");

  if (!event) {
    return (
      <div className="w-full">

        <button
          onClick={() => navigate("/events")}
          className="
            flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-gray-600
            hover:text-blue-600
            transition
            mb-6
          "
        >
          <ArrowLeft size={18} />
          Back to Events
        </button>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">

          <h1 className="text-2xl font-bold text-gray-900">
            Event Not Found
          </h1>

          <p className="mt-2 text-gray-500">
            The event you are looking for does not exist.
          </p>

        </div>

      </div>
    );
  }

  const handleSaveChanges = () => {
    if (!title || !location || !date || !time) {
      return;
    }

    const updatedEvents = events.map((item) =>
      item.id === event.id
        ? {
            ...item,
            title,
            location,
            date,
            time,
          }
        : item
    );

    setEvents(updatedEvents);

    localStorage.setItem(
      "kamatihub-events",
      JSON.stringify(updatedEvents)
    );

    setShowEditForm(false);
  };

  const handleDeleteEvent = () => {
    const updatedEvents = events.filter(
      (item) => item.id !== event.id
    );

    setEvents(updatedEvents);

    localStorage.setItem(
      "kamatihub-events",
      JSON.stringify(updatedEvents)
    );

    navigate("/events");
  };

  return (
    <div className="w-full">

      {/* Back Button */}
      <button
        onClick={() => navigate("/events")}
        className="
          flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-gray-600
          hover:text-blue-600
          transition
          mb-6
        "
      >
        <ArrowLeft size={18} />
        Back to Events
      </button>


      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">

        <div>

          <p className="text-sm font-medium text-blue-600 mb-2">
            Event Details
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            {event.title}
          </h1>

          <p className="mt-2 text-gray-500">
            View and manage this event.
          </p>

        </div>


        {/* Action Buttons */}
        <div className="flex items-center gap-3">

          <button
            onClick={() => setShowEditForm(true)}
            className="
              flex
              items-center
              gap-2
              px-4
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
            <Pencil size={18} />
            Edit
          </button>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="
              flex
              items-center
              gap-2
              px-4
              py-2.5
              rounded-lg
              bg-red-600
              text-white
              font-semibold
              hover:bg-red-700
              transition
            "
          >
            <Trash2 size={18} />
            Delete
          </button>

        </div>

      </div>


      {/* Edit Form */}
      {showEditForm && (
        <div className="mb-8 bg-white rounded-xl border border-gray-200 shadow-sm">

          {/* Edit Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">

            <div>

              <h2 className="text-lg font-semibold text-gray-900">
                Edit Event
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Update the event information.
              </p>

            </div>

            <button
              onClick={() => setShowEditForm(false)}
              className="text-gray-400 hover:text-gray-600 transition"
              aria-label="Close edit form"
            >
              <X size={22} />
            </button>

          </div>


          {/* Edit Fields */}
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


          {/* Edit Buttons */}
          <div className="flex justify-end gap-3 px-6 py-5 border-t border-gray-200">

            <button
              onClick={() => setShowEditForm(false)}
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
              onClick={handleSaveChanges}
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
              Save Changes
            </button>

          </div>

        </div>
      )}


      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6">

            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mb-4">

              <Trash2
                size={22}
                className="text-red-600"
              />

            </div>

            <h2 className="text-xl font-bold text-gray-900">
              Delete Event?
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete "{event.title}"?
              This action cannot be undone.
            </p>


            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setShowDeleteConfirm(false)}
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
                onClick={handleDeleteEvent}
                className="
                  px-5
                  py-2.5
                  rounded-lg
                  bg-red-600
                  text-white
                  font-semibold
                  hover:bg-red-700
                  transition
                "
              >
                Delete Event
              </button>

            </div>

          </div>

        </div>
      )}


      {/* Event Details Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

        {/* Card Header */}
        <div className="px-6 py-6 border-b border-gray-200">

          <div className="flex items-center gap-4">

            <div
              className="
                w-14
                h-14
                rounded-xl
                bg-blue-50
                flex
                items-center
                justify-center
              "
            >
              <CalendarDays
                size={26}
                className="text-blue-600"
              />
            </div>

            <div>

              <h2 className="text-xl font-semibold text-gray-900">
                {event.title}
              </h2>

              <span
                className="
                  inline-flex
                  mt-2
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

        </div>


        {/* Event Information */}
        <div className="p-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Date */}
            <div className="border border-gray-200 rounded-lg p-5">

              <div className="flex items-center gap-3 mb-3">

                <CalendarDays
                  size={20}
                  className="text-blue-600"
                />

                <p className="text-sm font-medium text-gray-500">
                  Date
                </p>

              </div>

              <p className="font-semibold text-gray-900">
                {event.date}
              </p>

            </div>


            {/* Time */}
            <div className="border border-gray-200 rounded-lg p-5">

              <div className="flex items-center gap-3 mb-3">

                <Clock
                  size={20}
                  className="text-blue-600"
                />

                <p className="text-sm font-medium text-gray-500">
                  Time
                </p>

              </div>

              <p className="font-semibold text-gray-900">
                {event.time}
              </p>

            </div>


            {/* Location */}
            <div className="border border-gray-200 rounded-lg p-5">

              <div className="flex items-center gap-3 mb-3">

                <MapPin
                  size={20}
                  className="text-blue-600"
                />

                <p className="text-sm font-medium text-gray-500">
                  Location
                </p>

              </div>

              <p className="font-semibold text-gray-900">
                {event.location}
              </p>

            </div>

          </div>


          {/* Description */}
          <div className="mt-8">

            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Description
            </h3>

            <p className="text-gray-500 leading-relaxed">
              {event.description}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EventDetails;
