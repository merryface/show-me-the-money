import salary from './utils/salaryCalc.js';
import cprCalc from './utils/cprCalc.js';
import nedCalc from './utils/nedCalc.js'
import hedCalc from './utils/hedCalc.js'
import lateHomeCalc from './utils/lateHomeCalc.js'
import vacationSellOffCalc from './utils/vacationSellOffCalc.js';

const getElValue = id => document.getElementById(id).value
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

getEl("isCaptain").addEventListener("click", toggleSwitch("isCaptain", true))
getEl("ccOnboard").addEventListener("click", toggleSwitch("ccOnboard", true))
getEl("apuAvail").addEventListener("click", toggleSwitch("apuAvail", true))

getEl("calc").addEventListener("click", () => {
  const base = Number(getElValue('base'))
  const dutyDays = Number(getElValue('dutyDays'))
  const blockHours = Number(getElValue('blockHours'))
  const tbpExtra = Number(getElValue('tbpExtra'))-200
  const tbpActive = tbpExtra > 0
  const tbpHours = Number(getElValue('tbpHours'))
  const ned = Number(getElValue('ned'))
  const hed = Number(getElValue('hed'))
  const lateHome = Number(getElValue('lateHome'))
  const soldDays = Number(getElValue('soldDays'))
  const tax = Number(getElValue('tax'))
  
  const total = salary({
    base,
    isCaptain,
    dutyDays,
    blockHours,
    ccOnboard,
    apuAvail,
    tbpActive,
    tbpExtra,
    tbpHours,
    ned,
    hed,
    lateHome,
    soldDays
  })

  let correctedBase = tbpActive ? base * (1 + (0.025 * tbpExtra/4)): base
  
  net = total - (total * (tax/100)).toFixed(2)

  const cpr = cprCalc(blockHours, ccOnboard, apuAvail)
  const tbp = tbpExtra > 0 ? (tbpHours * 105): 0

  getEl("table_base").innerText = `${correctedBase.toLocaleString("en-US")} €`
  getEl("table_perDiem").innerText = `${(dutyDays*70).toLocaleString("en-US")} €`
  getEl("table_cpr").innerText = `${cpr.toLocaleString("en-US")} €`
  getEl("table_tbp").innerText = `${tbp.toLocaleString("en-US")} €`
  getEl("table_ned").innerText = `${nedCalc(ned, isCaptain).toLocaleString("en-US")} €`
  getEl("table_hed").innerText = `${hedCalc(hed, isCaptain).toLocaleString("en-US")} €`
  getEl("table_lateHome").innerText = `${lateHomeCalc(lateHome, isCaptain).toLocaleString("en-US")} €`
  getEl("table_soldDays").innerText = `${vacationSellOffCalc(soldDays, correctedBase).toLocaleString("en-US")} €`
  getEl("table_tax").innerText = `${(-(tax/100)*total).toLocaleString("en-US")} €`

  getEl("table_beforeTax").innerText = `${total.toLocaleString("en-US")} €`
  getEl("table_afterTax").innerText = `${net.toLocaleString("en-US")} €`

  getEl("breakdown").scrollIntoView({behavior: "smooth"})
});


getEl("reset").addEventListener("click", () => {
  const inputFields = [
    'base',
    'blockHours',
    'dutyDays',
    'tbpHours',
    'ned',
    'hed',
    'lateHome',
    'tax',

  ]
  getEl('tbpExtra').value = '200'
  inputFields.forEach(el => getEl(el).value = '')
})