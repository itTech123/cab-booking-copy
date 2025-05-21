

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Johnson",
      position: "CEO & Founder",
      image: "/banner.jpg"
    },
    {
      name: "Sarah Williams",
      position: "CTO",
      image: "/banner.jpg"
    },
    {
      name: "Michael Chen",
      position: "Lead Designer",
      image: "/banner.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/banner.jpg')" }}>
      <div className="backdrop-blur-sm bg-black/50 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center text-white mb-12">Our Story</h1>
          
          <Tabs defaultValue="about" className="w-full">
            {/* Changed navigation colors below */}
            <TabsList className="grid w-full grid-cols-3 bg-white/20 backdrop-blur-md rounded-lg p-1 gap-1">
              <TabsTrigger 
                value="about" 
                className="data-[state=active]:bg-indigo-600 text-white data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 rounded-md py-2"
              >
                About Us
              </TabsTrigger>
              <TabsTrigger 
                value="journey" 
                className="data-[state=active]:bg-indigo-600 text-white data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 rounded-md py-2"
              >
                Our Journey
              </TabsTrigger>
              <TabsTrigger 
                value="team" 
                className="data-[state=active]:bg-indigo-600 text-white data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 rounded-md py-2"
              >
                Our Team
              </TabsTrigger>
            </TabsList>
            
            {/* Rest of the content remains unchanged */}
            <TabsContent value="about" className="mt-8">
              <Card className="p-8 bg-white/90 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-6">Who We Are</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Proin at quam eros. Sed blandit, odio a convallis suscipit, nisl risus eleifend elit, eu porttitor quam sem non nunc. Aliquam erat volutpat. Duis tincidunt augue ut felis blandit at dictum libero dignissim. Donec varius dignissim ligula, quis aliquam massa viverra ac. Integer posuere, nunc a venenatis condimentum, ipsum libero pulvinar tortor, sit amet sollicitudin tortor purus non metus.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Vivamus fermentum semper porta. Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. Maecenas convallis ullamcorper ultricies. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis.
                </p>
              </Card>
            </TabsContent>
            
            <TabsContent value="journey" className="mt-8">
              <Card className="p-0 overflow-hidden bg-white/90 backdrop-blur-sm">
                <div className="relative h-96 w-full">
                  <Image
                    src="/banner.jpg"
                    alt="Our Journey"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Our Journey</h2>
                  <p className="text-gray-700 leading-relaxed">
                    From humble beginnings to where we are today, our journey has been marked by innovation, perseverance, and a commitment to excellence. This image captures a pivotal moment in our company's history that set us on the path to success.
                  </p>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="team" className="mt-8">
              <Card className="p-8 bg-white/90 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-6">Meet Our Team</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Our team is composed of passionate professionals who bring diverse skills and perspectives to the table. Together, we work tirelessly to deliver exceptional results for our clients and push the boundaries of what's possible in our industry.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="relative h-40 w-40 rounded-full overflow-hidden mb-4 border-4 border-primary">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-gray-600">{member.position}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}