import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { 
  ShieldCheckIcon, 
  BoltIcon, 
  ChartBarIcon, 
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  CodeBracketIcon,
  StarIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const Landing = () => {
  const features = [
    {
      icon: <DevicePhoneMobileIcon className="h-8 w-8" />,
      title: 'Multi-Channel Delivery',
      description: 'Send OTPs via WhatsApp, SMS, and Email with intelligent fallback routing.'
    },
    {
      icon: <BoltIcon className="h-8 w-8" />,
      title: 'Lightning Fast',
      description: 'Global delivery network ensures OTPs reach users in seconds, not minutes.'
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and compliance with global security standards.'
    },
    {
      icon: <ChartBarIcon className="h-8 w-8" />,
      title: 'Real-time Analytics',
      description: 'Track delivery rates, conversion metrics, and user engagement in real-time.'
    },
    {
      icon: <CodeBracketIcon className="h-8 w-8" />,
      title: 'Developer Friendly',
      description: 'RESTful APIs, webhooks, and SDKs for seamless integration with your apps.'
    },
    {
      icon: <EnvelopeIcon className="h-8 w-8" />,
      title: 'Custom Templates',
      description: 'Create branded message templates with dynamic variables and personalization.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Templates',
      description: 'Design your OTP message templates with custom branding and variables.'
    },
    {
      number: '02',
      title: 'Integrate API',
      description: 'Use our simple REST API to send OTPs from your application backend.'
    },
    {
      number: '03',
      title: 'Monitor & Scale',
      description: 'Track delivery performance and scale effortlessly as your business grows.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CTO at TechFlow',
      content: 'OTPFlow reduced our authentication flow complexity by 80%. The WhatsApp integration is game-changing.',
      avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      name: 'Ahmed Al-Rashid',
      role: 'Lead Developer at FinanceCore',
      content: 'Best OTP service we\'ve used. 99.9% delivery rate and excellent customer support.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Product Manager at ShopEasy',
      content: 'The template system and analytics dashboard helped us improve user conversion by 35%.',
      avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    }
  ];

  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for testing and small projects',
      features: ['1,000 OTPs/month', 'Email & SMS delivery', 'Basic templates', 'Standard support']
    },
    {
      name: 'Professional',
      price: '$29',
      description: 'Best for growing businesses',
      features: ['50,000 OTPs/month', 'WhatsApp + Email + SMS', 'Advanced templates', 'Priority support', 'Analytics dashboard'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large scale applications',
      features: ['Unlimited OTPs', 'All channels', 'Custom integrations', 'Dedicated support', 'SLA guarantee']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BoltIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">OTPFlow</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#docs" className="text-gray-600 hover:text-gray-900 transition-colors">Docs</a>
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Secure OTP Delivery
              <span className="text-blue-600 block">Made Simple</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Send one-time passwords via WhatsApp, Email, and SMS with our reliable, scalable API. 
              Perfect for authentication, verification, and secure transactions.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/register">
                <Button size="lg" className="px-8">Start Free Trial</Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8">View Live Demo</Button>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm text-gray-500 mt-4"
            >
              No credit card required • 1,000 free OTPs monthly
            </motion.p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Get started with OTPFlow in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-lg text-gray-600">Powerful features to enhance your authentication flow</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section id="docs" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Built for Developers</h2>
              <p className="text-lg text-gray-600 mb-8">
                Simple REST API, comprehensive documentation, and SDKs for popular programming languages. 
                Get started in minutes, not hours.
              </p>
              <ul className="space-y-4 mb-8">
                {['RESTful API with OpenAPI spec', 'Webhooks for real-time events', 'SDKs for Node.js, Python, PHP', 'Comprehensive documentation'].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/dashboard/api">
                <Button variant="outline">View API Docs</Button>
              </Link>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 text-green-400 font-mono text-sm overflow-x-auto">
              <div className="text-gray-500 mb-2">// Send OTP via WhatsApp</div>
              <div className="text-blue-400">curl</div> <span className="text-white">-X POST \</span><br/>
              <span className="text-white">  https://api.otpflow.com/v1/send \</span><br/>
              <span className="text-white">  -H </span><span className="text-yellow-300">"Authorization: Bearer YOUR_API_KEY"</span> \<br/>
              <span className="text-white">  -H </span><span className="text-yellow-300">"Content-Type: application/json"</span> \<br/>
              <span className="text-white">  -d </span><span className="text-yellow-300">'{"{"}</span><br/>
              <span className="text-white">    </span><span className="text-yellow-300">"to": "+966501234567",</span><br/>
              <span className="text-white">    </span><span className="text-yellow-300">"channel": "whatsapp",</span><br/>
              <span className="text-white">    </span><span className="text-yellow-300">"template_id": "welcome_otp",</span><br/>
              <span className="text-white">    </span><span className="text-yellow-300">"variables": {"{"}</span><br/>
              <span className="text-white">      </span><span className="text-yellow-300">"name": "Ahmed",</span><br/>
              <span className="text-white">      </span><span className="text-yellow-300">"code": "123456"</span><br/>
              <span className="text-white">    </span><span className="text-yellow-300">{"}"}</span><br/>
              <span className="text-white">  </span><span className="text-yellow-300">{"}"}'</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Developers</h2>
            <p className="text-lg text-gray-600">See what our customers are saying</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600">Choose the perfect plan for your needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-sm border-2 p-8 ${
                  plan.popular ? 'border-blue-500 relative' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">Most Popular</span>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {plan.price}
                  {plan.price !== 'Free' && plan.price !== 'Custom' && <span className="text-lg text-gray-500">/month</span>}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register">
                  <Button 
                    variant={plan.popular ? 'primary' : 'outline'} 
                    className="w-full"
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/pricing" className="text-blue-600 hover:text-blue-700 font-medium">
              View detailed pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers who trust OTPFlow for their authentication needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/support/help">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BoltIcon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">OTPFlow</span>
              </div>
              <p className="text-gray-400">
                Secure, reliable OTP delivery for modern applications.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/support/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/support/ticket" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 OTPFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;