import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import { 
  ChartBarIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const AdminUsage = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('volume');

  const dateRangeOptions = [
    { id: '1d', name: 'Last 24 hours' },
    { id: '7d', name: 'Last 7 days' },
    { id: '30d', name: 'Last 30 days' },
    { id: '90d', name: 'Last 90 days' }
  ];

  const metricOptions = [
    { id: 'volume', name: 'Message Volume' },
    { id: 'revenue', name: 'Revenue' },
    { id: 'success', name: 'Success Rate' },
    { id: 'users', name: 'Active Users' }
  ];

  const topUsers = [
    { name: 'Ahmed Al-Rashid', email: 'ahmed@techcorp.sa', otps: 12456, revenue: '$623.80' },
    { name: 'Sarah Johnson', email: 'sarah@startup.com', otps: 8923, revenue: '$446.15' },
    { name: 'Mohammed Hassan', email: 'mohammed@enterprise.co', otps: 7834, revenue: '$391.70' },
    { name: 'Lisa Chen', email: 'lisa@devteam.io', otps: 6745, revenue: '$337.25' },
    { name: 'Omar Khalil', email: 'omar@fintech.ae', otps: 5632, revenue: '$281.60' }
  ];

  const channelStats = [
    { channel: 'WhatsApp', count: 45678, percentage: 52, color: 'text-green-600 bg-green-100' },
    { channel: 'Email', count: 28934, percentage: 33, color: 'text-blue-600 bg-blue-100' },
    { channel: 'SMS', count: 13245, percentage: 15, color: 'text-purple-600 bg-purple-100' }
  ];

  const recentActivity = [
    { time: '2 min ago', user: 'Ahmed Al-Rashid', action: 'Sent 50 WhatsApp OTPs', status: 'success' },
    { time: '5 min ago', user: 'Sarah Johnson', action: 'API key created', status: 'success' },
    { time: '8 min ago', user: 'Mohammed Hassan', action: 'Template updated', status: 'success' },
    { time: '12 min ago', user: 'Lisa Chen', action: 'Failed SMS delivery', status: 'error' },
    { time: '15 min ago', user: 'Omar Khalil', action: 'Plan upgraded to Pro', status: 'success' }
  ];

  const handleExport = () => {
    console.log('Exporting usage data...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <ChartBarIcon className="h-8 w-8 mr-3 text-red-600" />
            Usage Analytics
          </h1>
          <p className="text-gray-600">Monitor platform usage and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {dateRangeOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <Button variant="outline" onClick={handleExport}>
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total OTPs', value: '87,857', change: '+12%', color: 'text-blue-600' },
          { label: 'Revenue', value: '$4,392.85', change: '+18%', color: 'text-green-600' },
          { label: 'Success Rate', value: '99.2%', change: '+0.3%', color: 'text-green-600' },
          { label: 'Active Users', value: '1,247', change: '+8%', color: 'text-purple-600' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <span className={`text-sm font-medium ${stat.color}`}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Usage Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Usage Trends</h3>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {metricOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Usage chart will be displayed here</p>
              <p className="text-sm text-gray-400 mt-1">Real-time analytics coming soon</p>
            </div>
          </div>
        </motion.div>

        {/* Channel Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Channel Distribution</h3>
          <div className="space-y-4">
            {channelStats.map((channel, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {channel.channel === 'WhatsApp' && <DevicePhoneMobileIcon className="h-5 w-5 text-green-600" />}
                  {channel.channel === 'Email' && <EnvelopeIcon className="h-5 w-5 text-blue-600" />}
                  {channel.channel === 'SMS' && <DevicePhoneMobileIcon className="h-5 w-5 text-purple-600" />}
                  <span className="font-medium text-gray-900">{channel.channel}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">{channel.count.toLocaleString()}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${channel.color}`}>
                    {channel.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Users and Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Users by Volume</h3>
          <div className="space-y-4">
            {topUsers.map((user, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-700">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.otps.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{user.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex-shrink-0 mt-1">
                  {activity.status === 'success' ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircleIcon className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">by {activity.user}</p>
                </div>
                <div className="flex-shrink-0">
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* System Health */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">System Health</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900">API Status</h4>
            <p className="text-sm text-green-600">Operational</p>
            <p className="text-xs text-gray-500 mt-1">99.9% uptime</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CalendarIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900">Response Time</h4>
            <p className="text-sm text-blue-600">142ms</p>
            <p className="text-xs text-gray-500 mt-1">Average</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ChartBarIcon className="h-8 w-8 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900">Queue Status</h4>
            <p className="text-sm text-purple-600">23 pending</p>
            <p className="text-xs text-gray-500 mt-1">Processing</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminUsage;