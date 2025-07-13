import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { 
  KeyIcon,
  PlusIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  lastUsed: string;
  createdAt: string;
  status: 'active' | 'revoked';
}

const APIKeys = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedKey, setSelectedKey] = useState<APIKey | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [copiedKey, setCopiedKey] = useState('');
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>(['send']);

  const apiKeys: APIKey[] = [
    {
      id: '1',
      name: 'Production API Key',
      key: 'otpf_live_1234567890abcdef1234567890abcdef',
      permissions: ['send', 'templates', 'logs'],
      lastUsed: '2 hours ago',
      createdAt: '2024-01-10',
      status: 'active'
    },
    {
      id: '2',
      name: 'Development Key',
      key: 'otpf_test_abcdef1234567890abcdef1234567890',
      permissions: ['send', 'templates'],
      lastUsed: '1 day ago',
      createdAt: '2024-01-08',
      status: 'active'
    },
    {
      id: '3',
      name: 'Legacy Key',
      key: 'otpf_live_fedcba0987654321fedcba0987654321',
      permissions: ['send'],
      lastUsed: 'Never',
      createdAt: '2024-01-01',
      status: 'revoked'
    }
  ];

  const permissions = [
    { id: 'send', name: 'Send OTPs', description: 'Send OTP messages via API' },
    { id: 'templates', name: 'Manage Templates', description: 'Create and modify templates' },
    { id: 'logs', name: 'View Logs', description: 'Access delivery logs and analytics' },
    { id: 'webhooks', name: 'Manage Webhooks', description: 'Configure webhook endpoints' }
  ];

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId);
    } else {
      newVisible.add(keyId);
    }
    setVisibleKeys(newVisible);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  const maskKey = (key: string) => {
    return key.substring(0, 12) + '•'.repeat(20) + key.substring(key.length - 4);
  };

  const handleCreateKey = () => {
    // Simulate API call
    console.log('Creating key:', { name: newKeyName, permissions: newKeyPermissions });
    setShowCreateModal(false);
    setNewKeyName('');
    setNewKeyPermissions(['send']);
  };

  const handleDeleteKey = () => {
    // Simulate API call
    console.log('Deleting key:', selectedKey?.id);
    setShowDeleteModal(false);
    setSelectedKey(null);
  };

  const getPermissionColor = (permission: string) => {
    const colors = {
      send: 'bg-blue-100 text-blue-800',
      templates: 'bg-green-100 text-green-800',
      logs: 'bg-purple-100 text-purple-800',
      webhooks: 'bg-orange-100 text-orange-800'
    };
    return colors[permission] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">API Keys</h1>
          <p className="text-gray-600">Manage your API keys for secure access to OTPFlow</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <PlusIcon className="h-5 w-5 mr-2" />
          Create API Key
        </Button>
      </div>

      {/* Security Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
      >
        <div className="flex items-start space-x-3">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">Security Best Practices</h3>
            <ul className="text-sm text-yellow-700 mt-1 space-y-1">
              <li>• Never share your API keys publicly or commit them to version control</li>
              <li>• Use environment variables to store API keys in your applications</li>
              <li>• Regularly rotate your API keys and revoke unused ones</li>
              <li>• Use the minimum required permissions for each key</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* API Keys List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Your API Keys</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {apiKeys.map((apiKey, index) => (
            <motion.div
              key={apiKey.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{apiKey.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      apiKey.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {apiKey.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <code className="bg-gray-100 px-3 py-2 rounded-lg text-sm font-mono">
                      {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                    </code>
                    <button
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title={visibleKeys.has(apiKey.id) ? 'Hide key' : 'Show key'}
                    >
                      {visibleKeys.has(apiKey.id) ? (
                        <EyeSlashIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => copyToClipboard(apiKey.key)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Copy to clipboard"
                    >
                      {copiedKey === apiKey.key ? (
                        <CheckIcon className="h-4 w-4 text-green-500" />
                      ) : (
                        <DocumentDuplicateIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {apiKey.permissions.map((permission) => (
                      <span
                        key={permission}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPermissionColor(permission)}`}
                      >
                        {permissions.find(p => p.id === permission)?.name || permission}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="h-4 w-4" />
                      <span>Last used: {apiKey.lastUsed}</span>
                    </div>
                    <span>Created: {apiKey.createdAt}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  {apiKey.status === 'active' && (
                    <button
                      onClick={() => {
                        setSelectedKey(apiKey);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Revoke key"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Create API Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create API Key</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Key Name"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="e.g., Production API Key"
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permissions
                </label>
                <div className="space-y-2">
                  {permissions.map((permission) => (
                    <label key={permission.id} className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={newKeyPermissions.includes(permission.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewKeyPermissions([...newKeyPermissions, permission.id]);
                          } else {
                            setNewKeyPermissions(newKeyPermissions.filter(p => p !== permission.id));
                          }
                        }}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{permission.name}</div>
                        <div className="text-xs text-gray-500">{permission.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateKey} disabled={!newKeyName || newKeyPermissions.length === 0}>
                Create Key
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedKey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Revoke API Key</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Are you sure you want to revoke the API key "{selectedKey.name}"? 
                This action cannot be undone and will immediately stop all API requests using this key.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800">
                  <strong>Warning:</strong> Applications using this key will stop working immediately.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteKey}>
                Revoke Key
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default APIKeys;