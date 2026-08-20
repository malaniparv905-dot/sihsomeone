import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ReportModal from './components/ReportModal';
import NewAssessmentModal from './components/NewAssessmentModal';
import ResetModal from './components/ResetModal';
import Toast from './components/Toast';

import DashboardPage from './pages/DashboardPage';
import CdWastePage from './pages/CdWastePage';
import EvBatteryPage from './pages/EvBatteryPage';
import AssessmentsPage from './pages/AssessmentsPage';
import RecoveryInsightsPage from './pages/RecoveryInsightsPage';
import AnalyticsPage from './pages/AnalyticsPage';

const LOCAL_STORAGE_KEY = 'rerecover_ai_saved_assessments_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Single Source of Truth Local Assessment Store (Starts EMPTY)
  const [assessments, setAssessments] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [selectedReportAssessment, setSelectedReportAssessment] = useState(null);
  const [isNewAssessmentModalOpen, setIsNewAssessmentModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Sync assessments to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(assessments));
    } catch (e) {
      console.error('Failed to sync to localStorage:', e);
    }
  }, [assessments]);

  // Add new assessment record dynamically with auto-generated ID (RA-001, RA-002, etc.)
  const handleSaveAssessment = (recordData) => {
    const nextNum = assessments.length + 1;
    const generatedId = `RA-${String(nextNum).padStart(3, '0')}`;
    
    const newRecord = {
      ...recordData,
      id: generatedId,
      date: newRecordDate()
    };

    setAssessments(prev => [newRecord, ...prev]);
    showToast(`Assessment ${generatedId} saved successfully.`, 'success');
    return newRecord;
  };

  const newRecordDate = () => {
    const now = new Date();
    const YYYY = now.getFullYear();
    const MM = String(now.getMonth() + 1).padStart(2, '0');
    const DD = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    return `${YYYY}-${MM}-${DD} ${hh}:${mm}`;
  };

  // Reset all prototype data to initial empty state
  const handleResetPrototypeData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setAssessments([]);
    setSelectedReportAssessment(null);
    showToast('All prototype data reset to initial empty state.', 'info');
  };

  // Render active tab page
  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardPage
            assessments={assessments}
            onSelectAssessment={(item) => setSelectedReportAssessment(item)}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        );

      case 'cd-waste':
        return (
          <CdWastePage
            onSaveAssessment={handleSaveAssessment}
            onViewReport={(recordData) => {
              const saved = handleSaveAssessment(recordData);
              setSelectedReportAssessment(saved);
            }}
            showToast={showToast}
          />
        );

      case 'ev-batteries':
        return (
          <EvBatteryPage
            onSaveAssessment={handleSaveAssessment}
            onViewReport={(recordData) => {
              const saved = handleSaveAssessment(recordData);
              setSelectedReportAssessment(saved);
            }}
            showToast={showToast}
          />
        );

      case 'assessments':
        return (
          <AssessmentsPage
            assessments={assessments}
            onSelectAssessment={(item) => setSelectedReportAssessment(item)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        );

      case 'insights':
        return (
          <RecoveryInsightsPage
            assessments={assessments}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        );

      case 'analytics':
        return (
          <AnalyticsPage
            assessments={assessments}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        );

      default:
        return (
          <DashboardPage
            assessments={assessments}
            onSelectAssessment={(item) => setSelectedReportAssessment(item)}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950">
      
      {/* Top Main Navbar */}
      <Navbar
        onOpenNewAssessment={() => setIsNewAssessmentModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenResetModal={() => setIsResetModalOpen(true)}
      />

      {/* Main Body Layout */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 gap-6">
        
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          assessmentCount={assessments.length}
        />

        {/* Main Content View Container */}
        <main className="flex-1 min-w-0">
          {renderCurrentTab()}
        </main>

      </div>

      {/* Footer Credentials */}
      <footer className="border-t border-slate-800/80 py-4 px-6 bg-slate-950 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-white">RE:RECOVER AI</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Smart India Hackathon 2026</span>
            <span className="text-slate-600">•</span>
            <span className="font-mono text-teal-400">Problem Statement S15</span>
            <span className="text-slate-600">•</span>
            <span className="font-mono text-slate-400">Prototype • Demonstration Data</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsResetModalOpen(true)}
              className="text-[11px] font-mono text-slate-400 hover:text-amber-400 transition cursor-pointer underline"
            >
              Reset Prototype Data
            </button>
            <span className="text-slate-600">•</span>
            <span className="text-[11px] font-mono text-slate-400">
              Team Catalyst — Clean & Green Tech
            </span>
          </div>
        </div>
      </footer>

      {/* Modals & Toasts */}
      {selectedReportAssessment && (
        <ReportModal
          assessment={selectedReportAssessment}
          onClose={() => setSelectedReportAssessment(null)}
        />
      )}

      <NewAssessmentModal
        isOpen={isNewAssessmentModalOpen}
        onClose={() => setIsNewAssessmentModalOpen(false)}
        onSelectCategory={(categoryTab) => setActiveTab(categoryTab)}
      />

      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetPrototypeData}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

    </div>
  );
}
