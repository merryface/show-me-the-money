import salary from './utils/salaryCalc.js';

const getEl = id => document.getElementById(id).value

let cprPaid = false
let ccOnboard = false
let apuAvail = false
let gross = 0
let net = 0

const disableButton = (element, state) => {
  let el = document.getElementById(element)
  el.disabled = state
}

const toggleSwitch = (id, state) => {
  document.getElementById(id).addEventListener("click", () => {
    if (id === "cprPaid") cprPaid = !cprPaid
    if (id === "ccOnboard") ccOnboard = !ccOnboard
    if (id === "apuAvail") apuAvail = !apuAvail
    disableButton(id, true)
    setTimeout(() => { disableButton(id, false) }, 900)
  })
}

document.getElementById("cprPaid").addEventListener("click", toggleSwitch("cprPaid", true))
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
    dutyDays,
    blockHours,
    cprPaid,
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


