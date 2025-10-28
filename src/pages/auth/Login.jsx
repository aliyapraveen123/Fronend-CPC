import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, clearError } from '../../redux/slices/authSlice';
import { FaGoogle, FaFacebook, FaApple, FaGithub } from 'react-icons/fa';
import toast from 'react-hot-toast';

/**
 * Login Page
 * User authentication
 */
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Mock Google Login Handler
  const handleMockGoogleLogin = () => {
    // Simulate Google OAuth by creating a demo user
    const mockGoogleUser = {
      _id: 'google_' + Date.now(),
      name: 'Demo Google User',
      email: 'demo.google@gmail.com',
      role: 'user',
      avatar: 'https://lh3.googleusercontent.com/a/default-user'
    };
    
    const mockToken = 'mock_google_token_' + Date.now();
    
    // Store in localStorage
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockGoogleUser));
    
    // Update Redux state
    dispatch({ type: 'auth/setCredentials', payload: { user: mockGoogleUser, token: mockToken } });
    
    toast.success('Logged in with Google (Demo Mode)');
    navigate('/');
  };

  // Mock Social Login Handler
  const handleMockSocialLogin = (provider) => {
    const mockUsers = {
      facebook: {
        name: 'Demo Facebook User',
        email: 'demo.facebook@fb.com',
        avatar: 'https://graph.facebook.com/v2.12/me/picture'
      },
      apple: {
        name: 'Demo Apple User',
        email: 'demo.apple@icloud.com',
        avatar: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png'
      },
      github: {
        name: 'Demo GitHub User',
        email: 'demo.github@github.com',
        avatar: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
      }
    };

    const userData = mockUsers[provider];
    const mockUser = {
      _id: `${provider}_` + Date.now(),
      ...userData,
      role: 'user'
    };
    
    const mockToken = `mock_${provider}_token_` + Date.now();
    
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    dispatch({ type: 'auth/setCredentials', payload: { user: mockUser, token: mockToken } });
    
    toast.success(`Logged in with ${provider.charAt(0).toUpperCase() + provider.slice(1)} (Demo Mode)`);
    navigate('/');
  };

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
    dispatch(login(formData));
  };

  return (
    <div className="py-16 bg-gray-50 min-h-screen flex items-center">
      <div className="container-custom">
        <div className="max-w-md mx-auto">
          <div className="card p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Login</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
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

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
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
                <span className="font-medium text-gray-700">Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleMockSocialLogin('facebook')}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-md group"
              >
                <FaFacebook className="text-blue-600 text-xl group-hover:scale-110 transition-transform" />
                <span className="font-medium text-gray-700">Continue with Facebook</span>
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
                Don't have an account?{' '}
                <Link to="/register" className="text-primary-600 font-semibold hover:underline">
                  Register
                </Link>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-semibold text-blue-800 mb-2">Demo Credentials:</p>
              <p className="text-sm text-blue-700">Admin: admin@ecommerce.com / Admin@123</p>
              <p className="text-sm text-blue-700">User: user@example.com / User@123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
