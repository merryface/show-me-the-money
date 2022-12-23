const tbpHoursLabel = document.getElementById("tbpHoursLabel");
const tbpHoursInput = document.getElementById("tbpHours");
const tbpExtraSelect = document.getElementById("tbpExtra");

// Set the initial style of the tbpHours label and input to "display: none"
tbpHoursLabel.style.display = "none";
tbpHoursInput.style.display = "none";

tbpExtraSelect.addEventListener("change", () => {
  // If the tbpExtra option is selected as something other than 200,
  // set the style of the tbpHours label and input to "display: block"
  if (tbpExtraSelect.value !== "200") {
    tbpHoursLabel.style.display = "block";
    tbpHoursInput.style.display = "block";
  } else {
    tbpHoursLabel.style.display = "none";
    tbpHoursInput.style.display = "none";
  }
});