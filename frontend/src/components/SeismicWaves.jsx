import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Activity, AlertTriangle, Zap } from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'
import { formatTime } from '../lib/utils'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function SeismicWaves() {
  const { state } = useDashboard()
  const { seismicData, alertLevel } = state

  const chartData = {
    labels: seismicData.map((_, index) => {
      const time = new Date(seismicData[index].time)
      return formatTime(time)
    }),
    datasets: [
      {
        label: 'P-Wave',
        data: seismicData.map(d => d.pWave),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
      {
        label: 'S-Wave',
        data: seismicData.map(d => d.sWave),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 8,
          font: {
            size: 10,
          },
        },
      },
      y: {
        display: true,
        min: 0,
        max: 1,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 10,
          },
          callback: function(value) {
            return value.toFixed(1)
          },
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  }

  const getAlertIcon = () => {
    switch (alertLevel) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-danger-500 animate-pulse" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning-500" />
      default:
        return <Activity className="w-5 h-5 text-success-500" />
    }
  }

  const getAlertText = () => {
    switch (alertLevel) {
      case 'critical':
        return 'Earthquake Detected!'
      case 'warning':
        return 'Seismic Activity Warning'
      default:
        return 'Normal Seismic Activity'
    }
  }

  const getAlertClass = () => {
    switch (alertLevel) {
      case 'critical':
        return 'status-critical'
      case 'warning':
        return 'status-warning'
      default:
        return 'status-safe'
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Zap className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="card-title">Seismic Wave Activity</h3>
            <p className="text-sm text-slate-600">Real-time P-wave and S-wave monitoring</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getAlertIcon()}
          <span className={`status-indicator ${getAlertClass()}`}>
            {getAlertText()}
          </span>
        </div>
      </div>
      
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-label">P-Wave Intensity</p>
              <p className="metric-value text-primary-600">
                {seismicData[seismicData.length - 1]?.pWave.toFixed(2) || '0.00'}
              </p>
            </div>
            <div className="p-2 bg-primary-100 rounded-lg">
              <Activity className="w-4 h-4 text-primary-600" />
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-label">S-Wave Intensity</p>
              <p className="metric-value text-danger-600">
                {seismicData[seismicData.length - 1]?.sWave.toFixed(2) || '0.00'}
              </p>
            </div>
            <div className="p-2 bg-danger-100 rounded-lg">
              <Zap className="w-4 h-4 text-danger-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
