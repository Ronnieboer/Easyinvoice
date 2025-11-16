import React, { useRef } from 'react';
import { Download, Upload, Trash2, Database } from 'lucide-react';
import { loadSampleData, clearAllData, exportData, importData } from '../utils/sampleData';

function Settings() {
  const fileInputRef = useRef(null);

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      importData(file);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2>Settings</h2>
        <p>Manage your data and application settings</p>
      </div>

      <div className="card">
        <h3>Data Management</h3>
        
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ color: '#4a5568', marginBottom: '1rem' }}>Backup & Restore</h4>
          <p style={{ color: '#718096', marginBottom: '1rem' }}>
            Export your data to a JSON file for backup or import data from a previous backup.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={exportData} className="btn btn-primary">
              <Download size={20} />
              Export Data
            </button>
            <button 
              onClick={() => fileInputRef.current?.click()} 
              className="btn btn-secondary"
            >
              <Upload size={20} />
              Import Data
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '2rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0' }}>
          <h4 style={{ color: '#4a5568', marginBottom: '1rem' }}>Sample Data</h4>
          <p style={{ color: '#718096', marginBottom: '1rem' }}>
            Load sample data to test the application. This will replace your current data.
          </p>
          <button onClick={loadSampleData} className="btn btn-secondary">
            <Database size={20} />
            Load Sample Data
          </button>
        </div>

        <div style={{ paddingTop: '2rem', borderTop: '1px solid #e2e8f0' }}>
          <h4 style={{ color: '#e53e3e', marginBottom: '1rem' }}>Danger Zone</h4>
          <p style={{ color: '#718096', marginBottom: '1rem' }}>
            Permanently delete all data. This action cannot be undone.
          </p>
          <button onClick={clearAllData} className="btn btn-danger">
            <Trash2 size={20} />
            Clear All Data
          </button>
        </div>
      </div>

      <div className="card">
        <h3>About</h3>
        <div style={{ color: '#4a5568' }}>
          <p style={{ marginBottom: '0.5rem' }}><strong>Invoice Manager</strong></p>
          <p style={{ marginBottom: '0.5rem' }}>Version: 1.0.0</p>
          <p style={{ marginBottom: '1rem' }}>A modern invoice management application built with React.</p>
          
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '0.75rem' }}>Features:</h4>
            <ul style={{ marginLeft: '1.5rem', color: '#718096' }}>
              <li>Create and manage invoices</li>
              <li>Customer database</li>
              <li>Flexible VAT rates</li>
              <li>PDF export</li>
              <li>Sequential invoice numbering</li>
              <li>Local data storage</li>
            </ul>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#fffaf0', borderRadius: '8px', border: '1px solid #fbd38d' }}>
            <h4 style={{ marginBottom: '0.75rem', color: '#c05621' }}>💡 Tips:</h4>
            <ul style={{ marginLeft: '1.5rem', color: '#744210' }}>
              <li>Regularly export your data as backup</li>
              <li>Data is stored locally in your browser</li>
              <li>Don't clear browser data without backing up first</li>
              <li>Use consistent descriptions for better organization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
