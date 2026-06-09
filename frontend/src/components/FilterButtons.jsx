export default function FilterButtons({ currentFilter, onFilterChange }) {
  const filters = ['All', 'Work', 'Personal'];
  
  return (
    <div className="flex gap-2 mb-6 bg-white rounded-lg shadow-sm p-1">
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
            currentFilter === filter
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}