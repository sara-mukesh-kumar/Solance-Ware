export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Shipping & Returns
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            🚚 Shipping Policy
          </h2>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed">
            <li>All orders are processed within <b>24 hours</b> of purchase.</li>
            <li>
              Estimated delivery time: <b>5 business days</b> within India.
            </li>
            <li>
              Free shipping on orders above <b>₹999</b>.
            </li>
            <li>
              You will receive a tracking ID via email/SMS once your order is
              shipped.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            🔄 Return & Exchange Policy
          </h2>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed">
            <li>We offer a <b>10-day return policy</b> from the date of delivery.</li>
            <li>
              Items must be unused, unwashed, and in their original packaging with tags.
            </li>
            <li>
              Easy <b>exchange option</b> available for size or color mismatch.
            </li>
            <li>
              Refunds will be processed to the original payment method within <b>7 working days</b>.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            ⭐ Additional Benefits
          </h2>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed">
            <li>24/7 customer support via email and chat.</li>
            <li>Exclusive packaging for premium orders.</li>
            <li>Priority delivery option available at checkout.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
