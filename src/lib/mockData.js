// Frontend-only Mock Data Generator for Instant Dashboard
// This eliminates the need for any fetch calls for the initial dashboard state.

const names = ['Arjun', 'Suresh', 'Binu', 'Rahul', 'Deepak', 'Anoop', 'Kiran', 'Vinod', 'Anish', 'Ravi'];
const locations = ['Kochi Airport', 'Marine Drive', 'Kakkanad IT Park', 'Lulu Mall', 'Edappally', 'Fort Kochi', 'Vytilla Hub', 'Panampilly Nagar'];
const issues = ['Driver didn’t arrive', 'Wrong fare charged', 'App technical issue', 'Lost item in car', 'Unprofessional behavior'];

// 100 Drivers
export const mockDrivers = Array.from({ length: 100 }, (_, i) => ({
  id: `d${i + 1}`,
  name: `${names[Math.floor(Math.random() * names.length)]} ${String.fromCharCode(65 + (i % 26))}`,
  phone: `+91 ${9000000000 + i}`,
  status: i % 15 === 0 ? 'offline' : (i % 10 === 0 ? 'busy' : 'available'),
  vehicle: `KL 01 ${String.fromCharCode(65 + (i % 26))}${String.fromCharCode(65 + ((i+1) % 26))} ${1000 + i}`,
  rating: (4 + Math.random()).toFixed(1),
  earningsToday: Math.floor(Math.random() * 2500) + 500,
  totalRides: Math.floor(Math.random() * 500) + 100,
  acceptanceRate: `${Math.floor(Math.random() * 20) + 80}%`,
  lastActive: 'Active now',
  distance: (Math.random() * 5).toFixed(1) + ' km'
}));

// 200 Bookings
export const mockBookings = Array.from({ length: 200 }, (_, i) => {
  const status = i < 10 ? 'searching' : (i < 30 ? 'assigned' : (i < 180 ? 'completed' : 'cancelled'));
  return {
    id: `ridy_${1000 + i}`,
    pickup: locations[Math.floor(Math.random() * locations.length)],
    drop: locations[Math.floor(Math.random() * locations.length)],
    customerPhone: `+91 ${9870000000 + i}`,
    status: status,
    driverId: status === 'assigned' || status === 'completed' ? `d${Math.floor(Math.random() * 100) + 1}` : null,
    driverName: status === 'assigned' || status === 'completed' ? mockDrivers[Math.floor(Math.random() * 100)].name : null,
    timestamp: new Date(Date.now() - (i * 3600000)).toISOString()
  };
});

// 150 Transactions
export const mockTransactions = Array.from({ length: 150 }, (_, i) => ({
  id: `TXN${10000 + i}`,
  rideId: `ridy_${1000 + i}`,
  driverName: mockDrivers[Math.floor(Math.random() * 100)].name,
  customerPhone: `+91 ${9870000000 + i}`,
  amount: `₹${Math.floor(Math.random() * 700) + 120}`,
  paymentMode: i % 3 === 0 ? 'UPI' : 'Cash',
  status: i % 20 === 0 ? 'Failed' : 'Completed',
  timestamp: new Date(Date.now() - (i * 7200000)).toLocaleString()
}));

// 20 Tickets
export const mockTickets = Array.from({ length: 20 }, (_, i) => ({
  id: `TKT-${100 + i}`,
  issue: issues[Math.floor(Math.random() * issues.length)],
  userPhone: `+91 ${9800000000 + i}`,
  status: i < 5 ? 'Open' : 'Resolved',
  agent: i % 2 === 0 ? 'Agent Arjun' : 'Agent Neha',
  createdAt: new Date(Date.now() - (i * 86400000)).toLocaleDateString()
}));

// 3 Live Calls
export const mockLiveCalls = [
  { id: 'c1', phone: '+91 98765 43210', status: 'Ringing', duration: '0:05', language: 'Malayalam', location: 'Kochi Hub', time: 'Just now' },
  { id: 'c2', phone: '+91 88888 77777', status: 'Connected', duration: '1:24', language: 'Hindi', location: 'Trivandrum', time: '2 mins ago' },
  { id: 'c3', phone: '+91 99911 22233', status: 'Missed', duration: '0:00', language: 'English', location: 'Calicut', time: '5 mins ago' },
];

export const mockStats = {
  ridesToday: 214,
  revenue: "₹24,500",
  activeRideCount: 12,
  availableDrivers: mockDrivers.filter(d => d.status === 'available').length,
  trends: {
    rides: [
      { day: 'Mon', value: 45 }, { day: 'Tue', value: 52 }, { day: 'Wed', value: 38 },
      { day: 'Thu', value: 65 }, { day: 'Fri', value: 48 }, { day: 'Sat', value: 72 }, { day: 'Sun', value: 58 }
    ],
    revenue: [
      { day: 'Mon', value: 8500 }, { day: 'Tue', value: 9200 }, { day: 'Wed', value: 7800 },
      { day: 'Thu', value: 11500 }, { day: 'Fri', value: 9800 }, { day: 'Sat', value: 13200 }, { day: 'Sun', value: 10800 }
    ]
  }
};
