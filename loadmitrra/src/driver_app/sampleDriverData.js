const sampleDriverData = {
  driverId: "123",
  profile: {
    name: "John Doe",
    phone: "+91 98765 43210",
    rating: 4.9,
    vehicleType: "Open Body",
    vehicleNumber: "TN09 AB 1234",
    baseLocation: "Chennai",
  },

  // ACTIVE / UPCOMING LOADS
  loads: [
    {
      loadId: "L001",
      from: "Chennai",
      to: "Sriperumbudur",
      vehicleType: "Open Body",
      distance: "45 km",
      weight: "12,000 kg",
      price: 8500,
      status: "Assigned",
      pickupTime: "Today 2:00 PM",
    },
    {
      loadId: "L002",
      from: "Chennai",
      to: "Chengalpattu",
      vehicleType: "Closed Body",
      distance: "60 km",
      weight: "8,000 kg",
      price: 7200,
      status: "In Transit",
      pickupTime: "Today 5:30 PM",
    },
  ],

  // EARNINGS SUMMARY
  earnings: {
    today: 15700,
    thisWeek: 48500,
    thisMonth: 182000,

    transactions: [
      {
        tripId: "T001",
        route: "Chennai → Sriperumbudur",
        amount: 8500,
        date: "2025-01-12",
        status: "Paid",
      },
      {
        tripId: "T002",
        route: "Chennai → Chengalpattu",
        amount: 7200,
        date: "2025-01-12",
        status: "Pending",
      },
    ],
  },

  // COMPLETED / PAST TRIPS
  history: [
    {
      tripId: "H001",
      from: "Tambaram",
      to: "Vellore",
      vehicleType: "LCV",
      distance: "140 km",
      weight: "3,500 kg",
      amount: 6500,
      completedOn: "2025-01-10",
      status: "Completed",
    },
    {
      tripId: "H002",
      from: "Guindy",
      to: "Hosur",
      vehicleType: "Open Body",
      distance: "310 km",
      weight: "15,000 kg",
      amount: 18500,
      completedOn: "2025-01-08",
      status: "Completed",
    },
  ],
};

export default sampleDriverData;
