import crypto from 'node:crypto';

/**
 * WelliVerify Tamper-Evident Ledger
 * Models supply-chain events as atomic units:
 * WHO + WHAT + WHERE + WHEN + FROM WHOM + TO WHOM + WHY + STATUS
 * Chained with SHA-256 hashes to guarantee immutability and provenance.
 */

export class SupplyChainLedger {
  constructor() {
    this.chain = [];
    // Initialize Genesis Block
    this.createGenesisBlock();
  }

  createGenesisBlock() {
    const genesisEvent = {
      index: 0,
      timestamp: '2026-01-01T00:00:00.000Z',
      eventType: 'GENESIS_ANCHOR',
      who: 'NAFDAC Federal Regulatory Authority',
      what: 'WelliVerify Sovereign National Pharmaceutical Trust Mesh',
      where: 'Abuja Head Office (Plot 2032, Olusegun Obasanjo Way)',
      when: '2026-01-01T00:00:00.000Z',
      fromWhom: 'Federal Ministry of Health (FMoH)',
      toWhom: 'WelliVerify Trust Consortium & Licensed Ecosystem Gateways',
      why: 'Inauguration of National Serialized Serialization & Interoperability Layer',
      status: 'IMMUTABLE_GENESIS',
      previousHash: '0'.repeat(64),
    };
    genesisEvent.hash = this.calculateHash(genesisEvent);
    this.chain.push(genesisEvent);
  }

  calculateHash(event) {
    const serialized = JSON.stringify({
      index: event.index,
      timestamp: event.timestamp,
      eventType: event.eventType,
      who: event.who,
      what: event.what,
      where: event.where,
      when: event.when,
      fromWhom: event.fromWhom,
      toWhom: event.toWhom,
      why: event.why,
      status: event.status,
      previousHash: event.previousHash,
    });
    return crypto.createHash('sha256').update(serialized).digest('hex');
  }

  getLatestEvent() {
    return this.chain[this.chain.length - 1];
  }

  /**
   * Records an atomic supply-chain event with cryptographic chaining.
   */
  recordEvent({ eventType, who, what, where, when, fromWhom, toWhom, why, status, metadata = {} }) {
    const latestEvent = this.getLatestEvent();
    const eventTime = when || new Date().toISOString();

    const newEvent = {
      index: this.chain.length,
      timestamp: eventTime,
      eventType,
      who: who || 'Unknown Authorized Operator',
      what: what || 'Pharmaceutical Lot/Serial Batch',
      where: where || 'Unspecified Location',
      when: eventTime,
      fromWhom: fromWhom || 'N/A',
      toWhom: toWhom || 'N/A',
      why: why || 'Routine Supply Movement',
      status: status || 'RECORDED',
      metadata,
      previousHash: latestEvent.hash,
    };

    newEvent.hash = this.calculateHash(newEvent);
    this.chain.push(newEvent);
    return newEvent;
  }

  /**
   * Retrieves all events associated with a specific batch, product or actor.
   */
  getEventsForBatch(batchId) {
    return this.chain.filter(event => {
      const whatMatch = event.what && event.what.includes(batchId);
      const metaMatch = event.metadata && (event.metadata.batch === batchId || event.metadata.serial === batchId);
      return whatMatch || metaMatch;
    });
  }

  /**
   * Verifies the cryptographic integrity of the entire ledger chain.
   */
  verifyIntegrity() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      // Check hash calculation
      const calculatedHash = this.calculateHash(current);
      if (current.hash !== calculatedHash) {
        return {
          valid: false,
          errorIndex: i,
          reason: `Hash mismatch at block ${i}: expected ${current.hash}, got ${calculatedHash}`,
        };
      }

      // Check linkage
      if (current.previousHash !== previous.hash) {
        return {
          valid: false,
          errorIndex: i,
          reason: `Broken chain link at block ${i}: previousHash does not match block ${i - 1} hash`,
        };
      }
    }

    return {
      valid: true,
      height: this.chain.length,
      latestHash: this.getLatestEvent().hash,
      timestamp: new Date().toISOString(),
    };
  }
}

export const ledger = new SupplyChainLedger();
