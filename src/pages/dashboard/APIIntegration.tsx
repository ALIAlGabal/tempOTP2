import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import { 
  CodeBracketIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  KeyIcon,
  GlobeAltIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const APIIntegration = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('curl');
  const [copiedCode, setCopiedCode] = useState('');

  const codeExamples = {
    curl: `curl -X POST https://api.otpflow.com/v1/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+966501234567",
    "channel": "whatsapp",
    "template_id": "login_otp",
    "variables": {
      "name": "Ahmed",
      "code": "123456"
    }
  }'`,
    nodejs: `const axios = require('axios');

const response = await axios.post('https://api.otpflow.com/v1/send', {
  to: '+966501234567',
  channel: 'whatsapp',
  template_id: 'login_otp',
  variables: {
    name: 'Ahmed',
    code: '123456'
  }
}, {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

console.log(response.data);`,
    python: `import requests

url = "https://api.otpflow.com/v1/send"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "to": "+966501234567",
    "channel": "whatsapp",
    "template_id": "login_otp",
    "variables": {
        "name": "Ahmed",
        "code": "123456"
    }
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`,
    php: `<?php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.otpflow.com/v1/send',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
  ),
  CURLOPT_POSTFIELDS => json_encode(array(
    'to' => '+966501234567',
    'channel' => 'whatsapp',
    'template_id' => 'login_otp',
    'variables' => array(
      'name' => 'Ahmed',
      'code' => '123456'
    )
  ))
));

$response = curl_exec($curl);
curl_close($curl);

echo $response;
?>`
  };

  const languages = [
    { id: 'curl', name: 'cURL' },
    { id: 'nodejs', name: 'Node.js' },
    { id: 'python', name: 'Python' },
    { id: 'php', name: 'PHP' }
  ];

  const endpoints = [
    {
      method: 'POST',
      path: '/v1/send',
      description: 'Send an OTP message',
      params: ['to', 'channel', 'template_id', 'variables']
    },
    {
      method: 'GET',
      path: '/v1/templates',
      description: 'List all templates',
      params: ['channel', 'status']
    },
    {
      method: 'GET',
      path: '/v1/logs',
      description: 'Get delivery logs',
      params: ['limit', 'offset', 'status']
    },
    {
      method: 'POST',
      path: '/v1/templates',
      description: 'Create a new template',
      params: ['name', 'channel', 'message']
    }
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">API Integration</h1>
        <p className="text-gray-600">
          Integrate OTPFlow into your application with our simple REST API
        </p>
      </div>

      {/* Quick Start */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <CodeBracketIcon className="h-6 w-6 mr-2" />
          Quick Start
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Getting Started</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Get your API key</h4>
                  <p className="text-sm text-gray-600">Generate an API key from your dashboard</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Create templates</h4>
                  <p className="text-sm text-gray-600">Design your message templates with variables</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Send OTPs</h4>
                  <p className="text-sm text-gray-600">Make API calls to send OTPs to your users</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Base URL</h4>
            <code className="text-sm text-gray-700 bg-white px-2 py-1 rounded border">
              https://api.otpflow.com
            </code>
            
            <h4 className="font-medium text-gray-900 mb-2 mt-4">Authentication</h4>
            <code className="text-sm text-gray-700 bg-white px-2 py-1 rounded border">
              Authorization: Bearer YOUR_API_KEY
            </code>
          </div>
        </div>
      </motion.div>

      {/* Code Examples */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Code Examples</h2>
        
        {/* Language Selector */}
        <div className="flex space-x-2 mb-4">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelectedLanguage(lang.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedLanguage === lang.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>

        {/* Code Block */}
        <div className="relative">
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples[selectedLanguage]}</code>
          </pre>
          <button
            onClick={() => handleCopyCode(codeExamples[selectedLanguage])}
            className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
          >
            {copiedCode === codeExamples[selectedLanguage] ? (
              <CheckIcon className="h-5 w-5 text-green-400" />
            ) : (
              <DocumentDuplicateIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </motion.div>

      {/* API Endpoints */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">API Endpoints</h2>
        
        <div className="space-y-4">
          {endpoints.map((endpoint, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  endpoint.method === 'POST' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {endpoint.method}
                </span>
                <code className="text-sm font-mono text-gray-700">{endpoint.path}</code>
              </div>
              <p className="text-gray-600 text-sm mb-2">{endpoint.description}</p>
              <div className="flex flex-wrap gap-2">
                {endpoint.params.map((param) => (
                  <span key={param} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    {param}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Rate Limits & Best Practices */}
      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ClockIcon className="h-5 w-5 mr-2" />
            Rate Limits
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Free Plan:</span>
              <span className="font-medium">100 requests/hour</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pro Plan:</span>
              <span className="font-medium">1,000 requests/hour</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Enterprise:</span>
              <span className="font-medium">Custom limits</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-800 font-medium">Rate Limit Headers</p>
                <p className="text-xs text-yellow-700 mt-1">
                  Check X-RateLimit-Remaining and X-RateLimit-Reset headers
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <GlobeAltIcon className="h-5 w-5 mr-2" />
            Webhooks
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Receive real-time notifications about delivery status
          </p>
          
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900 text-sm">Events</h4>
              <ul className="text-sm text-gray-600 space-y-1 mt-1">
                <li>• message.delivered</li>
                <li>• message.failed</li>
                <li>• message.read</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <code className="text-xs text-gray-700">
                POST /your-webhook-url<br/>
                Content-Type: application/json<br/><br/>
                {`{
  "event": "message.delivered",
  "message_id": "msg_123",
  "timestamp": "2024-01-15T10:30:00Z"
}`}
              </code>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SDKs and Libraries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">SDKs & Libraries</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Node.js SDK', status: 'Available', install: 'npm install otpflow' },
            { name: 'Python SDK', status: 'Available', install: 'pip install otpflow' },
            { name: 'PHP SDK', status: 'Coming Soon', install: 'composer require otpflow/sdk' },
            { name: 'Java SDK', status: 'Coming Soon', install: 'Maven/Gradle support' }
          ].map((sdk, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">{sdk.name}</h4>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${
                sdk.status === 'Available' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {sdk.status}
              </span>
              <p className="text-xs text-gray-600 font-mono">{sdk.install}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default APIIntegration;