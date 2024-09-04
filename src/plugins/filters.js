import { formatDistanceToNow } from 'date-fns';

export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}

export function currencyFormat(value) {
  // if (!value) return ''
  value = Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'NGN'
  })
  return value
}

export function formatDate(value) {
    let currentDate = new Date(value)
    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true // Set to false for 24-hour format
  };
    return currentDate.toLocaleDateString('en-US', options)
}

export function formatShortDate(value) {
  let currentDate = new Date(value)
    
    // Extract hours, minutes, and seconds
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    // const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    
    // Format the time as HH:MM:SS
    return `${hours}:${minutes}`;
}

export function formatTime(value) {
  let currentDate = new Date(value)
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return currentDate.toLocaleDateString('en-US', options)
}

export function getID(value) {
  const options = value.split("-").join('')
  const ID = options.slice(0,6)
  return ID
}
