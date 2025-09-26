import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { Chart } from "chart.js/auto";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

export default function DialysisDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [pWave, setPWave] = useState(0);
  const [sWave, setSWave] = useState(0);
  const [heartRate, setHeartRate] = useState("-- BPM");
  const [bloodPressure, setBloodPressure] = useState("--/--");
  const [spo2, setSpo2] = useState("-- %");
  const [battery, setBattery] = useState("-- %");
  const [person1, setPerson1] = useState("No");
  const [person2, setPerson2] = useState("No");

  const chartRef = useRef(null);
  const seismicChart = useRef(null);
  const modelRef = useRef(null);

  const pWaveChartRef = useRef(null);
const sWaveChartRef = useRef(null);

const pWaveChart = useRef(null);
const sWaveChart = useRef(null);


useEffect(()=>async()=>{

    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);
    stompClient.connect({},frame=>{
      console.log("esp1");
       console.log("connected : ",frame);
      stompClient.subscribe('/topic/esp1', (msg)=>{
        const msgdata=JSON.parse(msg.body);
        console.log("coming from esp1",msgdata.pwave);
        setPWave(msgdata.pwave);
      });
    });
    return ()=>{
      if(stompClient){
        stompClient.disconnect();
      }
    };
    
    
   
  },[]);

  useEffect(()=>async()=>{

    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);
    stompClient.connect({},frame=>{
      console.log("esp2");
       console.log("connected : ",frame);
      stompClient.subscribe('/topic/esp2', (msg)=>{
        const msgdata=JSON.parse(msg.body);
        console.log("coming from esp2",msgdata.swave);
        setSWave(msgdata.swave);
      });
    });
    return ()=>{
      if(stompClient){
        stompClient.disconnect();
      }
    };
    
    
   
  },[]);


  // update clock
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // simulated vitals
  useEffect(() => {
    if (!loggedIn) return;
    const interval = setInterval(() => {
      setHeartRate(`${Math.floor(Math.random() * 10 + 75)} BPM`);
      setBloodPressure(
        `${Math.floor(Math.random() * 10 + 115)}/${Math.floor(
          Math.random() * 10 + 75
        )}`
      );
      setSpo2(`${Math.floor(Math.random() * 4 + 96)} %`);
      setBattery(`${Math.floor(Math.random() * 10 + 90)} %`);
    }, 2000);
    return () => clearInterval(interval);
  }, [loggedIn]);

  // init seismic chart
  useEffect(() => {
  if (pWaveChartRef.current && !pWaveChart.current) {
    pWaveChart.current = new Chart(pWaveChartRef.current, {
      type: "line",
      data: {
        labels: Array(30).fill(""),
        datasets: [
          {
            label: "P-Wave (ESP32-1)",
            data: Array(30).fill(0).map(() => Math.random()),
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "top" } },
        scales: {
  x: { ticks: { display: false } },
  y: { beginAtZero: true }
}

      },
    });
  }
  


  if (sWaveChartRef.current && !sWaveChart.current) {
    sWaveChart.current = new Chart(sWaveChartRef.current, {
      type: "line",
      data: {
        labels: Array(30).fill(""),
        datasets: [
          {
            label: "S-Wave (ESP32-2)",
            data: Array(30).fill().map(() => Math.random()),
            borderColor: "#ef4444",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "top" } },
        scales: { x: { ticks: { display: false } }, y: { min: 0, max: 1 } },
      },
    });
  }
}, [1,1]);

useEffect(() => {
  if (!pWaveChart.current) return;

  pWaveChart.current.data.labels.shift();
  pWaveChart.current.data.labels.push(new Date().toLocaleTimeString());

  pWaveChart.current.data.datasets[0].data.shift();
  pWaveChart.current.data.datasets[0].data.push(pWave);

  pWaveChart.current.update("none");
}, [pWave]);

