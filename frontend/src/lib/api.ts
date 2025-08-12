const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL; 

export const apiRequest = async (endpoint: string, method: string = "GET", body?: any) => {
  const token = localStorage.getItem("token");
  console.log(API_BASE,"base url")

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
};
