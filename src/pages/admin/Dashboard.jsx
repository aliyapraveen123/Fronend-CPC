import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { FiUsers, FiShoppingBag, FiPackage, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

/**
 * Admin Dashboard
 * Display analytics and key metrics
 */
const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await api.get('/admin/analytics');
      setAnalytics(data.analytics);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex space-x-3">
            <Link to="/admin/products" className="btn-outline">
              Manage Products
            </Link>
            <Link to="/admin/orders" className="btn-outline">
              Manage Orders
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-primary-600">
                  ₹{analytics?.totalRevenue?.toFixed(2) || 0}
                </p>
              </div>
              <FiDollarSign className="text-primary-600" size={40} />
            </div>
            <p className="text-green-600 text-sm mt-2 flex items-center">
              <FiTrendingUp className="mr-1" /> From {analytics?.totalOrders || 0} orders
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Orders</p>
                <p className="text-3xl font-bold">{analytics?.totalOrders || 0}</p>
              </div>
              <FiPackage className="text-blue-600" size={40} />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Users</p>
                <p className="text-3xl font-bold">{analytics?.totalUsers || 0}</p>
              </div>
              <FiUsers className="text-green-600" size={40} />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Products</p>
                <p className="text-3xl font-bold">{analytics?.totalProducts || 0}</p>
              </div>
              <FiShoppingBag className="text-purple-600" size={40} />
            </div>
          </div>
        </div>

        {/* Orders by Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Orders by Status</h2>
            <div className="space-y-3">
              {analytics?.ordersByStatus?.map((item) => (
                <div key={item._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold">{item._id}</span>
                  <span className="text-2xl font-bold text-primary-600">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
            <div className="space-y-3">
              {analytics?.topProducts?.slice(0, 5).map((item, index) => (
                <div key={item._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-gray-400">#{index + 1}</span>
                    <div>
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="text-sm text-gray-600">{item.totalSold} sold</p>
                    </div>
                  </div>
                  <span className="font-bold text-primary-600">₹{item.revenue.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {analytics?.recentOrders?.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{order._id.slice(-8)}</td>
                    <td className="px-4 py-3 text-sm">{order.user?.name}</td>
                    <td className="px-4 py-3 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-sm font-semibold">₹{order.totalAmount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.orderStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
