import React from 'react'
import { 
  Users, 
  MapPin, 
  Phone, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  ArrowRight,
  Clock,
  Heart
} from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'

export default function EvacuationMode() {
  const { state } = useDashboard()
  const { evacuationMode, patientVitals } = state

  if (!evacuationMode) {
    return null
  }

  const evacuationSteps = [
    {
      step: 1,
      title: 'Secure Patient',
      description: 'Ensure patient is safely positioned and dialysis is paused',
      icon: Users,
      status: 'completed',
    },
    {
      step: 2,
      title: 'Activate Stabilizers',
      description: 'Engage vibration dampers and earthquake stabilization systems',
      icon: Shield,
      status: 'completed',
    },
    {
      step: 3,
      title: 'Prepare for Transport',
      description: 'Ready patient for evacuation with all necessary equipment',
      icon: ArrowRight,
      status: 'in-progress',
    },
    {
      step: 4,
      title: 'Contact Emergency Services',
      description: 'Notify emergency services and coordinate evacuation',
      icon: Phone,
      status: 'pending',
    },
  ]

  const emergencyContacts = [
    { name: 'Emergency Services', number: '911', priority: 'high' },
    { name: 'Hospital Emergency', number: '+1-555-0123', priority: 'high' },
    { name: 'Dialysis Center', number: '+1-555-0456', priority: 'medium' },
    { name: 'Family Contact', number: '+1-555-0789', priority: 'low' },
  ]

  const getStepStatus = (status) => {
    switch (status) {
      case 'completed':
        return {
          icon: CheckCircle,
          color: 'text-success-600',
          bgColor: 'bg-success-100',
          borderColor: 'border-success-200',
        }
      case 'in-progress':
        return {
          icon: Clock,
          color: 'text-warning-600',
          bgColor: 'bg-warning-100',
          borderColor: 'border-warning-200',
        }
      default:
        return {
          icon: AlertTriangle,
          color: 'text-slate-400',
          bgColor: 'bg-slate-100',
          borderColor: 'border-slate-200',
        }
    }
  }

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-danger-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-danger-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Emergency Evacuation Mode</h2>
                <p className="text-slate-600">Follow these steps to ensure patient safety</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-danger-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-danger-600">ACTIVE</span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Patient Status */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-slate-600" />
              <h3 className="font-semibold text-slate-900">Patient Status</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">{patientVitals.heartRate}</p>
                <p className="text-sm text-slate-600">BPM</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">{patientVitals.spo2}%</p>
                <p className="text-sm text-slate-600">SPO₂</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">
                  {patientVitals.bloodPressure.systolic}/{patientVitals.bloodPressure.diastolic}
                </p>
                <p className="text-sm text-slate-600">BP</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">{patientVitals.potassium}</p>
                <p className="text-sm text-slate-600">K+</p>
              </div>
            </div>
          </div>

          {/* Evacuation Steps */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-slate-600" />
              Evacuation Protocol
            </h3>
            <div className="space-y-4">
              {evacuationSteps.map((step, index) => {
                const statusConfig = getStepStatus(step.status)
                const StatusIcon = statusConfig.icon
                const IconComponent = step.icon
                
                return (
                  <div key={index} className={`flex items-start gap-4 p-4 rounded-lg border-2 ${statusConfig.borderColor} ${statusConfig.bgColor}`}>
                    <div className={`p-2 rounded-lg ${statusConfig.bgColor}`}>
                      <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-slate-900">Step {step.step}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(step.status === 'completed' ? 'high' : step.status === 'in-progress' ? 'medium' : 'low')}`}>
                          {step.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      <h4 className="font-medium text-slate-900 mb-1">{step.title}</h4>
                      <p className="text-sm text-slate-600">{step.description}</p>
                    </div>
                    <div className="p-2 bg-white rounded-lg">
                      <IconComponent className="w-5 h-5 text-slate-600" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-slate-600" />
              Emergency Contacts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">{contact.name}</p>
                    <p className="text-sm text-slate-600">{contact.number}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(contact.priority)}`}>
                      {contact.priority}
                    </span>
                    <button className="p-1.5 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors">
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Instructions */}
          <div className="bg-gradient-to-r from-danger-50 to-red-50 rounded-lg p-4 border border-danger-200">
            <h3 className="font-semibold text-danger-800 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-danger-600" />
              Critical Safety Instructions
            </h3>
            <ul className="space-y-2 text-sm text-danger-700">
              <li>• Maintain patient airway and breathing at all times</li>
              <li>• Keep dialysis equipment secured during transport</li>
              <li>• Monitor patient vitals continuously</li>
              <li>• Follow established evacuation routes only</li>
              <li>• Do not attempt to restart dialysis during evacuation</li>
            </ul>
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 bg-slate-50 rounded-b-xl">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Evacuation mode activated at {new Date().toLocaleTimeString()}
            </div>
            <button className="px-4 py-2 bg-danger-600 text-white rounded-lg hover:bg-danger-700 transition-colors font-medium">
              Confirm Evacuation Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
