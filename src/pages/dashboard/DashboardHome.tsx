import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import { 
  PaperAirplaneIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

const DashboardHome = () => {
  const stats = [
    {
      name: 'OTPs Sent',
      value: '12,456',
      change: '+12%',
      changeType: 'increase',
      icon: PaperAirplaneIcon
    },
    {
      name: 'Success Rate',
      value: '99.2%',
      change: '+0.5%',
      changeType: 'increase',
      icon: CheckCircleIcon
    },
    {
      name: 'Failed Deliveries',
      value: '89',
      change: '-8%',
      changeType: 'decrease',
      icon: XCircleIcon
    },
    {
      name: 'Avg. Delivery Time',
      value: '2.4s',
      change: '-0.2s',
      changeType: 'decrease',
      icon: ClockIcon
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'OTP Sent',
      channel: 'WhatsApp',
      recipient: '+966501234567',
      status: 'delivered',
      time: '2 minutes ago',
      template: 'Login OTP'
    },
    {
      id: 2,
      type: 'OTP Sent',
      channel: 'Email',
      recipient: 'user@example.com',
      status: 'delivered',
      time: '5 minutes ago',
      template: 'Registration OTP'
    },
    {
      id: 3,
      type: 'OTP Sent',
      channel: 'SMS',
      recipient: '+966509876543',
      status: 'failed',
      time: '8 minutes ago',
      template: 'Password Reset'
    },
    {
      id: 4,
      type: 'Template Created',
      channel: 'WhatsApp',
      recipient: '-',
      status: 'success',
      time: '1 hour ago',
      template: 'Welcome Message'
    }
  ];

  const quickActions = [
    {
      title: 'Send OTP',
      description: 'Send a one-time password manually',
      icon: PaperAirplaneIcon,
      href: '/dashboard/send',
      color: 'bg-blue-500'
    },
    {
      title: 'Create Template',
      description: 'Design a new message template',
      icon: DocumentTextIcon,
      href: '/dashboard/templates',
      color: 'bg-green-500'
    },
    {
      title: 'View Analytics',
      description: 'Check delivery performance',
      icon: ChartBarIcon,
      href: '/dashboard/logs',
      color: 'bg-purple-500'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'WhatsApp':
        return 'text-green-700 bg-green-50';
      case 'Email':
        return 'text-blue-700 bg-blue-50';
      case 'SMS':
        return 'text-purple-700 bg-purple-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">Welcome back! 👋</h1>
        <p className="text-blue-100 mb-4">
          Here's what's happening with your OTP delivery service today.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/dashboard/send">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Send OTP Now
            </Button>
          </Link>
          <Link to="/dashboard/api">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              View API Docs
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-8 w-8 text-gray-600" />
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.changeType === 'increase' ? (
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 mr-1" />
                      )}
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className={`flex-shrink-0 w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">{action.title}</h4>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <Link
              to="/dashboard/logs"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getChannelColor(activity.channel)}`}>
                      {activity.channel}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                    <p className="text-sm text-gray-500">
                      {activity.template} • {activity.recipient}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Usage Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Overview</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Analytics chart will be displayed here</p>
            <p className="text-sm text-gray-400 mt-1">Coming soon with real-time data</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;