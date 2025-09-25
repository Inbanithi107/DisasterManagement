import React from 'react'
import { 
  Cpu, 
  Battery, 
  Shield, 
  Wifi, 
  WifiOff, 
  CheckCircle, 
  AlertTriangle,
  XCircle,
  Activity
} from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'
export default function DeviceStatus() {
  const { state } = useDashboard()
  const { deviceStatus } = state
  const devices = [
    {
      name: 'Dialysis Machine',
      status: deviceStatus.dialysisMachine,
      icon: Cpu,
      description: 'Main dialysis unit',
      color: deviceStatus.dialysisMachine === 'connected' ? 'success' : 'danger',
    },
    {
      name: 'Backup Battery',
      status: deviceStatus.backupBattery > 20 ? 'connected' : 'low',
      icon: Battery,
      description: `${deviceStatus.backupBattery.toFixed(0)}% remaining`,
      color: deviceStatus.backupBattery > 50 ? 'success' : 
             deviceStatus.backupBattery > 20 ? 'warning' : 'danger',
    },
    {
      name: 'Network Connection',
      status: 'connected',
      icon: Wifi,
      description: 'Real-time data sync',
      color: 'success',
    },
  ]
  const getStatusIcon = (status, color) => {
    switch (color) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning-500" />
      case 'danger':
        return <XCircle className="w-5 h-5 text-danger-500" />
      default:
        return <Activity className="w-5 h-5 text-slate-500" />
    }
  }
  const getStatusColor = (color) => {
    switch (color) {
      case 'success':
        return 'text-success-600'
      case 'warning':
        return 'text-warning-600'
      case 'danger':
        return 'text-danger-600'
      default:
        return 'text-slate-600'
    }
  }
  const getStatusBg = (color) => {
    switch (color) {
      case 'success':
        return 'bg-success-100'
      case 'warning':
        return 'bg-warning-100'
      case 'danger':
        return 'bg-danger-100'
      default:
        return 'bg-slate-100'
    }
  }
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Cpu className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="card-title">Device & System Status</h3>
            <p className="text-sm text-slate-600">Equipment monitoring and diagnostics</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-slate-600">Online</span>
        </div>
      </div>
      <div className="space-y-4">
        {devices.map((device, index) => {
          const IconComponent = device.icon
          return (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 ${getStatusBg(device.color)} rounded-lg`}>
                  <IconComponent className={`w-5 h-5 ${getStatusColor(device.color)}`} />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">{device.name}</h4>
                  <p className="text-sm text-slate-600">{device.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(device.status, device.color)}
                <span className={`text-sm font-medium ${getStatusColor(device.color)}`}>
                  {device.status === 'connected' ? 'Connected' : 
                   device.status === 'low' ? 'Low Battery' : 
                   device.status === 'active' ? 'Active' : 'Disconnected'}
                </span>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg border border-primary-200">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-primary-600" />
          <span className="text-sm font-medium text-primary-800">System Health</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-success-500" />
          <span className="text-sm text-primary-700">All systems operational and ready for earthquake response</span>
        </div>
      </div>
      <div className="mt-4 text-xs text-slate-500 text-center">
        Last updated: {new Date(deviceStatus.lastUpdate).toLocaleTimeString()}
      </div>
    </div>
  )
}
