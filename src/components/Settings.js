import React, { useRef, useState } from 'react';
import { Download, Upload, Trash2, Database, Save } from 'lucide-react';
import { loadSampleData, clearAllData, exportData, importData } from '../utils/sampleData';
import { getTranslation } from '../utils/translations';

function Settings({ language, appSettings, setAppSettings }) {
  const fileInputRef = useRef(null);
  const [editedSettings, setEditedSettings] = useState(appSettings);
  const t = (key) => getTranslation(language, key);

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      importData(file);
    }
  };

  const handleSaveSettings = () => {
    setAppSettings(editedSettings);
    alert(t('settingsSaved') || 'Settings saved successfully!');
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditedSettings({ ...editedSettings, companyLogo: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2>{t('settingsTitle')}</h2>
        <p>{t('settingsSubtitle')}</p>
      </div>

      <div className="card">
        <h3>{t('companySettings')}</h3>
        <p style={{ color: '#718096', marginBottom: '1.5rem' }}>
          {t('companySettingsDesc') || 'Configure your company information that will appear on invoices and quotes.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="form-group">
            <label>{t('companyName')}</label>
            <input
              type="text"
              value={editedSettings.companyName}
              onChange={(e) => setEditedSettings({ ...editedSettings, companyName: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>{t('companyEmail')}</label>
            <input
              type="email"
              value={editedSettings.companyEmail}
              onChange={(e) => setEditedSettings({ ...editedSettings, companyEmail: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>{t('companyAddress')}</label>
            <input
              type="text"
              value={editedSettings.companyAddress}
              onChange={(e) => setEditedSettings({ ...editedSettings, companyAddress: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>{t('companyPhone')}</label>
            <input
              type="tel"
              value={editedSettings.companyPhone}
              onChange={(e) => setEditedSettings({ ...editedSettings, companyPhone: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>{t('companyCity')}</label>
            <input
              type="text"
              value={editedSettings.companyCity}
              onChange={(e) => setEditedSettings({ ...editedSettings, companyCity: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>{t('companyCVR')}</label>
            <input
              type="text"
              value={editedSettings.companyCVR}
              onChange={(e) => setEditedSettings({ ...editedSettings, companyCVR: e.target.value })}
            />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>{t('companyCountry')}</label>
            <input
              type="text"
              value={editedSettings.companyCountry}
              onChange={(e) => setEditedSettings({ ...editedSettings, companyCountry: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label>Company Logo</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            style={{ display: 'block', marginTop: '0.5rem' }}
          />
          {editedSettings.companyLogo && (
            <div style={{ marginTop: '1rem' }}>
              <img src={editedSettings.companyLogo} alt="Company Logo" style={{ maxWidth: '200px', maxHeight: '100px' }} />
            </div>
          )}
        </div>

        <div className="form-group">
          <label>{t('paymentTerms')}</label>
          <p style={{ color: '#718096', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
            {t('paymentTermsDesc')}
          </p>
          <textarea
            value={editedSettings.paymentTerms}
            onChange={(e) => setEditedSettings({ ...editedSettings, paymentTerms: e.target.value })}
            style={{ minHeight: '120px' }}
            placeholder="Payment due within 30 days.&#10;Bank transfer preferred.&#10;Thank you for your business!"
          />
        </div>

        <button onClick={handleSaveSettings} className="btn btn-primary">
          <Save size={20} />
          Save Company Settings
        </button>
      </div>

      <div className="card">
        <h3>{t('dataManagement')}</h3>
        
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ color: '#4a5568', marginBottom: '1rem' }}>{t('backupRestore')}</h4>
          <p style={{ color: '#718096', marginBottom: '1rem' }}>
            {t('backupRestoreDesc')}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={exportData} className="btn btn-primary">
              <Download size={20} />
              {t('exportData')}
            </button>
            <button 
              onClick={() => fileInputRef.current?.click()} 
              className="btn btn-secondary"
            >
              <Upload size={20} />
              {t('importData')}
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
          <h4 style={{ color: '#4a5568', marginBottom: '1rem' }}>{t('sampleData')}</h4>
          <p style={{ color: '#718096', marginBottom: '1rem' }}>
            {t('sampleDataDesc')}
          </p>
          <button onClick={loadSampleData} className="btn btn-secondary">
            <Database size={20} />
            {t('loadSampleData')}
          </button>
        </div>

        <div style={{ paddingTop: '2rem', borderTop: '1px solid #e2e8f0' }}>
          <h4 style={{ color: '#e53e3e', marginBottom: '1rem' }}>{t('dangerZone')}</h4>
          <p style={{ color: '#718096', marginBottom: '1rem' }}>
            {t('dangerZoneDesc')}
          </p>
          <button onClick={clearAllData} className="btn btn-danger">
            <Trash2 size={20} />
            {t('clearAllData')}
          </button>
        </div>
      </div>

      <div className="card">
        <h3>{t('about')}</h3>
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
