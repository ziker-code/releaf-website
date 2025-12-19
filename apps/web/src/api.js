// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Helper function for API calls
async function fetchAPI(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        credentials: 'include',
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || data.message || 'API request failed');
    }

    return data;
}

// Products API
export const productsAPI = {
    getAll: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.category) searchParams.set('category', params.category);
        if (params.size) searchParams.set('size', params.size);
        if (params.search) searchParams.set('search', params.search);
        if (params.minPrice) searchParams.set('minPrice', params.minPrice);
        if (params.maxPrice) searchParams.set('maxPrice', params.maxPrice);
        if (params.sort) searchParams.set('sort', params.sort);
        if (params.page) searchParams.set('page', params.page);
        if (params.limit) searchParams.set('limit', params.limit);

        const query = searchParams.toString();
        return fetchAPI(`/products${query ? `?${query}` : ''}`);
    },

    getBySlug: (slug) => fetchAPI(`/products/${slug}`),
    getFeatured: () => fetchAPI('/products/featured'),
    search: (query) => fetchAPI(`/products/search?q=${encodeURIComponent(query)}`),
};

// Categories API
export const categoriesAPI = {
    getAll: () => fetchAPI('/categories'),
    getBySlug: (slug) => fetchAPI(`/categories/${slug}`),
};

// Cart API
export const cartAPI = {
    get: () => fetchAPI('/cart'),
    addItem: (productId, quantity = 1) =>
        fetchAPI('/cart/items', {
            method: 'POST',
            body: JSON.stringify({ productId, quantity }),
        }),
    updateItem: (productId, quantity) =>
        fetchAPI(`/cart/items/${productId}`, {
            method: 'PUT',
            body: JSON.stringify({ quantity }),
        }),
    removeItem: (productId) =>
        fetchAPI(`/cart/items/${productId}`, { method: 'DELETE' }),
    clear: () => fetchAPI('/cart', { method: 'DELETE' }),
};

// Orders API
export const ordersAPI = {
    getAll: () => fetchAPI('/orders'),
    getById: (id) => fetchAPI(`/orders/${id}`),
    create: (shippingAddress, notes = '') =>
        fetchAPI('/orders', {
            method: 'POST',
            body: JSON.stringify({ shippingAddress, notes }),
        }),
};

// Favorites API
export const favoritesAPI = {
    getAll: () => fetchAPI('/favorites'),
    add: (productId) =>
        fetchAPI('/favorites', {
            method: 'POST',
            body: JSON.stringify({ productId }),
        }),
    remove: (productId) => fetchAPI(`/favorites/${productId}`, { method: 'DELETE' }),
    check: (productId) => fetchAPI(`/favorites/check/${productId}`),
};

// Seller API
export const sellerAPI = {
    getProfile: () => fetchAPI('/seller/profile'),
    updateProfile: (data) =>
        fetchAPI('/seller/profile', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
    getProducts: () => fetchAPI('/seller/products'),
    addProduct: (data) =>
        fetchAPI('/seller/products', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
    updateProduct: (id, data) =>
        fetchAPI(`/seller/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),
    deleteProduct: (id) => fetchAPI(`/seller/products/${id}`, { method: 'DELETE' }),
    getAnalytics: () => fetchAPI('/seller/analytics'),
    addTransaction: (data) =>
        fetchAPI('/seller/transactions', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
};

// Auth API
export const authAPI = {
    signUp: async (email, password, name) => {
        const response = await fetch(`${API_BASE_URL}/auth/sign-up/email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password, name }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || data.error || 'Registration failed');
        }
        return data;
    },

    signIn: async (email, password) => {
        const response = await fetch(`${API_BASE_URL}/auth/sign-in/email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || data.error || 'Login failed');
        }
        return data;
    },

    signOut: async () => {
        const response = await fetch(`${API_BASE_URL}/auth/sign-out`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Logout failed');
        }
        return { success: true };
    },

    getSession: async () => {
        const response = await fetch(`${API_BASE_URL}/auth/session`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    },
};

// User API
export const userAPI = {
    getProfile: () => fetchAPI('/users/me'),
    updateProfile: (data) =>
        fetchAPI('/users/me', {
            method: 'PUT',
            body: JSON.stringify(data),
        }),
};

export default {
    products: productsAPI,
    categories: categoriesAPI,
    cart: cartAPI,
    orders: ordersAPI,
    favorites: favoritesAPI,
    seller: sellerAPI,
    auth: authAPI,
    user: userAPI,
};
