// ✅ REAL RECOMMENDATION ENGINE (NO MOCK DATA)

// Expected Listing Shape (from Go API)
type Listing = {
    id: number;
    title: string;
    category: string;
    pricePerDay: number;
    location: string;
    rating: number;
    images: string[];
  };
  
  // ✅ MAIN ENTRY POINT — PASS REAL API LISTINGS HERE
  export function getRecommendations(listings: Listing[]) {
    if (!Array.isArray(listings) || listings.length === 0) return [];
  
    const views = JSON.parse(localStorage.getItem("views") || "[]");
    const searches = JSON.parse(localStorage.getItem("searches") || "[]");
    const rentals = JSON.parse(localStorage.getItem("rentals") || "[]");
  
    let recommended: Listing[] = [];
  
    // ✅ 1️⃣ BASED ON LAST VIEWED
    const lastViewed = views.slice(-1)[0];
    if (lastViewed) {
      const item = listings.find((x) => x.id === Number(lastViewed.id));
      if (item) {
        recommended.push(
          ...listings.filter(
            (x) => x.category === item.category && x.id !== item.id
          )
        );
      }
    }
  
    // ✅ 2️⃣ BASED ON LAST SEARCH
    const lastSearch = searches.slice(-1)[0];
    if (lastSearch?.term) {
      const term = lastSearch.term.toLowerCase();
      recommended.push(
        ...listings.filter((x) =>
          x.title.toLowerCase().includes(term)
        )
      );
    }
  
    // ✅ 3️⃣ BASED ON LAST RENTAL
    const lastRental = rentals.slice(-1)[0];
    if (lastRental) {
      const rented = listings.find((x) => x.id === Number(lastRental.id));
      if (rented) {
        recommended.push(
          ...listings.filter(
            (x) => x.category === rented.category && x.id !== rented.id
          )
        );
      }
    }
  
    // ✅ 4️⃣ FALLBACK → TRENDING (TOP RATED)
    if (recommended.length === 0) {
      recommended = [...listings]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);
    }
  
    // ✅ REMOVE DUPLICATES + LIMIT TO 4
    const unique = Array.from(
      new Map(recommended.map((item) => [item.id, item])).values()
    );
  
    return unique.slice(0, 4);
  }
  