useEffect(() => {
  if (!sWaveChart.current) return;

  sWaveChart.current.data.labels.shift();
  sWaveChart.current.data.labels.push(new Date().toLocaleTimeString());

  sWaveChart.current.data.datasets[0].data.shift();
  sWaveChart.current.data.datasets[0].data.push(sWave);

  sWaveChart.current.update("none");
}, [sWave]);


  // fetch simulated sensor data
  useEffect(() => {
    if (!loggedIn) return;
    
      const data = {
        esp32_1: { p_wave: pWave },
        esp32_2: { s_wave: sWave },
      };
      if (seismicChart.current) {
        seismicChart.current.data.labels.shift();
        seismicChart.current.data.labels.push(new Date().toLocaleTimeString());
        seismicChart.current.data.datasets[0].data.shift();
        seismicChart.current.data.datasets[0].data.push(data.esp32_1.p_wave);
        seismicChart.current.data.datasets[1].data.shift();
        seismicChart.current.data.datasets[1].data.push(data.esp32_2.s_wave);
        seismicChart.current.update("none");
      }
      setPWave(data.esp32_1.p_wave);
      setSWave(data.esp32_2.s_wave);
    
  }, [pWave,sWave,loggedIn]);

  // login handler
  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    if (username === "admin" && password === "password") {
      setLoggedIn(true);
    } else {
      alert("Invalid credentials. Use admin/password");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen login-bg flex justify-center items-center p-5 bg-gradient-to-br from-blue-900 to-gray-900">
        <section
          id="loginSection"
          className="bg-gray-900 bg-opacity-90 text-white rounded-2xl p-10 max-w-md w-full shadow-2xl text-center"
        >
          <div className="logo mb-6">
            <i className="fas fa-lock text-4xl text-blue-500 mb-4"></i>
            <h1 className="text-2xl font-bold">Secure Access</h1>
            <p className="text-gray-400 mt-2">
              Login to access the monitoring system
            </p>
          </div>
          <form id="loginForm" onSubmit={handleLogin}>
            <div className="input-group mb-4 text-left">
              <label className="block mb-2 font-medium">Username</label>
              <input
                type="text"
                name="username"
                defaultValue="admin"
                className="w-full p-3 border-2 border-gray-700 bg-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="input-group mb-6 text-left">
              <label className="block mb-2 font-medium">Password</label>
              <input
                type="password"
                name="password"
                defaultValue="password"
                className="w-full p-3 border-2 border-gray-700 bg-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </section>
      </div>
    );
  }

  

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="glass-card border-b border-gray-200 sticky top-0 z-40 bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Earthquake Stabilised Dialysis Dashboard
            </h1>
            <p className="text-sm text-gray-600">
              Real-time monitoring for patient safety
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm">
              System Online
            </span>
            <div className="text-sm text-gray-600">{time}</div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Seismic chart */}
        <div className="glass-card rounded-lg p-6 mb-8 bg-white shadow">
          <h3 className="text-xl font-bold mb-4">Seismic Wave Activity</h3>
          <div className="glass-card rounded-lg p-6 mb-8 bg-white shadow">
          <h3 className="text-xl font-bold mb-4">P-Wave Activity</h3>
          <div className="h-80">
          <canvas ref={pWaveChartRef}></canvas>
          </div>
          </div>

          <div className="glass-card rounded-lg p-6 mb-8 bg-white shadow">
          <h3 className="text-xl font-bold mb-4">S-Wave Activity</h3>
          <div className="h-80">
            <canvas ref={sWaveChartRef}></canvas>
          </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <p className="text-sm text-gray-600">P-Wave Intensity</p>
              <p className="text-2xl font-bold text-blue-600">
                {pWave.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">S-Wave Intensity</p>
              <p className="text-2xl font-bold text-red-600">
                {sWave.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Patient vitals */}
        <div className="glass-card rounded-lg p-6 bg-white shadow">
          <h3 className="text-xl font-bold mb-4">Patient Vitals</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Heart Rate</p>
              <p className="text-2xl font-bold text-red-600">{heartRate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Blood Pressure</p>
              <p className="text-2xl font-bold text-blue-600">{bloodPressure}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">SPO₂</p>
              <p className="text-2xl font-bold text-green-600">{spo2}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-card border-t border-gray-200 mt-12 bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between">
          <span className="text-sm text-gray-600">
            Earthquake Stabilised Dialysis System v1.0
          </span>
          <span className="text-sm text-gray-500">Last updated: {time}</span>
        </div>
      </footer>
    </div>
  );
}
