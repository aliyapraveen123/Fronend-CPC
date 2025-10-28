import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';

/**
 * Product Card Component
 * Displays product thumbnail with actions
 */
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Check if product is in wishlist
  const isInWishlist = wishlistItems.some(item => item._id === product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    const cartItem = {
      product: product._id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images[0]?.url || '/placeholder.jpg',
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
    toast.success('Added to cart');
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    const cartItem = {
      product: product._id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images[0]?.url || '/placeholder.jpg',
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
    navigate('/checkout');
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please login to add items to wishlist');
      navigate('/login');
      return;
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id))
        .unwrap()
        .then(() => toast.success('Removed from wishlist'))
        .catch((error) => toast.error(error));
    } else {
      dispatch(addToWishlist(product._id))
        .unwrap()
        .then(() => toast.success('Added to wishlist'))
        .catch((error) => toast.error(error));
    }
  };

  return (
    <Link to={`/products/${product._id}`} className="card overflow-hidden group hover-lift animate-fade-in-up">
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden image-zoom">
        <img
          src={product.images[0]?.url || '/placeholder.jpg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm animate-fade-in">
            <span className="text-white font-semibold text-lg animate-pulse">Out of Stock</span>
          </div>
        )}
        {product.discountPrice && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-lg animate-bounce-slow">
            {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
          </div>
        )}
        {/* Wishlist Badge */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handleWishlistToggle}
            className={`p-2 bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
              isInWishlist 
                ? 'bg-red-50 text-red-500' 
                : 'hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <FiHeart size={18} className={isInWishlist ? 'fill-current' : ''} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 truncate group-hover:text-primary-600 transition-colors duration-300">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2 truncate">{product.category}</p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400 space-x-0.5">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                size={14} 
                className={`${i < Math.floor(product.ratings) ? 'fill-current' : 'text-gray-300'} transition-all duration-300 hover:scale-125`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({product.numReviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            {product.discountPrice ? (
              <>
                <span className="text-lg font-bold text-gradient animate-pulse-slow">₹{product.discountPrice}</span>
                <span className="text-sm text-gray-500 line-through ml-2">₹{product.price}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-primary-600">₹{product.price}</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 btn-secondary text-sm flex items-center justify-center space-x-2 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <FiShoppingCart className="hover:animate-wiggle" />
              <span>Add to Cart</span>
            </button>
            <button 
              onClick={handleWishlistToggle}
              className={`p-2 border rounded-lg transition-all duration-300 hover:scale-110 ${
                isInWishlist 
                  ? 'bg-red-50 border-red-500 text-red-500' 
                  : 'border-gray-300 hover:bg-gray-100 hover:border-primary-500'
              }`}
            >
              <FiHeart className={`transition-colors duration-300 ${isInWishlist ? 'fill-current' : 'hover:text-red-500'}`} />
            </button>
          </div>
          <button
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className="w-full btn-primary text-sm flex items-center justify-center space-x-2 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
