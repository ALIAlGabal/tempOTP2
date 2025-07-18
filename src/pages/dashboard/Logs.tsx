import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import MultiSelect from '../../components/ui/MultiSelect';
import DateRangePicker from '../../components/ui/DateRangePicker';
import { 
  DocumentMagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  UserIcon,
  ShieldCheckIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface LogEntry {
  id: string;
  timestamp: string;
  to: string;
  channel: 'whatsapp' | 'email' | 'sms';
  template: string;
  status: 'delivered' | 'failed' | 'pending';
  deliveryTime: string;
  errorMessage?: string;
  cost: string;
  userId?: string;
  userAgent?: string;
  ipAddress?: string;
}

interface FilterState {
  search: string;
  status: string[];
  channels: string[];
  templates: string[];
  dateRange: { start: string; end: string };
  deliveryTimeRange: string;
  costRange: string;
  userIds: string[];
}

const Logs = () => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: [],
    channels: [],
    templates: [],
    dateRange: { start: '', end: '' },
    deliveryTimeRange: 'all',
    costRange: 'all',
    userIds: []
  });

  const logs: LogEntry[] = [
    {
      id: '1',
      timestamp: '2024-01-15 14:30:25',
      to: '+966501234567',
      channel: 'whatsapp',
      template: 'Login OTP',
      status: 'delivered',
      deliveryTime: '2.3s',
      cost: '$0.05',
      userId: 'user_123',
      userAgent: 'Mozilla/5.0...',
      ipAddress: '192.168.1.1'
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:28:15',
      to: 'user@example.com',
      channel: 'email',
      template: 'Registration OTP',
      status: 'delivered',
      deliveryTime: '12.1s',
      cost: '$0.01',
      userId: 'user_456',
      userAgent: 'Chrome/120.0...',
      ipAddress: '10.0.0.1'
    },
    {
      id: '3',
      timestamp: '2024-01-15 14:25:42',
      to: '+966509876543',
      channel: 'sms',
      template: 'Password Reset',
      status: 'failed',
      deliveryTime: '-',
      errorMessage: 'Invalid phone number',
      cost: '$0.00',
      userId: 'user_789',
      userAgent: 'Safari/17.0...',
      ipAddress: '172.16.0.1'
    },
    {
      id: '4',
      timestamp: '2024-01-15 14:22:18',
      to: '+966512345678',
      channel: 'whatsapp',
      template: 'Payment Confirmation',
      status: 'pending',
      deliveryTime: '-',
      cost: '$0.05',
      userId: 'user_101',
      userAgent: 'Firefox/121.0...',
      ipAddress: '203.0.113.1'
    },
    {
      id: '5',
      timestamp: '2024-01-15 14:20:05',
      to: 'admin@company.com',
      channel: 'email',
      template: 'Admin Alert',
      status: 'delivered',
      deliveryTime: '8.7s',
      cost: '$0.01',
      userId: 'user_202',
      userAgent: 'Edge/120.0...',
      ipAddress: '198.51.100.1'
    }
  ];

  const statusOptions = [
    { id: 'delivered', name: 'Delivered', color: '#10b981' },
    { id: 'failed', name: 'Failed', color: '#ef4444' },
    { id: 'pending', name: 'Pending', color: '#f59e0b' }
  ];

  const channelOptions = [
    { id: 'whatsapp', name: 'WhatsApp', color: '#25d366' },
    { id: 'email', name: 'Email', color: '#3b82f6' },
    { id: 'sms', name: 'SMS', color: '#8b5cf6' }
  ];

  const templateOptions = [
    { id: 'login_otp', name: 'Login OTP' },
    { id: 'registration_otp', name: 'Registration OTP' },
    { id: 'password_reset', name: 'Password Reset' },
    { id: 'payment_confirmation', name: 'Payment Confirmation' },
    { id: 'admin_alert', name: 'Admin Alert' }
  ];

  const userOptions = [
    { id: 'user_123', name: 'Ahmed Al-Rashid' },
    { id: 'user_456', name: 'Sarah Johnson' },
    { id: 'user_789', name: 'Mohammed Hassan' },
    { id: 'user_101', name: 'Lisa Chen' },
    { id: 'user_202', name: 'Omar Khalil' }
  ];

  const deliveryTimeOptions = [
    { id: 'all', name: 'All Times' },
    { id: 'fast', name: '< 5 seconds' },
    { id: 'medium', name: '5-30 seconds' },
    { id: 'slow', name: '> 30 seconds' }
  ];

  const costRangeOptions = [
    { id: 'all', name: 'All Costs' },
    { id: 'free', name: 'Free ($0.00)' },
    { id: 'low', name: 'Low ($0.01-$0.03)' },
    { id: 'high', name: 'High ($0.04+)' }
  ];

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      status: [],
      channels: [],
      templates: [],
      dateRange: { start: '', end: '' },
      deliveryTimeRange: 'all',
      costRange: 'all',
      userIds: []
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.status.length > 0) count++;
    if (filters.channels.length > 0) count++;
    if (filters.templates.length > 0) count++;
    if (filters.dateRange.start || filters.dateRange.end) count++;
    if (filters.deliveryTimeRange !== 'all') count++;
    if (filters.costRange !== 'all') count++;
    if (filters.userIds.length > 0) count++;
    return count;
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.to.toLowerCase().includes(filters.search.toLowerCase()) ||
                         log.template.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status.length === 0 || filters.status.includes(log.status);
    const matchesChannel = filters.channels.length === 0 || filters.channels.includes(log.channel);
    const matchesTemplate = filters.templates.length === 0 || filters.templates.includes(log.template.toLowerCase().replace(/\s+/g, '_'));
    const matchesUser = filters.userIds.length === 0 || (log.userId && filters.userIds.includes(log.userId));
    
    return matchesSearch && matchesStatus && matchesChannel && matchesTemplate && matchesUser;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'whatsapp':
        return <DevicePhoneMobileIcon className="h-4 w-4 text-green-600" />;
      case 'email':
        return <EnvelopeIcon className="h-4 w-4 text-blue-600" />;
      case 'sms':
        return <DevicePhoneMobileIcon className="h-4 w-4 text-purple-600" />;
      default:
        return <DevicePhoneMobileIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleExport = () => {
    console.log('Exporting logs...');
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Delivery Logs</h1>
          <p className="text-gray-600">Track and monitor your OTP delivery performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="relative"
          >
            <AdjustmentsHorizontalIcon className="h-4 w-4 mr-2" />
            Advanced Filters
            {activeFilterCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Sent', value: '12,456', change: '+12%', color: 'text-blue-600' },
          { label: 'Delivered', value: '12,367', change: '+11%', color: 'text-green-600' },
          { label: 'Failed', value: '89', change: '-8%', color: 'text-red-600' },
          { label: 'Success Rate', value: '99.2%', change: '+0.5%', color: 'text-green-600' }
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

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FunnelIcon className="h-5 w-5 mr-2" />
              Advanced Filters
            </h3>
            <div className="flex items-center space-x-3">
              {activeFilterCount > 0 && (
                <Button variant="outline" size="sm" onClick={clearAllFilters}>
                  <XMarkIcon className="h-4 w-4 mr-1" />
                  Clear All ({activeFilterCount})
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowAdvancedFilters(false)}
              >
                <XMarkIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <Input
                placeholder="Search recipient, template, or message..."
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
              />
            </div>

            {/* Date Range */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <DateRangePicker
                value={filters.dateRange}
                onChange={(range) => updateFilter('dateRange', range)}
                placeholder="Select date range"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <MultiSelect
                options={statusOptions}
                value={filters.status}
                onChange={(value) => updateFilter('status', value)}
                placeholder="All statuses"
              />
            </div>

            {/* Channels */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Channels
              </label>
              <MultiSelect
                options={channelOptions}
                value={filters.channels}
                onChange={(value) => updateFilter('channels', value)}
                placeholder="All channels"
              />
            </div>

            {/* Templates */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Templates
              </label>
              <MultiSelect
                options={templateOptions}
                value={filters.templates}
                onChange={(value) => updateFilter('templates', value)}
                placeholder="All templates"
              />
            </div>

            {/* Users */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Users
              </label>
              <MultiSelect
                options={userOptions}
                value={filters.userIds}
                onChange={(value) => updateFilter('userIds', value)}
                placeholder="All users"
              />
            </div>

            {/* Delivery Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Time
              </label>
              <Select
                options={deliveryTimeOptions}
                value={filters.deliveryTimeRange}
                onChange={(value) => updateFilter('deliveryTimeRange', value)}
              />
            </div>

            {/* Cost Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cost Range
              </label>
              <Select
                options={costRangeOptions}
                value={filters.costRange}
                onChange={(value) => updateFilter('costRange', value)}
              />
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFilterCount > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="font-medium">Active filters:</span>
                <div className="flex flex-wrap gap-2">
                  {filters.search && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      Search: "{filters.search}"
                    </span>
                  )}
                  {filters.status.length > 0 && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      Status: {filters.status.length} selected
                    </span>
                  )}
                  {filters.channels.length > 0 && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                      Channels: {filters.channels.length} selected
                    </span>
                  )}
                  {(filters.dateRange.start || filters.dateRange.end) && (
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                      Date range selected
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Logs Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Channel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Template
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log, index) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 text-gray-400" />
                      <span>{log.timestamp}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="font-mono">{log.to}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      {getChannelIcon(log.channel)}
                      <span className="capitalize">{log.channel}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.template}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(log.status)}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </div>
                    {log.errorMessage && (
                      <p className="text-xs text-red-600 mt-1">{log.errorMessage}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.deliveryTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.cost}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <DocumentMagnifyingGlassIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No logs found</h3>
            <p className="text-gray-600">
              {activeFilterCount > 0
                ? 'Try adjusting your filters to see more results.'
                : 'No OTP delivery logs available for the selected time period.'}
            </p>
            {activeFilterCount > 0 && (
              <Button variant="outline" onClick={clearAllFilters} className="mt-4">
                Clear all filters
              </Button>
            )}
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      {filteredLogs.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredLogs.length}</span> of{' '}
            <span className="font-medium">{filteredLogs.length}</span> results
            {activeFilterCount > 0 && (
              <span className="text-gray-500"> (filtered from {logs.length} total)</span>
            )}
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logs;