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
