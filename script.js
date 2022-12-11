import salary from './utils/salaryCalc.js';
import cprCalc from './utils/cprCalc.js';
import nedCalc from './utils/nedCalc.js'
import hedCalc from './utils/hedCalc.js'
import lateHomeCalc from './utils/lateHomeCalc.js'
import vacationSellOffCalc from './utils/vacationSellOffCalc.js';
import calculateListener from './utils/calculateListener.js';

const getElValue = id => document.getElementById(id).value
const getEl = id => document.getElementById(id)
const formatCurrency = value => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value)


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
    'table_base',
    'table_perDiem',
    'table_cpr',
    'table_tbp',
    'table_ned',
    'table_hed',
    'table_lateHome',
    'table_soldDays',
    'table_tax',
  ]

  const tableFields = [
    'table_base',
    'table_perDiem',
    'table_cpr',
    'table_tbp',
    'table_ned',
    'table_hed',
    'table_lateHome',
    'table_soldDays',
    'table_tax',
  ]

  getEl('tbpExtra').value = '200'
  inputFields.forEach(el => getEl(el).value = '')
  tableFields.forEach(el => getEl(el).innerText = '')
})