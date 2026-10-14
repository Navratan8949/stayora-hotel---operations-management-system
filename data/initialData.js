// Initial Seed Data for Stayora Hotel & Management System
// Fictional demonstration property by Code Pe Charcha

export const INITIAL_PROPERTIES = [
  {
    id: "prop_jaipur",
    name: "Stayora Grand Jaipur",
    tagline: "A Royal Rajputana Heritage Experience",
    city: "Jaipur",
    state: "Rajasthan",
    country: "India",
    address: "Palace Road, Civil Lines, Jaipur, Rajasthan 302006",
    phone: "+91 141 289 4400",
    email: "reservations.jaipur@stayora.com",
    currency: "INR",
    currencySymbol: "₹",
    timezone: "Asia/Kolkata",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    taxRate: 12, // 12% GST illustrative demo rate
    serviceChargeRate: 5,
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80",
    description: "Nestled in the regal heart of the Pink City, Stayora Grand Jaipur merges centuries-old Rajput architecture with contemporary boutique luxury.",
    amenities: ["Rooftop Infinity Pool", "Royal Sheesh Mahal Dining", "Jharokha Ayurvedic Spa", "Butler Service", "Heritage Courtyard", "Valet Parking", "High-Speed Wi-Fi"]
  },
  {
    id: "prop_udaipur",
    name: "Stayora Retreat Udaipur",
    tagline: "Lakeside Serenity & Mewar Opulence",
    city: "Udaipur",
    state: "Rajasthan",
    country: "India",
    address: "Pichola Ghat Road, Udaipur, Rajasthan 313001",
    phone: "+91 294 252 8800",
    email: "reservations.udaipur@stayora.com",
    currency: "INR",
    currencySymbol: "₹",
    timezone: "Asia/Kolkata",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    taxRate: 12,
    serviceChargeRate: 5,
    heroImage: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1920&q=80",
    description: "An intimate waterfront palace retreat overlooking Lake Pichola and the Aravalli hills, offering private boat transfers and starlit dining.",
    amenities: ["Lake View Terrace", "Private Boat Jetty", "Pichola Wellness Spa", "Heated Pool", "Fine Dining", "Yoga Pavilion"]
  },
  {
    id: "prop_delhi",
    name: "Stayora Business Suites Delhi",
    tagline: "Executive Sophistication in the Capital",
    city: "New Delhi",
    state: "Delhi",
    country: "India",
    address: "Diplomatic Enclave, Chanakyapuri, New Delhi 110021",
    phone: "+91 11 4982 7700",
    email: "reservations.delhi@stayora.com",
    currency: "INR",
    currencySymbol: "₹",
    timezone: "Asia/Kolkata",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    taxRate: 12,
    serviceChargeRate: 5,
    heroImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80",
    description: "Tailored for discerning business and diplomatic travellers with state-of-the-art boardroom facilities, bespoke executive lounges and transit hubs.",
    amenities: ["Executive Lounge", "24/7 Business Center", "Smart Boardrooms", "Airport Limousine", "Fitness Center", "All-day Brasserie"]
  }
];

export const INITIAL_ROOM_TYPES = [
  {
    id: "rt_deluxe_heritage",
    propertyId: "prop_jaipur",
    slug: "deluxe-heritage-room",
    name: "Deluxe Heritage Room",
    category: "Deluxe",
    description: "Refined heritage room featuring hand-carved teakwood furnishings, traditional Rajasthani frescoes, and a plush king bed with courtyard vistas.",
    size: "420 sq.ft (39 sq.m)",
    bedType: "1 King Bed or 2 Twin Beds",
    baseCapacity: 2,
    maxAdults: 2,
    maxChildren: 1,
    basePrice: 8500,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["High-speed Wi-Fi", "4K Smart TV", "Marble En-suite Bath", "Organic Kama Ayurveda Toiletries", "Minibar", "Espresso Machine", "In-room Safe", "Work Desk", "Pillow Menu"],
    bathroomFeatures: ["Walk-in Rain Shower", "Luxury Brass Fittings", "Plush Bathrobes & Slippers"],
    cancellationPolicy: "Free cancellation up to 48 hours before check-in.",
    featured: true
  },
  {
    id: "rt_royal_rajput_suite",
    propertyId: "prop_jaipur",
    slug: "royal-rajput-suite",
    name: "Royal Rajput Suite",
    category: "Suite",
    description: "An opulent suite with a distinct living salon, ornate Jharokha window balcony, marble soaking tub, and dedicated 24-hour butler assistance.",
    size: "680 sq.ft (63 sq.m)",
    bedType: "1 Super King Bed",
    baseCapacity: 2,
    maxAdults: 3,
    maxChildren: 2,
    basePrice: 14500,
    images: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Butler Service", "Private Jharokha Balcony", "Separate Living Room", "Walk-in Dressing Closet", "Freestanding Copper Tub", "Premium Sound System", "Complimentary High Tea", "Cocktail Bar Setup"],
    bathroomFeatures: ["Freestanding Deep-Soak Tub", "Double Vanity", "Forest Essentials Amenities"],
    cancellationPolicy: "Free cancellation up to 72 hours before check-in.",
    featured: true
  },
  {
    id: "rt_haveli_courtyard",
    propertyId: "prop_jaipur",
    slug: "haveli-courtyard-room",
    name: "Haveli Courtyard Room",
    category: "Superior",
    description: "Located on the ground tier opening directly onto the tranquil lotus fountain courtyard. Boasts cool Kota stone floors and intricate jaali latticework.",
    size: "480 sq.ft (45 sq.m)",
    bedType: "1 King Bed",
    baseCapacity: 2,
    maxAdults: 2,
    maxChildren: 1,
    basePrice: 10500,
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Direct Courtyard Access", "Private Verandah", "Tea Sommelier Bar", "Smart Ambient Lighting", "Plush Daybed", "Mini Library"],
    bathroomFeatures: ["Sunlit Open-to-Sky Shower", "Rain Shower", "Signature Bath Salts"],
    cancellationPolicy: "Free cancellation up to 48 hours before check-in.",
    featured: false
  },
  {
    id: "rt_maharaja_presidential",
    propertyId: "prop_jaipur",
    slug: "maharaja-presidential-suite",
    name: "Maharaja Presidential Suite",
    category: "Presidential",
    description: "The crown jewel of Stayora Grand. Spread over an entire wing with private heated plunge pool, grand dining salon for 8, personal gym and panoramic Aravali hill views.",
    size: "1,450 sq.ft (135 sq.m)",
    bedType: "1 Royal Emperor Bed",
    baseCapacity: 2,
    maxAdults: 4,
    maxChildren: 2,
    basePrice: 32000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Private Heated Plunge Pool", "8-Seater Dining Hall", "Chef's Pantry", "Personal Wellness & Gym Space", "VIP Airport Limousine", "Dedicated 24/7 Concierge", "Curated Wine Cellar"],
    bathroomFeatures: ["Jacuzzi with Panoramic Views", "Steam & Sauna Enclosure", "Gilded Italian Vanity"],
    cancellationPolicy: "Non-refundable deposit. Flexible date changes up to 7 days prior.",
    featured: true
  },
  {
    id: "rt_luxury_garden_villa",
    propertyId: "prop_jaipur",
    slug: "luxury-garden-villa",
    name: "Luxury Garden Villa",
    category: "Villa",
    description: "Secluded private villa surrounded by fragrant jasmine and bougainvillea gardens. Features a private plunge pavilion and open-air gazebo.",
    size: "950 sq.ft (88 sq.m)",
    bedType: "1 Grand King Bed",
    baseCapacity: 2,
    maxAdults: 3,
    maxChildren: 2,
    basePrice: 21000,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Private Landscaped Garden", "Outdoor Dining Pavilion", "Daybed Gazebo", "Espresso Bar", "Bespoke Aromatherapy", "Complimentary Minibar"],
    bathroomFeatures: ["Outdoor Stone Bath", "Walk-in Rain Shower", "Botanical Toiletries"],
    cancellationPolicy: "Free cancellation up to 72 hours before check-in.",
    featured: false
  },
  {
    id: "rt_executive_suite",
    propertyId: "prop_delhi",
    slug: "executive-suite-delhi",
    name: "Executive Suite Delhi",
    category: "Executive",
    description: "Contemporary urban suite tailored for business leaders, equipped with an executive workstation, lounge and conference access.",
    size: "620 sq.ft (58 sq.m)",
    bedType: "1 King Bed",
    baseCapacity: 2,
    maxAdults: 2,
    maxChildren: 1,
    basePrice: 12000,
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Herman Miller Chair", "Dual 4K Monitors on request", "Lounge Access", "Meeting Room Allowance"],
    bathroomFeatures: ["Hydrotherapy Shower", "Dyson Hair Dryer"],
    cancellationPolicy: "Free cancellation up to 24 hours before check-in.",
    featured: false
  }
];

