import crypto from 'node:crypto';
import { ledger } from './ledger.js';

/**
 * WelliVerify Core In-Memory Database
 * Seeded with authentic Nigerian pharmaceutical products, NAFDAC registrations,
 * GS1 DataMatrix identifiers, cold-chain telemetry, and multi-actor supply-chain ledgers.
 */

export class WelliVerifyDB {
  constructor() {
    this.init();
  }

  init() {
    // 1. PRODUCT MASTER
    this.products = [
      {
        id: 'PROD-AL-01',
        name: 'Artemether / Lumefantrine 80/480mg',
        brandName: 'Coartem Dispersible',
        category: 'Antimalarial (ACT)',
        nafdacRegNo: 'A4-0231',
        manufacturer: 'Novartis Pharma AG / Genevith Healthcare',
        form: 'Dispersible Tablet, 6x1 Blister Pack',
        storageReq: 'Below 30°C in dry place',
        standardPrice: 2400,
        currency: 'NGN',
        verifiedStatus: 'CONFIRMED',
        packagingSpecs: {
          microprintDPI: 1200,
          guillochePattern: 'Guilloche Security Wave Variant 4',
          hologramType: 'Dynamic Optical Variable Device (OVD)',
          chemicalIndicator: 'Spectroscopic Marker Type-C (Positive)',
        },
      },
      {
        id: 'PROD-AMX-02',
        name: 'Amoxicillin Trihydrate 500mg',
        brandName: 'Amoxil Capsules',
        category: 'Antibiotic (Broad Spectrum)',
        nafdacRegNo: '04-1234',
        manufacturer: 'GlaxoSmithKline / Chi Pharmaceuticals Ltd.',
        form: 'Capsule, 10x10 Blister Pack',
        storageReq: 'Store below 25°C',
        standardPrice: 1850,
        currency: 'NGN',
        verifiedStatus: 'CONFIRMED',
        packagingSpecs: {
          microprintDPI: 1200,
          guillochePattern: 'Standard Fine Line Mesh',
          hologramType: 'Tamper Evident Seal',
          chemicalIndicator: 'Spectroscopic Marker Type-A',
        },
      },
      {
        id: 'PROD-INS-03',
        name: 'Human Insulin 100IU/ml (rDNA)',
        brandName: 'Actrapid Penfill',
        category: 'Endocrine / Antidiabetic',
        nafdacRegNo: 'B4-8891',
        manufacturer: 'Novo Nordisk A/S',
        form: '10ml Vial (Subcutaneous Injection)',
        storageReq: 'Cold Chain: 2°C – 8°C (Do not freeze)',
        standardPrice: 8900,
        currency: 'NGN',
        verifiedStatus: 'CONFIRMED',
        packagingSpecs: {
          microprintDPI: 2400,
          guillochePattern: 'High Security Micro-lattice',
          hologramType: 'Cold-Chain Sensitive Color Shifting Foil',
          chemicalIndicator: 'Thermal Integrity Strip (Positive)',
        },
      },
      {
        id: 'PROD-OXY-04',
        name: 'Oxytocin Injection 10IU/ml',
        brandName: 'Syntocinon',
        category: 'Obstetric / Uterotonic',
        nafdacRegNo: '04-7719',
        manufacturer: 'RotexMedica GmbH / Northgate Distribution',
        form: '1ml Ampoule, Pack of 10',
        storageReq: 'Cold Chain: 2°C – 8°C Strict Cold Chain',
        standardPrice: 3200,
        currency: 'NGN',
        verifiedStatus: 'CONFIRMED',
        packagingSpecs: {
          microprintDPI: 1200,
          guillochePattern: 'Ampoule Ring Band Code',
          hologramType: 'NAFDAC Holographic Foil Band',
          chemicalIndicator: 'Thermal Exposure Indicator',
        },
      },
      {
        id: 'PROD-CIP-05',
        name: 'Ciprofloxacin 500mg',
        brandName: 'Ciprotab Film-Coated',
        category: 'Fluoroquinolone Antibiotic',
        nafdacRegNo: '04-6621',
        manufacturer: 'Fidson Healthcare Plc',
        form: 'Film-Coated Tablet, 10s',
        storageReq: 'Store in a cool dry place',
        standardPrice: 2100,
        currency: 'NGN',
        verifiedStatus: 'CONFIRMED',
        packagingSpecs: {
          microprintDPI: 1200,
          guillochePattern: 'Fidson Security Vector',
          hologramType: 'Authenticity Seal',
          chemicalIndicator: 'Type-B Standard',
        },
      },
    ];

    // 2. BATCH MASTER
    this.batches = [
      {
        batchId: 'AL-240981',
        productId: 'PROD-AL-01',
        mfgDate: '2025-09-01',
        expDate: '2027-08-31',
        daysToExpiry: 340,
        initialUnits: 15000,
        remainingUnits: 6420,
        status: 'ACTIVE_ANOMALY', // Under behavioral investigation for suspicious route jump
        anomalyNote: 'Geographic jump detected between Lagos Customs clearance and Kaduna regional hub',
        isRecalled: false,
      },
      {
        batchId: 'AL-77209',
        productId: 'PROD-AL-01',
        mfgDate: '2025-06-15',
        expDate: '2027-06-14',
        daysToExpiry: 260,
        initialUnits: 20000,
        remainingUnits: 4120,
        status: 'OFFICIALLY_RECALLED',
        anomalyNote: 'Suspected falsification — tablets crumble to yellow powder with petroleum odor in Kano & Abuja',
        isRecalled: true,
      },
      {
        batchId: 'INS-1120',
        productId: 'PROD-INS-03',
        mfgDate: '2025-11-10',
        expDate: '2026-10-31',
        daysToExpiry: 35,
        initialUnits: 3000,
        remainingUnits: 180,
        status: 'CRITICAL_STOCKOUT_RISK',
        anomalyNote: 'High velocity consumption, supply shock across northern depots',
        isRecalled: false,
      },
      {
        batchId: 'OXY-1188',
        productId: 'PROD-OXY-04',
        mfgDate: '2026-01-05',
        expDate: '2027-01-04',
        daysToExpiry: 280,
        initialUnits: 5000,
        remainingUnits: 2800,
        status: 'COLD_CHAIN_EXCURSION',
        anomalyNote: 'Transit logger recorded 43 minutes exceeding 8°C threshold (reached 11.2°C)',
        isRecalled: false,
      },
      {
        batchId: 'AMX-9931',
        productId: 'PROD-AMX-02',
        mfgDate: '2025-12-01',
        expDate: '2027-11-30',
        daysToExpiry: 430,
        initialUnits: 25000,
        remainingUnits: 18400,
        status: 'VERIFIED_PRISTINE',
        anomalyNote: 'All regulatory checkpoints and cryptographic ledger hashes verified intact',
        isRecalled: false,
      },
    ];

    // 3. SERIAL MASTER (GS1 DataMatrix & Barcodes)
    this.serials = [
      {
        serial: '8F72-92AA',
        gs1DataMatrix: '(01)06151412000000(17)270831(10)AL-240981(21)8F7292AA',
        batchId: 'AL-240981',
        productId: 'PROD-AL-01',
        status: 'INVESTIGATION',
        scansCount: 4,
        locations: ['Lagos (Apapa)', 'Kano (Sabon Gari)', 'Kaduna Central'],
        reuseFlag: true,
      },
      {
        serial: '7720-99BC',
        gs1DataMatrix: '(01)06151412000000(17)270614(10)AL-77209(21)772099BC',
        batchId: 'AL-77209',
        productId: 'PROD-AL-01',
        status: 'QUARANTINED',
        scansCount: 18,
        locations: ['Kano Sabon Gari', 'Wuse Market Abuja', 'Kaduna Central'],
        reuseFlag: true,
      },
      {
        serial: '1120-44AA',
        gs1DataMatrix: '(01)05701234567890(17)261031(10)INS-1120(21)112044AA',
        batchId: 'INS-1120',
        productId: 'PROD-INS-03',
        status: 'ACTIVE',
        scansCount: 1,
        locations: ['Maitama General Hub Depot'],
        reuseFlag: false,
      },
      {
        serial: '9931-10BB',
        gs1DataMatrix: '(01)05000456123456(17)271130(10)AMX-9931(21)993110BB',
        batchId: 'AMX-9931',
        productId: 'PROD-AMX-02',
        status: 'ACTIVE',
        scansCount: 1,
        locations: ['GreenLife Pharmacy, Abuja'],
        reuseFlag: false,
      },
    ];

    // 4. ORGANIZATIONS & SUPPLIERS
    this.suppliers = [
      {
        id: 'SUPP-CHI-01',
        name: 'Chi Pharmaceuticals Ltd.',
        type: 'Distributor & Manufacturer',
        licenceNo: 'DIS-2291',
        pcnReg: 'PCN-CORP-4882',
        address: '14 Chivita Avenue, Ajao Estate, Ikeja, Lagos',
        phone: '+234 1 271 9000',
        trustScore: 0.98,
        trustStatus: 'VERIFIED_GOLD',
        authorizedProducts: 48,
        yearsActive: 28,
        inspectionStatus: 'Satisfactory (NAFDAC GMP Audit Nov 2025)',
        coldChainCertified: true,
        complianceEvents: 0,
      },
      {
        id: 'SUPP-NORTH-02',
        name: 'Northgate Distribution Ltd.',
        type: 'Cold-Chain Regional Wholesaler',
        licenceNo: 'DIS-4012',
        pcnReg: 'PCN-CORP-9021',
        address: 'Plot 12 Heavy Industrial Layout, Kaduna',
        phone: '+234 62 890 123',
        trustScore: 0.78,
        trustStatus: 'UNDER_SURVEILLANCE',
        authorizedProducts: 22,
        yearsActive: 8,
        inspectionStatus: 'Provisional (Pending Cold-Chain Reefer Audit)',
        coldChainCertified: true,
        complianceEvents: 3,
        note: 'Elevated temperature excursion incidents on Kaduna-Zaria transit corridor',
      },
      {
        id: 'SUPP-MERID-03',
        name: 'Meridian Imports & Logistics',
        type: 'Authorized Importer / Clearing Agent',
        licenceNo: 'IMP-0941',
        pcnReg: 'PCN-CORP-1184',
        address: 'Tin Can Island Port Complex, Apapa, Lagos',
        phone: '+234 1 883 4521',
        trustScore: 0.94,
        trustStatus: 'VERIFIED_SILVER',
        authorizedProducts: 34,
        yearsActive: 14,
        inspectionStatus: 'Passed Routine Audit',
        coldChainCertified: false,
        complianceEvents: 0,
      },
    ];

    // 5. INVENTORY POSITIONS
    this.inventory = [
      { id: 'INV-01', facility: 'GreenLife Pharmacy (Wuse II, Abuja)', name: 'Amoxicillin 500mg', batch: 'AMX-9931', qty: 62, daysToExpiry: 210, standardDailyVelocity: 3 },
      { id: 'INV-02', facility: 'GreenLife Pharmacy (Wuse II, Abuja)', name: 'Paracetamol 500mg', batch: 'PC-4471', qty: 140, daysToExpiry: 340, standardDailyVelocity: 6 },
      { id: 'INV-03', facility: 'GreenLife Pharmacy (Wuse II, Abuja)', name: 'Artemether/Lumefantrine 20/120mg', batch: 'AL-240981', qty: 12, daysToExpiry: 95, standardDailyVelocity: 5, stockoutAlert: true },
      { id: 'INV-04', facility: 'GreenLife Pharmacy (Wuse II, Abuja)', name: 'Insulin (Human) 100IU', batch: 'INS-1120', qty: 8, daysToExpiry: 21, standardDailyVelocity: 1, stockoutAlert: true },
      { id: 'INV-05', facility: 'GreenLife Pharmacy (Wuse II, Abuja)', name: 'Metformin 500mg', batch: 'MTF-3302', qty: 51, daysToExpiry: 260, standardDailyVelocity: 2 },
      { id: 'INV-06', facility: 'Maitama General Hub Depot (Abuja)', name: 'Artemether/Lumefantrine 20/120mg', batch: 'AL-240981', qty: 180, daysToExpiry: 95, standardDailyVelocity: 0, isBufferHub: true },
    ];

    // 6. RECALLS
    this.recalls = [
      {
        id: 'REC-2026-001',
        title: 'Artemether / Lumefantrine 80/480mg',
        batch: 'AL-77209',
        severity: 'HIGH PRIORITY',
        status: 'Suspected falsification — Abuja, Kaduna, Kano',
        action: 'Quarantine remaining stock immediately and submit field report to NAFDAC',
        affectedZones: ['Abuja (FCT)', 'Kaduna State', 'Kano State'],
        initiatedBy: 'NAFDAC Directorate of Pharmacovigilance & Post-Marketing Surveillance',
        initiatedDate: '2026-09-24T14:30:00.000Z',
        totalDistributed: 20000,
        totalQuarantined: 15880,
      },
      {
        id: 'REC-2026-002',
        title: 'Oxytocin injection 10IU/ml',
        batch: 'OXY-1188',
        severity: 'MEDIUM',
        status: 'Cold-chain thermal excursion during inter-state haulage',
        action: 'Verify electronic data logger log before clinical dispensation',
        affectedZones: ['Lagos State', 'Kaduna Zone'],
        initiatedBy: 'Northgate Distribution Quality Assurance Desk',
        initiatedDate: '2026-09-25T09:15:00.000Z',
        totalDistributed: 5000,
        totalQuarantined: 2200,
      },
    ];

    // 7. COLD CHAIN TELEMETRY
    this.coldChainShipments = [
      {
        shipmentId: 'CC-OXY-1188',
        product: 'Oxytocin injection',
        batch: 'OXY-1188',
        status: 'EXCEPTION',
        tempThreshold: '2–8°C required',
        readingSummary: 'Exceeded threshold for 43 min (peak 11.2°C)',
        actionRecommendation: 'QUARANTINE RECOMMENDED',
        route: 'Meridian Imports (Lagos) → Northgate Central Depot (Kaduna)',
        sensorSerial: 'TEMP-LOG-9082',
        readings: [
          { time: '08:00', temp: 5.1, flag: false },
          { time: '10:00', temp: 6.2, flag: false },
          { time: '12:00', temp: 9.4, flag: true },
          { time: '12:43', temp: 11.2, flag: true },
          { time: '14:00', temp: 5.0, flag: false },
        ],
      },
      {
        shipmentId: 'CC-MSL-6602',
        product: 'Measles vaccine',
        batch: 'MSL-6602',
        status: 'NORMAL',
        tempThreshold: '2–8°C required',
        readingSummary: 'Stable throughout transit (avg 4.5°C)',
        actionRecommendation: 'No action needed',
        route: 'National Primary Health Care Agency → Kano State Cold Store',
        sensorSerial: 'TEMP-LOG-1104',
        readings: [
          { time: '08:00', temp: 4.1, flag: false },
          { time: '10:00', temp: 4.8, flag: false },
          { time: '12:00', temp: 4.6, flag: false },
          { time: '14:00', temp: 4.2, flag: false },
        ],
      },
    ];

    // 8. CITIZEN & CLINICIAN INCIDENT REPORTS
    this.reports = [
      {
        id: 'REP-001',
        reporter: 'Ngozi Bello (Patient · Kano)',
        channel: 'WhatsApp (+234 803 *** 8192)',
        time: '12 min ago',
        type: 'Suspected Falsification & Adulteration',
        product: 'Artemether/Lumefantrine · Batch AL-77209',
        message: 'Good afternoon NAFDAC, I bought this coartem from a chemist in Sabon Gari market, Kano. When I opened the blister foil, the tablets crumbled to yellow powder and smelled strongly of kerosene. Batch on pack is AL-77209.',
        urgency: 'Critical',
        urgencyClass: 'tag-accent-2',
        triageRoute: 'ESCALATED TO NAFDAC KANO STATE SURVEILLANCE & ENFORCEMENT UNIT',
        confidence: 'NLP Classifier: 97.4% High-Confidence Anomaly',
        batch: 'AL-77209',
        reviewed: false,
      },
      {
        id: 'REP-002',
        reporter: 'Community Health Worker (Giwa, Kaduna)',
        channel: 'SMS (+234 812 *** 3341)',
        time: '45 min ago',
        type: 'Extreme Price Spiking & Shortage',
        product: 'Human Insulin 100IU/ml',
        message: 'Insulin completely stocked out at Giwa Primary Health Center. 8 juvenile patients waiting. Local chemist quoted ₦11,500 per vial (3× price). Please dispatch emergency buffer.',
        urgency: 'High',
        urgencyClass: 'tag-accent-2',
        triageRoute: 'ROUTED TO FEDERAL MINISTRY OF HEALTH BUFFER STABILIZATION',
        confidence: 'NLP Classifier: 94.2% Supply Shock Detection',
        batch: 'INS-1120',
        reviewed: false,
      },
      {
        id: 'REP-003',
        reporter: 'GreenLife Pharmacy (Wuse II, Abuja)',
        channel: 'WelliVerify App Incident',
        time: '2 hours ago',
        type: 'Cold Chain Storage Excursion',
        product: 'Oxytocin injection · Batch OXY-1188',
        message: 'Received shipping container with condensation on inner ampoule foil. Digital temperature tag was disconnected during transit from Lagos.',
        urgency: 'Medium',
        urgencyClass: 'tag-accent',
        triageRoute: 'ROUTED TO NAFDAC POST-MARKETING SURVEILLANCE DIRECTORATE',
        confidence: 'NLP Classifier: 91.8% Physical Storage Excursion',
        batch: 'OXY-1188',
        reviewed: false,
      },
    ];

    // 9. KYB VERIFICATION QUEUE
    this.kybQueue = [
      { id: 'KYB-01', name: 'Northstar Medical Devices Ltd.', type: 'Importer', submitted: '3 days ago', status: 'PENDING' },
      { id: 'KYB-02', name: 'Zenith Diagnostics Lab', type: 'Laboratory', submitted: '5 days ago', status: 'PENDING' },
    ];

    // 10. LABORATORY QUALITY CONTROL & CHEMICAL ASSAYS
    this.assays = [
      {
        id: 'ASSAY-001',
        coaId: 'COA-2026-NAFDAC-0981',
        batchId: 'AL-240981',
        productName: 'Artemether / Lumefantrine 80/480mg',
        labOfficer: 'Tunji Adewale (Reg. LAB-33021)',
        facility: 'Zenith Diagnostics Reference Laboratory, Lagos',
        testDate: '2026-09-20',
        method: 'Reversed-Phase High-Performance Liquid Chromatography (RP-HPLC)',
        apiAssayPercentage: 99.2,
        specificationRange: '95.0% - 105.0% (USP / BP)',
        dissolutionRate: '88.4% at 45 min (Spec: >80%)',
        foreignSubstances: 'None detected',
        status: 'PASSED',
        sealClass: 'tag-accent',
        retentionPeakMin: 4.2,
        conclusion: 'Sample conforms to British Pharmacopoeia (BP 2025) monograph standards.',
      },
      {
        id: 'ASSAY-002',
        coaId: 'COA-2026-NAFDAC-0982-FAIL',
        batchId: 'AL-77209',
        productName: 'Artemether / Lumefantrine (Seized Field Sample)',
        labOfficer: 'Tunji Adewale (Reg. LAB-33021)',
        facility: 'Zenith Diagnostics Reference Laboratory, Lagos',
        testDate: '2026-09-24',
        method: 'RP-HPLC + Gas Chromatography-Mass Spectrometry (GC-MS)',
        apiAssayPercentage: 0.0,
        specificationRange: '95.0% - 105.0% (USP / BP)',
        dissolutionRate: '0% (Disintegrates into immiscible oil emulsion)',
        foreignSubstances: 'Toxic industrial kerosene solvent residue (4.2 mg/g) + maize starch binder',
        status: 'FAILED_LETHAL_ADULTERANT',
        sealClass: 'tag-accent-2',
        retentionPeakMin: 0.0,
        conclusion: 'DANGEROUS FALSIFICATION: 0% Active Ingredient detected. Contains toxic hydrocarbons.',
      },
    ];

    // 9. ESCROW CONTRACTS & SETTLEMENTS (WelliPay Engine)
    this.escrows = [
      {
        id: 'ESC-2026-901',
        contractNo: 'WPY-ESC-901-NG',
        buyerName: 'GreenLife Pharmacy (Wuse II)',
        buyerRole: 'pharmacist',
        sellerName: 'Northgate Distribution Ltd.',
        sellerRole: 'distributor',
        productName: 'Artemether / Lumefantrine 80/480mg',
        batchId: 'AL-240981',
        units: 50,
        unitPrice: 2400,
        totalAmount: 120000,
        currency: 'NGN',
        status: 'INSPECTION_PASSED',
        createdAt: '2026-02-14T09:30:00.000Z',
        milestones: {
          orderPlaced: { done: true, timestamp: '2026-02-14T09:30:00.000Z' },
          inTransit: { done: true, timestamp: '2026-02-15T11:00:00.000Z' },
          barcodeVerified: { done: true, timestamp: '2026-02-16T14:10:00.000Z' },
          coldChainVerified: { done: true, reading: 'Ambient compliant (24.2°C)' },
          fundsReleased: { done: false, releasedAt: null, txHash: null }
        },
        escrowLedgerHash: 'a718b2c4d9e0f123456789abcdef0123456789abcdef0123456789abcdef0123',
      },
      {
        id: 'ESC-2026-902',
        contractNo: 'WPY-ESC-902-NG',
        buyerName: 'Zenith Pharmacy & Clinics, Lagos',
        buyerRole: 'pharmacist',
        sellerName: 'Northgate Distribution Ltd.',
        sellerRole: 'distributor',
        productName: 'Human Insulin 100IU/ml (rDNA)',
        batchId: 'INS-1120',
        units: 20,
        unitPrice: 8900,
        totalAmount: 178000,
        currency: 'NGN',
        status: 'HELD_IN_ESCROW',
        createdAt: '2026-02-18T10:15:00.000Z',
        milestones: {
          orderPlaced: { done: true, timestamp: '2026-02-18T10:15:00.000Z' },
          inTransit: { done: true, timestamp: '2026-02-19T08:00:00.000Z' },
          barcodeVerified: { done: false, timestamp: null },
          coldChainVerified: { done: false, reading: 'Logger active: 4.8°C' },
          fundsReleased: { done: false, releasedAt: null, txHash: null }
        },
        escrowLedgerHash: 'b829c3d4e0f1a23456789abcdef0123456789abcdef0123456789abcdef0456',
      },
      {
        id: 'ESC-2026-903',
        contractNo: 'WPY-ESC-903-NG',
        buyerName: 'CityMeds Pharmacy (Garki, Abuja)',
        buyerRole: 'pharmacist',
        sellerName: 'Meridian Imports & Logistics',
        sellerRole: 'distributor',
        productName: 'Artemether / Lumefantrine (Falsified Lot)',
        batchId: 'AL-77209',
        units: 100,
        unitPrice: 2400,
        totalAmount: 240000,
        currency: 'NGN',
        status: 'REFUNDED_CONTAMINATED',
        createdAt: '2026-01-20T08:00:00.000Z',
        milestones: {
          orderPlaced: { done: true, timestamp: '2026-01-20T08:00:00.000Z' },
          inTransit: { done: true, timestamp: '2026-01-21T10:00:00.000Z' },
          barcodeVerified: { done: false, timestamp: null, error: 'Counterfeit Cloned Serial' },
          coldChainVerified: { done: false, reading: 'Failed inspection' },
          fundsReleased: { done: false, releasedAt: null, refundTxHash: '0x99281a772cdef109' }
        },
        escrowLedgerHash: 'c930d4e1f2a3b456789abcdef0123456789abcdef0123456789abcdef0789',
      },
    ];

    // 10. HMO CLAIMS & CO-PAY ADJUDICATIONS
    this.hmoClaims = [
      {
        id: 'HMO-8812',
        claimNo: 'CLM-HYG-2026-8812',
        hmoProvider: 'Hygeia HMO',
        policyNo: 'HYG-POL-9921',
        patientName: 'Ngozi Bello',
        patientPhone: '080 123 4567',
        pharmacyName: 'GreenLife Pharmacy (Wuse II)',
        productName: 'Artemether / Lumefantrine 80/480mg',
        batchId: 'AL-240981',
        totalAmount: 2400,
        hmoRate: 80,
        hmoAmount: 1920,
        patientCoPay: 480,
        currency: 'NGN',
        status: 'ADJUDICATED_SETTLED',
        settledAt: '2026-02-16T14:15:00.000Z',
        txHash: '0x7a8b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b',
        notes: 'Instant claim payout upon authentic GS1 DataMatrix scan confirmation.',
      },
      {
        id: 'HMO-8813',
        claimNo: 'CLM-AXA-2026-8813',
        hmoProvider: 'AXA Mansard Health',
        policyNo: 'AXA-POL-4410',
        patientName: 'Chima Eze',
        patientPhone: '081 234 5678',
        pharmacyName: 'Wellcare Pharmacy (Wuse II)',
        productName: 'Metformin 500mg',
        batchId: 'MTF-3302',
        totalAmount: 3300,
        hmoRate: 85,
        hmoAmount: 2805,
        patientCoPay: 495,
        currency: 'NGN',
        status: 'ADJUDICATED_SETTLED',
        settledAt: '2026-02-17T11:40:00.000Z',
        txHash: '0x8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c',
        notes: 'Dispensed through automated eligibility clearinghouse.',
      },
      {
        id: 'HMO-8814',
        claimNo: 'CLM-REL-2026-8814',
        hmoProvider: 'Reliance HMO',
        policyNo: 'REL-POL-1092',
        patientName: 'Amina Danjuma',
        patientPhone: '080 345 6789',
        pharmacyName: 'CityMeds Pharmacy (Garki)',
        productName: 'Amoxicillin Trihydrate 500mg',
        batchId: 'AMX-9931',
        totalAmount: 1850,
        hmoRate: 80,
        hmoAmount: 1480,
        patientCoPay: 370,
        currency: 'NGN',
        status: 'PENDING_DISPENSE',
        settledAt: null,
        txHash: null,
        notes: 'Pre-authorized benefit. Awaiting patient verification scan at dispensary.',
      },
    ];

    // 11. SUPPLY CHAIN JOURNEY SIMULATION STATE
    this.simulationJourney = {
      step: 1,
      maxSteps: 6,
      batchId: 'AL-2026-SIM',
      productName: 'Artemether / Lumefantrine 80/480mg',
      anomalyActive: false,
      anomalyType: null,
      history: [],
    };

    // Seed initial ledger events
    this.seedLedger();
  }

