import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import { 
  ShieldCheckIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ClockIcon,
  BoltIcon,
  GlobeAltIcon,
  ServerIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';

const SystemStatus = () => {
  const services = [
    {
      name: 'API Gateway',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '142ms',
      description: 'Core API endpoints and authentication'
    },
    {
      name: 'WhatsApp Delivery',
      status: 'operational',
      uptime: '99.95%',
      responseTime: '2.3s',
      description: 'WhatsApp Business API integration'
    },
    {
      name: 'Email Delivery',
      status: 'operational',
      uptime: '99.98%',
      responseTime: '1.8s',
      description: 'SMTP and email service providers'
    },
    {
      name: 'SMS Delivery',
      status: 'degraded',
      uptime: '98.2%',
      responseTime: '4.1s',
      description: 'Global SMS carrier network'
    },
    {
      name: 'Dashboard',
      status: 'operational',
      uptime: '99.97%',
      responseTime: '890ms',
      description: 'Web dashboard and user interface'
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '45ms',
      description: 'Primary database cluster'
    }
  ];

  const incidents = [
    {
      id: '1',
      title: 'SMS Delivery Delays in APAC Region',
      status: 'investigating',
      severity: 'minor',
      startTime: '2024-01-15 14:30 UTC',
      description: 'We are investigating reports of delayed SMS delivery in the Asia-Pacific region.',
      updates: [
        {
          time: '2024-01-15 15:15 UTC',
          message: 'We have identified the issue with one of our SMS providers and are working on a resolution.'
        },
        {
          time: '2024-01-15 14:45 UTC',
          message: 'We are investigating reports of SMS delivery delays in the APAC region.'
        }
      ]
    },
    {
      id: '2',
      title: 'Scheduled Maintenance - Database Upgrade',
      status: 'scheduled',
      severity: 'maintenance',
      startTime: '2024-01-20 02:00 UTC',
      description: 'Scheduled database maintenance to improve performance and reliability.',
      updates: [
        {
          time: '2024-01-15 10:00 UTC',
          message: 'Maintenance window scheduled for January 20th, 2:00-4:00 UTC. No service interruption expected.'
        }
      ]
    }
  ];

  const metrics = [
    {
      name: 'Overall Uptime',
      value: '99.97%',
      period: 'Last 30 days',
      icon: ShieldCheckIcon,
      color: 'text-green-600'
    },
    {
      name: 'API Response Time',
      value: '142ms',
      period: 'Average',
      icon: ClockIcon,
      color: 'text-blue-600'
    },
    {
      name: 'Messages Delivered',
      value: '2.4M',
      period: 'Last 24 hours',
      icon: GlobeAltIcon,
      color: 'text-purple-600'
    },
    {
      name: 'Success Rate',
      value: '99.2%',
      period: 'Last 7 days',
      icon: CheckCircleIcon,
      color: 'text-green-600'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'degraded':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'outage':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-100';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100';
      case 'outage':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getIncidentSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-100';
      case 'major':
        return 'text-orange-600 bg-orange-100';
      case 'minor':
        return 'text-yellow-600 bg-yellow-100';
      case 'maintenance':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getIncidentStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'text-green-600 bg-green-100';
      case 'investigating':
        return 'text-yellow-600 bg-yellow-100';
      case 'identified':
        return 'text-orange-600 bg-orange-100';
      case 'monitoring':
        return 'text-blue-600 bg-blue-100';
      case 'scheduled':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BoltIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">OTPFlow</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
              <Link to="/support/help" className="text-gray-600 hover:text-gray-900 transition-colors">Support</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-900 transition-colors">Sign in</Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheckIcon className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">System Status</h1>
          <p className="text-xl text-gray-600 mb-6">
            Real-time status and performance metrics for OTPFlow services
          </p>
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <CheckCircleIcon className="h-5 w-5" />
            <span className="font-medium">All Systems Operational</span>
          </div>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-3">
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
                <h3 className="font-medium text-gray-900">{metric.name}</h3>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-500">{metric.period}</div>
            </div>
          ))}
        </motion.div>

        {/* Services Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 mb-12"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Service Status</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {services.map((service, index) => (
              <div key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(service.status)}
                    <div>
                      <h3 className="font-medium text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className="text-gray-900 font-medium">{service.uptime}</div>
                      <div className="text-gray-500">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-900 font-medium">{service.responseTime}</div>
                      <div className="text-gray-500">Response</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Incidents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-semibold text-gray-900">Recent Incidents</h2>
          
          {incidents.map((incident, index) => (
            <div key={incident.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{incident.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getIncidentSeverityColor(incident.severity)}`}>
                      {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getIncidentStatusColor(incident.status)}`}>
                      {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{incident.description}</p>
                  <p className="text-sm text-gray-500">Started: {incident.startTime}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Updates</h4>
                <div className="space-y-3">
                  {incident.updates.map((update, updateIndex) => (
                    <div key={updateIndex} className="flex space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm text-gray-900">{update.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{update.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Subscribe to Updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-8 mt-12 text-center"
        >
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Stay Updated</h3>
          <p className="text-blue-700 mb-6">
            Subscribe to status updates and get notified about incidents and maintenance windows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button>Subscribe</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SystemStatus;