export const INITIAL_ROOMS = [
  // Jaipur - Ground Floor (101 - 106)
  { id: "room_101", number: "101", propertyId: "prop_jaipur", roomTypeId: "rt_deluxe_heritage", floor: 1, operationalStatus: "Occupied", housekeepingStatus: "Clean", maintenanceStatus: "Operational", currentGuest: "Vikram Singhania", keyCardCode: "KC-101-92" },
  { id: "room_102", number: "102", propertyId: "prop_jaipur", roomTypeId: "rt_deluxe_heritage", floor: 1, operationalStatus: "Occupied", housekeepingStatus: "Clean", maintenanceStatus: "Operational", currentGuest: "Ananya Sharma", keyCardCode: "KC-102-18" },
  { id: "room_103", number: "103", propertyId: "prop_jaipur", roomTypeId: "rt_deluxe_heritage", floor: 1, operationalStatus: "Available", housekeepingStatus: "Ready", maintenanceStatus: "Operational", currentGuest: null, keyCardCode: "KC-103-77" },
  { id: "room_104", number: "104", propertyId: "prop_jaipur", roomTypeId: "rt_deluxe_heritage", floor: 1, operationalStatus: "Available", housekeepingStatus: "Dirty", maintenanceStatus: "Operational", currentGuest: null, keyCardCode: "KC-104-51" },
  { id: "room_105", number: "105", propertyId: "prop_jaipur", roomTypeId: "rt_haveli_courtyard", floor: 1, operationalStatus: "Available", housekeepingStatus: "Ready", maintenanceStatus: "Operational", currentGuest: null, keyCardCode: "KC-105-34" },
  { id: "room_106", number: "106", propertyId: "prop_jaipur", roomTypeId: "rt_haveli_courtyard", floor: 1, operationalStatus: "Reserved", housekeepingStatus: "Ready", maintenanceStatus: "Operational", currentGuest: "Dr. Rajesh & Sunita Verma", keyCardCode: "KC-106-90" },

  // Jaipur - Second Floor (201 - 206)
  { id: "room_201", number: "201", propertyId: "prop_jaipur", roomTypeId: "rt_royal_rajput_suite", floor: 2, operationalStatus: "Occupied", housekeepingStatus: "Clean", maintenanceStatus: "Operational", currentGuest: "Marcus & Elena Vance", keyCardCode: "KC-201-14" },
  { id: "room_202", number: "202", propertyId: "prop_jaipur", roomTypeId: "rt_royal_rajput_suite", floor: 2, operationalStatus: "Available", housekeepingStatus: "In Progress", maintenanceStatus: "Operational", currentGuest: null, keyCardCode: "KC-202-62" },
  { id: "room_203", number: "203", propertyId: "prop_jaipur", roomTypeId: "rt_royal_rajput_suite", floor: 2, operationalStatus: "Available", housekeepingStatus: "Ready", maintenanceStatus: "Operational", currentGuest: null, keyCardCode: "KC-203-88" },
  { id: "room_204", number: "204", propertyId: "prop_jaipur", roomTypeId: "rt_deluxe_heritage", floor: 2, operationalStatus: "Out of Service", housekeepingStatus: "Dirty", maintenanceStatus: "Under Repair", currentGuest: null, keyCardCode: "KC-204-00", maintenanceReason: "AC compressor replacement & brass polish" },
  { id: "room_205", number: "205", propertyId: "prop_jaipur", roomTypeId: "rt_haveli_courtyard", floor: 2, operationalStatus: "Reserved", housekeepingStatus: "Ready", maintenanceStatus: "Operational", currentGuest: "Rohan Kapoor", keyCardCode: "KC-205-43" },
  { id: "room_206", number: "206", propertyId: "prop_jaipur", roomTypeId: "rt_haveli_courtyard", floor: 2, operationalStatus: "Available", housekeepingStatus: "Inspected", maintenanceStatus: "Operational", currentGuest: null, keyCardCode: "KC-206-25" },

  // Jaipur - Third Floor & Villas (301 - 304, V1, V2)
  { id: "room_301", number: "301", propertyId: "prop_jaipur", roomTypeId: "rt_maharaja_presidential", floor: 3, operationalStatus: "Available", housekeepingStatus: "Ready", maintenanceStatus: "Operational", currentGuest: null, keyCardCode: "KC-301-99" },
  { id: "room_302", number: "302", propertyId: "prop_jaipur", roomTypeId: "rt_maharaja_presidential", floor: 3, operationalStatus: "Occupied", housekeepingStatus: "Clean", maintenanceStatus: "Operational", currentGuest: "Lord Sterling & Lady Beatrice", keyCardCode: "KC-302-01" },
  { id: "room_villa1", number: "Villa 1", propertyId: "prop_jaipur", roomTypeId: "rt_luxury_garden_villa", floor: 1, operationalStatus: "Available", housekeepingStatus: "Ready", maintenanceStatus: "Operational", currentGuest: null, keyCardCode: "KC-V1-12" },
  { id: "room_villa2", number: "Villa 2", propertyId: "prop_jaipur", roomTypeId: "rt_luxury_garden_villa", floor: 1, operationalStatus: "Occupied", housekeepingStatus: "Clean", maintenanceStatus: "Operational", currentGuest: "Kavita Rao & Family", keyCardCode: "KC-V2-76" },

  // Udaipur Rooms
  { id: "room_u101", number: "101", propertyId: "prop_udaipur", roomTypeId: "rt_deluxe_heritage", floor: 1, operationalStatus: "Available", housekeepingStatus: "Ready", maintenanceStatus: "Operational", currentGuest: null, keyCardCode: "KC-U101" },
  { id: "room_u102", number: "102", propertyId: "prop_udaipur", roomTypeId: "rt_royal_rajput_suite", floor: 1, operationalStatus: "Occupied", housekeepingStatus: "Clean", maintenanceStatus: "Operational", currentGuest: "Devendra Rathore", keyCardCode: "KC-U102" },

  // Delhi Rooms
  { id: "room_d101", number: "501", propertyId: "prop_delhi", roomTypeId: "rt_executive_suite", floor: 5, operationalStatus: "Occupied", housekeepingStatus: "Clean", maintenanceStatus: "Operational", currentGuest: "Arjun Nambiar", keyCardCode: "KC-D501" },
  { id: "room_d102", number: "502", propertyId: "prop_delhi", roomTypeId: "rt_executive_suite", floor: 5, operationalStatus: "Available", housekeepingStatus: "Ready", maintenanceStatus: "Operational", currentGuest: null, keyCardCode: "KC-D502" }
];