  seedLedger() {
    // Seed Coartem Batch AL-240981 provenance
    ledger.recordEvent({
      eventType: 'BATCH_RELEASE_MFG',
      who: 'Novartis Quality Release Officer (Licence QA-902)',
      what: 'Artemether/Lumefantrine 80/480mg · Batch AL-240981 (15,000 packs)',
      where: 'Novartis Manufacturing Facility, Basel',
      when: '2025-09-01T08:00:00.000Z',
      fromWhom: 'Novartis Production Line 4',
      toWhom: 'Genevith Healthcare Export Logistics',
      why: 'Factory Batch Certification & Serialization Tagging',
      status: 'CONFIRMED_COMPLIANT',
      metadata: { batch: 'AL-240981', nafdacReg: 'A4-0231' },
    });

    ledger.recordEvent({
      eventType: 'CUSTOMS_IMPORT_CLEARANCE',
      who: 'NAFDAC Port Inspection Officer (Badge NAF-772)',
      what: 'Consignment Import Lot · Batch AL-240981',
      where: 'Apapa Seaport Terminal C, Lagos',
      when: '2025-10-12T14:20:00.000Z',
      fromWhom: 'Genevith Shipping Vessel MV Atlantic Star',
      toWhom: 'Meridian Imports & Logistics (Licence IMP-0941)',
      why: 'Port of Entry Sampling & Clean Bill of Inspection',
      status: 'CONFIRMED_CUSTOMS_RELEASE',
      metadata: { batch: 'AL-240981', portEntry: 'NG-APP' },
    });

    ledger.recordEvent({
      eventType: 'DISTRIBUTION_DISPATCH',
      who: 'Meridian Logistics Lead (Operator ML-102)',
      what: 'Lot AL-240981 (5,000 units)',
      where: 'Meridian Warehouse 2, Apapa, Lagos',
      when: '2025-10-18T10:00:00.000Z',
      fromWhom: 'Meridian Imports & Logistics',
      toWhom: 'Northgate Distribution Ltd. (Licence DIS-4012)',
      why: 'Domestic Primary Distribution Handshake',
      status: 'CONFIRMED_IN_TRANSIT',
      metadata: { batch: 'AL-240981', reeferTruck: 'KJA-882-XA' },
    });

    ledger.recordEvent({
      eventType: 'RETAIL_RECEIVING',
      who: 'Supervising Pharmacist Chidinma Okafor (PCN-08217743)',
      what: 'Lot AL-240981 (100 units)',
      where: 'GreenLife Pharmacy, Wuse II, Abuja',
      when: '2025-10-25T16:45:00.000Z',
      fromWhom: 'Northgate Regional Courier',
      toWhom: 'GreenLife Pharmacy Dispensary Storage',
      why: 'Pharmacy Inventory Ingestion Scan',
      status: 'CONFIRMED_IN_STOCK',
      metadata: { batch: 'AL-240981', facility: 'GreenLife Wuse II' },
    });
  }

