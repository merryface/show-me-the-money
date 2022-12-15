import calculateListener from './utils/calculateListener.js';
import resetListener from './utils/resetListener.js';

const getEl = id => document.getElementById(id)

let isCaptain = false
let ccOnboard = false
let apuAvail = false
let perDiemTaxed = false
let net = 0

const disableButton = (element, state) => {
  let el = document.getElementById(element)
  el.disabled = state
}

const toggleSwitch = (id, state) => {
  document.getElementById(id).addEventListener("click", () => {
    if (id === "ccOnboard") ccOnboard = !ccOnboard
    if (id === "apuAvail") apuAvail = !apuAvail
    if (id === "isCaptain") isCaptain = !isCaptain
    if (id === "perDiemTaxed") perDiemTaxed = !perDiemTaxed
    disableButton(id, true)

    setTimeout(() => { disableButton(id, false) }, 900)
  })
}

const toggleSwitches =["isCaptain", "ccOnboard", "apuAvail", "perDiemTaxed"]
toggleSwitches.forEach(id => getEl(id).addEventListener("click", toggleSwitch(id, true)))

getEl("calc").addEventListener("click", () => calculateListener(isCaptain, ccOnboard, apuAvail, perDiemTaxed, net))
resetListener()

getEl("tbpExtra").addEventListener("input", () => {
  let row = getEl('tbp_monthly')
  let taxRow = getEl('tableMonth_Tbp_after')
  const classes = 'tableRow' + (getEl("tbpExtra").value !== '200' ? '' : ' HidetdpRow')
  row.className = classes
  taxRow.className = classes
});