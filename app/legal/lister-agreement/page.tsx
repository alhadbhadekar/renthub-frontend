export const metadata = {
    title: "Lister Agreement | RentHub",
    description: "Terms and responsibilities for item owners listing on RentHub.",
  };
  
  export default function ListerAgreementPage() {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 shadow-2xl text-white">
  
          <h1 className="text-4xl font-bold mb-8">Lister Agreement</h1>
  
          <p className="text-white/80 mb-6">
            By listing an item on RentHub, you agree to the following terms and obligations.
          </p>
  
          <h2 className="text-2xl font-bold mt-8 mb-3">1. Ownership & Rights</h2>
          <p className="text-white/70 mb-4">
            You confirm that you own the item or have full legal rights to rent it.
          </p>
  
          <h2 className="text-2xl font-bold mt-8 mb-3">2. Accuracy of Listing</h2>
          <p className="text-white/70 mb-4">
            You must accurately describe the item, including condition, photos,
            and any limitations. Misleading listings may result in removal.
          </p>
  
          <h2 className="text-2xl font-bold mt-8 mb-3">3. Item Condition</h2>
          <p className="text-white/70 mb-4">
            You agree to provide the item clean, functional, and safe to use.
          </p>
  
          <h2 className="text-2xl font-bold mt-8 mb-3">4. Cancellations</h2>
          <p className="text-white/70 mb-4">
            Frequent cancellations may lead to lower ranking or account suspension.
          </p>
  
          <h2 className="text-2xl font-bold mt-8 mb-3">5. Earnings & Payouts</h2>
          <p className="text-white/70 mb-4">
            Payouts are processed through Stripe. You must provide accurate
            payment details. Stripe’s verification policies apply.
          </p>
  
          <h2 className="text-2xl font-bold mt-8 mb-3">6. Liability</h2>
          <p className="text-white/70 mb-4">
            RentHub does not insure items. It is your responsibility to recover
            damages from renters if needed.
          </p>
        </div>
      </div>
    );
  }
  