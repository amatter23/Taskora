/**
 * Custom hook for filtering a list of items based on date, name, and status criteria
 * 
 * @param {Object} params - The parameters object
 * @param {Array} params.list - The array of items to filter
 * @param {string} params.from - The property name to filter by (e.g., 'name', 'status')
 * @param {(Object|string)} params.to - The filter criteria
 * @param {string} [params.to.date] - Date filter type ('today', 'week', 'month')
 * @param {string} [params.to[from]] - String to match against the 'from' property
 * 
 * @returns {Array} Filtered array of items based on the provided criteria
 * 
 * @example
 * // Filter by date
 * useSearch({ list: todos, from: 'name', to: { date: 'today' }})
 * 
 * // Filter by name
 * useSearch({ list: todos, from: 'name', to: 'shopping' })
 * 
 * // Filter by status
 * useSearch({ list: todos, from: 'status', to: { status: 'completed' }})
 */
const useSearch = ({ list, from, to }) => {
  if (!list || !to) return list;

  const filterByDate = (item, dateFilter) => {
    if (!item.dueDate) return false;
    
    const itemDate = new Date(item.dueDate);
    const today = new Date();
    
    itemDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    switch (dateFilter) {
      case 'today':
        return itemDate.getTime() === today.getTime();
      case 'week': {
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        nextWeek.setHours(0, 0, 0, 0);
        return itemDate >= today && itemDate <= nextWeek;
      }
      case 'month': {
        return itemDate.getMonth() === today.getMonth() && 
               itemDate.getFullYear() === today.getFullYear();
      }
      default:
        return true;
    }
  };

  let filteredList = [...list];

  if (to.date) {
    filteredList = filteredList.filter(item => filterByDate(item, to.date));
  }

  if (typeof to === 'string') {
    return filteredList.filter(item => 
      item[from].toLowerCase().includes(to.toLowerCase())
    );
  }

  if (to[from]) {
    return filteredList.filter(item => 
      item[from].toLowerCase().includes(to[from].toLowerCase())
    );
  }

  return filteredList;
};

export default useSearch;