export const INITIAL_RATE_PLANS = [
  {
    id: "rp_standard_flex",
    name: "Standard Flexible Rate",
    code: "FLEX",
    description: "Best available rate with flexible cancellation up to 48 hours prior to arrival.",
    priceMultiplier: 1.0,
    breakfastIncluded: false,
    cancellationHours: 48,
    depositRequiredPercent: 20,
    refundable: true
  },
  {
    id: "rp_bed_and_breakfast",
    name: "Royal Bed & Breakfast",
    code: "BNB",
    description: "Includes decadent daily breakfast at Sheesh Mahal dining hall and flexible cancellation.",
    priceMultiplier: 1.15,
    breakfastIncluded: true,
    cancellationHours: 48,
    depositRequiredPercent: 25,
    refundable: true
  },
  {
    id: "rp_non_refundable",
    name: "Advance Saver (Non-Refundable)",
    code: "NONREF",
    description: "Save 15% when paying in full at time of reservation. Non-refundable.",
    priceMultiplier: 0.85,
    breakfastIncluded: false,
    cancellationHours: 0,
    depositRequiredPercent: 100,
    refundable: false
  },
  {
    id: "rp_weekend_package",
    name: "Heritage Weekend Experience",
    code: "WKND",
    description: "Includes breakfast, evening cultural puppet & folk performance, and high tea.",
    priceMultiplier: 1.25,
    breakfastIncluded: true,
    cancellationHours: 72,
    depositRequiredPercent: 30,
    refundable: true
  }
];

export const INITIAL_OFFERS = [
  {
    id: "off_royal15",
    code: "ROYAL15",
    title: "The Royal Heritage Retreat",
    discountPercent: 15,
    minBookingValue: 10000,
    validUntil: "2026-12-31",
    description: "Enjoy 15% savings across all Suites and Villas in Jaipur and Udaipur.",
    applicableRoomTypes: ["rt_royal_rajput_suite", "rt_maharaja_presidential", "rt_luxury_garden_villa"],
    badge: "Most Popular",
    active: true
  },
  {
    id: "off_welcome10",
    code: "WELCOME10",
    title: "First-Time Guest Welcome",
    discountPercent: 10,
    minBookingValue: 5000,
    validUntil: "2026-12-31",
    description: "10% off your inaugural stay at any Stayora luxury property.",
    applicableRoomTypes: [],
    badge: "Direct Special",
    active: true
  },
  {
    id: "off_longstay",
    code: "LONGSTAY",
    title: "Extended Royal Sabbatical",
    discountPercent: 20,
    minBookingValue: 25000,
    validUntil: "2026-12-31",
    description: "Stay 3 nights or more and receive 20% off room charges + complimentary spa voucher.",
    applicableRoomTypes: [],
    badge: "Stay 3+ Nights",
    active: true
  }
];

