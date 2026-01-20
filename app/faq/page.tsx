import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FAQPage() {
  const faqs = [
    {
      category: 'Products',
      questions: [
        {
          q: 'Are the products authentic?',
          a: 'Yes, all products in our archive are verified authentic. We work directly with teams, collectors, and trusted sources to ensure authenticity. Every item comes with our authenticity guarantee.',
        },
        {
          q: 'What condition are the products in?',
          a: 'We clearly label the condition of each product: New, Like New, Excellent, Good, or Fair. All products are thoroughly inspected before listing, and we provide detailed descriptions of any wear or imperfections.',
        },
        {
          q: 'Do you have size charts?',
          a: 'Yes, we have detailed size guides for jerseys and bib shorts. Visit our Size Guide page for comprehensive measurements and fit information.',
        },
        {
          q: 'Can I see more photos of a product?',
          a: 'Each product listing includes multiple images. If you need additional photos or have specific questions about a product, please contact us.',
        },
      ],
    },
    {
      category: 'Shipping',
      questions: [
        {
          q: 'How long does shipping take?',
          a: 'Standard shipping typically takes 5-7 business days within the US, and 10-14 business days internationally. Express shipping options are available at checkout.',
        },
        {
          q: 'Do you ship internationally?',
          a: 'Yes, we ship worldwide. International shipping costs and delivery times vary by location. See our Shipping page for detailed information.',
        },
        {
          q: 'Is shipping free?',
          a: 'We offer free shipping on orders over $200. For orders under $200, standard shipping is $15.',
        },
        {
          q: 'How do I track my order?',
          a: 'Once your order ships, you\'ll receive a tracking number via email. You can use this to track your package through our shipping partners.',
        },
      ],
    },
    {
      category: 'Returns & Exchanges',
      questions: [
        {
          q: 'What is your return policy?',
          a: 'We offer a 30-day return policy on all items in original condition. Items must be unworn and in their original packaging with tags attached.',
        },
        {
          q: 'How do I return an item?',
          a: 'Contact us within 30 days of delivery to initiate a return. We\'ll provide a return shipping label and instructions. Once we receive and inspect the item, we\'ll process your refund.',
        },
        {
          q: 'Can I exchange a product for a different size?',
          a: 'Exchanges are subject to availability. Contact us to check if your desired size is in stock. If available, we\'ll process the exchange. If not, we can process a return and you can place a new order.',
        },
        {
          q: 'Who pays for return shipping?',
          a: 'Return shipping is free for items that are defective or incorrect. For other returns, the customer is responsible for return shipping costs.',
        },
      ],
    },
    {
      category: 'Payment & Orders',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay.',
        },
        {
          q: 'Is my payment information secure?',
          a: 'Yes, all payments are processed through secure, encrypted payment gateways. We never store your full payment information.',
        },
        {
          q: 'Can I cancel or modify my order?',
          a: 'Orders can be cancelled or modified within 24 hours of placement, provided they haven\'t shipped yet. Contact us immediately if you need to make changes.',
        },
        {
          q: 'Do you offer gift cards?',
          a: 'Yes, we offer digital gift cards that can be purchased and sent via email. Gift cards never expire and can be used for any purchase.',
        },
      ],
    },
    {
      category: 'General',
      questions: [
        {
          q: 'How do I contact customer service?',
          a: 'You can reach us via email at support@pelotonarchive.com or use our contact form. We typically respond within 24 hours.',
        },
        {
          q: 'Do you have a physical store?',
          a: 'We are an online-only retailer, which allows us to offer a wider selection and better prices. All orders are shipped directly from our warehouse.',
        },
        {
          q: 'Can I request a specific product?',
          a: 'Yes! If you\'re looking for a specific team kit or item, contact us and we\'ll do our best to source it for you.',
        },
        {
          q: 'Do you offer discounts or promotions?',
          a: 'We regularly offer promotions and sales. Sign up for our newsletter to receive exclusive discounts and be notified of new arrivals.',
        },
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-black/60 font-light tracking-tight max-w-2xl mb-16">
            Find answers to common questions about our products, shipping, returns, and more.
          </p>

          <div className="max-w-4xl space-y-16">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-light text-black tracking-tight mb-8 uppercase">
                  {category.category}
                </h2>
                <div className="space-y-6">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="border-b border-black/10 pb-6 last:border-0">
                      <h3 className="text-lg font-light text-black tracking-tight mb-3">
                        {faq.q}
                      </h3>
                      <p className="text-sm text-black/70 font-light tracking-tight leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 p-8 bg-black/5 border border-black/10">
            <h3 className="text-xl font-light text-black tracking-tight mb-4">
              Still have questions?
            </h3>
            <p className="text-sm text-black/70 font-light tracking-tight mb-6">
              Can't find what you're looking for? Contact our customer service team and we'll be happy to help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-black text-white hover:bg-black/90 font-light text-sm tracking-wider uppercase transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

