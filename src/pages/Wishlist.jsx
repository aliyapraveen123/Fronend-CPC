import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiX } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';

/**
 * Wishlist Page
 * Display user's wishlist items
 */
const Wishlist = () => {
  const dispatch = useDispatch();
  const { items: wishlistItems, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId))
      .unwrap()
      .then(() => toast.success('Removed from wishlist'))
      .catch((error) => toast.error(error));
  };

  const handleAddToCart = (product) => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="py-16 bg-gray-50 min-h-screen">
        <div className="container-custom text-center">
          <FiHeart className="mx-auto mb-4 text-gray-400" size={80} />
          <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-8">Save items you love to buy later!</p>
          <Link to="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div key={product._id} className="card overflow-hidden group relative">
              {/* Remove Button */}
              <button
                onClick={() => handleRemove(product._id)}
                className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition"
              >
                <FiX className="text-red-500" />
              </button>

              {/* Product Image */}
              <Link to={`/products/${product._id}`} className="block">
                <div className="h-64 overflow-hidden">
                  <img
                    src={product.images[0]?.url || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4">
                <Link to={`/products/${product._id}`}>
                  <h3 className="font-semibold text-gray-800 mb-2 truncate hover:text-primary-600">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={14}
                        className={i < Math.floor(product.ratings) ? 'fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({product.numReviews})</span>
                </div>

                {/* Price */}
                <div className="mb-3">
                  {product.discountPrice ? (
                    <>
                      <span className="text-lg font-bold text-primary-600">${product.discountPrice}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">${product.price}</span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-primary-600">${product.price}</span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className="btn-primary w-full text-sm flex items-center justify-center space-x-2"
                >
                  <FiShoppingCart />
                  <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
