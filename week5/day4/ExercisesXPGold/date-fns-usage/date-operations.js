const { addDays, format } = require('date-fns');

function dateOperations() {
    const now = new Date();
    const future = addDays(now, 5);
    const formatted = format(future, 'yyyy-MM-dd HH:mm:ss');
    console.log('Formatted date after 5 days:', formatted);
}

module.exports = dateOperations;
