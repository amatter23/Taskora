const useHandleDates = isoDateString => {
  if (isoDateString === null) {
    return {
      title: null,
      date: null,
    };
  }

  const date = new Date(isoDateString);

  const isToday = dateToCheck => {
    const today = new Date();
    return dateToCheck.toDateString() === today.toDateString();
  };

  const isTomorrow = dateToCheck => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return dateToCheck.toDateString() === tomorrow.toDateString();
  };

  const formatDate = dateToFormat => {
    if (isToday(dateToFormat)) {
      return 'Today';
    }

    if (isTomorrow(dateToFormat)) {
      return 'Tomorrow';
    }

    return dateToFormat.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  return {
    title: formatDate(date),
    date: date,
  };
};

export default useHandleDates;
