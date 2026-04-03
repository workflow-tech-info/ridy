import { create } from 'zustand';
import api from '../lib/api';

export const useDashboardStore = create((set, get) => ({
  activeDrivers: [],
  liveCalls: [],
  bookings: [],
  transactions: [],
  tickets: [],
  stats: {
    ridesToday: 0,
    revenue: "₹0",
    activeRideCount: 0,
    availableDrivers: 0,
    trends: { rides: [], revenue: [] }
  },
  
  loading: false,
  error: null,

  // Initial Fetch
  fetchDashboardData: async () => {
    set({ loading: true });
    try {
      const [drivers, calls, bookings, transactions, tickets, analytics] = await Promise.all([
        api.getDrivers(),
        api.getCalls(),
        api.getBookings(),
        api.getTransactions(),
        api.getTickets(),
        api.getAnalytics()
      ]);
      
      set({ 
        activeDrivers: drivers, 
        liveCalls: calls, 
        bookings, 
        transactions, 
        tickets, 
        stats: {
          ridesToday: analytics.ridesToday,
          revenue: analytics.revenue,
          activeRideCount: analytics.activeRides,
          availableDrivers: analytics.availableDrivers,
          trends: analytics.trends
        },
        loading: false 
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Call Flow State (UI Only)
  simulatingCallId: null,
  callFlowStep: 0, 

  startCallFlow: (id) => {
    set({ simulatingCallId: id, callFlowStep: 1 });
    setTimeout(() => {
      set({ callFlowStep: 2 });
      setTimeout(() => {
        set({ callFlowStep: 3 });
        setTimeout(() => {
           set((state) => ({
             callFlowStep: 4,
             liveCalls: state.liveCalls.map(c => c.id === id ? { ...c, status: 'Connected', pooling: false } : c),
           }));
        }, 3000);
      }, 2500);
    }, 2000);
  },

  resetCallFlow: () => set({ simulatingCallId: null, callFlowStep: 0 }),
  
  simulateCall: async (phone) => {
    try {
      const { call } = await api.simulateMissedCall(phone);
      set((state) => ({ liveCalls: [call, ...state.liveCalls] }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  acceptBooking: async (bookingId, driverId) => {
    try {
      const { booking } = await api.acceptBooking({ bookingId, driverId });
      set((state) => ({
        bookings: state.bookings.map(b => b.id === bookingId ? booking : b),
        activeDrivers: state.activeDrivers.map(d => d.id === driverId ? { ...d, status: 'busy' } : d)
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  addBooking: async (data) => {
    try {
      const booking = await api.createBooking(data);
      set((state) => ({
        bookings: [booking, ...state.bookings],
        stats: { ...state.stats, activeRideCount: state.stats.activeRideCount + 1 }
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));
