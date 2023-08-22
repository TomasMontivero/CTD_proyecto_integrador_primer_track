export function getPreviousDay(date = new Date()){
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);

  return previous;
}

export const tileDisabled = ({ activeStartDate, date, view }) => {
  return date < getPreviousDay(new Date())
}