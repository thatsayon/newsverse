/**
 * Converts an ISO date string into a human-readable format.
 * 
 * @param isoString - The ISO date string to format.
 * @returns A formatted date string.
 */
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long', // Full name of the month
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true // 12-hour format
  }).format(date);
}

export default formatDate;
