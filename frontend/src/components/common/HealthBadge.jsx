import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, RefreshCw, Server, Database } from 'lucide-react';
import { healthService } from '../../services/healthService';

export const HealthBadge = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await healthService.getHealth();
      setHealth(response.data);
    } catch (err) {
      setError(err.message || 'Failed to reach API server');
      setHealth(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              error ? 'bg-red-400' : 'bg-emerald-400'
            }`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${
              error ? 'bg-red-500' : 'bg-emerald-500'
            }`}></span>
          </span>
          <h3 className="text-sm font-bold text-hospital-navy-900 tracking-tight">
            Gateway Telemetry Status
          </h3>
        </div>
        <button
          onClick={checkHealth}
          disabled={loading}
          className="inline-flex items-center gap-1.5 text-xs text-hospital-teal-700 hover:text-hospital-teal-800 font-medium px-2.5 py-1 rounded-md bg-hospital-teal-50 hover:bg-hospital-teal-100 transition-colors disabled:opacity-50"
          title="Refresh health check"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Checking...' : 'Refresh'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {/* Backend API Server Status */}
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-hospital-navy-700" />
              API Server
            </span>
            {error ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                <AlertCircle className="w-3 h-3" /> Offline
              </span>
            ) : health ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" /> Operational
              </span>
            ) : (
              <span className="text-xs text-slate-400">Loading...</span>
            )}
          </div>
          <div className="text-xs text-slate-700 font-medium">
            {health?.server ? (
              <p className="truncate">Uptime: {health.server.uptimeSeconds}s &bull; Node {health.server.nodeVersion}</p>
            ) : error ? (
              <p className="text-rose-600 truncate">{error}</p>
            ) : (
              <p className="text-slate-400">Pinging /api/health...</p>
            )}
          </div>
        </div>

        {/* Database Connection Status */}
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-hospital-navy-700" />
              Database (MongoDB)
            </span>
            {health?.database?.isConnected ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" /> Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                <AlertCircle className="w-3 h-3" /> Phase 1 Template
              </span>
            )}
          </div>
          <div className="text-xs text-slate-700 font-medium">
            {health?.database ? (
              <p className="truncate text-slate-600" title={health.database.message}>
                {health.database.status} &bull; {health.database.configured ? 'URI Present' : 'Credentials Pending'}
              </p>
            ) : error ? (
              <p className="text-slate-400">Unavailable</p>
            ) : (
              <p className="text-slate-400">Verifying state...</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Verified Endpoint: <code className="bg-slate-100 px-1 py-0.5 rounded text-hospital-navy-800">GET /api/health</code></span>
        {health?.server?.timestamp && (
          <span>Last sync: {new Date(health.server.timestamp).toLocaleTimeString()}</span>
        )}
      </div>
    </div>
  );
};
