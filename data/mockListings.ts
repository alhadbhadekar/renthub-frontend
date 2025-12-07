const mockListings = [
    // u1
    { id: "1", title: "Wooden Chairs (6)", pricePerDay: 15, location: "Philadelphia, PA", rating: 4.7, category: "furniture", image: "/chair.jpg", description: "Set of sturdy wooden chairs", ownerId: "u1", lat: 39.9526, lng: -75.1652 },
    { id: "2", title: "Canon DSLR Camera", pricePerDay: 40, location: "King of Prussia, PA", rating: 4.6, category: "electronics", image: "/camera.jpg", description: "Perfect for photoshoots", ownerId: "u1", lat: 40.1013, lng: -75.3836 },
    { id: "3", title: "LED Studio Lights", pricePerDay: 25, location: "Philadelphia, PA", rating: 4.8, category: "electronics", image: "/lights.jpg", description: "Perfect for video shoots", ownerId: "u1", lat: 39.9526, lng: -75.1652 },
    { id: "4", title: "Modern Sofa", pricePerDay: 55, location: "Cherry Hill, NJ", rating: 4.9, category: "furniture", image: "/sofa.jpg", description: "Luxury modern sofa", ownerId: "u1", lat: 39.9348, lng: -75.0307 },
    { id: "5", title: "Wireless Microphone Set", pricePerDay: 30, location: "Philadelphia, PA", rating: 4.7, category: "electronics", image: "/mic.jpg", description: "Clear audio mic set", ownerId: "u1", lat: 39.9526, lng: -75.1652 },
    { id: "6", title: "Projector HD", pricePerDay: 45, location: "Bensalem, PA", rating: 4.5, category: "electronics", image: "/projector.jpg", description: "High resolution projector", ownerId: "u1", lat: 40.0993, lng: -74.9366 },
    { id: "7", title: "Cocktail Tables (4)", pricePerDay: 22, location: "Philadelphia, PA", rating: 4.6, category: "furniture", image: "/cocktail.jpg", description: "Perfect for events", ownerId: "u1", lat: 39.9526, lng: -75.1652 },
    { id: "8", title: "Backdrop Stand", pricePerDay: 18, location: "Media, PA", rating: 4.4, category: "decor", image: "/backdrop.jpg", description: "Adjustable photo backdrop", ownerId: "u1", lat: 39.9168, lng: -75.3877 },
    { id: "9", title: "Stage Podium", pricePerDay: 20, location: "Philadelphia, PA", rating: 4.3, category: "staging", image: "/podium.jpg", description: "Professional podium", ownerId: "u1", lat: 39.9526, lng: -75.1652 },
    { id: "10", title: "Ring Light Pro", pricePerDay: 12, location: "Camden, NJ", rating: 4.8, category: "lighting", image: "/ringlight.jpg", description: "Perfect for content creators", ownerId: "u1", lat: 39.9259, lng: -75.1196 },
  
    // u2
    { id: "11", title: "DJ Sound System", pricePerDay: 80, location: "Philadelphia, PA", rating: 4.9, category: "electronics", image: "/dj.jpg", description: "Wedding-grade DJ setup", ownerId: "u2", lat: 39.9526, lng: -75.1652 },
    { id: "12", title: "Folding Party Tables", pricePerDay: 18, location: "Philadelphia, PA", rating: 4.5, category: "furniture", image: "/table.jpg", description: "Lightweight event tables", ownerId: "u2", lat: 39.9526, lng: -75.1652 },
    { id: "13", title: "Dance Floor Panels", pricePerDay: 60, location: "Upper Darby, PA", rating: 4.7, category: "staging", image: "/dancefloor.jpg", description: "Portable dance flooring", ownerId: "u2", lat: 39.9612, lng: -75.2643 },
    { id: "14", title: "Luxury Throne Chair", pricePerDay: 90, location: "Philadelphia, PA", rating: 4.9, category: "furniture", image: "/throne.jpg", description: "Royal throne chair", ownerId: "u2", lat: 39.9526, lng: -75.1652 },
    { id: "15", title: "Smoke Machine", pricePerDay: 35, location: "Bristol, PA", rating: 4.6, category: "electronics", image: "/smoke.jpg", description: "Create stage fog effects", ownerId: "u2", lat: 40.1034, lng: -74.8516 },
    { id: "16", title: "Laser Light System", pricePerDay: 55, location: "Philadelphia, PA", rating: 4.8, category: "lighting", image: "/laser.jpg", description: "Concert-grade lasers", ownerId: "u2", lat: 39.9526, lng: -75.1652 },
    { id: "17", title: "Wedding Arch", pricePerDay: 40, location: "Conshohocken, PA", rating: 4.7, category: "decor", image: "/arch.jpg", description: "White floral wedding arch", ownerId: "u2", lat: 40.0793, lng: -75.3016 },
    { id: "18", title: "Red Carpet Setup", pricePerDay: 50, location: "Philadelphia, PA", rating: 4.6, category: "decor", image: "/redcarpet.jpg", description: "VIP carpet with poles", ownerId: "u2", lat: 39.9526, lng: -75.1652 },
    { id: "19", title: "Stage Truss System", pricePerDay: 95, location: "Norristown, PA", rating: 4.9, category: "staging", image: "/truss.jpg", description: "Heavy duty stage truss", ownerId: "u2", lat: 40.1215, lng: -75.3399 },
    { id: "20", title: "Buffet Food Warmers", pricePerDay: 28, location: "Philadelphia, PA", rating: 4.5, category: "furniture", image: "/buffet.jpg", description: "Stainless food warmers", ownerId: "u2", lat: 39.9526, lng: -75.1652 },
  
    // mixed
    { id: "21", title: "Tripod Stand", pricePerDay: 10, location: "Philadelphia, PA", rating: 4.4, category: "electronics", image: "/tripod.jpg", description: "Camera tripod", ownerId: "u1", lat: 39.9526, lng: -75.1652 },
    { id: "22", title: "Drone Camera", pricePerDay: 85, location: "King of Prussia, PA", rating: 4.9, category: "electronics", image: "/drone.jpg", description: "4K drone shots", ownerId: "u2", lat: 40.1013, lng: -75.3836 },
    { id: "23", title: "Photo Booth", pricePerDay: 120, location: "Philadelphia, PA", rating: 4.9, category: "electronics", image: "/photobooth.jpg", description: "Instant printed photos", ownerId: "u1", lat: 39.9526, lng: -75.1652 },
    { id: "24", title: "Balloon Decor Set", pricePerDay: 22, location: "Camden, NJ", rating: 4.5, category: "decor", image: "/balloons.jpg", description: "Party balloon decor", ownerId: "u2", lat: 39.9259, lng: -75.1196 },
    { id: "25", title: "Conference Chairs (20)", pricePerDay: 45, location: "Philadelphia, PA", rating: 4.6, category: "furniture", image: "/conference.jpg", description: "Large chair set", ownerId: "u1", lat: 39.9526, lng: -75.1652 },
    { id: "26", title: "4K Event Camera", pricePerDay: 90, location: "Media, PA", rating: 4.9, category: "electronics", image: "/4kcam.jpg", description: "Broadcast quality camera", ownerId: "u2", lat: 39.9168, lng: -75.3877 },
    { id: "27", title: "Green Screen Backdrop", pricePerDay: 30, location: "Philadelphia, PA", rating: 4.7, category: "decor", image: "/greenscreen.jpg", description: "Studio green screen", ownerId: "u1", lat: 39.9526, lng: -75.1652 },
    { id: "28", title: "Banquet Round Tables (6)", pricePerDay: 38, location: "Bensalem, PA", rating: 4.6, category: "furniture", image: "/banquet.jpg", description: "Wedding banquet tables", ownerId: "u2", lat: 40.0993, lng: -74.9366 },
    { id: "29", title: "Bluetooth Party Speakers", pricePerDay: 35, location: "Philadelphia, PA", rating: 4.8, category: "electronics", image: "/speaker.jpg", description: "High bass speakers", ownerId: "u1", lat: 39.9526, lng: -75.1652 },
    { id: "30", title: "Event Spotlight Kit", pricePerDay: 48, location: "Philadelphia, PA", rating: 4.7, category: "lighting", image: "/spotlight.jpg", description: "Professional lighting kit", ownerId: "u2", lat: 39.9526, lng: -75.1652 },
  ];
  
  export default mockListings;
  