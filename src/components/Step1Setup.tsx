import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useROIDashboard } from '../context/ROIDashboardContext';
import { Building2, User, Calendar, Target, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const USE_CASES = [
  {
    id: 'customer_service',
    title: 'Customer Service Automation',
    icon: '🎧',
    description: 'Reduce ticket volume and improve response times',
  },
  {
    id: 'sales',
    title: 'Sales Process Optimization',
    icon: '📈',
    description: 'Increase conversion rates and deal velocity',
  },
  {
    id: 'marketing',
    title: 'Marketing Personalization',
    icon: '🎯',
    description: 'Improve campaign performance and engagement',
  },
  {
    id: 'finance',
    title: 'Financial Forecasting',
    icon: '📊',
    description: 'Enhance accuracy and reduce manual work',
  },
  {
    id: 'operations',
    title: 'Operations Efficiency',
    icon: '⚙️',
    description: 'Streamline workflows and reduce costs',
  },
];

const METRIC_SUGGESTIONS: Record<string, string[]> = {
  customer_service: [
    'Support Ticket Volume (monthly count)',
    'Average Handle Time (minutes per ticket)',
    'First Contact Resolution Rate (%)',
    'Customer Satisfaction Score (CSAT)',
    'Support Cost per Ticket ($)',
    'Agent Productivity (tickets per hour)',
    'Response Time (minutes)',
    'Escalation Rate (%)',
  ],
  sales: [
    'Lead Conversion Rate (%)',
    'Average Deal Size ($)',
    'Sales Cycle Length (days)',
    'Win Rate (%)',
    'Pipeline Velocity',
    'Quote-to-Close Time (days)',
  ],
  marketing: [
    'Campaign Conversion Rate (%)',
    'Cost per Acquisition ($)',
    'Email Open Rate (%)',
    'Click-Through Rate (%)',
    'Marketing Qualified Leads (MQLs)',
  ],
  finance: [
    'Forecast Accuracy (%)',
    'Processing Time (hours)',
    'Error Rate (%)',
    'Cost per Transaction ($)',
  ],
  operations: [
    'Process Cycle Time (hours)',
    'Error Rate (%)',
    'Throughput (units per day)',
    'Operating Cost ($)',
    'Resource Utilization (%)',
  ],
};

export const Step1Setup: React.FC = () => {
  const navigate = useNavigate();
  const { setClientInfo, setSelectedMetrics, setCurrentStep } = useROIDashboard();

  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    contact: '',
    useCase: '',
    startDate: '',
  });

  const [selectedMetricsList, setSelectedMetricsList] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);

  const industries = ['SaaS', 'E-commerce', 'Manufacturing', 'Healthcare', 'Financial Services'];

  const handleUseCaseSelect = (useCaseId: string) => {
    setFormData(prev => ({ ...prev, useCase: useCaseId }));
    const suggestedMetrics = METRIC_SUGGESTIONS[useCaseId] || [];
    setSelectedMetricsList(suggestedMetrics.slice(0, 5));
  };

  const toggleMetric = (metric: string) => {
    setSelectedMetricsList(prev =>
      prev.includes(metric)
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  const isFormValid = () => {
    return (
      formData.companyName &&
      formData.industry &&
      formData.contact &&
      formData.useCase &&
      formData.startDate &&
      selectedMetricsList.length >= 3
    );
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;

    const clientInfo = {
      name: formData.companyName,
      industry: formData.industry,
      contact: formData.contact,
      useCase: formData.useCase,
      startDate: formData.startDate,
    };

    setClientInfo(clientInfo);
    setSelectedMetrics(selectedMetricsList.map(name => ({ name, selected: true })));
    setCurrentStep(2);

    setTimeout(() => {
      navigate('/integrations');
    }, 2000);
  };

  const availableMetrics = formData.useCase ? METRIC_SUGGESTIONS[formData.useCase] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Marcus's Consultant Portal
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">3 Active Clients</span>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-semibold">
                M
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white mb-8">
            <h2 className="text-2xl font-bold mb-2">Track AI Impact with Zero Manual Work</h2>
            <p className="text-blue-100">Automated ROI reporting that proves your consulting value</p>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">1</div>
              <span className="font-medium text-slate-700">Client Setup</span>
            </div>
            <div className="h-px flex-1 bg-slate-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-500 flex items-center justify-center font-semibold">2</div>
              <span className="text-slate-500">Integrations</span>
            </div>
            <div className="h-px flex-1 bg-slate-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-500 flex items-center justify-center font-semibold">3</div>
              <span className="text-slate-500">Reports</span>
            </div>
          </div>
        </motion.div>

        {!showForm ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              + Add New Client
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Client Information</h3>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Building2 className="inline w-4 h-4 mr-1" />
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                  placeholder="TechStart Solutions"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Industry
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Industry</option>
                  {industries.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  Primary Contact
                </label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                  placeholder="Jennifer Chen - CEO"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  AI Implementation Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                AI Use Case Selection
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {USE_CASES.map(useCase => (
                  <motion.button
                    key={useCase.id}
                    onClick={() => handleUseCaseSelect(useCase.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      formData.useCase === useCase.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{useCase.icon}</span>
                      <div>
                        <h5 className="font-semibold text-slate-800">{useCase.title}</h5>
                        <p className="text-sm text-slate-600 mt-1">{useCase.description}</p>
                      </div>
                      {formData.useCase === useCase.id && (
                        <CheckCircle2 className="w-6 h-6 text-blue-600 ml-auto" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {formData.useCase && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-8"
              >
                <h4 className="text-lg font-semibold text-slate-800 mb-4">
                  Suggested Metrics
                  <span className="ml-2 text-sm font-normal text-slate-600">
                    ({selectedMetricsList.length} of {availableMetrics.length} selected)
                  </span>
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {availableMetrics.map(metric => (
                    <label
                      key={metric}
                      className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMetricsList.includes(metric)}
                        onChange={() => toggleMetric(metric)}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      <span className="text-sm text-slate-700">{metric}</span>
                    </label>
                  ))}
                </div>
                {selectedMetricsList.length < 3 && (
                  <p className="text-sm text-amber-600 mt-2">⚠️ Select at least 3 metrics to proceed</p>
                )}
                {selectedMetricsList.length >= 3 && selectedMetricsList.length <= 8 && (
                  <p className="text-sm text-green-600 mt-2">✓ Optimal range selected</p>
                )}
              </motion.div>
            )}

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-3 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  isFormValid()
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                Configure Data Sources
              </button>
            </div>

            {isFormValid() && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center text-sm text-green-600"
              >
                ✓ Client profile ready. Click to proceed to integrations...
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
