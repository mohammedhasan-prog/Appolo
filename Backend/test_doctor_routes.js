async function runTests() {
  console.log("=== Testing Doctor Routes ===");
  const base = "http://localhost:5000/api";
  let token = "";

  // 1. Login as Doctor
  try {
    const res = await fetch(`${base}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: "strange@hospital.com", password: "password123" }) // Generated during admin verification
    });
    const data = await res.json();
    token = data.data.token;
    console.log("✅ Doctor Login Successful");
  } catch(e) {
    console.log("❌ Doctor Login Failed: ", e.message);
    return;
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // 2. Doctor Dashboard
  try {
    const res = await fetch(`${base}/doctor/dashboard`, { headers });
    const data = await res.json();
    console.log("✅ Doctor Dashboard Extracted: ", Object.keys(data.data));
  } catch(e) {
    console.log("❌ Dashboard GET Failed");
  }

  // 3. Doctor Schedule
  let shiftId = "";
  try {
    const res = await fetch(`${base}/doctor/schedule`, { headers });
    const data = await res.json();
    shiftId = data.data[0]?.id; // From earlier admin generation
    console.log("✅ Doctor Schedule Arrays: ", data.data.length);
  } catch(e) {
    console.log("❌ Doctor Schedule GET Failed");
  }

  // 4. Doctor Shift Slots
  if (shiftId) {
    try {
      const res = await fetch(`${base}/doctor/shifts/${shiftId}/slots`, { headers });
      const data = await res.json();
      console.log("✅ Shift Slots Extracted: ", data.data.length);
    } catch(e) {
      console.log("❌ Shift Slots GET Failed: ", e.message);
    }
  }
}

runTests();
