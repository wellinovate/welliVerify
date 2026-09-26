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
}

export const db = new WelliVerifyDB();
