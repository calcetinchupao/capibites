const BASE_URL = process.env.REACT_APP_API_BASE_URL || (typeof window !== "undefined" && window.location && window.location.origin === "http://localhost:3000" ? "http://localhost:3001" : "");

const json = async (res) => {
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

const fetchApi = async (path, options) => {
  const url = `${BASE_URL}${path}`;
  try {
    const res = await fetch(url, options);
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("application/json")) throw new Error("invalid content-type");
    return json(res);
  } catch (err) {
    if ((BASE_URL === "" || BASE_URL === undefined) && typeof window !== "undefined" && window.location && window.location.origin === "http://localhost:3000") {
      const res2 = await fetch(`http://localhost:3001${path}`, options);
      return json(res2);
    }
    throw err;
  }
};

const authHeaders = () => {
  try {
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
};

export const productsApi = {
  list: () => fetchApi(`/api/v1/products`, { headers: { Accept: "application/json", ...authHeaders() } }),
  adminList: () => fetchApi(`/api/v1/admin/products`, { headers: { Accept: "application/json", ...authHeaders() } }),
  adminGet: (id) => fetchApi(`/api/v1/admin/products/${id}`, { headers: { Accept: "application/json", ...authHeaders() } }),
  adminCreate: (payload) =>
    fetchApi(`/api/v1/admin/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(payload),
    }),
  adminUpdate: (id, payload) =>
    fetchApi(`/api/v1/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(payload),
    }),
  adminDelete: (id) =>
    fetchApi(`/api/v1/admin/products/${id}`, {
      method: "DELETE",
      headers: { Accept: "application/json", ...authHeaders() },
    }),
};

export const ordersApi = {
  create: (payload) =>
    fetchApi(`/api/v1/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(payload),
    }),
};

export const adminOrdersApi = {
  list: () => fetchApi(`/api/v1/admin/orders`, { headers: { Accept: "application/json", ...authHeaders() } }),
  updateStatus: (id, status) =>
    fetchApi(`/api/v1/admin/orders/${id}/status`, { method: "PUT", headers: { "Content-Type": "application/json", ...authHeaders() }, body: JSON.stringify({ estado: status }) }),
};

export const healthApi = {
  ping: () => fetchApi(`/api/v1/health`, { headers: { Accept: "application/json" } }),
};

export const authApi = {
  register: (payload) =>
    fetchApi(`/api/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
  login: (payload) =>
    fetchApi(`/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((data) => {
      try {
        if (data?.token) localStorage.setItem("authToken", data.token);
      } catch {}
      return data;
    }),
  me: () => fetchApi(`/api/v1/auth/me`, { headers: { Accept: "application/json", ...authHeaders() } }),
};
