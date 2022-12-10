import salary from './utils/salaryCalc.js';
import cprCalc from './utils/cprCalc.js';
import nedCalc from './utils/nedCalc.js'
import hedCalc from './utils/hedCalc.js'
import lateHomeCalc from './utils/lateHomeCalc.js'

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
  const lateHome = Number(getEl('lateHome'))
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
    hed,
    lateHome
  })
  
  net = total - (total * (tax/100)).toFixed(2)

  const cpr = cprCalc(blockHours, ccOnboard, apuAvail).toFixed(2)
  const tbp = tbpExtra > 0 ? (tbpHours * 105).toFixed(2) : 0


  document.getElementById("table_base").innerText = `${base.toLocaleString("en-US")} €`
  document.getElementById("table_perDiem").innerText = `${(dutyDays*70).toLocaleString("en-US")} €`
  document.getElementById("table_cpr").innerText = `${cpr.toLocaleString("en-US")} €`
  document.getElementById("table_tbp").innerText = `${tbp.toLocaleString("en-US")} €`
  document.getElementById("table_ned").innerText = `${nedCalc(ned, isCaptain).toLocaleString("en-US")} €`
  document.getElementById("table_hed").innerText = `${hedCalc(hed, isCaptain).toLocaleString("en-US")} €`
  document.getElementById("table_lateHome").innerText = `${lateHomeCalc(lateHome, isCaptain).toLocaleString("en-US")} €`
  document.getElementById("table_tax").innerText = `${(-(tax/100)*total).toLocaleString("en-US")} €`

  document.getElementById("table_beforeTax").innerText = `${total.toLocaleString("en-US")} €`
  document.getElementById("table_afterTax").innerText = `${net.toLocaleString("en-US")} €`

  document.getElementById("breakdown").scrollIntoView({behavior: "smooth"})
});


document.getElementById("reset").addEventListener("click", () => {
  document.getElementById('base').value = ''
  document.getElementById('blockHours').value = ''
  document.getElementById('dutyDays').value = ''
  document.getElementById('tbpExtra').value = '200'
  document.getElementById('tbpHours').value = ''
  document.getElementById('ned').value = ''
  document.getElementById('hed').value = ''
  document.getElementById('lateHome').value = ''
  document.getElementById('tax').value = ''
})