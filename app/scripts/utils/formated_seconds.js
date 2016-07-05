import parse from 'parse-seconds';

function checkTime(i)
{
if (i<10) 
  {i='0' + i}
  return i
}

export default function(seconds) {
  var parsed = parse({ days: false })(seconds);
  return checkTime(parsed.hours) + ':' + checkTime(parsed.minutes) + ':' + checkTime(parsed.seconds);
}