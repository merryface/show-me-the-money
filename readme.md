# Show Me the Money! A Salary calculator
A tool to help estimate pilot pay at SafeJets. Created using test-driven development. The tests where promptly broken when the script was used practically. Fix in progress. This tool is official and can (and probably will) show some innaccuracies. It is best used for guesstimations, and nothing more.

The frontend is a simple html, css, js, set up which use a form to enter parameters into the main function, `salary()`, in order to present the information sought by the flight crew.

## SalaryCalc.js
`salary()` is a function that an object with 11 key-pair values which represent parameters to calculate the salary.

### `base`
Base salary entry. Only takes a number same as or greater than 0.

### `isCaptain`
A boolean that determines whether the user is a captain, which allows for modifications.

### `dutyDays`
This is a parameter to calculate per diems paid. It is displayed as "Per diem days" on the frontend. Only takes a number. The per diem rate is 70 euros. therefore `dutyDays*70` is used for the calculation and then added to the base pay into a total.

### `blockHours`
The number of hours flown by the flight crew throughout the year. Only takes a number. This is used for bonus and and Tour Based Pay calculation.

### `cprPaid`
SafeJets has a profitability bonus based on `blockHours.` It is only paid out in years SafeJets is profitable. This is a boolean to determine whether to add that bonus or not.

### `ccOnboard`, `apuAvail`, `tbpHours`, and `tbpActive`
TBP multiplication factor is based on some flight hours, cabin crew being part of the crew, and whether the fleet flown has an APU.

### `ned` and `hed`
Additional pay rate for extended work days. Normal is if the extended day doesn't make you exceed the contractd duty days, and High is for when it does.