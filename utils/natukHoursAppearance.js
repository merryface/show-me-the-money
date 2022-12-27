export default function natukHoursAppearance(natuk) {
  const natukHoursLabel = document.getElementById("natukHoursLabel");
  const natukHoursInput = document.getElementById("natukHours");

  if (natuk) {
    natukHoursLabel.style.display = "block";
    natukHoursInput.style.display = "block";
  } else {
    natukHoursLabel.style.display = "none";
    natukHoursInput.style.display = "none";
  }
}

