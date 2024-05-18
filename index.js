// Your code here
function createEmployeeRecord(array) {
  let testEmployee = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
  return testEmployee;
}

function createEmployeeRecords(dataEmployees) {
  let employeeRecords = [];

  for (let i = 0; i < dataEmployees.length; i++) {
    let employee = {
      firstName: dataEmployees[i][0],
      familyName: dataEmployees[i][1],
      title: dataEmployees[i][2],
      payPerHour: dataEmployees[i][3],
      timeInEvents: [],
      timeOutEvents: []
    };

    employeeRecords.push(employee);
  }

  return employeeRecords;
}

let dataEmployees = [
  ["Thor", "Odinsson", "Electrical Engineer", 45],
  ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
  ["Natalia", "Romanov", "CEO", 150],
  ["Darcey", "Lewis", "Intern", 15],
  ["Jarvis", "Stark", "CIO", 125],
  ["Anthony", "Stark", "Angel Investor", 300],
  ["Byron", "Poodle", "Mascot", 3],
  ["Julius", "Caesar", "General", 27],
  ["Rafiki", "", "Aide", 10],
  ["Simba", "", "King", 100]
];

let employees = createEmployeeRecords(dataEmployees);
console.log(employees.length); // Output: 10

function createTimeInEvent(employeeRecord, dateStamp) {
  let [date, time] = dateStamp.split(" ");

  let newTimeEvent = {
    type: "TimeIn",
    date: date,
    hour: parseInt(time)
  };

  employeeRecord.timeInEvents.push(newTimeEvent);

  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  let [date, time] = dateStamp.split(" ");

  let newTimeEvent = {
    type: "TimeOut",
    date: date,
    hour: parseInt(time)
  };

  employeeRecord.timeOutEvents.push(newTimeEvent);

  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
  let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

  let hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100; // Assuming the time is in 24-hour format

  return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, date) {
  let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
  let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  let payPerHour = employeeRecord.payPerHour;

  let hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;

  let wagesEarned = hoursWorked * payPerHour;

  return wagesEarned;
}

function allWagesFor(employeeRecord) {
  let totalWages = 0;

  for (let i = 0; i < employeeRecord.timeInEvents.length; i++) {
    let timeInEvent = employeeRecord.timeInEvents[i];
    let timeOutEvent = employeeRecord.timeOutEvents[i];

    let hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    let wagesEarned = hoursWorked * employeeRecord.payPerHour;

    totalWages += wagesEarned;
  }

  return totalWages;
}

function calculatePayroll(employees) {
  let totalPayroll = 0;

  for (let i = 0; i < employees.length; i++) {
    let employee = employees[i];
    let employeeWages = allWagesFor(employee);
    totalPayroll += employeeWages;
  }

  return totalPayroll;
}

let totalPayroll = calculatePayroll(employees);
console.log(totalPayroll); // Output: 770