export const INITIAL_ADDONS = [
  { id: "add_breakfast", name: "Royal Champagne Breakfast Buffet", pricePerPersonNight: 1200, category: "Dining", description: "Fresh morning spread at Sheesh Mahal with live station and champagne" },
  { id: "add_airport_pickup", name: "Luxury Airport Chauffeur (Sedan/SUV)", pricePerStay: 2500, category: "Transfer", description: "Private airport pickup in an executive luxury vehicle with cold towels & refreshments" },
  { id: "add_spa_wellness", name: "60-Min Jharokha Ayurvedic Massage", pricePerPerson: 3800, category: "Wellness", description: "Traditional herbal steam and signature abhyanga therapy" },
  { id: "add_extra_bed", name: "Rollaway Extra Bed & Linen", pricePerNight: 1800, category: "Bedding", description: "Premium memory foam extra bed with plush organic cotton linen" },
  { id: "add_hi_tea", name: "Sunset High Tea at Rooftop Pavilion", pricePerPerson: 1500, category: "Experience", description: "Artisanal teas, Rajasthani savouries, and handcrafted pastries overlooking the city" }
];

export const INITIAL_GUESTS = [
  {
    id: "gst_1",
    name: "Vikram Singhania",
    email: "vikram.singhania@apexcorp.in",
    phone: "+91 98201 44521",
    city: "Mumbai",
    country: "India",
    vip: true,
    totalStays: 4,
    totalSpend: 148500,
    preferences: "Top floor preferred, sparkling water in room, extra goose-down pillows",
    idType: "Aadhaar Card",
    idNumber: "XXXX-XXXX-9021"
  },
  {
    id: "gst_2",
    name: "Ananya Sharma",
    email: "ananya.sharma@designcraft.co",
    phone: "+91 98110 55432",
    city: "Bengaluru",
    country: "India",
    vip: false,
    totalStays: 2,
    totalSpend: 42000,
    preferences: "Oat milk for coffee, late afternoon housekeeping",
    idType: "Passport",
    idNumber: "Z5891402"
  },
  {
    id: "gst_3",
    name: "Marcus & Elena Vance",
    email: "marcus.vance@vanceholdings.co.uk",
    phone: "+44 7700 900123",
    city: "London",
    country: "United Kingdom",
    vip: true,
    totalStays: 3,
    totalSpend: 215000,
    preferences: "Champagne on arrival, gluten-free dining options",
    idType: "Passport",
    idNumber: "GB9920148"
  },
  {
    id: "gst_4",
    name: "Dr. Rajesh & Sunita Verma",
    email: "dr.rverma@heritageclinic.org",
    phone: "+91 94140 88712",
    city: "Jaipur",
    country: "India",
    vip: false,
    totalStays: 1,
    totalSpend: 24000,
    preferences: "Quiet wing away from elevators",
    idType: "Aadhaar Card",
    idNumber: "XXXX-XXXX-1144"
  },
  {
    id: "gst_5",
    name: "Lord Sterling & Lady Beatrice",
    email: "sterling@manor-estate.co.uk",
    phone: "+44 7911 123456",
    city: "Edinburgh",
    country: "United Kingdom",
    vip: true,
    totalStays: 5,
    totalSpend: 480000,
    preferences: "Private butler service, strict privacy, vintage single malt in suite",
    idType: "Diplomatic Passport",
    idNumber: "DIP-UK-441"
  }
];

// Helper to get formatted date string YYYY-MM-DD relative to today
const getRelativeDate = (offsetDays) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split("T")[0];
};

