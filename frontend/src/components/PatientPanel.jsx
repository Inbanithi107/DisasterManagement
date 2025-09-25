import React from 'react'
import { Heart, Droplets, Activity, Zap, AlertCircle, CheckCircle } from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'

export default function PatientPanel() {
  const { state } = useDashboard()
  const { patientVitals } = state

  const vitals = [
    {
      label: 'Heart Rate',
      value: `${patientVitals.heartRate} BPM`,
      icon: Heart,
      color: 'text-danger-600',
      bgColor: 'bg-danger-100',
      status: patientVitals.heartRate > 100 ? 'high' : patientVitals.heartRate < 60 ? 'low' : 'normal',
    },
    {
      label: 'Blood Pressure',
      value: `${patientVitals.bloodPressure.systolic}/${patientVitals.bloodPressure.diastolic}`,
      icon: Activity,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
      status: patientVitals.bloodPressure.systolic > 140 ? 'high' : 'normal',
    },
    {
      label: 'SPO₂',
      value: `${patientVitals.spo2}%`,
      icon: Droplets,
      color: 'text-success-600',
      bgColor: 'bg-success-100',
      status: patientVitals.spo2 < 95 ? 'low' : 'normal',
    },
    {
      label: 'Potassium',
      value: `${patientVitals.potassium} mEq/L`,
      icon: Zap,
      color: 'text-warning-600',
      bgColor: 'bg-warning-100',
      status: patientVitals.potassium > 5.0 ? 'high' : patientVitals.potassium < 3.5 ? 'low' : 'normal',
    },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'high':
      case 'low':
        return <AlertCircle className="w-4 h-4 text-danger-500" />
      default:
        return <CheckCircle className="w-4 h-4 text-success-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'high':
      case 'low':
        return 'text-danger-600'
      default:
        return 'text-success-600'
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-success-100 rounded-lg">
            <Heart className="w-5 h-5 text-success-600" />
          </div>
          <div>
            <h3 className="card-title">Patient Vitals</h3>
            <p className="text-sm text-slate-600">Real-time patient monitoring</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-slate-600">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vitals.map((vital, index) => {
          const IconComponent = vital.icon
          return (
            <div key={index} className="metric-card">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 ${vital.bgColor} rounded-lg`}>
                  <IconComponent className={`w-4 h-4 ${vital.color}`} />
                </div>
                {getStatusIcon(vital.status)}
              </div>
              
              <div className="space-y-1">
                <p className="metric-label">{vital.label}</p>
                <p className={`metric-value ${vital.color}`}>
                  {vital.value}
                </p>
                <p className={`text-xs font-medium ${getStatusColor(vital.status)}`}>
                  {vital.status === 'normal' ? 'Normal' : 
                   vital.status === 'high' ? 'High' : 'Low'}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-slate-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-4 h-4 text-slate-600" />
          <span className="text-sm font-medium text-slate-700">Patient Status</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-success-500" />
          <span className="text-sm text-slate-600">Patient is stable and responding well to treatment</span>
        </div>
      </div>
    </div>
  )
}
