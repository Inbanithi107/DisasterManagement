import React from 'react'
import { 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle, 
  Bell, 
  X,
  Shield,
  Users,
  Zap
} from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'

export default function Alerts() {
  const { state, dispatch } = useDashboard()
  const { alertLevel, evacuationMode } = state

  const alertConfigs = {
    safe: {
      title: 'All Clear',
      description: 'No seismic activity detected. Normal operations continue.',
      icon: CheckCircle,
      color: 'success',
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200',
      textColor: 'text-success-800',
      iconColor: 'text-success-600',
    },
    warning: {
      title: 'Seismic Warning',
      description: 'P-wave activity detected. Prepare for potential earthquake. Monitor patient closely.',
      icon: AlertTriangle,
      color: 'warning',
      bgColor: 'bg-warning-50',
      borderColor: 'border-warning-200',
      textColor: 'text-warning-800',
      iconColor: 'text-warning-600',
    },
    critical: {
      title: 'Earthquake Alert',
      description: 'Strong seismic activity detected! Activate emergency protocols immediately.',
      icon: AlertCircle,
      color: 'danger',
      bgColor: 'bg-danger-50',
      borderColor: 'border-danger-200',
      textColor: 'text-danger-800',
      iconColor: 'text-danger-600',
    },
  }

  const currentAlert = alertConfigs[alertLevel]
  const IconComponent = currentAlert.icon

  const emergencyActions = [
    {
      title: 'Secure Patient',
      description: 'Ensure patient is safely positioned and dialysis is paused if necessary',
      icon: Users,
      priority: 'high',
    },
    {
      title: 'Activate Stabilizers',
      description: 'Engage vibration dampers and earthquake stabilization systems',
      icon: Shield,
      priority: 'high',
    },
    {
      title: 'Monitor Vitals',
      description: 'Continuously monitor patient vitals and adjust treatment as needed',
      icon: Zap,
      priority: 'medium',
    },
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-danger-600 bg-danger-100'
      case 'medium':
        return 'text-warning-600 bg-warning-100'
      default:
        return 'text-slate-600 bg-slate-100'
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-danger-100 rounded-lg">
            <Bell className="w-5 h-5 text-danger-600" />
          </div>
          <div>
            <h3 className="card-title">Earthquake Alert System</h3>
            <p className="text-sm text-slate-600">Real-time seismic monitoring and alerts</p>
          </div>
        </div>
        <button
          onClick={() => dispatch({ type: 'TOGGLE_EVACUATION_MODE' })}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            evacuationMode 
              ? 'bg-danger-100 text-danger-800 hover:bg-danger-200' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {evacuationMode ? 'Exit Evacuation' : 'Evacuation Mode'}
        </button>
      </div>

      {/* Main Alert Banner */}
      <div className={`alert-banner ${currentAlert.bgColor} ${currentAlert.borderColor} ${currentAlert.textColor} mb-6`}>
        <div className="flex items-start gap-3">
          <IconComponent className={`w-6 h-6 ${currentAlert.iconColor} mt-0.5 ${
            alertLevel === 'critical' ? 'animate-pulse' : ''
          }`} />
          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-1">{currentAlert.title}</h4>
            <p className="text-sm opacity-90">{currentAlert.description}</p>
          </div>
        </div>
      </div>

      {/* Emergency Actions */}
      {alertLevel !== 'safe' && (
        <div className="mb-6">
          <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-slate-600" />
            Emergency Actions Required
          </h4>
          <div className="space-y-3">
            {emergencyActions.map((action, index) => {
              const ActionIcon = action.icon
              return (
                <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className={`p-1.5 rounded-lg ${getPriorityColor(action.priority)}`}>
                    <ActionIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-slate-900 text-sm">{action.title}</h5>
                    <p className="text-xs text-slate-600 mt-1">{action.description}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(action.priority)}`}>
                    {action.priority}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Evacuation Mode */}
      {evacuationMode && (
        <div className="p-4 bg-gradient-to-r from-danger-50 to-red-50 rounded-lg border border-danger-200">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-danger-600" />
            <h4 className="font-semibold text-danger-800">Evacuation Mode Active</h4>
          </div>
          <div className="space-y-2 text-sm text-danger-700">
            <p>• Patient evacuation protocols are now active</p>
            <p>• Follow established evacuation routes</p>
            <p>• Maintain patient safety during transport</p>
            <p>• Contact emergency services if needed</p>
          </div>
        </div>
      )}

      {/* Alert History */}
      <div className="mt-6">
        <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <Bell className="w-4 h-4 text-slate-600" />
          Recent Alerts
        </h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded text-sm">
            <span className="text-slate-600">System startup completed</span>
            <span className="text-slate-500">2 minutes ago</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded text-sm">
            <span className="text-slate-600">All systems operational</span>
            <span className="text-slate-500">5 minutes ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}
