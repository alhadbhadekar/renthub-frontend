export const metadata = {
    title: "Privacy Policy | RentHub",
    description: "Our privacy practices and how we handle your information.",
  };
  
  export default function PrivacyPage() {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 shadow-2xl text-white">
  
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
  
          <p className="text-white/80 mb-6">
            This policy explains how RentHub collects, uses, and protects your
            personal information.
          </p>
  
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
          <ul className="list-disc ml-6 text-white/70 space-y-2 mb-4">
            <li>Name, email, profile image (Google/Facebook Auth)</li>
            <li>Device and usage data</li>
            <li>Listing data (for listers)</li>
            <li>Payment information via Stripe</li>
          </ul>
  
          <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc ml-6 text-white/70 space-y-2 mb-4">
            <li>To operate and improve the platform</li>
            <li>To process rentals and payments</li>
            <li>To personalize recommendations</li>
            <li>To ensure safety and fraud prevention</li>
          </ul>
  
          <h2 className="text-2xl font-bold mt-8 mb-4">3. Cookies</h2>
          <p className="text-white/70 mb-4">
            We use cookies for authentication, analytics, and personalization.
            You can manage cookie preferences in your browser.
          </p>
  
          <h2 className="text-2xl font-bold mt-8 mb-4">4. Third-Party Services</h2>
          <p className="text-white/70 mb-4">
            We may share data with Stripe (payments), Google/Facebook (auth), and
            analytics platforms. We never sell your personal information.
          </p>
  
          <h2 className="text-2xl font-bold mt-8 mb-4">5. Data Security</h2>
          <p className="text-white/70 mb-4">
            We implement industry-standard security measures to protect your data.
          </p>
  
          <h2 className="text-2xl font-bold mt-8 mb-4">6. Data Deletion</h2>
          <p className="text-white/70 mb-4">
            You may request full account and data deletion at any time.
          </p>
  
        </div>
      </div>
    );
  }
  