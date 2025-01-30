/**
 * Creates an array of empty state messages with varying titles and subtitles
 * @param {string} [type='Project'] - The type of item to reference in the messages
 * @returns {Array<{title: string, subtitle: string}>} An array of message objects containing title and subtitle
 * @example
 * // returns array of messages with 'Task' as reference
 * const messages = createEmptyStateMessages('Task');
 * // returns default array of messages with 'Project' as reference
 * const defaultMessages = createEmptyStateMessages();
 */
export const createEmptyStateMessages = (type = 'Project') => [
  {
    title: "Start Something New",
    subtitle: `Create your first ${type}`
  },
  {
    title: "Blank Canvas",
    subtitle: `Begin your first ${type} here`
  },
  {
    title: "Nothing Here Yet",
    subtitle: `Time to add your first ${type}`
  },
  {
    title: "Get Started",
    subtitle: `Set up your first ${type}`
  },
  {
    title: "Clean Slate",
    subtitle: `Initialize your first ${type}`
  }
];

export const useGetRandomEmptyState = (type = 'Project') => {
  const messages = createEmptyStateMessages(type);
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

export default useGetRandomEmptyState;