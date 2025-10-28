import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register, clearError, setCredentials } from '../../redux/slices/authSlice';
import { FaGoogle, FaFacebook, FaApple, FaGithub } from 'react-icons/fa';
import toast from 'react-hot-toast';

/**
 * Register Page
 * User registration
 */
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [isAuthenticated, error, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    const { confirmPassword, ...userData } = formData;
    dispatch(register(userData));
  };

  // Mock Google Login Handler
  const handleMockGoogleLogin = () => {
    const mockUser = {
      name: 'Demo Google User',
      email: 'demo.google@gmail.com',
      id: 'google_' + Date.now(),
      provider: 'google'
    };
    const mockToken = 'mock_token_google_' + Date.now();
    
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    dispatch(setCredentials({ user: mockUser, token: mockToken }));
    toast.success('Successfully signed in with Google (Demo)');
    navigate('/');
  };

  // Mock Social Login Handler for other providers
  const handleMockSocialLogin = (provider) => {
    const providerNames = {
      facebook: 'Facebook',
      apple: 'Apple',
      github: 'GitHub'
    };

    const mockUser = {
      name: `Demo ${providerNames[provider]} User`,
      email: `demo.${provider}@example.com`,
      id: `${provider}_` + Date.now(),
      provider: provider
    };
    const mockToken = `mock_token_${provider}_` + Date.now();
    
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    dispatch(setCredentials({ user: mockUser, token: mockToken }));
    toast.success(`Successfully signed in with ${providerNames[provider]} (Demo)`);
    navigate('/');
  };

  return (
    <div className="py-16 bg-gray-50 min-h-screen flex items-center">
      <div className="container-custom">
        <div className="max-w-md mx-auto">
          <div className="card p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Creating account...' : 'Register'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleMockGoogleLogin}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-md group"
              >
                <FaGoogle className="text-red-500 text-xl group-hover:scale-110 transition-transform" />
                <span className="font-medium text-gray-700">Sign up with Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleMockSocialLogin('facebook')}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-md group"
              >
                <FaFacebook className="text-blue-600 text-xl group-hover:scale-110 transition-transform" />
                <span className="font-medium text-gray-700">Sign up with Facebook</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleMockSocialLogin('apple')}
                  className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-md group"
                >
                  <FaApple className="text-gray-800 text-xl group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-gray-700">Apple</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleMockSocialLogin('github')}
                  className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-md group"
                >
                  <FaGithub className="text-gray-800 text-xl group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-gray-700">GitHub</span>
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-600 font-semibold hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
