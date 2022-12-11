import calculateListener from './utils/calculateListener.js';
import resetListener from './utils/resetListener.js';

const getEl = id => document.getElementById(id)

let isCaptain = false
let ccOnboard = false
let apuAvail = false
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
    disableButton(id, true)
    setTimeout(() => { disableButton(id, false) }, 900)
  })
}

const toggleSwitches =["isCaptain", "ccOnboard", "apuAvail"]
toggleSwitches.forEach(id => getEl(id).addEventListener("click", toggleSwitch(id, true)))

calculateListener(isCaptain, ccOnboard, apuAvail, net)
resetListener()