export const INITIAL_RESERVATIONS = [
  {
    id: "res_101",
    bookingReference: "STY-JP-8012",
    propertyId: "prop_jaipur",
    guestId: "gst_1",
    guestName: "Vikram Singhania",
    guestEmail: "vikram.singhania@apexcorp.in",
    guestPhone: "+91 98201 44521",
    roomTypeId: "rt_deluxe_heritage",
    assignedRoomId: "room_101",
    roomNumber: "101",
    checkIn: getRelativeDate(-1),
    checkOut: getRelativeDate(2),
    adults: 2,
    children: 0,
    roomsCount: 1,
    ratePlanId: "rp_standard_flex",
    ratePlanName: "Standard Flexible Rate",
    nightlyRate: 8500,
    nights: 3,
    roomSubtotal: 25500,
    addonsTotal: 2500, // Airport pickup
    addons: [{ name: "Luxury Airport Chauffeur", price: 2500 }],
    discountAmount: 0,
    taxAmount: 3360,
    totalAmount: 31360,
    depositAmount: 10000,
    amountPaid: 10000,
    balanceDue: 21360,
    status: "Checked In",
    paymentStatus: "Partially Paid",
    bookingSource: "Direct Website",
    specialRequests: "Requires early breakfast at 06:30 for business meetings",
    createdAt: getRelativeDate(-5),
    folioId: "fol_101"
  },
  {
    id: "res_102",
    bookingReference: "STY-JP-8015",
    propertyId: "prop_jaipur",
    guestId: "gst_2",
    guestName: "Ananya Sharma",
    guestEmail: "ananya.sharma@designcraft.co",
    guestPhone: "+91 98110 55432",
    roomTypeId: "rt_deluxe_heritage",
    assignedRoomId: "room_102",
    roomNumber: "102",
    checkIn: getRelativeDate(-2),
    checkOut: getRelativeDate(0), // Departing today!
    adults: 1,
    children: 0,
    roomsCount: 1,
    ratePlanId: "rp_bed_and_breakfast",
    ratePlanName: "Royal Bed & Breakfast",
    nightlyRate: 9775,
    nights: 2,
    roomSubtotal: 19550,
    addonsTotal: 0,
    addons: [],
    discountAmount: 1955,
    taxAmount: 2111,
    totalAmount: 19706,
    depositAmount: 19706,
    amountPaid: 19706,
    balanceDue: 0,
    status: "Checked In",
    paymentStatus: "Paid",
    bookingSource: "Direct Website",
    specialRequests: "Quiet corner room",
    createdAt: getRelativeDate(-8),
    folioId: "fol_102"
  },
  {
    id: "res_103",
    bookingReference: "STY-JP-8022",
    propertyId: "prop_jaipur",
    guestId: "gst_3",
    guestName: "Marcus & Elena Vance",
    guestEmail: "marcus.vance@vanceholdings.co.uk",
    guestPhone: "+44 7700 900123",
    roomTypeId: "rt_royal_rajput_suite",
    assignedRoomId: "room_201",
    roomNumber: "201",
    checkIn: getRelativeDate(-1),
    checkOut: getRelativeDate(3),
    adults: 2,
    children: 0,
    roomsCount: 1,
    ratePlanId: "rp_weekend_package",
    ratePlanName: "Heritage Weekend Experience",
    nightlyRate: 18125,
    nights: 4,
    roomSubtotal: 72500,
    addonsTotal: 7600, // Two 60-min massages
    addons: [{ name: "2x 60-Min Jharokha Ayurvedic Massage", price: 7600 }],
    discountAmount: 10875,
    taxAmount: 8307,
    totalAmount: 77532,
    depositAmount: 40000,
    amountPaid: 40000,
    balanceDue: 37532,
    status: "Checked In",
    paymentStatus: "Partially Paid",
    bookingSource: "Direct Website",
    specialRequests: "Anniversary celebration. Welcome bouquet and chilled champagne requested.",
    createdAt: getRelativeDate(-10),
    folioId: "fol_103"
  },
  {
    id: "res_104",
    bookingReference: "STY-JP-8030",
    propertyId: "prop_jaipur",
    guestId: "gst_4",
    guestName: "Dr. Rajesh & Sunita Verma",
    guestEmail: "dr.rverma@heritageclinic.org",
    guestPhone: "+91 94140 88712",
    roomTypeId: "rt_haveli_courtyard",
    assignedRoomId: "room_106",
    roomNumber: "106",
    checkIn: getRelativeDate(0), // Arriving today!
    checkOut: getRelativeDate(2),
    adults: 2,
    children: 0,
    roomsCount: 1,
    ratePlanId: "rp_standard_flex",
    ratePlanName: "Standard Flexible Rate",
    nightlyRate: 10500,
    nights: 2,
    roomSubtotal: 21000,
    addonsTotal: 0,
    addons: [],
    discountAmount: 0,
    taxAmount: 2520,
    totalAmount: 23520,
    depositAmount: 5000,
    amountPaid: 5000,
    balanceDue: 18520,
    status: "Confirmed", // Today's Arrival awaiting check-in!
    paymentStatus: "Partially Paid",
    bookingSource: "Phone",
    specialRequests: "Ground floor courtyard access preferred.",
    createdAt: getRelativeDate(-3),
    folioId: "fol_104"
  },
  {
    id: "res_105",
    bookingReference: "STY-JP-8041",
    propertyId: "prop_jaipur",
    guestId: "gst_5",
    guestName: "Lord Sterling & Lady Beatrice",
    guestEmail: "sterling@manor-estate.co.uk",
    guestPhone: "+44 7911 123456",
    roomTypeId: "rt_maharaja_presidential",
    assignedRoomId: "room_302",
    roomNumber: "302",
    checkIn: getRelativeDate(-3),
    checkOut: getRelativeDate(4),
    adults: 2,
    children: 1,
    roomsCount: 1,
    ratePlanId: "rp_standard_flex",
    ratePlanName: "Standard Flexible Rate",
    nightlyRate: 32000,
    nights: 7,
    roomSubtotal: 224000,
    addonsTotal: 15000,
    addons: [{ name: "VIP Airport Limousine & Private Butler", price: 15000 }],
    discountAmount: 33600,
    taxAmount: 24648,
    totalAmount: 230048,
    depositAmount: 150000,
    amountPaid: 150000,
    balanceDue: 80048,
    status: "Checked In",
    paymentStatus: "Partially Paid",
    bookingSource: "Corporate",
    specialRequests: "Private entrance and non-disclosure privacy.",
    createdAt: getRelativeDate(-15),
    folioId: "fol_105"
  },
  {
    id: "res_106",
    bookingReference: "STY-JP-8055",
    propertyId: "prop_jaipur",
    guestId: "gst_1",
    guestName: "Rohan Kapoor",
    guestEmail: "rohan.kapoor@techadvisors.in",
    guestPhone: "+91 99300 22119",
    roomTypeId: "rt_haveli_courtyard",
    assignedRoomId: "room_205",
    roomNumber: "205",
    checkIn: getRelativeDate(0), // Arriving today!
    checkOut: getRelativeDate(3),
    adults: 2,
    children: 1,
    roomsCount: 1,
    ratePlanId: "rp_bed_and_breakfast",
    ratePlanName: "Royal Bed & Breakfast",
    nightlyRate: 12075,
    nights: 3,
    roomSubtotal: 36225,
    addonsTotal: 3000,
    addons: [{ name: "High Tea at Sunset Pavilion", price: 3000 }],
    discountAmount: 0,
    taxAmount: 4707,
    totalAmount: 43932,
    depositAmount: 15000,
    amountPaid: 15000,
    balanceDue: 28932,
    status: "Confirmed", // Today's Arrival!
    paymentStatus: "Partially Paid",
    bookingSource: "Direct Website",
    specialRequests: "Check-in expected around 15:30.",
    createdAt: getRelativeDate(-2),
    folioId: "fol_106"
  }
];

