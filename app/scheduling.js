
var j = schedule.scheduleJob('42 * * * *', function(){
  console.log('The answer to life and love, the universe, and everything!');
});


You can also use arrays to specify a list of acceptable values, 
and the Range object to specify a range of start and end values, 
with an optional step parameter. For instance, this will print a message on Thursday, 
Friday, Saturday, and Sunday at 5pm:

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(4, 6)];
rule.hour = 17;
rule.minute = 0;




To make things a little easier, an object literal syntax is also supported, 
like in this example which will log a message every Sunday at 2:30pm:

var j = schedule.scheduleJob({hour: 14, minute: 30, dayOfWeek: 0}, function(){
  console.log('Time for tea!');
});


