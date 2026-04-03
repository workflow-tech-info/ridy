import { create } from 'zustand';

const mockDrivers = [
  { id: 'd1', name: 'Ravi Kumar', status: 'available', vehicle: 'KL 01 AB 1234', rating: 4.8 },
  { id: 'd2', name: 'Suresh M', status: 'busy', vehicle: 'KL 43 XY 9876', rating: 4.9 },
  { id: 'd3', name: 'John Doe', status: 'offline', vehicle: 'KL 07 ZZ 0001', rating: 4.5 },
];

const mockCalls = [
  { id: 'c1', phone: '+91 98765 43210', time: 'Just now', status: 'incoming', location: 'Kochi Hub' },
  { id: 'c2', phone: '+91 88888 77777', time: '2 mins ago', status: 'missed', location: 'Trivandrum' },
];

export const useDashboardStore = create((set, get) => ({
  activeDrivers: mockDrivers,
  liveCalls: mockCalls,
  
  // Call Flow State (driven by the LiveCalls ui)
  simulatingCallId: null,
  callFlowStep: 0, // 0: inactive, 1: connecting, 2: processing details, 3: pooling drivers, 4: connected/ontheway
  
  stats: {
    ridesToday: 142,
    revenue: "₹24,500",
    activeRideCount: 18,
    availableDrivers: 45
  },
  
  // Simulates pressing 'Action Callback'
  startCallFlow: (id) => {
    set({ simulatingCallId: id, callFlowStep: 1 });
    
    // Simulate flow: Connecting... (2s) -> Details received (2s) -> Pooling (3s) -> Connected
    setTimeout(() => {
      set({ callFlowStep: 2 });
      
      setTimeout(() => {
        set({ callFlowStep: 3 });
        
        setTimeout(() => {
           set((state) => ({
             callFlowStep: 4,
             liveCalls: state.liveCalls.map(c => c.id === id ? { ...c, status: 'active', pooling: false } : c),
             activeDrivers: state.activeDrivers.map(d => d.id === 'd1' ? { ...d, status: 'busy' } : d),
             stats: { ...state.stats, activeRideCount: state.stats.activeRideCount + 1 }
           }));
        }, 3000);
      }, 2500);
    }, 2000);
  },

  resetCallFlow: () => set({ simulatingCallId: null, callFlowStep: 0 }),
  
  answerCall: (id) => set((state) => ({
    liveCalls: state.liveCalls.map(c => c.id === id ? { ...c, status: 'active' } : c)
  })),
  
  endCall: (id) => set((state) => {
    if (state.simulatingCallId === id) {
       // if we end the simulated call, reset the flow UI too
       return {
         simulatingCallId: null,
         callFlowStep: 0,
         liveCalls: state.liveCalls.map(c => c.id === id ? { ...c, status: 'completed' } : c)
       };
    }
    return { liveCalls: state.liveCalls.map(c => c.id === id ? { ...c, status: 'completed' } : c) };
  }),
  
  addBooking: (booking) => set((state) => ({
    stats: { ...state.stats, ridesToday: state.stats.ridesToday + 1, activeRideCount: state.stats.activeRideCount + 1 }
  })),
}));
