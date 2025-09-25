# 🌍 Earthquake Stabilised Dialysis Dashboard

A modern React-based dashboard for monitoring seismic activity and patient safety during dialysis treatment in earthquake-prone regions. This dashboard complements the **Earthquake Stabilised Dialysis System (SIH 2025)** by providing real-time visualization, alerts, and automated response tracking.

## 🚀 Features

### 📡 Seismic Wave Visualization
- Interactive line charts displaying **P-wave** and **S-wave** activity
- Real-time data updates every 2 seconds
- Automatic alert triggers when threshold values indicate an earthquake
- Beautiful gradient charts with smooth animations

### ❤️ Patient Safety Panel
- Real-time vital signs monitoring:
  - Heart Rate with status indicators
  - Blood Pressure (Systolic/Diastolic)
  - SPO₂ levels
  - Potassium levels
- Color-coded status indicators (Normal/High/Low)
- Live patient status updates

### ⚡ Device & System Status
- Dialysis Machine connection monitoring
- Backup Battery level tracking
- Vibration Damper activation status
- Network connection monitoring
- System health indicators

### 🚨 Earthquake Alert Levels
- 🟢 **Safe** – Normal operation
- 🟡 **Warning** – P-wave detected
- 🔴 **Critical** – Earthquake triggered
- Real-time alert status updates

### 🏥 Smart Evacuation Mode
- Comprehensive evacuation protocol display
- Step-by-step emergency procedures
- Emergency contact directory
- Patient status monitoring during evacuation
- Critical safety instructions

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite
- **UI Styling:** TailwindCSS with custom design system
- **Charts:** Chart.js + React-ChartJS-2
- **Icons:** Lucide React
- **State Management:** React Context API
- **Animations:** TailwindCSS animations + custom keyframes

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd earthquake-dialysis-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📂 Project Structure

```
src/
├── components/
│   ├── SeismicWaves.jsx      # Interactive seismic wave charts
│   ├── PatientPanel.jsx      # Patient vitals monitoring
│   ├── Alerts.jsx            # Earthquake alert system
│   ├── DeviceStatus.jsx      # Equipment monitoring
│   └── EvacuationMode.jsx    # Emergency evacuation UI
├── context/
│   └── DashboardContext.jsx  # Global state management
├── lib/
│   └── utils.js              # Utility functions
├── App.jsx                   # Main dashboard layout
├── main.jsx                  # Application entry point
└── index.css                 # Global styles and TailwindCSS
```

## 🎨 Design Features

### Modern UI/UX
- **Glassmorphism** design elements
- **Gradient** backgrounds and cards
- **Smooth animations** and transitions
- **Responsive** design for all screen sizes
- **Dark/Light** theme support ready

### Color System
- **Primary:** Blue tones for main actions
- **Success:** Green for normal/safe states
- **Warning:** Yellow/Orange for caution
- **Danger:** Red for critical alerts
- **Neutral:** Slate grays for text and backgrounds

### Typography
- Clean, readable font stack
- Proper hierarchy with consistent sizing
- Accessible contrast ratios

## 🔧 Configuration

### TailwindCSS Customization
The project uses a custom TailwindCSS configuration with:
- Extended color palette for medical/emergency themes
- Custom animations for alerts and status indicators
- Responsive breakpoints optimized for dashboard layouts

### Chart Configuration
Charts are configured with:
- Real-time data updates
- Smooth animations
- Responsive design
- Custom tooltips and legends

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🚨 Emergency Features

### Alert System
- **Real-time** seismic monitoring
- **Automatic** alert level detection
- **Visual** and **textual** alert indicators
- **Emergency action** recommendations

### Evacuation Mode
- **Step-by-step** evacuation procedures
- **Patient status** monitoring
- **Emergency contacts** directory
- **Safety instructions** display

## 🔮 Future Enhancements

- [ ] WebSocket integration for real-time data
- [ ] Historical data analysis
- [ ] Multi-patient monitoring
- [ ] Mobile app companion
- [ ] Advanced analytics dashboard
- [ ] Integration with hospital systems

## 📄 License

This project is part of the SIH 2025 Earthquake Stabilised Dialysis System.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions, please contact the development team.

---

**Built with ❤️ for patient safety during seismic events**
