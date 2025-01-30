/**
 * A custom hook for handling and formatting date operations
 * @param {string} isoDateString - ISO format date string to be processed
 * @returns {Object} An object containing:
 *   @property {string} title - Formatted date string ('Today', 'Tomorrow', or formatted date)
 *   @property {Date} date - JavaScript Date object created from the input string
 * 
 * @example
 * const { title, date } = useHandleDates('2023-12-25T00:00:00.000Z');
 * // If today is 2023-12-24:
 * // title: "Tomorrow"
 * // date: Date object for 2023-12-25
 * 
 * @description
 * This hook processes dates and returns them in a human-readable format.
 * - Returns "Today" for current date
 * - Returns "Tomorrow" for next day
 * - Returns formatted date string (e.g., "Mon, Dec 25") for other dates
 * If invalid date is provided, title will be an empty string
 */
const useHandleDates = (isoDateString) => {
  const date = new Date(isoDateString);

  const isToday = (dateToCheck) => {
    const today = new Date();
    return dateToCheck.toDateString() === today.toDateString();
  };

  const isTomorrow = (dateToCheck) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return dateToCheck.toDateString() === tomorrow.toDateString();
  };

  const formatDate = (dateToFormat) => {
    if (!dateToFormat || !(dateToFormat instanceof Date) || isNaN(dateToFormat)) {
      return '';
    }

    if (isToday(dateToFormat)) {
      return 'Today';
    }

    if (isTomorrow(dateToFormat)) {
      return 'Tomorrow';
    }

    return dateToFormat.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  return {
    title: formatDate(date),
    date: date
  };
};

export default useHandleDates;