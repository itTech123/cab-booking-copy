'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

const jobOpenings = [
  {
    id: 1,
    title: 'Frontend Developer',
    type: 'Full-time',
    description: 'Develop and maintain responsive user interfaces using React and Tailwind CSS.'
  },
  {
    id: 2,
    title: 'Backend Engineer',
    type: 'Full-time',
    description: 'Design APIs, manage databases, and ensure performance and security for backend systems.'
  },
  {
    id: 3,
    title: 'UX Designer',
    type: 'Contract',
    description: 'Create intuitive user experiences and improve UI/UX of our web applications.'
  }
]

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jobId: 0,
    jobTitle: ''
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!resumeFile) {
      alert('Please upload your resume')
      setIsSubmitting(false)
      return
    }

    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('phone', formData.phone)
    formDataToSend.append('jobId', formData.jobId.toString())
    formDataToSend.append('jobTitle', formData.jobTitle)
    formDataToSend.append('resume', resumeFile)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/career/apply`, {
        method: 'POST',
        body: formDataToSend
      })

      if (!response.ok) throw new Error('Submission failed')

      alert('Application submitted successfully!')
      setFormData({ name: '', email: '', phone: '', jobId: 0, jobTitle: '' })
      setResumeFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (error) {
      alert('Error submitting application')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Join Our Team</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We're looking for talented individuals to help us build amazing products.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobOpenings.map(job => (
          <div
            key={job.id}
            className="border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white flex flex-col"
          >
            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 mb-4">
                {job.type}
              </span>
              <p className="text-gray-600 mb-6">{job.description}</p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
                  onClick={() => {
                    setSelectedJob(job.id)
                    setFormData(prev => ({
                      ...prev,
                      jobId: job.id,
                      jobTitle: job.title
                    }))
                  }}
                >
                  Apply Now
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg rounded-lg">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gray-900">
                    Apply for {job.title}
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Applying For</label>
                    <input
                      type="text"
                      value={formData.jobTitle}
                      disabled
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resume (PDF)*</label>
                    <div className="mt-1 flex items-center">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={e => setResumeFile(e.target.files?.[0] || null)}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-lg file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                        accept=".pdf,.doc,.docx"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : 'Submit Application'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  )
}