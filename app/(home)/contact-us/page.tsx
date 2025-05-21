"use client"

import toast from "react-hot-toast";

export default function ContactUs(){
    
const handleSubmit = async (formData: FormData) => {
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    try {
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/contact/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name ,email,subject,message
        }),
      });

      if (res.ok) {
        toast.success("your response has been submitted.")
      } else {
        console.error('Failed to submit:', await res.text());
      }

    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <a href="/" className="hover:text-blue-600">Home</a>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">Contact</span>
        </div>

        {/* Page Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600">We're here to help and answer any questions you may have.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Methods */}
          <div className="space-y-6">
            {/* Email Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="bg-blue-600 px-6 py-4">
                <h2 className="text-lg font-semibold text-white">1. Send us an email</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">If you are facing any issue or have feedback, write to us at</p>
                <a href="mailto:info@txigo.com" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                  <i className="fas fa-envelope mr-2"></i>
                  <span>info@txigo.com</span>
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="bg-blue-600 px-6 py-4">
                <h2 className="text-lg font-semibold text-white">2. Call us 24/7</h2>
              </div>
              <div className="p-6">
                <a href="tel:9045450000" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-2">
                  <i className="fas fa-phone-alt mr-2"></i>
                  <span>90 4545 0000</span>
                </a>
                <p className="text-sm text-gray-500">(standard STD/local charges apply)</p>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="bg-blue-600 px-6 py-4">
                <h2 className="text-lg font-semibold text-white">3. Send mail to our address</h2>
              </div>
              <div className="p-6">
                <div className="flex items-start">
                  <i className="fas fa-map-marker-alt mt-1 mr-3 text-gray-500"></i>
                  <div>
                    <p className="font-medium text-gray-900">txigo Car Rentals Pvt. Ltd.</p>
                    <p className="text-gray-700">2nd, 3rd & 4th Floors, 1137, RG. Towers</p>
                    <p className="text-gray-700">100Ft Road, Indiranagar</p>
                    <p className="text-gray-700">Bangalore - 560038</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Grievance Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="bg-blue-600 px-6 py-4">
                <h2 className="text-lg font-semibold text-white">4. Grievance Redressal - Nodal officer</h2>
              </div>
              <div className="p-6">
                <div className="flex items-start">
                  <i className="fas fa-user-tie mt-1 mr-3 text-gray-500"></i>
                  <div>
                    <p className="font-medium text-gray-900">Manik Shah</p>
                    <a href="mailto:nodal.officer@txigo.com" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                      <i className="fas fa-envelope mr-2"></i>
                      <span>nodal.officer@txigo.com</span>
                    </a>
                    <p className="text-gray-700 mt-2">2nd, 3rd & 4th Floors, 1137, RG. Towers</p>
                    <p className="text-gray-700">100Ft Road, Indiranagar</p>
                    <p className="text-gray-700">Bangalore - 560038</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 h-full">
            <div className="bg-blue-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Our Location</h2>
            </div>
            <div className="h-96 w-full">
              {/* Google Map Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.715036934539!2d77.64007031534448!3d12.967783990848754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15c49c040309%3A0x6553433f72187bdb!2stxigo%20Car%20Rentals!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-b-lg"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-16 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 max-w-3xl mx-auto">
          <div className="bg-blue-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Send us a message</h2>
          </div>
          <div className="p-6">
            <form className="space-y-6" action={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name = "subject"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  placeholder="Subject of your message"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  name="message"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
