import { ref, computed } from 'vue'

// Lightweight auth state stored in localStorage on the client
const token = ref<string | null>(typeof window !== 'undefined' ? localStorage.getItem('token') : null)

export const useAuth = () => {
  const isAuthenticated = computed(() => !!token.value)
  const setToken = (t: string | null) => {
    token.value = t
    if (typeof window !== 'undefined') {
      if (t) localStorage.setItem('token', t)
      else localStorage.removeItem('token')
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    const res = await fetch('/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(text || 'Signup failed')
    }
    const data = await res.json()
    const t = data?.token ?? null
    if (t) setToken(t)
    return data
  }

  const login = async (email: string, password: string) => {
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(text || 'Login failed')
    }
    const data = await res.json()
    const t = data?.token ?? null
    if (t) setToken(t)
    return data
  }

  const logout = () => setToken(null)

  return {
    isAuthenticated,
    signup,
    login,
    logout,
    get token() { return token.value }
  }
}
