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

  async getLabAssays() {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/lab/assays`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] getLabAssays fallback:', err);
      }
    }
    return null;
  }

  async submitLabAssay(assayData) {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/lab/assays`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(assayData),
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] submitLabAssay fallback:', err);
      }
    }
    return null;
  }

  // --- TIER 2: WELLIPAY ESCROW & SETTLEMENT ---
  async getEscrows() {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/escrow`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] getEscrows fallback:', err);
      }
    }
    return null;
  }

  async createEscrow(escrowData) {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/escrow`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(escrowData),
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] createEscrow fallback:', err);
      }
    }
    return null;
  }

  async releaseEscrow(id, releasedBy) {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/escrow/${id}/release`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ releasedBy }),
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] releaseEscrow fallback:', err);
      }
    }
    return null;
  }

  async refundEscrow(id, reason) {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/escrow/${id}/refund`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reason }),
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] refundEscrow fallback:', err);
      }
    }
    return null;
  }

  // --- TIER 2: HMO CLAIMS ADJUDICATION ---
  async getHmoClaims() {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/hmo/claims`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] getHmoClaims fallback:', err);
      }
    }
    return null;
  }

  async adjudicateHmo(claimData) {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/hmo/adjudicate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(claimData),
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] adjudicateHmo fallback:', err);
      }
    }
    return null;
  }

  // --- TIER 2: MANUFACTURER SERIALIZATION STUDIO ---
  async generateBulkSerials(serializationData) {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/serialization/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(serializationData),
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] generateBulkSerials fallback:', err);
      }
    }
    return null;
  }

  // --- TIER 2: SUPPLY CHAIN SIMULATION JOURNEY ---
  async getSimulationState() {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/simulator/state`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] getSimulationState fallback:', err);
      }
    }
    return null;
  }

  async runSimulationStep(step, anomaly) {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/simulator/step`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ step, anomaly }),
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] runSimulationStep fallback:', err);
      }
    }
    return null;
  }

  async resetSimulation() {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/simulator/reset`, {
          method: 'POST',
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] resetSimulation fallback:', err);
      }
    }
    return null;
  }

  // --- TIER 3: REGULATOR GEOSPATIAL RADAR & SEIZURE BROADCAST ---
  async getGeoClusters() {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/regulator/geo-clusters`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] getGeoClusters fallback:', err);
      }
    }
    return null;
  }

  async broadcastSeizureOrder(seizureData) {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/regulator/seizure-broadcast`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(seizureData),
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] broadcastSeizureOrder fallback:', err);
      }
    }
    return null;
  }

  // --- TIER 3: CHW RAPID DIAGNOSTIC TEST (RDT) INTEGRATION ---
  async getRdtTests() {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/field/rdt-tests`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] getRdtTests fallback:', err);
      }
    }
    return null;
  }

  async recordRdtTest(testData) {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/field/rdt-tests`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testData),
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] recordRdtTest fallback:', err);
      }
    }
    return null;
  }

  // --- TIER 3: RURAL USSD / SMS FALLBACK GATEWAY ---
  async queryUssd({ dialCode = '*384*24#', input = '', step = 1 }) {
    if (this.isOnline) {
      try {
        const res = await fetch(`${this.baseUrl}/ussd/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dialCode, input, step }),
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('[WelliVerify API] queryUssd fallback:', err);
      }
    }
    return null;
  }
}

// Global Singleton Export
window.WelliVerifyAPI = new WelliVerifyApiClient();


