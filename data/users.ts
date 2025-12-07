export type User = {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    rating: number;
    totalRentals: number;
    joinedAt: string;
  };
  
  export const users: User[] = [
    {
      id: "u1",
      name: "Aman Verma",
      avatar: "https://i.pravatar.cc/150?img=8",
      bio: "Verified renter • Mumbai",
      rating: 4.6,
      totalRentals: 18,
      joinedAt: "2024-01-10",
    },
    {
      id: "u2",
      name: "Priya Sharma",
      avatar: "https://i.pravatar.cc/150?img=32",
      bio: "Event organizer • Delhi",
      rating: 4.9,
      totalRentals: 42,
      joinedAt: "2023-09-20",
    },
  ];
  