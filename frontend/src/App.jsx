import React from 'react';
import { DashboardProvider } from './context/DashboardContext';
import SeismicWaves from './components/SeismicWaves';
import PatientPanel from './components/PatientPanel';
import Alerts from './components/Alerts';
import CameraFeed1 from './components/CameraFeed1';
import CameraFeed2 from './components/CameraFeed2';
import CameraFeed3 from './components/CameraFeed3';
import CameraFeed4 from './components/CameraFeed4';
import DeviceStatus from './components/DeviceStatus';
import EvacuationMode from './components/EvacuationMode';
import { Activity, Shield, Heart, Cpu } from 'lucide-react';

function App() {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Shield className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    Earthquake Stabilised Dialysis Dashboard
                  </h1>
                  <p className="text-sm text-slate-600">
                    Real-time monitoring for patient safety during seismic events
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-success-100 text-success-800 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                  System Online
                </div>
                <div className="text-sm text-slate-500">
                  {new Date().toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success-100 rounded-lg">
                  <Activity className="w-5 h-5 text-success-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Seismic Status</p>
                  <p className="text-lg font-semibold text-slate-900">Normal</p>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Heart className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Patient Status</p>
                  <p className="text-lg font-semibold text-slate-900">Stable</p>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success-100 rounded-lg">
                  <Cpu className="w-5 h-5 text-success-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Equipment</p>
                  <p className="text-lg font-semibold text-slate-900">Operational</p>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-warning-100 rounded-lg">
                  <Shield className="w-5 h-5 text-warning-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Alert Level</p>
                  <p className="text-lg font-semibold text-slate-900">Safe</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <SeismicWaves />
              <PatientPanel />
              {/* Camera Feeds */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CameraFeed1 />
                <CameraFeed2 />
                <CameraFeed3 />
                <CameraFeed4 />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <Alerts />
              <DeviceStatus />
            </div>
          </div>
        </main>

        {/* Evacuation Mode Modal */}
        <EvacuationMode />

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Shield className="w-4 h-4" />
                <span>Earthquake Stabilised Dialysis System v1.0</span>
              </div>
              <div className="text-sm text-slate-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </DashboardProvider>
  );
}

export default App;