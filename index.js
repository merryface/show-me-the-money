function salary(base = 0) {
  if (typeof base != 'number') return "enter a valid number"
  if (base < 0) return "enter an amount above 0"
  return 0
}

module.exports = salary;