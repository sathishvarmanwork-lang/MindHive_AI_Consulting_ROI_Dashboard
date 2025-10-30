import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ClientInfo {
  id?: string;
  name: string;
  industry: string;
  contact: string;
  useCase: string;
  startDate: string;
}

export interface SelectedMetric {
  name: string;
  selected: boolean;
}

export interface Integration {
  platform: string;
  status: 'not_connected' | 'connecting' | 'connected';
  metricsAvailable: number;
  syncProgress: number;
}

export interface BaselineMetrics {
  ticketVolume: number;
  avgHandleTime: number;
  fcrRate: number;
  csat: number;
  costPerTicket: number;
}

export interface TrackingMetrics extends BaselineMetrics {
  date: string;
}

export interface FinancialImpact {
  savings: number;
  revenue: number;
  combined: number;
}

interface ROIDashboardState {
  clientInfo: ClientInfo | null;
  selectedMetrics: SelectedMetric[];
  integrations: Integration[];
  baselineMetrics: BaselineMetrics | null;
  trackingData: TrackingMetrics[];
  financialImpact: FinancialImpact | null;
  currentStep: number;
  trackingStartDate: string | null;
}

interface ROIDashboardContextType extends ROIDashboardState {
  setClientInfo: (info: ClientInfo) => void;
  setSelectedMetrics: (metrics: SelectedMetric[]) => void;
  addIntegration: (integration: Integration) => void;
  updateIntegration: (platform: string, updates: Partial<Integration>) => void;
  setBaselineMetrics: (metrics: BaselineMetrics) => void;
  addTrackingData: (data: TrackingMetrics) => void;
  setFinancialImpact: (impact: FinancialImpact) => void;
  setCurrentStep: (step: number) => void;
  setTrackingStartDate: (date: string) => void;
  resetDashboard: () => void;
}

const ROIDashboardContext = createContext<ROIDashboardContextType | undefined>(undefined);

const initialState: ROIDashboardState = {
  clientInfo: null,
  selectedMetrics: [],
  integrations: [],
  baselineMetrics: null,
  trackingData: [],
  financialImpact: null,
  currentStep: 1,
  trackingStartDate: null,
};

export const ROIDashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ROIDashboardState>(() => {
    const saved = localStorage.getItem('roiDashboardState');
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('roiDashboardState', JSON.stringify(state));
  }, [state]);

  const setClientInfo = (info: ClientInfo) => {
    setState(prev => ({ ...prev, clientInfo: info }));
  };

  const setSelectedMetrics = (metrics: SelectedMetric[]) => {
    setState(prev => ({ ...prev, selectedMetrics: metrics }));
  };

  const addIntegration = (integration: Integration) => {
    setState(prev => ({
      ...prev,
      integrations: [...prev.integrations, integration],
    }));
  };

  const updateIntegration = (platform: string, updates: Partial<Integration>) => {
    setState(prev => ({
      ...prev,
      integrations: prev.integrations.map(int =>
        int.platform === platform ? { ...int, ...updates } : int
      ),
    }));
  };

  const setBaselineMetrics = (metrics: BaselineMetrics) => {
    setState(prev => ({ ...prev, baselineMetrics: metrics }));
  };

  const addTrackingData = (data: TrackingMetrics) => {
    setState(prev => ({
      ...prev,
      trackingData: [...prev.trackingData, data],
    }));
  };

  const setFinancialImpact = (impact: FinancialImpact) => {
    setState(prev => ({ ...prev, financialImpact: impact }));
  };

  const setCurrentStep = (step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const setTrackingStartDate = (date: string) => {
    setState(prev => ({ ...prev, trackingStartDate: date }));
  };

  const resetDashboard = () => {
    setState(initialState);
    localStorage.removeItem('roiDashboardState');
  };

  return (
    <ROIDashboardContext.Provider
      value={{
        ...state,
        setClientInfo,
        setSelectedMetrics,
        addIntegration,
        updateIntegration,
        setBaselineMetrics,
        addTrackingData,
        setFinancialImpact,
        setCurrentStep,
        setTrackingStartDate,
        resetDashboard,
      }}
    >
      {children}
    </ROIDashboardContext.Provider>
  );
};

export const useROIDashboard = () => {
  const context = useContext(ROIDashboardContext);
  if (context === undefined) {
    throw new Error('useROIDashboard must be used within a ROIDashboardProvider');
  }
  return context;
};
