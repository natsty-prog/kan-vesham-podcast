// כתובת ה-Web App של Google Apps Script.
// יש להחליף את הערך הבא בכתובת שמתקבלת אחרי פריסת הסקריפט (ראו README.md).
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx83QGknkQeKBY-qFUgiuoXCsxDF8oeRsXEyZ5kE1bIavMvx9LTKnsVCg5NvrM--28/exec";

const form = document.getElementById("guest-form");
const statusEl = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");
const thanksMessage = document.getElementById("thanks-message");

const branchLiving = document.getElementById("branch-living");
const branchConsidering = document.getElementById("branch-considering");

form.querySelectorAll('input[name="סטטוס"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    const isLiving = radio.value === "חי/ה בחו״ל" && radio.checked;
    const isConsidering = radio.value === "שוקל/ת לעבור" && radio.checked;
    if (isLiving) {
      branchLiving.classList.remove("hidden");
      branchConsidering.classList.add("hidden");
    } else if (isConsidering) {
      branchConsidering.classList.remove("hidden");
      branchLiving.classList.add("hidden");
    }
  });
});

const otherCheck = document.getElementById("other-topic-check");
const otherText = document.getElementById("other-topic-text");
otherCheck.addEventListener("change", () => {
  otherText.disabled = !otherCheck.checked;
  if (!otherCheck.checked) otherText.value = "";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (SCRIPT_URL.includes("PASTE_YOUR_APPS_SCRIPT_URL_HERE")) {
    statusEl.textContent = "טרם חובר הטופס לגיליון האקסל — ראו README.md להשלמת ההגדרה.";
    statusEl.className = "form-status error";
    return;
  }

  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    if (data[key] !== undefined) {
      data[key] = Array.isArray(data[key]) ? [...data[key], value] : [data[key], value];
    } else {
      data[key] = value;
    }
  });
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) data[key] = data[key].join(", ");
  });
  data["תאריך שליחה"] = new Date().toLocaleString("he-IL");

  submitBtn.disabled = true;
  statusEl.textContent = "שולח...";
  statusEl.className = "form-status";

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data),
    });

    form.classList.add("hidden");
    thanksMessage.classList.remove("hidden");
    thanksMessage.scrollIntoView({ behavior: "smooth" });
  } catch (err) {
    statusEl.textContent = "אירעה שגיאה בשליחה. נסה/י שוב או צור/י קשר ישירות.";
    statusEl.className = "form-status error";
    submitBtn.disabled = false;
  }
});
