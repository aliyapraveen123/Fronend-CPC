import { FiUsers, FiTruck, FiAward, FiShield } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

/**
 * About Us Page
 * Company information, mission, and values
 */
const About = () => {
  const teamMembers = [
    {
      name: 'Rajesh Kumar',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Priya Sharma',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Amit Patel',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Sneha Reddy',
      role: 'Marketing Director',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '27+', label: 'Products' },
    { number: '10+', label: 'Categories' },
    { number: '99%', label: 'Satisfaction Rate' }
  ];

  const values = [
    {
      icon: <FiUsers className="text-4xl text-primary-600" />,
      title: 'Customer First',
      description: 'We prioritize customer satisfaction above everything else. Your happiness is our success.'
    },
    {
      icon: <FiTruck className="text-4xl text-primary-600" />,
      title: 'Fast Delivery',
      description: 'Get your products delivered quickly with our reliable and efficient shipping partners.'
    },
    {
      icon: <FiAward className="text-4xl text-primary-600" />,
      title: 'Quality Products',
      description: 'We offer only genuine, high-quality products from trusted brands and manufacturers.'
    },
    {
      icon: <FiShield className="text-4xl text-primary-600" />,
      title: 'Secure Shopping',
      description: 'Shop with confidence. Your data and transactions are protected with advanced security.'
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-fade-in-up">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
          About <span className="text-yellow-300">CheapoChamps</span>
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-yellow-400 mx-auto mb-6"></div>
      </div>

      {/* Stats Section */}
      <div className="container-custom -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card p-6 text-center hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-left">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded in 2020, CheapoChamps started with a simple mission: to make quality products 
              accessible to everyone. What began as a small online store has grown into a trusted 
              marketplace serving thousands of happy customers worldwide.
            </p>
          </div>
          <div className="animate-fade-in-right">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
              alt="Our Office"
              className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and help us serve you better every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="card p-6 text-center hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container-custom py-16">
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Meet Our Team</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            The passionate people behind CheapoChamps who work hard to make your shopping experience exceptional.
          </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="card overflow-hidden hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="flex space-x-3">
                    <a
                      href={member.social.linkedin}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-sky-500 hover:bg-sky-500 hover:text-white transition"
                    >
                      <FaTwitter />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
        </section>
      </div>

      {/* Mission & Vision Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="animate-fade-in-left">
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg leading-relaxed opacity-90">
                To provide customers with a seamless, secure, and delightful online shopping 
                experience by offering quality products at competitive prices, backed by 
                exceptional customer service and fast delivery.
              </p>
            </div>
            <div className="animate-fade-in-right">
              <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg leading-relaxed opacity-90">
                To become India's most trusted and loved e-commerce platform, where customers 
                find everything they need with confidence, convenience, and complete satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="container-custom py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Why Choose <span className="text-gradient">CheapoChamps</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-6 hover-lift animate-fade-in-up">
            <div className="text-5xl mb-4">🎁</div>
            <h3 className="text-xl font-bold mb-3">Best Deals</h3>
            <p className="text-gray-600">
              We offer competitive prices and regular discounts to help you save money on your favorite products.
            </p>
          </div>

          <div className="card p-6 hover-lift animate-fade-in-up stagger-1">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
            <p className="text-gray-600">
              Your transactions are protected with bank-level security. Shop with complete peace of mind.
            </p>
          </div>

          <div className="card p-6 hover-lift animate-fade-in-up stagger-2">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
            <p className="text-gray-600">
              Our customer support team is always ready to help you with any questions or concerns.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container-custom pb-16">
        <div className="card bg-gradient-to-r from-primary-600 to-primary-800 text-white p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of happy customers and discover amazing products today!
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/products" className="btn-primary bg-white text-primary-600 hover:bg-yellow-300">
              Browse Products
            </a>
            <a href="/contact" className="btn-secondary border-2 border-white text-white hover:bg-white hover:text-primary-600">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
