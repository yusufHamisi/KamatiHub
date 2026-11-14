import {
  CalendarDays,
  Users,
  ClipboardCheck,
  Wallet,
} from "lucide-react";

const stats = [
  {
    title: "Total Events",
    value: "12",
    description: "All scheduled events",
    icon: CalendarDays,
  },
  {
    title: "Members",
    value: "248",
    description: "Total registered members",
    icon: Users,
  },
  {
    title: "Pending Tasks",
    value: "36",
    description: "Tasks to be completed",
    icon: ClipboardCheck,
  },
  {
    title: "Total Funds",
    value: "TZS 2.4M",
    description: "Total collected funds",
    icon: Wallet,
  },
];

const upcomingEvents = [
  {
    title: "Annual General Meeting",
    location: "Main Hall",
    time: "10:00 AM",
    date: "05 Sep 2026",
  },
  {
    title: "Committee Meeting",
    location: "Conference Room",
    time: "2:00 PM",
    date: "08 Sep 2026",
  },
  {
    title: "Fundraising Event",
    location: "Mlimani City",
    time: "6:00 PM",
    date: "15 Sep 2026",
  },
];

function Dashboard() {
  return (
    <div className="w-full">

      {/* =========================
          PAGE HEADER
      ========================== */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Here's what's happening with your events.
        </p>
      </div>


      {/* =========================
          STATISTICS CARDS
      ========================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="
                bg-white
                rounded-xl
                border
                border-gray-200
                p-6
                shadow-sm
                hover:shadow-md
                transition-shadow
                duration-200
              "
            >

              {/* Card top */}
              <div className="flex items-start justify-between">

                {/* Text */}
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-blue-600">
                    {stat.value}
                  </h2>
                </div>

                {/* Icon */}
                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-blue-50
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Icon
                    size={24}
                    className="text-blue-600"
                  />
                </div>

              </div>

              {/* Description */}
              <p className="mt-6 text-sm text-gray-500">
                {stat.description}
              </p>

            </div>
          );
        })}

      </div>


      {/* =========================
          UPCOMING EVENTS
      ========================== */}
      <div
        className="
          mt-8
          bg-white
          rounded-xl
          border
          border-gray-200
          shadow-sm
          overflow-hidden
        "
      >

        {/* Section Header */}
        <div
          className="
            flex
            items-center
            justify-between
            px-6
            py-5
            border-b
            border-gray-200
          "
        >

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Upcoming Events
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Events scheduled for the coming days
            </p>
          </div>

          <button
            className="
              text-sm
              font-semibold
              text-blue-600
              hover:text-blue-700
              transition
            "
          >
            View All
          </button>

        </div>


        {/* Events List */}
        <div>

          {upcomingEvents.map((event) => (
            <div
              key={event.title}
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
              "
            >

              {/* Left side */}
              <div className="flex items-center gap-4 min-w-0">

                {/* Calendar Icon */}
                <div
                  className="
                  shrink-0
                    w-12
                    h-12
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


                {/* Event information */}
                <div className="min-w-0">

                  <h3 className="font-semibold text-gray-900">
                    {event.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {event.location} · {event.time}
                  </p>

                </div>

              </div>


              {/* Right side */}
              <div className="flex items-center gap-5 shrink-0">

                <p className="text-sm font-semibold text-gray-800">
                  {event.date}
                </p>

                <span
                  className="
                    hidden
                    sm:inline-flex
                    items-center
                    rounded-full
                    bg-green-50
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-green-600
                  "
                >
                  Upcoming
                </span>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;