// /app/bookings/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format, isFuture } from 'date-fns';

// --- UPDATED TYPES TO MATCH API RESPONSE ---
type BookingStatus = "pending" | "confirmed" | "cancelled";
type BookingType = 'renting' | 'listing'; // Added type to distinguish role

type Booking = {
  id: string;
  title: string;
  startDate: string; // Use startDate/endDate for date-fns compatibility
  endDate: string;
  totalPrice: number; // Total paid by the renter
  payout: number; // Net amount for the lister (after commission)
  commission: number; // Marketplace earnings
  status: BookingStatus;
  type: BookingType; // Added type to filter views
};

// Simulated Profile Fetch to determine user role
const mockFetchUserProfile = () => {
    // In a real app, this comes from NextAuth/session
    return {
        name: "Mock User",
        email: "mock@renthub.com",
        // Setting to 'Business' ensures the Lister tab is visible
        accountType: "Business", 
    };
};
// ------------------------------------------

export default function MyBookingsPage() {
    const [profile, setProfile] = useState(mockFetchUserProfile());
    const [allBookings, setAllBookings] = useState<Booking[]>([]);
    const [activeTab, setActiveTab] = useState<BookingType>('renting');
    const [loading, setLoading] = useState(true);

    // --- REPLACED LOCALSTORAGE WITH API FETCH ---
    useEffect(() => {
        async function fetchBookings(role: BookingType) {
            setLoading(true);
            try {
                // Calls the GET /api/bookings?role={renter/lister} endpoint
                const response = await fetch(`/api/bookings?role=${role}`);
                const data = await response.json();
                
                // For this mock, we assume all received bookings are for the requested role
                const bookingsWithTypes = data.bookings.map((b: any) => ({
                    ...b,
                    type: role,
                    // Convert date strings back to objects if necessary, or use strings
                })) as Booking[];

                setAllBookings(bookingsWithTypes);

            } catch (error) {
                console.error(`Failed to fetch ${role} bookings:`, error);
                setAllBookings([]);
            } finally {
                setLoading(false);
            }
        }
        
        fetchBookings(activeTab);

    }, [activeTab]); // Refetch when the tab changes

    // --- FILTERING LOGIC ---
    const activeRentals = allBookings.filter(b => isFuture(new Date(b.endDate)) && b.status === 'confirmed');
    const pastRentals = allBookings.filter(b => !isFuture(new Date(b.endDate)) || b.status !== 'confirmed');

    function getStatusStyles(status: BookingStatus) {
        switch (status) {
            case "confirmed":
                return "bg-green-600/30 text-green-300";
            case "cancelled":
                return "bg-red-600/30 text-red-300";
            case "pending":
            default:
                return "bg-yellow-600/30 text-yellow-300";
        }
    }
    
    // NOTE: Cancellation logic would also need to be API-based (e.g., PUT /api/bookings/{id})
    function mockCancelBooking(id: string, title: string) {
        alert(`MOCK: Cancelling booking ${id} for ${title}. In a real app, this sends a PUT request to the API.`);
        // Simulate immediate cancellation on frontend
        setAllBookings(allBookings.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
    }


    return (
        <div className="max-w-7xl mx-auto px-6 py-24 text-white">
            <h1 className="text-3xl font-bold mb-8">🗓️ Rental History & Orders</h1>

            {/* --- TAB NAVIGATION (Dual View) --- */}
            <div className="flex border-b border-white/20 mb-8">
                <TabButton 
                    label="My Rentals (Renter)" 
                    isActive={activeTab === 'renting'} 
                    onClick={() => setActiveTab('renting')} 
                />
                {profile.accountType === 'Business' && (
                    <TabButton 
                        label="My Orders (Lister)" 
                        isActive={activeTab === 'listing'} 
                        onClick={() => setActiveTab('listing')} 
                    />
                )}
            </div>

            {loading ? (
                <div className="p-8 text-white">Loading {activeTab} history...</div>
            ) : (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl">
                    {allBookings.length === 0 ? (
                        <p className="text-white/60">No {activeTab === 'renting' ? 'rentals' : 'orders'} yet. Start listing/renting!</p>
                    ) : (
                        <>
                            <BookingList 
                                title="Active & Upcoming" 
                                bookings={activeRentals} 
                                isListerView={activeTab === 'listing'}
                                getStatusStyles={getStatusStyles}
                                cancelBooking={mockCancelBooking}
                            />
                            <div className="mt-10 pt-6 border-t border-white/10">
                                <BookingList 
                                    title="Past & Completed" 
                                    bookings={pastRentals} 
                                    isListerView={activeTab === 'listing'}
                                    getStatusStyles={getStatusStyles}
                                    cancelBooking={mockCancelBooking}
                                />
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

// --- Helper Components ---

const TabButton = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`
            px-6 py-3 font-semibold 
            ${isActive ? 'border-b-2 border-green-500 text-green-500' : 'text-white/60 hover:text-white/90'}
            transition duration-150
        `}
    >
        {label}
    </button>
);


const BookingList = ({ title, bookings, isListerView, getStatusStyles, cancelBooking }: { 
    title: string, 
    bookings: Booking[], 
    isListerView: boolean,
    getStatusStyles: (status: BookingStatus) => string,
    cancelBooking: (id: string, title: string) => void
}) => (
    <>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="grid md:grid-cols-2 gap-6">
            {bookings.map((b) => (
                <div
                    key={b.id}
                    className="bg-black/30 p-6 rounded-xl border border-white/10"
                >
                    <h2 className="font-semibold text-lg">{b.title}</h2>
                    
                    <p className="text-sm text-white/60">
                        {format(new Date(b.startDate), 'MMM d, yyyy')} → {format(new Date(b.endDate), 'MMM d, yyyy')}
                    </p>

                    <p className="mt-2">
                        {isListerView ? 'Renter Paid:' : 'Your Total:'} 
                        <span className="font-bold ml-1">${b.totalPrice.toFixed(2)}</span>
                    </p>

                    {/* --- COMMISSION / PAYOUT DISPLAY --- */}
                    {isListerView ? (
                        <p className="font-bold mt-1 text-green-400">
                            Payout: ${b.payout.toFixed(2)} 
                            <span className="text-xs text-white/60 ml-2">({b.commission.toFixed(2)} commission)</span>
                        </p>
                    ) : (
                        <p className="mt-1 text-sm text-white/70">
                            {/* Renter view doesn't care about commission */}
                            You saved all your memories!
                        </p>
                    )}


                    <span
                        className={`inline-block mt-3 px-3 py-1 text-xs rounded ${getStatusStyles(
                            b.status
                        )}`}
                    >
                        {b.status}
                    </span>

                    {b.status === "confirmed" && !isListerView && ( // Only Renter can cancel
                        <button
                            onClick={() => cancelBooking(b.id, b.title)}
                            className="mt-4 w-full bg-red-600 hover:bg-red-700 py-2 rounded text-sm transition"
                        >
                            Cancel Booking
                        </button>
                    )}
                </div>
            ))}
        </div>
        {bookings.length === 0 && <p className="text-white/60 mt-4">No {title.toLowerCase()} items found in this view.</p>}
    </>
);