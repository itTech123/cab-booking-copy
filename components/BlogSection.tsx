"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Loader2 } from "lucide-react"
import { fetchHeading } from "@/actions"

interface BlogData {
  title: string
  description: string
}

export function BlogSection() {
  const [blogData, setBlogData] = useState<BlogData | null>(null)
  const [loading, setLoading] = useState(true)
  const [blogHeading, setBlogHeading] = useState<{ title: string,description: string } | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/blog/get-blog`)
        if (!response.ok) throw new Error("Failed to fetch blog")
        const data = await response.json()
        setBlogData(data)
      } catch (error) {
        console.error("Error fetching blog:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [])
  
    useEffect(() => {
      const loadHeading = async () => {
        try {
         
      
          const blogData = await fetchHeading("blogHeading");
          if (blogData) {
            setBlogHeading(blogData);
          }
        } catch (err) {
          console.error("Error loading headings:", err);
        }
      };
  
      loadHeading();
    }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!blogData) {
    return (
      <section className="py-16 bg-white text-center">
        <p className="text-gray-600">No blog data found.</p>
      </section>
    )
  }

  
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            <span className="text-orange-500">{blogHeading?.title}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {blogHeading?.description}
          </p>
        </div>

        <div className="relative">
          {/* Right-floated image */}
          <div className="float-right ml-8 mb-6 w-full md:w-1/2 lg:w-2/5 relative h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/banner.jpg"
              alt="Road Safety in India"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {blogData.title}
            </h3>

            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
              {blogData.description}
            </div>
          </div>

          <div className="clear-both"></div>
        </div>
      </div>
    </section>
  )
}
