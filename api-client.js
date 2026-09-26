/**
 * WelliVerify REST API Client & Interoperability Gateway SDK
 * Connects the mobile frontend to the WelliVerify Sovereign Trust API Service.
 * Implements transparent offline fallback to preserve field resilience in low-connectivity areas.
 */

class WelliVerifyApiClient {
  constructor(baseUrl = 'http://localhost:4000/api/v1') {
    this.baseUrl = baseUrl;
    this.isOnline = false;
    this.lastHealthCheck = null;
    this.statusListeners = [];
    this.initHealthCheck();
  }

  onStatusChange(callback) {
    this.statusListeners.push(callback);
    callback(this.isOnline);
  }

  notifyStatus() {
    this.statusListeners.forEach(cb => cb(this.isOnline));
  }

  async initHealthCheck() {
    try {
      const res = await fetch(`${this.baseUrl}/health`, { method: 'GET', signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        const data = await res.json();
        this.isOnline = true;
        this.lastHealthCheck = data;
        console.log('[WelliVerify API] Connected to live backend mesh:', data);
      } else {
        this.isOnline = false;
      }
    } catch (err) {
      this.isOnline = false;
      console.warn('[WelliVerify API] Backend offline, utilizing local fallback engine:', err.message);
    }
    this.notifyStatus();
  }

  async checkHealth() {
    try {
      const res = await fetch(`${this.baseUrl}/health`, { method: 'GET', signal: AbortSignal.timeout(2000) });
      this.isOnline = res.ok;
    } catch {
      this.isOnline = false;
    }
    this.notifyStatus();
    return this.isOnline;
  }

  async verifyProduct({ code, scan_type = 'DATAMATRIX_QR', reporter_role = 'pharmacist', packaging_score = 0.98 }) {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/products/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, scan_type, reporter_role, packaging_score }),
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (err) {
        console.warn('[WelliVerify API] verifyProduct failed, falling back:', err);
      }
    }
    return null; // Signals fallback to local engine
  }

  async getInventory(facility = '') {
    if (this.isOnline) {
      try {
        const url = facility ? `${this.baseUrl}/inventory?facility=${encodeURIComponent(facility)}` : `${this.baseUrl}/inventory`;
        const res = await fetch(url);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] getInventory fallback:', err);
      }
    }
    return null;
  }

  async dispatchRebalance({ sourceHub, targetBranch, product, transferUnits = 80 }) {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/inventory/rebalance`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sourceHub, targetBranch, product, transferUnits }),
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] dispatchRebalance fallback:', err);
      }
    }
    return null;
  }

  async submitReport({ reporter, channel, message, product, batch }) {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/reports/triage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reporter, channel, message, product, batch }),
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] submitReport fallback:', err);
      }
    }
    return null;
  }

  async getReports() {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/reports`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] getReports fallback:', err);
      }
    }
    return null;
  }

  async createRecall({ title, batch, severity, status, action, affectedZones }) {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/recalls`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, batch, severity, status, action, affectedZones }),
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] createRecall fallback:', err);
      }
    }
    return null;
  }

  async getLedgerEvents(batch = '') {
    if (this.isOnline) {
      try {
        const url = batch ? `${this.baseUrl}/supply-chain/events/${encodeURIComponent(batch)}` : `${this.baseUrl}/supply-chain/events`;
        const res = await fetch(url);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] getLedgerEvents fallback:', err);
      }
    }
    return null;
  }

  async queryGraph(queryText = '') {
    if (this.isOnline) {
      try {
        const url = queryText ? `${this.baseUrl}/graph/query?q=${encodeURIComponent(queryText)}` : `${this.baseUrl}/graph/query`;
        const res = await fetch(url);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] queryGraph fallback:', err);
      }
    }
    return null;
  }

  async actionKyb(id, action, reason) {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/kyb/${id}/action`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, reason }),
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] actionKyb fallback:', err);
      }
    }
    return null;
  }
}

// Global Singleton Export
window.WelliVerifyAPI = new WelliVerifyApiClient();
