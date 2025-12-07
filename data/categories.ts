// data/categories.ts

export type Category = {
    id: number;
    key: string;
    label: string;
    icon: string;
    heroImage: string;
    description: string;
  };
  
  export const categories: Category[] = [
    {
      id: 1,
      key: "furniture",
      label: "Furniture",
      icon: "🪑",
      heroImage:
        "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80",
      description: "Rent tables, chairs, sofas, and more.",
    },
    {
      id: 2,
      key: "electronics",
      label: "Electronics",
      icon: "📷",
      heroImage:
        "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1600&q=80",
      description: "Cameras, projectors, speakers, consoles.",
    },
    {
      id: 3,
      key: "party",
      label: "Party Supplies",
      icon: "🎉",
      heroImage:
        "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=1600&q=80",
      description: "Tents, lights, décor, sound systems.",
    },
    {
      id: 4,
      key: "outdoor",
      label: "Outdoor",
      icon: "🏕️",
      heroImage:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
      description: "Camping & sports gear.",
    },
    {
      id: 5,
      key: "vehicles",
      label: "Vehicles",
      icon: "🚲",
      heroImage:
        "https://images.unsplash.com/photo-1511300636408-a63a89df3482?auto=format&fit=crop&w=1600&q=80",
      description: "Bikes, scooters, trailers.",
    },
    {
      id: 6,
      key: "tools",
      label: "Tools",
      icon: "🛠️",
      heroImage:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
      description: "DIY equipment & power tools.",
    },
  ];
  