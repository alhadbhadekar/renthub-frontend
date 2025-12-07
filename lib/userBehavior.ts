export function trackView(id: string) {
    let views = JSON.parse(localStorage.getItem("views") || "[]");
    views.push({ id, date: Date.now() });
    localStorage.setItem("views", JSON.stringify(views));
  }
  
  export function trackSearch(term: string) {
    let searches = JSON.parse(localStorage.getItem("searches") || "[]");
    searches.push({ term, date: Date.now() });
    localStorage.setItem("searches", JSON.stringify(searches));
  }
  
  export function trackRental(id: string) {
    let rentals = JSON.parse(localStorage.getItem("rentals") || "[]");
    rentals.push({ id, date: Date.now() });
    localStorage.setItem("rentals", JSON.stringify(rentals));
  }
  