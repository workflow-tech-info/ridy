import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// --- IN-MEMORY DATA STORAGE ---
let drivers = [];
let bookings = [];
let transactions = [];
let tickets = [];
let liveCalls = [];

// --- SEED DATA GENERATION ---
const generateSeedData = () => {
  console.log('Generating seed data...');
  
  // 100 Drivers
  const names = ['Arjun', 'Suresh', 'Binu', 'Rahul', 'Deepak', 'Anoop', 'Kiran', 'Vinod', 'Anish', 'Ravi'];
  for (let i = 1; i <= 100; i++) {
    drivers.push({
      id: `d${i}`,
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
    });
  }

  // 200 Bookings
  const locations = ['Kochi Airport', 'Marine Drive', 'Kakkanad IT Park', 'Lulu Mall', 'Edappally', 'Fort Kochi', 'Vytilla Hub', 'Panampilly Nagar'];
  for (let i = 1; i <= 200; i++) {
    const status = i < 10 ? 'searching' : (i < 30 ? 'assigned' : (i < 180 ? 'completed' : 'cancelled'));
    bookings.push({
      id: `ridy_${1000 + i}`,
      pickup: locations[Math.floor(Math.random() * locations.length)],
      drop: locations[Math.floor(Math.random() * locations.length)],
      customerPhone: `+91 ${9870000000 + i}`,
      status: status,
      driverId: status === 'assigned' || status === 'completed' ? `d${Math.floor(Math.random() * 100) + 1}` : null,
      driverName: status === 'assigned' || status === 'completed' ? drivers[Math.floor(Math.random() * 100)].name : null,
      timestamp: new Date(Date.now() - (i * 3600000)).toISOString()
    });
  }

  // 150 Transactions
  for (let i = 1; i <= 150; i++) {
    transactions.push({
      id: `TXN${10000 + i}`,
      rideId: `ridy_${1000 + i}`,
      driverName: drivers[Math.floor(Math.random() * 100)].name,
      customerPhone: `+91 ${9870000000 + i}`,
      amount: `₹${Math.floor(Math.random() * 700) + 120}`,
      paymentMode: i % 3 === 0 ? 'UPI' : 'Cash',
      status: i % 20 === 0 ? 'Failed' : 'Completed',
      timestamp: new Date(Date.now() - (i * 7200000)).toLocaleString()
    });
  }

  // 20 Tickets
  const issues = ['Driver didn’t arrive', 'Wrong fare charged', 'App technical issue', 'Lost item in car', 'Unprofessional behavior'];
  for (let i = 1; i <= 20; i++) {
    tickets.push({
      id: `TKT-${100 + i}`,
      issue: issues[Math.floor(Math.random() * issues.length)],
      userPhone: `+91 ${9800000000 + i}`,
      status: i < 5 ? 'Open' : 'Resolved',
      agent: i % 2 === 0 ? 'Agent Arjun' : 'Agent Neha',
      createdAt: new Date(Date.now() - (i * 86400000)).toLocaleDateString()
    });
  }

  // Live Calls
  liveCalls = [
    { id: 'c1', phone: '+91 98765 43210', status: 'Ringing', duration: '0:05', language: 'Malayalam', location: 'Kochi Hub', time: 'Just now' },
    { id: 'c2', phone: '+91 88888 77777', status: 'Connected', duration: '1:24', language: 'Hindi', location: 'Trivandrum', time: '2 mins ago' },
    { id: 'c3', phone: '+91 99911 22233', status: 'Missed', duration: '0:00', language: 'English', location: 'Calicut', time: '5 mins ago' },
  ];

  console.log('Seed data generated successfully.');
};

generateSeedData();

// --- API ENDPOINTS ---

// Core Booking
app.post('/v1/dispatch', (req, res) => {
  const newBooking = {
    id: `ridy_${Date.now()}`,
    ...req.body,
    status: 'searching',
    timestamp: new Date().toISOString()
  };
  bookings.unshift(newBooking);
  res.json(newBooking);
});

app.post('/dispatch/accept', (req, res) => {
  const { bookingId, driverId } = req.body;
  const booking = bookings.find(b => b.id === bookingId);
  const driver = drivers.find(d => d.id === driverId);
  
  if (booking && driver) {
    booking.status = 'assigned';
    booking.driverId = driverId;
    booking.driverName = driver.name;
    driver.status = 'busy';
    res.json({ success: true, booking });
  } else {
    res.status(404).json({ error: 'Booking or Driver not found' });
  }
});

app.get('/bookings', (req, res) => {
  res.json(bookings);
});

// Drivers
app.get('/drivers', (req, res) => {
  res.json(drivers);
});

app.post('/drivers', (req, res) => {
  const newDriver = { id: `d${drivers.length + 1}`, ...req.body, status: 'available' };
  drivers.push(newDriver);
  res.json(newDriver);
});

app.patch('/drivers/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const driver = drivers.find(d => d.id === id);
  if (driver) {
    driver.status = status;
    res.json(driver);
  } else {
    res.status(404).json({ error: 'Driver not found' });
  }
});

// Transactions
app.get('/transactions', (req, res) => {
  res.json(transactions);
});

// Support
app.get('/support/tickets', (req, res) => {
  res.json(tickets);
});

// Analytics
app.get('/analytics/summary', (req, res) => {
  res.json({
    ridesToday: bookings.filter(b => b.status === 'completed' && new Date(b.timestamp) > new Date(Date.now() - 86400000)).length + 142,
    revenue: "₹24,500",
    activeRides: bookings.filter(b => b.status === 'assigned' || b.status === 'searching').length,
    availableDrivers: drivers.filter(d => d.status === 'available').length,
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
  });
});

// Live Calls
app.get('/calls', (req, res) => {
  res.json(liveCalls);
});

app.post('/webhook/missed-call', (req, res) => {
  const { phone } = req.body;
  const newCall = {
    id: `c${Date.now()}`,
    phone: phone || '+91 90000 00000',
    status: 'Ringing',
    duration: '0:00',
    language: ['Malayalam', 'Hindi', 'English'][Math.floor(Math.random()*3)],
    location: 'Unknown',
    time: 'Just now'
  };
  liveCalls.unshift(newCall);
  res.json({ success: true, call: newCall });
});

app.listen(port, () => {
  console.log(`Mock Backend running at http://localhost:${port}`);
});
