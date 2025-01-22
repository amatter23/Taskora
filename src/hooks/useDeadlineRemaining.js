const getFriendlyDeadline = daysLeft => {
  if (daysLeft > 30) {
    return 'Plenty of time—keep it up!';
  } else if (daysLeft > 14) {
    return 'Two weeks to go—stay on it!';
  } else if (daysLeft > 7) {
    return 'A week left—keep moving!';
  } else if (daysLeft > 1) {
    return `${daysLeft} days—you're almost there!`;
  } else if (daysLeft === 1) {
    return '1 day left—finish strong!';
  } else if (daysLeft === 0) {
    return 'Due today—make it count!';
  } else {
    return 'Missed it—catch up now!';
  }
};
const useDeadlineRemaining = date => {
  const dueDateObj = new Date(date);
  const currentDate = new Date();
  const timeDiff = dueDateObj - currentDate;
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return getFriendlyDeadline(daysLeft);
};

export default useDeadlineRemaining;
