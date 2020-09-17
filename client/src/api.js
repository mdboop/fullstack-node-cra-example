const DEFAULT_OPTIONS = {
  headers: { "Content-Type": "application/json" },
}

async function request(path, options) {
  try {
    const res = await fetch(path, { ...DEFAULT_OPTIONS, ...options })
    const data = await res.json()

    if (!res.ok) {
      const error = {
        message: (data && data.message) || "unknown",
        status: res.status,
      }
      throw error
    }

    return data
  } catch (e) {
    console.error(e)
    throw e
  }
}

export async function getUsers() {
  return request("/api/users", { method: "GET" })
}

export async function getUser(id) {
  return request(`/api/users/${id}`, { method: "GET" })
}

export async function createUser(user) {
  return request(`/api/users`, {
    method: "POST",
    body: JSON.stringify(user),
  })
}