  // Lookup helper
  findProductByCode(code) {
    const clean = (code || '').trim().toUpperCase();
    // Check by serial
    const serialMatch = this.serials.find(s => s.serial.toUpperCase() === clean || s.gs1DataMatrix.includes(clean));
    if (serialMatch) {
      const batch = this.batches.find(b => b.batchId === serialMatch.batchId);
      const product = this.products.find(p => p.id === serialMatch.productId);
      return { product, batch, serial: serialMatch };
    }

    // Check by batch
    const batchMatch = this.batches.find(b => b.batchId.toUpperCase() === clean);
    if (batchMatch) {
      const product = this.products.find(p => p.id === batchMatch.productId);
      return { product, batch: batchMatch, serial: null };
    }

    // Check by NAFDAC Reg or Product Name
    const productMatch = this.products.find(p =>
      p.nafdacRegNo.toUpperCase() === clean ||
      p.name.toUpperCase().includes(clean) ||
      p.brandName.toUpperCase().includes(clean)
    );
    if (productMatch) {
      const batch = this.batches.find(b => b.productId === productMatch.id);
      return { product: productMatch, batch, serial: null };
    }

    return null;
  }

  // --- TIER 2: MANUFACTURER SERIALIZATION STUDIO ---
  generateBulkSerials({
    gtin = '06151412098124',
    batchId = 'AL-2026-EXP',
    expDate = '2027-12-31',
    count = 8,
    manufacturer = 'Chi Pharmaceuticals Ltd. / Genevith',
    productName = 'Artemether / Lumefantrine 80/480mg',
    productId = 'PROD-AL-01'
  }) {
    const generated = [];
    const expFormatted = expDate.replace(/-/g, '').slice(2); // YYMMDD

    for (let i = 1; i <= count; i++) {
      const randHex = crypto.randomBytes(4).toString('hex').toUpperCase();
      const serial = `WV-${randHex.slice(0, 4)}-${randHex.slice(4)}`;
      const cleanSerial = serial.replace(/-/g, '');
      const gs1DataMatrix = `(01)${gtin}(17)${expFormatted}(10)${batchId}(21)${cleanSerial}`;
      
      const mac = crypto.createHmac('sha256', 'WELLIVERIFY_NATIONAL_ROOT_KEY_2026')
        .update(`${gtin}:${batchId}:${cleanSerial}`)
        .digest('hex').slice(0, 16).toUpperCase();

      const serialRecord = {
        serial,
        cleanSerial,
        gtin,
        gs1DataMatrix,
        batchId,
        productId,
        productName,
        manufacturer,
        expDate,
        cryptoMac: mac,
        status: 'ACTIVE',
        scansCount: 0,
        locations: ['Packaging Studio Production Line 1'],
        reuseFlag: false,
        createdAt: new Date().toISOString(),
      };

      this.serials.push(serialRecord);
      generated.push(serialRecord);
    }

    // Ensure batch exists in DB
    let batch = this.batches.find(b => b.batchId === batchId);
    if (!batch) {
      batch = {
        batchId,
        productId,
        productName,
        mfgDate: new Date().toISOString().split('T')[0],
        expDate,
        initialUnits: count * 1000,
        remainingUnits: count * 1000,
        status: 'VERIFIED_PRISTINE',
        anomalyNote: 'Factory GS1 serialization packaging run verified intact',
        isRecalled: false,
      };
      this.batches.unshift(batch);
    }

    // Record on Ledger
    const block = ledger.recordEvent({
      eventType: 'GS1_SERIALIZATION_BATCH',
      who: `Packaging Lead (${manufacturer})`,
      what: `Generated ${count} GS1 DataMatrix Serials for Lot ${batchId}`,
      where: 'Factory Serialization Terminal, Ikeja, Lagos',
      when: new Date().toISOString(),
      fromWhom: manufacturer,
      toWhom: 'NAFDAC GS1 Central Registry & WelliVerify Gateway',
      why: 'Batch Serialization & Anti-Counterfeit Verification Tagging',
      status: 'ISSUED_AND_ANCHORED',
      metadata: {
        batchId,
        count,
        gtin,
        startSerial: generated[0].serial,
        endSerial: generated[generated.length - 1].serial,
      }
    });

    return {
      batchId,
      gtin,
      expDate,
      count,
      serials: generated,
      ledgerHash: block.hash,
    };
  }

  // --- TIER 2: WELLIPAY B2B ESCROW & SETTLEMENT ENGINE ---
  createEscrow({
    buyerName = 'GreenLife Pharmacy (Wuse II)',
    buyerRole = 'pharmacist',
    sellerName = 'Northgate Distribution Ltd.',
    sellerRole = 'distributor',
    productName = 'Artemether / Lumefantrine 80/480mg',
    batchId = 'AL-240981',
    units = 100,
    unitPrice = 2400,
    currency = 'NGN'
  }) {
    const id = `ESC-2026-${Math.floor(100 + Math.random() * 900)}`;
    const contractNo = `WPY-${id}-NG`;
    const totalAmount = Number(units) * Number(unitPrice);

    const newEscrow = {
      id,
      contractNo,
      buyerName,
      buyerRole,
      sellerName,
      sellerRole,
      productName,
      batchId,
      units: Number(units),
      unitPrice: Number(unitPrice),
      totalAmount,
      currency,
      status: 'HELD_IN_ESCROW',
      createdAt: new Date().toISOString(),
      milestones: {
        orderPlaced: { done: true, timestamp: new Date().toISOString() },
        inTransit: { done: false, timestamp: null },
        barcodeVerified: { done: false, timestamp: null },
        coldChainVerified: { done: false, reading: 'Pending inspection' },
        fundsReleased: { done: false, releasedAt: null, txHash: null }
      },
      escrowLedgerHash: null,
    };

    const block = ledger.recordEvent({
      eventType: 'ESCROW_CONTRACT_CREATED',
      who: `${buyerName} (${buyerRole})`,
      what: `Escrow Lock ₦${totalAmount.toLocaleString()} for ${units} units of ${productName}`,
      where: 'WelliPay Smart Settlement Clearinghouse (Lagos Gateway)',
      when: new Date().toISOString(),
      fromWhom: buyerName,
      toWhom: 'WelliPay Trust Custody Vault',
      why: 'B2B Wholesale Milestone-Locked Supply Agreement',
      status: 'ESCROW_FUNDS_LOCKED',
      metadata: { contractNo, totalAmount, batchId, units }
    });

    newEscrow.escrowLedgerHash = block.hash;
    this.escrows.unshift(newEscrow);
    return newEscrow;
  }

  releaseEscrow(id, releasedBy = 'Supervising Pharmacist Chidinma Okafor') {
    const escrow = this.escrows.find(e => e.id === id || e.contractNo === id);
    if (!escrow) return null;

    escrow.status = 'RELEASED';
    escrow.milestones.barcodeVerified.done = true;
    escrow.milestones.barcodeVerified.timestamp = new Date().toISOString();
    escrow.milestones.coldChainVerified.done = true;
    escrow.milestones.coldChainVerified.reading = 'Temperature and packaging verified compliant';
    escrow.milestones.fundsReleased.done = true;
    escrow.milestones.fundsReleased.releasedAt = new Date().toISOString();

    const block = ledger.recordEvent({
      eventType: 'ESCROW_FUNDS_RELEASED',
      who: releasedBy,
      what: `Settlement Payout ₦${escrow.totalAmount.toLocaleString()} to ${escrow.sellerName}`,
      where: 'WelliPay Automated Settlement Network',
      when: new Date().toISOString(),
      fromWhom: 'WelliPay Trust Custody Vault',
      toWhom: escrow.sellerName,
      why: 'Physical Verification & Authenticity Handshake Passed',
      status: 'SETTLED_SUCCESS',
      metadata: {
        contractNo: escrow.contractNo,
        payoutAmount: escrow.totalAmount,
        currency: escrow.currency,
        beneficiary: escrow.sellerName,
      }
    });

    escrow.milestones.fundsReleased.txHash = block.hash;
    return { escrow, block };
  }

