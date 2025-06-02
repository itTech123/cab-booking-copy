import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProfessionalPricingFleet() {
    const plans = [
        {
            category: "BASIC",
            highlight: true,
            items: [
                {
                    name: "SILVER",
                    price: "₹5,000 ",
                    originalPrice: "",
                    fleets: "Upto 5 fleets",
                    services: "Airport Transfers",
                    commission: "10% commission",
                    support: "Mail support",
                    validity: "6 months",
                    incentives: "",
                    buttonVariant: "silver",
                    badgeColor: "bg-gray-100 text-gray-800 border border-gray-300",
                    cardBorder: "border-gray-300",
                    popular: false,
                    featured: false
                },
                {
                    name: "GOLD",
                    price: "₹10,000 ",
                    originalPrice: "",
                    fleets: "Upto 5 fleets",
                    services: "Airport + Rental + Outstation",
                    commission: "10% commission",
                    support: "WhatsApp + Mail",
                    validity: "9 months",
                    incentives: "",
                    buttonVariant: "gold",
                    badgeColor: "bg-amber-50 text-amber-800 border border-amber-200",
                    cardBorder: "border-amber-200",
                    popular: false,
                    featured: true // Make Gold featured in Basic
                },
                {
                    name: "DIAMOND",
                    price: "₹15,000 ",
                    originalPrice: "",
                    fleets: "Upto 5 fleets",
                    services: "Airport + Rental + Outstation",
                    commission: "No commission",
                    support: "Call + WhatsApp + Mail",
                    validity: "1 year",
                    incentives: "",
                    buttonVariant: "diamond",
                    badgeColor: "bg-blue-50 text-blue-800 border border-blue-200",
                    cardBorder: "border-blue-200",
                    popular: true,
                    featured: true // Make Diamond featured in Basic
                },
            ],
        },
        {
            category: "STANDARD",
            highlight: true,
            items: [
                {
                    name: "SILVER",
                    price: "₹10,000 ",
                    originalPrice: "",
                    fleets: "Upto 10 fleets",
                    services: "Airport Transfers",
                    commission: "5%-10% commission",
                    support: "Mail support",
                    validity: "6 months",
                    incentives: "",
                    buttonVariant: "silver",
                    badgeColor: "bg-gray-100 text-gray-800 border border-gray-300",
                    cardBorder: "border-gray-300",
                    popular: false,
                    featured: false
                },
                {
                    name: "GOLD",
                    price: "₹15,000 ",
                    originalPrice: "",
                    fleets: "Upto 10 fleets",
                    services: "Airport + Rental + Outstation",
                    commission: "0%-10% commission",
                    support: "WhatsApp + Mail",
                    validity: "9 months",
                    incentives: "After 5 rides bonus",
                    buttonVariant: "gold",
                    badgeColor: "bg-amber-50 text-amber-800 border border-amber-200",
                    cardBorder: "border-amber-200",
                    popular: true,
                    featured: true
                },
                {
                    name: "DIAMOND",
                    price: "₹20,000 ",
                    originalPrice: "",
                    fleets: "Upto 10 fleets",
                    services: "Airport + Rental + Outstation",
                    commission: "Zero commission",
                    support: "Call + WhatsApp + Mail",
                    validity: "12 months",
                    incentives: "After 5 rides bonus",
                    buttonVariant: "diamond",
                    badgeColor: "bg-blue-50 text-blue-800 border border-blue-200",
                    cardBorder: "border-blue-200",
                    popular: false,
                    featured: true
                },
            ],
        },
        {
            category: "PREMIUM",
            highlight: true,
            items: [
                {
                    name: "SILVER",
                    price: "₹25,000",
                    originalPrice: "",
                    fleets: "Upto 25 fleets",
                    services: "Airport Transfers",
                    commission: "0-10% commission",
                    support: "Mail support",
                    validity: "6 months",
                    incentives: "After 5 rides bonus",
                    buttonVariant: "silver",
                    badgeColor: "bg-gray-100 text-gray-800 border border-gray-300",
                    cardBorder: "border-gray-300",
                    popular: false,
                    featured: false
                },
                {
                    name: "GOLD",
                    price: "₹35,000",
                    originalPrice: "",
                    fleets: "Upto 25 fleets",
                    services: "Airport + Rental + Outstation",
                    commission: "0%-10% commission",
                    support: "WhatsApp + Mail",
                    validity: "9 months",
                    incentives: "After 5 rides bonus",
                    buttonVariant: "gold",
                    badgeColor: "bg-amber-50 text-amber-800 border border-amber-200",
                    cardBorder: "border-amber-200",
                    popular: false,
                    featured: true
                },
                {
                    name: "DIAMOND",
                    price: "₹50,000",
                    originalPrice: "",
                    fleets: "Upto 25 fleets",
                    services: "Airport + Rental + Outstation",
                    commission: "0 commission",
                    support: "Call + WhatsApp + Mail",
                    validity: "12 months",
                    incentives: "After 5 rides bonus",
                    buttonVariant: "diamond",
                    badgeColor: "bg-blue-50 text-blue-800 border border-blue-200",
                    cardBorder: "border-blue-200",
                    popular: true,
                    featured: true
                },
            ],
        },
    ];

    return (
      <div className="container mx-auto py-12 px-4 space-y-20">
    <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Vendor Plans</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your fleet management needs with our tiered pricing options
        </p>
    </div>

    {plans.map((plan) => (
        <div key={plan.category} className="space-y-10">
            {/* Section Heading */}
            <div className="text-center">
                <h3
                    className={`text-3xl font-bold text-white inline-block px-6 py-3 rounded-full shadow-md uppercase ${plan.category === "Silver"
                            ? "bg-gradient-to-r from-gray-400 to-gray-500"
                            : plan.category === "Gold"
                                ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                                : plan.category === "Diamond"
                                    ? "bg-gradient-to-r from-blue-600 to-purple-700"
                                    : "bg-gray-700"
                        }`}
                >
                    {plan.category} PLANS
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Cards */}
            <div className="grid gap-8 md:grid-cols-3">
                {plan.items.map((item) => (
                    <div key={`${plan.category}-${item.name}`} className={`relative ${item.featured ? "md:row-span-1" : ""}`}>
                        {item.popular && (
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-lg">
                                    Most Popular
                                </Badge>
                            </div>
                        )}

                        <Card
                            className={`h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-t-4 ${item.cardBorder} ${item.popular ? "border-t-primary shadow-md" : "border-t-transparent"
                                } ${item.featured ? "border-2 border-primary/20" : ""}`}
                        >
                            <CardHeader className="pb-4">
                                {/* Plan Name Badge */}
                                <div
                                    className={`w-fit mx-auto px-6 py-2 text-white text-xl font-bold rounded-full shadow-md uppercase tracking-wide ${item.name.toUpperCase() === "GOLD"
                                            ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                                            : item.name.toUpperCase() === "SILVER"
                                                ? "bg-gradient-to-r from-gray-400 to-gray-500"
                                                : item.name.toUpperCase() === "DIAMOND"
                                                    ? "bg-gradient-to-r from-blue-600 to-purple-700"
                                                    : "bg-gray-700"
                                        } ${item.featured ? "scale-105" : ""}`}
                                >
                                    {item.name}
                                </div>

                                {/* Price */}
                                <div className="text-center mt-4">
                                    <CardTitle className="text-3xl font-bold text-red-600">{item.price}</CardTitle>
                                    <p className="text-sm text-red-500 mt-1">+GST</p>
                                    {item.originalPrice && (
                                        <p className="text-gray-500 line-through mt-1">{item.originalPrice}</p>
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4 flex-grow">
                                <div className="space-y-3">
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">Fleets:</span>
                                        <span className="font-medium text-gray-900">{item.fleets}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">Services:</span>
                                        <span className="font-medium text-gray-900 text-right">{item.services}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">Commission:</span>
                                        <span className="font-medium text-gray-900">{item.commission}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">Support:</span>
                                        <span className="font-medium text-gray-900">{item.support}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">Validity:</span>
                                        <span className="font-medium text-gray-900">{item.validity}</span>
                                    </div>
                                    {item.incentives && (
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-gray-600">Incentives:</span>
                                            <span className="font-medium text-green-600">{item.incentives}</span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>

                            <CardFooter className="mt-6">
                                <Button
                                    className={`w-full py-6 rounded-lg text-lg font-semibold transition-all ${item.buttonVariant === "gold"
                                            ? "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white shadow-md hover:shadow-lg"
                                            : item.buttonVariant === "diamond"
                                                ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg"
                                                : item.name.toUpperCase() === "SILVER"
                                                    ? "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-md hover:shadow-lg"
                                                    : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm hover:shadow-md"
                                        } ${item.featured ? "scale-105" : ""}`}
                                >
                                    Get Started
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    ))}

    {/* Bottom Section */}
    <div className="text-center mt-16 bg-gray-50 rounded-xl py-8 px-6 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">Need help choosing?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Contact our sales team to discuss which plan works best for your business requirements.
        </p>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-4">
            Contact Sales
        </Button>
    </div>
</div>


    );
}