#!/bin/bash
set -e

BASE_URL="http://localhost:4000/api/v1"
echo "=== WelliVerify API Validation Suite ==="

echo -n "1. Testing Health Endpoint: "
curl -s -f "$BASE_URL/health" | grep -q "ONLINE" && echo "PASS [200 OK]" || (echo "FAIL"; exit 1)

echo -n "2. Testing Atomic Verification (Valid Product): "
curl -s -f -X POST "$BASE_URL/products/verify" \
  -H "Content-Type: application/json" \
  -d '{"code":"AL-240981", "reporter_role":"pharmacist"}' | grep -q "VALID" && echo "PASS [200 OK]" || (echo "FAIL"; exit 1)

echo -n "3. Testing Atomic Verification (Recalled / Falsified Batch): "
curl -s -f -X POST "$BASE_URL/products/verify" \
  -H "Content-Type: application/json" \
  -d '{"code":"AL-77209", "reporter_role":"patient"}' | grep -q "RECALLED" && echo "PASS [200 OK]" || (echo "FAIL"; exit 1)

echo -n "4. Testing Inventory & Stockout Alert: "
curl -s -f "$BASE_URL/inventory" | grep -q "Predictive Stockout Warning" && echo "PASS [200 OK]" || (echo "FAIL"; exit 1)

echo -n "5. Testing Rebalance Recommendation & Dispatch: "
curl -s -f "$BASE_URL/inventory/rebalance-recommendations" | grep -q "Maitama General Hub Depot" && echo "PASS [200 OK]" || (echo "FAIL"; exit 1)
curl -s -f -X POST "$BASE_URL/inventory/rebalance" \
  -H "Content-Type: application/json" \
  -d '{"sourceHub":"Maitama General Hub Depot","targetBranch":"GreenLife Pharmacy (Wuse II)","product":"Artemether/Lumefantrine 20/120mg","transferUnits":80}' | grep -q "true" && echo "PASS [200 OK]" || (echo "FAIL"; exit 1)

echo -n "6. Testing Supplier Profile: "
curl -s -f "$BASE_URL/suppliers/SUPP-CHI-01" | grep -q "Chi Pharmaceuticals" && echo "PASS [200 OK]" || (echo "FAIL"; exit 1)

echo -n "7. Testing Cryptographic Supply Chain Ledger: "
curl -s -f "$BASE_URL/supply-chain/events" | grep -q "GENESIS_ANCHOR" && echo "PASS [200 OK]" || (echo "FAIL"; exit 1)

echo -n "8. Testing Citizen WhatsApp/SMS NLP Triage: "
curl -s -f -X POST "$BASE_URL/reports/triage" \
  -H "Content-Type: application/json" \
  -d '{"reporter":"Amina K. (Kano)","channel":"WhatsApp","message":"Yellow tablets crumbled to powder and smells like kerosene"}' | grep -q "Suspected Falsification" && echo "PASS [201 Created]" || (echo "FAIL"; exit 1)

echo -n "9. Testing Cold-Chain Telemetry: "
curl -s -f "$BASE_URL/cold-chain/CC-OXY-1188" | grep -q "EXCEPTION" && echo "PASS [200 OK]" || (echo "FAIL"; exit 1)

echo -n "10. Testing Demand Forecast & Price Intel: "
curl -s -f "$BASE_URL/demand/forecast" | grep -q "Rainy-season malaria pattern" && echo "PASS [200 OK]" || (echo "FAIL"; exit 1)
curl -s -f "$BASE_URL/price-intel" | grep -q "Amoxicillin 500mg" && echo "PASS [200 OK]" || (echo "FAIL"; exit 1)

echo -n "11. Testing AI Copilot Cypher / Graph Query: "
curl -s -f "$BASE_URL/graph/query?q=Cadila" | grep -q "MATCH" && echo "PASS [200 OK]" || (echo "FAIL"; exit 1)

echo ""
echo "=== ALL 11 API TEST SUITES PASSED SUCCESSFULLY ==="
