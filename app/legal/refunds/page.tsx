export const metadata = {
    title: "Refund & Cancellation Policy | RentHub",
    description: "Refund rules, cancellation terms, and renter responsibilities.",
  };
  
  export default function RefundPolicyPage() {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 shadow-2xl text-white">
  
          <h1 className="text-4xl font-bold mb-8">Refund & Cancellation Policy</h1>
  
          <p className="text-white/80 mb-6">
            This Refund Policy outlines how refunds and cancellations are handled
            for rentals made on RentHub.
          </p>
  
          <h2 className="text-2xl font-bold mt-8 mb-3">1. Renter Cancellations</h2>
          <p className="text-white/70 mb-4">
            Renters may cancel a booking up to 24 hours before the start time for
            a full refund. Cancellations made within 24 hours are non-refundable,
            unless the lister agrees otherwise.
          </p>
  
          <h2 className="text-2xl font-bold mt-8 mb-3">2. Lister Cancellations</h2>
          <p className="text-white/70 mb-4">
            If a lister cancels a confirmed booking, the renter will receive a
            full refund, and the lister may be penalized for repeated cancellations.
          </p>
  
          <h2 className="text-2xl font-bold mt-8 mb-3">3. Item Not as Described</h2>
          <p className="text-white/70 mb-4">
            Renters must report issues within 2 hours of pickup or delivery. If an
            item is unsafe, in poor condition, or materially different from the
            listing, RentHub may issue a refund.
          </p>
  
          <h2 className="text-2xl font-bold mt-8 mb-3">4. Damage or Loss</h2>
          <p className="text-white/70 mb-4">
            Refunds are not issued for damage caused by the renter. Responsibility
            for item care belongs to the renter during the rental period.
          </p>
  
          <h2 className="text-2xl font-bold mt-8 mb-3">5. Stripe Fees</h2>
          <p className="text-white/70 mb-4">
            Payment processing fees may be non-refundable depending on Stripe’s
            policy.
          </p>
  
        </div>
      </div>
    );
  }
  