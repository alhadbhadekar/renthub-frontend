export function saveRental(listing: any) {
    const history = JSON.parse(localStorage.getItem("rentals") || "[]");
  
    history.push({
      ...listing,
      rentedAt: new Date().toISOString(),
    });
  
    localStorage.setItem("rentals", JSON.stringify(history));
  }
  