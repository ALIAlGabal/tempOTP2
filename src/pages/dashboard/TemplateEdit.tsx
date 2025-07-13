import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { 
  DocumentTextIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  EyeIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface Template {
  id: string;
  name: string;
  channel: 'whatsapp' | 'email' | 'sms';
  message: string;
  variables: string[];
  isDefault: boolean;
  status: 'active' | 'draft';
}

const TemplateEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [template, setTemplate] = useState<Template>({
    id: '',
    name: '',
    channel: 'whatsapp',
    message: '',
    variables: [],
    isDefault: false,
    status: 'draft'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock data for existing template
  useEffect(() => {
    if (!isNew && id) {
      // Simulate loading existing template
      const mockTemplate: Template = {
        id: id,
        name: 'Login OTP',
        channel: 'whatsapp',
        message: 'Hi {{name}}, your login code is {{code}}. Valid for 5 minutes.',
        variables: ['name', 'code'],
        isDefault: true,
        status: 'active'
      };
      setTemplate(mockTemplate);
    }
  }, [id, isNew]);

  const channels = [
    { id: 'whatsapp', name: 'WhatsApp', icon: DevicePhoneMobileIcon, color: 'text-green-600 bg-green-100' },
    { id: 'email', name: 'Email', icon: EnvelopeIcon, color: 'text-blue-600 bg-blue-100' },
    { id: 'sms', name: 'SMS', icon: DevicePhoneMobileIcon, color: 'text-purple-600 bg-purple-100' }
  ];

  const extractVariables = (message: string): string[] => {
    const regex = /\{\{(\w+)\}\}/g;
    const variables: string[] = [];
    let match;
    while ((match = regex.exec(message)) !== null) {
      if (!variables.includes(match[1])) {
        variables.push(match[1]);
      }
    }
    return variables;
  };

  const handleMessageChange = (value: string) => {
    setTemplate(prev => ({
      ...prev,
      message: value,
      variables: extractVariables(value)
    }));
  };

  const validateTemplate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!template.name.trim()) {
      newErrors.name = 'Template name is required';
    }

    if (!template.message.trim()) {
      newErrors.message = 'Message content is required';
    }

    if (template.message.length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (status: 'draft' | 'active') => {
    if (!validateTemplate()) return;

    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTemplate(prev => ({ ...prev, status }));
      
      // Navigate back to template list
      navigate('/dashboard/templates');
    } catch (error) {
      setErrors({ general: 'Failed to save template. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const generatePreview = () => {
    let preview = template.message;
    template.variables.forEach(variable => {
      const sampleValue = variable === 'name' ? 'John' : 
                         variable === 'code' ? '123456' : 
                         variable === 'amount' ? '$99.99' : 
                         variable === 'company' ? 'Acme Corp' : `{{${variable}}}`;
      preview = preview.replace(new RegExp(`{{${variable}}}`, 'g'), sampleValue);
    });
    return preview;
  };

  const getChannelLimits = (channel: string) => {
    switch (channel) {
      case 'whatsapp':
        return { maxLength: 1000, recommended: 160 };
      case 'email':
        return { maxLength: 2000, recommended: 200 };
      case 'sms':
        return { maxLength: 160, recommended: 160 };
      default:
        return { maxLength: 1000, recommended: 160 };
    }
  };

  const limits = getChannelLimits(template.channel);
  const messageLength = template.message.length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/dashboard/templates"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isNew ? 'Create Template' : 'Edit Template'}
            </h1>
            <p className="text-gray-600">
              {isNew ? 'Design a new message template' : 'Modify your existing template'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setShowPreview(true)}
            disabled={!template.message}
          >
            <EyeIcon className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            {errors.general && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {errors.general}
              </div>
            )}

            <div className="space-y-6">
              {/* Template Name */}
              <Input
                label="Template Name"
                value={template.name}
                onChange={(e) => setTemplate(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Login OTP, Registration Code"
                error={errors.name}
                required
              />

              {/* Channel Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Delivery Channel
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {channels.map((channel) => (
                    <button
                      key={channel.id}
                      type="button"
                      onClick={() => setTemplate(prev => ({ ...prev, channel: channel.id as any }))}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        template.channel === channel.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <channel.icon className={`h-6 w-6 mx-auto mb-2 ${
                        template.channel === channel.id ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <span className={`text-sm font-medium ${
                        template.channel === channel.id ? 'text-blue-900' : 'text-gray-700'
                      }`}>
                        {channel.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Message Content
                  </label>
                  <span className={`text-xs ${
                    messageLength > limits.maxLength ? 'text-red-600' : 
                    messageLength > limits.recommended ? 'text-yellow-600' : 'text-gray-500'
                  }`}>
                    {messageLength}/{limits.maxLength}
                  </span>
                </div>
                <textarea
                  value={template.message}
                  onChange={(e) => handleMessageChange(e.target.value)}
                  placeholder="Enter your message with variables like {{name}} and {{code}}"
                  rows={6}
                  className={`block w-full rounded-lg border px-3 py-2 text-sm placeholder-gray-500 shadow-sm transition-colors duration-200 focus:outline-none focus:ring-1 ${
                    errors.message 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
                
                {/* Character limit warning */}
                {messageLength > limits.recommended && (
                  <div className={`mt-2 flex items-center space-x-2 text-xs ${
                    messageLength > limits.maxLength ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <span>
                      {messageLength > limits.maxLength 
                        ? 'Message exceeds maximum length'
                        : `Message is longer than recommended for ${template.channel}`}
                    </span>
                  </div>
                )}
              </div>

              {/* Variables */}
              {template.variables.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detected Variables
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {template.variables.map((variable) => (
                      <span
                        key={variable}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full"
                      >
                        {`{{${variable}}}`}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    These variables will be replaced with actual values when sending OTPs
                  </p>
                </div>
              )}

              {/* Template Settings */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Template Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="is-default"
                      type="checkbox"
                      checked={template.isDefault}
                      onChange={(e) => setTemplate(prev => ({ ...prev, isDefault: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="is-default" className="ml-2 block text-sm text-gray-900">
                      Set as default template for {template.channel}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Link to="/dashboard/templates">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => handleSave('draft')}
              isLoading={isSaving}
            >
              Save as Draft
            </Button>
            <Button
              onClick={() => handleSave('active')}
              isLoading={isSaving}
            >
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Save & Activate
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              Live Preview
            </h3>
            {template.message ? (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-900 text-sm whitespace-pre-wrap">
                  {generatePreview()}
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-gray-500 text-sm">Start typing to see preview</p>
              </div>
            )}
          </motion.div>

          {/* Channel Guidelines */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {template.channel.charAt(0).toUpperCase() + template.channel.slice(1)} Guidelines
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Max length:</span>
                <span className="font-medium">{limits.maxLength} chars</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Recommended:</span>
                <span className="font-medium">{limits.recommended} chars</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Variables:</span>
                <span className="font-medium">Unlimited</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">
                <strong>Tip:</strong> Keep messages concise and include clear call-to-action. 
                Use variables like {`{{name}}`} for personalization.
              </p>
            </div>
          </div>

          {/* Template Examples */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Examples</h3>
            <div className="space-y-3">
              {[
                'Hi {{name}}, your verification code is {{code}}. Valid for 5 minutes.',
                'Your {{service}} login code: {{code}}. Do not share this code.',
                'Welcome {{name}}! Complete registration with code {{code}}.'
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleMessageChange(example)}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <p className="text-xs text-gray-700">{example}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Message Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Channel
                </label>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {template.channel.charAt(0).toUpperCase() + template.channel.slice(1)}
                </span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-900 text-sm whitespace-pre-wrap">
                    {generatePreview()}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button onClick={() => setShowPreview(false)}>
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TemplateEdit;