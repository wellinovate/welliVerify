import express from 'express';
import cors from 'cors';
import crypto from 'node:crypto';
import { db } from './db.js';
import { ledger } from './ledger.js';
import { riskEngine } from './risk-engine.js';
import { nlpTriage } from './nlp-triage.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for web prototype access
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Welli-Role'],
}));

app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[WelliVerify API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// ==========================================
// 1. HEALTH & SYSTEM INTEGRITY
// ==========================================
app.get('/api/v1/health', (req, res) => {
  const ledgerIntegrity = ledger.verifyIntegrity();
  res.json({
    status: 'ONLINE',
    service: 'WelliVerify Sovereign Trust & Interoperability Gateway',
    version: '1.2.0',
    region: 'Nigeria (NAFDAC Central Interop Gateway)',
    ledger: {
      blocksCount: ledgerIntegrity.height,
      valid: ledgerIntegrity.valid,
      latestHash: ledgerIntegrity.latestHash,
    },
    counts: {
      products: db.products.length,
      batches: db.batches.length,
      serials: db.serials.length,
      suppliers: db.suppliers.length,
      activeRecalls: db.recalls.length,
      inboxReports: db.reports.length,
    },
    timestamp: new Date().toISOString(),
  });
});

// ==========================================
// 2. ATOMIC PRODUCT VERIFICATION
// Formula from Strategy:
// product_status, registration_status, batch_status,
// expiry_status, supplier_status, traceability_status, risk_status
// ==========================================
app.post('/api/v1/products/verify', (req, res) => {
  const {
    code = 'AL-240981',
    scan_type = 'DATAMATRIX_QR',
    lat,
    lng,
    device_id = 'MOBILE-DEV-01',
    reporter_role = 'pharmacist',
    packaging_score = 0.98,
  } = req.body;

  const found = db.findProductByCode(code);

  if (!found || !found.product) {
    return res.status(404).json({
      product_status: 'UNRECOGNIZED',
      registration_status: 'NOT_FOUND_IN_REGISTRY',
      batch_status: 'UNKNOWN',
      expiry_status: 'UNKNOWN',
      supplier_status: 'UNVERIFIED',
      traceability_status: 'NO_CHAIN_OF_CUSTODY',
      risk_status: {
        score: 0.95,
        tier: 'CRITICAL',
        verdict: 'UNRECOGNIZED_CODE',
        anomaly: 'Product code not found in national NAFDAC serialized registry.',
      },
      verification_id: crypto.randomUUID(),
      message: 'Unrecognized product code. Secondary verification required.',
    });
  }

  const { product, batch, serial } = found;
  const isRecalled = batch ? batch.isRecalled : false;

  // Run Bayesian risk evaluation
  const riskEval = riskEngine.evaluate({
    code,
    batch: batch ? batch.batchId : null,
    packagingScore: packaging_score,
    geographicJumpDetected: batch && batch.status === 'ACTIVE_ANOMALY',
    movementVelocityAnomalous: batch && batch.batchId === 'AL-240981',
    serialReuseCount: serial ? serial.scansCount - 1 : 0,
    coldChainExcursion: batch && batch.status === 'COLD_CHAIN_EXCURSION',
    supplierTrustScore: 0.96,
    isRecalled,
  });

  // Determine atomic statuses
  let product_status = 'VALID';
  if (isRecalled) product_status = 'RECALLED';
  else if (riskEval.riskTier === 'CRITICAL') product_status = 'SUSPICIOUS_ANOMALY';

  let registration_status = 'VALID';
  let batch_status = batch ? batch.status : 'UNASSIGNED';
  let expiry_status = batch && batch.daysToExpiry < 30 ? 'EXPIRING_SOON' : 'VALID';
  let supplier_status = 'VERIFIED_GOLD';
  let traceability_status = 'CONFIRMED_LEDGER_CHAIN';

  // Record verification event on ledger
  const verificationEvent = ledger.recordEvent({
    eventType: 'PRODUCT_VERIFICATION_SCAN',
    who: `${reporter_role.toUpperCase()} (Device ${device_id})`,
    what: `${product.name} (Batch ${batch ? batch.batchId : 'N/A'})`,
    where: lat && lng ? `Geo [${lat}, ${lng}]` : 'Federal Capital Territory (Abuja)',
    when: new Date().toISOString(),
    fromWhom: 'Consumer/Dispenser Scan Viewport',
    toWhom: 'WelliVerify Verification Mesh',
    why: `Routine Point-of-Care Scan (${scan_type})`,
    status: product_status,
    metadata: {
      code,
      batchId: batch ? batch.batchId : null,
      riskScore: riskEval.riskScore,
    },
  });

  // Full atomic response
  res.json({
    verification_id: crypto.randomUUID(),
    verification_hash: verificationEvent.hash,
    timestamp: verificationEvent.timestamp,
    product_status,
    registration_status,
    batch_status,
    expiry_status,
    supplier_status,
    traceability_status,
    risk_status: {
      score: riskEval.riskScore,
      tier: riskEval.riskTier,
      verdict: riskEval.verdict,
      confidence: riskEval.confidence,
      anomalies: riskEval.anomalies,
      chainOfCustody: riskEval.chainOfCustody,
      behavioralSignals: riskEval.behavioralSignals,
      recommendation: riskEval.recommendation,
    },
    product: {
      id: product.id,
      name: product.name,
      brandName: product.brandName,
      category: product.category,
      nafdacRegNo: product.nafdacRegNo,
      manufacturer: product.manufacturer,
      form: product.form,
      storageReq: product.storageReq,
      standardPrice: product.standardPrice,
      currency: product.currency,
    },
    batch: batch ? {
      batchId: batch.batchId,
      mfgDate: batch.mfgDate,
      expDate: batch.expDate,
      daysToExpiry: batch.daysToExpiry,
      remainingUnits: batch.remainingUnits,
      isRecalled: batch.isRecalled,
      anomalyNote: batch.anomalyNote,
    } : null,
    serial: serial ? {
      serial: serial.serial,
      gs1DataMatrix: serial.gs1DataMatrix,
      scansCount: serial.scansCount,
      locations: serial.locations,
    } : null,
  });
});

// ==========================================
// 3. PRODUCTS & CATALOG
// ==========================================
app.get('/api/v1/products', (req, res) => {
  res.json({ count: db.products.length, products: db.products });
});

app.get('/api/v1/products/:id', (req, res) => {
  const found = db.findProductByCode(req.params.id);
  if (!found || !found.product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(found);
});

// ==========================================
// 4. INVENTORY & FEFO REBALANCING
// ==========================================
app.get('/api/v1/inventory', (req, res) => {
  const { filter, facility } = req.query;
  let items = [...db.inventory];

  if (facility) {
    items = items.filter(i => i.facility.toLowerCase().includes(facility.toLowerCase()));
  }
  if (filter === 'low_stock') {
    items = items.filter(i => i.qty <= 15);
  } else if (filter === 'expiring_soon') {
    items = items.filter(i => i.daysToExpiry <= 90);
  }

  res.json({
    count: items.length,
    inventory: items,
    stockoutAlert: {
      title: 'Predictive Stockout Warning: Antimalarials',
      meta: 'Zonal Supply Disparity: 0.74 (Critical)',
      body: 'Forecast models project stockout across Abuja & Kaduna retail pharmacies within 4.8 days due to delayed Apapa port consignments. Public secondary health centers report 18% reserve.',
    },
  });
});

app.get('/api/v1/inventory/rebalance-recommendations', (req, res) => {
  res.json({
    recommendation: {
      product: 'Artemether/Lumefantrine 20/120mg',
      sourceHub: 'Maitama General Hub Depot',
      sourceStock: '180 units (+60 days reserve)',
      targetBranch: 'GreenLife Pharmacy (Wuse II)',
      targetStock: '12 units (3.5 days coverage)',
      transferUnits: 80,
      distance: '3.2 km',
      eta: '~45 mins via WelliExpress Logistics',
      status: 'AWAITING_DISPATCH_AUTHORIZATION',
    },
  });
});

app.post('/api/v1/inventory/rebalance', (req, res) => {
  const { sourceHub, targetBranch, product, transferUnits = 80 } = req.body;

  // Record rebalance event on immutable ledger
  const transferEvent = ledger.recordEvent({
    eventType: 'BUFFER_REBALANCE_DISPATCH',
    who: 'Pharmacist Chidinma Okafor (PCN-08217743)',
    what: `${product} · Transfer of ${transferUnits} units`,
    where: `${sourceHub} → ${targetBranch}`,
    when: new Date().toISOString(),
    fromWhom: sourceHub,
    toWhom: targetBranch,
    why: 'Algorithmic Stockout Prevention Rebalance',
    status: 'DISPATCH_IN_PROGRESS',
    metadata: { transferUnits, courier: 'WelliExpress Logistics' },
  });

  res.json({
    success: true,
    dispatchId: `DSP-${Date.now()}`,
    transferUnits,
    eta: '45 mins',
    ledgerHash: transferEvent.hash,
    message: `Dispatched ${transferUnits} units from ${sourceHub} to ${targetBranch}.`,
  });
});

// ==========================================
// 5. SUPPLIERS & DISTRIBUTORS
// ==========================================
app.get('/api/v1/suppliers', (req, res) => {
  res.json({ count: db.suppliers.length, suppliers: db.suppliers });
});

app.get('/api/v1/suppliers/:id', (req, res) => {
  const supplier = db.suppliers.find(s => s.id === req.params.id || s.licenceNo === req.params.id);
  if (!supplier) {
    return res.status(404).json({ error: 'Supplier not found' });
  }
  res.json(supplier);
});

// ==========================================
// 6. CRYPTOGRAPHIC SUPPLY CHAIN EVENTS
// ==========================================
app.get('/api/v1/supply-chain/events', (req, res) => {
  res.json({
    height: ledger.chain.length,
    events: ledger.chain,
  });
});

app.get('/api/v1/supply-chain/events/:batch', (req, res) => {
  const events = ledger.getEventsForBatch(req.params.batch);
  res.json({
    batch: req.params.batch,
    eventsCount: events.length,
    events,
  });
});

app.post('/api/v1/supply-chain/events', (req, res) => {
  const { eventType, who, what, where, when, fromWhom, toWhom, why, status, metadata } = req.body;

  const event = ledger.recordEvent({
    eventType,
    who,
    what,
    where,
    when,
    fromWhom,
    toWhom,
    why,
    status,
    metadata,
  });

  res.status(201).json({
    success: true,
    event,
    ledgerHeight: ledger.chain.length,
  });
});

// ==========================================
// 7. RECALLS & QUARANTINE
// ==========================================
app.get('/api/v1/recalls', (req, res) => {
  res.json({ count: db.recalls.length, recalls: db.recalls });
});

app.post('/api/v1/recalls', (req, res) => {
  const { title, batch, severity = 'HIGH PRIORITY', status, action, affectedZones = [] } = req.body;

  const newRecall = {
    id: `REC-${Date.now()}`,
    title,
    batch,
    severity,
    status: status || 'Recalled by Regulatory Directive',
    action: action || 'Quarantine remaining stock immediately',
    affectedZones,
    initiatedBy: 'NAFDAC Directorate of Pharmacovigilance',
    initiatedDate: new Date().toISOString(),
    totalDistributed: 10000,
    totalQuarantined: 0,
  };

  db.recalls.unshift(newRecall);

  // Mark batch as recalled in batch master
  const b = db.batches.find(x => x.batchId === batch);
  if (b) {
    b.isRecalled = true;
    b.status = 'OFFICIALLY_RECALLED';
  }

  // Anchor in ledger
  ledger.recordEvent({
    eventType: 'REGULATORY_RECALL_MANDATE',
    who: 'NAFDAC Pharmacovigilance Enforcement Directorate',
    what: `Product Batch ${batch} (${title})`,
    where: affectedZones.join(', ') || 'National Territory',
    when: new Date().toISOString(),
    fromWhom: 'Federal Government / NAFDAC',
    toWhom: 'All Licensed Pharmacies, Distributors & Health Facilities',
    why: 'Suspected Counterfeit or Thermal Degradation Safety Risk',
    status: 'ACTIVE_RECALL_BROADCAST',
    metadata: { recallId: newRecall.id, batch },
  });

  res.status(201).json({
    success: true,
    recall: newRecall,
    broadcastStatus: 'TRANSMITTED_TO_NATIONAL_PHARMACY_MESH',
  });
});

// ==========================================
// 8. OMNICHANNEL CITIZEN/CLINICIAN TRIAGE
// ==========================================
app.get('/api/v1/reports', (req, res) => {
  res.json({ count: db.reports.length, reports: db.reports });
});

app.post('/api/v1/reports/triage', (req, res) => {
  const { reporter, channel, message, product, batch } = req.body;

  // Run NLP triage engine
  const classification = nlpTriage.classify({
    reporter,
    channel,
    message,
    product,
    batch,
  });

  const newReport = {
    id: `REP-${Date.now()}`,
    reporter: reporter || 'Anonymous Citizen Reporter',
    channel: channel || 'WhatsApp Hotline (+234 803 *** 8192)',
    time: 'Just now',
    type: classification.category,
    product: product || `Batch ${classification.extractedBatch}`,
    message,
    urgency: classification.urgency,
    urgencyClass: classification.urgencyClass,
    triageRoute: classification.triageRoute,
    confidence: classification.confidence,
    batch: classification.extractedBatch,
    reviewed: false,
    timestamp: classification.timestamp,
  };

  db.reports.unshift(newReport);

  res.status(201).json({
    success: true,
    report: newReport,
    classification,
  });
});

app.patch('/api/v1/reports/:id/review', (req, res) => {
  const r = db.reports.find(x => x.id === req.params.id);
  if (!r) return res.status(404).json({ error: 'Report not found' });
  r.reviewed = true;
  res.json({ success: true, report: r });
});

// ==========================================
// 9. COLD CHAIN TELEMETRY
// ==========================================
app.get('/api/v1/cold-chain', (req, res) => {
  res.json({ count: db.coldChainShipments.length, shipments: db.coldChainShipments });
});

app.get('/api/v1/cold-chain/:shipmentId', (req, res) => {
  const found = db.coldChainShipments.find(s => s.shipmentId === req.params.shipmentId || s.batch === req.params.shipmentId);
  if (!found) return res.status(404).json({ error: 'Shipment cold-chain log not found' });
  res.json(found);
});

// ==========================================
// 10. DEMAND FORECAST & PRICE INTELLIGENCE
// ==========================================
app.get('/api/v1/demand/forecast', (req, res) => {
  res.json({
    forecasts: [
      { product: 'Artemether/Lumefantrine', region: 'Abuja', trend: '+34%', confidence: '87%', note: 'Rainy-season malaria pattern — reorder ~2 weeks early' },
      { product: 'Insulin (Human)', region: 'Kaduna Zone', trend: '+12%', confidence: '79%', note: 'Chronic demand outpacing current allocation' },
      { product: 'Oral Rehydration Salts', region: 'Lagos', trend: '+21%', confidence: '83%', note: 'Seasonal diarrheal-disease uptick forecast' },
    ],
  });
});

app.get('/api/v1/price-intel', (req, res) => {
  res.json({
    rows: [
      { product: 'Amoxicillin 500mg', abuja: '₦1,850', lagos: '₦1,920', kano: '₦1,780', volatile: false },
      { product: 'Artemether/Lumefantrine', abuja: '₦2,400', lagos: '₦2,550', kano: '₦2,300', volatile: false },
      { product: 'Insulin (Human)', abuja: '₦8,900', lagos: '₦10,950', kano: '₦8,600', volatile: true, note: 'Abuja price 23% above 30-day median — flagged for review' },
    ],
  });
});

// ==========================================
// 11. GRAPH / CYPHER QUERY ENGINE (AI COPILOT)
// ==========================================
app.get('/api/v1/graph/query', (req, res) => {
  const { q } = req.query;
  const threads = [
    {
      q: 'Batches from Cadila Pharma flagged in the last 30 days',
      a: '2 batches flagged: AL-77209 (high priority — suspected falsification, Abuja/Kaduna/Kano) and AL-240981 (behavioural anomaly, under investigation). No open compliance events on the manufacturer record.',
      cypher: `MATCH (b:Batch {mfg:'Cadila'})<-[:MONITORED]-(s:SensorEvent)\nWHERE s.flag = true AND s.timestamp > date() - duration({days:30})\nRETURN b.serial, s.location, s.anomaly_type`,
      nodes: [
        { label: 'Mfg: Cadila Pharma' },
        { label: 'Apapa Sea Port' },
        { label: 'Northgate Distribution' },
        { label: 'Flagged: Kano Sabon Gari' },
        { label: 'Flagged: PH Branch' },
      ],
      evidence: 'Trust Graph Hash: SHA256:7b92f4...d891 | NAFDAC Ledger Stamp: VALID-20260924 | Multi-party consensus confirmed across 3 nodal gateways.',
    },
    {
      q: 'Distributors with rising complaint rates',
      a: 'Northgate Distribution: complaint rate up 3.2× over 30 days, concentrated in Kaduna Zone. Excursion reports logged across 3 transit vehicles.',
      cypher: `MATCH (d:Distributor)-[:SHIPPED]->(o:Order)<-[:COMPLAINT]-(c:Report)\nWITH d, count(c) as rate ORDER BY rate DESC\nRETURN d.name, rate, d.zone`,
      nodes: [
        { label: 'Northgate Distribution (Lagos)' },
        { label: 'Cold-Chain Excursion #CC-409' },
        { label: 'Kaduna Distribution Depot' },
        { label: '6 Receiving Clinics' },
      ],
      evidence: 'IoT Data Logger Telemetry Hash: 0x48a...e902 | Calibration Cert: ISO/IEC 17025 | Deviation interval: 43 mins > 8.0°C.',
    },
    {
      q: 'Regions at highest stockout risk',
      a: 'Kaduna Zone leads on insulin (≈6 days coverage). Lagos and Abuja are within normal range for all monitored essential medicines.',
      cypher: `MATCH (r:Region)<-[:LOCATED_IN]-(p:Pharmacy)-[:STOCKS]->(i:Inventory)\nWHERE i.days_to_stockout < 7\nRETURN r.name, count(p) as at_risk_facilities, i.product`,
      nodes: [
        { label: 'Kaduna Zone' },
        { label: 'Insulin (Human) 100IU' },
        { label: 'Coverage: 5.8 Days' },
        { label: 'Rebalance Buffer: Maitama Hub' },
      ],
      evidence: 'Demand Forecast Model: DeepAR-v4 | Cross-validated against NPHCDA immunization & chronic care consumption trends.',
    },
  ];

  if (!q) {
    return res.json({ threads });
  }

  // Find best match or return first
  const match = threads.find(t => t.q.toLowerCase().includes(q.toLowerCase())) || threads[0];
  res.json({ result: match });
});

// ==========================================
// 12. KYB QUEUE
// ==========================================
app.get('/api/v1/kyb/queue', (req, res) => {
  res.json({ queue: db.kybQueue });
});

app.post('/api/v1/kyb/:id/action', (req, res) => {
  const item = db.kybQueue.find(k => k.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'KYB item not found' });
  const { action = 'APPROVED', reason } = req.body;
  item.status = action;
  item.actionReason = reason || 'Processed by NAFDAC Regulatory Registrar';

  res.json({ success: true, item });
});

// ==========================================
// 13. LABORATORY QC & CHEMICAL ASSAYS
// ==========================================
app.get('/api/v1/lab/assays', (req, res) => {
  res.json({ count: db.assays.length, assays: db.assays });
});

app.get('/api/v1/lab/assays/:batchId', (req, res) => {
  const assay = db.assays.find(a => a.batchId === req.params.batchId || a.coaId === req.params.batchId);
  if (!assay) return res.status(404).json({ error: 'Assay record not found' });
  res.json(assay);
});

app.post('/api/v1/lab/assays', (req, res) => {
  const {
    batchId = 'AL-240981',
    productName = 'Artemether / Lumefantrine 80/480mg',
    apiAssayPercentage = 98.5,
    dissolutionRate = '86.2% at 45 min',
    foreignSubstances = 'None detected',
    labOfficer = 'Tunji Adewale (Reg. LAB-33021)',
    facility = 'Zenith Diagnostics Reference Laboratory, Lagos',
    method = 'Reversed-Phase High-Performance Liquid Chromatography (RP-HPLC)',
  } = req.body;

  const numericAssay = Number(apiAssayPercentage);
  const isCompliant = numericAssay >= 95.0 && numericAssay <= 105.0;
  const status = isCompliant ? 'PASSED' : 'FAILED_LETHAL_ADULTERANT';
  const sealClass = isCompliant ? 'tag-accent' : 'tag-accent-2';
  const coaId = `COA-2026-NAFDAC-${Math.floor(1000 + Math.random() * 9000)}${isCompliant ? '' : '-FAIL'}`;

  const newAssay = {
    id: `ASSAY-00${db.assays.length + 1}`,
    coaId,
    batchId,
    productName,
    labOfficer,
    facility,
    testDate: new Date().toISOString().split('T')[0],
    method,
    apiAssayPercentage: numericAssay,
    specificationRange: '95.0% - 105.0% (USP / BP)',
    dissolutionRate,
    foreignSubstances,
    status,
    sealClass,
    retentionPeakMin: isCompliant ? 4.2 : 0.0,
    conclusion: isCompliant
      ? 'Sample conforms to British Pharmacopoeia (BP 2025) monograph standards.'
      : `NON-COMPLIANT: Assay of ${numericAssay}% violates USP/BP specifications. Quarantine batch.`,
  };

  db.assays.unshift(newAssay);

  // If failed, auto-flag batch
  const batch = db.batches.find(b => b.batchId === batchId);
  if (batch && !isCompliant) {
    batch.status = 'FAILED_LAB_ASSAY';
  }

  // Anchor in immutable ledger
  const certEvent = ledger.recordEvent({
    eventType: 'LAB_ASSAY_CERTIFICATION',
    who: labOfficer,
    what: `Laboratory Assay for ${productName} (Batch ${batchId})`,
    where: facility,
    when: new Date().toISOString(),
    fromWhom: facility,
    toWhom: 'NAFDAC National Pharmacovigilance Mesh',
    why: 'Point-of-Entry & Market Surveillance Laboratory Clearance',
    status: isCompliant ? 'PASSED_CERTIFICATION' : 'FAILED_ADULTERATION_DETECTED',
    metadata: {
      coaId,
      batchId,
      assayScore: numericAssay,
      compliant: isCompliant,
    },
  });

  res.status(201).json({
    success: true,
    assay: newAssay,
    ledgerHash: certEvent.hash,
    message: isCompliant
      ? 'Certificate of Analysis successfully issued & anchored to National Trust Ledger'
      : 'ALERT: Assay failed pharmacopeia limits. Batch flagged for immediate recall broadcast.',
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  WelliVerify National Trust API Server running`);
  console.log(`  Port: http://localhost:${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/api/v1/health`);
  console.log(`  Ledger Height: ${ledger.chain.length} blocks chained`);
  console.log(`====================================================`);
});
