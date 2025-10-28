import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../redux/slices/cartSlice';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';
import toast from 'react-hot-toast';

/**
 * Cart Page
 * Display cart items with quantity controls
 */
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, itemsPrice, taxPrice, shippingPrice, totalAmount } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success('Item removed from cart');
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ product: productId, quantity: newQuantity }));
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="py-16 bg-gray-50 min-h-screen">
        <div className="container-custom text-center animate-fade-in-up">
          <FiShoppingBag className="mx-auto mb-4 text-gray-400 animate-bounce-slow" size={80} />
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <Link to="/products" className="btn-primary hover:scale-105 transition-transform duration-300">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8 text-gradient animate-fade-in-down">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div key={item.product} className={`card p-4 hover-lift animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}>
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg hover:scale-110 transition-transform duration-300" />

                  {/* Product Info */}
                  <div className="flex-1">
                    <Link to={`/products/${item.product}`} className="font-semibold text-lg hover:text-primary-600 transition-colors duration-300">
                      {item.name}
                    </Link>
                    <p className="text-gray-600">₹{item.price}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3 mt-3">
                      <button
                        onClick={() => handleQuantityChange(item.product, item.quantity - 1)}
                        className="px-3 py-1 border rounded hover:bg-primary-50 hover:border-primary-500 transition-all duration-300 hover:scale-110"
                      >
                        -
                      </button>
                      <span className="font-semibold text-primary-600">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.product, item.quantity + 1)}
                        className="px-3 py-1 border rounded hover:bg-primary-50 hover:border-primary-500 transition-all duration-300 hover:scale-110"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal & Remove */}
                  <div className="text-right">
                    <p className="font-bold text-lg mb-4 text-gradient">₹{(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => handleRemove(item.product)}
                      className="text-red-500 hover:text-red-700 transition-all duration-300 hover:scale-125 hover:rotate-12"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button onClick={() => dispatch(clearCart())} className="btn-secondary hover:scale-105 transition-transform duration-300">
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-20 animate-fade-in-up stagger-2 hover-lift">
              <h2 className="text-xl font-bold mb-4 text-gradient">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between transition-all duration-300 hover:translate-x-1">
                  <span className="text-gray-600">Items Price:</span>
                  <span className="font-semibold">₹{itemsPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between transition-all duration-300 hover:translate-x-1">
                  <span className="text-gray-600">Tax (10%):</span>
                  <span className="font-semibold">₹{taxPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between transition-all duration-300 hover:translate-x-1">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-semibold">₹{shippingPrice.toFixed(2)}</span>
                </div>
                {shippingPrice === 0 && (
                  <p className="text-green-600 text-sm animate-pulse">🎉 Free shipping on orders over ₹500!</p>
                )}
                <div className="border-t pt-3 flex justify-between text-lg animate-pulse-slow">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-gradient text-2xl">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <button onClick={handleCheckout} className="btn-primary w-full mb-3 hover:scale-105 hover:shadow-xl transition-all duration-300">
                Proceed to Checkout
              </button>

              <Link to="/products" className="btn-secondary w-full block text-center hover:scale-105 transition-transform duration-300">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