export const INITIAL_FOLIOS = [
  {
    id: "fol_101",
    reservationId: "res_101",
    roomNumber: "101",
    guestName: "Vikram Singhania",
    status: "Open",
    charges: [
      { id: "chg_101_1", description: "Deluxe Heritage Room (Night 1)", amount: 8500, category: "Room", date: getRelativeDate(-1), postedBy: "System Night Audit" },
      { id: "chg_101_2", description: "Luxury Airport Chauffeur Transfer", amount: 2500, category: "Transfer", date: getRelativeDate(-1), postedBy: "Front Desk (Preeti)" },
      { id: "chg_101_3", description: "Sheesh Mahal Dining (Order #ORD-101)", amount: 3200, category: "Restaurant", date: getRelativeDate(0), postedBy: "POS Captain Arjun" },
      { id: "chg_101_4", description: "Laundry & Dry Cleaning Service", amount: 950, category: "Laundry", date: getRelativeDate(0), postedBy: "Housekeeping (Meena)" },
      { id: "chg_101_5", description: "Applicable Taxes (GST 12%)", amount: 1818, category: "Tax", date: getRelativeDate(0), postedBy: "System" }
    ],
    payments: [
      { id: "pay_101_1", amount: 10000, method: "Credit Card (Demo)", transactionRef: "TXN-CC-90142", date: getRelativeDate(-5), receivedBy: "Online Booking Gateway" }
    ],
    totalCharges: 16968,
    totalPaid: 10000,
    balanceDue: 6968
  },
  {
    id: "fol_102",
    reservationId: "res_102",
    roomNumber: "102",
    guestName: "Ananya Sharma",
    status: "Settled - Pending Departure",
    charges: [
      { id: "chg_102_1", description: "Deluxe Heritage Room (Night 1 & 2)", amount: 19550, category: "Room", date: getRelativeDate(-2), postedBy: "Front Desk" },
      { id: "chg_102_2", description: "Direct Promo WELCOME10 Discount", amount: -1955, category: "Discount", date: getRelativeDate(-2), postedBy: "System" },
      { id: "chg_102_3", description: "Courtyard Cafe In-Room Dining", amount: 1450, category: "Restaurant", date: getRelativeDate(-1), postedBy: "POS Room Service" },
      { id: "chg_102_4", description: "Applicable Taxes (GST 12%)", amount: 2285, category: "Tax", date: getRelativeDate(0), postedBy: "System" }
    ],
    payments: [
      { id: "pay_102_1", amount: 19706, method: "UPI (Demo)", transactionRef: "UPI-4401928", date: getRelativeDate(-8), receivedBy: "Online Booking Gateway" },
      { id: "pay_102_2", amount: 1624, method: "Debit Card (Demo)", transactionRef: "TXN-DC-11204", date: getRelativeDate(0), receivedBy: "Front Desk Cashier" }
    ],
    totalCharges: 21330,
    totalPaid: 21330,
    balanceDue: 0
  },
  {
    id: "fol_103",
    reservationId: "res_103",
    roomNumber: "201",
    guestName: "Marcus & Elena Vance",
    status: "Open",
    charges: [
      { id: "chg_103_1", description: "Royal Rajput Suite (Night 1)", amount: 18125, category: "Room", date: getRelativeDate(-1), postedBy: "Front Desk" },
      { id: "chg_103_2", description: "2x 60-Min Jharokha Ayurvedic Massage", amount: 7600, category: "Spa", date: getRelativeDate(0), postedBy: "Spa Reception" },
      { id: "chg_103_3", description: "Vintage Champagne Bottle Service", amount: 5500, category: "Beverage", date: getRelativeDate(-1), postedBy: "Bar Captain" },
      { id: "chg_103_4", description: "Applicable Taxes (GST 12%)", amount: 3747, category: "Tax", date: getRelativeDate(0), postedBy: "System" }
    ],
    payments: [
      { id: "pay_103_1", amount: 40000, method: "Amex (Demo)", transactionRef: "AX-882019", date: getRelativeDate(-10), receivedBy: "Online Booking Gateway" }
    ],
    totalCharges: 34972,
    totalPaid: 40000,
    balanceDue: -5028 // Deposit credit remaining
  }
];

export const INITIAL_HOUSEKEEPING_TASKS = [
  {
    id: "hk_1",
    roomNumber: "104",
    propertyId: "prop_jaipur",
    taskType: "Checkout Cleaning",
    priority: "High",
    assignedTo: "Sunita Bai",
    status: "Dirty",
    dueTime: "13:00",
    checklist: [
      { item: "Strip bed linen & sanitize mattress", completed: false },
      { item: "Fresh Egyptian cotton sheets & pillow covers", completed: false },
      { item: "Sanitize bathroom fixtures & polish brass", completed: false },
      { item: "Replenish Kama Ayurveda toiletries & fresh towels", completed: false },
      { item: "Vacuum carpets and mop Kota stone tiles", completed: false },
      { item: "Restock minibar & coffee station", completed: false }
    ],
    notes: "New guest arriving this afternoon. Ensure fragrant jasmine diffuser is refreshed."
  },
  {
    id: "hk_2",
    roomNumber: "202",
    propertyId: "prop_jaipur",
    taskType: "Stayover Cleaning",
    priority: "Medium",
    assignedTo: "Kailash Chand",
    status: "In Progress",
    dueTime: "14:30",
    checklist: [
      { item: "Make king bed & fluff pillows", completed: true },
      { item: "Empty trash & wipe surfaces", completed: true },
      { item: "Refresh bathroom towels", completed: false },
      { item: "Restock complimentary mineral water", completed: false }
    ],
    notes: "Guest requested evening turndown service with lavender mist."
  },
  {
    id: "hk_3",
    roomNumber: "206",
    propertyId: "prop_jaipur",
    taskType: "Deep Cleaning & Inspection",
    priority: "Normal",
    assignedTo: "Meena Kumari",
    status: "Inspected",
    dueTime: "11:30",
    checklist: [
      { item: "Deep curtain steam & upholstery clean", completed: true },
      { item: "Wood polish on heritage doors", completed: true },
      { item: "Air purifier filter replaced", completed: true }
    ],
    notes: "Supervisor checked. Ready for allocation."
  }
];

export const INITIAL_MAINTENANCE_REQUESTS = [
  {
    id: "maint_1",
    roomNumber: "204",
    propertyId: "prop_jaipur",
    category: "HVAC / Air Conditioning",
    description: "AC cooling coil fan making humming sound and thermostat fluctuating.",
    priority: "High",
    reportedBy: "Front Desk (Ramesh)",
    assignedTo: "Vikram Electrician",
    status: "In Progress",
    reportedDate: getRelativeDate(-1),
    targetCompletion: getRelativeDate(1),
    estimatedCost: 4500,
    actualCost: 0,
    outOfServiceBlocked: true,
    notes: "Room placed Out of Service until test run is verified."
  },
  {
    id: "maint_2",
    roomNumber: "Pool Deck",
    propertyId: "prop_jaipur",
    category: "Plumbing",
    description: "Infinity pool balance tank overflow valve calibrated.",
    priority: "Low",
    reportedBy: "Chief Engineer",
    assignedTo: "Mahesh Plumber",
    status: "Resolved",
    reportedDate: getRelativeDate(-3),
    targetCompletion: getRelativeDate(-1),
    estimatedCost: 1800,
    actualCost: 1650,
    outOfServiceBlocked: false,
    notes: "Replaced silicon gasket. Pool water pressure normal."
  }
];

