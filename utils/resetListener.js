const getEl = id => document.getElementById(id)

export default function() {
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
}