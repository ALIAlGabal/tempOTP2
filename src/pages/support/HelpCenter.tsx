import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { 
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  CodeBracketIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: BookOpenIcon,
      color: 'text-blue-600 bg-blue-100',
      description: 'Learn the basics of OTPFlow'
    },
    {
      id: 'api',
      name: 'API Documentation',
      icon: CodeBracketIcon,
      color: 'text-green-600 bg-green-100',
      description: 'Integration guides and API reference'
    },
    {
      id: 'billing',
      name: 'Billing & Plans',
      icon: CreditCardIcon,
      color: 'text-purple-600 bg-purple-100',
      description: 'Subscription and payment information'
    },
    {
      id: 'security',
      name: 'Security',
      icon: ShieldCheckIcon,
      color: 'text-red-600 bg-red-100',
      description: 'Security features and best practices'
    }
  ];

  const articles = [
    {
      id: '1',
      title: 'Getting Started with OTPFlow',
      category: 'getting-started',
      excerpt: 'Learn how to set up your account and send your first OTP message.',
      readTime: '5 min read',
      popular: true
    },
    {
      id: '2',
      title: 'API Authentication',
      category: 'api',
      excerpt: 'How to authenticate your API requests using API keys.',
      readTime: '3 min read',
      popular: true
    },
    {
      id: '3',
      title: 'Creating Message Templates',
      category: 'getting-started',
      excerpt: 'Design custom message templates with dynamic variables.',
      readTime: '4 min read',
      popular: false
    },
    {
      id: '4',
      title: 'WhatsApp Business API Setup',
      category: 'api',
      excerpt: 'Configure WhatsApp Business API for message delivery.',
      readTime: '8 min read',
      popular: true
    },
    {
      id: '5',
      title: 'Understanding Pricing',
      category: 'billing',
      excerpt: 'Learn about our pricing structure and billing cycles.',
      readTime: '3 min read',
      popular: false
    },
    {
      id: '6',
      title: 'Two-Factor Authentication',
      category: 'security',
      excerpt: 'Enable 2FA to secure your OTPFlow account.',
      readTime: '2 min read',
      popular: false
    },
    {
      id: '7',
      title: 'Webhook Configuration',
      category: 'api',
      excerpt: 'Set up webhooks to receive delivery notifications.',
      readTime: '6 min read',
      popular: false
    },
    {
      id: '8',
      title: 'Rate Limits and Best Practices',
      category: 'api',
      excerpt: 'Understand API rate limits and optimization techniques.',
      readTime: '5 min read',
      popular: true
    }
  ];

  const faqs = [
    {
      question: 'How do I get started with OTPFlow?',
      answer: 'Sign up for a free account, create your first template, and start sending OTPs using our API or dashboard.'
    },
    {
      question: 'What channels does OTPFlow support?',
      answer: 'We support WhatsApp Business API, SMS, and Email delivery channels with intelligent fallback routing.'
    },
    {
      question: 'How much does OTPFlow cost?',
      answer: 'We offer a free tier with 1,000 OTPs per month. Paid plans start at $29/month for 50,000 OTPs.'
    },
    {
      question: 'Is my data secure with OTPFlow?',
      answer: 'Yes, we use bank-grade encryption and comply with international security standards to protect your data.'
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularArticles = articles.filter(article => article.popular);

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
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <QuestionMarkCircleIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to your questions and learn how to get the most out of OTPFlow
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <Input
              placeholder="Search for articles, guides, and FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
              className="text-lg py-4"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${category.color}`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Articles */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'All Articles' : 
                 categories.find(c => c.id === selectedCategory)?.name || 'Articles'}
              </h2>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all categories
                </button>
              )}
            </div>

            <div className="space-y-6">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                      {article.title}
                    </h3>
                    {article.popular && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{article.readTime}</span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Read article →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <BookOpenIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or browse different categories.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Popular Articles */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Articles</h3>
              <div className="space-y-3">
                {popularArticles.slice(0, 5).map((article) => (
                  <div key={article.id} className="border-b border-gray-100 pb-3 last:border-b-0">
                    <h4 className="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer mb-1">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-500">{article.readTime}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need More Help?</h3>
              <div className="space-y-3">
                <Link to="/support/ticket">
                  <Button variant="outline" className="w-full justify-start">
                    <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </Link>
                <Link to="/support/status">
                  <Button variant="outline" className="w-full justify-start">
                    <ShieldCheckIcon className="h-4 w-4 mr-2" />
                    System Status
                  </Button>
                </Link>
                <Link to="/dashboard/api">
                  <Button variant="outline" className="w-full justify-start">
                    <CodeBracketIcon className="h-4 w-4 mr-2" />
                    API Documentation
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-xs text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;