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
//   const tbpExtra = Number(getElValue('tbpExtra'))-200
//   const tbpActive = tbpExtra > 0
  
//   const base = Number(getElValue('base'))
//   const dutyDays = Number(getElValue('dutyDays'))
//   const blockHours = Number(getElValue('blockHours'))
//   const tbpHours = Number(getElValue('tbpHours'))
//   const ned = Number(getElValue('ned'))
//   const hed = Number(getElValue('hed'))
//   const lateHome = Number(getElValue('lateHome'))
//   const soldDays = Number(getElValue('soldDays'))
//   const tax = Number(getElValue('tax'))
  
//   const total = salary({
//     base,
//     isCaptain,
//     dutyDays,
//     blockHours,
//     ccOnboard,
//     apuAvail,
//     tbpActive,
//     tbpExtra,
//     tbpHours,
//     ned,
//     hed,
//     lateHome,
//     soldDays
//   })

//   let correctedBase = tbpActive ? base * (1 + (0.025 * tbpExtra/4)): base
  
//   net = total - (total * (tax/100))

//   const cpr = cprCalc(blockHours, ccOnboard, apuAvail)
//   const tbp = tbpExtra > 0 ? (tbpHours * 105): 0

//   const table_cells = [
//     ['table_base', formatCurrency(correctedBase)],
//     ['table_perDiem', formatCurrency((dutyDays*70))],
//     ['table_cpr', formatCurrency(cpr)],
//     ['table_tbp', formatCurrency(tbp)],
//     ['table_ned', formatCurrency(nedCalc(ned, isCaptain))],
//     ['table_hed', formatCurrency(hedCalc(hed, isCaptain))],
//     ['table_lateHome', formatCurrency(lateHomeCalc(lateHome, isCaptain), isCaptain)],
//     ['table_soldDays', formatCurrency(vacationSellOffCalc(soldDays,correctedBase))],
//     ['table_tax', formatCurrency(-(tax/100)*total)],

//     ['table_beforeTax', total],
//     ['table_afterTax', net],
//   ]

//   table_cells.forEach(cell => getEl(cell[0]).innerText = `${cell[1]}`)
//   getEl("breakdown").scrollIntoView({behavior: "smooth"})
// });

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