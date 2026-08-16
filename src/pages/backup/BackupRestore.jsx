import React, { useState } from 'react';
import { Database, Upload, Download, RefreshCw, Clock, HardDrive, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

const BackupRestore = () => {
  const [log, setLog] = useState([]);
  const [backupHistory, setBackupHistory] = useState([
    { version: 'v3.4.12_auto', date: '2024-05-15 02:00 AM', size: '42.8 MB', storage: 'Cloud (AWS S3)', status: 'Success' },
    { version: 'v3.4.11_manual', date: '2024-05-10 11:30 AM', size: '41.5 MB', storage: 'Local Drive', status: 'Success' },
    { version: 'v3.4.10_auto', date: '2024-05-08 02:00 AM', size: '41.2 MB', storage: 'Cloud (AWS S3)', status: 'Success' }
  ]);

  const addLog = (msg) => {
    setLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  };

  const handleCreateBackup = () => {
    addLog("Initializing full system backup database dump...");
    setTimeout(() => {
      const newBackup = {
        version: `v3.4.13_manual_${Date.now().toString().slice(-4)}`,
        date: new Date().toLocaleString(),
        size: '43.2 MB',
        storage: 'Local Drive',
        status: 'Success'
      };
      setBackupHistory(prev => [newBackup, ...prev]);
      addLog("Success: Backup file generated and saved successfully.");
      alert("System database backup created successfully!");
    }, 1500);
  };

  const handleRestoreBackup = (version) => {
    if (window.confirm(`Are you sure you want to restore the system database to version ${version}? Current unsaved progress will be overwritten.`)) {
      addLog(`Initializing restoration process for version ${version}...`);
      setTimeout(() => {
        addLog(`Success: Database restored to version ${version} configuration.`);
        alert(`System successfully restored to version ${version}!`);
      }, 2000);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg border border-blue-400/50 shadow-sm min-h-screen space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h1 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
          <Database className="text-blue-600" size={22} /> Database Backup & Restoration Center
        </h1>
        <p className="text-[11px] sm:text-xs text-gray-500">
          Securely create local database dumps, sync system state to secure cloud buckets, and restore snapshots.
        </p>
      </div>

      {/* Grid Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* 1. Quick Backup Actions */}
        <div className="border border-gray-200 rounded-xl p-5 bg-white space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Immediate Database Backup</h3>
            <p className="text-[10px] text-gray-500 mt-1">
              Creates a complete system dump including active sales registers, ledger books, inventory tables, and company master files.
            </p>
          </div>
          <button 
            onClick={handleCreateBackup}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs shadow-sm transition"
          >
            <HardDrive size={16} /> Create Backup Now
          </button>
        </div>

        {/* 2. Restore from File Dropzone */}
        <div className="border border-gray-200 rounded-xl p-5 bg-white space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Restore from local file</h3>
            <p className="text-[10px] text-gray-500 mt-1">
              Upload a previously downloaded `.sql` or `.json` backup file to revert settings.
            </p>
          </div>
          <label className="flex items-center justify-center gap-2 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-gray-700 font-bold rounded-lg text-xs cursor-pointer border border-dashed border-gray-300 transition">
            <Upload size={16} /> Upload Backup File
            <input type="file" className="hidden" accept=".sql,.json" onChange={(e) => {
              if (e.target.files[0]) {
                addLog(`Uploading local file "${e.target.files[0].name}"...`);
                setTimeout(() => {
                  handleRestoreBackup(e.target.files[0].name);
                }, 1000);
              }
            }} />
          </label>
        </div>

        {/* 3. Automatic Backup Settings Status */}
        <div className="border border-gray-200 rounded-xl p-5 bg-white space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Cloud Sync & Security Status</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 p-2.5 rounded-lg">
              <ShieldCheck size={18} className="shrink-0" />
              <span>Auto Cloud Backups Active (Every 24h)</span>
            </div>
            <div className="text-[10px] text-gray-500 space-y-1">
              <p className="flex justify-between"><span>S3 Storage Region:</span> <span className="font-bold text-gray-700">ap-south-1 (Mumbai)</span></p>
              <p className="flex justify-between"><span>Next Scheduled Backup:</span> <span className="font-bold text-gray-700">Tonight, 02:00 AM</span></p>
            </div>
          </div>
        </div>

      </div>

      {/* History table and activity logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Backup History Table */}
        <div className="border border-gray-200 rounded-xl overflow-hidden lg:col-span-2">
          <div className="bg-slate-50/50 p-4 border-b border-gray-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">System Backups Log History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/50 border-b border-gray-200">
                <tr>
                  <th className="p-3 font-semibold text-gray-600">Backup Version</th>
                  <th className="p-3 font-semibold text-gray-600">Timestamp</th>
                  <th className="p-3 font-semibold text-gray-600">File Size</th>
                  <th className="p-3 font-semibold text-gray-600">Storage Destination</th>
                  <th className="p-3 font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {backupHistory.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/30">
                    <td className="p-3 font-semibold text-gray-800">{item.version}</td>
                    <td className="p-3 text-gray-500">{item.date}</td>
                    <td className="p-3 text-gray-700 font-medium">{item.size}</td>
                    <td className="p-3 text-gray-600">{item.storage}</td>
                    <td className="p-3 text-right">
                      <button 
                        onClick={() => handleRestoreBackup(item.version)}
                        className="px-2.5 py-1 text-[10px] font-bold text-blue-600 hover:bg-blue-50 border border-blue-200 rounded transition"
                      >
                        Restore
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Execution Activity logs */}
        <div className="border border-gray-200 rounded-xl p-5 bg-white space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Clock size={16} className="text-blue-500" /> Backup System Live Logs
            </h3>
            <p className="text-[10px] text-gray-500 mt-1">Live execution logs for auditor tracking.</p>
          </div>
          <div className="h-44 overflow-y-auto bg-slate-900 rounded-lg p-3 text-[10px] font-mono text-emerald-400 space-y-1 my-2">
            {log.length === 0 ? (
              <p className="text-gray-500 italic">No operations triggered yet. Logs will print here.</p>
            ) : (
              log.map((item, idx) => <p key={idx}>{item}</p>)
            )}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                setLog([]);
                addLog("Log database view cleared.");
              }}
              className="flex-1 py-1.5 text-center text-[10px] font-semibold bg-gray-100 hover:bg-gray-200 border rounded text-gray-600"
            >
              Clear Logs
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BackupRestore;
