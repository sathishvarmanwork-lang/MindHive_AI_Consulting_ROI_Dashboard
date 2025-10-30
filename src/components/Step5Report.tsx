import React, { useState } from 'react';
import { useROIDashboard } from '../context/ROIDashboardContext';
import { DollarSign, TrendingUp, TrendingDown, Mail, Link2, Download, Share2, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Step5Report: React.FC = () => {
  const { clientInfo, baselineMetrics, financialImpact } = useROIDashboard();
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const reportData = {
    totalSavings: financialImpact?.savings || 25504,
    revenueImpact: financialImpact?.revenue || 34200,
    combinedValue: financialImpact?.combined || 59704,
    improvements: {
      ticketVolume: { before: 31.6, after: 21.3, change: -32.6, annualSavings: 33204 },
      handleTime: { before: 47.3, after: 29.8, change: -37.0, annualSavings: 27324 },
      fcr: { before: 42.7, after: 71.4, change: 67.2 },
      csat: { before: 3.2, after: 4.6, change: 43.8, retentionValue: 34200 },
    },
  };

  const handleShare = () => {
    setShareSuccess(true);
    setTimeout(() => {
      setShareSuccess(false);
      setShowShareModal(false);
    }, 2000);
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
                Q1 ROI Report for {clientInfo?.name}
              </h1>
              <p className="text-slate-600">Generated on December 15, 2025</p>
            </div>
            <button
              onClick={() => setShowShareModal(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Share with Client
            </button>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-9xl opacity-10">🎉</div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2">
                Your AI Implementation Delivered
              </h2>
              <p className="text-5xl font-black mb-4">
                ${reportData.combinedValue.toLocaleString()}
              </p>
              <p className="text-green-100 text-lg">
                in Measurable Business Value This Quarter
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm text-slate-600 mb-2">Total Cost Savings</p>
            <p className="text-3xl font-bold text-green-600">${reportData.totalSavings.toLocaleString()}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm text-slate-600 mb-2">Revenue Impact</p>
            <p className="text-3xl font-bold text-blue-600">+${reportData.revenueImpact.toLocaleString()}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-6"
          >
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <p className="text-sm text-blue-100 mb-2">Combined Value</p>
            <p className="text-3xl font-bold">${reportData.combinedValue.toLocaleString()}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Before & After Comparison</h3>

          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-slate-800">Support Ticket Volume</h4>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {reportData.improvements.ticketVolume.change}% reduction
                </span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-500 mb-2">Before AI</p>
                  <div className="bg-slate-100 rounded-lg p-4">
                    <p className="text-3xl font-bold text-slate-700">{reportData.improvements.ticketVolume.before}/day</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-2">After AI</p>
                  <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                    <p className="text-3xl font-bold text-green-600">{reportData.improvements.ticketVolume.after}/day</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Annual projection:</span> 1,419 fewer tickets = ${reportData.improvements.ticketVolume.annualSavings.toLocaleString()} annual savings
                </p>
              </div>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-slate-800">Average Handle Time</h4>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {reportData.improvements.handleTime.change}% faster
                </span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-500 mb-2">Before AI</p>
                  <div className="bg-slate-100 rounded-lg p-4">
                    <p className="text-3xl font-bold text-slate-700">{reportData.improvements.handleTime.before} min</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-2">After AI</p>
                  <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                    <p className="text-3xl font-bold text-green-600">{reportData.improvements.handleTime.after} min</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Labor savings:</span> ${reportData.improvements.handleTime.annualSavings.toLocaleString()} annual value
                </p>
              </div>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-slate-800">First Contact Resolution</h4>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  +{reportData.improvements.fcr.change}% improvement
                </span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-500 mb-2">Before AI</p>
                  <div className="bg-slate-100 rounded-lg p-4">
                    <p className="text-3xl font-bold text-slate-700">{reportData.improvements.fcr.before}%</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-2">After AI</p>
                  <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                    <p className="text-3xl font-bold text-green-600">{reportData.improvements.fcr.after}%</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-slate-800">Customer Satisfaction</h4>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  +{reportData.improvements.csat.change}% improvement
                </span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-500 mb-2">Before AI</p>
                  <div className="bg-slate-100 rounded-lg p-4">
                    <p className="text-3xl font-bold text-slate-700">{reportData.improvements.csat.before} ★</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-2">After AI</p>
                  <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                    <p className="text-3xl font-bold text-green-600">{reportData.improvements.csat.after} ★</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Retention value:</span> ${reportData.improvements.csat.retentionValue.toLocaleString()} from reduced churn
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Annual Projection</h3>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6">
            <p className="text-slate-700 mb-4">If current trends continue for 12 months:</p>
            <p className="text-4xl font-bold text-blue-700 mb-2">
              $238,816
            </p>
            <p className="text-sm text-blue-600">Total projected annual value</p>
            <p className="text-xs text-slate-500 mt-4">* Based on 90-day performance trends</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-50 rounded-xl p-6"
        >
          <h4 className="font-semibold text-slate-800 mb-4">Next Steps</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm font-semibold text-slate-700 mb-2">Q2 Report Ready</p>
              <p className="text-xs text-slate-600">March 15, 2026</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm font-semibold text-slate-700 mb-2">Tracking Continues</p>
              <p className="text-xs text-slate-600">Automatically</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm font-semibold text-slate-700 mb-2">Contract Renewal</p>
              <p className="text-xs text-slate-600">60-day reminder set</p>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {showShareModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowShareModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-8 max-w-2xl w-full"
              >
                {!shareSuccess ? (
                  <>
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">Share ROI Report</h3>

                    <div className="space-y-4 mb-6">
                      <div className="border-2 border-blue-500 rounded-xl p-6 bg-blue-50">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Mail className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-800 mb-2">Email to Client</h4>
                            <input
                              type="email"
                              placeholder="jennifer.chen@techstart.com"
                              className="w-full px-4 py-2 border border-slate-300 rounded-lg mb-3"
                            />
                            <textarea
                              rows={4}
                              placeholder="Hi Jennifer, I wanted to share your quarterly AI ROI report showing the measurable impact we've achieved together..."
                              className="w-full px-4 py-2 border border-slate-300 rounded-lg resize-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="border border-slate-200 rounded-xl p-6 hover:border-blue-300 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                            <Link2 className="w-6 h-6 text-slate-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800">Generate Shareable Link</h4>
                            <p className="text-sm text-slate-600">Create password-protected link</p>
                          </div>
                        </div>
                      </div>

                      <div className="border border-slate-200 rounded-xl p-6 hover:border-blue-300 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                            <Download className="w-6 h-6 text-slate-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800">Download PDF</h4>
                            <p className="text-sm text-slate-600">TechStart-ROI-Report-Q1-2025.pdf</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowShareModal(false)}
                        className="flex-1 px-6 py-3 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleShare}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                      >
                        Send Report
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Report Shared Successfully!</h3>
                    <p className="text-slate-600">Jennifer Chen will receive the report via email</p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
