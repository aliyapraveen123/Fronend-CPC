import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

/**
 * FAQ Page
 * Frequently Asked Questions
 */
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqCategories = [
    {
      category: 'Orders & Shipping',
      questions: [
        {
          question: 'How do I track my order?',
          answer: 'Once your order is shipped, you will receive a tracking number via email. You can use this number to track your order on our Orders page or on the courier\'s website. You can also check your order status by logging into your account and visiting the Orders section.'
        },
        {
          question: 'What are the delivery charges?',
          answer: 'Delivery charges vary based on your location and order value. Orders above ₹500 qualify for free shipping. For orders below ₹500, a nominal delivery charge of ₹40-₹80 will be applied depending on your location. You can see the exact delivery charge at checkout before placing your order.'
        },
        {
          question: 'How long does delivery take?',
          answer: 'Standard delivery takes 3-7 business days depending on your location. Metro cities typically receive orders within 3-4 days, while remote areas may take up to 7 days. We also offer express delivery options at checkout for faster shipping.'
        },
        {
          question: 'Can I change my delivery address after placing an order?',
          answer: 'You can change your delivery address within 24 hours of placing the order. Please contact our customer support immediately with your order number and the new address. Once the order is shipped, address changes are not possible.'
        }
      ]
    },
    {
      category: 'Payment & Pricing',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept multiple payment methods including Credit/Debit Cards (Visa, MasterCard, American Express), Net Banking, UPI payments, Digital Wallets (Paytm, PhonePe, Google Pay), and Cash on Delivery (COD) for eligible orders.'
        },
        {
          question: 'Is it safe to use my credit card on your website?',
          answer: 'Yes, absolutely! We use industry-standard SSL encryption and secure payment gateways to protect your card information. Your card details are never stored on our servers and are directly processed by our certified payment partners.'
        },
        {
          question: 'Do you offer Cash on Delivery?',
          answer: 'Yes, Cash on Delivery (COD) is available for orders up to ₹50,000. However, COD may not be available for certain locations or during promotional sales. Please check at checkout if COD is available for your order.'
        },
        {
          question: 'Can I get a refund if I cancel my order?',
          answer: 'Yes, if you cancel your order before it is shipped, you will receive a full refund within 5-7 business days. The refund will be credited to your original payment method. For COD orders, no refund is applicable as no payment was made.'
        }
      ]
    },
    {
      category: 'Returns & Refunds',
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 7-day return policy from the date of delivery. Products must be unused, in original packaging, and with all tags attached. Certain items like personal care products, intimate wear, and customized products are not eligible for returns. Please check the product page for specific return policies.'
        },
        {
          question: 'How do I return a product?',
          answer: 'To return a product, log into your account, go to Orders, select the order, and click on "Return Item". Choose the reason for return and submit. Our team will schedule a pickup from your address. Once we receive and verify the product, your refund will be processed within 7-10 business days.'
        },
        {
          question: 'How long does it take to process a refund?',
          answer: 'After we receive your returned product and verify its condition, the refund is processed within 2-3 business days. The amount will be credited to your original payment method within 5-7 business days, depending on your bank.'
        },
        {
          question: 'What if I receive a damaged or wrong product?',
          answer: 'We apologize for any inconvenience! If you receive a damaged or wrong product, please contact us within 48 hours with photos of the product and packaging. We will arrange for a free return pickup and send you a replacement or full refund immediately.'
        }
      ]
    },
    {
      category: 'Account & Security',
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Click on the "Register" button in the top menu, fill in your name, email, and create a password. You can also sign up using your Google, Facebook, Apple, or GitHub account for faster registration. Once registered, you can start shopping immediately!'
        },
        {
          question: 'I forgot my password. How do I reset it?',
          answer: 'On the login page, click on "Forgot Password". Enter your registered email address, and we will send you a password reset link. Click the link in the email and create a new password. The link is valid for 24 hours.'
        },
        {
          question: 'How do I update my account information?',
          answer: 'Log into your account and go to the Profile section. Here you can update your name, email, phone number, and delivery addresses. Make sure to save your changes before leaving the page.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we take your privacy very seriously. All your personal information is encrypted and stored securely. We never share your data with third parties without your consent. Please read our Privacy Policy for more details on how we protect your information.'
        }
      ]
    },
    {
      category: 'Products & Stock',
      questions: [
        {
          question: 'Are all products genuine?',
          answer: 'Yes, absolutely! We source all our products directly from authorized distributors and manufacturers. Every product comes with a manufacturer\'s warranty and quality guarantee. We do not sell counterfeit or replica items.'
        },
        {
          question: 'How do I know if a product is in stock?',
          answer: 'Product availability is shown on the product page. If a product is "Out of Stock", you can click "Notify Me" to receive an email when it becomes available. Stock information is updated in real-time.'
        },
        {
          question: 'Can I pre-order products that are out of stock?',
          answer: 'Currently, we do not offer pre-orders. However, you can use the "Notify Me" feature on out-of-stock products to get notified as soon as they are back in stock. We restock popular items regularly.'
        },
        {
          question: 'Do you offer product warranties?',
          answer: 'Yes, most electronics and appliances come with manufacturer warranties ranging from 6 months to 2 years. Warranty details are mentioned on each product page. We also offer extended warranty options at checkout for certain products.'
        }
      ]
    },
    {
      category: 'Offers & Discounts',
      questions: [
        {
          question: 'How do I apply a coupon code?',
          answer: 'At checkout, you will find a "Apply Coupon" field. Enter your coupon code and click "Apply". The discount will be reflected in your order total. Please note that only one coupon can be used per order and some coupons may have minimum order requirements.'
        },
        {
          question: 'Can I use multiple discount codes on one order?',
          answer: 'No, only one coupon code can be applied per order. However, ongoing sale discounts and coupon discounts can sometimes be combined. The system will automatically apply the best discount available to your order.'
        },
        {
          question: 'How can I get notified about sales and offers?',
          answer: 'Subscribe to our newsletter by entering your email in the footer section. You can also follow us on social media (Facebook, Instagram, Twitter) for flash sales and exclusive offers. Enable notifications on our website to get instant alerts about deals.'
        },
        {
          question: 'Do you have a loyalty program?',
          answer: 'Yes! When you shop with us, you earn ShopHub Coins on every purchase. These coins can be redeemed on your next order for discounts. For every ₹100 spent, you earn 10 coins, and 100 coins = ₹10 discount. Check your Profile section to see your coins balance.'
        }
      ]
    }
  ];

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Frequently Asked Questions
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to common questions about shopping at CheapoChamps. 
            Can't find what you're looking for? Contact our support team!
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card p-6 text-center hover-lift animate-fade-in-up">
            <div className="text-4xl mb-3">📦</div>
            <h3 className="text-2xl font-bold text-primary-600 mb-2">3-7 Days</h3>
            <p className="text-gray-600">Average Delivery Time</p>
          </div>
          <div className="card p-6 text-center hover-lift animate-fade-in-up stagger-1">
            <div className="text-4xl mb-3">🔄</div>
            <h3 className="text-2xl font-bold text-primary-600 mb-2">7 Days</h3>
            <p className="text-gray-600">Easy Returns</p>
          </div>
          <div className="card p-6 text-center hover-lift animate-fade-in-up stagger-2">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="text-2xl font-bold text-primary-600 mb-2">24/7</h3>
            <p className="text-gray-600">Customer Support</p>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="animate-fade-in-up" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center mr-3">
                  {categoryIndex + 1}
                </span>
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex;
                  const isOpen = openIndex === globalIndex;
                  
                  return (
                    <div key={faqIndex} className="card overflow-hidden transition-all duration-300 hover:shadow-lg">
                      <button
                        onClick={() => toggleFAQ(globalIndex)}
                        className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                      >
                        <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                        <div className="flex-shrink-0">
                          {isOpen ? (
                            <FiChevronUp className="text-primary-600 text-xl transition-transform duration-300" />
                          ) : (
                            <FiChevronDown className="text-gray-400 text-xl transition-transform duration-300" />
                          )}
                        </div>
                      </button>
                      
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed border-t border-gray-100">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions Section */}
        <div className="mt-16 card bg-gradient-to-r from-primary-600 to-primary-800 text-white p-12 text-center animate-fade-in-up">
          <div className="text-5xl mb-4">🤔</div>
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Our customer support team is here to help you. Reach out to us via email, 
            phone, or live chat and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="btn-primary bg-white text-primary-600 hover:bg-yellow-300">
              Contact Support
            </a>
            <a href="mailto:support@cheapochamps.com" className="btn-secondary border-2 border-white text-white hover:bg-white hover:text-primary-600">
              <FaEnvelope className="mr-2" />
              Email Us
            </a>
          </div>
        </div>

        {/* Help Topics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <a href="/orders" className="card p-6 text-center hover-lift transition-all duration-300 hover:border-primary-500">
            <div className="text-4xl mb-3">📋</div>
            <h3 className="font-bold mb-2">My Orders</h3>
            <p className="text-sm text-gray-600">Track & manage orders</p>
          </a>
          <a href="/wishlist" className="card p-6 text-center hover-lift transition-all duration-300 hover:border-primary-500">
            <div className="text-4xl mb-3">❤️</div>
            <h3 className="font-bold mb-2">Wishlist</h3>
            <p className="text-sm text-gray-600">Saved items</p>
          </a>
          <a href="/profile" className="card p-6 text-center hover-lift transition-all duration-300 hover:border-primary-500">
            <div className="text-4xl mb-3">👤</div>
            <h3 className="font-bold mb-2">My Account</h3>
            <p className="text-sm text-gray-600">Profile settings</p>
          </a>
          <a href="/contact" className="card p-6 text-center hover-lift transition-all duration-300 hover:border-primary-500">
            <div className="text-4xl mb-3">📞</div>
            <h3 className="font-bold mb-2">Contact Us</h3>
            <p className="text-sm text-gray-600">Get in touch</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
