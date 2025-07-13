import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { 
  CreditCardIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface Plan {
  id: string;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  limits: {
    otpsPerMonth: number;
    channels: string[];
    support: string;
  };
  isActive: boolean;
  subscriberCount: number;
  revenue: number;
}

const AdminPlans = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const plans: Plan[] = [
    {
      id: '1',
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      features: ['1,000 OTPs/month', 'Email & SMS delivery', 'Basic templates', 'Standard support'],
      limits: {
        otpsPerMonth: 1000,
        channels: ['email', 'sms'],
        support: 'standard'
      },
      isActive: true,
      subscriberCount: 1247,
      revenue: 0
    },
    {
      id: '2',
      name: 'Professional',
      price: { monthly: 29, yearly: 290 },
      features: ['50,000 OTPs/month', 'WhatsApp + Email + SMS', 'Advanced templates', 'Priority support', 'Analytics dashboard'],
      limits: {
        otpsPerMonth: 50000,
        channels: ['whatsapp', 'email', 'sms'],
        support: 'priority'
      },
      isActive: true,
      subscriberCount: 456,
      revenue: 13224
    },
    {
      id: '3',
      name: 'Enterprise',
      price: { monthly: 199, yearly: 1990 },
      features: ['Unlimited OTPs', 'All channels', 'Custom integrations', 'Dedicated support', 'SLA guarantee'],
      limits: {
        otpsPerMonth: -1, // -1 means unlimited
        channels: ['whatsapp', 'email', 'sms'],
        support: 'dedicated'
      },
      isActive: true,
      subscriberCount: 68,
      revenue: 13532
    }
  ];

  const [newPlan, setNewPlan] = useState<Partial<Plan>>({
    name: '',
    price: { monthly: 0, yearly: 0 },
    features: [],
    limits: {
      otpsPerMonth: 0,
      channels: [],
      support: 'standard'
    },
    isActive: true
  });

  const handleCreatePlan = () => {
    console.log('Creating plan:', newPlan);
    setShowCreateModal(false);
    setNewPlan({
      name: '',
      price: { monthly: 0, yearly: 0 },
      features: [],
      limits: {
        otpsPerMonth: 0,
        channels: [],
        support: 'standard'
      },
      isActive: true
    });
  };

  const handleEditPlan = (plan: Plan) => {
    setEditingPlan(plan);
    setShowCreateModal(true);
  };

  const handleDeletePlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowDeleteModal(true);
  };

  const executeDelete = () => {
    console.log('Deleting plan:', selectedPlan?.id);
    setShowDeleteModal(false);
    setSelectedPlan(null);
  };

  const togglePlanStatus = (planId: string) => {
    console.log('Toggling plan status:', planId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <CreditCardIcon className="h-8 w-8 mr-3 text-red-600" />
            Plan Management
          </h1>
          <p className="text-gray-600">Manage subscription plans and pricing</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Plan
        </Button>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$26,756', change: '+18%', color: 'text-green-600' },
          { label: 'Active Plans', value: '3', change: '0', color: 'text-blue-600' },
          { label: 'Total Subscribers', value: '1,771', change: '+12%', color: 'text-purple-600' },
          { label: 'Avg. Revenue/User', value: '$15.10', change: '+5%', color: 'text-orange-600' }
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

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  plan.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {plan.isActive ? 'Active' : 'Inactive'}
                </span>
                <button
                  onClick={() => handleEditPlan(plan)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeletePlan(plan)}
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                ${plan.price.monthly}
                <span className="text-lg text-gray-500 font-normal">/month</span>
              </div>
              {plan.price.yearly > 0 && (
                <p className="text-sm text-gray-600">
                  ${plan.price.yearly}/year (save ${(plan.price.monthly * 12) - plan.price.yearly})
                </p>
              )}
            </div>

            <div className="space-y-3 mb-6">
              {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center space-x-2">
                  <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Subscribers</p>
                  <p className="font-semibold text-gray-900">{plan.subscriberCount}</p>
                </div>
                <div>
                  <p className="text-gray-600">Revenue</p>
                  <p className="font-semibold text-gray-900">${plan.revenue.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => togglePlanStatus(plan.id)}
                className="flex-1"
              >
                {plan.isActive ? 'Deactivate' : 'Activate'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditPlan(plan)}
                className="flex-1"
              >
                Edit Plan
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create/Edit Plan Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingPlan ? 'Edit Plan' : 'Create New Plan'}
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingPlan(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <Input
                label="Plan Name"
                value={editingPlan?.name || newPlan.name || ''}
                onChange={(e) => editingPlan 
                  ? setEditingPlan({...editingPlan, name: e.target.value})
                  : setNewPlan({...newPlan, name: e.target.value})
                }
                placeholder="e.g., Professional"
                required
              />

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Monthly Price ($)"
                  type="number"
                  value={editingPlan?.price.monthly || newPlan.price?.monthly || 0}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    if (editingPlan) {
                      setEditingPlan({...editingPlan, price: {...editingPlan.price, monthly: value}});
                    } else {
                      setNewPlan({...newPlan, price: {...(newPlan.price || {monthly: 0, yearly: 0}), monthly: value}});
                    }
                  }}
                  required
                />
                <Input
                  label="Yearly Price ($)"
                  type="number"
                  value={editingPlan?.price.yearly || newPlan.price?.yearly || 0}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    if (editingPlan) {
                      setEditingPlan({...editingPlan, price: {...editingPlan.price, yearly: value}});
                    } else {
                      setNewPlan({...newPlan, price: {...(newPlan.price || {monthly: 0, yearly: 0}), yearly: value}});
                    }
                  }}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OTPs per Month
                </label>
                <select
                  value={editingPlan?.limits.otpsPerMonth || newPlan.limits?.otpsPerMonth || 0}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (editingPlan) {
                      setEditingPlan({...editingPlan, limits: {...editingPlan.limits, otpsPerMonth: value}});
                    } else {
                      setNewPlan({...newPlan, limits: {...(newPlan.limits || {otpsPerMonth: 0, channels: [], support: 'standard'}), otpsPerMonth: value}});
                    }
                  }}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value={1000}>1,000</option>
                  <option value={10000}>10,000</option>
                  <option value={50000}>50,000</option>
                  <option value={100000}>100,000</option>
                  <option value={-1}>Unlimited</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Channels
                </label>
                <div className="space-y-2">
                  {['email', 'sms', 'whatsapp'].map((channel) => (
                    <label key={channel} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={(editingPlan?.limits.channels || newPlan.limits?.channels || []).includes(channel)}
                        onChange={(e) => {
                          const currentChannels = editingPlan?.limits.channels || newPlan.limits?.channels || [];
                          const newChannels = e.target.checked
                            ? [...currentChannels, channel]
                            : currentChannels.filter(c => c !== channel);
                          
                          if (editingPlan) {
                            setEditingPlan({...editingPlan, limits: {...editingPlan.limits, channels: newChannels}});
                          } else {
                            setNewPlan({...newPlan, limits: {...(newPlan.limits || {otpsPerMonth: 0, channels: [], support: 'standard'}), channels: newChannels}});
                          }
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 capitalize">{channel}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Support Level
                </label>
                <select
                  value={editingPlan?.limits.support || newPlan.limits?.support || 'standard'}
                  onChange={(e) => {
                    if (editingPlan) {
                      setEditingPlan({...editingPlan, limits: {...editingPlan.limits, support: e.target.value}});
                    } else {
                      setNewPlan({...newPlan, limits: {...(newPlan.limits || {otpsPerMonth: 0, channels: [], support: 'standard'}), support: e.target.value}});
                    }
                  }}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="standard">Standard Support</option>
                  <option value="priority">Priority Support</option>
                  <option value="dedicated">Dedicated Support</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingPlan(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleCreatePlan}>
                {editingPlan ? 'Update Plan' : 'Create Plan'}
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Delete Plan</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete the "{selectedPlan.name}" plan? 
                This action cannot be undone.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800">
                  <strong>Warning:</strong> {selectedPlan.subscriberCount} users are currently subscribed to this plan.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={executeDelete}>
                Delete Plan
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminPlans;