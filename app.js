/**
 * WelliVerify Mobile App Interactive Prototype
 * Production-ready standalone web implementation
 * 5-Role Pharmaceutical Supply-Chain Trust & Verification Platform
 */

(() => {
  'use strict';

  // --- SVG Icons (Phosphor Duotone Style) ---
  const ICONS = {
    arrowRight: `<svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor"><path opacity="0.25" d="M216,128l-72,72V56Z"/><path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z"/></svg>`,
    arrowLeft: `<svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" style="transform:scaleX(-1)"><path opacity="0.25" d="M216,128l-72,72V56Z"/><path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z"/></svg>`,
    menu: `<svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path opacity="0.25" d="M40 64h176v32H40zM40 160h176v32H40z"/><path d="M216,56H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,88H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,88H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"/></svg>`,
    bell: `<svg width="15" height="15" viewBox="0 0 256 256" fill="currentColor"><path opacity="0.25" d="M208,192H48a8,8,0,01-6.4-12.8C52,164.4,56,147.4,56,120a72,72,0,01144,0c0,27.4,4,44.4,14.4,59.2A8,8,0,01208,192Z"/><path d="M216,192.7c-9.5-13.4-14.3-27.8-14.3-72.7a73.9,73.9,0,00-56-71.8V40a8,8,0,00-16,0v8.2A73.9,73.9,0,0074,120c0,44.9-4.8,59.3-14.3,72.7A8,8,0,0064,208H98.4a30,30,0,0059.2,0H192A8,8,0,00216,192.7ZM128,224a14,14,0,01-13.9-16h27.8A14,14,0,01128,224Zm-63.5-32C74.4,177.4,78,159.4,78,120a58,58,0,01100,0c0,39.4,3.6,57.4,13.5,72Z"/></svg>`,
    scan: `<svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor"><path opacity="0.25" d="M194.82,151.43l-55.09,20.3-20.3,55.09a7.92,7.92,0,0,1-14.86,0l-20.3-55.09-55.09-20.3a7.92,7.92,0,0,1,0-14.86l55.09-20.3,20.3-55.09a7.92,7.92,0,0,1,14.86,0l20.3,55.09,55.09,20.3A7.92,7.92,0,0,1,194.82,151.43Z"/><path d="M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88Z"/></svg>`,
    mic: `<svg width="26" height="26" viewBox="0 0 256 256" fill="currentColor"><path opacity="0.25" d="M176 56v72a48 48 0 01-96 0V56a48 48 0 0196 0z"/><path d="M128,176a56.06,56.06,0,0,0,56-56V64a56,56,0,0,0-112,0v56A56.06,56.06,0,0,0,128,176ZM88,64a40,40,0,0,1,80,0v56a40,40,0,0,1-80,0Zm104,56a8,8,0,0,0-16,0,48,48,0,0,1-96,0,8,8,0,0,0-16,0,64.07,64.07,0,0,0,56,63.5V208H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V183.5A64.07,64.07,0,0,0,192,120Z"/></svg>`,
    check: `<svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"/></svg>`,
    close: `<svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/></svg>`,
    shieldCheck: `<svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path opacity="0.25" d="M208,56H48A16,16,0,0,0,32,72v48c0,72,80,108,96,114.7,16-6.7,96-42.7,96-114.7V72A16,16,0,0,0,208,56Z"/><path d="M208,48H48A24,24,0,0,0,24,72v48c0,80,88,120,100,125a8,8,0,0,0,7.9,0c12-5,100-45,100-125V72A24,24,0,0,0,208,48Zm8,72c0,67.8-73.3,103.4-88,109.8C113.3,223.4,40,187.8,40,120V72a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8Zm-42.34-21.66a8,8,0,0,0-11.32,0L112,148.69l-18.34-18.35a8,8,0,0,0-11.32,11.32l24,24a8,8,0,0,0,11.32,0l56-56A8,8,0,0,0,173.66,98.34Z"/></svg>`,
    sparkle: `<svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor"><path opacity="0.25" d="M208,128a80,80,0,0,1-80,80,80,80,0,0,1-80-80,80,80,0,0,1,80-80A80,80,0,0,1,208,128Z"/><path d="M213.66,122.34l-64-64a8,8,0,0,0-11.32,11.32L180.69,112H48a8,8,0,0,0,0,16H180.69l-42.35,42.34a8,8,0,0,0,11.32,11.32l64-64A8,8,0,0,0,213.66,122.34Z"/></svg>`,
  };

  // --- Initial Mock Data ---
  const INITIAL_DATA = {
    identities: {
      pharmacist: {
        name: 'Chidinma Okafor',
        meta: 'PCN-08217743 · GreenLife Pharmacy, Wuse II, Abuja',
        idLabel: 'PCN / practice licence no.',
        idValue: 'PCN-08217743',
        note: 'Signing in verifies your credential against the NAFDAC-linked pharmacist registry.',
      },
      patient: {
        name: 'Ngozi Bello',
        meta: 'Patient ID PT-55291 · Abuja',
        idLabel: 'Phone number',
        idValue: '080 123 4567',
        note: 'A one-time code confirms it’s really you.',
      },
      distributor: {
        name: 'ABC Pharmaceuticals Ltd.',
        meta: 'Licence DIS-2291 · Lagos, Nigeria',
        idLabel: 'Distributor licence no.',
        idValue: 'DIS-2291',
        note: 'Verified against NAFDAC distributor licensing records.',
      },
      regulator: {
        name: 'Amina Yusuf',
        meta: 'Badge REG-1042 · NAFDAC, Kaduna Zone',
        idLabel: 'Officer badge no.',
        idValue: 'REG-1042',
        note: 'Regulator access requires a valid NAFDAC field-office badge.',
      },
      lab: {
        name: 'Tunji Adewale',
        meta: 'LAB-33021 · Zenith Diagnostics Lab, Lagos',
        idLabel: 'Lab registration no.',
        idValue: 'LAB-33021',
        note: 'Verified against the laboratory registry.',
      },
    },

    inventory: [
      { name: 'Amoxicillin 500mg', batch: 'AMX-9931', qty: 62, days: 210 },
      { name: 'Paracetamol 500mg', batch: 'PC-4471', qty: 140, days: 340 },
      { name: 'Artemether/Lumefantrine', batch: 'AL-240981', qty: 24, days: 95 },
      { name: 'Insulin (Human)', batch: 'INS-1120', qty: 8, days: 21 },
      { name: 'Metformin 500mg', batch: 'MTF-3302', qty: 51, days: 260 },
    ],

    stockoutAlert: {
      title: 'Predictive Stockout Warning: Antimalarials',
      meta: 'Zonal Supply Disparity: 0.74 (Critical)',
      body: 'Forecast models project stockout across Abuja & Kaduna retail pharmacies within 4.8 days due to delayed Apapa port consignments. Public secondary health centers report 18% reserve.',
    },

    rebalanceRecommendation: {
      product: 'Artemether/Lumefantrine 20/120mg',
      sourceHub: 'Maitama General Hub Depot',
      sourceStock: '180 units (+60 days reserve)',
      targetBranch: 'GreenLife Pharmacy (Wuse II)',
      targetStock: '12 units (3.5 days coverage)',
      transferUnits: '80 units',
      distance: '3.2 km',
      eta: '~45 mins via WelliExpress Logistics',
    },

    fefoAlerts: [
      { name: 'Insulin (Human)', batch: 'INS-1120', level: 'HIGH', velocity: '1 unit', days: 8 },
      { name: 'Artemether/Lumefantrine', batch: 'AL-240981', level: 'MEDIUM', velocity: '5 units', days: 19 },
      { name: 'Amoxicillin 500mg', batch: 'AMX-9931', level: 'LOW', velocity: '3 units', days: 44 },
    ],

    recalls: [
      {
        title: 'Artemether/Lumefantrine',
        batch: 'AL-77209',
        severity: 'HIGH PRIORITY',
        status: 'Suspected falsification — Abuja, Kaduna, Kano',
        action: 'Quarantine remaining stock and report',
      },
      {
        title: 'Oxytocin injection',
        batch: 'OXY-1188',
        severity: 'MEDIUM',
        status: 'Cold-chain excursion during transit',
        action: 'Verify storage log before dispensing',
      },
    ],

    nearbyPharmacies: [
      { name: 'Wellcare Pharmacy', stock: '200 units', distance: '0.8 km', area: 'Wuse II, Abuja', verified: '12 min ago' },
      { name: 'CityMeds Pharmacy', stock: '45 units', distance: '1.4 km', area: 'Garki, Abuja', verified: '40 min ago' },
      { name: 'HealthPoint Pharmacy', stock: 'Unavailable', distance: '2.1 km', area: 'Utako, Abuja', verified: '2 hr ago' },
      { name: 'GreenLife Pharmacy', stock: '24 units', distance: '3.0 km', area: 'Wuse II, Abuja', verified: '5 min ago' },
    ],

    shipments: [
      { product: 'Artemether/Lumefantrine', batch: 'AL-240981', status: 'Delivered', route: 'Meridian Imports → Northgate Distribution → GreenLife Pharmacy' },
      { product: 'Oxytocin injection', batch: 'OXY-1188', status: 'In transit', route: 'Meridian Imports → Northgate Distribution → 6 facilities' },
      { product: 'Amoxicillin 500mg', batch: 'AMX-9931', status: 'Delivered', route: 'ABC Pharmaceuticals → 12 pharmacies, Lagos' },
    ],

    networkAlerts: [
      { product: 'Artemether/Lumefantrine', batch: 'AL-77209', severity: 'HIGH PRIORITY', locations: 'Abuja, Kaduna, Kano', action: 'Quarantine and report' },
      { product: 'Oxytocin injection', batch: 'OXY-1188', severity: 'MEDIUM', locations: 'Lagos', action: 'Verify cold-chain log' },
    ],

    priceRows: [
      { product: 'Amoxicillin 500mg', abuja: '₦1,850', lagos: '₦1,920', kano: '₦1,780', volatile: false },
      { product: 'Artemether/Lumefantrine', abuja: '₦2,400', lagos: '₦2,550', kano: '₦2,300', volatile: false },
      { product: 'Insulin (Human)', abuja: '₦8,900', lagos: '₦10,950', kano: '₦8,600', volatile: true, note: 'Abuja price 23% above 30-day median — flagged for review' },
    ],

    kybQueue: [
      { name: 'Northstar Medical Devices', type: 'Importer', submitted: '3 days ago' },
      { name: 'Zenith Diagnostics Lab', type: 'Laboratory', submitted: '5 days ago' },
    ],

    investigations: [
      { product: 'Artemether/Lumefantrine', serial: '8F72-92AA', status: 'Investigate', locations: 'Lagos, Kano, Kaduna', linkedCases: 2 },
      { product: 'Ciprofloxacin 500mg', serial: '3C10-77BE', status: 'Escalated', locations: 'Port Harcourt', linkedCases: 0 },
    ],

    coldChainShipments: [
      {
        product: 'Oxytocin injection',
        batch: 'OXY-1188',
        status: 'EXCEPTION',
        tagClass: 'tag-accent-2',
        temp: '2–8°C required',
        reading: 'Exceeded threshold for 43 min',
        action: 'QUARANTINE RECOMMENDED',
        readings: [
          { time: '08:00', temp: 5, flag: false },
          { time: '10:00', temp: 6, flag: false },
          { time: '12:00', temp: 9, flag: true },
          { time: '12:43', temp: 11, flag: true },
          { time: '14:00', temp: 5, flag: false },
        ],
      },
      {
        product: 'Measles vaccine',
        batch: 'MSL-6602',
        status: 'NORMAL',
        tagClass: 'tag-accent',
        temp: '2–8°C required',
        reading: 'Stable throughout transit',
        action: 'No action needed',
        readings: [
          { time: '08:00', temp: 4, flag: false },
          { time: '10:00', temp: 5, flag: false },
          { time: '12:00', temp: 5, flag: false },
          { time: '14:00', temp: 4, flag: false },
        ],
      },
      {
        product: 'Insulin (Human)',
        batch: 'INS-1120',
        status: 'NORMAL',
        tagClass: 'tag-accent',
        temp: '2–8°C required',
        reading: 'Stable throughout transit',
        action: 'No action needed',
        readings: [
          { time: '08:00', temp: 5, flag: false },
          { time: '10:00', temp: 6, flag: false },
          { time: '12:00', temp: 6, flag: false },
          { time: '14:00', temp: 5, flag: false },
        ],
      },
    ],

    labConsumables: [
      { name: 'Rapid Diagnostic Test (Malaria)', batch: 'RDT-2291', qty: 340, days: 60 },
      { name: 'PCR Test Kit', batch: 'PCR-7734', qty: 52, days: 18 },
      { name: 'Blood Collection Tubes', batch: 'BCT-1102', qty: 900, days: 210 },
      { name: 'Microbiology Culture Media', batch: 'MCM-4432', qty: 40, days: 9 },
    ],

    labAssays: [
      {
        id: 'ASSAY-001',
        coaId: 'COA-2026-NAFDAC-0981',
        batchId: 'AL-240981',
        productName: 'Artemether / Lumefantrine 80/480mg',
        labOfficer: 'Tunji Adewale (Reg. LAB-33021)',
        facility: 'Zenith Diagnostics Reference Laboratory, Lagos',
        testDate: '2026-09-20',
        method: 'Reversed-Phase HPLC (RP-HPLC)',
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
        method: 'RP-HPLC + GC-MS',
        apiAssayPercentage: 0.0,
        specificationRange: '95.0% - 105.0% (USP / BP)',
        dissolutionRate: '0% (Disintegrates into immiscible oil emulsion)',
        foreignSubstances: 'Toxic industrial kerosene solvent residue (4.2 mg/g) + maize starch binder',
        status: 'FAILED_LETHAL_ADULTERANT',
        sealClass: 'tag-accent-2',
        retentionPeakMin: 0.0,
        conclusion: 'DANGEROUS FALSIFICATION: 0% Active Ingredient detected. Contains toxic hydrocarbons.',
      },
    ],

    escrows: [
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
          orderPlaced: { done: true, timestamp: '14 Feb 09:30' },
          inTransit: { done: true, timestamp: '15 Feb 11:00' },
          barcodeVerified: { done: true, timestamp: '16 Feb 14:10' },
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
          orderPlaced: { done: true, timestamp: '18 Feb 10:15' },
          inTransit: { done: true, timestamp: '19 Feb 08:00' },
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
          orderPlaced: { done: true, timestamp: '20 Jan 08:00' },
          inTransit: { done: true, timestamp: '21 Jan 10:00' },
          barcodeVerified: { done: false, timestamp: null, error: 'Counterfeit Cloned Serial' },
          coldChainVerified: { done: false, reading: 'Failed inspection' },
          fundsReleased: { done: false, releasedAt: null, refundTxHash: '0x99281a772cdef109' }
        },
        escrowLedgerHash: 'c930d4e1f2a3b456789abcdef0123456789abcdef0123456789abcdef0789',
      },
    ],

    hmoClaims: [
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
        settledAt: '16 Feb 2026 14:15',
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
        settledAt: '17 Feb 2026 11:40',
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
    ],

    initialSerials: [
      {
        serial: 'WV-49A1-2091',
        cleanSerial: 'WV49A12091',
        gtin: '06151412098124',
        batchId: 'AL-2026-EXP',
        expDate: '2027-12-31',
        cryptoMac: 'A8B2C4E90F1122AA',
        gs1DataMatrix: '(01)06151412098124(17)271231(10)AL-2026-EXP(21)WV49A12091',
        productName: 'Artemether / Lumefantrine 80/480mg',
        status: 'ACTIVE',
      },
      {
        serial: 'WV-7B32-8804',
        cleanSerial: 'WV7B328804',
        gtin: '06151412098124',
        batchId: 'AL-2026-EXP',
        expDate: '2027-12-31',
        cryptoMac: 'F319617B19261AF0',
        gs1DataMatrix: '(01)06151412098124(17)271231(10)AL-2026-EXP(21)WV7B328804',
        productName: 'Artemether / Lumefantrine 80/480mg',
        status: 'ACTIVE',
      },
      {
        serial: 'WV-99C0-4102',
        cleanSerial: 'WV99C04102',
        gtin: '06151412098124',
        batchId: 'AL-2026-EXP',
        expDate: '2027-12-31',
        cryptoMac: '6A78395FA8AF92FE',
        gs1DataMatrix: '(01)06151412098124(17)271231(10)AL-2026-EXP(21)WV99C04102',
        productName: 'Artemether / Lumefantrine 80/480mg',
        status: 'ACTIVE',
      },
      {
        serial: 'WV-1E82-7744',
        cleanSerial: 'WV1E827744',
        gtin: '06151412098124',
        batchId: 'AL-2026-EXP',
        expDate: '2027-12-31',
        cryptoMac: '87F6226E27B9726E',
        gs1DataMatrix: '(01)06151412098124(17)271231(10)AL-2026-EXP(21)WV1E827744',
        productName: 'Artemether / Lumefantrine 80/480mg',
        status: 'ACTIVE',
      }
    ],

    // Tier 3: Regulatory Geospatial Hotspots & Incidents
    geoClusters: [
      {
        id: 'CLUSTER-KAN-01',
        city: 'Kano',
        hub: 'Sabon Gari Open Drug Market & Fagge',
        state: 'Kano State',
        region: 'North-West',
        lat: 12.0022,
        lng: 8.5920,
        mapTop: 22,
        mapLeft: 62,
        totalScans: 892,
        anomalyCount: 28,
        riskTier: 'CRITICAL',
        flaggedBatches: ['AL-77209', 'AMX-4412'],
        primaryAnomaly: 'Duplicate cloned barcodes scanned simultaneously with Lagos (+840km)',
        activeSeizuresCount: 1,
        inspectionTeamsDeployed: 3,
        lastIncidentAt: '12:15 today',
      },
      {
        id: 'CLUSTER-LOS-01',
        city: 'Lagos',
        hub: 'Idumota Drug Market & Alaba International',
        state: 'Lagos State',
        region: 'South-West',
        lat: 6.5244,
        lng: 3.3792,
        mapTop: 76,
        mapLeft: 18,
        totalScans: 3410,
        anomalyCount: 19,
        riskTier: 'HIGH',
        flaggedBatches: ['AL-77209', 'CIP-9901'],
        primaryAnomaly: 'Unregistered parallel import packaging detected at wholesale stalls',
        activeSeizuresCount: 1,
        inspectionTeamsDeployed: 4,
        lastIncidentAt: '11:40 today',
      },
      {
        id: 'CLUSTER-ONI-01',
        city: 'Onitsha',
        hub: 'Head Bridge International Pharmaceutical Market',
        state: 'Anambra State',
        region: 'South-East',
        lat: 6.1498,
        lng: 6.7859,
        mapTop: 78,
        mapLeft: 45,
        totalScans: 1650,
        anomalyCount: 34,
        riskTier: 'CRITICAL',
        flaggedBatches: ['OXY-1188', 'INS-771', 'AL-77209'],
        primaryAnomaly: 'Falsified secondary cartons & broken cold-chain seal signatures',
        activeSeizuresCount: 2,
        inspectionTeamsDeployed: 2,
        lastIncidentAt: '09:20 today',
      },
      {
        id: 'CLUSTER-KAD-01',
        city: 'Kaduna',
        hub: 'Central Market & Kakuri Industrial Zone',
        state: 'Kaduna State',
        region: 'North-West',
        lat: 10.5105,
        lng: 7.4165,
        mapTop: 38,
        mapLeft: 52,
        totalScans: 620,
        anomalyCount: 11,
        riskTier: 'HIGH',
        flaggedBatches: ['AL-77209'],
        primaryAnomaly: 'Re-labeled expired antimalarials intercepted en-route to Zaria',
        activeSeizuresCount: 1,
        inspectionTeamsDeployed: 2,
        lastIncidentAt: '16:05 yesterday',
      },
      {
        id: 'CLUSTER-ABA-01',
        city: 'Aba',
        hub: 'Ariaria International Market',
        state: 'Abia State',
        region: 'South-East',
        lat: 5.1066,
        lng: 7.3667,
        mapTop: 88,
        mapLeft: 52,
        totalScans: 740,
        anomalyCount: 15,
        riskTier: 'HIGH',
        flaggedBatches: ['AMX-4412'],
        primaryAnomaly: 'Missing tamper-evident overt hologram seals on antibiotics',
        activeSeizuresCount: 0,
        inspectionTeamsDeployed: 1,
        lastIncidentAt: '14:30 16 Feb',
      },
      {
        id: 'CLUSTER-PHC-01',
        city: 'Port Harcourt',
        hub: 'Mile 1 Market & Trans-Amadi',
        state: 'Rivers State',
        region: 'South-South',
        lat: 4.8156,
        lng: 7.0498,
        mapTop: 90,
        mapLeft: 48,
        totalScans: 980,
        anomalyCount: 6,
        riskTier: 'MEDIUM',
        flaggedBatches: ['CIP-9901'],
        primaryAnomaly: 'Distributor serial mismatches flagged by hospital dispensary',
        activeSeizuresCount: 0,
        inspectionTeamsDeployed: 1,
        lastIncidentAt: '18:10 15 Feb',
      },
      {
        id: 'CLUSTER-ABJ-01',
        city: 'Abuja',
        hub: 'Wuse II, Garki & Utako Commercial Districts',
        state: 'FCT Abuja',
        region: 'North-Central',
        lat: 9.0765,
        lng: 7.3986,
        mapTop: 48,
        mapLeft: 51,
        totalScans: 4890,
        anomalyCount: 3,
        riskTier: 'LOW',
        flaggedBatches: [],
        primaryAnomaly: 'Compliant serialized barcode verification rate: 99.4%',
        activeSeizuresCount: 0,
        inspectionTeamsDeployed: 2,
        lastIncidentAt: '13:00 today',
      },
    ],

    scanIncidents: [
      {
        id: 'INC-2026-091',
        time: '13:12 today',
        type: 'DUPLICATE_SCAN_VELOCITY',
        severity: 'CRITICAL',
        batchId: 'AL-77209',
        serial: 'WV-8F72-92AA',
        productName: 'Artemether / Lumefantrine 80/480mg',
        locationA: 'Idumota Market, Lagos',
        locationB: 'Sabon Gari Market, Kano',
        distanceKm: 842,
        timeDeltaMin: 14,
        description: 'Improbable velocity jump: Barcode scanned in Kano 14 minutes after scan in Lagos. Physical clone confirmed.',
        status: 'SEIZURE_RECOMMENDED',
      },
      {
        id: 'INC-2026-092',
        time: '11:45 today',
        type: 'COLD_CHAIN_SPOILAGE',
        severity: 'HIGH',
        batchId: 'OXY-1188',
        serial: 'WV-9912-44BC',
        productName: 'Oxytocin injection 10 IU/ml',
        locationA: 'Onitsha Head Bridge Depot',
        locationB: null,
        distanceKm: 0,
        timeDeltaMin: 0,
        description: 'Transit thermal sensor exceeded critical 8°C ceiling for 43 continuous minutes. Loss of potency verified.',
        status: 'QUARANTINED',
      },
      {
        id: 'INC-2026-093',
        time: '15:20 yesterday',
        type: 'UNREGISTERED_BATCH',
        severity: 'CRITICAL',
        batchId: 'CIP-9901',
        serial: 'WV-3C10-77BE',
        productName: 'Ciprofloxacin 500mg',
        locationA: 'Mile 1 Market, Port Harcourt',
        locationB: null,
        distanceKm: 0,
        timeDeltaMin: 0,
        description: 'Batch number not registered in NAFDAC Central Pharma Database. Substandard active API formulation.',
        status: 'UNDER_INVESTIGATION',
      },
    ],

    // Tier 3: CHW Rapid Diagnostic Tests
    rdtTests: [
      {
        id: 'RDT-2026-101',
        testNo: 'RDT-MAL-2026-101',
        patientName: 'Fatima Aliyu',
        patientAge: 28,
        gender: 'Female',
        location: 'Kano Rural Primary Health Centre, Dawakin Kudu',
        chwName: 'Hadiza Umar (CHW-KN-402)',
        testType: 'Malaria Rapid Diagnostic Test (Pf/Pv Antigen)',
        result: 'POSITIVE_PF',
        controlLineValid: true,
        testLineIntensity: 'STRONG_POSITIVE (94% optical density)',
        linkedBatchId: 'AL-240981',
        linkedProductName: 'Artemether / Lumefantrine (Coartem) 80/480mg',
        dispensedUnits: '1 pack (24 tabs)',
        coVerificationStatus: 'CO_VERIFIED_GENUINE',
        timestamp: '18 Feb 2026 10:30',
        ledgerHash: '0xd1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0',
        notes: 'Positive test linked to genuine batch AL-240981 to prevent counterfeit antimalarial use.',
      },
      {
        id: 'RDT-2026-102',
        testNo: 'RDT-MAL-2026-102',
        patientName: 'Emeka Nwosu',
        patientAge: 34,
        gender: 'Male',
        location: 'Enugu Urban Community Health Post',
        chwName: 'John Okafor (CHW-EN-119)',
        testType: 'Malaria Rapid Diagnostic Test (Pf Antigen)',
        result: 'NEGATIVE',
        controlLineValid: true,
        testLineIntensity: 'NEGATIVE (0% optical density)',
        linkedBatchId: null,
        linkedProductName: 'None (Supportive care/Paracetamol only)',
        dispensedUnits: '0',
        coVerificationStatus: 'NEGATIVE_NO_ANTIMALARIAL_REQUIRED',
        timestamp: '18 Feb 2026 11:45',
        ledgerHash: '0xe2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1',
        notes: 'Negative RDT: Antimalarials withheld according to antimicrobial stewardship guidelines.',
      },
      {
        id: 'RDT-2026-103',
        testNo: 'RDT-MAL-2026-103',
        patientName: 'Bala Mohammed',
        patientAge: 7,
        gender: 'Male',
        location: 'Zaria Outreach Clinic, Kaduna',
        chwName: 'Amina Sanusi (CHW-KD-088)',
        testType: 'Malaria Rapid Diagnostic Test (Pf/Pv Antigen)',
        result: 'POSITIVE_PF',
        controlLineValid: true,
        testLineIntensity: 'MODERATE_POSITIVE (68% optical density)',
        linkedBatchId: 'AL-240981',
        linkedProductName: 'Artemether / Lumefantrine 80/480mg Dispersible',
        dispensedUnits: '1 pack (6 tabs)',
        coVerificationStatus: 'CO_VERIFIED_GENUINE',
        timestamp: '17 Feb 2026 14:15',
        ledgerHash: '0xf3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2',
        notes: 'Pediatric case. Dose verified and batch authenticity confirmed prior to administration.',
      },
    ],

    sampleBarcodes: [
      {
        code: 'AL-240981',
        name: 'Coartem 80/480mg',
        sub: 'Batch AL-240981 · NAFDAC A4-0231',
        type: 'Authentic · Valid',
        tagClass: 'tag-accent',
        note: 'Point-of-care verification returns verified NAFDAC registration.',
      },
      {
        code: 'AL-77209',
        name: 'Coartem (Seized)',
        sub: 'Batch AL-77209 · Yellow powder',
        type: 'Recalled · High Urgency',
        tagClass: 'tag-accent-2',
        note: 'Flagged for dangerous adulteration & active national recall.',
      },
      {
        code: 'INS-1120',
        name: 'Human Insulin 100IU',
        sub: 'Batch INS-1120 · 21 days left',
        type: 'Stockout Critical',
        tagClass: 'tag-accent-2',
        note: 'Valid cold chain but critical stockout alert active.',
      },
      {
        code: 'OXY-1188',
        name: 'Oxytocin 10IU/ml',
        sub: 'Batch OXY-1188 · Excursion',
        type: 'Cold-Chain Alert',
        tagClass: 'tag-accent-2',
        note: 'Thermal logger recorded 43 minutes exceeding 8°C.',
      },
    ],

    regions: [
      { name: 'Abuja (FCT)', distributors: 12, pharmacies: 482, status: 'Normal', note: 'Antimalarial availability stable' },
      { name: 'Lagos', distributors: 31, pharmacies: 1204, status: 'Normal', note: 'Full network coverage' },
      { name: 'Kano', distributors: 9, pharmacies: 266, status: 'Watch', note: 'Serial-cloning cluster under review' },
      { name: 'Kaduna Zone', distributors: 7, pharmacies: 198, status: 'Critical', note: 'Insulin stockout risk rising · ~6 days coverage' },
    ],

    reportsInbox: [
      {
        reporter: 'Ngozi Bello (Patient · Kano)',
        channel: 'WhatsApp (+234 803 *** 8192)',
        time: '12 min ago',
        type: 'Suspected Falsification',
        product: 'Artemether/Lumefantrine · Batch AL-77209',
        message: 'Good afternoon NAFDAC, I bought this coartem from a chemist in Sabon Gari market, Kano. When I opened the blister foil, the tablets crumbled to yellow powder and smelled strongly of kerosene. Batch on pack is AL-77209.',
        urgency: 'Critical',
        urgencyClass: 'tag-accent-2',
        triageRoute: 'ESCALATED TO NAFDAC KANO STATE SURVEILLANCE & ENFORCEMENT UNIT',
        confidence: 'NLP Classifier: 97.4% High-Confidence Anomaly',
        batch: 'AL-77209',
      },
      {
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
      },
      {
        reporter: 'GreenLife Pharmacy (Wuse II, Abuja)',
        channel: 'WelliVerify App Incident',
        time: '2 hours ago',
        type: 'Cold Chain Excursion',
        product: 'Oxytocin injection · Batch OXY-1188',
        message: 'Received shipping container with condensation on inner ampoule foil. Digital temperature tag was disconnected during transit from Lagos.',
        urgency: 'Medium',
        urgencyClass: 'tag-accent',
        triageRoute: 'ROUTED TO NAFDAC POST-MARKETING SURVEILLANCE DIRECTORATE',
        confidence: 'NLP Classifier: 91.8% Physical Storage Excursion',
        batch: 'OXY-1188',
      },
    ],

    forecastData: [
      { product: 'Artemether/Lumefantrine', region: 'Abuja', trend: '+34%', confidence: '87%', note: 'Rainy-season malaria pattern — reorder ~2 weeks early' },
      { product: 'Insulin (Human)', region: 'Kaduna Zone', trend: '+12%', confidence: '79%', note: 'Chronic demand outpacing current allocation' },
      { product: 'Oral Rehydration Salts', region: 'Lagos', trend: '+21%', confidence: '83%', note: 'Seasonal diarrheal-disease uptick forecast' },
    ],

    assistantThreads: [
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
    ],

    forensicChecks: [
      {
        name: 'NAFDAC Microprint & Guilloche Pattern',
        sub: 'Resolution: 1200 DPI vector alignment',
        status: 'Match (99.4%)',
        tagClass: 'tag-accent',
      },
      {
        name: 'Optical Variable Ink / Hologram 3D Tilt',
        sub: 'Diffraction angle shift: Absent or flat static print',
        status: 'Mismatch (0.14)',
        tagClass: 'tag-accent-2',
      },
      {
        name: 'GS1 2D DataMatrix Symbol Quality',
        sub: 'ISO/IEC 15415 Grade A symbol contrast',
        status: 'Match (98.1%)',
        tagClass: 'tag-accent',
      },
      {
        name: 'Alu-Alu Blister Crimping Texture',
        sub: 'Deep-draw heat seal indentation geometry',
        status: 'Match (96.5%)',
        tagClass: 'tag-accent',
      },
    ],

    chwLanguages: [
      { id: 'en', name: 'English' },
      { id: 'ha', name: 'Hausa' },
      { id: 'yo', name: 'Yorùbá' },
      { id: 'pcm', name: 'Nigerian Pidgin' },
    ],

    chwSteps: [
      {
        num: 1,
        title: 'Audio Scan or Spell Serial',
        desc: 'Speak serial or hold product near microphone',
        sample: '"Verify Coartem batch AL-240981"',
      },
      {
        num: 2,
        title: 'Physical Blister Confirmation',
        desc: 'Check green holographic star & expiration year (2028)',
        sample: 'Visual prompt: Blister sealed, no crumb powder',
      },
      {
        num: 3,
        title: 'Offline Dispensation Ledger',
        desc: 'Logged in device encrypted store (will sync on cell tower)',
        sample: 'Patient Record: PT-55291 · Safe to dispense',
      },
    ],

    prescriptions: [
      { product: 'Amoxicillin 500mg', date: '12 Sep 2026', pharmacy: 'Wellcare Pharmacy', status: 'Collected' },
      { product: 'Metformin 500mg', date: '02 Sep 2026', pharmacy: 'GreenLife Pharmacy', status: 'Collected' },
      { product: 'Artemether/Lumefantrine', date: '28 Aug 2026', pharmacy: 'CityMeds Pharmacy', status: 'Collected' },
    ],

    reminders: [
      { product: 'Metformin 500mg', time: '8:00 AM · daily' },
      { product: 'Amoxicillin 500mg', time: '2:00 PM · 3x daily, 5 days' },
    ],

    marketOrders: [
      { pharmacy: 'Sahel Community Pharmacy', product: 'Insulin (Human)', qty: '40 units', city: 'Sokoto' },
      { pharmacy: 'Delta Health Pharmacy', product: 'Oxytocin injection', qty: '120 units', city: 'Warri' },
      { pharmacy: 'Plateau Pharmacy Ltd.', product: 'Amoxicillin 500mg', qty: '300 units', city: 'Jos' },
    ],
  };

  // --- Screen Titles Map ---
  const TITLES = {
    home: { regulator: 'Overview', default: 'Dashboard' },
    scan: 'Scan & Verify',
    inventory: 'Inventory',
    fefo: 'Stockout Alerts',
    nearby: 'Nearby Availability',
    recall: { pharmacist: 'Recalls & Alerts', default: 'Recall Dashboard' },
    profile: 'Profile',
    product: 'Product Record',
    supplier: 'Supplier Profile',
    risk: 'Risk Engine',
    report: 'Report a Concern',
    verify: 'Verify a Product',
    availability: 'Nearby Availability',
    checkout: 'Checkout',
    shipments: 'Shipments',
    alerts: 'Alert Network',
    price: 'Price Intelligence',
    verification: 'KYB Queue',
    investigation: 'Investigations',
    trust: 'Trust Profile',
    coldchain: 'Cold Chain',
    map: 'Supply Chain Map',
    inbox: 'Reports Inbox',
    prescriptions: 'My Prescriptions',
    reminders: 'Reminders',
    marketplace: 'Marketplace',
    unable: 'Verification Result',
    forecast: 'Demand Forecast',
    photocheck: 'AI Packaging Check',
    assistant: 'Ask WelliVerify',
    voice: 'Voice Verify',
    consumables: 'Lab Consumables',
    assay: 'Chemical Assay (HPLC)',
    coas: 'Certificates of Analysis',
    coadetail: 'Official Certificate of Analysis',
    coldchaindetail: 'Cold Chain Detail',
    notifications: 'Notifications',
    escrow: 'WelliPay Escrow & Settlement',
    serialization: 'GS1 Serialization Studio',
    simulator: 'Supply Chain Journey Simulator',
    // Tier 3
    radar: 'Geospatial Radar & Seizure Broadcast',
    rdt: 'CHW Rapid Diagnostic Test (RDT) Reader',
    thermal: 'POS Thermal Receipt Voucher',
  };

  const TOP_LEVEL_BY_ROLE = {
    pharmacist: ['home', 'scan', 'inventory', 'fefo', 'nearby', 'recall', 'forecast', 'escrow', 'simulator', 'rdt'],
    patient: ['home', 'verify', 'availability', 'prescriptions', 'reminders', 'escrow', 'rdt'],
    distributor: ['home', 'shipments', 'recall', 'alerts', 'price', 'trust', 'coldchain', 'report', 'marketplace', 'assistant', 'escrow', 'serialization', 'simulator'],
    regulator: ['home', 'radar', 'recall', 'alerts', 'verification', 'investigation', 'price', 'map', 'inbox', 'forecast', 'assistant', 'serialization', 'simulator'],
    lab: ['home', 'assay', 'coas', 'consumables', 'simulator'],
  };

  // --- State Container ---
  class WelliVerifyApp {
    constructor() {
      this.data = JSON.parse(JSON.stringify(INITIAL_DATA));

      this.state = {
        loggedIn: true, // Auto-login to pharmacist for instant preview
        loginRole: 'pharmacist',
        role: 'pharmacist',
        drawerOpen: false,
        screens: {
          pharmacist: 'home',
          patient: 'home',
          distributor: 'home',
          regulator: 'home',
          lab: 'home',
        },
        stacks: {
          pharmacist: ['home'],
          patient: ['home'],
          distributor: ['home'],
          regulator: ['home'],
          lab: ['home'],
        },
        selectedColdChain: '0',
        scanState: 'idle', // 'idle' | 'scanning'
        cameraActive: false,
        selectedSampleCode: 'AL-240981',
        selectedAssayBatch: 'AL-240981',
        selectedCoaId: 'COA-2026-NAFDAC-0981',
        reportSubmitted: false,
        paySuccess: false,
        dismissedReports: [],
        kybStatus: {},
        remindersTaken: {},
        marketFulfilled: {},
        photocheckDone: false,
        assistantAnswerIdx: null,
        voiceState: 'idle', // 'idle' | 'listening' | 'done'
        inventorySearch: '',
        inventoryFilter: 'all', // 'all' | 'expiring' | 'low'
        nearbySearch: '',
        rebalanceApproved: false,
        chwMode: false,
        chwLang: 'en',
        activeCHWStep: 1,
        ussdActive: false,
        quarantinedBatches: [],
        offlineQueueCount: 0,
        // Tier 2: WelliPay Escrow
        escrowTab: 'b2b', // 'b2b' | 'hmo'
        selectedReceipt: null,
        creatingEscrowModal: false,
        adjudicatingHmoModal: false,
        // Tier 2: Manufacturer Serialization Studio
        generatedSerials: (INITIAL_DATA.initialSerials || []),
        serialBatchInput: 'AL-2026-EXP',
        serialGtinInput: '06151412098124',
        serialCountInput: 6,
        serializationView: 'studio', // 'studio' | 'sheet'
        // Tier 2: Supply Chain Journey Simulator
        simStep: 1,
        simMaxSteps: 6,
        simPlaying: false,
        simTimer: null,
        simAnomaly: false,
        simAnomalyType: 'temp_spike', // 'temp_spike' | 'counterfeit_clone'
        simHistory: [],
        // Tier 3: Regulatory & Field Hardware Integration
        selectedRadarCluster: 'CLUSTER-KAN-01',
        seizureModalOpen: false,
        seizureBroadcastActive: false,
        activeSeizureOrder: null,
        rdtResult: 'POSITIVE_PF',
        rdtControlLine: true,
        rdtIntensity: 94,
        rdtLinkedBatch: 'AL-240981',
        rdtSubmitted: false,
        rdtPatientName: 'Fatima Aliyu',
        rdtPatientAge: 28,
        rdtGender: 'Female',
        rdtCHWName: 'Hadiza Umar (CHW-KN-402)',
        rdtLocation: 'Kano Rural Primary Health Centre',
        ussdModalOpen: false,
        ussdDialInput: '*384*24#',
        ussdDisplayLines: 'WelliVerify National NAFDAC Trust Gateway:\n1. Verify Drug PIN/Batch\n2. Report Counterfeit / Reaction\n3. Active National Recalls\n4. Emergency Whistleblower',
        ussdPromptText: 'Enter choice (1-4):',
        ussdSessionActive: true,
        hardwareScannerReady: true,
        lastHardwareScannedCode: null,
        thermalReceiptModalOpen: false,
        thermalReceiptData: null,
      };

      this.initDom();
      this.initApiSync();
      this.attachGlobalEvents();
      this.handleHashChange();
      this.render();
      this.startClock();
    }

    initDom() {
      this.appEl = document.getElementById('app');
      this.toastEl = document.getElementById('toast');
      this.toastTextEl = document.getElementById('toast-text');
      this.clockEl = document.getElementById('status-clock');
      this.deviceContainer = document.getElementById('device-container');
      this.toggleFrameBtn = document.getElementById('toggle-frame-btn');
      this.frameLabel = document.getElementById('frame-label');
      this.resetBtn = document.getElementById('reset-btn');
    }

    initApiSync() {
      if (window.WelliVerifyAPI) {
        window.WelliVerifyAPI.onStatusChange((isOnline) => {
          const badge = document.getElementById('api-status-badge');
          const label = document.getElementById('api-status-text');
          if (badge && label) {
            if (isOnline) {
              badge.className = 'api-status-badge online';
              badge.title = 'WelliVerify Sovereign Trust API Mesh (Port 4000) Connected';
              label.textContent = 'API Online (Port 4000)';
            } else {
              badge.className = 'api-status-badge offline';
              badge.title = 'Backend unreachable - using offline local mesh cache';
              label.textContent = 'Offline Cache';
            }
          }
        });
      }
    }

    startClock() {
      const update = () => {
        const d = new Date();
        const hh = String(d.getHours()).padStart(2, '0');
        const mm = String(d.getMinutes()).padStart(2, '0');
        if (this.clockEl) this.clockEl.textContent = `${hh}:${mm}`;
      };
      update();
      setInterval(update, 10000);
    }

    showToast(msg) {
      if (!this.toastEl) return;
      this.toastTextEl.textContent = msg;
      this.toastEl.classList.add('show');
      clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => {
        this.toastEl.classList.remove('show');
      }, 2500);
    }

    // --- Notifications Computation ---
    getNotificationFeed(role) {
      let feed = [];
      if (role === 'pharmacist') {
        feed = this.data.recalls.map((r) => ({
          title: r.title,
          meta: `Batch ${r.batch} · ${r.status}`,
          tagClass: 'tag-accent-2',
          tagText: r.severity,
        })).concat(
          this.data.fefoAlerts.filter((a) => a.level === 'HIGH').map((a) => ({
            title: a.name,
            meta: `Stockout in ~${a.days} days`,
            tagClass: 'tag-accent-2',
            tagText: 'STOCKOUT',
          }))
        );
      } else if (role === 'patient') {
        feed = this.data.reminders.map((r) => ({
          title: r.product,
          meta: r.time,
          tagClass: 'tag-outline',
          tagText: 'REMINDER',
        }));
      } else if (role === 'distributor') {
        feed = this.data.networkAlerts.map((a) => ({
          title: a.product,
          meta: `Batch ${a.batch} · ${a.locations}`,
          tagClass: 'tag-accent-2',
          tagText: a.severity,
        })).concat(
          this.data.coldChainShipments.filter((c) => c.status === 'EXCEPTION').map((c) => ({
            title: c.product,
            meta: c.reading,
            tagClass: 'tag-accent-2',
            tagText: 'COLD CHAIN',
          }))
        );
      } else if (role === 'regulator') {
        feed = this.data.networkAlerts.map((a) => ({
          title: a.product,
          meta: `Batch ${a.batch} · ${a.locations}`,
          tagClass: 'tag-accent-2',
          tagText: a.severity,
        })).concat(
          this.data.investigations.map((i) => ({
            title: i.product,
            meta: `Serial ${i.serial}`,
            tagClass: 'tag-accent-2',
            tagText: i.status,
          }))
        );
      } else if (role === 'lab') {
        feed = this.data.labConsumables.filter((c) => c.days < 14).map((c) => ({
          title: c.name,
          meta: `Expires in ${c.days} days`,
          tagClass: 'tag-accent-2',
          tagText: 'EXPIRING',
        }));
      }
      return feed;
    }

    // --- State Modifiers ---
    selectLoginRole(role) {
      this.state.loginRole = role;
      this.render();
    }

    login() {
      this.state.loggedIn = true;
      this.state.role = this.state.loginRole;
      this.showToast(`Logged in as ${this.state.role.toUpperCase()}`);
      this.updateUrlHash();
      this.render();
    }

    signOut() {
      this.state.loggedIn = false;
      this.state.drawerOpen = false;
      this.showToast('Signed out');
      this.updateUrlHash();
      this.render();
    }

    toggleDrawer() {
      this.state.drawerOpen = !this.state.drawerOpen;
      this.render();
    }

    closeDrawer() {
      if (this.state.drawerOpen) {
        this.state.drawerOpen = false;
        this.render();
      }
    }

    switchRole(newRole) {
      this.state.role = newRole;
      this.state.drawerOpen = false;
      this.showToast(`Switched to ${newRole.toUpperCase()}`);
      this.updateUrlHash();
      this.render();
    }

    navTo(target) {
      const role = this.state.role;
      this.state.screens[role] = target;
      this.state.stacks[role] = [target];
      this.state.drawerOpen = false;
      this.state.scanState = 'idle';
      this.state.reportSubmitted = false;
      this.state.paySuccess = false;
      this.state.voiceState = 'idle';
      this.updateUrlHash();
      this.render();
    }

    go(target) {
      const role = this.state.role;
      this.state.screens[role] = target;
      this.state.stacks[role].push(target);
      this.state.drawerOpen = false;
      this.updateUrlHash();
      this.render();
    }

    goBack() {
      const role = this.state.role;
      const stack = this.state.stacks[role];
      if (stack.length > 1) {
        stack.pop();
        this.state.screens[role] = stack[stack.length - 1];
        this.updateUrlHash();
        this.render();
      }
    }

    async startScan(forceFail = false, customCode = null) {
      this.state.scanState = 'scanning';
      this.render();

      const role = this.state.role;
      const isOffline = window.WelliVerifyOfflineDB?.isSimulatedOffline;
      const code = forceFail ? 'UNRECOGNIZED-9999' : (customCode || this.state.selectedSampleCode || 'AL-240981');

      // Offline-First Path
      if (isOffline && window.WelliVerifyOfflineDB) {
        try {
          const offRes = await window.WelliVerifyOfflineDB.verifyOffline(code);
          await window.WelliVerifyOfflineDB.queueScan({
            code,
            role,
            verified: offRes.verified,
            batchId: offRes.data?.batchId,
          });
          this.updateOfflineBadge();

          setTimeout(() => {
            const target = (forceFail || !offRes.verified) ? 'unable' : 'product';
            this.state.scanState = 'idle';
            if (offRes.verified) {
              const d = offRes.data;
              this.state.lastVerification = {
                product: {
                  name: d.productName,
                  nafdacRegNo: d.nafdacReg,
                  manufacturer: d.manufacturer,
                },
                batch: {
                  batchId: d.batchId,
                  daysToExpiry: d.daysToExpiry,
                  isRecalled: d.isRecalled,
                },
                risk_status: {
                  tier: d.isRecalled ? 'CRITICAL' : 'Low',
                },
                verification_hash: d.hash,
                isOfflineCached: true,
              };
            }
            this.state.screens[role] = target;
            this.state.stacks[role].push(target);
            this.updateUrlHash();
            this.render();
            this.showToast(offRes.verified ? 'Verified offline via NAFDAC hash cache (Queued)' : 'Code unrecognized');
          }, 1200);
          return;
        } catch (err) {
          console.warn('Offline verification error:', err);
        }
      }

      // Live API Path
      if (window.WelliVerifyAPI && !forceFail) {
        try {
          const apiRes = await window.WelliVerifyAPI.verifyProduct({
            code,
            reporter_role: role,
          });
          if (apiRes) {
            this.state.lastVerification = apiRes;
            console.log('[WelliVerify] Real API Verification Result:', apiRes);
          }
        } catch (e) {
          console.warn('[WelliVerify] Verification API call failed:', e);
        }
      }

      setTimeout(() => {
        const target = forceFail ? 'unable' : 'product';
        this.state.scanState = 'idle';
        this.state.screens[role] = target;
        this.state.stacks[role].push(target);
        this.updateUrlHash();
        this.render();
        this.showToast(forceFail ? 'Code unverified' : `Verified: ${code}`);
      }, 1400);
    }

    toggleCamera() {
      this.state.cameraActive = !this.state.cameraActive;
      this.render();

      if (this.state.cameraActive) {
        setTimeout(() => {
          const video = document.getElementById('live-camera-video');
          if (video && navigator.mediaDevices?.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
              .then(stream => {
                this.cameraStream = stream;
                video.srcObject = stream;
                video.play();
                this.showToast('WebRTC live camera sensor stream active');
              })
              .catch(err => {
                console.warn('Camera stream error:', err);
                this.showToast('Camera access unavailable or declined');
                this.state.cameraActive = false;
                this.render();
              });
          }
        }, 80);
      } else if (this.cameraStream) {
        this.cameraStream.getTracks().forEach(t => t.stop());
        this.cameraStream = null;
      }
    }

    selectSampleCode(code) {
      this.state.selectedSampleCode = code;
      this.render();
      this.showToast(`Selected sample code: ${code}`);
    }

    setAssayBatch(batch) {
      this.state.selectedAssayBatch = batch;
      this.render();
    }

    async submitLabAssay() {
      const batchId = this.state.selectedAssayBatch || 'AL-240981';
      const isFalsified = batchId === 'AL-77209';
      const assayPct = document.getElementById('assay-pct-input')?.value || (isFalsified ? 0.0 : 99.2);
      const dissRate = document.getElementById('assay-diss-input')?.value || (isFalsified ? '0%' : '88.4% at 45 min');
      const impurities = document.getElementById('assay-impurity-input')?.value || (isFalsified ? 'Kerosene solvent residue' : 'None detected');

      const assayData = {
        batchId,
        productName: isFalsified ? 'Artemether/Lumefantrine (Seized Field Sample)' : 'Artemether/Lumefantrine 80/480mg',
        apiAssayPercentage: Number(assayPct),
        dissolutionRate: dissRate,
        foreignSubstances: impurities,
        labOfficer: 'Tunji Adewale (Reg. LAB-33021)',
        facility: 'Zenith Diagnostics Reference Laboratory, Lagos',
        method: isFalsified ? 'RP-HPLC + GC-MS' : 'Reversed-Phase HPLC (RP-HPLC)',
      };

      if (window.WelliVerifyAPI) {
        try {
          const res = await window.WelliVerifyAPI.submitLabAssay(assayData);
          if (res?.assay) {
            this.data.labAssays.unshift(res.assay);
            this.state.selectedCoaId = res.assay.coaId;
            this.showToast('Certificate of Analysis (CoA) issued & anchored to ledger!');
            this.go('coadetail');
            return;
          }
        } catch (e) {
          console.warn('Lab assay API error:', e);
        }
      }

      // Fallback local CoA generation
      const isCompliant = Number(assayPct) >= 95.0 && Number(assayPct) <= 105.0;
      const coaId = `COA-2026-NAFDAC-${Math.floor(1000 + Math.random() * 9000)}${isCompliant ? '' : '-FAIL'}`;
      const localAssay = {
        id: `ASSAY-00${this.data.labAssays.length + 1}`,
        coaId,
        batchId,
        productName: assayData.productName,
        labOfficer: assayData.labOfficer,
        facility: assayData.facility,
        testDate: new Date().toISOString().split('T')[0],
        method: assayData.method,
        apiAssayPercentage: Number(assayPct),
        specificationRange: '95.0% - 105.0% (USP / BP)',
        dissolutionRate: dissRate,
        foreignSubstances: impurities,
        status: isCompliant ? 'PASSED' : 'FAILED_LETHAL_ADULTERANT',
        sealClass: isCompliant ? 'tag-accent' : 'tag-accent-2',
        retentionPeakMin: isCompliant ? 4.2 : 0.0,
        conclusion: isCompliant ? 'Sample conforms to British Pharmacopoeia monograph standards.' : 'NON-COMPLIANT: Assay violates USP/BP specifications.',
      };
      this.data.labAssays.unshift(localAssay);
      this.state.selectedCoaId = coaId;
      this.showToast('Certificate of Analysis generated!');
      this.go('coadetail');
    }

    viewCoa(coaId) {
      this.state.selectedCoaId = coaId;
      this.go('coadetail');
    }

    // --- TIER 2: ACTION METHODS ---
    async releaseEscrow(id) {
      if (window.WelliVerifyAPI) {
        try {
          const res = await window.WelliVerifyAPI.releaseEscrow(id, this.data.identities[this.state.role]?.name || 'Supervising Officer');
          if (res?.escrow) {
            const idx = this.data.escrows.findIndex(e => e.id === id);
            if (idx !== -1) this.data.escrows[idx] = res.escrow;
            this.showToast(`₦${res.escrow.totalAmount.toLocaleString()} released to ${res.escrow.sellerName}!`);
            this.render();
            return;
          }
        } catch (e) {
          console.warn('Escrow release API error:', e);
        }
      }
      const esc = this.data.escrows.find(e => e.id === id);
      if (esc) {
        esc.status = 'RELEASED';
        esc.milestones.fundsReleased.done = true;
        esc.milestones.fundsReleased.releasedAt = 'Just now';
        esc.milestones.fundsReleased.txHash = '0x' + Math.random().toString(16).slice(2, 18);
        this.showToast(`₦${esc.totalAmount.toLocaleString()} released to ${esc.sellerName}!`);
        this.render();
      }
    }

    async refundEscrow(id) {
      if (window.WelliVerifyAPI) {
        try {
          const res = await window.WelliVerifyAPI.refundEscrow(id, 'Thermal Excursion & Quality Non-Compliance');
          if (res?.escrow) {
            const idx = this.data.escrows.findIndex(e => e.id === id);
            if (idx !== -1) this.data.escrows[idx] = res.escrow;
            this.showToast(`Escrow ₦${res.escrow.totalAmount.toLocaleString()} refunded to buyer.`);
            this.render();
            return;
          }
        } catch (e) {
          console.warn('Escrow refund API error:', e);
        }
      }
      const esc = this.data.escrows.find(e => e.id === id);
      if (esc) {
        esc.status = 'REFUNDED_CONTAMINATED';
        esc.milestones.fundsReleased.done = false;
        esc.refundReason = 'Batch Quarantined / Contamination Detected';
        this.showToast(`Escrow ₦${esc.totalAmount.toLocaleString()} refunded to buyer.`);
        this.render();
      }
    }

    openEscrowReceipt(id) {
      const esc = this.data.escrows.find(e => e.id === id);
      if (esc) {
        this.state.selectedReceipt = esc;
        this.render();
      }
    }

    async submitCreateEscrow() {
      const prodName = document.getElementById('esc-prod-select')?.value || 'Artemether / Lumefantrine 80/480mg';
      const units = Number(document.getElementById('esc-units-input')?.value || 100);
      const unitPrice = Number(document.getElementById('esc-price-input')?.value || 2400);
      const supplier = document.getElementById('esc-supp-select')?.value || 'Northgate Distribution Ltd.';

      const payload = {
        buyerName: this.data.identities[this.state.role]?.name || 'GreenLife Pharmacy (Wuse II)',
        buyerRole: this.state.role,
        sellerName: supplier,
        sellerRole: 'distributor',
        productName: prodName,
        batchId: 'AL-2026-NEW',
        units,
        unitPrice,
      };

      if (window.WelliVerifyAPI) {
        try {
          const res = await window.WelliVerifyAPI.createEscrow(payload);
          if (res?.escrow) {
            this.data.escrows.unshift(res.escrow);
            this.state.creatingEscrowModal = false;
            this.showToast(`Contract ${res.escrow.contractNo} created on ledger!`);
            this.render();
            return;
          }
        } catch (e) {
          console.warn('Create escrow API error:', e);
        }
      }

      const totalAmount = units * unitPrice;
      const newEsc = {
        id: `ESC-2026-${Math.floor(100 + Math.random() * 900)}`,
        contractNo: `WPY-ESC-${Math.floor(100 + Math.random() * 900)}-NG`,
        buyerName: payload.buyerName,
        buyerRole: payload.buyerRole,
        sellerName: payload.sellerName,
        sellerRole: payload.sellerRole,
        productName: payload.productName,
        batchId: payload.batchId,
        units,
        unitPrice,
        totalAmount,
        currency: 'NGN',
        status: 'HELD_IN_ESCROW',
        createdAt: new Date().toISOString(),
        milestones: {
          orderPlaced: { done: true, timestamp: 'Just now' },
          inTransit: { done: false, timestamp: null },
          barcodeVerified: { done: false, timestamp: null },
          coldChainVerified: { done: false, reading: 'Pending inspection' },
          fundsReleased: { done: false, releasedAt: null, txHash: null }
        },
        escrowLedgerHash: '0x' + Math.random().toString(16).slice(2, 22),
      };
      this.data.escrows.unshift(newEsc);
      this.state.creatingEscrowModal = false;
      this.showToast(`Contract ${newEsc.contractNo} created on ledger!`);
      this.render();
    }

    async submitAdjudicateHmo() {
      const hmoProvider = document.getElementById('hmo-provider-select')?.value || 'Hygeia HMO';
      const policyNo = document.getElementById('hmo-policy-input')?.value || 'HYG-POL-7712';
      const patientName = document.getElementById('hmo-patient-input')?.value || 'Ngozi Bello';
      const totalAmount = Number(document.getElementById('hmo-cost-input')?.value || 2400);

      const payload = {
        hmoProvider,
        policyNo,
        patientName,
        patientPhone: '080 123 4567',
        pharmacyName: 'GreenLife Pharmacy (Wuse II)',
        productName: 'Artemether / Lumefantrine 80/480mg',
        batchId: 'AL-240981',
        totalAmount,
        hmoRate: 80,
      };

      if (window.WelliVerifyAPI) {
        try {
          const res = await window.WelliVerifyAPI.adjudicateHmo(payload);
          if (res?.claim) {
            this.data.hmoClaims.unshift(res.claim);
            this.state.adjudicatingHmoModal = false;
            this.showToast(`Claim #${res.claim.claimNo} adjudicated! HMO paid ₦${res.claim.hmoAmount.toLocaleString()}`);
            this.render();
            return;
          }
        } catch (e) {
          console.warn('HMO API error:', e);
        }
      }

      const hmoAmount = Math.round(totalAmount * 0.8);
      const patientCoPay = totalAmount - hmoAmount;
      const newClaim = {
        id: `HMO-${Math.floor(1000 + Math.random() * 9000)}`,
        claimNo: `CLM-${hmoProvider.slice(0, 3).toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        hmoProvider,
        policyNo,
        patientName,
        patientPhone: '080 123 4567',
        pharmacyName: 'GreenLife Pharmacy (Wuse II)',
        productName: payload.productName,
        batchId: payload.batchId,
        totalAmount,
        hmoRate: 80,
        hmoAmount,
        patientCoPay,
        currency: 'NGN',
        status: 'ADJUDICATED_SETTLED',
        settledAt: 'Just now',
        txHash: '0x' + Math.random().toString(16).slice(2, 22),
        notes: 'Real-time co-pay clearance triggered by verified authentic medication scan.',
      };
      this.data.hmoClaims.unshift(newClaim);
      this.state.adjudicatingHmoModal = false;
      this.showToast(`Claim #${newClaim.claimNo} adjudicated! HMO paid ₦${hmoAmount.toLocaleString()}`);
      this.render();
    }

    generateDataMatrixSvg(seed = 'WV-2026') {
      const size = 14;
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        hash = ((hash << 5) - hash) + seed.charCodeAt(i);
        hash |= 0;
      }
      
      let rects = '';
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          let isBlack = false;
          if (c === 0 || r === size - 1) {
            isBlack = true;
          } else if (r === 0 || c === size - 1) {
            isBlack = (r % 2 === 0 && c % 2 === 0) || (c === size - 1 && r % 2 === 0);
          } else {
            const bit = Math.abs(Math.sin((hash * (r + 1) + (c + 1)) * 997)) > 0.45;
            isBlack = bit;
          }
          if (isBlack) {
            rects += `<rect x="${c * 5}" y="${r * 5}" width="4.9" height="4.9" fill="#0f172a" />`;
          }
        }
      }
      return `<svg viewBox="0 0 ${size * 5} ${size * 5}" width="74" height="74" style="display:block">${rects}</svg>`;
    }

    async generateBulkSerials() {
      const gtin = document.getElementById('studio-gtin-input')?.value || this.state.serialGtinInput;
      const batchId = document.getElementById('studio-batch-input')?.value || this.state.serialBatchInput;
      const expDate = document.getElementById('studio-exp-input')?.value || '2027-12-31';
      const count = Number(document.getElementById('studio-count-select')?.value || this.state.serialCountInput);

      this.state.serialGtinInput = gtin;
      this.state.serialBatchInput = batchId;
      this.state.serialCountInput = count;

      if (window.WelliVerifyAPI) {
        try {
          const res = await window.WelliVerifyAPI.generateBulkSerials({
            gtin,
            batchId,
            expDate,
            count,
            productName: 'Artemether / Lumefantrine 80/480mg',
          });
          if (res?.serials) {
            this.state.generatedSerials = res.serials;
            this.showToast(`Generated ${res.serials.length} GS1-compliant DataMatrix packs on ledger!`);
            this.render();
            return;
          }
        } catch (e) {
          console.warn('Serialization API error:', e);
        }
      }

      const generated = [];
      const expFormatted = expDate.replace(/-/g, '').slice(2);
      for (let i = 1; i <= count; i++) {
        const rand = Math.floor(1000 + Math.random() * 9000);
        const randHex = Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase();
        const serial = `WV-${randHex.slice(0, 4)}-${rand}`;
        const cleanSerial = serial.replace(/-/g, '');
        generated.push({
          serial,
          cleanSerial,
          gtin,
          batchId,
          expDate,
          cryptoMac: 'MAC' + Math.random().toString(16).slice(2, 10).toUpperCase(),
          gs1DataMatrix: `(01)${gtin}(17)${expFormatted}(10)${batchId}(21)${cleanSerial}`,
          productName: 'Artemether / Lumefantrine 80/480mg',
          status: 'ACTIVE',
        });
      }
      this.state.generatedSerials = generated;
      this.showToast(`Generated ${count} GS1-compliant DataMatrix packs!`);
      this.render();
    }

    downloadSerialCsv() {
      const serials = this.state.generatedSerials;
      if (!serials || serials.length === 0) {
        this.showToast('No serials generated yet');
        return;
      }
      const headers = 'Serial,GTIN,BatchLot,ExpiryDate,CryptoMAC,GS1_DataMatrix_String,Status\n';
      const rows = serials.map(s => `"${s.serial}","${s.gtin}","${s.batchId}","${s.expDate}","${s.cryptoMac}","${s.gs1DataMatrix}","${s.status}"`).join('\n');
      const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `GS1_Serials_${this.state.serialBatchInput}_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.showToast('Downloaded GS1 CSV serialization file');
    }

    testScanSerial(serialCode) {
      this.state.selectedSampleCode = serialCode;
      this.showToast(`Loaded ${serialCode} into verification scanner`);
      this.go('scan');
    }

    // --- SUPPLY CHAIN SIMULATOR METHODS ---
    async setSimStep(step) {
      this.state.simStep = step;
      if (window.WelliVerifyAPI) {
        try {
          const res = await window.WelliVerifyAPI.runSimulationStep(step, this.state.simAnomaly);
          if (res?.currentStep) {
            this.state.simCurrentInfo = res.currentStep;
          }
        } catch (e) {
          console.warn('Sim API error:', e);
        }
      }
      this.render();
    }

    nextSimStep() {
      if (this.state.simStep < this.state.simMaxSteps) {
        this.setSimStep(this.state.simStep + 1);
      } else {
        this.setSimStep(1);
      }
    }

    prevSimStep() {
      if (this.state.simStep > 1) {
        this.setSimStep(this.state.simStep - 1);
      }
    }

    toggleSimPlay() {
      this.state.simPlaying = !this.state.simPlaying;
      if (this.state.simPlaying) {
        this.showToast('Auto-play started');
        this.state.simTimer = setInterval(() => {
          this.nextSimStep();
        }, 3200);
      } else {
        clearInterval(this.state.simTimer);
        this.state.simTimer = null;
        this.showToast('Auto-play paused');
      }
      this.render();
    }

    toggleSimAnomaly() {
      this.state.simAnomaly = !this.state.simAnomaly;
      this.showToast(this.state.simAnomaly ? '🚨 Anomaly Injected (Thermal Excursion / Tamper)' : 'Pristine Supply Chain Restored');
      this.setSimStep(this.state.simStep);
    }

    resetSim() {
      if (this.state.simTimer) clearInterval(this.state.simTimer);
      this.state.simPlaying = false;
      this.state.simAnomaly = false;
      this.state.simStep = 1;
      this.showToast('Simulation reset to Step 1 (Manufacturer)');
      this.render();
    }

    async updateOfflineBadge() {
      if (!window.WelliVerifyOfflineDB) return;
      const queued = await window.WelliVerifyOfflineDB.getQueuedScans();
      const count = queued.length;
      this.state.offlineQueueCount = count;
      const btn = document.getElementById('sync-queue-btn');
      const badge = document.getElementById('queue-count-badge');
      if (btn && badge) {
        if (count > 0) {
          btn.style.display = 'inline-flex';
          badge.textContent = count;
        } else {
          btn.style.display = 'none';
        }
      }
    }

    startVoice() {
      this.state.voiceState = 'listening';
      this.render();
      setTimeout(() => {
        this.state.voiceState = 'done';
        this.render();
      }, 1600);
    }

    analyzePhoto() {
      this.state.photocheckDone = true;
      this.render();
      this.showToast('Packaging analysis complete');
    }

    async submitReport(reportData = {}) {
      this.state.reportSubmitted = true;
      if (window.WelliVerifyAPI) {
        try {
          const res = await window.WelliVerifyAPI.submitReport({
            reporter: reportData.reporter || (this.state.role === 'pharmacist' ? 'Chidinma Okafor (Pharmacist · Wuse II)' : 'Ngozi Bello (Patient · Kano)'),
            channel: 'WelliVerify Incident Module',
            message: reportData.message || 'Suspected falsification or quality degradation flagged at point-of-care dispensing',
            product: reportData.product || 'Artemether/Lumefantrine 80/480mg',
            batch: reportData.batch || 'AL-77209',
          });
          if (res && res.report) {
            this.state.lastReportTriage = res.report;
            this.data.reportsInbox.unshift(res.report);
          }
        } catch (err) {
          console.warn('[WelliVerify] Report triage API call failed:', err);
        }
      }
      this.render();
      this.showToast('Report submitted and AI triaged');
    }

    payNow() {
      this.state.paySuccess = true;
      this.render();
      this.showToast('Payment successful via WelliPay');
    }

    toggleReminder(idx) {
      this.state.remindersTaken[idx] = !this.state.remindersTaken[idx];
      this.render();
      const isTaken = this.state.remindersTaken[idx];
      this.showToast(isTaken ? 'Dose recorded as taken ✓' : 'Marked as untaken');
    }

    advanceOrder(idx) {
      const current = this.state.marketFulfilled[idx] || 0;
      this.state.marketFulfilled[idx] = Math.min(3, current + 1);
      this.render();
      const labels = ['Pending', 'Accepted', 'Dispatched', 'Delivered & Settled'];
      this.showToast(`Order status: ${labels[this.state.marketFulfilled[idx]]}`);
    }

    approveKyb(idx) {
      this.state.kybStatus[idx] = 'Approved';
      if (window.WelliVerifyAPI) {
        window.WelliVerifyAPI.actionKyb(`KYB-0${Number(idx) + 1}`, 'APPROVED', 'Approved by NAFDAC Registrar');
      }
      this.render();
      this.showToast('Organization application approved');
    }

    rejectKyb(idx) {
      this.state.kybStatus[idx] = 'Rejected';
      if (window.WelliVerifyAPI) {
        window.WelliVerifyAPI.actionKyb(`KYB-0${Number(idx) + 1}`, 'REJECTED', 'Rejected by NAFDAC Registrar');
      }
      this.render();
      this.showToast('Organization application rejected');
    }

    dismissReport(idx) {
      if (!this.state.dismissedReports.includes(String(idx))) {
        this.state.dismissedReports.push(String(idx));
      }
      this.render();
      this.showToast('Report marked as reviewed');
    }

    askAssistant(idx) {
      this.state.assistantAnswerIdx = idx;
      this.render();
    }

    openColdChainDetail(idx) {
      const role = this.state.role;
      this.state.selectedColdChain = idx;
      this.state.screens[role] = 'coldchaindetail';
      this.state.stacks[role].push('coldchaindetail');
      this.updateUrlHash();
      this.render();
    }

    approveRebalance() {
      this.state.rebalanceApproved = true;
      if (window.WelliVerifyAPI) {
        window.WelliVerifyAPI.dispatchRebalance({
          sourceHub: 'Maitama General Hub Depot',
          targetBranch: 'GreenLife Pharmacy (Wuse II)',
          product: 'Artemether/Lumefantrine 20/120mg',
          transferUnits: 80,
        }).then(res => {
          if (res && res.ledgerHash) {
            console.log('[WelliVerify] Rebalance dispatch anchored on ledger:', res.ledgerHash);
          }
        });
      }
      this.render();
      this.showToast('Transfer request #WS-8821 dispatched & anchored on ledger');
    }

    toggleChwMode() {
      this.state.chwMode = !this.state.chwMode;
      this.render();
      this.showToast(this.state.chwMode ? 'Switched to Rural Field CHW Mode' : 'Switched to Standard Audio Verify');
    }

    setChwLang(lang) {
      this.state.chwLang = lang;
      this.render();
      const langNames = { en: 'English', ha: 'Hausa', yo: 'Yorùbá', pcm: 'Nigerian Pidgin' };
      this.showToast(`Voice assistant language: ${langNames[lang] || lang}`);
    }

    advanceChwStep(step) {
      this.state.activeCHWStep = Number(step);
      this.render();
    }

    toggleUssd() {
      this.state.ussdActive = !this.state.ussdActive;
      this.render();
      this.showToast(this.state.ussdActive ? 'USSD Session *384*24# Connected' : 'USSD Session Closed');
    }

    quarantineBatch(batch) {
      if (!this.state.quarantinedBatches.includes(batch)) {
        this.state.quarantinedBatches.push(batch);
      }
      this.render();
      this.showToast(`Emergency Quarantine Broadcast: Batch ${batch} Locked`);
    }

    resetAll() {
      this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
      this.state.loggedIn = true;
      this.state.role = 'pharmacist';
      this.state.screens = { pharmacist: 'home', patient: 'home', distributor: 'home', regulator: 'home', lab: 'home' };
      this.state.stacks = { pharmacist: ['home'], patient: ['home'], distributor: ['home'], regulator: ['home'], lab: ['home'] };
      this.state.selectedColdChain = '0';
      this.state.scanState = 'idle';
      this.state.reportSubmitted = false;
      this.state.paySuccess = false;
      this.state.dismissedReports = [];
      this.state.kybStatus = {};
      this.state.remindersTaken = {};
      this.state.marketFulfilled = {};
      this.state.photocheckDone = false;
      this.state.assistantAnswerIdx = null;
      this.state.voiceState = 'idle';
      this.state.inventorySearch = '';
      this.state.inventoryFilter = 'all';
      this.state.nearbySearch = '';
      this.state.rebalanceApproved = false;
      this.state.chwMode = false;
      this.state.chwLang = 'en';
      this.state.activeCHWStep = 1;
      this.state.ussdActive = false;
      this.state.quarantinedBatches = [];
      this.updateUrlHash();
      this.render();
      this.showToast('Prototype state reset to default');
    }

    // --- URL Hash Routing ---
    updateUrlHash() {
      if (!this.state.loggedIn) {
        window.location.hash = '#login';
      } else {
        const currentScreen = this.state.screens[this.state.role];
        window.location.hash = `#${this.state.role}/${currentScreen}`;
      }
    }

    handleHashChange() {
      const hash = window.location.hash.replace(/^#/, '');
      if (!hash) return;
      if (hash === 'login') {
        this.state.loggedIn = false;
        return;
      }
      const parts = hash.split('/');
      if (parts.length >= 2 && INITIAL_DATA.identities[parts[0]]) {
        this.state.loggedIn = true;
        this.state.role = parts[0];
        const screen = parts[1];
        this.state.screens[this.state.role] = screen;
        this.state.stacks[this.state.role] = ['home'];
        if (screen !== 'home') {
          this.state.stacks[this.state.role].push(screen);
        }
      }
    }

    // --- Global Event Listeners ---
    attachGlobalEvents() {
      window.addEventListener('hashchange', () => {
        this.handleHashChange();
        this.render();
      });

      // Toolbar role buttons
      document.querySelectorAll('.role-chip').forEach((chip) => {
        chip.addEventListener('click', (e) => {
          const role = e.currentTarget.dataset.role;
          if (role) {
            this.state.loggedIn = true;
            this.switchRole(role);
          }
        });
      });

      // Toolbar Reset button
      if (this.resetBtn) {
        this.resetBtn.addEventListener('click', () => this.resetAll());
      }

      // Toolbar Frame toggle button
      if (this.toggleFrameBtn) {
        this.toggleFrameBtn.addEventListener('click', () => {
          this.deviceContainer.classList.toggle('fullscreen-mode');
          const isFull = this.deviceContainer.classList.contains('fullscreen-mode');
          this.frameLabel.textContent = isFull ? 'Frame' : 'Edge';
          this.showToast(isFull ? 'Switched to responsive fullscreen' : 'Switched to iPhone Frame');
        });
      }

      // Toolbar Offline Simulator button
      const offlineBtn = document.getElementById('toggle-offline-btn');
      if (offlineBtn) {
        offlineBtn.addEventListener('click', () => {
          if (window.WelliVerifyOfflineDB) {
            window.WelliVerifyOfflineDB.isSimulatedOffline = !window.WelliVerifyOfflineDB.isSimulatedOffline;
            const isOff = window.WelliVerifyOfflineDB.isSimulatedOffline;
            const dot = document.getElementById('offline-dot');
            const label = document.getElementById('offline-label');
            if (dot) dot.style.background = isOff ? '#E65100' : '#2E7D32';
            if (label) label.textContent = isOff ? 'Offline (Simulated)' : 'Online';
            this.showToast(isOff ? 'Simulating rural network dropout (Offline Cache Active)' : 'Cellular network restored (Online Mesh)');
            this.render();
          }
        });
      }

      // Toolbar Offline Sync button
      const syncBtn = document.getElementById('sync-queue-btn');
      if (syncBtn) {
        syncBtn.addEventListener('click', async () => {
          if (window.WelliVerifyOfflineDB) {
            const res = await window.WelliVerifyOfflineDB.syncAllQueued(window.WelliVerifyAPI);
            this.showToast(`Synced ${res.syncedCount} offline scans to National Ledger!`);
            await this.updateOfflineBadge();
            this.render();
          }
        });
      }

      // App container event delegation for all dynamic prototype actions
      this.appEl.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('[data-action]');
        if (!targetBtn) return;
        const action = targetBtn.dataset.action;

        switch (action) {
          case 'select-login-role':
            this.selectLoginRole(targetBtn.dataset.role);
            break;
          case 'login':
            this.login();
            break;
          case 'sign-out':
            this.signOut();
            break;
          case 'toggle-drawer':
            this.toggleDrawer();
            break;
          case 'close-drawer':
            this.closeDrawer();
            break;
          case 'switch-role':
            this.switchRole(targetBtn.dataset.role);
            break;
          case 'nav-to':
            this.navTo(targetBtn.dataset.target);
            break;
          case 'go':
            this.go(targetBtn.dataset.target);
            break;
          case 'go-back':
            this.goBack();
            break;
          case 'start-scan':
            this.startScan(targetBtn.dataset.fail === 'true', targetBtn.dataset.code);
            break;
          case 'toggle-camera':
            this.toggleCamera();
            break;
          case 'select-sample-code':
            this.selectSampleCode(targetBtn.dataset.code);
            break;
          case 'set-assay-batch':
            this.setAssayBatch(targetBtn.dataset.batch);
            break;
          case 'submit-lab-assay':
            this.submitLabAssay();
            break;
          case 'view-coa':
            this.viewCoa(targetBtn.dataset.coaId);
            break;
          case 'start-voice':
            this.startVoice();
            break;
          case 'analyze-photo':
            this.analyzePhoto();
            break;
          case 'submit-report':
            this.submitReport();
            break;
          case 'pay-now':
            this.payNow();
            break;
          case 'toggle-reminder':
            this.toggleReminder(targetBtn.dataset.idx);
            break;
          case 'advance-order':
            this.advanceOrder(targetBtn.dataset.idx);
            break;
          case 'approve-kyb':
            this.approveKyb(targetBtn.dataset.idx);
            break;
          case 'reject-kyb':
            this.rejectKyb(targetBtn.dataset.idx);
            break;
          case 'dismiss-report':
            this.dismissReport(targetBtn.dataset.idx);
            break;
          case 'ask-assistant':
            this.askAssistant(targetBtn.dataset.idx);
            break;
          case 'open-coldchain-detail':
            this.openColdChainDetail(targetBtn.dataset.idx);
            break;
          case 'filter-inventory':
            this.state.inventoryFilter = targetBtn.dataset.filter;
            this.render();
            break;
          case 'approve-rebalance':
            this.approveRebalance();
            break;
          case 'toggle-chw-mode':
            this.toggleChwMode();
            break;
          case 'set-chw-lang':
            this.setChwLang(targetBtn.dataset.lang);
            break;
          case 'advance-chw-step':
            this.advanceChwStep(targetBtn.dataset.step);
            break;
          case 'toggle-ussd':
            this.toggleUssd();
            break;
          case 'quarantine-batch':
            this.quarantineBatch(targetBtn.dataset.batch);
            break;
          // Tier 2: Escrow Actions
          case 'set-escrow-tab':
            this.state.escrowTab = targetBtn.dataset.tab;
            this.render();
            break;
          case 'release-escrow':
            this.releaseEscrow(targetBtn.dataset.id);
            break;
          case 'refund-escrow':
            this.refundEscrow(targetBtn.dataset.id);
            break;
          case 'open-escrow-receipt':
            this.openEscrowReceipt(targetBtn.dataset.id);
            break;
          case 'close-escrow-receipt':
            this.state.selectedReceipt = null;
            this.render();
            break;
          case 'toggle-create-escrow':
            this.state.creatingEscrowModal = !this.state.creatingEscrowModal;
            this.render();
            break;
          case 'submit-create-escrow':
            this.submitCreateEscrow();
            break;
          case 'toggle-adjudicate-hmo':
            this.state.adjudicatingHmoModal = !this.state.adjudicatingHmoModal;
            this.render();
            break;
          case 'submit-adjudicate-hmo':
            this.submitAdjudicateHmo();
            break;
          // Tier 2: Serialization Studio Actions
          case 'generate-bulk-serials':
            this.generateBulkSerials();
            break;
          case 'toggle-serialization-view':
            this.state.serializationView = targetBtn.dataset.view;
            this.render();
            break;
          case 'download-serial-csv':
            this.downloadSerialCsv();
            break;
          case 'test-scan-serial':
            this.testScanSerial(targetBtn.dataset.serial);
            break;
          // Tier 2: Simulator Actions
          case 'sim-step':
            this.setSimStep(Number(targetBtn.dataset.step));
            break;
          case 'sim-next':
            this.nextSimStep();
            break;
          case 'sim-prev':
            this.prevSimStep();
            break;
          case 'sim-toggle-play':
            this.toggleSimPlay();
            break;
          case 'sim-toggle-anomaly':
            this.toggleSimAnomaly();
            break;
          case 'sim-reset':
            this.resetSim();
            break;

          // Tier 3: Regulatory Radar & Seizure Broadcast Actions
          case 'select-radar-cluster':
            this.state.selectedRadarCluster = targetBtn.dataset.cluster;
            this.render();
            break;
          case 'toggle-seizure-modal':
            this.state.seizureModalOpen = !this.state.seizureModalOpen;
            this.render();
            break;
          case 'open-seizure-modal':
            this.state.seizureModalOpen = true;
            this.render();
            break;
          case 'close-seizure-modal':
            this.state.seizureModalOpen = false;
            this.render();
            break;
          case 'submit-seizure-broadcast':
            this.submitSeizureBroadcast();
            break;

          // Tier 3: CHW Rapid Diagnostic Test (RDT) Actions
          case 'set-rdt-result':
            this.state.rdtResult = targetBtn.dataset.result;
            this.render();
            break;
          case 'submit-rdt-test':
            this.submitRdtTest();
            break;

          // Tier 3: Rural USSD Simulator Actions
          case 'toggle-ussd-modal':
            this.state.ussdModalOpen = !this.state.ussdModalOpen;
            this.render();
            break;
          case 'close-ussd-modal':
            this.state.ussdModalOpen = false;
            this.render();
            break;
          case 'ussd-key-press':
            this.handleUssdKey(targetBtn.dataset.key);
            break;
          case 'ussd-quick-code':
            this.state.ussdDialInput = targetBtn.dataset.code;
            this.handleUssdSend();
            break;
          case 'ussd-send':
            this.handleUssdSend();
            break;
          case 'ussd-clear':
            this.handleUssdClear();
            break;

          // Tier 3: POS Thermal Receipt Actions
          case 'open-thermal-receipt':
            this.openThermalReceipt(targetBtn.dataset.batch, targetBtn.dataset.prod);
            break;
          case 'close-thermal-receipt':
            this.state.thermalReceiptModalOpen = false;
            this.render();
            break;
          case 'print-thermal-receipt':
            this.showToast('🖨️ Printing ESC/POS 58mm Thermal Voucher...');
            window.print();
            break;
          case 'test-hardware-scanner':
            this.handleHardwareScan(this.state.selectedSampleCode || 'AL-240981');
            break;

          default:
            break;
        }
      });

      // Hardware Handheld Barcode Scanner Wedge Listener
      let wedgeBuffer = '';
      let lastKeyTime = Date.now();

      window.addEventListener('keydown', (e) => {
        const now = Date.now();
        const delta = now - lastKeyTime;
        lastKeyTime = now;

        if (e.key === 'Enter') {
          if (wedgeBuffer.length >= 4 && delta < 140) {
            const scannedCode = wedgeBuffer.trim();
            wedgeBuffer = '';
            this.handleHardwareScan(scannedCode);
            e.preventDefault();
            return;
          }
          wedgeBuffer = '';
          return;
        }

        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          if (delta > 120) {
            wedgeBuffer = e.key;
          } else {
            wedgeBuffer += e.key;
          }
        }
      });

      // Live search input bindings
      this.appEl.addEventListener('input', (e) => {
        if (e.target.id === 'inv-search-input') {
          this.state.inventorySearch = e.target.value.toLowerCase();
          this.renderInventoryList();
        } else if (e.target.id === 'nearby-search-input') {
          this.state.nearbySearch = e.target.value.toLowerCase();
          this.renderNearbyList();
        } else if (e.target.id === 'rdt-intensity-slider') {
          this.state.rdtIntensity = Number(e.target.value);
          const valDisplay = e.target.previousElementSibling?.querySelector('strong');
          if (valDisplay) valDisplay.textContent = `${this.state.rdtIntensity}%`;
          const testBand = document.querySelector('.rdt-band.test-positive, .rdt-band.test-negative');
          if (testBand) testBand.style.opacity = this.state.rdtIntensity / 100;
        }
      });
    }

    // --- Tier 3 Helper Methods ---
    async submitSeizureBroadcast() {
      const batchInput = document.getElementById('seizure-batch-input');
      const gazetteInput = document.getElementById('seizure-gazette-input');
      const reasonInput = document.getElementById('seizure-reason-input');
      const zoneInput = document.getElementById('seizure-zone-input');

      const batchId = batchInput ? batchInput.value.trim().toUpperCase() : 'AL-77209';
      const gazetteRef = gazetteInput ? gazetteInput.value.trim() : 'FED-GAZ-2026-NAFDAC-0881';
      const reason = reasonInput ? reasonInput.value.trim() : 'Confirmed Counterfeit / Zero API detected in HPLC';
      const enforcementZone = zoneInput ? zoneInput.value : 'NATIONWIDE';

      const seizureData = {
        batchId,
        gazetteRef,
        reason,
        enforcementZone,
        regulatoryOfficer: 'Amina Yusuf (NAFDAC REG-1042)',
      };

      let apiRes = null;
      if (window.WelliVerifyAPI) {
        apiRes = await window.WelliVerifyAPI.broadcastSeizureOrder(seizureData);
      }

      this.state.seizureBroadcastActive = true;
      this.state.activeSeizureOrder = {
        batchId,
        gazetteRef,
        reason,
        enforcementZone,
        ledgerHash: apiRes ? apiRes.ledgerHash : '0x99281a772cdef10988123456789abcdef0123456789abcdef0123456789abcdef',
      };
      this.state.seizureModalOpen = false;

      // Update local batches and recalls
      const bMatch = this.data.sampleBarcodes.find(b => b.code === batchId);
      if (bMatch) {
        bMatch.type = 'SEIZED & CONFISCATED';
        bMatch.tagClass = 'tag-accent-2';
      }
      this.data.recalls.unshift({
        title: `NATIONAL SEIZURE ORDER: ${batchId}`,
        batch: batchId,
        severity: 'CRITICAL',
        status: 'CONFISCATION_ACTIVE',
        action: `Mandate #${gazetteRef}. Confiscation across all 36 States.`,
      });

      this.showToast(`🚨 Seizure Order #${gazetteRef} Broadcasted to 1,420 Pharmacies!`);
      this.render();
    }

    async submitRdtTest() {
      const pName = document.getElementById('rdt-patient-name')?.value || this.state.rdtPatientName;
      const pAge = document.getElementById('rdt-patient-age')?.value || this.state.rdtPatientAge;
      const pLoc = document.getElementById('rdt-location')?.value || this.state.rdtLocation;
      const pChw = document.getElementById('rdt-chw')?.value || this.state.rdtCHWName;
      const pBatch = document.getElementById('rdt-batch')?.value || this.state.rdtLinkedBatch;

      const testPayload = {
        patientName: pName,
        patientAge: parseInt(pAge, 10) || 28,
        gender: this.state.rdtGender,
        location: pLoc,
        chwName: pChw,
        testType: 'Malaria Rapid Diagnostic Test (Pf/Pv Antigen)',
        result: this.state.rdtResult,
        controlLineValid: this.state.rdtControlLine,
        testLineIntensity: `${this.state.rdtIntensity}% optical density`,
        linkedBatchId: pBatch,
      };

      let apiRes = null;
      if (window.WelliVerifyAPI) {
        apiRes = await window.WelliVerifyAPI.recordRdtTest(testPayload);
      }

      const newRecord = {
        id: `RDT-${Date.now()}`,
        testNo: `RDT-MAL-2026-${Math.floor(100 + Math.random()*900)}`,
        patientName: pName,
        patientAge: parseInt(pAge, 10) || 28,
        gender: this.state.rdtGender,
        location: pLoc,
        result: this.state.rdtResult,
        notes: this.state.rdtResult.includes('POSITIVE')
          ? `Positive Pf test linked to verified authentic medication lot ${pBatch}.`
          : 'Negative test. Antimalarials safely withheld per stewardship rules.',
        timestamp: 'Just now',
        ledgerHash: apiRes ? apiRes.ledgerHash : '0x' + Math.random().toString(16).slice(2, 34),
      };

      this.data.rdtTests.unshift(newRecord);
      this.showToast(`✅ RDT Diagnostic Anchored to Sovereign Ledger!`);
      this.render();
    }

    openThermalReceipt(batchId = 'AL-240981', prodName = 'Artemether/Lumefantrine 80/480mg') {
      this.state.thermalReceiptData = {
        batchId: batchId || 'AL-240981',
        productName: prodName || 'Artemether/Lumefantrine 80/480mg',
      };
      this.state.thermalReceiptModalOpen = true;
      this.render();
    }

    handleHardwareScan(code) {
      this.state.lastHardwareScannedCode = code;
      this.showToast(`📦 Handheld Wedge Scan: ${code}`);
      const role = this.state.role;
      this.state.screens[role] = (role === 'patient') ? 'verify' : 'scan';
      this.state.selectedSampleCode = code;
      this.startScan(false, code);
    }

    handleUssdKey(key) {
      if (this.state.ussdDialInput === '*384*24#') {
        this.state.ussdDialInput = key;
      } else {
        this.state.ussdDialInput += key;
      }
      this.render();
    }

    handleUssdClear() {
      this.state.ussdDialInput = '';
      this.state.ussdDisplayLines = 'WelliVerify National NAFDAC Trust Gateway:\n1. Verify Drug PIN/Batch\n2. Report Counterfeit / Reaction\n3. Active National Recalls\n4. Emergency Whistleblower';
      this.state.ussdPromptText = 'Enter choice (1-4):';
      this.render();
    }

    async handleUssdSend() {
      const input = this.state.ussdDialInput.trim().toUpperCase();
      this.showToast(`Connecting to NAFDAC USSD Gateway...`);

      let res = null;
      if (window.WelliVerifyAPI) {
        res = await window.WelliVerifyAPI.queryUssd({ dialCode: '*384*24#', input });
      }

      if (res && res.text) {
        this.state.ussdDisplayLines = res.text;
        this.state.ussdPromptText = res.prompt;
      } else {
        // Fallback local response
        if (input === '1') {
          this.state.ussdDisplayLines = 'Enter the Batch No or Serial from your medicine carton (e.g. AL-240981):';
          this.state.ussdPromptText = 'Code:';
        } else if (input.includes('AL-240981')) {
          this.state.ussdDisplayLines = '✅ NAFDAC VERIFIED GENUINE!\nProduct: Coartem Dispersible 80/480mg\nBatch: AL-240981 (Exp: 12/2027)\nMfg: Novartis / Genevith\nStatus: SAFE TO USE';
          this.state.ussdPromptText = null;
        } else if (input.includes('AL-77209')) {
          this.state.ussdDisplayLines = '🚨 CRITICAL WARNING! DO NOT CONSUME!\nBatch AL-77209 is a CONFIRMED SEIZED LOT.\nZero API detected. Return to pharmacy.';
          this.state.ussdPromptText = null;
        } else if (input === '3') {
          this.state.ussdDisplayLines = '⚠️ ACTIVE NATIONAL RECALLS:\n• AL-77209: Coartem (Seized)\n• OXY-1188: Oxytocin Excursion\nDial *384*24# to check another code.';
          this.state.ussdPromptText = null;
        } else {
          this.state.ussdDisplayLines = `⚠️ UNRECOGNIZED CODE: "${input}"\nNot found in NAFDAC database.\nDO NOT CONSUME.\nCall 0800-1-NAFDAC.`;
          this.state.ussdPromptText = null;
        }
      }
      this.state.ussdDialInput = '';
      this.render();
    }

    // --- HTML Template Renderers ---

    renderHeader(screen, role, notifCount, showBack) {
      const titleObj = TITLES[screen];
      let title = typeof titleObj === 'object' ? (titleObj[role] || titleObj.default) : (titleObj || 'WelliVerify');

      return `
        <div class="app-header">
          ${showBack ? `
            <button type="button" class="btn btn-ghost btn-icon" aria-label="Back" data-action="go-back" style="width:32px;height:32px">
              ${ICONS.arrowLeft}
            </button>
          ` : `
            <button type="button" class="btn btn-ghost btn-icon" aria-label="Menu" data-action="toggle-drawer" style="width:32px;height:32px">
              ${ICONS.menu}
            </button>
          `}
          <div style="display:flex;align-items:baseline;gap:8px;flex:1;min-width:0">
            <span class="header-brand-glyph">W</span>
            <div class="header-title">${title}</div>
          </div>
          <button type="button" class="btn btn-ghost btn-icon" aria-label="Rural USSD Phone (*384*24#)" data-action="toggle-ussd-modal" title="Rural USSD Phone Simulator (*384*24#)" style="width:28px;height:28px;font-size:12px;padding:0">
            📟
          </button>
          <button type="button" class="btn btn-ghost btn-icon bell-btn" aria-label="Notifications" data-action="go" data-target="notifications">
            ${ICONS.bell}
            ${notifCount > 0 ? `<span class="tag tag-accent-2 bell-badge">${notifCount}</span>` : ''}
          </button>
          <span class="tag tag-accent" style="font-size:10px;text-transform:uppercase">${role}</span>
        </div>
      `;
    }

    renderDrawer(role) {
      const isOpen = this.state.drawerOpen;
      const notifs = this.getNotificationFeed(role);
      const recallCount = this.data.recalls.length;
      const alertCount = this.data.networkAlerts.length;
      const invCount = this.data.investigations.length;
      const inboxCount = this.data.reportsInbox.length - this.state.dismissedReports.length;

      let navItems = [];
      if (role === 'pharmacist') {
        navItems = [
          { target: 'home', label: 'Dashboard' },
          { target: 'scan', label: 'Scan & verify' },
          { target: 'inventory', label: 'Inventory' },
          { target: 'escrow', label: 'WelliPay Escrow & Settlement' },
          { target: 'simulator', label: 'Supply Chain Simulator' },
          { target: 'rdt', label: 'Field CHW Rapid Test (RDT)' },
          { target: 'fefo', label: 'Stockout alerts' },
          { target: 'nearby', label: 'Nearby availability' },
          { target: 'forecast', label: 'Demand forecast' },
          { target: 'recall', label: 'Recalls & alerts', badge: recallCount, tagClass: 'tag-accent-2' },
          { target: 'report', label: 'Report a concern' },
        ];
      } else if (role === 'patient') {
        navItems = [
          { target: 'home', label: 'Home' },
          { target: 'verify', label: 'Verify a product' },
          { target: 'escrow', label: 'HMO Co-Pay & Claims' },
          { target: 'rdt', label: 'Rapid Malaria Test Kit' },
          { target: 'availability', label: 'Nearby availability' },
          { target: 'prescriptions', label: 'My prescriptions' },
          { target: 'reminders', label: 'Reminders' },
          { target: 'report', label: 'Report a concern' },
        ];
      } else if (role === 'distributor') {
        navItems = [
          { target: 'home', label: 'Dashboard' },
          { target: 'escrow', label: 'WelliPay B2B Escrow' },
          { target: 'serialization', label: 'GS1 Packaging Studio' },
          { target: 'simulator', label: 'Supply Chain Simulator' },
          { target: 'shipments', label: 'Shipments' },
          { target: 'recall', label: 'Recalls' },
          { target: 'alerts', label: 'Alerts', badge: alertCount, tagClass: 'tag-accent-2' },
          { target: 'trust', label: 'My trust profile' },
          { target: 'coldchain', label: 'Cold chain' },
          { target: 'report', label: 'Report an issue' },
          { target: 'marketplace', label: 'Marketplace' },
          { target: 'assistant', label: 'Ask WelliVerify' },
          { target: 'price', label: 'Price intelligence' },
        ];
      } else if (role === 'regulator') {
        navItems = [
          { target: 'home', label: 'Overview' },
          { target: 'radar', label: 'Incident Radar & Seizures' },
          { target: 'serialization', label: 'GS1 Serial Registry' },
          { target: 'simulator', label: 'Supply Chain Simulator' },
          { target: 'recall', label: 'Recall dashboard' },
          { target: 'alerts', label: 'Alert network', badge: alertCount, tagClass: 'tag-accent-2' },
          { target: 'verification', label: 'KYB queue' },
          { target: 'investigation', label: 'Investigations', badge: invCount, tagClass: 'tag-accent-2' },
          { target: 'inbox', label: 'Reports inbox', badge: inboxCount > 0 ? inboxCount : null, tagClass: 'tag-accent-2' },
          { target: 'map', label: 'Supply chain map' },
          { target: 'forecast', label: 'Demand forecast' },
          { target: 'assistant', label: 'Ask WelliVerify' },
          { target: 'price', label: 'Price intelligence' },
        ];
      } else if (role === 'lab') {
        navItems = [
          { target: 'home', label: 'Dashboard' },
          { target: 'assay', label: 'Chemical Assay (HPLC)' },
          { target: 'coas', label: 'Certificates of Analysis (CoA)' },
          { target: 'consumables', label: 'Consumables & Reagents' },
          { target: 'simulator', label: 'Supply Chain Simulator' },
          { target: 'report', label: 'Report an issue' },
        ];
      }

      const activeScreen = this.state.screens[role];

      return `
        <div class="drawer-scrim ${isOpen ? 'open' : ''}" data-action="close-drawer"></div>
        <div class="drawer-panel ${isOpen ? 'open' : ''}">
          <div class="drawer-brand">
            <div class="drawer-brand-mark">W</div>
            <div class="drawer-brand-text">WelliVerify</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:4px;overflow-y:auto;flex:1">
            ${navItems.map((item) => `
              <button type="button" class="btn btn-ghost drawer-item ${activeScreen === item.target ? 'active' : ''}" data-action="nav-to" data-target="${item.target}">
                <span>${item.label}</span>
                ${item.badge != null ? `<span class="tag ${item.tagClass || 'tag-accent-2'} drawer-item-badge" style="font-size:9px;padding:1px 6px">${item.badge}</span>` : ''}
              </button>
            `).join('')}
          </div>
          <div style="padding-top:14px;border-top:1px solid var(--color-divider);display:flex;flex-direction:column;gap:6px">
            <button type="button" class="btn btn-secondary drawer-item ${activeScreen === 'profile' ? 'active' : ''}" data-action="nav-to" data-target="profile">
              Profile
            </button>
          </div>
        </div>
      `;
    }

    renderLogin() {
      const loginRole = this.state.loginRole;
      const idn = this.data.identities[loginRole];

      const roleTile = (r, label) => {
        const isSelected = loginRole === r;
        return `
          <button type="button" class="btn ${isSelected ? 'btn-primary' : 'btn-secondary'}" data-action="select-login-role" data-role="${r}" style="justify-content:center;font-size:12.5px;padding:8px">
            ${label}
          </button>
        `;
      };

      return `
        <div class="wv-scroll" style="justify-content:center;padding:32px 28px;gap:26px">
          <div style="display:flex;flex-direction:column;gap:6px;text-align:left">
            <div style="display:flex;align-items:center;gap:10px">
              <div style="width:36px;height:36px;border-radius:var(--radius-md);background:var(--color-accent);color:#fff;display:flex;align-items:center;justify-content:center;font-family:var(--font-heading);font-weight:600;font-size:18px">W</div>
              <div style="font-family:var(--font-heading);font-weight:600;font-size:24px">WelliVerify</div>
            </div>
            <div style="font-size:13px;letter-spacing:0.06em;text-transform:uppercase;opacity:0.68">Verify. Trace. Protect.</div>
          </div>

          <div>
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.68;margin-bottom:10px">Continue as</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
              ${roleTile('pharmacist', 'Pharmacist')}
              ${roleTile('patient', 'Patient')}
              ${roleTile('distributor', 'Distributor')}
              ${roleTile('regulator', 'Regulator')}
              <div style="grid-column:1/-1">
                ${roleTile('lab', 'Laboratory')}
              </div>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:16px">
            <div class="field">
              <label>${idn.idLabel}</label>
              <input class="input" value="${idn.idValue}" />
            </div>
            <div class="field">
              <label>Password</label>
              <input class="input" type="password" value="••••••••" />
            </div>
            <div style="font-size:12px;opacity:0.7;line-height:1.4">${idn.note}</div>
            <button type="button" class="btn btn-primary btn-block" data-action="login" style="margin-top:6px">
              Continue ${ICONS.arrowRight}
            </button>
          </div>
        </div>
      `;
    }

    renderProfile() {
      const role = this.state.role;
      const idn = this.data.identities[role];

      const radioItem = (r, label) => `
        <label class="radio" style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;cursor:pointer">
          <span style="display:flex;align-items:center;gap:10px">
            <input type="radio" name="switch-role-opt" ${role === r ? 'checked' : ''} data-action="switch-role" data-role="${r}" />
            <span class="dot"></span>
            <span>${label}</span>
          </span>
          <span class="tag tag-neutral" style="font-size:9.5px;text-transform:uppercase">${r}</span>
        </label>
      `;

      return `
        <div style="display:flex;flex-direction:column;gap:20px">
          <div>
            <div style="font-family:var(--font-heading);font-weight:600;font-size:20px">${idn.name}</div>
            <p style="font-size:13px;opacity:0.75;margin:4px 0 0">${idn.meta}</p>
          </div>

          <div class="card elev-sm">
            <div class="card-kicker">Security & Credential Verification</div>
            <div style="font-size:12.5px;line-height:1.45;opacity:0.85">${idn.note}</div>
          </div>

          <div>
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.68;margin-bottom:10px">Switch active role</div>
            <div style="display:flex;flex-direction:column;gap:6px;background:var(--color-surface);padding:12px;border-radius:var(--radius-md)">
              ${radioItem('pharmacist', 'Pharmacist')}
              ${radioItem('patient', 'Patient')}
              ${radioItem('distributor', 'Distributor')}
              ${radioItem('regulator', 'Regulator')}
              ${radioItem('lab', 'Laboratory')}
            </div>
          </div>

          <button type="button" class="btn btn-ghost btn-block" data-action="sign-out" style="color:var(--color-accent-2);margin-top:10px">
            Sign out of WelliVerify
          </button>
        </div>
      `;
    }

    renderNotifications() {
      const feed = this.getNotificationFeed(this.state.role);

      return `
        <div style="display:flex;flex-direction:column;gap:12px">
          ${feed.length > 0 ? feed.map((n) => `
            <div class="card elev-sm">
              <div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px">
                <div class="card-title" style="font-size:14px">${n.title}</div>
                <span class="tag ${n.tagClass}" style="font-size:10px">${n.tagText}</span>
              </div>
              <div class="card-meta" style="font-size:11.5px">${n.meta}</div>
            </div>
          `).join('') : `
            <div style="text-align:center;padding:48px 0;opacity:0.6;font-size:13.5px">
              No notifications right now.
            </div>
          `}
        </div>
      `;
    }

    // --- Pharmacist Screens ---
    renderPharmacistHome() {
      return `
        <div style="display:flex;flex-direction:column;gap:20px">
          <div>
            <div style="font-family:var(--font-heading);font-weight:600;font-size:20px">Good afternoon, Chidinma</div>
            <div style="font-size:13px;opacity:0.7">GreenLife Pharmacy · Wuse II, Abuja</div>
          </div>

          <div style="display:flex;gap:32px">
            <div>
              <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.68">Stockout risk</div>
              <div style="font-family:var(--font-heading);font-weight:600;font-size:30px;color:var(--color-accent-700);line-height:1.15">3 items</div>
              <div style="font-size:12px;opacity:0.68">Within 14 days</div>
            </div>
            <div>
              <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.68">Active recalls</div>
              <div style="font-family:var(--font-heading);font-weight:600;font-size:30px;color:var(--color-accent-2-700);line-height:1.15">1 batch</div>
              <div style="font-size:12px;opacity:0.68">Requires action</div>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:10px">
            <button type="button" class="btn btn-primary btn-block" data-action="go" data-target="scan" style="justify-content:center">
              Scan a product ${ICONS.scan}
            </button>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
              <button type="button" class="btn btn-secondary" data-action="nav-to" data-target="inventory">Inventory</button>
              <button type="button" class="btn btn-secondary" data-action="nav-to" data-target="fefo">Stockout alerts</button>
            </div>
          </div>

          <div>
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.68;margin-bottom:10px">Recent activity</div>
            <div style="display:flex;flex-direction:column;gap:10px">
              <div class="card elev-sm">
                <div class="card-body" style="font-size:13px">Verified <strong>Amoxicillin 500mg</strong> · Batch AMX-9931</div>
                <div class="card-meta" style="font-size:11px">2 hours ago · Verified safe</div>
              </div>
              <div class="card elev-sm">
                <div class="card-body" style="font-size:13px">Recall notice issued for <strong>Batch AL-77209</strong></div>
                <div class="card-meta" style="font-size:11px">Yesterday · Action required</div>
              </div>
            </div>
          </div>

          <div class="card elev-md">
            <div style="display:flex;justify-content:space-between;align-items:baseline">
              <div class="card-title" style="font-size:14px">Regional Supply Trend</div>
              <span class="tag tag-accent-2" style="font-size:10px">Risk Alert</span>
            </div>
            <p class="card-body" style="font-size:12.5px">Insulin supply declining across Kaduna & Abuja zone · Estimated coverage ~6 days.</p>
          </div>
        </div>
      `;
    }

    renderScan(role) {
      const isScanning = this.state.scanState === 'scanning';
      const isOffline = window.WelliVerifyOfflineDB?.isSimulatedOffline;
      const scanHint = isScanning
        ? 'Verifying against NAFDAC registry…'
        : 'Align the QR code, GS1 barcode or DataMatrix within the frame';
      const activeCode = this.state.selectedSampleCode || 'AL-240981';

      return `
        <div style="display:flex;flex-direction:column;gap:14px;align-items:center">
          ${isOffline ? `
            <div class="offline-banner">
              <span style="font-size:14px">⚡</span>
              <div>
                <strong>Offline Field Resilience Active:</strong> 5,420 NAFDAC cryptographic hashes loaded. Point-of-care verification will execute against local storage and queue for ledger sync.
              </div>
            </div>
          ` : ''}

          <!-- Live Camera Controls Bar -->
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <span class="hardware-scanner-pill ${this.state.lastHardwareScannedCode ? 'scanning' : ''}" title="Listening for USB/Bluetooth 2D barcode scanner wedge input">
              <span>⚡</span> Wedge Scanner Ready
            </span>
            <button type="button" class="btn btn-ghost" data-action="test-hardware-scanner" style="font-size:10px;padding:2px 8px;border:1px solid #cbd5e1">
              Test Scanner Wedge
            </button>
          </div>

          <div class="camera-controls-bar">
            <button type="button" class="btn btn-ghost" data-action="toggle-camera" style="font-size:11px;padding:3px 8px">
              ${this.state.cameraActive ? '🔴 Disable Live Camera' : '📷 Enable Live Camera (WebRTC)'}
            </button>
            <span class="tag ${this.state.cameraActive ? 'tag-accent' : 'tag-neutral'}" style="font-size:9.5px">
              ${this.state.cameraActive ? 'Sensor: Active' : 'Simulated Viewport'}
            </span>
          </div>

          <div class="scan-viewport" id="scan-viewport">
            ${this.state.cameraActive ? `<video id="live-camera-video" class="scan-video" autoplay playsinline muted></video>` : ''}
            <div class="scan-frame"></div>
            ${isScanning ? `<div class="scan-line"></div>` : ''}
            <div style="color:rgba(255,255,255,0.7);font-size:10.5px;letter-spacing:0.06em;text-transform:uppercase;z-index:2;background:rgba(0,0,0,0.55);padding:2px 8px;border-radius:2px">
              ${isScanning ? 'Processing Sensor Feed…' : (this.state.cameraActive ? 'WebRTC Live Stream' : 'Ready')}
            </div>
          </div>

          <div style="font-size:12.5px;opacity:0.75;text-align:center;max-width:32ch">${scanHint}</div>

          <!-- Primary Trigger Button -->
          <button type="button" class="btn btn-primary btn-block" data-action="start-scan" data-fail="false" data-code="${activeCode}" ${isScanning ? 'disabled' : ''}>
            ${isScanning ? 'Verifying with NAFDAC…' : `Scan Code: ${activeCode}`} ${ICONS.scan}
          </button>

          <!-- Interactive Sample Barcodes Tray -->
          <div class="sample-barcodes-tray">
            <div class="sample-tray-title">
              <span>Interactive Serialized Sample Packs</span>
              <span style="font-size:9.5px;color:var(--color-accent);font-weight:normal">Tap any to test</span>
            </div>
            <div class="sample-card-grid">
              ${(this.data.sampleBarcodes || []).map((sb) => `
                <div class="sample-card ${this.state.selectedSampleCode === sb.code ? 'active' : ''}" data-action="select-sample-code" data-code="${sb.code}">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <span class="sample-name">${sb.name}</span>
                    <span class="tag ${sb.tagClass}" style="font-size:8.5px;padding:1px 4px">${sb.type.split('·')[0]}</span>
                  </div>
                  <div class="sample-meta">${sb.sub}</div>
                  <div style="font-size:9.5px;color:var(--color-accent);margin-top:2px;font-weight:600">Scan this code &rarr;</div>
                </div>
              `).join('')}
            </div>
          </div>

          <button type="button" class="btn btn-ghost" data-action="go" data-target="product" style="font-size:12px;margin-top:4px">
            Enter product code manually
          </button>

          <button type="button" class="btn btn-ghost" data-action="start-scan" data-fail="true" style="font-size:11.5px;color:var(--color-accent-2)">
            Simulate an unrecognized code
          </button>

          <button type="button" class="btn btn-ghost" data-action="go" data-target="voice" style="font-size:12px">
            Verify by voice instead
          </button>

          <div style="font-size:11px;opacity:0.6;text-align:center;line-height:1.4">
            No camera or data? Text VERIFY + code to 20880, or send photo on WhatsApp.
          </div>
        </div>
      `;
    }

    renderProductRecord(role) {
      const isPharmacist = role === 'pharmacist';
      const v = this.state.lastVerification;
      const prodName = v?.product?.name || 'Artemether/Lumefantrine';
      const mfgName = v?.product?.manufacturer || 'Novartis Pharma AG / Genevith';
      const batchNo = v?.batch?.batchId || 'AL-240981';
      const regNo = v?.product?.nafdacRegNo || 'A4-0231';
      const riskTier = v?.risk_status?.tier || 'Low';
      const riskClass = riskTier === 'CRITICAL' ? 'tag-accent-2' : 'tag-accent';

      return `
        <div style="display:flex;flex-direction:column;gap:18px">
          <div style="display:flex;justify-content:center;flex-direction:column;align-items:center;gap:4px">
            <span class="tag tag-accent" style="font-size:12px;padding:6px 14px">
              ${ICONS.shieldCheck}&nbsp; PRODUCT VERIFIED VIA NAFDAC GATEWAY
            </span>
            ${v?.verification_hash ? `
              <div style="font-family:ui-monospace,monospace;font-size:9.5px;color:var(--color-text-subtle);opacity:0.8">
                Receipt: SHA256:${v.verification_hash.slice(0, 20)}…
              </div>
            ` : ''}
          </div>

          <div style="text-align:center">
            <div style="font-family:var(--font-heading);font-weight:600;font-size:21px">${prodName}</div>
            <div style="font-size:13px;opacity:0.7">${mfgName} · 80/480mg Tablets</div>
          </div>

          <div class="card elev-sm" style="display:flex;flex-direction:column;gap:10px">
            <div style="display:flex;justify-content:space-between;font-size:13px"><span style="opacity:0.7">Batch</span><strong>${batchNo}</strong></div>
            <div style="display:flex;justify-content:space-between;font-size:13px"><span style="opacity:0.7">Expiry</span><strong>08/2028</strong></div>
            <div style="display:flex;justify-content:space-between;font-size:13px"><span style="opacity:0.7">NAFDAC registration</span><strong style="color:var(--color-accent)">Valid (${regNo})</strong></div>
            ${isPharmacist ? `
              <div style="display:flex;justify-content:space-between;font-size:13px"><span style="opacity:0.7">Supply-chain status</span><strong>Authorized</strong></div>
              <div style="display:flex;justify-content:space-between;font-size:13px"><span style="opacity:0.7">Last verified</span><strong>Abuja, Nigeria</strong></div>
              <div style="display:flex;justify-content:space-between;font-size:13px"><span style="opacity:0.7">Risk</span><span class="tag ${riskClass}">${riskTier}</span></div>
            ` : `
              <div style="display:flex;justify-content:space-between;font-size:13px"><span style="opacity:0.7">Safety alerts</span><strong>None currently reported</strong></div>
            `}
          </div>

          ${isPharmacist ? `
            <div>
              <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.68;margin-bottom:10px">Supply-chain journey</div>
              <div class="journey-steps">
                <div class="journey-step">XYZ Pharma Ltd. <span style="opacity:0.6">— produced</span></div>
                <div class="journey-step">Meridian Imports Ltd. <span style="opacity:0.6">— imported</span></div>
                <div class="journey-step">Northgate Distribution <span style="opacity:0.6">— dispatched</span></div>
                <div class="journey-step active"><strong>GreenLife Pharmacy</strong> <span style="opacity:0.6">— received & in stock</span></div>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
              <button type="button" class="btn btn-secondary" data-action="go" data-target="supplier">Supplier profile</button>
              <button type="button" class="btn btn-secondary" data-action="go" data-target="risk">Risk breakdown</button>
            </div>
          ` : `
            <div style="font-size:12.5px;opacity:0.7;text-align:center;line-height:1.4">
              If you suspect a problem with packaging or experience side effects, report it immediately.
            </div>
          `}

          <button type="button" class="btn btn-secondary btn-block" data-action="open-thermal-receipt" data-batch="${batchNo}" data-prod="${prodName}" style="margin-top:6px;gap:6px">
            <span>🖨️</span> Generate POS Thermal Receipt (58mm/80mm)
          </button>
          <button type="button" class="btn btn-secondary btn-block" data-action="go" data-target="photocheck">
            AI packaging check
          </button>
          <button type="button" class="btn btn-ghost btn-block" data-action="go" data-target="report">
            Report a concern with this product
          </button>
        </div>
      `;
    }

    renderUnableToVerify(role) {
      const rescanTarget = role === 'patient' ? 'verify' : 'scan';
      return `
        <div style="display:flex;flex-direction:column;align-items:center;gap:16px;padding-top:24px;text-align:center">
          <span class="tag tag-accent-2" style="font-size:12px;padding:6px 14px">UNABLE TO VERIFY</span>
          <div style="font-family:var(--font-heading);font-weight:600;font-size:19px">Unrecognized Code</div>
          <p style="font-size:13px;opacity:0.75;max-width:28ch;line-height:1.45">
            We couldn't confirm this code against the NAFDAC registry. It may be damaged, unregistered, or fraudulent. Do not rely on this product until it's verified.
          </p>
          <button type="button" class="btn btn-secondary btn-block" data-action="nav-to" data-target="${rescanTarget}">
            Try again
          </button>
          <button type="button" class="btn btn-ghost btn-block" data-action="go" data-target="report">
            Report anyway
          </button>
        </div>
      `;
    }

    renderInventory() {
      const query = this.state.inventorySearch;
      const filter = this.state.inventoryFilter;

      let items = this.data.inventory.filter((item) => {
        const matchesQuery = item.name.toLowerCase().includes(query) || item.batch.toLowerCase().includes(query);
        if (!matchesQuery) return false;
        if (filter === 'expiring') return item.days <= 100;
        if (filter === 'low') return item.qty <= 30;
        return true;
      });

      return `
        <div style="display:flex;flex-direction:column;gap:14px">
          <input id="inv-search-input" class="input" placeholder="Search inventory (name or batch)" value="${this.state.inventorySearch}" />

          <div class="filter-row">
            <span class="tag filter-pill ${filter === 'all' ? 'tag-accent' : 'tag-outline'}" data-action="filter-inventory" data-filter="all">All (${this.data.inventory.length})</span>
            <span class="tag filter-pill ${filter === 'expiring' ? 'tag-accent' : 'tag-outline'}" data-action="filter-inventory" data-filter="expiring">Expiring soon</span>
            <span class="tag filter-pill ${filter === 'low' ? 'tag-accent' : 'tag-outline'}" data-action="filter-inventory" data-filter="low">Low stock</span>
          </div>

          <div id="inv-list-container" style="display:flex;flex-direction:column;gap:10px">
            ${items.length > 0 ? items.map((item) => `
              <div class="card elev-sm">
                <div style="display:flex;justify-content:space-between;align-items:baseline">
                  <div class="card-title" style="font-size:14px">${item.name}</div>
                  <span class="tag ${item.qty <= 20 ? 'tag-accent-2' : 'tag-neutral'}" style="font-size:10px">${item.qty} units</span>
                </div>
                <div class="card-meta" style="font-size:11.5px">Batch ${item.batch} · Expires in ${item.days} days</div>
              </div>
            `).join('') : `
              <div style="text-align:center;padding:30px 0;opacity:0.6;font-size:13px">No products matched the filter.</div>
            `}
          </div>
        </div>
      `;
    }

    renderInventoryList() {
      const container = document.getElementById('inv-list-container');
      if (!container) return;
      const query = this.state.inventorySearch;
      const filter = this.state.inventoryFilter;

      let items = this.data.inventory.filter((item) => {
        const matchesQuery = item.name.toLowerCase().includes(query) || item.batch.toLowerCase().includes(query);
        if (!matchesQuery) return false;
        if (filter === 'expiring') return item.days <= 100;
        if (filter === 'low') return item.qty <= 30;
        return true;
      });

      container.innerHTML = items.length > 0 ? items.map((item) => `
        <div class="card elev-sm">
          <div style="display:flex;justify-content:space-between;align-items:baseline">
            <div class="card-title" style="font-size:14px">${item.name}</div>
            <span class="tag ${item.qty <= 20 ? 'tag-accent-2' : 'tag-neutral'}" style="font-size:10px">${item.qty} units</span>
          </div>
          <div class="card-meta" style="font-size:11.5px">Batch ${item.batch} · Expires in ${item.days} days</div>
        </div>
      `).join('') : `<div style="text-align:center;padding:30px 0;opacity:0.6;font-size:13px">No products matched the filter.</div>`;
    }

    renderFefo() {
      const sAlert = this.data.stockoutAlert;
      const rec = this.data.rebalanceRecommendation;
      const isApproved = this.state.rebalanceApproved;

      return `
        <div style="display:flex;flex-direction:column;gap:14px">
          <!-- Predictive Stockout & Supply Optimization Callout -->
          ${sAlert ? `
            <div class="stockout-callout">
              <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px">
                <strong style="font-size:13px;color:var(--color-accent-2-700, #AA0B56)">${sAlert.title}</strong>
                <span class="tag tag-accent-2" style="font-size:9.5px">${sAlert.meta}</span>
              </div>
              <p style="font-size:12px;line-height:1.45;margin:0;opacity:0.85">${sAlert.body}</p>
            </div>
          ` : ''}

          <!-- Automated Supply Rebalancing Card -->
          ${rec ? `
            <div class="rebalance-card">
              <div class="card-kicker">WelliSupply Autonomous Optimization</div>
              <div class="card-title" style="font-size:14.5px;margin-top:2px">${rec.product}</div>

              <div class="rebalance-flow">
                <div class="flow-node">
                  <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.04em;color:var(--color-text-subtle)">Surplus Source</div>
                  <strong style="font-size:11.5px;display:block;margin-top:2px">${rec.sourceHub}</strong>
                  <span class="tag tag-neutral" style="font-size:9.5px;margin-top:4px">${rec.sourceStock}</span>
                </div>
                <div class="flow-arrow">
                  <span>${rec.transferUnits}</span>
                  <span style="font-size:16px">➔</span>
                  <span style="font-size:9.5px;opacity:0.8">${rec.distance}</span>
                </div>
                <div class="flow-node">
                  <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.04em;color:var(--color-text-subtle)">Deficit Target</div>
                  <strong style="font-size:11.5px;display:block;margin-top:2px">${rec.targetBranch}</strong>
                  <span class="tag tag-accent-2" style="font-size:9.5px;margin-top:4px">${rec.targetStock}</span>
                </div>
              </div>

              <div style="display:flex;justify-content:space-between;align-items:center;font-size:11.5px;color:var(--color-text-subtle);margin:8px 0 12px">
                <span>ETA: <strong>${rec.eta}</strong></span>
                <span>Transfer Fee: <strong>₦0 (Network Buffer)</strong></span>
              </div>

              ${!isApproved ? `
                <button type="button" class="btn btn-primary btn-block" data-action="approve-rebalance">
                  Authorize Rebalance Transfer
                </button>
              ` : `
                <div style="background:#E8F5E9;border:1px solid #C8E6C9;color:#2E7D32;padding:8px 12px;border-radius:var(--radius-sm);font-size:12px;display:flex;align-items:center;justify-content:space-between">
                  <span>✓ <strong>Dispatched:</strong> Courier #WS-8821 in transit</span>
                  <span class="tag tag-accent" style="font-size:9.5px">Active</span>
                </div>
              `}
            </div>
          ` : ''}

          <div style="font-size:11.5px;text-transform:uppercase;letter-spacing:0.06em;opacity:0.65;margin-top:6px">First-Expiry-First-Out (FEFO) Queue</div>
          ${this.data.fefoAlerts.map((a) => `
            <div class="card elev-md">
              <div style="display:flex;justify-content:space-between;align-items:baseline">
                <div class="card-title" style="font-size:14px">${a.name}</div>
                <span class="tag tag-accent-2" style="font-size:10px">${a.level}</span>
              </div>
              <p class="card-body" style="font-size:12.5px">Selling ${a.velocity}/day · stockout in ~${a.days} days</p>
              <div class="card-meta" style="font-size:11.5px">Sell ${a.batch} first (FEFO prioritization)</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    renderRecalls(role) {
      const isRegulator = role === 'regulator' || role === 'distributor';

      return `
        <div style="display:flex;flex-direction:column;gap:14px">
          ${this.data.recalls.map((r) => `
            <div class="card elev-md">
              <div style="display:flex;justify-content:space-between;align-items:baseline">
                <div class="card-title" style="font-size:14px">${r.title}</div>
                <span class="tag tag-accent-2" style="font-size:10px">${r.severity}</span>
              </div>
              <p class="card-body" style="font-size:12.5px">Batch ${r.batch} · ${r.status}</p>
              <div class="card-meta" style="font-size:11.5px">${r.action}</div>
            </div>
          `).join('')}
          ${isRegulator ? `
            <button type="button" class="btn btn-primary btn-block" data-action="nav-to" data-target="recall">
              Open recall dashboard
            </button>
          ` : ''}
        </div>
      `;
    }

    renderNearby(role) {
      const isPatient = role === 'patient';
      const query = this.state.nearbySearch;
      const list = this.data.nearbyPharmacies.filter((p) =>
        p.name.toLowerCase().includes(query) || p.area.toLowerCase().includes(query)
      );

      return `
        <div style="display:flex;flex-direction:column;gap:14px">
          <input id="nearby-search-input" class="input" placeholder="Search product or area (e.g. Wuse II)" value="${this.state.nearbySearch}" />
          <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.68">Available nearby</div>
          <div id="nearby-list-container" style="display:flex;flex-direction:column;gap:10px">
            ${list.map((p) => `
              <div class="card elev-sm">
                <div style="display:flex;justify-content:space-between;align-items:baseline">
                  <div class="card-title" style="font-size:14px">${p.name}</div>
                  <span class="tag ${p.stock === 'Unavailable' ? 'tag-neutral' : 'tag-accent'}" style="font-size:10px">${p.stock}</span>
                </div>
                <div class="card-meta" style="font-size:11.5px">${p.distance} · ${p.area} · verified ${p.verified}</div>
                ${isPatient && p.stock !== 'Unavailable' ? `
                  <button type="button" class="btn btn-secondary" style="margin-top:6px;width:100%" data-action="go" data-target="checkout">
                    Reserve & pay
                  </button>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    renderNearbyList() {
      const container = document.getElementById('nearby-list-container');
      if (!container) return;
      const isPatient = this.state.role === 'patient';
      const query = this.state.nearbySearch;
      const list = this.data.nearbyPharmacies.filter((p) =>
        p.name.toLowerCase().includes(query) || p.area.toLowerCase().includes(query)
      );

      container.innerHTML = list.map((p) => `
        <div class="card elev-sm">
          <div style="display:flex;justify-content:space-between;align-items:baseline">
            <div class="card-title" style="font-size:14px">${p.name}</div>
            <span class="tag ${p.stock === 'Unavailable' ? 'tag-neutral' : 'tag-accent'}" style="font-size:10px">${p.stock}</span>
          </div>
          <div class="card-meta" style="font-size:11.5px">${p.distance} · ${p.area} · verified ${p.verified}</div>
          ${isPatient && p.stock !== 'Unavailable' ? `
            <button type="button" class="btn btn-secondary" style="margin-top:6px;width:100%" data-action="go" data-target="checkout">
              Reserve & pay
            </button>
          ` : ''}
        </div>
      `).join('');
    }

    renderRiskEngine(role) {
      return `
        <div style="display:flex;flex-direction:column;gap:18px">
          <div>
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.68">WelliVerify Risk Engine</div>
            <div style="font-family:var(--font-heading);font-weight:600;font-size:18px;margin-top:2px">Artemether/Lumefantrine · Batch AL-77209</div>
          </div>

          <div>
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.68;margin-bottom:10px">Chain-of-custody signals</div>
            <div class="card elev-sm" style="display:flex;flex-direction:column;gap:10px">
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px"><span>Manufacturer</span><span class="tag tag-accent" style="font-size:10px">Confirmed</span></div>
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px"><span>Importer</span><span class="tag tag-accent" style="font-size:10px">Confirmed</span></div>
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px"><span>Distributor</span><span class="tag tag-accent" style="font-size:10px">Confirmed</span></div>
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px"><span>Pharmacy</span><span class="tag tag-accent" style="font-size:10px">Confirmed</span></div>
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px"><span>Registration</span><span class="tag tag-accent" style="font-size:10px">Confirmed</span></div>
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px"><span>Expiry</span><span class="tag tag-accent" style="font-size:10px">Confirmed</span></div>
            </div>
          </div>

          <div>
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.68;margin-bottom:10px">Behavioural signals — analyzed across millions of events</div>
            <div class="card elev-md" style="display:flex;flex-direction:column;gap:10px">
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px"><span>Movement velocity</span><span class="tag tag-accent-2" style="font-size:10px">Abnormal</span></div>
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px"><span>Geographic jump</span><span class="tag tag-accent-2" style="font-size:10px">Abnormal</span></div>
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px"><span>Supplier purchasing pattern</span><span class="tag tag-accent-2" style="font-size:10px">Abnormal</span></div>
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px"><span>Serial reuse</span><span class="tag tag-accent-2" style="font-size:10px">Detected</span></div>
            </div>
          </div>

          <div class="formula-banner">
            <div style="font-size:10.5px;text-transform:uppercase;letter-spacing:0.06em;opacity:0.75;margin-bottom:6px">Bayesian Supply-Chain Anomaly Scoring</div>
            <div class="formula-row">
              <span style="font-family:ui-monospace, monospace;color:#38a6cf;font-size:11px">AnomalyIndex = 0.40·VelocityJump + 0.35·SerialCloning + 0.25·PurchasingPattern</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.15)">
              <span style="font-size:12px">Calculated Behavioral Entropy</span>
              <strong style="font-size:13.5px;color:#ff458e">0.89 (Severe Deviation)</strong>
            </div>
          </div>

          <div style="text-align:center;padding:12px 0">
            <span class="tag tag-accent-2" style="font-size:13px;padding:8px 16px">SUPPLY-CHAIN ANOMALY DETECTED</span>
          </div>

          <p style="font-size:12.5px;opacity:0.75;line-height:1.45">
            Every custody record checks out — the anomaly is behavioural: this serial moved faster than physically possible and was purchased in a pattern unlike this supplier's history. Routed for investigation, not declared counterfeit.
          </p>

          ${role === 'regulator' ? `
            <button type="button" class="btn btn-primary btn-block" data-action="nav-to" data-target="recall">
              Open recall dashboard
            </button>
          ` : ''}
        </div>
      `;
    }

    renderSupplierProfile() {
      return `
        <div style="display:flex;flex-direction:column;gap:16px">
          <div>
            <div style="font-family:var(--font-heading);font-weight:600;font-size:20px">ABC Pharmaceuticals Ltd.</div>
            <div style="font-size:12.5px;opacity:0.7">Licensed distributor · Lagos, Nigeria</div>
          </div>

          <div style="display:flex;flex-direction:column;gap:8px">
            <div style="display:flex;justify-content:space-between;font-size:13px"><span>Licence status</span><span class="tag tag-accent" style="font-size:10px">Verified</span></div>
            <div style="display:flex;justify-content:space-between;font-size:13px"><span>Regulatory credentials</span><span class="tag tag-accent" style="font-size:10px">Verified</span></div>
            <div style="display:flex;justify-content:space-between;font-size:13px"><span>Facility inspection</span><span class="tag tag-accent" style="font-size:10px">Verified</span></div>
            <div style="display:flex;justify-content:space-between;font-size:13px"><span>Documentation renewal</span><span class="tag tag-outline" style="font-size:10px">Due in 12 days</span></div>
          </div>

          <div class="card elev-sm" style="display:flex;flex-direction:column;gap:10px">
            <div style="display:flex;justify-content:space-between;font-size:13px"><span style="opacity:0.7">Authorized products</span><strong>87</strong></div>
            <div style="display:flex;justify-content:space-between;font-size:13px"><span style="opacity:0.7">Supply-chain history</span><strong>4 years</strong></div>
            <div style="display:flex;justify-content:space-between;font-size:13px"><span style="opacity:0.7">Recall history</span><strong>0</strong></div>
            <div style="display:flex;justify-content:space-between;font-size:13px"><span style="opacity:0.7">Compliance events</span><strong>0 open</strong></div>
          </div>
        </div>
      `;
    }

    renderForecast() {
      return `
        <div style="display:flex;flex-direction:column;gap:14px">
          <div style="font-size:12.5px;opacity:0.7">Predicted demand shifts, modeled from sales velocity and seasonal disease patterns.</div>
          ${this.data.forecastData.map((f) => `
            <div class="card elev-sm">
              <div style="display:flex;justify-content:space-between;align-items:baseline">
                <div class="card-title" style="font-size:14px">${f.product}</div>
                <span class="tag tag-accent" style="font-size:10px">${f.trend}</span>
              </div>
              <div class="card-meta" style="font-size:11.5px">${f.region} · confidence ${f.confidence}</div>
              <p class="card-body" style="font-size:12.5px">${f.note}</p>
            </div>
          `).join('')}
        </div>
      `;
    }

    renderPhotocheck() {
      const isDone = this.state.photocheckDone;

      return `
        <div style="display:flex;flex-direction:column;gap:16px">
          <div style="font-size:12.5px;opacity:0.75;line-height:1.4">
            Compares the pack's print quality and markings against verified reference imagery — catches physical counterfeits that carry a valid-looking code.
          </div>

          <div style="display:flex;gap:12px">
            <div class="photo-slot reference">
              <strong>Reference Pack</strong>
              <span style="opacity:0.7;font-size:11px;margin-top:4px">NAFDAC Gold Master Spec</span>
            </div>
            <div class="photo-slot user-sample">
              ${isDone ? '' : `<div class="photo-scanner-beam"></div>`}
              <strong>Your Photo</strong>
              <span style="opacity:0.7;font-size:11px;margin-top:4px">Scanned Batch AL-240981</span>
            </div>
          </div>

          ${!isDone ? `
            <button type="button" class="btn btn-primary btn-block" data-action="analyze-photo">
              Analyze photo
            </button>
          ` : `
            <div class="cv-header-badge">
              <strong>NAFDAC Forensic Computer Vision:</strong> Sub-millimeter spectral optical analysis cross-referencing packaging typography, holographic diffraction, and print registration against the national specimen repository.
            </div>

            <div class="forensic-grid">
              ${this.data.forensicChecks.map((fc) => `
                <div class="forensic-item">
                  <div class="forensic-label">
                    <span class="forensic-name">${fc.name}</span>
                    <span class="forensic-sub">${fc.sub}</span>
                  </div>
                  <span class="tag ${fc.tagClass}" style="font-size:10px">${fc.status}</span>
                </div>
              `).join('')}
            </div>

            <div class="formula-banner">
              <div style="font-size:10.5px;text-transform:uppercase;letter-spacing:0.06em;opacity:0.75;margin-bottom:6px">Multimodal Bayesian Risk Formula</div>
              <div class="formula-row">
                <span style="font-family:ui-monospace, monospace;color:#38a6cf;font-size:11px">Risk = 0.35·CoC(1.0) + 0.30·CV(0.14) + 0.20·Geo(0.20) + 0.15·Serial(0.10)</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.15)">
                <span style="font-size:12px">Composite Authenticity Score</span>
                <strong style="font-size:13.5px;color:#ff458e">36.5 / 100 (HIGH RISK)</strong>
              </div>
            </div>

            <div style="text-align:center;margin-top:6px">
              <span class="tag tag-accent-2" style="font-size:12px;padding:6px 14px">PACKAGING MISMATCH DETECTED</span>
            </div>
            <button type="button" class="btn btn-ghost btn-block" data-action="go" data-target="report">
              Report this product
            </button>
          `}
        </div>
      `;
    }

    renderVoice() {
      const vState = this.state.voiceState;
      const chw = this.state.chwMode;
      const lang = this.state.chwLang;

      return `
        <div style="display:flex;flex-direction:column;gap:14px">
          <!-- Voice Mode Switcher -->
          <div style="display:flex;gap:6px">
            <button type="button" class="btn ${!chw ? 'btn-primary' : 'btn-secondary'}" style="flex:1;font-size:11.5px;padding:6px 8px" data-action="toggle-chw-mode">
              Standard Audio
            </button>
            <button type="button" class="btn ${chw ? 'btn-primary' : 'btn-secondary'}" style="flex:1;font-size:11.5px;padding:6px 8px" data-action="toggle-chw-mode">
              Rural CHW (Offline)
            </button>
          </div>

          <!-- Language Selector -->
          <div style="display:flex;align-items:center;justify-content:space-between;gap:4px">
            <span style="font-size:11px;color:var(--color-text-subtle);text-transform:uppercase;letter-spacing:0.04em">Dialect:</span>
            <div style="display:flex;gap:4px">
              ${this.data.chwLanguages.map((l) => `
                <button type="button" class="tag ${lang === l.id ? 'tag-accent' : 'tag-neutral'}" style="cursor:pointer;font-size:10px;padding:3px 7px;border:none" data-action="set-chw-lang" data-lang="${l.id}">
                  ${l.name}
                </button>
              `).join('')}
            </div>
          </div>

          ${chw ? `
            <!-- Rural Field Worker Guided Protocol -->
            <div class="chw-sync-pill">
              <svg width="12" height="12" viewBox="0 0 256 256" fill="currentColor"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"/></svg>
              <span>Field Cache: 240 Serials Loaded · Synced 18m ago</span>
            </div>

            <div class="chw-step-list">
              ${this.data.chwSteps.map((st) => {
                const isActive = this.state.activeCHWStep === st.num;
                const isCompleted = this.state.activeCHWStep > st.num;
                return `
                  <div class="chw-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" style="cursor:pointer" data-action="advance-chw-step" data-step="${st.num}">
                    <div class="step-num">${isCompleted ? '✓' : st.num}</div>
                    <div style="flex:1">
                      <div style="font-weight:600;font-size:12.5px">${st.title}</div>
                      <div style="font-size:11px;color:var(--color-text-subtle);margin-top:1px">${st.desc}</div>
                      ${isActive ? `<div style="font-size:10.5px;color:var(--color-accent);font-style:italic;margin-top:4px">${st.sample}</div>` : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <button type="button" class="btn btn-ghost btn-block" style="font-size:11.5px;margin-top:2px" data-action="toggle-ussd">
              ${this.state.ussdActive ? 'Close USSD Terminal' : 'No 3G/4G Cell Data? Open USSD Mode (*384*24#)'}
            </button>

            ${this.state.ussdActive ? `
              <div class="ussd-screen">
                <div style="color:#81C784;border-bottom:1px dashed #2E7D32;padding-bottom:6px;margin-bottom:8px">
                  NAFDAC SafeMed USSD Gateway (*384*24#)
                </div>
                <div>1. Verify Artemether AL-240981</div>
                <div>2. Verify Insulin INS-1120</div>
                <div>3. Report Fake Drug</div>
                <div style="color:#FFF;margin-top:8px">> Selected: 1 (AL-240981)</div>
                <div style="color:#C8E6C9;margin-top:4px">
                  [NAFDAC OK] AUTHENTIC REG: A4-0219<br>
                  Cadila Pharma Ltd. Exp: 06/2028<br>
                  Safe to dispense to patient.
                </div>
                <div style="font-size:10.5px;opacity:0.75;margin-top:8px">Session auto-closes in 20s · Toll-Free</div>
              </div>
            ` : ''}
          ` : ''}

          <!-- Centered Microphone for spoken command -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:14px;padding-top:12px">
            <button type="button" class="btn btn-primary mic-pulse-btn ${vState === 'listening' ? 'listening' : ''}" data-action="start-voice" aria-label="Speak">
              ${ICONS.mic}
            </button>

            ${vState === 'idle' ? `
              <div style="font-size:13px;opacity:0.7">Tap to speak in ${this.data.chwLanguages.find(l => l.id === lang)?.name || 'English'} — try "Verify this medicine"</div>
            ` : vState === 'listening' ? `
              <div style="font-size:13px;opacity:0.7;color:var(--color-accent)">Listening (${this.data.chwLanguages.find(l => l.id === lang)?.name || 'English'})…</div>
            ` : `
              <div style="width:100%;display:flex;flex-direction:column;gap:12px">
                <div class="card elev-sm">
                  <div class="card-kicker">You said (${this.data.chwLanguages.find(l => l.id === lang)?.name || 'English'})</div>
                  <p class="card-body" style="font-size:13px">"Verify Artemether batch AL-240981"</p>
                </div>
                <div class="card elev-md">
                  <div class="card-kicker">WelliVerify Speech Engine</div>
                  <p class="card-body" style="font-size:13px">
                    ${lang === 'ha' 
                      ? 'Wannan magani Artemether/Lumefantrine batch AL-240981 ya sami ingantaccen rajista daga NAFDAC. Yana da lafiya a sha.' 
                      : lang === 'yo'
                      ? 'Oògùn Artemether yìí batch AL-240981 ní àfọwọ́sí NAFDAC tó péye. Ó dára láti lò.'
                      : lang === 'pcm'
                      ? 'Dis medicine Artemether batch AL-240981 don get correct NAFDAC registration. E clean, e safe to dispense.'
                      : 'This is Artemether/Lumefantrine, batch AL-240981, verified and registered with NAFDAC. Safe to dispense.'}
                  </p>
                </div>
                <button type="button" class="btn btn-secondary btn-block" data-action="start-voice" style="margin-top:4px">
                  Speak another inquiry
                </button>
              </div>
            `}
          </div>
        </div>
      `;
    }

    renderReport(role) {
      const isDistributor = role === 'distributor';
      const isSubmitted = this.state.reportSubmitted;

      if (isSubmitted) {
        const triage = this.state.lastReportTriage;
        return `
          <div style="display:flex;flex-direction:column;align-items:center;gap:16px;padding-top:24px;text-align:center">
            <span class="tag ${triage ? triage.urgencyClass : 'tag-accent'}" style="font-size:12px;padding:6px 14px">
              ${triage ? `INCIDENT TRIAGED · ${triage.urgency.toUpperCase()}` : 'REPORT RECEIVED'}
            </span>
            <div class="card elev-sm" style="width:100%;text-align:left">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                <div class="card-kicker">WelliVerify NLP Triage Engine</div>
                <span class="tag ${triage ? triage.urgencyClass : 'tag-accent-2'}" style="font-size:10px">
                  ${triage ? triage.urgency : 'High Urgency'}
                </span>
              </div>
              <p class="card-body" style="font-size:12.5px;line-height:1.45;margin-bottom:8px">
                ${triage ? `<strong>${triage.type}</strong>: ${triage.message}` : 'Classified as suspected counterfeit · high urgency. Auto-routed to pharmacovigilance and the fraud investigation queue — no manual sorting needed.'}
              </p>
              ${triage ? `
                <div style="background:var(--color-surface-sunken);border:1px solid var(--color-border);padding:8px 10px;border-radius:var(--radius-xs);font-size:11px;margin-top:8px">
                  <div style="font-weight:600;color:var(--color-accent);margin-bottom:3px">${triage.confidence}</div>
                  <div style="color:var(--color-text-subtle);line-height:1.35">${triage.triageRoute}</div>
                </div>
              ` : ''}
            </div>
            <button type="button" class="btn btn-secondary" data-action="nav-to" data-target="home">
              Back to dashboard
            </button>
          </div>
        `;
      }

      if (isDistributor) {
        return `
          <div style="display:flex;flex-direction:column;gap:16px">
            <div class="field">
              <label>Shipment / batch</label>
              <input class="input" value="OXY-1188 — Meridian Imports → Northgate Distribution" readOnly />
            </div>
            <div class="field">
              <label>Issue type</label>
              <div class="seg" role="radiogroup">
                <label class="seg-opt"><input type="radio" name="dt" defaultChecked />Diversion</label>
                <label class="seg-opt"><input type="radio" name="dt" />Counterfeit</label>
                <label class="seg-opt"><input type="radio" name="dt" />Documentation</label>
              </div>
            </div>
            <div class="field">
              <label>Description</label>
              <textarea class="input" rows="4" placeholder="Describe the discrepancy observed during handling"></textarea>
            </div>
            <button type="button" class="btn btn-primary btn-block" data-action="submit-report">
              Submit report
            </button>
          </div>
        `;
      }

      return `
        <div style="display:flex;flex-direction:column;gap:16px">
          <div class="field">
            <label>Product</label>
            <input class="input" value="Artemether/Lumefantrine — Batch AL-240981" readOnly />
          </div>
          <div class="field">
            <label>What are you reporting?</label>
            <div class="seg" role="radiogroup">
              <label class="seg-opt"><input type="radio" name="rt" defaultChecked />Adverse event</label>
              <label class="seg-opt"><input type="radio" name="rt" />Suspected fake</label>
              <label class="seg-opt"><input type="radio" name="rt" />Quality issue</label>
            </div>
          </div>
          <div class="field">
            <label>Description</label>
            <textarea class="input" rows="4" placeholder="Describe what you observed (packaging, adverse reaction, print flaw)"></textarea>
          </div>
          <button type="button" class="btn btn-primary btn-block" data-action="submit-report">
            Submit report
          </button>
        </div>
      `;
    }

    // --- Patient Screens ---
    renderPatientHome() {
      return `
        <div style="display:flex;flex-direction:column;gap:20px">
          <div>
            <div style="font-family:var(--font-heading);font-weight:600;font-size:20px">Hello, Ngozi</div>
            <div style="font-size:13px;opacity:0.7">Abuja, Nigeria</div>
          </div>

          <div style="display:flex;flex-direction:column;gap:10px">
            <button type="button" class="btn btn-primary btn-block" data-action="go" data-target="verify" style="justify-content:center">
              Verify a product ${ICONS.scan}
            </button>
            <button type="button" class="btn btn-secondary btn-block" data-action="nav-to" data-target="availability">
              Find nearby stock
            </button>
          </div>

          <div>
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.68;margin-bottom:10px">Recently verified</div>
            <div class="card elev-sm">
              <div class="card-body" style="font-size:13px">Amoxicillin 500mg · Batch AMX-9931</div>
              <div class="card-meta" style="font-size:11px"><span class="tag tag-accent">Verified</span></div>
            </div>
          </div>
        </div>
      `;
    }

    renderCheckout() {
      const isPaid = this.state.paySuccess;

      if (isPaid) {
        return `
          <div style="display:flex;flex-direction:column;align-items:center;gap:14px;padding-top:40px;text-align:center">
            <span class="tag tag-accent" style="font-size:12px;padding:6px 14px">PAYMENT CONFIRMED</span>
            <div style="font-family:var(--font-heading);font-weight:600;font-size:24px;color:var(--color-accent-800)">WV-PO-88213</div>
            <div style="font-size:13px;opacity:0.75;line-height:1.4">Show this pickup code at Wellcare Pharmacy to collect your order.</div>
            <button type="button" class="btn btn-secondary" data-action="nav-to" data-target="home">
              Done
            </button>
          </div>
        `;
      }

      return `
        <div style="display:flex;flex-direction:column;gap:16px">
          <div class="card elev-sm" style="display:flex;flex-direction:column;gap:10px">
            <div style="display:flex;justify-content:space-between;font-size:13px"><span style="opacity:0.7">Product</span><strong>Amoxicillin 500mg</strong></div>
            <div style="display:flex;justify-content:space-between;font-size:13px"><span style="opacity:0.7">Pharmacy</span><strong>Wellcare Pharmacy</strong></div>
            <div style="display:flex;justify-content:space-between;font-size:13px"><span style="opacity:0.7">Quantity</span><strong>1 pack</strong></div>
            <div style="display:flex;justify-content:space-between;font-size:13px"><span style="opacity:0.7">Total</span><strong>₦2,400</strong></div>
          </div>

          <div style="font-size:12.5px;opacity:0.75;line-height:1.45">
            Paid securely through WelliPay. WelliVerify confirms the product and supplier — WelliPay handles the transaction.
          </div>

          <button type="button" class="btn btn-primary btn-block" data-action="pay-now">
            Pay with WelliPay
          </button>
        </div>
      `;
    }

    renderPrescriptions() {
      return `
        <div style="display:flex;flex-direction:column;gap:10px">
          ${this.data.prescriptions.map((rx) => `
            <div class="card elev-sm">
              <div style="display:flex;justify-content:space-between;align-items:baseline">
                <div class="card-title" style="font-size:14px">${rx.product}</div>
                <span class="tag tag-accent" style="font-size:10px">${rx.status}</span>
              </div>
              <div class="card-meta" style="font-size:11.5px">${rx.pharmacy} · ${rx.date}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    renderReminders() {
      return `
        <div style="display:flex;flex-direction:column;gap:10px">
          ${this.data.reminders.map((rm, i) => {
            const isTaken = !!this.state.remindersTaken[i];
            return `
              <div class="card elev-sm">
                <div class="card-title" style="font-size:14px">${rm.product}</div>
                <div class="card-meta" style="font-size:11.5px">${rm.time}</div>
                <button type="button" class="btn ${isTaken ? 'btn-primary' : 'btn-secondary'}" style="margin-top:8px;width:100%" data-action="toggle-reminder" data-idx="${i}">
                  ${isTaken ? 'Taken ✓' : 'Mark as taken'}
                </button>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    // --- Distributor Screens ---
    renderDistributorHome() {
      return `
        <div style="display:flex;flex-direction:column;gap:20px">
          <div>
            <div style="font-family:var(--font-heading);font-weight:600;font-size:20px">ABC Pharmaceuticals Ltd.</div>
            <div style="font-size:13px;opacity:0.7">Distributor · Lagos, Nigeria</div>
          </div>

          <div style="display:flex;gap:32px">
            <div>
              <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.68">Dispatched (mo.)</div>
              <div style="font-family:var(--font-heading);font-weight:600;font-size:30px;color:var(--color-accent-700);line-height:1.15">8,412</div>
              <div style="font-size:12px;opacity:0.68">units, 214 batches</div>
            </div>
            <div>
              <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.68">Trust status</div>
              <div style="font-family:var(--font-heading);font-weight:600;font-size:30px;color:var(--color-accent-700);line-height:1.15">Verified</div>
              <div style="font-size:12px;opacity:0.68">4-year history</div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            <button type="button" class="btn btn-secondary" data-action="nav-to" data-target="shipments">Track shipments</button>
            <button type="button" class="btn btn-secondary" data-action="nav-to" data-target="recall">Recalls</button>
            <button type="button" class="btn btn-secondary" data-action="nav-to" data-target="alerts">Alerts</button>
            <button type="button" class="btn btn-secondary" data-action="nav-to" data-target="price">Price intel</button>
          </div>
        </div>
      `;
    }

    renderShipments() {
      return `
        <div style="display:flex;flex-direction:column;gap:12px">
          ${this.data.shipments.map((s) => `
            <div class="card elev-sm">
              <div style="display:flex;justify-content:space-between;align-items:baseline">
                <div class="card-title" style="font-size:14px">${s.product}</div>
                <span class="tag tag-outline" style="font-size:10px">${s.status}</span>
              </div>
              <div class="card-meta" style="font-size:11.5px">Batch ${s.batch} · ${s.route}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    renderColdChain() {
      return `
        <div style="display:flex;flex-direction:column;gap:12px">
          <div style="font-size:12.5px;opacity:0.7">Live IoT sensor readings for temperature-sensitive shipments.</div>
          ${this.data.coldChainShipments.map((c, i) => `
            <div class="card elev-md" style="cursor:pointer" data-action="open-coldchain-detail" data-idx="${i}">
              <div style="display:flex;justify-content:space-between;align-items:baseline">
                <div class="card-title" style="font-size:14px">${c.product}</div>
                <span class="tag ${c.tagClass}" style="font-size:10px">${c.status}</span>
              </div>
              <p class="card-body" style="font-size:12.5px">Batch ${c.batch} · ${c.temp}</p>
              <div class="card-meta" style="font-size:11.5px">${c.reading} · ${c.action}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    renderColdChainDetail() {
      const idx = Number(this.state.selectedColdChain) || 0;
      const cc = this.data.coldChainShipments[idx] || this.data.coldChainShipments[0];

      return `
        <div style="display:flex;flex-direction:column;gap:16px">
          <div>
            <div style="font-family:var(--font-heading);font-weight:600;font-size:18px">${cc.product}</div>
            <div style="font-size:12.5px;opacity:0.7">Batch ${cc.batch} · ${cc.action}</div>
          </div>

          <span class="tag ${cc.tagClass}" style="font-size:10px;align-self:flex-start">${cc.status}</span>

          <div style="display:flex;flex-direction:column;gap:8px">
            ${cc.readings.map((r) => {
              const pct = Math.min(100, Math.round((r.temp / 15) * 100));
              return `
                <div style="display:flex;align-items:center;gap:10px">
                  <div style="font-size:11px;opacity:0.6;width:44px;flex:none">${r.time}</div>
                  <div style="flex:1;height:12px;background:var(--color-neutral-200);border-radius:var(--radius-sm);overflow:hidden">
                    <div style="height:100%;background:${r.flag ? 'var(--color-accent-2)' : 'var(--color-accent)'};width:${pct}%"></div>
                  </div>
                  <div style="font-size:11px;width:36px;flex:none;text-align:right">${r.temp}°C</div>
                </div>
              `;
            }).join('')}
          </div>

          <div style="font-size:11px;opacity:0.65;line-height:1.4">
            Threshold: 2–8°C. Bars in magenta exceeded safe limits and triggered automatic quarantine alert.
          </div>
        </div>
      `;
    }

    renderMarketplace() {
      const stageLabels = ['Pending', 'Accepted', 'Dispatched', 'Delivered'];
      const nextLabels = ['Accept order', 'Mark dispatched', 'Mark delivered'];

      return `
        <div style="display:flex;flex-direction:column;gap:12px">
          <div style="font-size:12.5px;opacity:0.7">Verified pharmacy demand — fulfil and settle through WelliPay.</div>
          ${this.data.marketOrders.map((mo, i) => {
            const stage = this.state.marketFulfilled[i] || 0;
            const isDone = stage >= 3;
            return `
              <div class="card elev-sm">
                <div style="display:flex;justify-content:space-between;align-items:baseline">
                  <div class="card-title" style="font-size:14px">${mo.pharmacy}</div>
                  <span class="tag tag-outline" style="font-size:10px">${mo.city}</span>
                </div>
                <div class="card-meta" style="font-size:11.5px">${mo.product} · ${mo.qty}</div>
                <div style="margin-top:8px">
                  <span class="tag tag-outline" style="font-size:10px">Stage: ${stageLabels[stage]}</span>
                </div>
                ${isDone ? `
                  <span class="tag tag-accent" style="font-size:10px;margin-top:6px;display:inline-block">Settled via WelliPay</span>
                ` : `
                  <button type="button" class="btn btn-secondary" style="margin-top:8px;width:100%" data-action="advance-order" data-idx="${i}">
                    ${nextLabels[stage]}
                  </button>
                `}
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    renderAskAssistant() {
      const ansIdx = this.state.assistantAnswerIdx;
      const thread = ansIdx != null ? this.data.assistantThreads[ansIdx] : null;

      return `
        <div style="display:flex;flex-direction:column;gap:14px">
          <div style="font-size:12.5px;opacity:0.7">Ask the trust graph an operational inquiry in plain language.</div>
          <input class="input" placeholder="Ask WelliVerify intelligence…" />

          <div style="display:flex;flex-direction:column;gap:8px">
            ${this.data.assistantThreads.map((t, i) => `
              <button type="button" class="btn ${ansIdx === String(i) ? 'btn-primary' : 'btn-secondary'}" style="justify-content:flex-start;text-align:left;font-size:12.5px;white-space:normal;height:auto;line-height:1.3" data-action="ask-assistant" data-idx="${i}">
                ${t.q}
              </button>
            `).join('')}
          </div>

          ${thread ? `
            <div class="card elev-md">
              <div class="card-kicker">WelliVerify AI Operational Copilot</div>
              <p class="card-body" style="font-size:13px;line-height:1.45">${thread.a}</p>

              <!-- Operational Trust Graph Query -->
              ${thread.cypher ? `
                <div style="font-size:10.5px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-text-subtle);margin-top:10px">Graph Query (Cypher / GQL)</div>
                <div class="query-box">
                  <span class="kw">MATCH</span> (b:<span class="fn">Batch</span>)&lt;-[:<span class="fn">MONITORED</span>]-(s:<span class="fn">SensorEvent</span>)<br>
                  <span class="kw">WHERE</span> s.flag = <span class="str">true</span> <span class="kw">AND</span> s.timestamp &gt; <span class="fn">date</span>() - <span class="fn">duration</span>({days:30})<br>
                  <span class="kw">RETURN</span> b.serial, s.location, s.anomaly_type
                </div>
              ` : ''}

              <!-- Visual Graph Trace Chips -->
              ${thread.nodes && thread.nodes.length ? `
                <div style="font-size:10.5px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-text-subtle);margin-top:8px">Chain of Custody Graph Trace</div>
                <div class="graph-trace">
                  ${thread.nodes.map((n, idx) => `
                    <span class="graph-node-chip">${n.label}</span>
                    ${idx < thread.nodes.length - 1 ? `<span class="graph-edge-arrow">➔</span>` : ''}
                  `).join('')}
                </div>
              ` : ''}

              <!-- Cryptographic Evidence Proof -->
              ${thread.evidence ? `
                <div class="evidence-card">
                  <div style="font-size:10px;text-transform:uppercase;font-weight:700;color:var(--color-accent);margin-bottom:3px">Cryptographic Ledger Proof</div>
                  <div style="font-size:11px;line-height:1.4">${thread.evidence}</div>
                </div>
              ` : ''}
            </div>
          ` : ''}
        </div>
      `;
    }

    renderPriceIntelligence() {
      return `
        <div style="display:flex;flex-direction:column;gap:12px">
          <div style="font-size:12.5px;opacity:0.7">Median observed acquisition price, aggregated and anonymized across the network.</div>
          ${this.data.priceRows.map((pr) => `
            <div class="card elev-sm">
              <div style="display:flex;justify-content:space-between;align-items:baseline">
                <div class="card-title" style="font-size:14px">${pr.product}</div>
                ${pr.volatile ? `<span class="tag tag-accent-2" style="font-size:10px">Price spike</span>` : ''}
              </div>
              <div style="display:flex;justify-content:space-between;font-size:12.5px;margin-top:6px"><span style="opacity:0.7">Abuja</span><strong>${pr.abuja}</strong></div>
              <div style="display:flex;justify-content:space-between;font-size:12.5px"><span style="opacity:0.7">Lagos</span><strong>${pr.lagos}</strong></div>
              <div style="display:flex;justify-content:space-between;font-size:12.5px"><span style="opacity:0.7">Kano</span><strong>${pr.kano}</strong></div>
              ${pr.volatile ? `<p class="card-body" style="font-size:11.5px;margin-top:6px;color:var(--color-accent-2)">${pr.note}</p>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    }

    // --- Regulator Screens ---
    renderRegulatorHome() {
      return `
        <div style="display:flex;flex-direction:column;gap:20px">
          <div>
            <div style="font-family:var(--font-heading);font-weight:600;font-size:20px">NAFDAC Field Office</div>
            <div style="font-size:13px;opacity:0.7">Kaduna Zone · National overview</div>
          </div>

          <div style="display:flex;gap:28px;flex-wrap:wrap">
            <div>
              <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.68">Verifications today</div>
              <div style="font-family:var(--font-heading);font-weight:600;font-size:28px;color:var(--color-accent-700)">142,880</div>
            </div>
            <div>
              <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.68">Open investigations</div>
              <div style="font-family:var(--font-heading);font-weight:600;font-size:28px;color:var(--color-accent-2-700)">7</div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            <button type="button" class="btn btn-secondary" data-action="nav-to" data-target="recall">Recall dashboard</button>
            <button type="button" class="btn btn-secondary" data-action="nav-to" data-target="alerts">Alert network</button>
            <button type="button" class="btn btn-secondary" data-action="nav-to" data-target="verification">KYB queue</button>
            <button type="button" class="btn btn-secondary" data-action="nav-to" data-target="investigation">Investigations</button>
          </div>

          <div class="card elev-md">
            <div style="display:flex;justify-content:space-between;align-items:baseline">
              <div class="card-title" style="font-size:14px">Supply risk alert</div>
              <span class="tag tag-accent-2" style="font-size:10px">Increasing</span>
            </div>
            <p class="card-body" style="font-size:12.5px">Insulin availability declining across Kaduna Zone · estimated coverage 6 days</p>
          </div>
        </div>
      `;
    }

    renderRecallDashboard() {
      return `
        <div style="display:flex;flex-direction:column;gap:18px">
          <div>
            <div style="font-family:var(--font-heading);font-weight:600;font-size:18px">Batch AL-77209</div>
            <div style="font-size:12.5px;opacity:0.7">Suspected falsification · issued 2 days ago</div>
          </div>

          <div class="card elev-sm" style="display:flex;flex-direction:column;gap:10px">
            <div style="display:flex;justify-content:space-between;font-size:13px"><span style="opacity:0.7">Total manufactured</span><strong>50,000</strong></div>
            <div style="display:flex;justify-content:space-between;font-size:13px"><span style="opacity:0.7">Located</span><strong>47,821</strong></div>
            <div style="display:flex;justify-content:space-between;font-size:13px"><span style="opacity:0.7">Dispensed</span><strong>1,743</strong></div>
            <div style="display:flex;justify-content:space-between;font-size:13px"><span style="opacity:0.7">Unknown</span><strong>436</strong></div>
            <div style="display:flex;justify-content:space-between;font-size:13px"><span style="opacity:0.7">Recovered</span><strong>31,200</strong></div>
            <div style="display:flex;justify-content:space-between;font-size:13px"><span style="opacity:0.7">Remaining</span><strong style="color:var(--color-accent-2-700)">16,621</strong></div>
          </div>

          <div>
            <div style="font-size:11px;opacity:0.68;margin-bottom:6px">Recovery progress (62%)</div>
            <div style="height:8px;border-radius:var(--radius-md);background:var(--color-neutral-300);overflow:hidden">
              <div style="height:100%;width:62%;background:var(--color-accent)"></div>
            </div>
          </div>

          <button type="button" class="btn btn-secondary btn-block" data-action="nav-to" data-target="alerts">
            Broadcast network alert
          </button>
        </div>
      `;
    }

    renderKybQueue() {
      const allDone = Object.keys(this.state.kybStatus).length >= this.data.kybQueue.length;

      return `
        <div style="display:flex;flex-direction:column;gap:12px">
          <div style="font-size:12.5px;opacity:0.7">Pending KYB applications from supply-chain organizations.</div>
          ${this.data.kybQueue.map((k, i) => {
            const status = this.state.kybStatus[i];
            return `
              <div class="card elev-sm">
                <div style="display:flex;justify-content:space-between;align-items:baseline">
                  <div class="card-title" style="font-size:14px">${k.name}</div>
                  <span class="tag tag-outline" style="font-size:10px">${k.type}</span>
                </div>
                <div class="card-meta" style="font-size:11.5px">Submitted ${k.submitted}</div>
                ${status ? `
                  <span class="tag ${status === 'Approved' ? 'tag-accent' : 'tag-accent-2'}" style="font-size:10px;margin-top:10px;display:inline-block">${status}</span>
                ` : `
                  <div style="display:flex;gap:8px;margin-top:10px">
                    <button type="button" class="btn btn-secondary" style="flex:1" data-action="approve-kyb" data-idx="${i}">Approve</button>
                    <button type="button" class="btn btn-ghost" style="flex:1" data-action="reject-kyb" data-idx="${i}">Reject</button>
                  </div>
                `}
              </div>
            `;
          }).join('')}
          ${allDone ? `
            <div style="text-align:center;padding:30px 0;opacity:0.6;font-size:13px">No pending applications — queue clear.</div>
          ` : ''}
        </div>
      `;
    }

    renderInvestigations() {
      return `
        <div style="display:flex;flex-direction:column;gap:12px">
          ${this.data.investigations.map((inv) => `
            <div class="card elev-md" style="cursor:pointer" data-action="go" data-target="risk">
              <div style="display:flex;justify-content:space-between;align-items:baseline">
                <div class="card-title" style="font-size:14px">${inv.product}</div>
                <span class="tag tag-accent-2" style="font-size:10px">${inv.status}</span>
              </div>
              <div class="card-meta" style="font-size:11.5px">Serial ${inv.serial} · seen in ${inv.locations} · ${inv.linkedCases} linked patient reports</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    renderSupplyChainMap() {
      return `
        <div style="display:flex;flex-direction:column;gap:12px">
          <div style="font-size:12.5px;opacity:0.7">Regional network density and availability status.</div>
          ${this.data.regions.map((rg) => `
            <div class="card elev-sm">
              <div style="display:flex;justify-content:space-between;align-items:baseline">
                <div class="card-title" style="font-size:14px">${rg.name}</div>
                <span class="tag ${rg.status === 'Critical' ? 'tag-accent-2' : rg.status === 'Watch' ? 'tag-outline' : 'tag-accent'}" style="font-size:10px">${rg.status}</span>
              </div>
              <div style="display:flex;gap:16px;font-size:12px;margin-top:4px">
                <span><strong>${rg.distributors}</strong> distributors</span>
                <span><strong>${rg.pharmacies}</strong> pharmacies</span>
              </div>
              <div class="card-meta" style="font-size:11.5px">${rg.note}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    renderReportsInbox() {
      const allReviewed = this.state.dismissedReports.length >= this.data.reportsInbox.length;

      return `
        <div style="display:flex;flex-direction:column;gap:12px">
          <!-- WhatsApp / SMS NLP Auto-Triage Header -->
          <div class="triage-header-notice">
            <strong>Omnichannel Citizen Ingestion Stream:</strong> WhatsApp & SMS reports analyzed in real-time by NLP triage models. Critical incidents automatically dispatched to zonal surveillance enforcement.
          </div>

          ${this.data.reportsInbox.map((rp, i) => {
            const isDismissed = this.state.dismissedReports.includes(String(i));
            const isQuarantined = this.state.quarantinedBatches.includes(rp.batch);

            if (isDismissed) {
              return `
                <div class="card elev-sm" style="opacity:0.5">
                  <div class="card-body" style="font-size:13px">${rp.reporter}</div>
                  <div class="card-meta" style="font-size:11px">Reviewed & closed</div>
                </div>
              `;
            }
            return `
              <div class="card elev-sm">
                <div class="msg-meta">
                  <strong>${rp.reporter}</strong>
                  <span>${rp.channel} · ${rp.time}</span>
                </div>

                <div style="display:flex;justify-content:space-between;align-items:baseline;margin:4px 0">
                  <div class="card-title" style="font-size:13.5px">${rp.product}</div>
                  <span class="tag tag-outline" style="font-size:9.5px">${rp.type}</span>
                </div>

                <div class="msg-bubble">
                  "${rp.message}"
                </div>

                <div style="margin:8px 0">
                  <span class="routing-badge ${rp.urgencyClass}">${rp.triageRoute}</span>
                </div>

                <div class="card-meta" style="font-size:10.5px;margin-bottom:8px">
                  ${rp.confidence}
                </div>

                <div style="display:flex;gap:6px">
                  ${isQuarantined ? `
                    <div style="flex:1;background:#FFF1F4;border:1px solid #FFC0D0;color:#AA0B56;padding:7px 10px;border-radius:var(--radius-xs);font-size:11px;font-weight:600;text-align:center">
                      QUARANTINE BROADCAST ACTIVE
                    </div>
                  ` : `
                    <button type="button" class="btn btn-secondary" style="flex:1;font-size:11px;color:var(--color-accent-2);border-color:var(--color-accent-2)" data-action="quarantine-batch" data-batch="${rp.batch}">
                      Issue Zonal Quarantine
                    </button>
                  `}
                  <button type="button" class="btn btn-ghost" style="flex:1;font-size:11px" data-action="dismiss-report" data-idx="${i}">
                    Mark reviewed
                  </button>
                </div>
              </div>
            `;
          }).join('')}
          ${allReviewed ? `
            <div style="text-align:center;padding:30px 0;opacity:0.6;font-size:13px">No pending reports — inbox clear.</div>
          ` : ''}
        </div>
      `;
    }

    // --- Laboratory Screens ---
    renderLabHome() {
      const totalAssays = this.data.labAssays.length;
      const failedAssays = this.data.labAssays.filter((a) => a.status !== 'PASSED').length;
      const passedAssays = totalAssays - failedAssays;

      return `
        <div style="display:flex;flex-direction:column;gap:18px">
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between">
              <div>
                <div style="font-family:var(--font-heading);font-weight:600;font-size:20px">Good afternoon, Tunji</div>
                <div style="font-size:12.5px;opacity:0.7">Zenith Diagnostics Reference Laboratory · Lagos</div>
              </div>
              <span class="tag tag-accent" style="font-size:10px">ISO/IEC 17025 ACCREDITED</span>
            </div>
          </div>

          <!-- Quick stat metrics -->
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
            <div class="card elev-sm" style="padding:10px">
              <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.06em;opacity:0.65">Certified CoAs</div>
              <div style="font-family:var(--font-heading);font-weight:700;font-size:24px;color:var(--color-accent);line-height:1.2">${passedAssays}</div>
              <div style="font-size:10.5px;opacity:0.6">Monographs verified</div>
            </div>
            <div class="card elev-sm" style="padding:10px">
              <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.06em;opacity:0.65">Falsifications</div>
              <div style="font-family:var(--font-heading);font-weight:700;font-size:24px;color:var(--color-accent-2);line-height:1.2">${failedAssays}</div>
              <div style="font-size:10.5px;color:var(--color-accent-2)">Contaminants flagged</div>
            </div>
            <div class="card elev-sm" style="padding:10px">
              <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.06em;opacity:0.65">Expiring Reagents</div>
              <div style="font-family:var(--font-heading);font-weight:700;font-size:24px;color:#d97706;line-height:1.2">2</div>
              <div style="font-size:10.5px;opacity:0.6">Within 20 days</div>
            </div>
          </div>

          <!-- Primary Laboratory Actions -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            <button type="button" class="btn btn-primary" data-action="nav-to" data-target="assay" style="display:flex;align-items:center;justify-content:center;gap:6px">
              <span>🔬 New HPLC Assay</span>
            </button>
            <button type="button" class="btn btn-secondary" data-action="nav-to" data-target="coas" style="display:flex;align-items:center;justify-content:center;gap:6px">
              <span>📜 Issued CoAs (${totalAssays})</span>
            </button>
            <button type="button" class="btn btn-secondary" data-action="nav-to" data-target="consumables">
              <span>🧪 Reagents & Consumables</span>
            </button>
            <button type="button" class="btn btn-secondary" data-action="nav-to" data-target="report">
              <span>🚨 Report Impurity Alert</span>
            </button>
          </div>

          <!-- Recent Assay Certifications feed -->
          <div>
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.68;margin-bottom:10px">Recent Assay Certifications & Ledger Anchors</div>
            <div style="display:flex;flex-direction:column;gap:10px">
              ${this.data.labAssays.map((assay) => `
                <div class="card elev-sm" style="border-left: 3px solid ${assay.status === 'PASSED' ? 'var(--color-accent)' : 'var(--color-accent-2)'}">
                  <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px">
                    <span style="font-weight:600;font-size:13.5px">${assay.productName}</span>
                    <span class="tag ${assay.sealClass}" style="font-size:10px">${assay.status === 'PASSED' ? `PASSED · ${assay.apiAssayPercentage}%` : `FAILED · ${assay.apiAssayPercentage}%`}</span>
                  </div>
                  <div class="card-meta" style="font-size:11.5px;margin-bottom:8px">
                    Batch: <strong>${assay.batchId}</strong> · CoA: ${assay.coaId} · Tested ${assay.testDate}
                  </div>
                  <div style="font-size:11.5px;color:${assay.status === 'PASSED' ? '#047857' : 'var(--color-accent-2)'};margin-bottom:10px;line-height:1.35">
                    ${assay.conclusion}
                  </div>
                  <div style="display:flex;gap:8px">
                    <button type="button" class="btn btn-sm btn-secondary" data-action="view-coa" data-coa-id="${assay.coaId}">
                      View Official Certificate & Seal
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    renderLabAssay() {
      const selectedBatch = this.state.selectedAssayBatch || 'AL-240981';
      const isFalsified = selectedBatch === 'AL-77209';

      return `
        <div style="display:flex;flex-direction:column;gap:16px">
          <div>
            <div style="font-family:var(--font-heading);font-weight:600;font-size:18px">Reversed-Phase HPLC Chemical Assay</div>
            <div style="font-size:12px;opacity:0.7">Monograph verification · British Pharmacopoeia (BP 2025) & USP-NF Standards</div>
          </div>

          <!-- Sample Selection Tray -->
          <div>
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.68;margin-bottom:6px">Select Test Sample Batch:</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
              <button type="button" class="btn ${!isFalsified ? 'btn-primary' : 'btn-secondary'}" data-action="set-assay-batch" data-batch="AL-240981" style="font-size:11.5px;padding:8px 6px">
                ✓ AL-240981 (Standard Reference)
              </button>
              <button type="button" class="btn ${isFalsified ? 'btn-primary' : 'btn-secondary'}" data-action="set-assay-batch" data-batch="AL-77209" style="font-size:11.5px;padding:8px 6px">
                ⚠ AL-77209 (Suspected Seizure)
              </button>
            </div>
          </div>

          <!-- Interactive HPLC Chromatogram Rendering -->
          <div class="card elev-sm" style="background:#0b111b;border:1px solid #1e293b;padding:12px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <div style="font-size:11.5px;font-weight:600;color:#94a3b8;letter-spacing:0.05em">
                HIGH PERFORMANCE LIQUID CHROMATOGRAM (RP-HPLC) · UV @ 210nm
              </div>
              <span class="tag ${!isFalsified ? 'tag-accent' : 'tag-accent-2'}" style="font-size:9.5px">
                ${!isFalsified ? 'BP MONOGRAPH CONFORMANT' : 'CRITICAL OUT OF SPEC'}
              </span>
            </div>

            <div class="hplc-chart-wrap" style="margin:0;padding:8px 4px;background:#0d1520;border:none">
              ${!isFalsified ? `
                <svg viewBox="0 0 500 160" style="width:100%;height:auto;display:block">
                  <line x1="40" y1="20" x2="480" y2="20" stroke="#1f2937" stroke-dasharray="3,3" />
                  <line x1="40" y1="55" x2="480" y2="55" stroke="#1f2937" stroke-dasharray="3,3" />
                  <line x1="40" y1="90" x2="480" y2="90" stroke="#1f2937" stroke-dasharray="3,3" />
                  <line x1="40" y1="125" x2="480" y2="125" stroke="#1f2937" stroke-dasharray="3,3" />
                  
                  <text x="32" y="24" fill="#64748b" font-size="8" text-anchor="end">1000</text>
                  <text x="32" y="59" fill="#64748b" font-size="8" text-anchor="end">750</text>
                  <text x="32" y="94" fill="#64748b" font-size="8" text-anchor="end">500</text>
                  <text x="32" y="129" fill="#64748b" font-size="8" text-anchor="end">250</text>
                  <text x="32" y="145" fill="#64748b" font-size="8" text-anchor="end">0</text>
                  
                  <line x1="40" y1="15" x2="40" y2="142" stroke="#475569" stroke-width="1.2" />
                  <line x1="40" y1="142" x2="480" y2="142" stroke="#475569" stroke-width="1.2" />
                  
                  <text x="40" y="154" fill="#64748b" font-size="8" text-anchor="middle">0</text>
                  <text x="84" y="154" fill="#64748b" font-size="8" text-anchor="middle">1</text>
                  <text x="128" y="154" fill="#64748b" font-size="8" text-anchor="middle">2</text>
                  <text x="172" y="154" fill="#64748b" font-size="8" text-anchor="middle">3</text>
                  <text x="216" y="154" fill="#64748b" font-size="8" text-anchor="middle">4</text>
                  <text x="260" y="154" fill="#64748b" font-size="8" text-anchor="middle">5</text>
                  <text x="304" y="154" fill="#64748b" font-size="8" text-anchor="middle">6</text>
                  <text x="348" y="154" fill="#64748b" font-size="8" text-anchor="middle">7</text>
                  <text x="392" y="154" fill="#64748b" font-size="8" text-anchor="middle">8</text>
                  <text x="436" y="154" fill="#64748b" font-size="8" text-anchor="middle">9</text>
                  <text x="480" y="154" fill="#64748b" font-size="8" text-anchor="middle">10m</text>
                  
                  <path d="M 40 142 L 180 142 Q 200 142 215 90 Q 224.8 25 235 90 Q 250 142 310 142 Q 335 142 346 100 Q 352.4 55 359 100 Q 370 142 480 142" fill="none" stroke="#38bdf8" stroke-width="2" />
                  
                  <circle cx="224.8" cy="27" r="3" fill="#38bdf8" />
                  <text x="224.8" y="18" fill="#38bdf8" font-size="8.5" font-weight="bold" text-anchor="middle">Artemether (4.2m · 99.2%)</text>
                  
                  <circle cx="352.4" cy="57" r="3" fill="#38bdf8" />
                  <text x="352.4" y="48" fill="#38bdf8" font-size="8.5" font-weight="bold" text-anchor="middle">Lumefantrine (7.1m)</text>
                </svg>
              ` : `
                <svg viewBox="0 0 500 160" style="width:100%;height:auto;display:block">
                  <line x1="40" y1="20" x2="480" y2="20" stroke="#371e24" stroke-dasharray="3,3" />
                  <line x1="40" y1="55" x2="480" y2="55" stroke="#371e24" stroke-dasharray="3,3" />
                  <line x1="40" y1="90" x2="480" y2="90" stroke="#371e24" stroke-dasharray="3,3" />
                  <line x1="40" y1="125" x2="480" y2="125" stroke="#371e24" stroke-dasharray="3,3" />
                  
                  <text x="32" y="24" fill="#94a3b8" font-size="8" text-anchor="end">1000</text>
                  <text x="32" y="59" fill="#94a3b8" font-size="8" text-anchor="end">750</text>
                  <text x="32" y="94" fill="#94a3b8" font-size="8" text-anchor="end">500</text>
                  <text x="32" y="129" fill="#94a3b8" font-size="8" text-anchor="end">250</text>
                  <text x="32" y="145" fill="#94a3b8" font-size="8" text-anchor="end">0</text>
                  
                  <line x1="40" y1="15" x2="40" y2="142" stroke="#64748b" stroke-width="1.2" />
                  <line x1="40" y1="142" x2="480" y2="142" stroke="#64748b" stroke-width="1.2" />
                  
                  <text x="40" y="154" fill="#94a3b8" font-size="8" text-anchor="middle">0</text>
                  <text x="84" y="154" fill="#94a3b8" font-size="8" text-anchor="middle">1</text>
                  <text x="128" y="154" fill="#94a3b8" font-size="8" text-anchor="middle">2</text>
                  <text x="172" y="154" fill="#94a3b8" font-size="8" text-anchor="middle">3</text>
                  <text x="216" y="154" fill="#94a3b8" font-size="8" text-anchor="middle">4</text>
                  <text x="260" y="154" fill="#94a3b8" font-size="8" text-anchor="middle">5</text>
                  <text x="304" y="154" fill="#94a3b8" font-size="8" text-anchor="middle">6</text>
                  <text x="348" y="154" fill="#94a3b8" font-size="8" text-anchor="middle">7</text>
                  <text x="392" y="154" fill="#94a3b8" font-size="8" text-anchor="middle">8</text>
                  <text x="436" y="154" fill="#94a3b8" font-size="8" text-anchor="middle">9</text>
                  <text x="480" y="154" fill="#94a3b8" font-size="8" text-anchor="middle">10m</text>
                  
                  <path d="M 40 142 L 80 142 Q 100 135 110 50 Q 119 22 130 65 Q 155 125 190 142 L 480 142" fill="none" stroke="#f43f5e" stroke-width="2.5" />
                  
                  <circle cx="119" cy="22" r="3.5" fill="#f43f5e" />
                  <text x="119" y="14" fill="#f43f5e" font-size="8.5" font-weight="bold" text-anchor="middle">Kerosene Contaminant Peak (1.8m · Toxic)</text>
                  
                  <rect x="218" y="132" width="14" height="12" fill="rgba(244,63,94,0.15)" stroke="#f43f5e" stroke-dasharray="2,2" />
                  <text x="225" y="126" fill="#f43f5e" font-size="7.5" text-anchor="middle">0% Artemether</text>
                  
                  <rect x="345" y="132" width="14" height="12" fill="rgba(244,63,94,0.15)" stroke="#f43f5e" stroke-dasharray="2,2" />
                  <text x="352" y="126" fill="#f43f5e" font-size="7.5" text-anchor="middle">0% Lumefantrine</text>
                </svg>
              `}
            </div>

            <div style="font-size:11px;color:#94a3b8;margin-top:6px;display:flex;justify-content:space-between">
              <span>Stationary Phase: C18 5μm (250 × 4.6mm)</span>
              <span>Flow: 1.2 mL/min · Buffer: Acetonitrile/Water</span>
            </div>
          </div>

          <!-- Monograph Parameter Verification Form -->
          <div class="card elev-sm">
            <div style="font-weight:600;font-size:13.5px;margin-bottom:10px">Monograph Quality Parameters (USP/BP)</div>

            <div style="display:flex;flex-direction:column;gap:10px">
              <div>
                <label style="font-size:11px;font-weight:600;display:block;margin-bottom:4px">
                  Active Ingredient (API) Assay % (Acceptance: 95.0% - 105.0%)
                </label>
                <input id="assay-pct-input" type="number" step="0.1" class="input" value="${!isFalsified ? '99.2' : '0.0'}" style="width:100%" />
              </div>

              <div>
                <label style="font-size:11px;font-weight:600;display:block;margin-bottom:4px">
                  Dissolution Rate at 45 min (Acceptance: > 80.0%)
                </label>
                <input id="assay-diss-input" type="text" class="input" value="${!isFalsified ? '88.4% at 45 min' : '0% (Insoluble oily sludge)'}" style="width:100%" />
              </div>

              <div>
                <label style="font-size:11px;font-weight:600;display:block;margin-bottom:4px">
                  Related Substances & Chemical Impurities
                </label>
                <input id="assay-impurity-input" type="text" class="input" value="${!isFalsified ? 'None detected (conforms to BP limits)' : 'Toxic kerosene hydrocarbon solvent residue (4.2 mg/g)'}" style="width:100%" />
              </div>
            </div>

            <div style="margin-top:14px;display:flex;flex-direction:column;gap:8px">
              <button type="button" class="btn btn-primary" data-action="submit-lab-assay" style="width:100%;font-size:13px;padding:10px">
                ✍️ Sign & Issue Digital CoA (Anchor to Ledger)
              </button>
            </div>
          </div>
        </div>
      `;
    }

    renderLabCoas() {
      return `
        <div style="display:flex;flex-direction:column;gap:16px">
          <div>
            <div style="font-family:var(--font-heading);font-weight:600;font-size:18px">Certificates of Analysis (CoAs)</div>
            <div style="font-size:12px;opacity:0.7">Official laboratory testing certificates registered on the WelliVerify Ledger</div>
          </div>

          <div style="display:flex;flex-direction:column;gap:12px">
            ${this.data.labAssays.map((assay) => `
              <div class="card elev-sm" style="border-left:4px solid ${assay.status === 'PASSED' ? 'var(--color-accent)' : 'var(--color-accent-2)'}">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">
                  <div>
                    <div style="font-weight:700;font-size:13.5px">${assay.productName}</div>
                    <div class="card-meta" style="font-size:11px">Certificate No: <strong>${assay.coaId}</strong></div>
                  </div>
                  <span class="tag ${assay.sealClass}" style="font-size:10px">${assay.status === 'PASSED' ? `PASSED · ${assay.apiAssayPercentage}% API` : `FAILED · ${assay.apiAssayPercentage}% API`}</span>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:11.5px;margin:8px 0;background:rgba(0,0,0,0.03);padding:8px;border-radius:4px">
                  <div><span style="opacity:0.6">Batch:</span> <strong>${assay.batchId}</strong></div>
                  <div><span style="opacity:0.6">Date:</span> ${assay.testDate}</div>
                  <div><span style="opacity:0.6">Method:</span> ${assay.method}</div>
                  <div><span style="opacity:0.6">Dissolution:</span> ${assay.dissolutionRate.split('(')[0]}</div>
                </div>

                <div style="font-size:11.5px;margin-bottom:10px;line-height:1.35;color:${assay.status === 'PASSED' ? '#047857' : 'var(--color-accent-2)'}">
                  ${assay.conclusion}
                </div>

                <button type="button" class="btn btn-secondary" data-action="view-coa" data-coa-id="${assay.coaId}" style="width:100%;font-size:12px">
                  📜 Open Full Certificate of Analysis & Seal
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    renderLabCoaDetail() {
      const coaId = this.state.selectedCoaId;
      const assay = this.data.labAssays.find((a) => a.coaId === coaId) || this.data.labAssays[0];
      const isCompliant = assay.status === 'PASSED';

      return `
        <div style="display:flex;flex-direction:column;gap:14px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <button type="button" class="btn btn-ghost btn-sm" data-action="go-back">
              ← Back to Assays
            </button>
            <span class="tag ${assay.sealClass}">NAFDAC OFFICIAL RECORD</span>
          </div>

          <!-- Official Broadsheet Certificate Document -->
          <div class="coa-document">
            <div class="coa-seal" style="border-color:${isCompliant ? '#0088b0' : '#d6006c'};color:${isCompliant ? '#0088b0' : '#d6006c'}">
              ${isCompliant ? 'NAFDAC<br>LAB-OK<br>2026' : 'NAFDAC<br>ALERT<br>FAIL'}
            </div>

            <div class="coa-header">
              <div class="coa-title">NAFDAC REFERENCE CONTROL LABORATORY</div>
              <div class="coa-sub">Directorate of Laboratory Services · Federal Ministry of Health, Nigeria</div>
              <div style="font-size:9.5px;color:#047857;font-weight:600;margin-top:2px">ISO/IEC 17025:2017 ACCREDITED TESTING LABORATORY</div>
            </div>

            <div style="text-align:center;padding:6px 0;margin-bottom:12px;background:#f8fafc;border-radius:4px;border:1px solid #e2e8f0">
              <div style="font-family:var(--font-heading);font-weight:700;font-size:15px;letter-spacing:0.04em">CERTIFICATE OF ANALYSIS</div>
              <div style="font-size:11px;font-family:monospace;color:var(--color-accent);font-weight:600">${assay.coaId}</div>
            </div>

            <!-- Metadata Grid -->
            <div class="coa-grid">
              <div>
                <span>Product Name:</span>
                <strong>${assay.productName}</strong>
              </div>
              <div>
                <span>Batch / Lot No:</span>
                <strong>${assay.batchId}</strong>
              </div>
              <div>
                <span>Testing Laboratory:</span>
                ${assay.facility}
              </div>
              <div>
                <span>Certifying Officer:</span>
                ${assay.labOfficer}
              </div>
              <div>
                <span>Testing Methodology:</span>
                ${assay.method}
              </div>
              <div>
                <span>Analytical Monograph:</span>
                British Pharmacopoeia (BP 2025)
              </div>
            </div>

            <!-- Monograph Parameters Table -->
            <table class="coa-table">
              <thead>
                <tr>
                  <th>Monograph Parameter</th>
                  <th>Official Specification</th>
                  <th>Observed Result</th>
                  <th>Verdict</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Identity (HPLC)</strong></td>
                  <td>Conforms to Reference Standard</td>
                  <td>${assay.retentionPeakMin > 0 ? `Peak matches standard (tR = ${assay.retentionPeakMin} min)` : 'Non-Conforming: No active peak detected'}</td>
                  <td><span class="tag ${assay.retentionPeakMin > 0 ? 'tag-accent' : 'tag-accent-2'}" style="font-size:9px">${assay.retentionPeakMin > 0 ? 'CONFORMS' : 'FAIL'}</span></td>
                </tr>
                <tr>
                  <td><strong>Active API Assay (%)</strong></td>
                  <td>95.0% – 105.0% of label claim</td>
                  <td><strong>${assay.apiAssayPercentage}%</strong></td>
                  <td><span class="tag ${isCompliant ? 'tag-accent' : 'tag-accent-2'}" style="font-size:9px">${isCompliant ? 'PASSED' : 'OUT OF SPEC'}</span></td>
                </tr>
                <tr>
                  <td><strong>Dissolution Rate</strong></td>
                  <td>&gt; 80.0% (Q) at 45 min</td>
                  <td>${assay.dissolutionRate}</td>
                  <td><span class="tag ${isCompliant ? 'tag-accent' : 'tag-accent-2'}" style="font-size:9px">${isCompliant ? 'PASSED' : 'FAIL'}</span></td>
                </tr>
                <tr>
                  <td><strong>Impurities & Residues</strong></td>
                  <td>None detected / &lt; 0.1%</td>
                  <td>${assay.foreignSubstances}</td>
                  <td><span class="tag ${isCompliant ? 'tag-accent' : 'tag-accent-2'}" style="font-size:9px">${isCompliant ? 'CONFORMS' : 'CONTAMINATED'}</span></td>
                </tr>
              </tbody>
            </table>

            <!-- Analytical Verdict -->
            <div style="margin-top:14px;padding:10px;border-radius:4px;background:${isCompliant ? 'rgba(0,136,176,0.06)' : 'rgba(214,0,108,0.08)'};border-left:3px solid ${isCompliant ? 'var(--color-accent)' : 'var(--color-accent-2)'}">
              <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.06em;font-weight:700;color:${isCompliant ? 'var(--color-accent)' : 'var(--color-accent-2)'};margin-bottom:3px">
                ANALYTICAL VERDICT
              </div>
              <div style="font-size:11.5px;line-height:1.4;color:#1e293b">
                ${assay.conclusion}
              </div>
            </div>

            <!-- Cryptographic Ledger Proof -->
            <div style="margin-top:14px;padding-top:10px;border-top:1px solid #e2e8f0;font-size:10.5px;color:#64748b">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <div>
                  <div>Cryptographic Anchor: <strong>BLOCK-${assay.id}</strong></div>
                  <div style="font-family:monospace;font-size:9px;color:var(--color-accent)">SHA-256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069</div>
                </div>
                <div style="text-align:right">
                  <div>Timestamp: ${assay.testDate} 14:22 UTC</div>
                  <div style="font-weight:600;color:#0f172a">WelliVerify Ledger v1.4</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            <button type="button" class="btn btn-secondary" onclick="window.print()" style="font-size:12px">
              🖨️ Print / Save PDF
            </button>
            <button type="button" class="btn btn-primary" data-action="nav-to" data-target="assay" style="font-size:12px">
              🔬 New Assay Test
            </button>
          </div>
        </div>
      `;
    }

    renderConsumables() {
      return `
        <div style="display:flex;flex-direction:column;gap:10px">
          <div style="font-family:var(--font-heading);font-weight:600;font-size:18px">Consumables & Laboratory Reagents</div>
          <div style="font-size:12px;opacity:0.7">Track HPLC columns, analytical standards, and certified reference reagents</div>

          ${this.data.labConsumables.map((lc) => `
            <div class="card elev-sm">
              <div style="display:flex;justify-content:space-between;align-items:baseline">
                <div class="card-title" style="font-size:14px">${lc.name}</div>
                <span class="tag tag-neutral" style="font-size:10px">${lc.qty} units</span>
              </div>
              <div class="card-meta" style="font-size:11.5px">Batch ${lc.batch} · Expires in ${lc.days} days</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // ========================================================
    // TIER 2: WELLIPAY ESCROW & SETTLEMENT ENGINE
    // ========================================================
    renderEscrow(role) {
      const tab = this.state.escrowTab || 'b2b';
      const escrows = this.data.escrows || [];
      const hmoClaims = this.data.hmoClaims || [];

      const totalLocked = escrows
        .filter(e => e.status === 'HELD_IN_ESCROW' || e.status === 'INSPECTION_PASSED')
        .reduce((sum, e) => sum + e.totalAmount, 0);
      const totalSettled = escrows
        .filter(e => e.status === 'RELEASED')
        .reduce((sum, e) => sum + e.totalAmount, 0);
      const totalRefunded = escrows
        .filter(e => e.status === 'REFUNDED_CONTAMINATED')
        .reduce((sum, e) => sum + e.totalAmount, 0);

      return `
        <div style="display:flex;flex-direction:column;gap:14px">
          <div>
            <div style="font-family:var(--font-heading);font-weight:600;font-size:18px">WelliPay Automated Settlement & Escrow</div>
            <div style="font-size:12px;opacity:0.7">Cryptographic milestone-released escrow for pharmaceutical wholesale & instant HMO claims</div>
          </div>

          <!-- Metrics Summary -->
          <div class="escrow-metrics-bar">
            <div class="escrow-metric-card">
              <div class="escrow-metric-val" style="color:var(--color-accent)">₦${totalLocked.toLocaleString()}</div>
              <div class="escrow-metric-sub">Locked Escrow</div>
            </div>
            <div class="escrow-metric-card">
              <div class="escrow-metric-val" style="color:#2e7d32">₦${totalSettled.toLocaleString()}</div>
              <div class="escrow-metric-sub">Settled Payouts</div>
            </div>
            <div class="escrow-metric-card">
              <div class="escrow-metric-val" style="color:#c62828">₦${totalRefunded.toLocaleString()}</div>
              <div class="escrow-metric-sub">Quarantine Refunds</div>
            </div>
          </div>

          <!-- Segmented Tabs -->
          <div style="display:flex;border:1px solid var(--color-divider);border-radius:6px;overflow:hidden">
            <button type="button" class="btn ${tab === 'b2b' ? 'btn-primary' : 'btn-ghost'}" data-action="set-escrow-tab" data-tab="b2b" style="flex:1;border-radius:0;font-size:11.5px;padding:7px 0">
              B2B Wholesale Escrow (${escrows.length})
            </button>
            <button type="button" class="btn ${tab === 'hmo' ? 'btn-primary' : 'btn-ghost'}" data-action="set-escrow-tab" data-tab="hmo" style="flex:1;border-radius:0;font-size:11.5px;padding:7px 0">
              HMO Claims & Co-Pay (${hmoClaims.length})
            </button>
          </div>

          ${tab === 'b2b' ? this.renderB2bEscrowList(escrows) : this.renderHmoClaimsList(hmoClaims)}

          ${this.state.creatingEscrowModal ? this.renderCreateEscrowModal() : ''}
          ${this.state.adjudicatingHmoModal ? this.renderAdjudicateHmoModal() : ''}
          ${this.state.selectedReceipt ? this.renderReceiptModal(this.state.selectedReceipt) : ''}
        </div>
      `;
    }

    renderB2bEscrowList(escrows) {
      return `
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b">
              Active Milestone Escrow Contracts
            </div>
            <button type="button" class="btn btn-secondary btn-sm" data-action="toggle-create-escrow" style="font-size:11px;padding:4px 8px">
              + New Escrow Agreement
            </button>
          </div>

          <div style="display:flex;flex-direction:column;gap:12px">
            ${escrows.map(e => {
              let tag = '<span class="tag tag-neutral" style="font-size:9.5px">HELD IN ESCROW</span>';
              if (e.status === 'INSPECTION_PASSED') tag = '<span class="tag tag-accent" style="font-size:9.5px">INSPECTION PASSED</span>';
              if (e.status === 'RELEASED') tag = '<span class="tag tag-accent" style="font-size:9.5px;background:#2e7d32;color:#fff">FUNDS RELEASED</span>';
              if (e.status === 'REFUNDED_CONTAMINATED') tag = '<span class="tag tag-accent-2" style="font-size:9.5px">REFUNDED · CONTAMINATED</span>';

              return `
                <div class="escrow-card">
                  <div style="display:flex;justify-content:space-between;align-items:flex-start">
                    <div>
                      <div style="font-family:var(--font-heading);font-weight:700;font-size:14px;color:var(--color-text)">
                        ${e.productName}
                      </div>
                      <div style="font-size:11px;color:#64748b;margin-top:2px">
                        Contract: <strong>${e.contractNo}</strong> · Batch ${e.batchId}
                      </div>
                    </div>
                    ${tag}
                  </div>

                  <div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:8px;padding-top:8px;border-top:1px solid #f1f5f9">
                    <div style="font-size:11.5px;color:#334155">
                      Buyer: <strong>${e.buyerName}</strong><br/>
                      Seller: <strong>${e.sellerName}</strong>
                    </div>
                    <div style="text-align:right">
                      <div style="font-family:var(--font-heading);font-weight:700;font-size:15px;color:var(--color-accent)">
                        ₦${e.totalAmount.toLocaleString()}
                      </div>
                      <div style="font-size:10px;color:#64748b">(${e.units} units @ ₦${e.unitPrice.toLocaleString()})</div>
                    </div>
                  </div>

                  <!-- 5-Step Milestone Stepper -->
                  <div class="escrow-stepper">
                    <div class="escrow-step done">
                      <div class="escrow-step-dot">✓</div>
                      <div class="escrow-step-lbl">Order Placed</div>
                    </div>
                    <div class="escrow-step ${e.milestones.inTransit?.done ? 'done' : 'active'}">
                      <div class="escrow-step-dot">${e.milestones.inTransit?.done ? '✓' : '2'}</div>
                      <div class="escrow-step-lbl">In Transit</div>
                    </div>
                    <div class="escrow-step ${e.milestones.barcodeVerified?.done ? 'done' : (e.status === 'REFUNDED_CONTAMINATED' ? 'error' : (e.milestones.inTransit?.done ? 'active' : ''))}">
                      <div class="escrow-step-dot">${e.milestones.barcodeVerified?.done ? '✓' : (e.status === 'REFUNDED_CONTAMINATED' ? '✕' : '3')}</div>
                      <div class="escrow-step-lbl">Barcode Verified</div>
                    </div>
                    <div class="escrow-step ${e.milestones.coldChainVerified?.done ? 'done' : (e.status === 'REFUNDED_CONTAMINATED' ? 'error' : '')}">
                      <div class="escrow-step-dot">${e.milestones.coldChainVerified?.done ? '✓' : (e.status === 'REFUNDED_CONTAMINATED' ? '✕' : '4')}</div>
                      <div class="escrow-step-lbl">Cold-Chain</div>
                    </div>
                    <div class="escrow-step ${e.milestones.fundsReleased?.done ? 'done' : ''}">
                      <div class="escrow-step-dot">${e.milestones.fundsReleased?.done ? '✓' : '5'}</div>
                      <div class="escrow-step-lbl">Payout Settled</div>
                    </div>
                  </div>

                  <!-- Action Buttons -->
                  <div style="display:flex;gap:6px;margin-top:10px;padding-top:10px;border-top:1px solid #f1f5f9">
                    ${e.status === 'INSPECTION_PASSED' ? `
                      <button type="button" class="btn btn-primary btn-sm" data-action="release-escrow" data-id="${e.id}" style="flex:1;font-size:11.5px">
                        ✓ Release Escrow Funds (₦${e.totalAmount.toLocaleString()})
                      </button>
                    ` : ''}

                    ${e.status === 'HELD_IN_ESCROW' ? `
                      <button type="button" class="btn btn-secondary btn-sm" data-action="release-escrow" data-id="${e.id}" style="flex:1;font-size:11.5px">
                        Verify & Release Funds
                      </button>
                      <button type="button" class="btn btn-ghost btn-sm" data-action="refund-escrow" data-id="${e.id}" style="color:#c62828;font-size:11px">
                        ⚠ Refund
                      </button>
                    ` : ''}

                    ${e.status === 'RELEASED' ? `
                      <button type="button" class="btn btn-secondary btn-sm" data-action="open-escrow-receipt" data-id="${e.id}" style="flex:1;font-size:11px">
                        📄 View Settlement Voucher & Receipt
                      </button>
                    ` : ''}

                    ${e.status === 'REFUNDED_CONTAMINATED' ? `
                      <div style="font-size:11px;color:#c62828;font-weight:600;padding:4px 0">
                        ⚠ Lot Quarantined by NAFDAC · ₦${e.totalAmount.toLocaleString()} Reversible Refund Disbursed
                      </div>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    renderHmoClaimsList(hmoClaims) {
      return `
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b">
              Patient HMO Claims & Co-Pay Clearances
            </div>
            <button type="button" class="btn btn-secondary btn-sm" data-action="toggle-adjudicate-hmo" style="font-size:11px;padding:4px 8px">
              + Adjudicate New Claim
            </button>
          </div>

          <div style="display:flex;flex-direction:column;gap:10px">
            ${hmoClaims.map(c => `
              <div class="card elev-sm" style="padding:12px">
                <div style="display:flex;justify-content:space-between;align-items:flex-start">
                  <div>
                    <div style="font-family:var(--font-heading);font-weight:700;font-size:13.5px">
                      ${c.patientName} (${c.hmoProvider})
                    </div>
                    <div style="font-size:11px;color:#64748b;margin-top:2px">
                      Policy: <strong>${c.policyNo}</strong> · Claim: ${c.claimNo}
                    </div>
                  </div>
                  <span class="tag tag-accent" style="font-size:9.5px">${c.status}</span>
                </div>

                <div style="margin-top:8px;padding:8px;background:#f8fafc;border-radius:6px;display:flex;justify-content:space-between;align-items:center">
                  <div>
                    <div style="font-size:11px;color:#334155">Medication: <strong>${c.productName}</strong></div>
                    <div style="font-size:10.5px;color:#64748b">Pharmacy: ${c.pharmacyName}</div>
                  </div>
                  <div style="text-align:right">
                    <div style="font-size:10px;text-transform:uppercase;color:#64748b">Total Prescription</div>
                    <div style="font-weight:700;font-size:13px;color:#0f172a">₦${c.totalAmount.toLocaleString()}</div>
                  </div>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;font-size:11.5px">
                  <div style="padding:6px 8px;background:#e8f5e9;border-radius:4px;color:#2e7d32">
                    <span style="font-size:9.5px;text-transform:uppercase;display:block">HMO Coverage (${c.hmoRate}%)</span>
                    <strong>₦${c.hmoAmount.toLocaleString()}</strong> (Paid)
                  </div>
                  <div style="padding:6px 8px;background:#eff6ff;border-radius:4px;color:#1d4ed8">
                    <span style="font-size:9.5px;text-transform:uppercase;display:block">Patient Co-Pay (${100 - c.hmoRate}%)</span>
                    <strong>₦${c.patientCoPay.toLocaleString()}</strong> (Settled)
                  </div>
                </div>

                <div style="font-size:9.5px;color:#64748b;margin-top:6px;font-family:monospace">
                  TxHash: ${c.txHash || '0x' + Math.random().toString(16).slice(2, 22)}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    renderCreateEscrowModal() {
      return `
        <div class="receipt-modal-backdrop" data-action="toggle-create-escrow">
          <div class="card elev-md" style="background:#fff;max-width:380px;width:100%;padding:18px" onclick="event.stopPropagation()">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
              <div style="font-family:var(--font-heading);font-weight:700;font-size:16px">New B2B Escrow Agreement</div>
              <button type="button" class="btn btn-ghost btn-sm" data-action="toggle-create-escrow">✕</button>
            </div>
            
            <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:14px">
              <div>
                <label style="font-size:10.5px;text-transform:uppercase;color:#64748b;display:block;margin-bottom:3px">Pharmaceutical Product</label>
                <select id="esc-prod-select" class="input" style="width:100%;font-size:12px;padding:6px">
                  <option value="Artemether / Lumefantrine 80/480mg">Artemether / Lumefantrine 80/480mg</option>
                  <option value="Human Insulin 100IU/ml (rDNA)">Human Insulin 100IU/ml (rDNA)</option>
                  <option value="Amoxicillin Trihydrate 500mg">Amoxicillin Trihydrate 500mg</option>
                  <option value="Oxytocin Injection 10IU/ml">Oxytocin Injection 10IU/ml</option>
                </select>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                <div>
                  <label style="font-size:10.5px;text-transform:uppercase;color:#64748b;display:block;margin-bottom:3px">Order Quantity</label>
                  <input type="number" id="esc-units-input" class="input" value="100" style="width:100%;font-size:12px;padding:6px" />
                </div>
                <div>
                  <label style="font-size:10.5px;text-transform:uppercase;color:#64748b;display:block;margin-bottom:3px">Unit Price (₦)</label>
                  <input type="number" id="esc-price-input" class="input" value="2400" style="width:100%;font-size:12px;padding:6px" />
                </div>
              </div>
              <div>
                <label style="font-size:10.5px;text-transform:uppercase;color:#64748b;display:block;margin-bottom:3px">Supplier / Distributor</label>
                <select id="esc-supp-select" class="input" style="width:100%;font-size:12px;padding:6px">
                  <option value="Northgate Distribution Ltd.">Northgate Distribution Ltd. (Licence DIS-4012)</option>
                  <option value="Chi Pharmaceuticals Ltd.">Chi Pharmaceuticals Ltd. (Licence DIS-2291)</option>
                  <option value="Meridian Imports & Logistics">Meridian Imports & Logistics</option>
                </select>
              </div>
            </div>

            <div style="display:flex;gap:8px">
              <button type="button" class="btn btn-secondary" data-action="toggle-create-escrow" style="flex:1">Cancel</button>
              <button type="button" class="btn btn-primary" data-action="submit-create-escrow" style="flex:1">Lock Escrow</button>
            </div>
          </div>
        </div>
      `;
    }

    renderAdjudicateHmoModal() {
      return `
        <div class="receipt-modal-backdrop" data-action="toggle-adjudicate-hmo">
          <div class="card elev-md" style="background:#fff;max-width:380px;width:100%;padding:18px" onclick="event.stopPropagation()">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
              <div style="font-family:var(--font-heading);font-weight:700;font-size:16px">Adjudicate HMO Claim</div>
              <button type="button" class="btn btn-ghost btn-sm" data-action="toggle-adjudicate-hmo">✕</button>
            </div>
            
            <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:14px">
              <div>
                <label style="font-size:10.5px;text-transform:uppercase;color:#64748b;display:block;margin-bottom:3px">HMO Provider</label>
                <select id="hmo-provider-select" class="input" style="width:100%;font-size:12px;padding:6px">
                  <option value="Hygeia HMO">Hygeia HMO</option>
                  <option value="AXA Mansard Health">AXA Mansard Health</option>
                  <option value="Reliance HMO">Reliance HMO</option>
                  <option value="Leadway Health">Leadway Health</option>
                </select>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                <div>
                  <label style="font-size:10.5px;text-transform:uppercase;color:#64748b;display:block;margin-bottom:3px">Policy Number</label>
                  <input type="text" id="hmo-policy-input" class="input" value="HYG-POL-7712" style="width:100%;font-size:12px;padding:6px" />
                </div>
                <div>
                  <label style="font-size:10.5px;text-transform:uppercase;color:#64748b;display:block;margin-bottom:3px">Total Cost (₦)</label>
                  <input type="number" id="hmo-cost-input" class="input" value="2400" style="width:100%;font-size:12px;padding:6px" />
                </div>
              </div>
              <div>
                <label style="font-size:10.5px;text-transform:uppercase;color:#64748b;display:block;margin-bottom:3px">Patient Full Name</label>
                <input type="text" id="hmo-patient-input" class="input" value="Ngozi Bello" style="width:100%;font-size:12px;padding:6px" />
              </div>
            </div>

            <div style="display:flex;gap:8px">
              <button type="button" class="btn btn-secondary" data-action="toggle-adjudicate-hmo" style="flex:1">Cancel</button>
              <button type="button" class="btn btn-primary" data-action="submit-adjudicate-hmo" style="flex:1">Adjudicate Claim</button>
            </div>
          </div>
        </div>
      `;
    }

    renderReceiptModal(receipt) {
      return `
        <div class="receipt-modal-backdrop" data-action="close-escrow-receipt">
          <div class="receipt-paper" onclick="event.stopPropagation()">
            <div style="text-align:center;border-bottom:1px dashed #cbd5e1;padding-bottom:12px;margin-bottom:12px">
              <div style="font-weight:700;font-size:16px;color:#0f172a">WELLIPAY CLEARINGHOUSE</div>
              <div style="font-size:11px;color:#64748b">National Sovereign Healthcare Settlement Voucher</div>
              <div style="font-size:10px;color:#64748b;margin-top:2px">Remittance Ref: ${receipt.contractNo}</div>
            </div>

            <div style="font-size:11.5px;display:flex;flex-direction:column;gap:6px;margin-bottom:14px">
              <div style="display:flex;justify-content:space-between">
                <span style="color:#64748b">PAYER:</span>
                <strong>${receipt.buyerName}</strong>
              </div>
              <div style="display:flex;justify-content:space-between">
                <span style="color:#64748b">BENEFICIARY:</span>
                <strong>${receipt.sellerName}</strong>
              </div>
              <div style="display:flex;justify-content:space-between">
                <span style="color:#64748b">PRODUCT:</span>
                <span>${receipt.productName}</span>
              </div>
              <div style="display:flex;justify-content:space-between">
                <span style="color:#64748b">QUANTITY:</span>
                <span>${receipt.units} packs</span>
              </div>
              <div style="display:flex;justify-content:space-between;border-top:1px dashed #cbd5e1;padding-top:6px;font-size:13px">
                <strong>SETTLED AMOUNT:</strong>
                <strong style="color:var(--color-accent)">₦${receipt.totalAmount.toLocaleString()}</strong>
              </div>
            </div>

            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:4px;padding:8px;font-size:9.5px;margin-bottom:14px">
              <div style="font-weight:700;color:#0f172a">NAFDAC Cryptographic Seal Verified</div>
              <div style="word-break:break-all;color:#64748b;margin-top:2px">
                TxHash: ${receipt.escrowLedgerHash || '0x' + Math.random().toString(16).slice(2, 28)}
              </div>
              <div style="color:#2e7d32;margin-top:4px">✓ Physical Goods Verified & Remitted</div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
              <button type="button" class="btn btn-secondary btn-sm" onclick="window.print()" style="font-size:11px">
                🖨️ Print Voucher
              </button>
              <button type="button" class="btn btn-primary btn-sm" data-action="close-escrow-receipt" style="font-size:11px">
                Close
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // ========================================================
    // TIER 2: MANUFACTURER SERIALIZATION STUDIO
    // ========================================================
    renderSerialization(role) {
      const view = this.state.serializationView || 'studio';
      const serials = this.state.generatedSerials || [];

      return `
        <div style="display:flex;flex-direction:column;gap:14px">
          <div>
            <div style="font-family:var(--font-heading);font-weight:600;font-size:18px">GS1 DataMatrix Serialization Studio</div>
            <div style="font-size:12px;opacity:0.7">Unit-level serialization, tamper-evident cryptographic MACs & printable packaging sheets</div>
          </div>

          <!-- Form Studio Card -->
          <div class="card elev-sm" style="padding:14px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--color-accent);margin-bottom:10px">
              Packaging Run Configuration
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
              <div>
                <label style="font-size:10px;text-transform:uppercase;color:#64748b;display:block;margin-bottom:3px">GTIN-14 Identifier</label>
                <input type="text" id="studio-gtin-input" class="input" value="${this.state.serialGtinInput}" style="font-size:11.5px;padding:6px 8px;font-family:monospace" />
              </div>
              <div>
                <label style="font-size:10px;text-transform:uppercase;color:#64748b;display:block;margin-bottom:3px">Batch / Lot Number</label>
                <input type="text" id="studio-batch-input" class="input" value="${this.state.serialBatchInput}" style="font-size:11.5px;padding:6px 8px;font-family:monospace" />
              </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
              <div>
                <label style="font-size:10px;text-transform:uppercase;color:#64748b;display:block;margin-bottom:3px">Expiry Date</label>
                <input type="date" id="studio-exp-input" class="input" value="2027-12-31" style="font-size:11.5px;padding:6px 8px" />
              </div>
              <div>
                <label style="font-size:10px;text-transform:uppercase;color:#64748b;display:block;margin-bottom:3px">Serials Count</label>
                <select id="studio-count-select" class="input" style="font-size:11.5px;padding:6px 8px">
                  <option value="4" ${this.state.serialCountInput === 4 ? 'selected' : ''}>4 Units (Test Strip)</option>
                  <option value="6" ${this.state.serialCountInput === 6 ? 'selected' : ''}>6 Units (Blister Pack)</option>
                  <option value="8" ${this.state.serialCountInput === 8 ? 'selected' : ''}>8 Units (Standard Shipper)</option>
                  <option value="12" ${this.state.serialCountInput === 12 ? 'selected' : ''}>12 Units (Full Carton)</option>
                </select>
              </div>
            </div>
            <button type="button" class="btn btn-primary" data-action="generate-bulk-serials" style="width:100%;font-size:12.5px;padding:9px">
              ⚡ Generate Serialized Run & Sign with Cryptographic MAC
            </button>
          </div>

          <!-- View Switcher & Action Toolbar -->
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div style="display:flex;border:1px solid var(--color-divider);border-radius:6px;overflow:hidden">
              <button type="button" class="btn ${view === 'studio' ? 'btn-primary' : 'btn-ghost'}" data-action="toggle-serialization-view" data-view="studio" style="font-size:11px;padding:5px 10px;border-radius:0">
                Pack Studio View
              </button>
              <button type="button" class="btn ${view === 'sheet' ? 'btn-primary' : 'btn-ghost'}" data-action="toggle-serialization-view" data-view="sheet" style="font-size:11px;padding:5px 10px;border-radius:0">
                Printable Label Sheet
              </button>
            </div>
            <button type="button" class="btn btn-secondary" data-action="download-serial-csv" style="font-size:11px;padding:5px 10px">
              📥 Export CSV
            </button>
          </div>

          ${view === 'studio' ? this.renderStudioSerials(serials) : this.renderPrintableLabelSheet(serials)}
        </div>
      `;
    }

    renderStudioSerials(serials) {
      return `
        <div style="display:flex;flex-direction:column;gap:12px">
          ${serials.map(s => `
            <div class="gs1-label-card">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                <div style="font-weight:700;font-size:13px;color:#0f172a">
                  Unit Pack · ${s.productName || 'Artemether / Lumefantrine 80/480mg'}
                </div>
                <span class="tag tag-accent" style="font-size:9px">GS1-128 COMPLIANT</span>
              </div>

              <div class="gs1-security-border">
                <div class="gs1-matrix-box">
                  ${this.generateDataMatrixSvg(s.serial)}
                </div>
                <div class="gs1-hri-text">
                  <div><span class="gs1-ai-tag">(01)</span> ${s.gtin}</div>
                  <div><span class="gs1-ai-tag">(17)</span> ${s.expDate ? s.expDate.replace(/-/g, '').slice(2) : '271231'}</div>
                  <div><span class="gs1-ai-tag">(10)</span> ${s.batchId}</div>
                  <div><span class="gs1-ai-tag">(21)</span> ${s.cleanSerial || s.serial.replace(/-/g, '')}</div>
                  <div style="font-size:9px;color:#0088b0;font-family:monospace;margin-top:4px">
                    MAC: ${s.cryptoMac}
                  </div>
                </div>
              </div>

              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
                <div style="font-size:10px;color:#64748b">NAFDAC Reg: A4-0231 · Authentic</div>
                <button type="button" class="btn btn-secondary btn-sm" data-action="test-scan-serial" data-serial="${s.serial}" style="font-size:11px;padding:3px 8px">
                  📱 Test Scan This Pack
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    renderPrintableLabelSheet(serials) {
      return `
        <div style="background:#fff;border:1px solid #cbd5e1;padding:16px;border-radius:8px">
          <div style="text-align:center;border-bottom:1px solid #e2e8f0;padding-bottom:10px;margin-bottom:10px">
            <div style="font-family:var(--font-heading);font-weight:700;font-size:15px">
              NAFDAC GS1-128 SERIALIZED PACKAGING RUN
            </div>
            <div style="font-size:10.5px;color:#64748b">
              Lot: <strong>${this.state.serialBatchInput}</strong> · GTIN: ${this.state.serialGtinInput} · Tamper-Evident Foil Format
            </div>
          </div>

          <div class="label-sheet-grid">
            ${serials.map(s => `
              <div style="border:1px dashed #94a3b8;padding:8px;border-radius:4px;background:#fafafa">
                <div style="display:flex;gap:8px;align-items:center">
                  <div style="width:58px;height:58px;background:#fff;padding:2px;border:1px solid #cbd5e1">
                    ${this.generateDataMatrixSvg(s.serial)}
                  </div>
                  <div style="font-family:monospace;font-size:8.5px;line-height:1.2;color:#1e293b">
                    <div>(01)${s.gtin}</div>
                    <div>(17)${s.expDate ? s.expDate.replace(/-/g, '').slice(2) : '271231'}</div>
                    <div>(10)${s.batchId}</div>
                    <div>(21)${s.cleanSerial || s.serial.replace(/-/g, '')}</div>
                    <div style="color:#0088b0;font-weight:bold;margin-top:2px">WelliVerify ✓</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="cut-mark-line"></div>

          <button type="button" class="btn btn-primary" onclick="window.print()" style="width:100%;font-size:12px;padding:9px">
            🖨️ Print Label Sheet (A4 / Thermal Roll)
          </button>
        </div>
      `;
    }

    // ========================================================
    // TIER 2: SUPPLY CHAIN JOURNEY SIMULATOR
    // ========================================================
    renderSimulator(role) {
      const step = this.state.simStep || 1;
      const isAnomaly = this.state.simAnomaly;
      const isPlaying = this.state.simPlaying;

      const stepsMeta = [
        { num: 1, title: 'Manufacturer QC', role: 'Manufacturer' },
        { num: 2, title: 'NAFDAC Port', role: 'Regulator' },
        { num: 3, title: 'Cold-Chain IoT', role: 'Distributor' },
        { num: 4, title: 'Pharmacy Store', role: 'Pharmacist' },
        { num: 5, title: 'Patient Verification', role: 'Patient' },
        { num: 6, title: 'WelliPay Settlement', role: 'Clearinghouse' },
      ];

      return `
        <div style="display:flex;flex-direction:column;gap:14px">
          <div>
            <div style="font-family:var(--font-heading);font-weight:600;font-size:18px">Multi-Party Supply Chain Journey Simulator</div>
            <div style="font-size:12px;opacity:0.7">End-to-end provenance, cold-chain monitoring, and automated escrow release across 5 roles</div>
          </div>

          <!-- Progress Stepper Bars -->
          <div class="sim-step-indicator">
            ${stepsMeta.map((s) => `
              <div class="sim-step-bar ${s.num <= step ? (isAnomaly && s.num >= 3 ? 'anomaly' : 'filled') : ''}"></div>
            `).join('')}
          </div>

          <!-- Simulator Controls Toolbar -->
          <div class="sim-controls-bar">
            <div style="display:flex;gap:4px">
              <button type="button" class="btn btn-ghost btn-sm" data-action="sim-prev" ${step === 1 ? 'disabled' : ''} style="font-size:11px">
                ◀ Prev
              </button>
              <button type="button" class="btn ${isPlaying ? 'btn-secondary' : 'btn-primary'} btn-sm" data-action="sim-toggle-play" style="font-size:11px">
                ${isPlaying ? '⏸ Pause' : '▶ Auto-Play'}
              </button>
              <button type="button" class="btn btn-ghost btn-sm" data-action="sim-next" ${step === 6 ? 'disabled' : ''} style="font-size:11px">
                Next ▶
              </button>
            </div>
            <div style="display:flex;gap:6px;align-items:center">
              <button type="button" class="btn btn-ghost btn-sm" data-action="sim-reset" style="font-size:11px">
                ↺ Reset
              </button>
              <button type="button" class="btn ${isAnomaly ? 'btn-primary' : 'btn-secondary'} btn-sm" data-action="sim-toggle-anomaly" style="font-size:10.5px;background:${isAnomaly ? '#c62828' : ''};color:${isAnomaly ? '#fff' : ''}">
                ${isAnomaly ? '🚨 Anomaly Active' : '⚠️ Inject Anomaly'}
              </button>
            </div>
          </div>

          <!-- Current Stage Card -->
          ${this.renderSimulatorActiveStage(step, isAnomaly)}

          <!-- Live Tamper-Evident Ledger Stream -->
          <div>
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:4px">
              Live Sovereign Ledger Anchor Feed
            </div>
            <div class="sim-ledger-feed">
              <div>[0x01] GENESIS_ANCHOR · WelliVerify Trust Mesh Root (Abuja)</div>
              <div>[0x02] BATCH_RELEASE_MFG · Lot AL-2026-SIM (Novartis / Basel)</div>
              <div>[0x03] CUSTOMS_PORT_CLEARANCE · Apapa Terminal C (NAFDAC Port Unit)</div>
              ${step >= 3 ? (isAnomaly ? `<div style="color:#ef4444">[0x04-ALERT] REEFER_COMPRESSOR_FAILURE · Temp 14.8°C spiked at Lokoja!</div>` : `<div>[0x04] IOT_TELEMETRY_SIGNED · 4.2°C ambient compliant (Reefer KJA-882-XA)</div>`) : ''}
              ${step >= 4 ? (isAnomaly ? `<div style="color:#ef4444">[0x05-HALT] QUARANTINE_BROADCAST · Escrow Funds Frozen by Autonomous Guard</div>` : `<div>[0x05] RETAIL_RECEIVING_VERIFIED · GreenLife Dispensary Wuse II</div>`) : ''}
              ${step >= 5 ? `<div>[0x06] CONSUMER_DECOMMISSIONING · Patient Ngozi Bello (Hygeia HMO Settled)</div>` : ''}
              ${step >= 6 ? `<div style="color:#4ade80">[0x07] WELLIPAY_SETTLEMENT_REMITTED · ₦120,000 paid to Northgate Distribution</div>` : ''}
            </div>
          </div>
        </div>
      `;
    }

    renderSimulatorActiveStage(step, isAnomaly) {
      if (step === 1) {
        return `
          <div class="sim-stage-container">
            <span class="sim-actor-badge">🏭 Step 1: Manufacturer Serialization & QC Release</span>
            <div style="font-family:var(--font-heading);font-weight:700;font-size:15px;margin-bottom:6px">
              Novartis / Genevith Healthcare (Basel & Ikeja Terminal)
            </div>
            <div style="font-size:12px;line-height:1.45;color:#334155;margin-bottom:10px">
              Batch <strong>AL-2026-SIM</strong> manufactured and packaged with 10,000 GS1-128 DataMatrix serialized blister packs. QC High-Performance Liquid Chromatography (RP-HPLC) passed at 99.1% API purity, conforming to British Pharmacopoeia (BP 2025) monographs.
            </div>
            <div style="background:#f1f5f9;padding:8px 10px;border-radius:6px;font-size:11px;color:#475569">
              <div>Cryptographic Proof: <strong>CoA #COA-2026-NAFDAC-8812</strong> anchored to National Trust Chain</div>
              <div style="color:#2e7d32;font-weight:600;margin-top:2px">Escrow Status: Smart Contract Initialized (₦120,000 Locked in Vault)</div>
            </div>
          </div>
        `;
      } else if (step === 2) {
        return `
          <div class="sim-stage-container">
            <span class="sim-actor-badge" style="background:#fef3c7;color:#92400e">🛡️ Step 2: NAFDAC Port of Entry Inspection</span>
            <div style="font-family:var(--font-heading);font-weight:700;font-size:15px;margin-bottom:6px">
              Apapa Seaport Terminal C, Lagos (NAFDAC Officer Amina Yusuf)
            </div>
            <div style="font-size:12px;line-height:1.45;color:#334155;margin-bottom:10px">
              Consignment shipping container arrived from Basel. Electronic seal verified unbroken. Random physical sampling matches registered NAFDAC number A4-0231. Clean Bill of Inspection issued to transit logistics.
            </div>
            <div style="background:#f1f5f9;padding:8px 10px;border-radius:6px;font-size:11px;color:#475569">
              <div>Cryptographic Proof: <strong>Customs Electronic Bill Block #04921</strong></div>
              <div style="color:var(--color-accent);font-weight:600;margin-top:2px">Escrow Status: Milestone 1 Complete · Transit Release Authorized</div>
            </div>
          </div>
        `;
      } else if (step === 3) {
        if (isAnomaly) {
          return `
            <div class="sim-stage-container" style="border-color:#ef4444">
              <span class="sim-actor-badge" style="background:#fee2e2;color:#b91c1c">🚨 Step 3: Cold-Chain Logistics [ANOMALY DETECTED]</span>
              <div style="font-family:var(--font-heading);font-weight:700;font-size:15px;color:#b91c1c;margin-bottom:6px">
                Northgate Distribution Fleet · Reefer Truck KJA-882-XA
              </div>
              <div class="sim-anomaly-alert">
                <div style="font-weight:700;font-size:12.5px;color:#991b1b;margin-bottom:3px">
                  CRITICAL TEMPERATURE EXCURSION DETECTED
                </div>
                <div style="font-size:11.5px;line-height:1.4;color:#7f1d1d">
                  At Km 42 Lokoja highway, reefer compressor malfunctioned. IoT logger registered 14.8°C for 52 consecutive minutes, violating the 2°C–8°C limit. Active ingredients face irreversible thermal degradation.
                </div>
              </div>
              <div style="background:#fee2e2;padding:8px 10px;border-radius:6px;font-size:11px;color:#991b1b">
                <div>Escrow Status: <strong>PAYOUT HALTED & FROZEN</strong> by Autonomous Guard</div>
                <div>Surveillance: NAFDAC Field Office Dispatched for Cargo Quarantine</div>
              </div>
            </div>
          `;
        }
        return `
          <div class="sim-stage-container">
            <span class="sim-actor-badge">🚚 Step 3: Cold-Chain Logistics & Telemetry Transit</span>
            <div style="font-family:var(--font-heading);font-weight:700;font-size:15px;margin-bottom:6px">
              Northgate Distribution Fleet (Reefer Truck KJA-882-XA)
            </div>
            <div style="font-size:12px;line-height:1.45;color:#334155;margin-bottom:10px">
              En-route Lagos → Abuja. IoT Bluetooth & Cellular logger reports constant <strong>4.2°C ambient temperature</strong> across 420km. GPS custody chain electronically validated at all regional checkpoints.
            </div>
            <div style="background:#f1f5f9;padding:8px 10px;border-radius:6px;font-size:11px;color:#475569">
              <div>Cryptographic Proof: <strong>Signed IoT Telemetry Stream (0x918a...22)</strong></div>
              <div style="color:#2e7d32;font-weight:600;margin-top:2px">Escrow Status: Milestone 2 Complete · Temperature Integrity Pristine</div>
            </div>
          </div>
        `;
      } else if (step === 4) {
        if (isAnomaly) {
          return `
            <div class="sim-stage-container" style="border-color:#ef4444">
              <span class="sim-actor-badge" style="background:#fee2e2;color:#b91c1c">🚫 Step 4: Pharmacy Ingestion Scan [QUARANTINED]</span>
              <div style="font-family:var(--font-heading);font-weight:700;font-size:15px;color:#b91c1c;margin-bottom:6px">
                GreenLife Pharmacy, Wuse II (Supervising Pharmacist Chidinma Okafor)
              </div>
              <div style="font-size:12px;line-height:1.45;color:#334155;margin-bottom:10px">
                Pharmacist scans carton 2D DataMatrix on WelliVerify app. The system immediately flags the transit cold-chain excursion: <em>"Stock degraded during transit"</em>. Pharmacist segregates batch to the physical quarantine cage.
              </div>
              <div style="background:#fee2e2;padding:8px 10px;border-radius:6px;font-size:11px;color:#991b1b">
                <div>Escrow Status: <strong>REFUND DISBURSED TO PHARMACY</strong> (Northgate Payout Canceled)</div>
                <div>NAFDAC Enforcement: Automated incident report logged in zonal pharmacovigilance mesh.</div>
              </div>
            </div>
          `;
        }
        return `
          <div class="sim-stage-container">
            <span class="sim-actor-badge">💊 Step 4: Retail Pharmacy Ingestion Scan & Receiving</span>
            <div style="font-family:var(--font-heading);font-weight:700;font-size:15px;margin-bottom:6px">
              GreenLife Pharmacy, Wuse II, Abuja (Pharmacist Chidinma Okafor)
            </div>
            <div style="font-size:12px;line-height:1.45;color:#334155;margin-bottom:10px">
              Pharmacist scans 2D DataMatrix barcode on mobile app. Handshake verifies genuine factory provenance, 2027 expiry, and unbroken cold-chain. 50 packs accepted and ingested into retail dispensary inventory.
            </div>
            <div style="background:#f1f5f9;padding:8px 10px;border-radius:6px;font-size:11px;color:#475569">
              <div>Cryptographic Proof: <strong>Pharmacist Digital Licence PCN-08217743 Signature</strong></div>
              <div style="color:#2e7d32;font-weight:600;margin-top:2px">Escrow Status: Milestone 3 Complete · WelliPay Funds Ready for Automated Release</div>
            </div>
          </div>
        `;
      } else if (step === 5) {
        return `
          <div class="sim-stage-container">
            <span class="sim-actor-badge" style="background:#fdf2f8;color:#9d174d">🙋 Step 5: Patient Dispensing & HMO Co-Pay Verification</span>
            <div style="font-family:var(--font-heading);font-weight:700;font-size:15px;margin-bottom:6px">
              Dispensary Counter (Patient Ngozi Bello · Hygeia HMO #HYG-POL-9921)
            </div>
            <div style="font-size:12px;line-height:1.45;color:#334155;margin-bottom:10px">
              Patient scans package DataMatrix using WelliVerify patient mode. App confirms genuine medicine with green shield. Hygeia HMO co-pay clearinghouse instantly adjudicates: <strong>HMO pays ₦1,920 (80%)</strong>, patient pays ₦480 co-pay at point-of-sale.
            </div>
            <div style="background:#f1f5f9;padding:8px 10px;border-radius:6px;font-size:11px;color:#475569">
              <div>Cryptographic Proof: <strong>End-Consumer Decommissioning Anchor (Single-Use Retirement)</strong></div>
              <div style="color:#2e7d32;font-weight:600;margin-top:2px">Escrow Status: Consumer Verification Satisfied · Instant HMO Remittance Triggered</div>
            </div>
          </div>
        `;
      } else if (step === 6) {
        return `
          <div class="sim-stage-container" style="background:#f0fdf4;border-color:#86efac">
            <span class="sim-actor-badge" style="background:#dcfce7;color:#15803d">⚡ Step 6: Smart Settlement & Ledger Remittance</span>
            <div style="font-family:var(--font-heading);font-weight:700;font-size:15px;color:#15803d;margin-bottom:6px">
              WelliPay Autonomous Settlement Clearinghouse
            </div>
            <div style="font-size:12px;line-height:1.45;color:#166534;margin-bottom:10px">
              All 5 physical and cryptographic conditions verified without discrepancies! The WelliPay smart vault releases <strong>₦120,000</strong> settlement directly into Northgate Distribution's account, and disburses ₦1,920 HMO fee to GreenLife Pharmacy.
            </div>
            <div style="background:#dcfce7;padding:8px 10px;border-radius:6px;font-size:11px;color:#14532d">
              <div>Cryptographic Proof: <strong>Remittance Block Chained to Sovereign Trust Mesh</strong></div>
              <div style="font-weight:700;margin-top:2px">TRANSACTION COMPLETED: Provenance, Safety, and Payment Guaranteed</div>
            </div>
          </div>
        `;
      }
      return '';
    }

    // ========================================================
    // TIER 3: REGULATOR GEOSPATIAL RADAR & SEIZURE BROADCAST
    // ========================================================
    renderRegulatorRadar() {
      return `
        <div style="display:flex;flex-direction:column;gap:16px">
          ${this.state.seizureBroadcastActive ? `
            <div class="seizure-banner-active">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
                <strong>🚨 NATIONAL CRYPTOGRAPHIC SEIZURE BROADCAST ACTIVE</strong>
                <span style="font-size:10px;background:rgba(0,0,0,0.3);padding:2px 6px;border-radius:4px;font-family:monospace">
                  ${this.state.activeSeizureOrder?.gazetteRef || 'FED-GAZ-2026-NAFDAC-0881'}
                </span>
              </div>
              <div style="font-size:11.5px;line-height:1.4">
                Batch <strong>${this.state.activeSeizureOrder?.batchId || 'AL-77209'}</strong> is under federal impoundment across all Nigerian States. Active wholesale escrows frozen.
              </div>
              <div style="font-size:9.5px;opacity:0.8;font-family:monospace;margin-top:4px">
                Anchor Hash: ${this.state.activeSeizureOrder?.ledgerHash ? this.state.activeSeizureOrder.ledgerHash.slice(0, 32) + '...' : '0x99281a...'}
              </div>
            </div>
          ` : ''}

          <!-- Header & Metrics -->
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div>
              <div style="font-family:var(--font-heading);font-weight:600;font-size:18px">Real-Time Geofence Radar</div>
              <div style="font-size:12px;opacity:0.7">NAFDAC Central Interoperability Command · 7 Monitored Clusters</div>
            </div>
            <button type="button" class="btn btn-primary" data-action="toggle-seizure-modal" style="background:#dc2626;border-color:#b91c1c;font-size:11px;padding:6px 12px;gap:6px">
              <span>🚨</span> Broadcast Seizure
            </button>
          </div>

          <!-- Metric Badges -->
          <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:8px">
            <div class="card elev-sm" style="padding:10px 12px;border-top:3px solid #ef4444">
              <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:#64748b">Critical Clusters</div>
              <div style="font-family:var(--font-heading);font-size:20px;font-weight:700;color:#ef4444;margin-top:2px">2 Zones</div>
              <div style="font-size:10px;color:#94a3b8">Kano & Onitsha</div>
            </div>
            <div class="card elev-sm" style="padding:10px 12px;border-top:3px solid #f59e0b">
              <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:#64748b">Active Anomalies</div>
              <div style="font-family:var(--font-heading);font-size:20px;font-weight:700;color:#f59e0b;margin-top:2px">116 Flagged</div>
              <div style="font-size:10px;color:#94a3b8">Clone scans & cold chain</div>
            </div>
            <div class="card elev-sm" style="padding:10px 12px;border-top:3px solid #0088b0">
              <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:#64748b">Scans Today</div>
              <div style="font-family:var(--font-heading);font-size:20px;font-weight:700;color:#0088b0;margin-top:2px">13,182</div>
              <div style="font-size:10px;color:#94a3b8">Across 1,420 stores</div>
            </div>
          </div>

          <!-- Interactive Nigeria SVG Radar Map Canvas -->
          <div class="radar-hero-panel">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <span style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#38bdf8">
                National Geospatial Heatmap
              </span>
              <span style="font-size:10px;background:rgba(56,189,248,0.2);padding:2px 8px;border-radius:999px;color:#38bdf8">
                ● LIVE SATELLITE TELEMETRY
              </span>
            </div>

            <div class="radar-map-container">
              <div class="radar-grid-lines"></div>
              <div class="radar-concentric-circles"></div>
              <div class="radar-sweep-beam"></div>

              <!-- Hotspot Pins -->
              ${this.data.geoClusters.map(c => `
                <div class="radar-hotspot" style="top:${c.mapTop}%;left:${c.mapLeft}%" data-action="select-radar-cluster" data-cluster="${c.id}" title="${c.city} - ${c.anomalyCount} anomalies">
                  <div class="radar-pulse-ring ${c.riskTier.toLowerCase()}"></div>
                  <div class="radar-hotspot-label">${c.city} (${c.anomalyCount})</div>
                </div>
              `).join('')}
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:10px;color:#94a3b8">
              <span>● Tap any cluster dot to view local surveillance & dispatch data</span>
              <span>NIGERIA GRID: 4°N-14°N / 2°E-15°E</span>
            </div>
          </div>

          <!-- Selected Cluster Details Card -->
          ${(() => {
            const cluster = this.data.geoClusters.find(c => c.id === this.state.selectedRadarCluster) || this.data.geoClusters[0];
            const isCritical = cluster.riskTier === 'CRITICAL';
            return `
              <div class="card elev-sm" style="border-left:4px solid ${isCritical ? '#ef4444' : '#f59e0b'}">
                <div style="display:flex;justify-content:space-between;align-items:flex-start">
                  <div>
                    <div class="card-kicker">${cluster.region} · ${cluster.state}</div>
                    <div class="card-title" style="font-size:16px">${cluster.city}: ${cluster.hub}</div>
                  </div>
                  <span class="tag ${isCritical ? 'tag-accent-2' : 'tag-accent'}" style="font-size:10.5px">
                    ${cluster.riskTier} RISK
                  </span>
                </div>

                <div style="font-size:12px;color:#475569;margin:8px 0;line-height:1.4">
                  <strong>Primary Anomaly:</strong> ${cluster.primaryAnomaly}
                </div>

                <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:8px;margin-top:8px;font-size:11.5px">
                  <div>Total Scans: <strong>${cluster.totalScans.toLocaleString()}</strong></div>
                  <div>Anomalies Flagged: <strong style="color:${isCritical ? '#ef4444' : '#f59e0b'}">${cluster.anomalyCount}</strong></div>
                  <div>Active Seizures: <strong>${cluster.activeSeizuresCount}</strong></div>
                  <div>Field Units Deployed: <strong>${cluster.inspectionTeamsDeployed} NAFDAC Teams</strong></div>
                </div>

                <div style="display:flex;gap:6px;align-items:center;margin-top:10px;flex-wrap:wrap">
                  <span style="font-size:11px;font-weight:600;color:#64748b">Flagged Lots:</span>
                  ${cluster.flaggedBatches.map(b => `
                    <span class="tag tag-accent-2" style="font-family:monospace;font-size:10.5px">${b}</span>
                  `).join('')}
                </div>

                ${cluster.flaggedBatches.includes('AL-77209') ? `
                  <button type="button" class="btn btn-outline btn-block" data-action="open-seizure-modal" data-batch="AL-77209" style="margin-top:12px;font-size:11.5px;color:#ef4444;border-color:#ef4444">
                    🚨 Broadcast National Seizure Order for AL-77209 &rarr;
                  </button>
                ` : ''}
              </div>
            `;
          })()}

          <!-- Live Scan Incidents List -->
          <div>
            <div style="font-family:var(--font-heading);font-weight:600;font-size:15px;margin-bottom:8px">
              Recent Geospatial Scan Incidents
            </div>
            ${this.data.scanIncidents.map(inc => `
              <div class="radar-incident-card ${inc.severity === 'CRITICAL' ? 'critical' : ''}">
                <div style="display:flex;justify-content:space-between;align-items:baseline">
                  <div style="font-size:13px;font-weight:700;color:#0f172a">${inc.productName}</div>
                  <span class="tag ${inc.severity === 'CRITICAL' ? 'tag-accent-2' : 'tag-neutral'}" style="font-size:9.5px">${inc.severity}</span>
                </div>
                <div style="font-size:11px;color:#64748b;margin:2px 0 6px">
                  Batch ${inc.batchId} · Serial: <span style="font-family:monospace">${inc.serial}</span> · ${inc.time}
                </div>
                <div style="font-size:11.5px;color:#334155;line-height:1.4">
                  ${inc.description}
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;font-size:10.5px;color:#64748b">
                  <span>📍 ${inc.locationA}</span>
                  <span class="tag tag-outline" style="font-size:9px">${inc.status}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    renderSeizureBroadcastModal() {
      return `
        <div class="modal-backdrop" style="position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px">
          <div class="modal-card" style="background:#fff;border-radius:12px;width:100%;max-width:380px;padding:20px;box-shadow:0 20px 40px rgba(0,0,0,0.3)">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
              <span style="font-size:24px">🚨</span>
              <div>
                <div style="font-family:var(--font-heading);font-weight:700;font-size:16px">Broadcast National Seizure Order</div>
                <div style="font-size:11px;color:#64748b">Federal Ministry of Health & NAFDAC Enforcement Command</div>
              </div>
            </div>

            <div style="font-size:11.5px;color:#334155;line-height:1.45;margin-bottom:14px;background:#fef2f2;border:1px solid #fecaca;padding:10px;border-radius:6px">
              Executing this order will <strong>freeze this batch across all 1,420 registered dispensaries</strong> in Nigeria, cancel in-flight wholesale escrows, and anchor an immutable criminal seizure mandate to the Sovereign Trust Mesh.
            </div>

            <div style="display:flex;flex-direction:column;gap:10px;font-size:12px">
              <div>
                <label style="font-weight:600;display:block;margin-bottom:3px">Target Batch / Lot Number</label>
                <input class="input" id="seizure-batch-input" value="AL-77209" style="font-family:monospace;font-weight:700" />
              </div>
              <div>
                <label style="font-weight:600;display:block;margin-bottom:3px">Gazette Reference</label>
                <input class="input" id="seizure-gazette-input" value="FED-GAZ-2026-NAFDAC-0881" style="font-family:monospace" />
              </div>
              <div>
                <label style="font-weight:600;display:block;margin-bottom:3px">Grounds for Seizure</label>
                <input class="input" id="seizure-reason-input" value="Confirmed Counterfeit / Zero Lumefantrine detected in HPLC Assay" />
              </div>
              <div>
                <label style="font-weight:600;display:block;margin-bottom:3px">Enforcement Zone</label>
                <select class="input" id="seizure-zone-input">
                  <option value="NATIONWIDE (All 36 States & FCT Abuja)">NATIONWIDE (All 36 States & FCT Abuja)</option>
                  <option value="Northern Zone (Kano, Kaduna, Sokoto)">Northern Zone (Kano, Kaduna, Sokoto)</option>
                  <option value="Southern Zone (Lagos, Onitsha, Aba, Port Harcourt)">Southern Zone (Lagos, Onitsha, Aba, Port Harcourt)</option>
                </select>
              </div>
            </div>

            <div style="display:flex;gap:10px;margin-top:16px">
              <button type="button" class="btn btn-ghost" data-action="close-seizure-modal" style="flex:1">Cancel</button>
              <button type="button" class="btn btn-primary" data-action="submit-seizure-broadcast" style="flex:2;background:#dc2626;border-color:#b91c1c;font-size:12px">
                Execute Seizure
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // ========================================================
    // TIER 3: CHW RAPID DIAGNOSTIC TEST (RDT) INTEGRATION
    // ========================================================
    renderRdtReader(role) {
      return `
        <div style="display:flex;flex-direction:column;gap:16px">
          <div>
            <div style="font-family:var(--font-heading);font-weight:600;font-size:18px">Field CHW Rapid Diagnostic Test (RDT)</div>
            <div style="font-size:12px;opacity:0.7">Point-of-Care Cassette Strip Reader & Antimalarial Co-Verification</div>
          </div>

          <!-- Interactive Cassette Visualizer -->
          <div class="rdt-cassette-card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
              <span style="font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#475569">
                Malaria Pf/Pv Antigen Rapid Cassette
              </span>
              <span class="tag tag-accent" style="font-size:9.5px">In Vitro Diagnostic</span>
            </div>

            <div class="rdt-cassette-shell">
              <!-- Sample Well S -->
              <div class="rdt-sample-well" title="Sample Well (Add 5µL Whole Blood + Buffer)">
                <span>S</span>
                <span style="font-size:14px;line-height:1">🩸</span>
              </div>

              <!-- Nitrocellulose Reading Window -->
              <div class="rdt-strip-window">
                <!-- Control Line C -->
                <div class="rdt-line-marker">
                  <div class="rdt-band ${this.state.rdtControlLine ? 'control-active' : ''}"></div>
                  <span class="rdt-line-label">C</span>
                </div>
                <!-- Test Line T -->
                <div class="rdt-line-marker">
                  <div class="rdt-band ${this.state.rdtResult === 'POSITIVE_PF' ? 'test-positive' : 'test-negative'}" style="opacity:${this.state.rdtIntensity / 100}"></div>
                  <span class="rdt-line-label">T</span>
                </div>
              </div>

              <!-- Reading Badge -->
              <div style="text-align:right">
                <span class="tag ${this.state.rdtResult === 'POSITIVE_PF' ? 'tag-accent-2' : (this.state.rdtResult === 'NEGATIVE' ? 'tag-accent' : 'tag-neutral')}" style="font-size:11px;font-weight:700">
                  ${this.state.rdtResult === 'POSITIVE_PF' ? 'POSITIVE Pf' : (this.state.rdtResult === 'NEGATIVE' ? 'NEGATIVE' : 'INVALID')}
                </span>
                <div style="font-size:9.5px;color:#64748b;margin-top:2px">
                  ${this.state.rdtControlLine ? `Valid Test · ${this.state.rdtIntensity}% density` : 'Invalid: No Control Line'}
                </div>
              </div>
            </div>

            <!-- Co-Verification Stewardship Banner -->
            <div class="rdt-co-verification-badge" style="background:${this.state.rdtResult === 'POSITIVE_PF' ? '#ecfdf5' : '#f8fafc'};border-color:${this.state.rdtResult === 'POSITIVE_PF' ? '#10b981' : '#cbd5e1'}">
              <span style="font-size:18px">${this.state.rdtResult === 'POSITIVE_PF' ? '✅' : '🛡️'}</span>
              <div style="font-size:11.5px;line-height:1.4">
                ${this.state.rdtResult === 'POSITIVE_PF' ? `
                  <strong>Antimicrobial Stewardship Passed:</strong> Confirmed Plasmodium falciparum antigen. Linked to verified authentic <strong>Coartem (Batch AL-240981)</strong> point-of-dispense ledger record.
                ` : `
                  <strong>Antimicrobial Stewardship Safe:</strong> RDT Negative. Antimalarial drugs withheld according to WHO treatment protocol to prevent drug resistance.
                `}
              </div>
            </div>
          </div>

          <!-- Interactive Reader Controls -->
          <div class="card elev-sm">
            <div class="card-kicker">Cassette Interpretation Controls</div>
            <div style="display:flex;gap:6px;margin:10px 0">
              <button type="button" class="btn ${this.state.rdtResult === 'POSITIVE_PF' ? 'btn-primary' : 'btn-outline'}" data-action="set-rdt-result" data-result="POSITIVE_PF" style="flex:1;font-size:11px">
                Positive Pf
              </button>
              <button type="button" class="btn ${this.state.rdtResult === 'NEGATIVE' ? 'btn-primary' : 'btn-outline'}" data-action="set-rdt-result" data-result="NEGATIVE" style="flex:1;font-size:11px">
                Negative
              </button>
              <button type="button" class="btn ${this.state.rdtResult === 'INVALID' ? 'btn-primary' : 'btn-outline'}" data-action="set-rdt-result" data-result="INVALID" style="flex:1;font-size:11px">
                Invalid
              </button>
            </div>

            <div style="margin-top:10px">
              <div style="display:flex;justify-content:space-between;font-size:11.5px;color:#475569;margin-bottom:4px">
                <span>Test Band Optical Density</span>
                <strong>${this.state.rdtIntensity}%</strong>
              </div>
              <input type="range" min="10" max="100" value="${this.state.rdtIntensity}" class="input" style="padding:0;height:24px" data-action="set-rdt-intensity-slider" id="rdt-intensity-slider" />
            </div>
          </div>

          <!-- Patient & Field Station Metadata -->
          <div class="card elev-sm" style="display:flex;flex-direction:column;gap:10px;font-size:12px">
            <div class="card-kicker">Patient & Point-of-Care Session</div>
            <div style="display:grid;grid-template-columns:2fr 1fr;gap:8px">
              <div>
                <label style="font-weight:600;display:block;margin-bottom:3px">Patient Name</label>
                <input class="input" id="rdt-patient-name" value="${this.state.rdtPatientName}" />
              </div>
              <div>
                <label style="font-weight:600;display:block;margin-bottom:3px">Age / Gender</label>
                <input class="input" id="rdt-patient-age" value="${this.state.rdtPatientAge} / ${this.state.rdtGender}" />
              </div>
            </div>
            <div>
              <label style="font-weight:600;display:block;margin-bottom:3px">Health Facility / Post</label>
              <input class="input" id="rdt-location" value="${this.state.rdtLocation}" />
            </div>
            <div>
              <label style="font-weight:600;display:block;margin-bottom:3px">CHW Officer</label>
              <input class="input" id="rdt-chw" value="${this.state.rdtCHWName}" />
            </div>
            <div>
              <label style="font-weight:600;display:block;margin-bottom:3px">Linked Antimalarial Batch</label>
              <input class="input" id="rdt-batch" value="${this.state.rdtLinkedBatch}" style="font-family:monospace;font-weight:700" />
            </div>

            <button type="button" class="btn btn-primary btn-block" data-action="submit-rdt-test" style="margin-top:6px;gap:6px">
              <span>🔗</span> Anchor Diagnostic & Treatment to Ledger
            </button>
          </div>

          <!-- Historical Field Tests Log -->
          <div>
            <div style="font-family:var(--font-heading);font-weight:600;font-size:15px;margin-bottom:8px">
              Field Diagnostic Provenance Log
            </div>
            ${this.data.rdtTests.map(t => `
              <div class="card elev-sm" style="padding:10px 12px;margin-bottom:8px">
                <div style="display:flex;justify-content:space-between;align-items:baseline">
                  <div style="font-weight:700;font-size:13px">${t.patientName} (${t.patientAge}y, ${t.gender})</div>
                  <span class="tag ${t.result.includes('POSITIVE') ? 'tag-accent-2' : 'tag-accent'}" style="font-size:9.5px">
                    ${t.result}
                  </span>
                </div>
                <div style="font-size:11px;color:#64748b;margin:2px 0 4px">
                  ${t.location} · ${t.timestamp}
                </div>
                <div style="font-size:11.5px;color:#334155">
                  ${t.notes}
                </div>
                <div style="font-size:9.5px;font-family:monospace;color:#0088b0;margin-top:4px">
                  Ledger: ${t.ledgerHash ? t.ledgerHash.slice(0, 24) + '...' : '0xd1e2...'}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // ========================================================
    // TIER 3: RURAL USSD FEATURE-PHONE SIMULATOR MODAL
    // ========================================================
    renderUssdSimulatorModal() {
      return `
        <div class="ussd-modal-backdrop" data-action="close-ussd-modal">
          <div class="ussd-phone-body" onclick="event.stopPropagation()">
            <div class="ussd-phone-speaker"></div>

            <!-- LCD Display Screen -->
            <div class="ussd-lcd-screen">
              <div class="ussd-lcd-header">
                <span>📶 4G MTN/AIRTEL</span>
                <span>NAFDAC USSD</span>
                <span>98% 🔋</span>
              </div>
              <div style="white-space:pre-wrap;line-height:1.35;margin-bottom:6px">
${this.state.ussdDisplayLines}
              </div>
              ${this.state.ussdPromptText ? `
                <div style="font-weight:bold;margin-top:6px;border-top:1px dashed rgba(20,83,45,0.3);padding-top:4px">
                  ${this.state.ussdPromptText} ${this.state.ussdDialInput}
                </div>
              ` : ''}
            </div>

            <!-- Quick Shortcuts for Field Testing -->
            <div style="display:flex;gap:4px;margin-top:10px;width:100%;overflow-x:auto">
              <button type="button" class="btn btn-ghost" data-action="ussd-quick-code" data-code="*384*24#" style="font-size:9px;color:#38bdf8;padding:2px 6px;border:1px solid #475569;border-radius:4px;white-space:nowrap">
                Dial *384*24#
              </button>
              <button type="button" class="btn btn-ghost" data-action="ussd-quick-code" data-code="AL-240981" style="font-size:9px;color:#4ade80;padding:2px 6px;border:1px solid #475569;border-radius:4px;white-space:nowrap">
                PIN: AL-240981
              </button>
              <button type="button" class="btn btn-ghost" data-action="ussd-quick-code" data-code="AL-77209" style="font-size:9px;color:#f87171;padding:2px 6px;border:1px solid #475569;border-radius:4px;white-space:nowrap">
                PIN: AL-77209
              </button>
            </div>

            <!-- Numeric Keypad -->
            <div class="ussd-keypad">
              <div class="ussd-key" data-action="ussd-key-press" data-key="1">1 <span class="sub">.</span></div>
              <div class="ussd-key" data-action="ussd-key-press" data-key="2">2 <span class="sub">ABC</span></div>
              <div class="ussd-key" data-action="ussd-key-press" data-key="3">3 <span class="sub">DEF</span></div>
              <div class="ussd-key" data-action="ussd-key-press" data-key="4">4 <span class="sub">GHI</span></div>
              <div class="ussd-key" data-action="ussd-key-press" data-key="5">5 <span class="sub">JKL</span></div>
              <div class="ussd-key" data-action="ussd-key-press" data-key="6">6 <span class="sub">MNO</span></div>
              <div class="ussd-key" data-action="ussd-key-press" data-key="7">7 <span class="sub">PQRS</span></div>
              <div class="ussd-key" data-action="ussd-key-press" data-key="8">8 <span class="sub">TUV</span></div>
              <div class="ussd-key" data-action="ussd-key-press" data-key="9">9 <span class="sub">WXYZ</span></div>
              <div class="ussd-key" data-action="ussd-key-press" data-key="*">* <span class="sub"></span></div>
              <div class="ussd-key" data-action="ussd-key-press" data-key="0">0 <span class="sub">+</span></div>
              <div class="ussd-key" data-action="ussd-key-press" data-key="#"># <span class="sub"></span></div>
            </div>

            <!-- Action Buttons -->
            <div style="display:flex;gap:8px;width:100%;margin-top:12px">
              <button type="button" class="btn ussd-btn-end" data-action="ussd-clear" style="flex:1;height:38px;font-size:12px;font-weight:700">
                END / CLR
              </button>
              <button type="button" class="btn ussd-btn-call" data-action="ussd-send" style="flex:2;height:38px;font-size:12px;font-weight:700">
                SEND / CALL
              </button>
            </div>

            <button type="button" class="btn btn-ghost" data-action="close-ussd-modal" style="color:#94a3b8;font-size:11px;margin-top:10px">
              Close Phone Simulator &times;
            </button>
          </div>
        </div>
      `;
    }

    // ========================================================
    // TIER 3: POS THERMAL RECEIPT VOUCHER (58mm/80mm ESC/POS)
    // ========================================================
    renderThermalReceiptModal() {
      const data = this.state.thermalReceiptData || {
        productName: 'Coartem 80/480mg (Artemether/Lumefantrine)',
        batchId: 'AL-240981',
      };

      return `
        <div class="thermal-receipt-modal" data-action="close-thermal-receipt">
          <div class="thermal-receipt-paper" onclick="event.stopPropagation()">
            <div class="thermal-center">
              <div style="font-size:13px;font-weight:700">GREENLIFE PHARMACY & CLINIC</div>
              <div style="font-size:10px">Premises PCN-08217743 · Wuse II, Abuja</div>
              <div style="font-size:9.5px;color:#6b7280">National Health Trust Verified Dispensary</div>
            </div>

            <div class="thermal-divider"></div>

            <div style="display:flex;justify-content:space-between;font-size:10px">
              <span>DATE: ${new Date().toLocaleDateString('en-GB')}</span>
              <span>TIME: ${new Date().toLocaleTimeString('en-GB', {hour:'2-digit', minute:'2-digit'})}</span>
            </div>
            <div style="font-size:10px">TX ID: WPY-POS-2026-${Math.floor(100000 + Math.random()*900000)}</div>
            <div style="font-size:10px">PATIENT: Ngozi Bello (PT-55291)</div>

            <div class="thermal-divider"></div>

            <div style="font-weight:700;font-size:11px">${data.productName}</div>
            <div style="display:flex;justify-content:space-between;font-size:10px;margin-top:2px">
              <span>Batch: ${data.batchId}</span>
              <span>Exp: 12/2027</span>
            </div>
            <div style="font-size:10px">Serial: WV-49A1-2091-NG</div>
            <div style="font-size:10px">NAFDAC Reg: A4-0231 (GENUINE VERIFIED)</div>

            <div class="thermal-divider"></div>

            <div style="display:flex;justify-content:space-between;font-size:10.5px">
              <span>Wholesale Total:</span>
              <span>₦2,400.00</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:10.5px">
              <span>Hygeia HMO Co-Pay (80%):</span>
              <span>-₦1,920.00</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-weight:700;font-size:11.5px;margin-top:3px">
              <span>PATIENT CO-PAY DUE:</span>
              <span>₦480.00</span>
            </div>

            <div class="thermal-divider"></div>

            <!-- QR Code & Blockchain Signature -->
            <div class="thermal-barcode-box">
              [ ■■■■■ QR: SOVEREIGN-VERIFIED ■■■■■ ]
            </div>
            <div style="font-size:8.5px;text-align:center;word-break:break-all;color:#4b5563">
              Ledger Hash: 0x7a8b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b
            </div>

            <div class="thermal-center" style="font-size:9.5px;margin-top:8px">
              *** KEEP THIS SLIP FOR PATIENT RECORDS ***<br/>
              Verify online at welliverify.ng or dial *384*24#
            </div>

            <div style="display:flex;gap:8px;margin-top:14px">
              <button type="button" class="btn btn-primary btn-block" data-action="print-thermal-receipt" style="font-size:11px;background:#1e293b;border-color:#0f172a">
                🖨️ Print ESC/POS Receipt
              </button>
              <button type="button" class="btn btn-ghost" data-action="close-thermal-receipt" style="font-size:11px">
                Close
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // --- Main Screen Router ---
    renderContent(screen, role) {
      if (screen === 'profile') return this.renderProfile();
      if (screen === 'notifications') return this.renderNotifications();
      if (screen === 'product') return this.renderProductRecord(role);
      if (screen === 'unable') return this.renderUnableToVerify(role);
      if (screen === 'report') return this.renderReport(role);
      if (screen === 'voice') return this.renderVoice();
      if (screen === 'photocheck') return this.renderPhotocheck();
      if (screen === 'risk') return this.renderRiskEngine(role);

      // Shared / cross screens
      if (screen === 'forecast') return this.renderForecast();
      if (screen === 'price') return this.renderPriceIntelligence();
      if (screen === 'assistant') return this.renderAskAssistant();
      if (screen === 'coldchaindetail') return this.renderColdChainDetail();
      if (screen === 'coas') return this.renderLabCoas();
      if (screen === 'coadetail') return this.renderLabCoaDetail();
      if (screen === 'assay') return this.renderLabAssay();
      // Tier 2 screens
      if (screen === 'escrow') return this.renderEscrow(role);
      if (screen === 'serialization') return this.renderSerialization(role);
      if (screen === 'simulator') return this.renderSimulator(role);
      // Tier 3 screens
      if (screen === 'radar') return this.renderRegulatorRadar();
      if (screen === 'rdt') return this.renderRdtReader(role);

      // Role specific routes
      if (role === 'pharmacist') {
        switch (screen) {
          case 'home': return this.renderPharmacistHome();
          case 'scan': return this.renderScan(role);
          case 'inventory': return this.renderInventory();
          case 'escrow': return this.renderEscrow(role);
          case 'simulator': return this.renderSimulator(role);
          case 'rdt': return this.renderRdtReader(role);
          case 'fefo': return this.renderFefo();
          case 'nearby': return this.renderNearby(role);
          case 'recall': return this.renderRecalls(role);
          case 'supplier': return this.renderSupplierProfile();
          default: return this.renderPharmacistHome();
        }
      } else if (role === 'patient') {
        switch (screen) {
          case 'home': return this.renderPatientHome();
          case 'verify': return this.renderScan(role);
          case 'escrow': return this.renderEscrow(role);
          case 'rdt': return this.renderRdtReader(role);
          case 'availability': return this.renderNearby(role);
          case 'checkout': return this.renderCheckout();
          case 'prescriptions': return this.renderPrescriptions();
          case 'reminders': return this.renderReminders();
          default: return this.renderPatientHome();
        }
      } else if (role === 'distributor') {
        switch (screen) {
          case 'home': return this.renderDistributorHome();
          case 'escrow': return this.renderEscrow(role);
          case 'serialization': return this.renderSerialization(role);
          case 'simulator': return this.renderSimulator(role);
          case 'shipments': return this.renderShipments();
          case 'recall': return this.renderRecallDashboard();
          case 'alerts': return this.renderRecalls(role);
          case 'trust': return this.renderSupplierProfile();
          case 'coldchain': return this.renderColdChain();
          case 'marketplace': return this.renderMarketplace();
          default: return this.renderDistributorHome();
        }
      } else if (role === 'regulator') {
        switch (screen) {
          case 'home': return this.renderRegulatorHome();
          case 'radar': return this.renderRegulatorRadar();
          case 'serialization': return this.renderSerialization(role);
          case 'simulator': return this.renderSimulator(role);
          case 'recall': return this.renderRecallDashboard();
          case 'alerts': return this.renderRecalls(role);
          case 'verification': return this.renderKybQueue();
          case 'investigation': return this.renderInvestigations();
          case 'map': return this.renderSupplyChainMap();
          case 'inbox': return this.renderReportsInbox();
          default: return this.renderRegulatorHome();
        }
      } else if (role === 'lab') {
        switch (screen) {
          case 'home': return this.renderLabHome();
          case 'assay': return this.renderLabAssay();
          case 'coas': return this.renderLabCoas();
          case 'coadetail': return this.renderLabCoaDetail();
          case 'consumables': return this.renderConsumables();
          case 'simulator': return this.renderSimulator(role);
          default: return this.renderLabHome();
        }
      }

      return `<div style="padding:20px;text-align:center">Screen not found</div>`;
    }

    // --- Master Render ---
    render() {
      // Sync toolbar active role chip
      document.querySelectorAll('.role-chip').forEach((chip) => {
        if (chip.dataset.role === this.state.role && this.state.loggedIn) {
          chip.classList.add('active');
        } else {
          chip.classList.remove('active');
        }
      });

      if (!this.state.loggedIn) {
        this.appEl.innerHTML = this.renderLogin();
        return;
      }

      const role = this.state.role;
      const screen = this.state.screens[role] || 'home';
      const stack = this.state.stacks[role] || ['home'];
      const topLevelScreens = TOP_LEVEL_BY_ROLE[role] || [];
      const showBack = screen !== 'profile' && !topLevelScreens.includes(screen);
      const notifs = this.getNotificationFeed(role);

      this.appEl.innerHTML = `
        ${this.renderHeader(screen, role, notifs.length, showBack)}
        <div class="wv-scroll">
          ${this.renderContent(screen, role)}
        </div>
        ${this.renderDrawer(role)}
        ${this.state.ussdModalOpen ? this.renderUssdSimulatorModal() : ''}
        ${this.state.thermalReceiptModalOpen ? this.renderThermalReceiptModal() : ''}
        ${this.state.seizureModalOpen ? this.renderSeizureBroadcastModal() : ''}
      `;
    }
  }

  // --- Bootstrap Instance ---
  window.addEventListener('DOMContentLoaded', () => {
    window.welliVerifyApp = new WelliVerifyApp();
  });
})();
