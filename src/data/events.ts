export type Event = {
    id: string;
    title: string;
    location: string;
    time: string;
    date: string;
    status: string;
    description: string;
  };
  
  export const events: Event[] = [
    {
      id: "1",
      title: "Annual General Meeting",
      location: "Main Hall",
      time: "10:00 AM",
      date: "05 Sep 2026",
      status: "Upcoming",
      description:
        "This is the annual general meeting for the committee. Members will review the committee's activities, discuss upcoming plans, and make important decisions for the organization.",
    },
    {
      id: "2",
      title: "Committee Meeting",
      location: "Conference Room",
      time: "2:00 PM",
      date: "08 Sep 2026",
      status: "Upcoming",
      description:
        "A committee meeting to discuss current activities, pending tasks, upcoming events, and other important committee matters.",
    },
    {
      id: "3",
      title: "Fundraising Event",
      location: "Mlimani City",
      time: "6:00 PM",
      date: "15 Sep 2026",
      status: "Upcoming",
      description:
        "A fundraising event organized by the committee to raise funds and support upcoming committee activities and projects.",
    },
  ];