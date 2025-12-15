const form = document.getElementById("radoviForm");
const statusDiv = document.getElementById("status");

// ZAMENI SA TVOJIM /exec URL-om
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxExetguxALWQl8b1yBtPsrz02BgauKUXHOncTu7qZfhh0JsVtF6mVZWC2Ki-fHvVBV/exec";
const API_TOKEN = "RAD_FORM_V1";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  data.token = API_TOKEN; // dodaj token za autentifikaciju

  try {
    const response = await fetch(WEB_APP_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await response.json();

    if (result.success) {
      statusDiv.innerHTML = "Uspešno poslato! ID: " + result.id;
      form.reset();
    } else {
      statusDiv.innerHTML = "Greška: " + result.error;
    }
  } catch (err) {
    statusDiv.innerHTML = "Greška pri slanju: " + err;
  }
});
