import salary from './utils/salaryCalc.js';

const getEl = id => document.getElementById(id).value

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

document.getElementById("isCaptain").addEventListener("click", toggleSwitch("isCaptain", true))
document.getElementById("ccOnboard").addEventListener("click", toggleSwitch("ccOnboard", true))
document.getElementById("apuAvail").addEventListener("click", toggleSwitch("apuAvail", true))

document.getElementById("calc").addEventListener("click", () => {
  const base = Number(getEl('base'))
  const dutyDays = Number(getEl('dutyDays'))
  const blockHours = Number(getEl('blockHours'))
  const tbpExtra = Number(getEl('tbpExtra'))-200
  const tbpHours = Number(getEl('tbpHours'))
  const ned = Number(getEl('ned'))
  const hed = Number(getEl('hed'))
  const tax = Number(getEl('tax'))
  
  const total = salary({
    base,
    isCaptain,
    dutyDays,
    blockHours,
    ccOnboard,
    apuAvail,
    tbpActive: tbpExtra > 0,
    tbpExtra,
    tbpHours,
    ned,
    hed
  })
  
  net = total - (total * (tax/100))  

  document.getElementById("gross_output").innerText = `${total.toLocaleString("en-US")} €`
  document.getElementById("net_output").innerText = `${net.toLocaleString("en-US")} €`
});


document.getElementById("reset").addEventListener("click", () => {
  document.getElementById('base').value = ''
  document.getElementById('blockHours').value = ''
  document.getElementById('dutyDays').value = ''
  document.getElementById('tbpExtra').value = '200'
  document.getElementById('tbpHours').value = ''
  document.getElementById('ned').value = ''
  document.getElementById('hed').value = ''
  document.getElementById('tax').value = ''
})