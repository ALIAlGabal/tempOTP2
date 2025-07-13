import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { 
  PaperAirplaneIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const SendOTP = () => {
  const [formData, setFormData] = useState({
    recipient: '',
    channel: 'whatsapp',
    template: '',
    variables: {}
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const templates = [
    {
      id: 'login_otp',
      name: 'Login OTP',
      channel: 'whatsapp',
      message: 'Hi {{name}}, your login code is {{code}}. Valid for 5 minutes.',
      variables: ['name', 'code']
    },
    {
      id: 'registration_otp',
      name: 'Registration OTP',
      channel: 'email',
      message: 'Welcome {{name}}! Your verification code is {{code}}.',
      variables: ['name', 'code']
    },
    {
      id: 'password_reset',
      name: 'Password Reset',
      channel: 'sms',
      message: 'Your password reset code is {{code}}. Do not share this code.',
      variables: ['code']
    }
  ];

  const channels = [
    { id: 'whatsapp', name: 'WhatsApp', icon: DevicePhoneMobileIcon, color: 'text-green-600' },
    { id: 'email', name: 'Email', icon: EnvelopeIcon, color: 'text-blue-600' },
    { id: 'sms', name: 'SMS', icon: DevicePhoneMobileIcon, color: 'text-purple-600' }
  ];

  const selectedTemplate = templates.find(t => t.id === formData.template);
  const availableTemplates = templates.filter(t => t.channel === formData.channel);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          recipient: '',
          channel: 'whatsapp',
          template: '',
          variables: {}
        });
      }, 3000);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVariableChange = (variable: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      variables: {
        ...prev.variables,
        [variable]: value
      }
    }));
  };

  const generatePreview = () => {
    if (!selectedTemplate) return '';
    
    let preview = selectedTemplate.message;
    Object.entries(formData.variables).forEach(([key, value]) => {
      preview = preview.replace(new RegExp(`{{${key}}}`, 'g'), value as string || `{{${key}}}`);
    });
    return preview;
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">OTP Sent Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your OTP has been delivered to <strong>{formData.recipient}</strong> via {formData.channel}.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Message sent:</p>
            <p className="text-gray-900 font-medium">{generatePreview()}</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Send OTP</h1>
        <p className="text-gray-600">Send a one-time password manually using your templates</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

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
                    onClick={() => setFormData(prev => ({ 
                      ...prev, 
                      channel: channel.id, 
                      template: '',
                      variables: {}
                    }))}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.channel === channel.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <channel.icon className={`h-6 w-6 mx-auto mb-2 ${
                      formData.channel === channel.id ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      formData.channel === channel.id ? 'text-blue-900' : 'text-gray-700'
                    }`}>
                      {channel.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient */}
            <Input
              label="Recipient"
              value={formData.recipient}
              onChange={(e) => setFormData(prev => ({ ...prev, recipient: e.target.value }))}
              placeholder={
                formData.channel === 'email' 
                  ? 'user@example.com'
                  : formData.channel === 'whatsapp'
                  ? '+966501234567'
                  : '+966501234567'
              }
              required
            />

            {/* Template Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template
              </label>
              <select
                value={formData.template}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  template: e.target.value,
                  variables: {}
                }))}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Select a template</option>
                {availableTemplates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Template Variables */}
            {selectedTemplate && selectedTemplate.variables.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Template Variables
                </label>
                <div className="space-y-3">
                  {selectedTemplate.variables.map((variable) => (
                    <Input
                      key={variable}
                      label={variable.charAt(0).toUpperCase() + variable.slice(1)}
                      value={formData.variables[variable] || ''}
                      onChange={(e) => handleVariableChange(variable, e.target.value)}
                      placeholder={`Enter ${variable}`}
                      required
                    />
                  ))}
                </div>
              </div>
            )}

            <Button type="submit" isLoading={isLoading} className="w-full">
              <PaperAirplaneIcon className="h-5 w-5 mr-2" />
              Send OTP
            </Button>
          </form>
        </motion.div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Message Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              Message Preview
            </h3>
            {selectedTemplate ? (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-900 whitespace-pre-wrap">
                  {generatePreview()}
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-gray-500">Select a template to see preview</p>
              </div>
            )}
          </div>

          {/* Delivery Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ClockIcon className="h-5 w-5 mr-2" />
              Delivery Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Channel:</span>
                <span className="font-medium text-gray-900 capitalize">{formData.channel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expected delivery:</span>
                <span className="font-medium text-gray-900">
                  {formData.channel === 'whatsapp' ? '1-3 seconds' : 
                   formData.channel === 'email' ? '5-30 seconds' : '1-5 seconds'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cost:</span>
                <span className="font-medium text-gray-900">
                  {formData.channel === 'whatsapp' ? '$0.05' : 
                   formData.channel === 'email' ? '$0.01' : '$0.03'}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Sends */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sends</h3>
            <div className="space-y-3">
              {[
                { to: '+966501234567', channel: 'WhatsApp', status: 'delivered', time: '2 min ago' },
                { to: 'user@example.com', channel: 'Email', status: 'delivered', time: '5 min ago' },
                { to: '+966509876543', channel: 'SMS', status: 'failed', time: '8 min ago' }
              ].map((send, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{send.to}</p>
                    <p className="text-xs text-gray-500">{send.channel}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      send.status === 'delivered' 
                        ? 'text-green-600 bg-green-100'
                        : 'text-red-600 bg-red-100'
                    }`}>
                      {send.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{send.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SendOTP;