// Your code here
function createEmployeeRecord(employeeData) {
    const [firstName, familyName, title, payPerHour] = employeeData;
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employeeData) {
    return employeeData.map(employee => {
      const [firstName, familyName, title, payPerHour] = employee;
      return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
      };
    });
  }
  
  function createTimeInEvent(employeeRecord, timestamp) {
    const [date, time] = timestamp.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');
  
    const timeInEvent = {
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: `${year}-${month}-${day}`
    };
  
    employeeRecord.timeInEvents.push(timeInEvent);
  
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, timestamp) {
    const [date, time] = timestamp.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');
  
    const timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(hour, 10),
      minute: parseInt(minute, 10),
      date: `${year}-${month}-${day}`
    };
  
    employeeRecord.timeOutEvents.push(timeOutEvent);
  
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    const hoursWorked = (timeOutEvent.hour + timeOutEvent.minute / 60) - (timeInEvent.hour + timeInEvent.minute / 60);
  
    return hoursWorked;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const wagesEarned = hoursWorked * employeeRecord.payPerHour;
  
    return wagesEarned;
  }
  
  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
  
    const totalWages = datesWorked.reduce((total, date) => {
      return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
  
    return totalWages;
  }
  
  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employeeRecord) => {
      return total + allWagesFor(employeeRecord);
    }, 0);
  
    return totalPayroll;
  }
  