  refundEscrow(id, reason = 'Batch Quarantined / Contamination Detected') {
    const escrow = this.escrows.find(e => e.id === id || e.contractNo === id);
    if (!escrow) return null;

    escrow.status = 'REFUNDED_CONTAMINATED';
    escrow.milestones.fundsReleased.done = false;
    escrow.refundReason = reason;

    const block = ledger.recordEvent({
      eventType: 'ESCROW_FUNDS_REFUNDED',
      who: 'WelliVerify Autonomous Integrity Guard',
      what: `Escrow Refund ₦${escrow.totalAmount.toLocaleString()} reversed to ${escrow.buyerName}`,
      where: 'WelliPay Clearinghouse',
      when: new Date().toISOString(),
      fromWhom: 'WelliPay Trust Custody Vault',
      toWhom: escrow.buyerName,
      why: `Adulteration / Counterfeit Detection: ${reason}`,
      status: 'REVERSED_REFUND_COMPLETED',
      metadata: {
        contractNo: escrow.contractNo,
        refundAmount: escrow.totalAmount,
        buyer: escrow.buyerName,
        reason,
      }
    });

    escrow.milestones.fundsReleased.refundTxHash = block.hash;
    return { escrow, block };
  }

  // --- TIER 2: HMO CLAIMS ADJUDICATION ---
  adjudicateHmo({
    hmoProvider = 'Hygeia HMO',
    policyNo = 'HYG-POL-9921',
    patientName = 'Ngozi Bello',
    patientPhone = '080 123 4567',
    pharmacyName = 'GreenLife Pharmacy (Wuse II)',
    productName = 'Artemether / Lumefantrine 80/480mg',
    batchId = 'AL-240981',
    totalAmount = 2400,
    hmoRate = 80,
  }) {
    const claimId = `HMO-${Math.floor(1000 + Math.random() * 9000)}`;
    const claimNo = `CLM-${hmoProvider.slice(0, 3).toUpperCase()}-2026-${claimId.split('-')[1]}`;
    const hmoAmount = Math.round(Number(totalAmount) * (Number(hmoRate) / 100));
    const patientCoPay = Number(totalAmount) - hmoAmount;

    const claim = {
      id: claimId,
      claimNo,
      hmoProvider,
      policyNo,
      patientName,
      patientPhone,
      pharmacyName,
      productName,
      batchId,
      totalAmount: Number(totalAmount),
      hmoRate: Number(hmoRate),
      hmoAmount,
      patientCoPay,
      currency: 'NGN',
      status: 'ADJUDICATED_SETTLED',
      settledAt: new Date().toISOString(),
      txHash: null,
      notes: 'Real-time co-pay clearance triggered by verified authentic medication scan.',
    };

    const block = ledger.recordEvent({
      eventType: 'HMO_CLAIM_ADJUDICATION',
      who: `${hmoProvider} Automated Claims Clearinghouse`,
      what: `Adjudication for ${patientName}: HMO Paid ₦${hmoAmount.toLocaleString()} (Co-pay ₦${patientCoPay.toLocaleString()})`,
      where: 'National Healthcare Claims Gateway',
      when: new Date().toISOString(),
      fromWhom: hmoProvider,
      toWhom: pharmacyName,
      why: 'Authentic Medicine Point-of-Sale Dispensing Verification',
      status: 'CLAIM_DISBURSED',
      metadata: {
        claimNo,
        policyNo,
        productName,
        batchId,
        hmoAmount,
        patientCoPay,
      }
    });

    claim.txHash = block.hash;
    this.hmoClaims.unshift(claim);
    return { claim, block };
  }

