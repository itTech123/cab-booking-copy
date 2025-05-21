"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Loader2, Save } from 'lucide-react'
import toast from 'react-hot-toast'

interface BlogData {
  id: string
  title: string
  description: string
  content: string // kept for structure compatibility, but will not be edited/displayed
}

const BlogEditor = () => {
  const [blogData, setBlogData] = useState<BlogData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Fetch blog data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/blog/get-blog`)
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setBlogData(data)
   
      } catch (error) {
        toast.error('Failed to load blog data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!blogData) return

    setIsSaving(true)
    const toastId = toast.loading('Saving changes...')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/blog/update-blog`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      })

      if (!response.ok) throw new Error('Update failed')

      const updatedData = await response.json()
      setBlogData(updatedData)
      toast.success('Blog updated successfully', { id: toastId })
    } catch (error) {
      toast.error('Failed to update blog', { id: toastId })
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBlogData(prev => prev ? { ...prev, [name]: value } : null)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!blogData) {
    return (
      <div className="p-4 text-center">
        <p>No blog data found</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Blog Editor</h1>

      <Card>
        <CardHeader>
          <CardTitle>Edit Blog</CardTitle>
          <CardDescription>Update the blog title and description</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                name="title"
                value={blogData.title}
                onChange={handleChange}
                placeholder="Blog title"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={blogData.description}
                onChange={handleChange}
                placeholder="Blog description"
                className="min-h-[200px]"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default BlogEditor
