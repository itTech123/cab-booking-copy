'use client'

export const fleetData = [
    {
        type: "MINI/HATCHBACK",
        ac: true,
        rating: "4.7/5",
        reviews: 4291,
        seats: 4,
        packages: [
            { name: "01 HOUR 15 KMS", price: 651, advance: 351, extraKm: 10, extraHour: 120 },
            { name: "03 HOUR 30 KMS", price: 1251, advance: 551, extraKm: 10, extraHour: 120 },
            { name: "05 HOUR 50 KMS", price: 1751, advance: 551, extraKm: 10, extraHour: 120 },
            { name: "08 HOUR 80 KMS", price: 2351, advance: 751, extraKm: 10, extraHour: 120 },
            { name: "10 HOUR 100 KMS", price: 2751, advance: 751, extraKm: 10, extraHour: 120 },
            { name: "12 HOUR 120 KMS", price: 3251, advance: 851, extraKm: 10, extraHour: 120 },
        ],
        image: "/etios-cab.jpg",
        nightAllowance: 200
    },
    {
        type: "SEDAN",
        ac: true,
        rating: "4.9/5",
        reviews: 3942,
        seats: 4,
        packages: [
            { name: "01 HOUR 15 KMS", price: 751, advance: 351, extraKm: 12, extraHour: 120 },
            { name: "03 HOUR 30 KMS", price: 1351, advance: 551, extraKm: 12, extraHour: 120 },
            { name: "05 HOUR 50 KMS", price: 1851, advance: 551, extraKm: 12, extraHour: 120 },
            { name: "08 HOUR 80 KMS", price: 2451, advance: 751, extraKm: 12, extraHour: 120 },
            { name: "10 HOUR 100 KMS", price: 2851, advance: 751, extraKm: 12, extraHour: 120 },
            { name: "12 HOUR 120 KMS", price: 3351, advance: 851, extraKm: 12, extraHour: 120 },
        ],
        image: "/toyota-inova.jpg",
        nightAllowance: 200
    },
    {
        type: "SUV",
        ac: true,
        rating: "4.8/5",
        reviews: 4859,
        seats: 6,
        packages: [
            { name: "01 HOUR 15 KMS", price: 1051, advance: 351, extraKm: 16, extraHour: 160 },
            { name: "03 HOUR 30 KMS", price: 1651, advance: 551, extraKm: 16, extraHour: 160 },
            { name: "05 HOUR 50 KMS", price: 2351, advance: 551, extraKm: 16, extraHour: 160 },
            { name: "08 HOUR 80 KMS", price: 3051, advance: 751, extraKm: 16, extraHour: 160 },
            { name: "10 HOUR 100 KMS", price: 3451, advance: 751, extraKm: 16, extraHour: 160 },
            { name: "12 HOUR 120 KMS", price: 3851, advance: 851, extraKm: 16, extraHour: 160 },
        ],
        image: "/suv.jpg",
        nightAllowance: 200
    },
    {
        type: "SUV+",
        ac: true,
        rating: "4.8/5",
        reviews: 3859,
        seats: 7,
        packages: [
            { name: "01 HOUR 15 KMS", price: 1351, advance: 651, extraKm: 20, extraHour: 200 },
            { name: "03 HOUR 30 KMS", price: 1951, advance: 851, extraKm: 20, extraHour: 200 },
            { name: "05 HOUR 50 KMS", price: 2651, advance: 851, extraKm: 20, extraHour: 200 },
            { name: "08 HOUR 80 KMS", price: 3351, advance: 1051, extraKm: 20, extraHour: 200 },
            { name: "10 HOUR 100 KMS", price: 3751, advance: 1051, extraKm: 20, extraHour: 200 },
            { name: "12 HOUR 120 KMS", price: 4151, advance: 1151, extraKm: 20, extraHour: 200 },
        ],
        image: "/suv.jpg",
        nightAllowance: 200
    },
    {
        type: "13 SEATER TRAVELLER",
        ac: true,
        rating: "4.6/5",
        reviews: 2859,
        seats: 13,
        packages: [
            { name: "08 HOUR 80 KMS", price: 7501, advance: 1501, extraKm: 35, extraHour: 350 },
            { name: "10 HOUR 100 KMS", price: 8501, advance: 2001, extraKm: 35, extraHour: 350 },
            { name: "12 HOUR 120 KMS", price: 10501, advance: 2501, extraKm: 35, extraHour: 350 },
        ],
        image: "/tempo-1.jpg",
        nightAllowance: 300
    },
    {
        type: "17 SEATER TRAVELLER",
        ac: true,
        rating: "4.5/5",
        reviews: 2259,
        seats: 17,
        packages: [
            { name: "08 HOUR 80 KMS", price: 8501, advance: 1501, extraKm: 40, extraHour: 400 },
            { name: "10 HOUR 100 KMS", price: 9501, advance: 2001, extraKm: 40, extraHour: 400 },
            { name: "12 HOUR 120 KMS", price: 11501, advance: 2501, extraKm: 40, extraHour: 400 },
        ],
        image: "/tempo-2.jpg",
        nightAllowance: 300
    },
    {
        type: "24 SEATER TRAVELLER",
        ac: true,
        rating: "4.4/5",
        reviews: 1859,
        seats: 24,
        packages: [
            { name: "08 HOUR 80 KMS", price: 9501, advance: 2001, extraKm: 50, extraHour: 500 },
            { name: "10 HOUR 100 KMS", price: 10501, advance: 2501, extraKm: 50, extraHour: 500 },
            { name: "12 HOUR 120 KMS", price: 12501, advance: 3001, extraKm: 50, extraHour: 500 },
        ],
        image: "/tempo-2.jpg",
        nightAllowance: 300
    }
]

