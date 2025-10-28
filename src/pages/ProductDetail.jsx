import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, addReview } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { FaStar } from 'react-icons/fa';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import toast from 'react-hot-toast';

/**
 * Product Detail Page
 * Shows product details, reviews, and related products
 */
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProduct: product, loading } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!product) return;
    const cartItem = {
      product: product._id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images[0]?.url || '/placeholder.jpg',
      quantity,
    };
    dispatch(addToCart(cartItem));
    toast.success('Added to cart');
  };

  const handleBuyNow = () => {
    if (!product) return;
    const cartItem = {
      product: product._id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images[0]?.url || '/placeholder.jpg',
      quantity,
    };
    dispatch(addToCart(cartItem));
    navigate('/checkout');
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to wishlist');
      navigate('/login');
      return;
    }

    const isInWishlist = wishlistItems.some(item => item._id === product._id);

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

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to add a review');
      return;
    }
    dispatch(addReview({ productId: id, review: reviewData }))
      .unwrap()
      .then(() => {
        toast.success('Review added successfully');
        setShowReviewForm(false);
        setReviewData({ rating: 5, comment: '' });
      })
      .catch((error) => toast.error(error));
  };

  if (loading || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-gray-50">
      <div className="container-custom">
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div>
            <div className="card overflow-hidden mb-4">
              <img
                src={product.images[selectedImage]?.url || '/placeholder.jpg'}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'border-primary-600' : 'border-gray-300'
                  }`}
                >
                  <img src={img.url} alt={`${product.name} ${index + 1}`} className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.category}</p>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.floor(product.ratings) ? 'fill-current' : 'text-gray-300'} />
                ))}
              </div>
              <span className="ml-2 text-gray-600">({product.numReviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              {product.discountPrice ? (
                <>
                  <span className="text-3xl font-bold text-primary-600">₹{product.discountPrice}</span>
                  <span className="text-xl text-gray-500 line-through ml-3">₹{product.price}</span>
                  <span className="ml-3 text-red-500 font-semibold">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-primary-600">₹{product.price}</span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="mb-6">
                <label className="block font-semibold mb-2">Quantity</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col space-y-3">
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 btn-secondary flex items-center justify-center space-x-2"
                >
                  <FiShoppingCart />
                  <span>Add to Cart</span>
                </button>
                <button 
                  onClick={handleWishlistToggle}
                  className={`p-3 border rounded-lg transition-all duration-300 hover:scale-110 ${
                    wishlistItems.some(item => item._id === product._id)
                      ? 'bg-red-50 border-red-500 text-red-500' 
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <FiHeart 
                    size={24} 
                    className={wishlistItems.some(item => item._id === product._id) ? 'fill-current' : ''} 
                  />
                </button>
              </div>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="w-full btn-primary py-3"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            {isAuthenticated && (
              <button onClick={() => setShowReviewForm(!showReviewForm)} className="btn-outline">
                Write a Review
              </button>
            )}
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <form onSubmit={handleSubmitReview} className="mb-8 p-4 bg-gray-50 rounded-lg">
              <div className="mb-4">
                <label className="block font-semibold mb-2">Rating</label>
                <select
                  value={reviewData.rating}
                  onChange={(e) => setReviewData({ ...reviewData, rating: Number(e.target.value) })}
                  className="input-field"
                >
                  {[5, 4, 3, 2, 1].map((num) => (
                    <option key={num} value={num}>
                      {num} Star{num > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Comment</label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  required
                  rows="4"
                  className="input-field"
                  placeholder="Share your experience with this product..."
                />
              </div>
              <button type="submit" className="btn-primary">
                Submit Review
              </button>
            </form>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review._id} className="border-b pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} size={16} className={i < review.rating ? 'fill-current' : 'text-gray-300'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center py-8">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
