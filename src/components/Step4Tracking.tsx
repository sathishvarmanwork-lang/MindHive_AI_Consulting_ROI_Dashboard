import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useROIDashboard } from '../context/ROIDashboardContext';
import { TrendingDown, TrendingUp, Clock, Star, DollarSign, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export const Step4Tracking: React.FC = () => {
  const navigate = useNavigate();
  const { clientInfo, baselineMetrics, setFinancialImpact } = useROIDashboard();

  const currentMetrics = {
    ticketVolume: 21.3,
    avgHandleTime: 29.8,
    fcrRate: 71.4,
    csat: 4.6,
    costPerTicket: 14.70,
  };

  const improvements = {
    ticketVolume: -32.6,
    avgHandleTime: -37.0,
    fcrRate: 67.2,
    csat: 43.8,
    costPerTicket: -37.2,
  };

  const financialImpact = {
    ticketReduction: 10881,
    fasterResolution: 8247,
    totalSavings: 19128,
    projectedQuarterly: 25504,
    revenueImpact: 34200,
  };

  const handleViewReport = () => {
    setFinancialImpact({
      savings: financialImpact.projectedQuarterly,
      revenue: financialImpact.revenueImpact,
      combined: financialImpact.projectedQuarterly + financialImpact.revenueImpact,
    });
    navigate('/report');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
                Real-Time AI Impact Tracking
              </h1>
              <p className="text-slate-600">45 days since AI implementation (halfway to first quarterly report)</p>
            </div>
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
              ⚡ Live Monitoring Active
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">45-Day Impact: $19,128 Saved</h2>
                <p className="text-green-100">Projected quarterly savings: $25,504 if trends continue</p>
              </div>
              <div className="text-5xl">💰</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Support Ticket Volume</h3>
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Baseline</p>
                <p className="text-2xl font-bold text-slate-400">31.6/day</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Current</p>
                <p className="text-2xl font-bold text-green-600">{currentMetrics.ticketVolume}/day</p>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm font-semibold text-green-700 flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                {improvements.ticketVolume}% reduction
              </p>
              <p className="text-xs text-green-600 mt-1">465 fewer tickets = $10,881 saved</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Average Handle Time</h3>
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Baseline</p>
                <p className="text-2xl font-bold text-slate-400">47.3 min</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Current</p>
                <p className="text-2xl font-bold text-green-600">{currentMetrics.avgHandleTime} min</p>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm font-semibold text-green-700 flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                {improvements.avgHandleTime}% faster
              </p>
              <p className="text-xs text-green-600 mt-1">17.5 min saved per ticket = $8,247 labor savings</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">First Contact Resolution</h3>
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Baseline</p>
                <p className="text-2xl font-bold text-slate-400">{baselineMetrics?.fcrRate}%</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Current</p>
                <p className="text-2xl font-bold text-green-600">{currentMetrics.fcrRate}%</p>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm font-semibold text-green-700 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                +{improvements.fcrRate}% improvement
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Customer Satisfaction</h3>
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Baseline</p>
                <p className="text-2xl font-bold text-slate-400">{baselineMetrics?.csat} ★</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Current</p>
                <p className="text-2xl font-bold text-green-600">{currentMetrics.csat} ★</p>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm font-semibold text-green-700 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                +{improvements.csat}% improvement
              </p>
              <p className="text-xs text-green-600 mt-1">Higher satisfaction = better retention</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-xl p-8 mb-8"
        >
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <DollarSign className="w-8 h-8" />
              Financial Impact Calculator
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <p className="text-blue-100 text-sm mb-2">Cost Savings (45 days)</p>
                <p className="text-3xl font-bold">${financialImpact.totalSavings.toLocaleString()}</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <p className="text-blue-100 text-sm mb-2">Projected Quarterly</p>
                <p className="text-3xl font-bold">${financialImpact.projectedQuarterly.toLocaleString()}</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <p className="text-blue-100 text-sm mb-2">Revenue Impact</p>
                <p className="text-3xl font-bold">+${financialImpact.revenueImpact.toLocaleString()}</p>
                <p className="text-xs text-blue-100 mt-1">From improved retention</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h3 className="text-xl font-bold text-slate-800 mb-4">Weekly Email Summary</h3>
          <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-500 mb-1">From: Marcus's Mindhive Portal</p>
                <p className="font-bold text-slate-800 mb-2">
                  Subject: TechStart AI Impact Update: 37% Cost Reduction This Week
                </p>
                <p className="text-sm text-slate-600 mb-4">
                  Your AI implementation continues delivering results. This week's highlights:
                </p>
                <ul className="space-y-2 text-sm text-slate-600 mb-4">
                  <li>• Ticket volume down 32.6% vs baseline</li>
                  <li>• Resolution time improved 37%</li>
                  <li>• Customer satisfaction up to 4.6 stars</li>
                  <li>• Total savings on track: $19,128 in 45 days</li>
                </ul>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                  View Full Dashboard
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
            <p className="text-blue-800 font-semibold mb-2">
              🎉 Your first quarterly ROI report is being generated
            </p>
            <p className="text-sm text-blue-600">
              90-day tracking complete. Ready to share measurable results with your client.
            </p>
          </div>
          <button
            onClick={handleViewReport}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            View Q1 ROI Report →
          </button>
        </motion.div>
      </div>
    </div>
  );
};
