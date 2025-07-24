

import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [file, setFile] = useState(null);
  const adminName = 'Business Analyst'; // Replace with dynamic name if needed
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      alert(`File '${file.name}' uploaded!`);
      setFile(null);
    } else {
      alert('Please select a file first.');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-gray-100"
      style={{
        backgroundImage: "url('/flight.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Top Navbar */}
      <nav className="flex items-center justify-between bg-blue-700 text-white px-4 py-3 shadow">
        <div className="flex items-center">
          <button
            className="mr-4 md:hidden focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-bold text-xl">Meeting Dashboard</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="hidden md:inline">Welcome, <span className="font-semibold">{adminName}</span></span>
          <img src={`https://ui-avatars.com/api/?name=${adminName}`} alt="avatar" className="w-8 h-8 rounded-full" />
        </div>
      </nav>

      <div className="flex flex-1">
  
          <aside className={`bg-white shadow-md w-64 p-6 space-y-6 fixed inset-y-0 left-0 z-30 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 md:relative md:translate-x-0 md:block`}> 
            <div className="font-bold text-lg mb-4">Menu</div>
            <ul className="space-y-4">
              <li><a href="#" className="block text-blue-700 hover:underline">Dashboard</a></li>
              <li><a href="#" className="block text-blue-700 hover:underline">Meetings</a></li>
              <li><a href="#" className="block text-blue-700 hover:underline">Settings</a></li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem('isLoggedIn');
                    navigate('/logout');
                  }}
                  className="block w-full text-left text-red-600 hover:underline bg-transparent border-none p-0"
                >
                  Logout
                </button>
              </li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className="flex flex-col items-start ml-0 md:ml-50 mt-4 p-0">
            <h2 className="text-xl font-bold mb-4 bg-blue-900 bg-opacity-70 text-white rounded px-3 py-1 inline-block">Upload Meeting Recording</h2>
            <div>
              <div className="mb-4">
                <label className="block text-white mb-2">Upload Audio</label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-100 bg-transparent mb-2"
                />
                <button
                  onClick={handleUpload}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                >
                  Upload Audio
                </button>
              </div>
              <div>
                <label className="block text-white mb-2">Upload Video</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-100 bg-transparent mb-2"
                />
                <button
                  onClick={handleUpload}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                >
                  Upload Video
                </button>
              </div>
              {file && <p className="mt-2 text-green-200">Selected: {file.name}</p>}
            </div>
          </main>
              </div>

              {/* Bottom Bar */}
      <footer className="bg-blue-700 text-white text-center py-3 mt-auto shadow">
        &copy; {new Date().getFullYear()} Meeting Dashboard. All rights reserved.
      </footer>
    </div>
  );
}