export const roundTripRates = [
  { fleet: "MINI/HATCHBACK", perKm: 12, perHour: 120, image: "/etios-cab.jpg" },
  { fleet: "SEDAN", perKm: 14, perHour: 140, image: "/inova-crysta.jpg" },
  { fleet: "SUV", perKm: 17, perHour: 170, image: "/suv.jpg"  },
  { fleet: "SUV+", perKm: 20, perHour: 200, image: "/suv.jpg"},
  { fleet: "13 SEATER TRAVELLER", perKm: 30, perHour: 300, image: "/tempo-1.jpg" },
  { fleet: "17 SEATER TRAVELLER", perKm: 40, perHour: 400, image: "/tempo-2.jpg" },
  { fleet: "24 SEATER TRAVELLER", perKm: 50, perHour: 500, image: "/tempo-2.jpg" },
];


export const oneWayRates = [
  {
    type: "MINI/HATCHBACK",
    ratePerKm: 15,
    image: "/etios-cab.jpg"
  },
  {
    type: "SEDAN",
    ratePerKm: 17,
    image: "/inova-crysta.jpg"
  },
  {
    type: "SUV",
    ratePerKm: 20,
    image: "/suv.jpg"
  },
  {
    type: "SUV+",
    ratePerKm: 25,
   image: "/suv.jpg"
  },
  {
    type: "13 SEATER TRAVELLER",
    ratePerKm: 50,
   image: "/tempo-1.jpg"
  },
  {
    type: "17 SEATER TRAVELLER",
    ratePerKm: 60,
    image: "/tempo-2.jpg"
  },
  {
    type: "24 SEATER TRAVELLER",
    ratePerKm: 70,
    image: "/tempo-2.jpg"
  }
];


export const popularLocations = [
  {
    state: "Delhi",
    popularDistricts: [
      { district: "Delhi", state: "Delhi" },
      { district: "Mathura", state: "Uttar Pradesh" },
      { district: "Jaipur", state: "Rajasthan" },
      { district: "Agra", state: "Uttar Pradesh" },
      { district: "Haridwar", state: "Uttarakhand" },
      { district: "Rishikesh", state: "Uttarakhand" },
      { district: "Dehradun", state: "Uttarakhand" }
    ]
  },
  {
    state: "Karnataka",
    popularDistricts: [
      { district: "Bangalore", state: "Karnataka" },
      { district: "Mysore", state: "Karnataka" },
      { district: "Tirupati", state: "Andhra Pradesh" },
      { district: "Ooty", state: "Tamil Nadu" },
      { district: "Chennai", state: "Tamil Nadu" },
      { district: "Coimbatore", state: "Tamil Nadu" }
    ]
  },
  {
    state: "West Bengal",
    popularDistricts: [
      { district: "Kolkata", state: "West Bengal" },
      { district: "Mayapur", state: "West Bengal" },
      { district: "Mandarmani", state: "West Bengal" },
      { district: "Digha", state: "West Bengal" },
      { district: "Durgapur", state: "West Bengal" }
    ]
  },
  {
    state: "Tamil Nadu",
    popularDistricts: [
      { district: "Chennai", state: "Tamil Nadu" },
      { district: "Puducherry", state: "Puducherry" },
      { district: "Bangalore", state: "Karnataka" },
      { district: "Tirupati", state: "Andhra Pradesh" },
      { district: "Vellore", state: "Tamil Nadu" },
      { district: "Mahabalipuram", state: "Tamil Nadu" },
      { district: "Tiruvannamalai", state: "Tamil Nadu" }
    ]
  },
  {
    state: "Maharashtra",
    popularDistricts: [
      { district: "Mumbai", state: "Maharashtra" },
      { district: "Pune", state: "Maharashtra" },
      { district: "Lonavala", state: "Maharashtra" },
      { district: "Mahabaleshwar", state: "Maharashtra" },
      { district: "Aurangabad", state: "Maharashtra" },
      { district: "Nashik", state: "Maharashtra" },
      { district: "Shirdi", state: "Maharashtra" },
      { district: "Surat", state: "Gujarat" }
    ]
  },
  {
    state: "Telangana",
    popularDistricts: [
      { district: "Hyderabad", state: "Telangana" },
      { district: "Warangal", state: "Telangana" },
      { district: "Nizamabad", state: "Telangana" },
      { district: "Karimnagar", state: "Telangana" },
      { district: "Khammam", state: "Telangana" }
    ]
  },
  {
    state: "Chandigarh",
    popularDistricts: [
      { district: "Chandigarh", state: "Chandigarh" },
      { district: "Shimla", state: "Himachal Pradesh" },
      { district: "Manali", state: "Himachal Pradesh" },
      { district: "New Delhi", state: "Delhi" },
      { district: "Kasol", state: "Himachal Pradesh" },
      { district: "Amritsar", state: "Punjab" },
      { district: "Kasauli", state: "Himachal Pradesh" }
    ]
  }
];
