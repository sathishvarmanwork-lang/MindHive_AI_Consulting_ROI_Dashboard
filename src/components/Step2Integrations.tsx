import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useROIDashboard } from '../context/ROIDashboardContext';
import { CheckCircle2, Loader, Shield, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntegrationOption {
  id: string;
  name: string;
  logo: string;
  description: string;
  metricsCount: number;
  recommended?: boolean;
}

const INTEGRATIONS: Record<string, IntegrationOption[]> = {
  customer_service: [
    {
      id: 'zendesk',
      name: 'Zendesk',
      logo: '🎫',
      description: 'Customer support ticket data, resolution times, CSAT scores',
      metricsCount: 5,
      recommended: true,
    },
    {
      id: 'intercom',
      name: 'Intercom',
      logo: '💬',
      description: 'Live chat metrics, response times, customer conversations',
      metricsCount: 4,
    },
    {
      id: 'hubspot',
      name: 'HubSpot Service Hub',
      logo: '🧡',
      description: 'Customer service pipeline, ticket analytics',
      metricsCount: 3,
    },
    {
      id: 'analytics',
      name: 'Google Analytics',
      logo: '📊',
      description: 'Website traffic and user behavior data',
      metricsCount: 2,
    },
  ],
  sales: [
    {
      id: 'salesforce',
      name: 'Salesforce',
      logo: '☁️',
      description: 'CRM data, pipeline metrics, deal tracking',
      metricsCount: 5,
      recommended: true,
    },
  ],
  marketing: [
    {
      id: 'hubspot_marketing',
      name: 'HubSpot Marketing',
      logo: '🧡',
      description: 'Campaign performance, lead generation, email metrics',
      metricsCount: 5,
      recommended: true,
    },
  ],
};

export const Step2Integrations: React.FC = () => {
  const navigate = useNavigate();
  const { clientInfo, addIntegration, updateIntegration, integrations, setCurrentStep } = useROIDashboard();

  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);
  const [showOAuthModal, setShowOAuthModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<IntegrationOption | null>(null);
  const [syncProgress, setSyncProgress] = useState(0);

  useEffect(() => {
    if (!clientInfo) {
      navigate('/setup');
    }
  }, [clientInfo, navigate]);

  const availableIntegrations = clientInfo?.useCase
    ? INTEGRATIONS[clientInfo.useCase] || []
    : [];

  const handleConnect = (platform: IntegrationOption) => {
    setSelectedPlatform(platform);
    setShowOAuthModal(true);
  };

  const handleAuthorize = async () => {
    if (!selectedPlatform) return;

    setShowOAuthModal(false);
    setConnectingPlatform(selectedPlatform.id);

    setTimeout(() => {
      addIntegration({
        platform: selectedPlatform.name,
        status: 'connecting',
        metricsAvailable: selectedPlatform.metricsCount,
        syncProgress: 0,
      });

      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          updateIntegration(selectedPlatform.name, {
            status: 'connected',
            syncProgress: 100,
          });
          setConnectingPlatform(null);
        } else {
          updateIntegration(selectedPlatform.name, {
            syncProgress: Math.floor(progress),
          });
          setSyncProgress(Math.floor(progress));
        }
      }, 500);
    }, 3000);
  };

  const connectedIntegration = integrations.find(int => int.status === 'connected');
  const canProceed = connectedIntegration && connectedIntegration.syncProgress >= 30;

  const handleProceed = () => {
    setCurrentStep(3);
    setTimeout(() => {
      navigate('/baseline');
    }, 1500);
  };

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
              Connect {clientInfo?.name}'s Business Systems
            </h1>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-slate-500">Client Setup</span>
            </div>
            <div className="h-px flex-1 bg-slate-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">2</div>
              <span className="font-medium text-slate-700">Integrations</span>
            </div>
            <div className="h-px flex-1 bg-slate-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-500 flex items-center justify-center font-semibold">3</div>
              <span className="text-slate-500">Reports</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
            <p className="text-blue-800">
              We'll pull baseline metrics automatically. You only need to connect once.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          {availableIntegrations.map((integration) => {
            const connected = integrations.find(int => int.platform === integration.name);
            const isConnecting = connectingPlatform === integration.id;

            return (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`bg-white rounded-xl shadow-lg p-6 border-2 ${
                  connected?.status === 'connected'
                    ? 'border-green-500'
                    : 'border-transparent'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{integration.logo}</span>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{integration.name}</h3>
                      {integration.recommended && (
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded mt-1">
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                  </div>
                  {connected?.status === 'connected' && (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm font-semibold">Connected</span>
                    </div>
                  )}
                </div>

                <p className="text-slate-600 text-sm mb-4">{integration.description}</p>

                <div className="bg-slate-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-slate-700">
                    Metrics covered: <span className="font-semibold">{integration.metricsCount} of 5 ✓</span>
                  </p>
                </div>

                {!connected && !isConnecting && (
                  <button
                    onClick={() => handleConnect(integration)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Connect with {integration.name}
                  </button>
                )}

                {isConnecting && (
                  <div className="flex items-center justify-center gap-2 text-blue-600 py-3">
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Connecting...</span>
                  </div>
                )}

                {connected && (
                  <div>
                    {connected.syncProgress < 100 ? (
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-600">Syncing historical data...</span>
                          <span className="font-semibold text-blue-600">{connected.syncProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${connected.syncProgress}%` }}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          Importing 2,847 support tickets from June-September 2025
                        </p>
                      </div>
                    ) : (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-700 font-medium">
                          ✓ Baseline data sync complete
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {canProceed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <button
              onClick={handleProceed}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all"
            >
              Build Baseline Dashboard →
            </button>
            <p className="text-sm text-slate-600 mt-3">Data sources configured. Building your baseline...</p>
          </motion.div>
        )}

        <AnimatePresence>
          {showOAuthModal && selectedPlatform && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setShowOAuthModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
              >
                <div className="text-center mb-6">
                  <span className="text-5xl mb-4 block">{selectedPlatform.logo}</span>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    Authorize Mindhive to Access {selectedPlatform.name}
                  </h3>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Permissions Required:
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                      Read ticket data (historical and ongoing)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                      Read agent performance metrics
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                      Read customer satisfaction scores
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                  <p className="text-xs text-blue-800">
                    🔒 Mindhive has read-only access. We cannot modify your {selectedPlatform.name} data.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowOAuthModal(false)}
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAuthorize}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Authorize Access
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
