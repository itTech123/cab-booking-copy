'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

const setWithExpiry = (key: string, value: string, days: number) => {
  try {
    const now = new Date()
    const expiry = now.getTime() + days * 24 * 60 * 60 * 1000
    const item = {
      value,
      expiry
    }
    localStorage.setItem(key, JSON.stringify(item))
    console.log('Successfully set localStorage item:', key) // Debug log
  } catch (error) {
    console.error('Error setting localStorage:', error)
  }
}
  const handleLogin = async () => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      const data = await res.json()
      console.log(data)
      if (!res.ok) {
        throw new Error(data.message || 'Login failed')
      }

      // ✅ Set isAdmin with 7-day expiry
      setWithExpiry('isAdmin', 'true', 7)

      setTimeout(() => {
        router.push('/admin');
      }, 100);
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <Button onClick={handleLogin} className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
