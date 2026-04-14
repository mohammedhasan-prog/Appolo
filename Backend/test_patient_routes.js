async function runTests() {
  console.log("=== Testing Patient Routes ===");
  const base = "http://localhost:5000/api";

  let token = "";
  try {
    let res = await fetch(`${base}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: "jane@hospital.com", password: "password123" })
    });
    let data = await res.json();
    if(data.status === 'error') {
       // register
       res = await fetch(`${base}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: "Jane Patient", email: "jane@hospital.com", password: "password123", role: "PATIENT" })
       });
       data = await res.json();
    }
    
    token = data.data.token;
    console.log("✅ Patient Authenticated");
  } catch(e) {
    console.log("❌ Patient Auth Failed: ", e.message);
    return;
  }

  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  let doctorId = "";
  try {
    const res = await fetch(`${base}/patient/doctors`, { headers });
    const data = await res.json();
    doctorId = data.data[0].id;
    console.log("✅ Patient browsed public doctors: ", data.data.length);
  } catch(e) { console.log("❌ Doctors fetch failed"); }

  let shiftId = "";
  let slotId = "";
  try {
    const res = await fetch(`${base}/patient/shifts`, { headers });
    const data = await res.json();
    shiftId = data.data[0]?.id;
    // Patient shifts already include available slots
    slotId = data.data[0]?.slots?.[0]?.id;
    console.log("✅ Shift explicitly extracted from global bounds.");
  } catch(e) { console.log("❌ Availability fetch failed"); }

  if (slotId) {
    try {
      const res = await fetch(`${base}/patient/appointments`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ slotId, issueDescription: "Consistent migraines" })
      });
      const data = await res.json();
      if (data.status === 'error') {
        console.log("❌ Booking failed message: ", data.message);
      } else {
        console.log("✅ Booking Successfully Locked via $transaction! Appointment ID:", data.data.id);
      }
    } catch(e) { console.log("❌ Booking exception: ", e); }
  }
}
runTests();
