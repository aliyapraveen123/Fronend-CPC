import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedProducts } from '../redux/slices/productsSlice';
import ProductCard from '../components/products/ProductCard';
import { FiShoppingBag, FiTruck, FiShield, FiHeadphones } from 'react-icons/fi';

/**
 * Home Page
 * Landing page with hero, featured products, and features
 */
const Home = () => {
  const dispatch = useDispatch();
  const { featuredProducts } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  return (
    <div>
      {/* Hero Section with Background Images */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800 animate-gradient"></div>
        
        {/* Decorative Background Images */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-300 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-yellow-200 rounded-full blur-3xl animate-bounce-slow"></div>
        </div>

        {/* Hero Content */}
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight animate-fade-in-up">
                Welcome to <span className="text-yellow-300">CheapoChamps</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in-up animation-delay-200">
                Discover amazing products at unbeatable prices. Shop the latest trends in electronics, fashion, sports, and more!
              </p>
              <div className="flex gap-4 animate-fade-in-up stagger-2">
                <Link to="/products" className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  Shop Now
                </Link>
                <Link to="/products?deals=true" className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 hover:scale-105">
                  View Deals
                </Link>
              </div>
            </div>

            {/* Right Image Grid */}
            <div className="hidden lg:grid grid-cols-2 gap-4 animate-fade-in-up stagger-3">
              <div className="space-y-4">
                <div className="relative group overflow-hidden rounded-2xl shadow-2xl hover-lift">
                  <img 
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop" 
                    alt="Headphones" 
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-semibold">Premium Audio</span>
                  </div>
                </div>
                <div className="relative group overflow-hidden rounded-2xl shadow-2xl hover-lift">
                  <img 
                    src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop" 
                    alt="Sunglasses" 
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-semibold">Fashion Style</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="relative group overflow-hidden rounded-2xl shadow-2xl hover-lift">
                  <img 
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop" 
                    alt="Watch" 
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-semibold">Smart Watches</span>
                  </div>
                </div>
                <div className="relative group overflow-hidden rounded-2xl shadow-2xl hover-lift">
                  <img 
                    src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop" 
                    alt="Camera" 
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-semibold">Electronics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Animation Elements */}
        <div className="absolute bottom-10 left-20 animate-bounce-slow">
          <div className="w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm"></div>
        </div>
        <div className="absolute top-40 right-32 animate-bounce-slow" style={{animationDelay: '1s'}}>
          <div className="w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm"></div>
        </div>
      </section>

      {/* Category Showcase Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in-up">
            Shop by <span className="text-gradient">Category</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Electronics', img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=300&fit=crop', color: 'from-blue-500 to-blue-600' },
              { name: 'Fashion', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop', color: 'from-pink-500 to-pink-600' },
              { name: 'Sports', img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=300&fit=crop', color: 'from-green-500 to-green-600' },
              { name: 'Home & Kitchen', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop', color: 'from-purple-500 to-purple-600' },
            ].map((category, index) => (
              <Link 
                key={category.name}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className={`relative group overflow-hidden rounded-2xl shadow-lg hover-lift animate-fade-in-up stagger-${index + 1}`}
              >
                <div className="aspect-square relative">
                  <img 
                    src={category.img} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-40 group-hover:opacity-60 transition-opacity duration-300`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center hover-lift animate-fade-in-up stagger-1 group">
              <div className="mb-4 inline-block p-4 bg-primary-50 rounded-full group-hover:bg-primary-100 transition-colors duration-300">
                <FiTruck className="mx-auto text-primary-600 group-hover:scale-110 transition-transform duration-300" size={48} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
              <p className="text-gray-600 text-sm">On orders over ₹500</p>
            </div>
            <div className="text-center hover-lift animate-fade-in-up stagger-2 group">
              <div className="mb-4 inline-block p-4 bg-primary-50 rounded-full group-hover:bg-primary-100 transition-colors duration-300">
                <FiShield className="mx-auto text-primary-600 group-hover:scale-110 transition-transform duration-300" size={48} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
              <p className="text-gray-600 text-sm">100% secure transactions</p>
            </div>
            <div className="text-center hover-lift animate-fade-in-up stagger-3 group">
              <div className="mb-4 inline-block p-4 bg-primary-50 rounded-full group-hover:bg-primary-100 transition-colors duration-300">
                <FiShoppingBag className="mx-auto text-primary-600 group-hover:scale-110 transition-transform duration-300" size={48} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
              <p className="text-gray-600 text-sm">30-day return policy</p>
            </div>
            <div className="text-center hover-lift animate-fade-in-up stagger-4 group">
              <div className="mb-4 inline-block p-4 bg-primary-50 rounded-full group-hover:bg-primary-100 transition-colors duration-300">
                <FiHeadphones className="mx-auto text-primary-600 group-hover:scale-110 transition-transform duration-300" size={48} />
              </div>
              <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Dedicated customer service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="text-gradient">Featured Products</span>
            </h2>
            <p className="text-gray-600 text-lg">Handpicked items just for you</p>
          </div>
          
          {featuredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product, index) => (
                  <div key={product._id} className={`animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              <div className="text-center mt-12 animate-fade-in-up">
                <Link to="/products" className="btn-primary hover:scale-105 hover:shadow-2xl transition-all duration-300">
                  View All Products →
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="inline-block animate-shimmer h-8 w-64 rounded-lg mb-4"></div>
              <p className="text-gray-600">Loading featured products...</p>
            </div>
          )}
        </div>
      </section>

      {/* Promotional Banner with Image */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&h=600&fit=crop" 
            alt="Shopping" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-2xl text-white animate-fade-in-up">
            <h2 className="text-5xl font-bold mb-6">
              Special Offer! <span className="text-yellow-300">50% OFF</span>
            </h2>
            <p className="text-2xl mb-8">
              Get amazing discounts on your favorite products. Limited time offer!
            </p>
            <div className="flex gap-4">
              <Link to="/products" className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                Shop Deals Now
              </Link>
              <Link to="/products?featured=true" className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105">
                View Featured
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Images */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in-up">
            What Our <span className="text-gradient">Customers Say</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Fashion Enthusiast',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
                text: 'Amazing quality products and fast delivery! I love shopping here.',
                rating: 5
              },
              {
                name: 'Michael Chen',
                role: 'Tech Lover',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
                text: 'Best prices on electronics. Customer service is outstanding!',
                rating: 5
              },
              {
                name: 'Emma Davis',
                role: 'Sports Enthusiast',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
                text: 'Wide range of products and excellent shopping experience.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className={`card p-6 hover-lift animate-fade-in-up stagger-${index + 1} text-center`}>
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-primary-100"
                />
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <h4 className="font-bold text-lg">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Animation */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 text-white relative overflow-hidden animate-gradient">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-bounce-slow"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl animate-bounce-slow"></div>
        </div>
        <div className="container-custom text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6 animate-fade-in-up drop-shadow-lg">
            Start Shopping Today
          </h2>
          <p className="text-2xl mb-8 animate-fade-in-up stagger-1">
            Join thousands of happy customers and discover amazing deals
          </p>
          <div className="flex justify-center gap-4 animate-fade-in-up stagger-2">
            <Link to="/register" className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-bold hover:bg-yellow-300 hover:text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              Create an Account
            </Link>
            <Link to="/products" className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-primary-600 transition-all duration-300 hover:scale-105">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;