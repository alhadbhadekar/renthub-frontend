declare module "zipcodes" {
    export function lookup(zip: string): {
      zip: string;
      latitude: number;
      longitude: number;
      city: string;
      state: string;
      country: string;
    } | null;
  }
  