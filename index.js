function salary(base = 0, perDiem = 0) {
  let total = base
  if (typeof base != 'number') return "enter a valid number"
  if (base < 0) return "enter an amount above 0"

  total += perDiem*70
  return total
}

module.exports = salary;