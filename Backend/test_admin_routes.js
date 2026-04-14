async function runTests() {
  console.log("=== Testing Admin Routes ===");
  const base = "http://localhost:5000/api";
  let token = "";

  // 1. Login as Admin
  try {
    const res = await fetch(`${base}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: "admin@hospital.com", password: "admin123" })
    });
    const data = await res.json();
    token = data.data.token;
    console.log("✅ Admin Login Successful");
  } catch(e) {
    console.log("❌ Admin Login Failed: ", e.message);
    return;
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // 2. Speciality Creation
  let specId = "";
  try {
    const res = await fetch(`${base}/admin/specialities`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name: "Neurology", description: "Brain stuff", isActive: true })
    });
    const data = await res.json();
    specId = data.data.id;
    console.log("✅ Speciality Created: ", specId);
  } catch(e) {
    console.log("❌ Speciality Creation Failed: ", e.message);
  }

  // 3. Speciality GET
  try {
    const res = await fetch(`${base}/admin/specialities`, { headers });
    const data = await res.json();
    console.log("✅ Specialities count: ", data.data.length);
  } catch(e) {
    console.log("❌ Speciality GET Failed");
  }

  // 4. Doctor Creation
  let docId = "";
  try {
    const res = await fetch(`${base}/admin/doctors`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: "Dr. Strange",
        email: "strange@hospital.com",
        password: "password123",
        specialityId: specId,
        consultationMode: "ONLINE",
        consultationFee: 500
      })
    });
    const data = await res.json();
    docId = data.data.id;
    console.log("✅ Doctor Created: ", docId);
  } catch(e) {
    console.log("❌ Doctor Creation Failed: ", e.message);
  }

  // 5. Shift Creation
  try {
    const res = await fetch(`${base}/admin/shifts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        doctorId: docId,
        date: "2026-05-15",
        shiftType: "MORNING",
        startTime: "09:00",
        endTime: "10:00",
        consultationMode: "ONLINE",
        intervalMins: 15
      })
    });
    const data = await res.json();
    console.log("✅ Shift & Slots Created! ShiftID: ", data.data.id);
  } catch(e) {
    console.log("❌ Shift Creation Failed: ", e.message);
  }

  // 6. Dashboard
  try {
    const res = await fetch(`${base}/admin/dashboard`, { headers });
    const data = await res.json();
    console.log("✅ Dashboard Datapoints: ", JSON.stringify(data.data));
  } catch(e) {
    console.log("❌ Dashboard GET Failed");
  }
}

runTests();
