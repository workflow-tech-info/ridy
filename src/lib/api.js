const API_BASE_URL = 'http://localhost:3001';

const api = {
  fetch: async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Fetch error on ${endpoint}:`, error);
      throw error;
    }
  },

  getBookings: () => api.fetch('/bookings'),
  createBooking: (data) => api.fetch('/v1/dispatch', { method: 'POST', body: JSON.stringify(data) }),
  acceptBooking: (data) => api.fetch('/dispatch/accept', { method: 'POST', body: JSON.stringify(data) }),

  getDrivers: () => api.fetch('/drivers'),
  addDriver: (data) => api.fetch('/drivers', { method: 'POST', body: JSON.stringify(data) }),
  updateDriverStatus: (id, status) => api.fetch(`/drivers/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  getTransactions: () => api.fetch('/transactions'),
  getTickets: () => api.fetch('/support/tickets'),
  getAnalytics: () => api.fetch('/analytics/summary'),
  getCalls: () => api.fetch('/calls'),
  simulateMissedCall: (phone) => api.fetch('/webhook/missed-call', { method: 'POST', body: JSON.stringify({ phone }) }),
};

export default api;
