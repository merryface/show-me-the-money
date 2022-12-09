import salary from './utils/salaryCalc.js';

const getEl = id => document.getElementById(id).value
const getBool = switchVal => switchVal !== 'on'

let cprPaid = getBool(getEl('cprPaid'))
let ccOnboard = getBool(getEl('ccOnboard'))
let apuAvail = getBool(getEl('apuAvail'))
let gross = 0
let net = 0


const disableButton = (element, state) => {
  let el = document.getElementById(element)
  el.disabled = state
}

const toggleSwitch = (id, state) => {
  document.getElementById(id).addEventListener("click", () => {
    state = !state
    disableButton(id, true)
    setTimeout(() => { disableButton(id, false) }, 1000)
  })
}

document.getElementById("cprPaid").addEventListener("click", toggleSwitch("cprPaid", cprPaid))
document.getElementById("ccOnboard").addEventListener("click", toggleSwitch("ccOnboard", ccOnboard))
document.getElementById("apuAvail").addEventListener("click", toggleSwitch("apuAvail", apuAvail))

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

  console.log(cprPaid, ccOnboard, apuAvail);
  

  document.getElementById("gross_output").innerText = `${gross.toLocaleString("en-US")} €`
  document.getElementById("net_output").innerText = `${net.toLocaleString("en-US")} €`
});


