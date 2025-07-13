import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { 
  DocumentTextIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  EyeIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface Template {
  id: string;
  name: string;
  channel: 'whatsapp' | 'email' | 'sms';
  message: string;
  variables: string[];
  isDefault: boolean;
  createdAt: string;
  lastUsed: string;
  usageCount: number;
  status: 'active' | 'draft';
}

const TemplateList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const templates: Template[] = [
    {
      id: '1',
      name: 'Login OTP',
      channel: 'whatsapp',
      message: 'Hi {{name}}, your login code is {{code}}. Valid for 5 minutes.',
      variables: ['name', 'code'],
      isDefault: true,
      createdAt: '2024-01-15',
      lastUsed: '2 hours ago',
      usageCount: 1247,
      status: 'active'
    },
    {
      id: '2',
      name: 'Registration Verification',
      channel: 'email',
      message: 'Welcome {{name}}! Your verification code is {{code}}. Please enter this code to complete your registration.',
      variables: ['name', 'code'],
      isDefault: false,
      createdAt: '2024-01-10',
      lastUsed: '1 day ago',
      usageCount: 892,
      status: 'active'
    },
    {
      id: '3',
      name: 'Password Reset',
      channel: 'sms',
      message: 'Your password reset code is {{code}}. Do not share this code with anyone.',
      variables: ['code'],
      isDefault: false,
      createdAt: '2024-01-08',
      lastUsed: '3 days ago',
      usageCount: 456,
      status: 'active'
    },
    {
      id: '4',
      name: 'Payment Confirmation',
      channel: 'whatsapp',
      message: 'Hi {{name}}, confirm your payment of {{amount}} with code {{code}}.',
      variables: ['name', 'amount', 'code'],
      isDefault: false,
      createdAt: '2024-01-05',
      lastUsed: 'Never',
      usageCount: 0,
      status: 'draft'
    }
  ];

  const channels = [
    { id: 'all', name: 'All Channels', icon: DocumentTextIcon },
    { id: 'whatsapp', name: 'WhatsApp', icon: DevicePhoneMobileIcon },
    { id: 'email', name: 'Email', icon: EnvelopeIcon },
    { id: 'sms', name: 'SMS', icon: DevicePhoneMobileIcon }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChannel = selectedChannel === 'all' || template.channel === selectedChannel;
    return matchesSearch && matchesChannel;
  });

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'whatsapp':
        return DevicePhoneMobileIcon;
      case 'email':
        return EnvelopeIcon;
      case 'sms':
        return DevicePhoneMobileIcon;
      default:
        return DocumentTextIcon;
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'whatsapp':
        return 'text-green-600 bg-green-100';
      case 'email':
        return 'text-blue-600 bg-blue-100';
      case 'sms':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setShowPreviewModal(true);
  };

  const generatePreview = (template: Template) => {
    let preview = template.message;
    template.variables.forEach(variable => {
      const sampleValue = variable === 'name' ? 'John' : 
                         variable === 'code' ? '123456' : 
                         variable === 'amount' ? '$99.99' : `{{${variable}}}`;
      preview = preview.replace(new RegExp(`{{${variable}}}`, 'g'), sampleValue);
    });
    return preview;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Message Templates</h1>
          <p className="text-gray-600">Create and manage your OTP message templates</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
            />
          </div>

          {/* Channel Filter */}
          <div className="flex gap-2">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedChannel === channel.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {channel.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-6">
        {filteredTemplates.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedChannel !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Create your first template to get started.'}
            </p>
            {!searchTerm && selectedChannel === 'all' && (
              <Button onClick={() => setShowCreateModal(true)}>
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Your First Template
              </Button>
            )}
          </div>
        ) : (
          filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${getChannelColor(template.channel)}`}>
                    {React.createElement(getChannelIcon(template.channel), { className: 'h-5 w-5' })}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                      {template.isDefault && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        template.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {template.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 capitalize">{template.channel}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePreview(template)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Preview"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  <Link
                    to={`/dashboard/templates/${template.id}`}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Edit"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </Link>
                  <button
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {template.message.length > 120 
                    ? `${template.message.substring(0, 120)}...`
                    : template.message}
                </p>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>Last used: {template.lastUsed}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircleIcon className="h-4 w-4" />
                    <span>{template.usageCount} sends</span>
                  </div>
                </div>
                <span>Created {template.createdAt}</span>
              </div>
            </motion.div>
          ))
        )}
      </div>

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
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getChannelColor(selectedTemplate.channel)}`}>
                  {selectedTemplate.channel.charAt(0).toUpperCase() + selectedTemplate.channel.slice(1)}
                </span>
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
              <Link to={`/dashboard/templates/${selectedTemplate.id}`}>
                <Button onClick={() => setShowPreviewModal(false)}>
                  Edit Template
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TemplateList;