  // --- TIER 2: MULTI-PARTY SUPPLY CHAIN JOURNEY SIMULATOR ---
  runSimulationStep(step, anomaly = false) {
    const s = Number(step);
    this.simulationJourney.step = s;
    this.simulationJourney.anomalyActive = anomaly;

    let stepInfo = {};
    if (s === 1) {
      stepInfo = {
        step: 1,
        title: 'Step 1: Manufacturer Serialization & QC Lab Release',
        actor: 'Novartis / Genevith Healthcare (Basel / Ikeja)',
        role: 'Manufacturer',
        action: 'Batch AL-2026-SIM serialized with 10,000 GS1 DataMatrix packs. QC High-Performance Liquid Chromatography (RP-HPLC) passed at 99.1% API purity.',
        location: 'Factory Packaging Terminal, Ikeja',
        cryptographicProof: 'CoA #COA-2026-NAFDAC-8812 anchored to Sovereign Ledger',
        escrowStatus: 'Escrow Contract Initialized (Pending Milestone 1)',
        anomaly: false,
      };
    } else if (s === 2) {
      stepInfo = {
        step: 2,
        title: 'Step 2: Customs Port of Entry & NAFDAC Regulatory Clearance',
        actor: 'NAFDAC Port Inspection Unit (Officer Amina Yusuf)',
        role: 'Regulator',
        action: 'Import container seal verified intact. Physical sampling matches central registration A4-0231. Electronic clean bill of inspection issued.',
        location: 'Apapa Seaport Terminal C, Lagos',
        cryptographicProof: 'NAFDAC Customs Release Block #04921',
        escrowStatus: 'Transit Release Authorized',
        anomaly: false,
      };
    } else if (s === 3) {
      if (anomaly) {
        stepInfo = {
          step: 3,
          title: 'Step 3: Cold-Chain Logistics & Transit Tracking [ANOMALY DETECTED]',
          actor: 'Northgate Distribution Cold-Chain Logistics',
          role: 'Distributor',
          action: 'CRITICAL ALERT: Reefer truck refrigeration compressor failure. Temperature spiked to 14.8°C for 52 minutes (Exceeded 2-8°C limit).',
          location: 'En-route Lagos → Abuja Highway (Km 42 Lokoja)',
          cryptographicProof: 'IoT Thermal Telemetry Excursion Flagged on Ledger',
          escrowStatus: 'ESCROW AUTO-LOCKED: Payout Halted due to Thermal Degradation',
          anomaly: true,
          alertLevel: 'CRITICAL_QUARANTINE',
        };
      } else {
        stepInfo = {
          step: 3,
          title: 'Step 3: Cold-Chain Logistics & Transit Tracking',
          actor: 'Northgate Distribution Fleet (Reefer Truck KJA-882-XA)',
          role: 'Distributor',
          action: 'IoT logger reports steady 4.2°C ambient reefer temp across 420km transit. GPS custody chain validated at all transit toll plazas.',
          location: 'Northgate Central Depot, Kaduna / Abuja Transit',
          cryptographicProof: 'Continuously signed IoT telemetry proof (Hash: 0x918a...22)',
          escrowStatus: 'Milestone 2 (Logistics In-Transit) Complete',
          anomaly: false,
        };
      }
    } else if (s === 4) {
      if (anomaly) {
        stepInfo = {
          step: 4,
          title: 'Step 4: Retail Pharmacy Ingestion Scan [QUARANTINED]',
          actor: 'GreenLife Pharmacy (Chidinma Okafor, PCN-08217743)',
          role: 'Pharmacist',
          action: 'Pharmacist camera scan flags package: Temperature excursion during transit recorded. Packaging quarantined in holding vault.',
          location: 'GreenLife Pharmacy, Wuse II, Abuja',
          cryptographicProof: 'Quarantine Action Broadcasted to NAFDAC Surveillance Network',
          escrowStatus: 'ESCROW REFUNDED TO PHARMACY: Northgate Payout Blocked',
          anomaly: true,
        };
      } else {
        stepInfo = {
          step: 4,
          title: 'Step 4: Retail Pharmacy Ingestion Scan & Goods Receipt',
          actor: 'GreenLife Pharmacy (Chidinma Okafor, PCN-08217743)',
          role: 'Pharmacist',
          action: 'Pharmacist scans 2D DataMatrix on mobile app. Ledger validates lot origin, expiry 2027, and pristine cold-chain. Batch added to active dispensary.',
          location: 'GreenLife Pharmacy, Wuse II, Abuja',
          cryptographicProof: 'Pharmacist Practice License PCN-08217743 Cryptographic Signature',
          escrowStatus: 'Inspection Passed: WelliPay Escrow Ready for Release',
          anomaly: false,
        };
      }
    } else if (s === 5) {
      stepInfo = {
        step: 5,
        title: 'Step 5: Patient Dispensing & Consumer Authenticity Verification',
        actor: 'Patient Ngozi Bello (Patient ID PT-55291)',
        role: 'Patient',
        action: 'Patient scans medication QR at dispensary counter. App flashes Green Confirmed Genuine Shield. Hygeia HMO co-pay 80% automatically applied.',
        location: 'Dispensary Counter, GreenLife Wuse II',
        cryptographicProof: 'End-Consumer Authentic De-commissioning Event Registered',
        escrowStatus: 'HMO Claim Settled: ₦1,920 Paid by Hygeia / ₦480 Patient Co-Pay',
        anomaly: false,
      };
    } else if (s === 6) {
      stepInfo = {
        step: 6,
        title: 'Step 6: Smart Settlement & Automated Escrow Ledger Remittance',
        actor: 'WelliPay Sovereign Clearinghouse Engine',
        role: 'Automated Clearinghouse',
        action: 'All 5 verification conditions satisfied. Escrow vault releases ₦120,000 to Northgate Distribution. Pharmacist receives ₦1,920 HMO reimbursement.',
        location: 'WelliPay Automated Settlement Network, Lagos',
        cryptographicProof: 'Remittance Block Anchored to Immutable National Trust Chain',
        escrowStatus: 'TRANSACTION FULLY SETTLED & REMITTED',
        anomaly: false,
      };
    }

    // Anchor on ledger
    const block = ledger.recordEvent({
      eventType: `SIMULATION_STEP_${s}`,
      who: stepInfo.actor,
      what: stepInfo.title,
      where: stepInfo.location,
      when: new Date().toISOString(),
      fromWhom: stepInfo.role,
      toWhom: 'WelliVerify Sovereign Simulation Mesh',
      why: 'Multi-Party Supply Chain Journey Step Verification',
      status: anomaly ? 'ANOMALY_HALTED' : 'STEP_VERIFIED_SUCCESS',
      metadata: stepInfo,
    });

    stepInfo.txHash = block.hash;
    this.simulationJourney.history.push(stepInfo);
    return stepInfo;
  }

  resetSimulation() {
    this.simulationJourney = {
      step: 1,
      maxSteps: 6,
      batchId: 'AL-2026-SIM',
      productName: 'Artemether / Lumefantrine 80/480mg',
      anomalyActive: false,
      anomalyType: null,
      history: [],
    };
    return this.simulationJourney;
  }
}

export const db = new WelliVerifyDB();
