import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiShoppingCart, FiHeart, FiUser, FiLogOut, FiMenu, FiX, FiArrowLeft } from 'react-icons/fi';
import { MdAdminPanelSettings } from 'react-icons/md';
import { logout } from '../../redux/slices/authSlice';
import { useState } from 'react';
import toast from 'react-hot-toast';

/**
 * Navbar Component
 * Main navigation with auth, cart, and wishlist
 */
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Don't show back button on home page
  const showBackButton = location.pathname !== '/';

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 backdrop-blur-lg bg-opacity-95 transition-all duration-300 animate-fade-in-down">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Back Button */}
          {showBackButton && (
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-all duration-300 mr-4 hover:scale-110 group"
              title="Go back"
            >
              <FiArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gradient hover:scale-105 transition-transform duration-300">
            CheapoChamps
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-all duration-300 hover:-translate-y-0.5 font-medium relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 transition-all duration-300 hover:-translate-y-0.5 font-medium relative group">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/wishlist" className="relative text-gray-700 hover:text-primary-600 transition-all duration-300 hover:scale-110 group">
                  <FiHeart size={22} className="group-hover:fill-current group-hover:text-red-500 transition-all duration-300" />
                </Link>

                <Link to="/cart" className="relative text-gray-700 hover:text-primary-600 transition-all duration-300 hover:scale-110 group">
                  <FiShoppingCart size={22} className="group-hover:animate-wiggle" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-lg">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>

                {user?.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-all duration-300 hover:-translate-y-0.5 group"
                  >
                    <MdAdminPanelSettings size={22} className="group-hover:rotate-12 transition-transform duration-300" />
                    <span>Admin</span>
                  </Link>
                )}

                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-all duration-300">
                    <FiUser size={22} className="group-hover:scale-110 transition-transform duration-300" />
                    <span>{user?.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2 border border-gray-100">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center space-x-2 transition-colors duration-200"
                    >
                      <FiLogOut />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/cart" className="relative text-gray-700 hover:text-primary-600 transition-all duration-300 hover:scale-110 group">
                  <FiShoppingCart size={22} className="group-hover:animate-wiggle" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-lg">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
                <Link to="/login" className="btn-outline text-sm">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link to="/" className="block text-gray-700 hover:text-primary-600">
              Home
            </Link>
            <Link to="/products" className="block text-gray-700 hover:text-primary-600">
              Products
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/wishlist" className="block text-gray-700 hover:text-primary-600">
                  Wishlist
                </Link>
                <Link to="/cart" className="block text-gray-700 hover:text-primary-600">
                  Cart ({cartItemsCount})
                </Link>
                <Link to="/profile" className="block text-gray-700 hover:text-primary-600">
                  Profile
                </Link>
                <Link to="/orders" className="block text-gray-700 hover:text-primary-600">
                  Orders
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin/dashboard" className="block text-gray-700 hover:text-primary-600">
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-gray-700 hover:text-primary-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/cart" className="block text-gray-700 hover:text-primary-600">
                  Cart ({cartItemsCount})
                </Link>
                <Link to="/login" className="block text-gray-700 hover:text-primary-600">
                  Login
                </Link>
                <Link to="/register" className="block text-gray-700 hover:text-primary-600">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
