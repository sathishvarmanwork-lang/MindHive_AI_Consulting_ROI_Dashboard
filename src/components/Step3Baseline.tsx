import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useROIDashboard } from '../context/ROIDashboardContext';
import { CheckCircle2, TrendingDown, TrendingUp, DollarSign, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const Step3Baseline: React.FC = () => {
  const navigate = useNavigate();
  const { clientInfo, setBaselineMetrics, setTrackingStartDate, setCurrentStep } = useROIDashboard();

  const [dataLoading, setDataLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!clientInfo) {
      navigate('/setup');
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDataLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [clientInfo, navigate]);

  const baselineData = {
    ticketVolume: 2847,
    avgPerDay: 31.6,
    avgHandleTime: 47.3,
    fcrRate: 42.7,
    csat: 3.2,
    costPerTicket: 23.40,
    totalCost: 66620,
  };

  const handleStartTracking = () => {
    setBaselineMetrics({
      ticketVolume: baselineData.ticketVolume,
      avgHandleTime: baselineData.avgHandleTime,
      fcrRate: baselineData.fcrRate,
      csat: baselineData.csat,
      costPerTicket: baselineData.costPerTicket,
    });
    setTrackingStartDate(clientInfo?.startDate || '2025-09-15');
    setCurrentStep(4);
    navigate('/tracking');
  };

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-12 max-w-md text-center"
        >
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full mx-auto flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Analyzing {clientInfo?.name}'s Baseline Performance
            </h2>
            <p className="text-slate-600">
              Collecting 90 days of data (June 15 - September 14, 2025)
            </p>
          </div>

          <div className="mb-4">
            <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
              />
            </div>
            <p className="text-sm text-slate-600">
              Processing 2,847 support tickets, 450 customer interactions...
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
            {clientInfo?.name} Baseline Performance
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-slate-500">Setup</span>
            </div>
            <div className="h-px flex-1 bg-green-500"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-slate-500">Integrations</span>
            </div>
            <div className="h-px flex-1 bg-slate-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">3</div>
              <span className="font-medium text-slate-700">Baseline</span>
            </div>
          </div>

          <div className="bg-blue-600 text-white rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-2">Pre-Implementation Snapshot</h2>
            <p className="text-blue-100">June 15 - September 14, 2025 (90 days before AI)</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">Daily Avg</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-1">{baselineData.ticketVolume}</h3>
            <p className="text-sm text-slate-600 mb-3">Support Tickets (90 days)</p>
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs text-slate-600">Average: <span className="font-semibold">{baselineData.avgPerDay} tickets/day</span></p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Slow</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-1">{baselineData.avgHandleTime} min</h3>
            <p className="text-sm text-slate-600 mb-3">Average Handle Time</p>
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs text-slate-600">20% under 30min, 45% 30-60min, 35% over 60min</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Low</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-1">{baselineData.fcrRate}%</h3>
            <p className="text-sm text-slate-600 mb-3">First Contact Resolution</p>
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs text-slate-600">Industry avg: <span className="font-semibold">68%</span></p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-1">{baselineData.csat} / 5.0</h3>
            <p className="text-sm text-slate-600 mb-3">Customer Satisfaction (CSAT)</p>
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs text-slate-600">23% Very Satisfied, 34% Satisfied, 43% Dissatisfied</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-1">${baselineData.costPerTicket}</h3>
            <p className="text-sm text-slate-600 mb-3">Cost per Ticket</p>
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs text-slate-600">Total baseline cost: <span className="font-semibold">${baselineData.totalCost.toLocaleString()}</span></p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-6"
          >
            <div className="mb-4">
              <CheckCircle2 className="w-12 h-12 mb-2" />
            </div>
            <h3 className="text-xl font-bold mb-2">Baseline Established ✓</h3>
            <p className="text-sm text-blue-100">Ready to track AI impact</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h3 className="text-xl font-bold text-slate-800 mb-4">AI Implementation Tracking</h3>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                <p className="text-sm font-semibold text-green-700 mb-2">✓ AI Go-Live Confirmed</p>
                <p className="text-xs text-green-600">Implementation start: {clientInfo?.startDate}</p>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-blue-700 mb-2">First ROI Report Ready</p>
                <p className="text-xs text-blue-600">December 15, 2025 (90 days post-launch)</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="font-semibold text-slate-800 mb-3">What Happens Next:</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                We'll continue monitoring your Zendesk data automatically
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                Every day, we'll compare current performance vs baseline
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                Weekly email updates will show improvement trends
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                Quarterly reports will calculate total financial impact
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <button
            onClick={handleStartTracking}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Start Tracking Impact →
          </button>
        </motion.div>
      </div>
    </div>
  );
};
