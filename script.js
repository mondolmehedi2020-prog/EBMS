
// GET ELEMENTS
const nameInput = document.getElementById("name");
const idInput = document.getElementById("customer");
const previousInput = document.getElementById("previous");
const currentInput = document.getElementById("current");
const monthInput = document.getElementById("month");
const paymentInput = document.getElementById("paymentStatus");

// BILL CALCULATION
function generateBill() {

    let previous = Number(previousInput.value);
    let current = Number(currentInput.value);

    if (
        nameInput.value.trim() === "" ||
        idInput.value.trim() === "" ||
        previousInput.value === "" ||
        currentInput.value === ""
    ) {
        alert("Please fill in all information!");
        return;
    }

    if (previous < 0 || current < previous) {
        alert("Please enter valid meter readings!");
        return;
    }

    updatePreview();

    alert("Electricity Bill Generated Successfully!");
}

// LIVE PREVIEW
function updatePreview() {

    let previous = Number(previousInput.value) || 0;
    let current = Number(currentInput.value) || 0;

    let valid = previousInput.value !== "" &&
                currentInput.value !== "" &&
                previous >= 0 && current >= previous;

    let units = valid ? current - previous : 0;

    // SAMPLE ACADEMIC TARIFF
    let rate = 6;

    let charge = units * rate;
    let service = 50;
    let vat = (charge + service) * 0.05;
    let total = charge + service + vat;

    document.getElementById("liveUnits").innerText =
        units + " Units";

    document.getElementById("rname").innerText =
        nameInput.value.trim() || "Your Name";

    document.getElementById("rid").innerText =
        idInput.value.trim() || "Not Provided";

    document.getElementById("rmonth").innerText =
        monthInput.value;

    document.getElementById("runits").innerText =
        units + " Units";

    document.getElementById("rcharge").innerText =
        "৳" + charge.toFixed(2);

    document.getElementById("rvat").innerText =
        "৳" + vat.toFixed(2);

    document.getElementById("rtotal").innerText =
        "৳" + total.toFixed(2);

    let status = paymentInput.value;

    let statusElement = document.getElementById("rstatus");

    statusElement.innerText = status.toUpperCase();

    statusElement.className =
        status === "Paid" ? "status paid" : "status";
}

// LIVE INPUT LISTENERS
[
    nameInput,
    idInput,
    previousInput,
    currentInput,
    monthInput,
    paymentInput
].forEach(input => {

    input.addEventListener("input", updatePreview);
    input.addEventListener("change", updatePreview);

});

// INITIAL PREVIEW
updatePreview();
