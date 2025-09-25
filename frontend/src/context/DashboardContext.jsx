import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { generateSeismicData, generatePatientVitals, getAlertLevel } from '../lib/utils'

const DashboardContext = createContext()

const initialState = {
  seismicData: generateSeismicData(),
  patientVitals: generatePatientVitals(),
  deviceStatus: {
    dialysisMachine: 'connected',
    backupBattery: 85,
    lastUpdate: new Date().toISOString(),
  },
  alertLevel: 'safe',
  evacuationMode: false,
  lastUpdate: new Date().toISOString(),
}

function dashboardReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_SEISMIC_DATA':
      const newSeismicData = generateSeismicData()
      const latestPWave = newSeismicData[newSeismicData.length - 1].pWave
      const latestSWave = newSeismicData[newSeismicData.length - 1].sWave
      const alertLevel = getAlertLevel(latestPWave, latestSWave)
      
      return {
        ...state,
        seismicData: newSeismicData,
        alertLevel,
        lastUpdate: new Date().toISOString(),
      }
    
    case 'UPDATE_PATIENT_VITALS':
      return {
        ...state,
        patientVitals: generatePatientVitals(),
        lastUpdate: new Date().toISOString(),
      }
    
    case 'UPDATE_DEVICE_STATUS':
      return {
        ...state,
        deviceStatus: {
          ...state.deviceStatus,
          backupBattery: Math.max(0, state.deviceStatus.backupBattery - Math.random() * 2),
          lastUpdate: new Date().toISOString(),
        },
        lastUpdate: new Date().toISOString(),
      }
    
    case 'TOGGLE_EVACUATION_MODE':
      return {
        ...state,
        evacuationMode: !state.evacuationMode,
      }
    
    case 'SET_ALERT_LEVEL':
      return {
        ...state,
        alertLevel: action.payload,
      }
    
    default:
      return state
  }
}

export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState)

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'UPDATE_SEISMIC_DATA' })
      dispatch({ type: 'UPDATE_PATIENT_VITALS' })
      dispatch({ type: 'UPDATE_DEVICE_STATUS' })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider')
  }
  return context
}
