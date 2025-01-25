export const createEmptyStateMessages = (type = 'Project') => [
  {
    title: `Your Canvas Awaits! 🎨`,
    subtitle: `Start Your First ${type} Journey`
  },
  {
    title: "Fresh Start, Endless Possibilities ✨",
    subtitle: `Create Your First ${type}`
  },
  {
    title: "Ready to Build Something Amazing? 🚀",
    subtitle: `Begin Your ${type} Adventure`
  },
  {
    title: "Empty Space, Infinite Potential 💫",
    subtitle: `Launch Your First ${type}`
  },
  {
    title: "Time to Make Magic Happen ⚡",
    subtitle: `Kickstart Your First ${type}`
  }
];

export const useGetRandomEmptyState = (type = 'Project') => {
  const messages = createEmptyStateMessages(type);
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

export default useGetRandomEmptyState;