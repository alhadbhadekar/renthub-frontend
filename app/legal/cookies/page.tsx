export const metadata = {
    title: "Cookie Policy | RentHub",
  };
  
  export default function CookiesPage() {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 shadow-2xl text-white">
  
          <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
  
          <p className="text-white/80 mb-4">
            RentHub uses cookies to provide a better user experience.
          </p>
  
          <h2 className="text-2xl font-bold mt-8 mb-4">What We Use</h2>
          <ul className="list-disc ml-6 text-white/70 space-y-2">
            <li>Authentication cookies</li>
            <li>Analytics (traffic, usage)</li>
            <li>Preference storage</li>
            <li>Recommendation tracking</li>
          </ul>
        </div>
      </div>
    );
  }
  