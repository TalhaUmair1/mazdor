// @ts-nocheck
import { ref } from 'vue'

const STORAGE_KEY = 'mazdor_users'
const SESSION_KEY = 'mazdor_session'

type User = { id: string; email: string; name?: string; password?: string; avatar?: string }

function loadUsers(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

function ensureSeed() {
  const users = loadUsers()
  if (users.length === 0) {
    const seed = [{ id: 'u1', email: 'test@example.com', password: 'password123', name: 'Test User' }]
    saveUsers(seed)
  }
}

export function useMockAuth() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  function findUserByEmail(email: string) {
    const users = loadUsers()
    return users.find((u) => u.email === email)
  }

  function register(name: string, email: string, password: string) {
    loading.value = true
    error.value = null
    return new Promise((resolve, reject) => {
      try {
        ensureSeed()
        const users = loadUsers()
        if (users.find((u) => u.email === email)) {
          error.value = 'User already exists'
          reject(new Error(error.value))
          return
        }
        const newUser = { id: 'u' + (users.length + 1), email, name, password, avatar: '' }
        users.push(newUser)
        saveUsers(users)
        localStorage.setItem(SESSION_KEY, JSON.stringify({ id: newUser.id, email: newUser.email }))
        resolve(newUser)
      } catch (e) {
        error.value = 'Signup failed'
        reject(e)
      } finally {
        loading.value = false
      }
    })
  }

  function login(email: string, password: string) {
    loading.value = true
    error.value = null
    return new Promise((resolve, reject) => {
      try {
        ensureSeed()
        const user = findUserByEmail(email)
        if (!user || user.password !== password) {
          error.value = 'Invalid credentials'
          reject(new Error(error.value))
          return
        }
        const token = 'mock-token-' + user.id
        localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, email: user.email, token }))
        resolve({ user, token })
      } catch (e) {
        error.value = 'Login failed'
        reject(e)
      } finally {
        loading.value = false
      }
    })
  }

  function currentUser() {
    try {
      const sess = localStorage.getItem(SESSION_KEY)
      if (!sess) return null
      return JSON.parse(sess)
    } catch {
      return null
    }
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY)
  }

  // seed on first import
  ensureSeed()

  return { login, register, currentUser, logout, loading, error }
}
