export type Review = {
    id: string;
    listingId: string;
    userId: string;
    rating: number;
    comment: string;
    date: string;
  };
  
  export const reviews: Review[] = [
    {
      id: "r1",
      listingId: "1",
      userId: "u2",
      rating: 5,
      comment: "Amazing condition! Super smooth rental.",
      date: "2025-01-12",
    },
  ];
  