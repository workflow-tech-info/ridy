import { create } from 'zustand';
import api from '../lib/api';
import { mockDrivers, mockBookings, mockTransactions, mockTickets, mockLiveCalls, mockStats } from '../lib/mockData';

export const useDashboardStore = create((set, get) => ({
  activeDrivers: mockDrivers,
  liveCalls: mockLiveCalls,
  bookings: mockBookings,
  transactions: mockTransactions,
  tickets: mockTickets,
  stats: mockStats,
  
  loading: false,
  error: null,

  // Initial Fetch (Now Instant)
  fetchDashboardData: async () => {
    // We already initialized with mock data, so this just serves as a fast sync point
    set({ loading: true });
    // Simulate a tiny network latency for a 'Pro' feel (optional, but keeping it ultra fast)
    setTimeout(() => {
      set({ 
        activeDrivers: mockDrivers, 
        liveCalls: mockLiveCalls, 
        bookings: mockBookings, 
        transactions: mockTransactions, 
        tickets: mockTickets, 
        stats: mockStats,
        loading: false 
      });
    }, 100);
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
