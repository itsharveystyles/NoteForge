const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

const defaultHeaders = () => ({
  "Content-Type": "application/json",
});

const authHeaders = (token) => ({
  ...defaultHeaders(),
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

export const authApi = {
  async signup({ name, email, password }) {
    const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: defaultHeaders(),
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "Failed to sign up");
    }
    return res.json();
  },

  async login({ email, password }) {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: defaultHeaders(),
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "Failed to log in");
    }
    return res.json();
  },
};

export const notesApi = {
  async list(token) {
    const res = await fetch(`${API_BASE_URL}/api/notes`, {
      headers: authHeaders(token),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "Failed to load notes");
    }
    return res.json();
  },

  async create(token, payload) {
    const res = await fetch(`${API_BASE_URL}/api/notes`, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "Failed to create note");
    }
    return res.json();
  },

  async update(token, id, payload) {
    const res = await fetch(`${API_BASE_URL}/api/notes/${id}`, {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "Failed to update note");
    }
    return res.json();
  },

  async remove(token, id) {
    const res = await fetch(`${API_BASE_URL}/api/notes/${id}`, {
      method: "DELETE",
      headers: authHeaders(token),
    });
    if (!res.ok && res.status !== 204) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "Failed to delete note");
    }
  },
};

