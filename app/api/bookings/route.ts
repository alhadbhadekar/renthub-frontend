// /app/api/bookings/route.ts

import { NextResponse } from 'next/server';

// --- MOCK DATABASE START ---
// Global array to simulate all bookings
let mockBookings: any[] = [];

// Helper function to simulate a logged-in user (for GET requests)
const MOCK_CURRENT_USER_ID = 'mock_renter_456'; 
const MOCK_LISTER_ID = 'lister_123'; 


// Mock database functions
const db = {
  listing: {
    findUnique: (args: { where: { id: string } }) => {
      // FIX APPLIED: Return a mock listing for ANY ID passed in, 
      // instead of only checking for '1'.
      if (args.where.id) {
        return {
          id: args.where.id,
          price: 55, // Fixed price for testing ($55/day)
          title: `Mock Listing #${args.where.id}`,
          listerId: MOCK_LISTER_ID, // All listings owned by the mock lister
        };
      }
      return null;
    },
  },
  booking: {
    create: (args: any) => {
      const newBooking = { id: `bk-${Date.now()}`, ...args.data };
      mockBookings.push(newBooking);
      console.log('--- Mock DB Record Created ---', newBooking);
      return newBooking;
    },
    // Function to retrieve bookings based on role/ID
    findAllByUserId: (userId: string, role: 'renter' | 'lister') => {
      if (role === 'lister') {
        return mockBookings.filter(b => b.listerId === userId);
      }
      return mockBookings.filter(b => b.renterId === userId);
    },
    // This is for the Business Dashboard summary (fetches all Lister bookings)
    findAllByListerId: (listerId: string) => {
        return mockBookings.filter(b => b.listerId === listerId);
    },
  },
};
// --- MOCK DATABASE END ---

// Helper function
const calculateDays = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1; 
};


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      listingId, 
      startDate, 
      endDate, 
      renterId = MOCK_CURRENT_USER_ID, // Use mock ID if not provided
      isInsured = false 
    } = body;

    // --- 1. Validation & Data Fetching (FIXED) ---
    const listing = db.listing.findUnique({ where: { id: listingId } });
    if (!listing) {
      // This path is now unlikely to hit, but kept for safety
      return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
    }

    // --- 2. Calculation (Core Revenue Logic) ---
    const totalDays = calculateDays(startDate, endDate);
    const INSURANCE_FEE = 6;
    const MARKETPLACE_COMMISSION_RATE = 0.15; // 15%

    const subtotal = listing.price * totalDays;
    const insuranceTotal = isInsured ? totalDays * INSURANCE_FEE : 0;
    
    const totalToRenter = subtotal + insuranceTotal; 
    
    // Commission calculation
    const commissionAmount = totalToRenter * MARKETPLACE_COMMISSION_RATE; 
    const payoutToLister = totalToRenter - commissionAmount;

    // --- 3. Database Update (Simulated Confirmation) ---
    const booking = await db.booking.create({
        data: {
            listingId,
            title: listing.title,
            renterId,
            listerId: listing.listerId,
            startDate,
            endDate,
            totalPrice: parseFloat(totalToRenter.toFixed(2)),
            commission: parseFloat(commissionAmount.toFixed(2)),
            payout: parseFloat(payoutToLister.toFixed(2)),
            insuranceFee: parseFloat(insuranceTotal.toFixed(2)),
            status: 'confirmed', 
            // Added type field for the frontend dual-view filter
            type: 'listing', // Since this is a new booking, it's an order for the lister
            createdAt: new Date().toISOString(),
        }
    });

    // --- 4. SUCCESS RESPONSE ---
    return NextResponse.json({ 
        success: true, 
        message: 'Booking successfully simulated and confirmed.',
        bookingId: booking.id
    });

  } catch (error) {
    console.error('Mock Booking Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// --- UPDATED GET METHOD for Dashboard/Bookings Data Retrieval ---
export async function GET(req: Request) {
    // Determine the type of request (for My Bookings page)
    const url = new URL(req.url);
    const role = url.searchParams.get('role') as 'renter' | 'lister' | null;
    
    let listerBookings = [];
    let renterBookings = [];

    // Separate logic to populate data for both dashboards
    if (role === 'lister') {
        // Business Dashboard or Lister tab on My Bookings
        listerBookings = db.booking.findAllByListerId(MOCK_LISTER_ID);

    } else if (role === 'renter') {
        // Renter tab on My Bookings
        renterBookings = db.booking.findAllByUserId(MOCK_CURRENT_USER_ID, 'renter');
        
    } else {
        // Default: For Business Dashboard summary 
        listerBookings = db.booking.findAllByListerId(MOCK_LISTER_ID);
    }


    // Logic for Business Dashboard Summary
    const totalPayout = listerBookings.reduce((sum, b) => sum + b.payout, 0);
    const totalCommission = listerBookings.reduce((sum, b) => sum + b.commission, 0);
    const totalBookings = listerBookings.length;

    return NextResponse.json({ 
        // Return appropriate set of bookings based on the 'role' query
        bookings: role === 'renter' ? renterBookings : listerBookings, 
        summary: {
            totalPayout: parseFloat(totalPayout.toFixed(2)),
            totalCommission: parseFloat(totalCommission.toFixed(2)),
            totalBookings: totalBookings,
        }
    });
}