export const INITIAL_GUEST_REQUESTS = [
  {
    id: "req_1",
    roomNumber: "101",
    guestName: "Vikram Singhania",
    category: "Bedding",
    description: "Two extra firm feather pillows and extra bath towels",
    priority: "Medium",
    assignedTo: "Housekeeping",
    status: "Completed",
    requestedAt: "08:15 AM",
    completedAt: "08:35 AM"
  },
  {
    id: "req_2",
    roomNumber: "201",
    guestName: "Elena Vance",
    category: "Concierge / Butler",
    description: "Reserve a private guide and e-rickshaw for Amber Fort sunset tour tomorrow",
    priority: "High",
    assignedTo: "Front Desk Concierge",
    status: "In Progress",
    requestedAt: "10:30 AM",
    completedAt: null
  },
  {
    id: "req_3",
    roomNumber: "302",
    guestName: "Lady Beatrice",
    category: "Dining / Room Service",
    description: "Darjeeling first-flush tea with lemon slices and almond biscotti",
    priority: "High",
    assignedTo: "Room Service Captain",
    status: "In Progress",
    requestedAt: "11:00 AM",
    completedAt: null
  }
];

export const INITIAL_MENU_ITEMS = [
  { id: "menu_1", name: "Laal Maas (Royal Mutton Curry)", category: "Main Course", price: 950, veg: false, prepArea: "Kitchen", available: true, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80", description: "Signature slow-cooked Rajasthani smoked mutton prepared with fiery Mathania chillies." },
  { id: "menu_2", name: "Dal Baati Churma Thali", category: "Traditional Special", price: 850, veg: true, prepArea: "Kitchen", available: true, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80", description: "Crisp ghee-soaked wheat dumplings with Panchmel dal, sweet churma and garlic chutney." },
  { id: "menu_3", name: "Paneer Lababdar", category: "Main Course", price: 680, veg: true, prepArea: "Kitchen", available: true, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80", description: "Cottage cheese simmered in a luscious tomato, cashew and fenugreek gravy." },
  { id: "menu_4", name: "Truffle Naan & Malai Kulcha Basket", category: "Breads", price: 350, veg: true, prepArea: "Tandoor", available: true, image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80", description: "Freshly baked clay oven breads infused with black truffle butter." },
  { id: "menu_5", name: "Saffron Kesari Rasmalai", category: "Dessert", price: 420, veg: true, prepArea: "Dessert", available: true, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80", description: "Pistachio-crusted soft cheese dumplings steeped in saffron-infused clotted milk." },
  { id: "menu_6", name: "Maharani Rose & Cardamom Lassi", category: "Beverages", price: 320, veg: true, prepArea: "Bar", available: true, image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80", description: "Thick chilled churned yoghurt perfumed with organic desi gulab extract and roasted pistachios." },
  { id: "menu_7", name: "Royal English Continental Breakfast", category: "Breakfast", price: 750, veg: false, prepArea: "Kitchen", available: true, image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80", description: "Eggs to order, chicken sausages, grilled tomatoes, hash browns and freshly pressed juice." }
];

export const INITIAL_TABLES = [
  { id: "tbl_1", number: "T1 (Courtyard)", capacity: 2, status: "Occupied", currentOrder: "ORD-101" },
  { id: "tbl_2", number: "T2 (Courtyard)", capacity: 4, status: "Available", currentOrder: null },
  { id: "tbl_3", number: "T3 (Sheesh Mahal)", capacity: 6, status: "Reserved", currentOrder: null },
  { id: "tbl_4", number: "T4 (Sheesh Mahal)", capacity: 2, status: "Available", currentOrder: null },
  { id: "tbl_5", number: "T5 (Rooftop)", capacity: 4, status: "Occupied", currentOrder: "ORD-102" },
  { id: "tbl_6", number: "T6 (Rooftop Gazebo)", capacity: 8, status: "Available", currentOrder: null }
];

export const INITIAL_RESTAURANT_ORDERS = [
  {
    id: "ord_101",
    orderNumber: "ORD-101",
    tableId: "tbl_1",
    tableName: "T1 (Courtyard)",
    source: "Dine-In",
    guestName: "Vikram Singhania",
    roomNumber: "101",
    reservationId: "res_101",
    items: [
      { id: "menu_1", name: "Laal Maas (Royal Mutton Curry)", price: 950, quantity: 1 },
      { id: "menu_4", name: "Truffle Naan & Malai Kulcha Basket", price: 350, quantity: 2 },
      { id: "menu_6", name: "Maharani Rose & Cardamom Lassi", price: 320, quantity: 2 }
    ],
    subtotal: 2290,
    tax: 275,
    serviceCharge: 115,
    total: 2680,
    status: "Served",
    paymentMethod: "Charged to Room Folio (Room 101)",
    paymentStatus: "Paid",
    timestamp: "12:45 PM"
  },
  {
    id: "ord_102",
    orderNumber: "ORD-102",
    tableId: "tbl_5",
    tableName: "T5 (Rooftop)",
    source: "Dine-In",
    guestName: "Devendra Rathore",
    roomNumber: null,
    reservationId: null,
    items: [
      { id: "menu_2", name: "Dal Baati Churma Thali", price: 850, quantity: 2 },
      { id: "menu_5", name: "Saffron Kesari Rasmalai", price: 420, quantity: 2 }
    ],
    subtotal: 2540,
    tax: 305,
    serviceCharge: 127,
    total: 2972,
    status: "Preparing",
    paymentMethod: "Pending Bill",
    paymentStatus: "Unpaid",
    timestamp: "01:10 PM"
  }
];

export const INITIAL_INVENTORY_ITEMS = [
  { id: "inv_1", name: "Kama Ayurveda Shampoo & Shower Gel (50ml)", category: "Toiletries", unit: "Bottles", currentStock: 240, minStock: 100, reorderQty: 300, unitCost: 85, supplier: "Kama Wellness Ltd", location: "Central Store - Rack A2" },
  { id: "inv_2", name: "300TC Organic King Sheet Sets", category: "Linen", unit: "Sets", currentStock: 48, minStock: 30, reorderQty: 50, unitCost: 1450, supplier: "Jaipur Textile Mills", location: "Linen Room - Tier 1" },
  { id: "inv_3", name: "Mathania Red Whole Dry Chillies", category: "Restaurant Ingredients", unit: "kg", currentStock: 8, minStock: 15, reorderQty: 25, unitCost: 480, supplier: "Shekhawati Spices", location: "Dry Pantry", status: "Low Stock Alert" },
  { id: "inv_4", name: "Single Estate Assam CTC Gold Tea", category: "Beverages", unit: "kg", currentStock: 22, minStock: 10, reorderQty: 20, unitCost: 650, supplier: "Bespoke Tea Merchants", location: "Beverage Store" },
  { id: "inv_5", name: "Brass Polish Paste & Microfiber Cloths", category: "Housekeeping", unit: "Kits", currentStock: 14, minStock: 12, reorderQty: 20, unitCost: 220, supplier: "Heritage Care Products", location: "Housekeeping Bay" }
];

export const INITIAL_SUPPLIERS = [
  { id: "sup_1", name: "Kama Wellness Ltd", contact: "Rajiv Nair", email: "orders@kamawellness.in", phone: "+91 11 4110 9900", categories: "Toiletries, Spa Oils, Aromatics", paymentTerms: "Net 30" },
  { id: "sup_2", name: "Jaipur Textile Mills", contact: "Sunil Somani", email: "sales@jaipurtextiles.com", phone: "+91 141 278 1200", categories: "Linen, Towels, Robes", paymentTerms: "Net 15" },
  { id: "sup_3", name: "Shekhawati Spices", contact: "Bhairon Singh", email: "shekhawatispices@gmail.com", phone: "+91 1572 245100", categories: "Ghee, Pure Spices, Dal", paymentTerms: "Cash on Delivery" }
];

export const INITIAL_PURCHASE_ORDERS = [
  {
    id: "po_101",
    poNumber: "PO-2026-089",
    supplierId: "sup_3",
    supplierName: "Shekhawati Spices",
    orderDate: getRelativeDate(-2),
    expectedDelivery: getRelativeDate(1),
    status: "Ordered",
    items: [
      { itemName: "Mathania Red Whole Dry Chillies", quantity: 20, unit: "kg", unitCost: 480, total: 9600 },
      { itemName: "Desi Gir Cow Ghee (Bilona)", quantity: 30, unit: "kg", unitCost: 1100, total: 33000 }
    ],
    totalAmount: 42600,
    receivedQty: 0
  },
  {
    id: "po_102",
    poNumber: "PO-2026-088",
    supplierId: "sup_1",
    supplierName: "Kama Wellness Ltd",
    orderDate: getRelativeDate(-7),
    expectedDelivery: getRelativeDate(-1),
    status: "Received",
    items: [
      { itemName: "Kama Ayurveda Shampoo & Shower Gel (50ml)", quantity: 300, unit: "Bottles", unitCost: 85, total: 25500 }
    ],
    totalAmount: 25500,
    receivedQty: 300
  }
];

export const INITIAL_STAFF = [
  { id: "stf_super_admin", name: "Vikramaditya Singh Rathore", role: "Owner / Super Admin", department: "Executive Board", phone: "+91 98290 10000", shift: "Global 24/7 Authority", status: "On Duty" },
  { id: "stf_1", name: "Digvijay Singh Rathore", role: "General Manager", department: "Executive", phone: "+91 98290 11001", shift: "Morning / General", status: "On Duty" },
  { id: "stf_2", name: "Preeti Rawat", role: "Front Desk Supervisor", department: "Front Desk", phone: "+91 98290 11002", shift: "Morning (07:00 - 15:30)", status: "On Duty" },
  { id: "stf_3", name: "Ramesh Joshi", role: "Receptionist / Concierge", department: "Front Desk", phone: "+91 98290 11003", shift: "Evening (15:00 - 23:30)", status: "Scheduled" },
  { id: "stf_4", name: "Sunita Bai", role: "Senior Housekeeping Attendant", department: "Housekeeping", phone: "+91 98290 11004", shift: "Morning (08:00 - 16:30)", status: "On Duty" },
  { id: "stf_5", name: "Kailash Chand", role: "Housekeeping Attendant", department: "Housekeeping", phone: "+91 98290 11005", shift: "Morning (08:00 - 16:30)", status: "On Duty" },
  { id: "stf_6", name: "Chef Harish Mahawar", role: "Executive Head Chef", department: "Kitchen", phone: "+91 98290 11006", shift: "Split Shift", status: "On Duty" },
  { id: "stf_7", name: "Arjun Solanki", role: "Restaurant Captain", department: "F&B Service", phone: "+91 98290 11007", shift: "Morning (10:00 - 19:00)", status: "On Duty" },
  { id: "stf_8", name: "Vikram Electrician", role: "Maintenance Lead", department: "Engineering", phone: "+91 98290 11008", shift: "General", status: "On Duty" },
  { id: "stf_9", name: "Pooja Chhabra", role: "Financial Controller / Cashier", department: "Finance", phone: "+91 98290 11009", shift: "General (09:30 - 18:00)", status: "On Duty" }
];

export const INITIAL_NOTIFICATIONS = [
  { id: "notif_1", title: "New Website Reservation", message: "Booking STY-JP-8055 confirmed for Rohan Kapoor (Deluxe Courtyard).", type: "booking", time: "10 mins ago", read: false },
  { id: "notif_2", title: "Room Maintenance Alert", message: "Room 204 placed Out of Service for AC compressor replacement.", type: "maintenance", time: "45 mins ago", read: false },
  { id: "notif_3", title: "Low Inventory Warning", message: "Mathania Red Chillies reached 8 kg (below reorder threshold of 15 kg).", type: "inventory", time: "2 hours ago", read: true },
  { id: "notif_4", title: "VIP Guest Arrival Today", message: "Lord Sterling & Lady Beatrice in Maharaja Presidential Suite today.", type: "vip", time: "3 hours ago", read: true }
];

export const INITIAL_ACTIVITY_LOGS = [
  { id: "act_1", user: "Preeti Rawat (Front Desk)", action: "Guest Check-in", target: "Room 101 - Vikram Singhania", time: "09:15 AM", details: "Registration card signed, security deposit verified." },
  { id: "act_2", user: "Sunita Bai (Housekeeping)", action: "Task Completed", target: "Room 103 Cleaned & Inspected", time: "10:30 AM", details: "Ready for arrival allocation." },
  { id: "act_3", user: "Arjun Solanki (Restaurant)", action: "POS Order Settled", target: "Order ORD-101 (₹2,680)", time: "12:50 PM", details: "Charged to guest room folio 101." },
  { id: "act_4", user: "Online Guest Portal", action: "New Direct Booking", target: "STY-JP-8055", time: "01:05 PM", details: "Paid ₹15,000 demo advance." }
];
