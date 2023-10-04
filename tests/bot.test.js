const date = new Date();
const formattedDate = date.toLocaleString('pt-BR', {
  timeZone: 'UTC',
  timeZoneName: 'short',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

console.log(formattedDate);