import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import { EnvelopeIcon, BoltIcon } from '@heroicons/react/24/outline';

const VerifyEmail = () => {
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  const handleResend = async () => {
    setIsResending(true);
    setResendMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResendMessage('Verification email sent successfully!');
    } catch (err) {
      setResendMessage('Failed to send email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BoltIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">OTPFlow</span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <EnvelopeIcon className="h-8 w-8 text-blue-600" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Verify your email</h2>
          <p className="text-lg text-gray-600 mb-6">
            We've sent a verification email to your inbox. Please check your email and click the verification link to activate your account.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Didn't receive the email?</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Check your spam or junk folder</li>
              <li>• Make sure you entered the correct email</li>
              <li>• Wait a few minutes for the email to arrive</li>
            </ul>
          </div>

          {resendMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`px-4 py-3 rounded-lg mb-4 ${
                resendMessage.includes('successfully') 
                  ? 'bg-green-50 border border-green-200 text-green-600'
                  : 'bg-red-50 border border-red-200 text-red-600'
              }`}
            >
              {resendMessage}
            </motion.div>
          )}
          
          <div className="space-y-4">
            <Button 
              onClick={handleResend} 
              isLoading={isResending}
              variant="outline" 
              className="w-full"
            >
              Resend Verification Email
            </Button>
            <Link to="/login">
              <Button className="w-full">
                Back to Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;