export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    image: string;
    content: string;
  }
  
  export const blogs: BlogPost[] = [
    {
      slug: "why-renting-is-the-future",
      title: "Why Renting is The Future of Smart Living",
      description: "Owning everything is outdated. Learn how renting saves money, reduces clutter, and is eco-friendly.",
      date: "2025-01-12",
      image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
      content: `
        Renting things instead of owning them is becoming one of the fastest-growing lifestyle choices.
        It saves money, reduces waste, and gives flexibility.
  
        ### Benefits of Renting
        - Save money by avoiding large purchases
        - Reduce clutter in your home
        - Access high-quality products only when you need them
        - Better for the environment
  
        The future is peer-to-peer sharing.
      `,
    },
  
    {
      slug: "top-10-items-to-rent-in-2025",
      title: "Top 10 Items People Are Renting in 2025",
      description: "From cameras to party supplies, here are the most in-demand rental items this year.",
      date: "2025-01-20",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80",
      content: `
        People no longer buy everything — renting is booming.
  
        ### Most Rented Items
        1. Cameras & lenses  
        2. Party speakers  
        3. Drones  
        4. Projectors  
        5. Camping gear  
        6. Power tools  
        7. Wedding decor  
        8. VR headsets  
        9. DSLR tripods  
        10. PA systems  
      `,
    },
  ];
  