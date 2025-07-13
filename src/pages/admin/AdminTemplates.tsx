import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { 
  DocumentTextIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

interface Template {
  id: string;
  name: string;
  channel: 'whatsapp' | 'email' | 'sms';
  message: string;
  variables: string[];
  createdBy: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  usageCount: number;
  reportCount: number;
}

const AdminTemplates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');

  const templates: Template[] = [
    {
      id: '1',
      name: 'Login Verification',
      channel: 'whatsapp',
      message: 'Hi {{name}}, your login code is {{code}}. Valid for 5 minutes.',
      variables: ['name', 'code'],
      createdBy: 'Ahmed Al-Rashid',
      createdAt: '2024-01-15',
      status: 'pending',
      usageCount: 0,
      reportCount: 0
    },
    {
      id: '2',
      name: 'Payment Confirmation',
      channel: 'email',
      message: 'Dear {{name}}, your payment of {{amount}} has been processed. Reference: {{ref}}',
      variables: ['name', 'amount', 'ref'],
      createdBy: 'Sarah Johnson',
      createdAt: '2024-01-14',
      status: 'approved',
      usageCount: 1247,
      reportCount: 2
    },
    {
      id: '3',
      name: 'Account Recovery',
      channel: 'sms',
      message: 'Your account recovery code: {{code}}. Do not share this code.',
      variables: ['code'],
      createdBy: 'Mohammed Hassan',
      createdAt: '2024-01-12',
      status: 'rejected',
      usageCount: 0,
      reportCount: 5
    },
    {
      id: '4',
      name: 'Welcome Message',
      channel: 'whatsapp',
      message: 'Welcome to {{company}}! Your verification code is {{code}}.',
      variables: ['company', 'code'],
      createdBy: 'Lisa Chen',
      createdAt: '2024-01-10',
      status: 'pending',
      usageCount: 0,
      reportCount: 1
    }
  ];

  const channelOptions = [
    { id: 'all', name: 'All Channels' },
    { id: 'whatsapp', name: 'WhatsApp' },
    { id: 'email', name: 'Email' },
    { id: 'sms', name: 'SMS' }
  ];

  const statusOptions = [
    { id: 'all', name: 'All Status' },
    { id: 'pending', name: 'Pending Review' },
    { id: 'approved', name: 'Approved' },
    { id: 'rejected', name: 'Rejected' }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChannel = selectedChannel === 'all' || template.channel === selectedChannel;
    const matchesStatus = selectedStatus === 'all' || template.status === selectedStatus;
    return matchesSearch && matchesChannel && matchesStatus;
  });

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'whatsapp':
        return <DevicePhoneMobileIcon className="h-4 w-4 text-green-600" />;
      case 'email':
        return <EnvelopeIcon className="h-4 w-4 text-blue-600" />;
      case 'sms':
        return <DevicePhoneMobileIcon className="h-4 w-4 text-purple-600" />;
      default:
        return <DocumentTextIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setShowPreviewModal(true);
  };

  const handleAction = (template: Template, action: 'approve' | 'reject') => {
    setSelectedTemplate(template);
    setActionType(action);
    setShowActionModal(true);
  };

  const executeAction = () => {
    console.log(`${actionType} template:`, selectedTemplate?.id);
    setShowActionModal(false);
    setSelectedTemplate(null);
  };

  const generatePreview = (template: Template) => {
    let preview = template.message;
    template.variables.forEach(variable => {
      const sampleValue = variable === 'name' ? 'John' : 
                         variable === 'code' ? '123456' : 
                         variable === 'amount' ? '$99.99' : 
                         variable === 'company' ? 'Acme Corp' :
                         variable === 'ref' ? 'TXN123456' : `{{${variable}}}`;
      preview = preview.replace(new RegExp(`{{${variable}}}`, 'g'), sampleValue);
    });
    return preview;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <DocumentTextIcon className="h-8 w-8 mr-3 text-red-600" />
            Template Moderation
          </h1>
          <p className="text-gray-600">Review and moderate user-submitted templates</p>
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
          <FunnelIcon className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Pending Review', value: '23', change: '+5', color: 'text-yellow-600' },
          { label: 'Approved', value: '156', change: '+12', color: 'text-green-600' },
          { label: 'Rejected', value: '34', change: '+3', color: 'text-red-600' },
          { label: 'Reported', value: '8', change: '+2', color: 'text-orange-600' }
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

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Templates
              </label>
              <Input
                placeholder="Search by name, content, or creator..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Channel
              </label>
              <select
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {channelOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {statusOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* Templates List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200"
      >
        <div className="divide-y divide-gray-200">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getChannelIcon(template.channel)}
                    <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(template.status)}`}>
                      {template.status.charAt(0).toUpperCase() + template.status.slice(1)}
                    </span>
                    {template.reportCount > 0 && (
                      <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
                        {template.reportCount} reports
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                    {template.message.length > 120 
                      ? `${template.message.substring(0, 120)}...`
                      : template.message}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {template.variables.map((variable) => (
                      <span
                        key={variable}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
                      >
                        {`{{${variable}}}`}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Created by {template.createdBy}</span>
                    <span>•</span>
                    <span>{template.createdAt}</span>
                    <span>•</span>
                    <span>{template.usageCount} uses</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handlePreview(template)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Preview"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  
                  {template.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleAction(template, 'approve')}
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                        title="Approve"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleAction(template, 'reject')}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Reject"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedChannel !== 'all' || selectedStatus !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'No templates have been submitted for review.'}
            </p>
          </div>
        )}
      </motion.div>

      {/* Preview Modal */}
      {showPreviewModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Template Preview</h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template Name
                </label>
                <p className="text-gray-900">{selectedTemplate.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Channel
                </label>
                <div className="flex items-center space-x-2">
                  {getChannelIcon(selectedTemplate.channel)}
                  <span className="capitalize">{selectedTemplate.channel}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message Preview
                </label>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-900 text-sm">{generatePreview(selectedTemplate)}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Variables
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.variables.map((variable) => (
                    <span
                      key={variable}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
                    >
                      {`{{${variable}}}`}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowPreviewModal(false)}>
                Close
              </Button>
              {selectedTemplate.status === 'pending' && (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowPreviewModal(false);
                      handleAction(selectedTemplate, 'reject');
                    }}
                  >
                    Reject
                  </Button>
                  <Button 
                    onClick={() => {
                      setShowPreviewModal(false);
                      handleAction(selectedTemplate, 'approve');
                    }}
                  >
                    Approve
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Action Confirmation Modal */}
      {showActionModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {actionType === 'approve' ? 'Approve Template' : 'Reject Template'}
              </h3>
              <button
                onClick={() => setShowActionModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                {actionType === 'approve' ? (
                  <CheckIcon className="h-8 w-8 text-green-600" />
                ) : (
                  <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
                )}
                <div>
                  <p className="text-gray-900 font-medium">
                    Are you sure you want to {actionType} "{selectedTemplate.name}"?
                  </p>
                  <p className="text-sm text-gray-600">Created by {selectedTemplate.createdBy}</p>
                </div>
              </div>
              
              {actionType === 'reject' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-800">
                    This template will be rejected and the user will be notified.
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowActionModal(false)}>
                Cancel
              </Button>
              <Button 
                variant={actionType === 'reject' ? 'danger' : 'primary'} 
                onClick={executeAction}
              >
                {actionType === 'approve' ? 'Approve Template' : 'Reject Template'}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminTemplates;