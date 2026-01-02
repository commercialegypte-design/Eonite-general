// API Configuration
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
export const API_BASE = `${BACKEND_URL}/api`;

// Helper function for API calls
export async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  // Add auth token if exists
  const token = localStorage.getItem('eonite_token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };
  
  const response = await fetch(url, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Erreur serveur' }));
    throw new Error(error.detail || 'Erreur serveur');
  }
  
  return response.json();
}

// Auth helpers
export const auth = {
  login: (email, password) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),
  
  register: (data) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getMe: () => apiCall('/auth/me'),
  
  logout: () => {
    localStorage.removeItem('eonite_token');
    localStorage.removeItem('eonite_user');
  },
  
  isAuthenticated: () => !!localStorage.getItem('eonite_token'),
  
  getUser: () => {
    const user = localStorage.getItem('eonite_user');
    return user ? JSON.parse(user) : null;
  },
  
  setAuth: (token, user) => {
    localStorage.setItem('eonite_token', token);
    localStorage.setItem('eonite_user', JSON.stringify(user));
  },
};

// Products API
export const products = {
  getAll: (category) => apiCall(`/products${category ? `?category=${category}` : ''}`),
  getById: (id) => apiCall(`/products/${id}`),
  getCategories: () => apiCall('/categories'),
};

// Pricing API
export const pricing = {
  calculate: (quantity, printType, size = 'medium', category = 'sacs_kraft') => 
    apiCall(`/pricing/calculate?quantity=${quantity}&print_type=${printType}&size=${size}&category=${category}`, {
      method: 'POST',
    }),
  getTiers: (printType, size, category) => 
    apiCall(`/pricing/tiers?print_type=${printType}&size=${size}&category=${category}`),
};

// Quotes API
export const quotes = {
  create: (data) => apiCall('/quotes', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Orders API
export const orders = {
  getAll: () => apiCall('/orders'),
  getById: (id) => apiCall(`/orders/${id}`),
  create: (data) => apiCall('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  reorder: (id) => apiCall(`/orders/${id}/reorder`, { method: 'POST' }),
};

// Upload API
export const upload = {
  file: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const token = localStorage.getItem('eonite_token');
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    
    const response = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de l\'upload');
    }
    
    return response.json();
  },
};
