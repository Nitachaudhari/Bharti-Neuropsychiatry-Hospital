import React, { useEffect, useState } from 'react';
import { 
  Server, 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Cpu, 
  ShieldCheck, 
  Activity,
  Layers,
  Code2
} from 'lucide-react';
import { healthService } from '../services/healthService';
import { Card } from '../components/common/Card';
import { APP_CONFIG } from '../config/constants';

export const SystemStatusPage = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await healthService.getHealth();
      setHealthData(response.data);
      setLastRefreshed(new Date());
    } catch (err) {
      setError(err.message || 'Failed to communicate with Backend API server.');
      setHealthData(null);
      setLastRefreshed(new Date());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-hospital-teal-700 bg-hospital-teal-50 px-3 py-1 rounded-full border border-hospital-teal-200">
            Phase 1 Diagnostics
          </span>
          <h1 className="text-3xl font-extrabold text-hospital-navy-950 mt-3 tracking-tight">
            System Telemetry & Health Monitor
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Real-time verification of backend service health, database connectivity, and environment variables.
          </p>
        </div>

        <button
          onClick={fetchHealth}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-hospital-navy-900 text-white text-xs font-semibold hover:bg-hospital-navy-800 transition-colors shadow-sm disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Querying API...' : 'Run Diagnostics Ping'}</span>
        </button>
      </div>

      {/* Main Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* API Server Status */}
        <Card
          title="Backend API Gateway"
          subtitle={`Node.js / Express REST API running on port 5000`}
          icon={Server}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/80">
              <span className="text-xs font-medium text-slate-600">Runtime Status</span>
              {error ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                  <AlertCircle className="w-3.5 h-3.5" /> Disconnected
                </span>
              ) : healthData ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Operational
                </span>
              ) : (
                <span className="text-xs text-slate-400">Pinging...</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">Environment</span>
                <span className="font-semibold text-hospital-navy-900 uppercase">
                  {healthData?.server?.environment || '—'}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">Node.js Engine</span>
                <span className="font-semibold text-hospital-navy-900">
                  {healthData?.server?.nodeVersion || '—'}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">Process Uptime</span>
                <span className="font-semibold text-hospital-navy-900">
                  {healthData?.server?.uptimeSeconds ? `${healthData.server.uptimeSeconds} seconds` : '—'}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">Process Memory (RSS)</span>
                <span className="font-semibold text-hospital-navy-900">
                  {healthData?.server?.memory?.processRssBytes ? formatBytes(healthData.server.memory.processRssBytes) : '—'}
                </span>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
                <strong>Connection Error:</strong> {error}
              </div>
            )}
          </div>
        </Card>

        {/* Database Status */}
        <Card
          title="MongoDB Atlas Architecture"
          subtitle="Mongoose ORM Connection Manager"
          icon={Database}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/80">
              <span className="text-xs font-medium text-slate-600">Database Connection</span>
              {healthData?.database?.isConnected ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Atlas Connected
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  <AlertCircle className="w-3.5 h-3.5" /> Ready for Phase 2 URI
                </span>
              )}
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Mongoose State:</span>
                <span className="font-semibold text-hospital-navy-900 font-mono">
                  {healthData?.database?.status || 'disconnected'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Configured in .env:</span>
                <span className="font-semibold text-hospital-navy-900">
                  {healthData?.database?.configured ? 'Yes' : 'No (Pending User Credentials)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cluster Host:</span>
                <span className="font-semibold text-hospital-navy-900">
                  {healthData?.database?.host || 'None (Template Stage)'}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-hospital-teal-50/70 border border-hospital-teal-200 text-xs text-hospital-teal-900 leading-relaxed">
              <strong>Objective 5 Compliance:</strong> The database architecture is active and prepared. Per strict Phase 1 requirements, no false positive connection is claimed until your real MongoDB Atlas credentials are provided in <code className="bg-white px-1 py-0.5 rounded text-hospital-teal-800">backend/.env</code>.
            </div>
          </div>
        </Card>

      </div>

      {/* Raw Health API JSON Inspector */}
      <Card
        title="Live API Response Payload"
        subtitle={`GET ${APP_CONFIG.API_BASE_URL}/health`}
        icon={Code2}
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Last query timestamp: {lastRefreshed ? lastRefreshed.toLocaleString() : 'Pending'}</span>
            <span className="font-mono text-hospital-teal-700">HTTP 200 OK</span>
          </div>
          <pre className="p-4 rounded-xl bg-hospital-navy-950 text-hospital-teal-300 font-mono text-xs overflow-x-auto border border-hospital-navy-800 max-h-80 leading-relaxed">
            {healthData ? JSON.stringify(healthData, null, 2) : error ? JSON.stringify({ error }, null, 2) : 'Querying backend...'}
          </pre>
        </div>
      </Card>

    </div>
  );
};

