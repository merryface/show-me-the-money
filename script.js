import salary from './utils/salaryCalc.js';


const getEl = id => document.getElementById(id).value
const getBool = switchVal => switchVal !== 'on'

let cprPaid = getBool(getEl('cprPaid'))
let ccOnboard = getBool(getEl('ccOnboard'))
let apuAvail = getBool(getEl('apuAvail'))
let gross = 0
let net = 0

document.getElementById("cprPaid").addEventListener("click", () => cprPaid = !cprPaid)
document.getElementById("ccOnboard").addEventListener("click", () => ccOnboard = !ccOnboard)
document.getElementById("apuAvail").addEventListener("click", () => apuAvail = !apuAvail)

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
    cprPaid: cprPaid,
    ccOnboard: ccOnboard,
    apuAvail: apuAvail,
    tbpExtra,
    tbpHours,
    ned,
    hed
  })

  gross = total
  net = total - (total * (tax/100))

  document.getElementById("gross_output").innerText = `${gross.toLocaleString("en-US")} €`
  document.getElementById("net_output").innerText = `${net.toLocaleString("en-US")} €`
});


