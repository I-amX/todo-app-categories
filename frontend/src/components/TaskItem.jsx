import { Edit2, Trash2, CheckCircle, Circle } from 'lucide-react';

export default function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
  const categoryColors = {
    Work: 'bg-blue-100 text-blue-800',
    Personal: 'bg-green-100 text-green-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggleComplete(task.id)}
          className="flex-shrink-0 text-gray-400 hover:text-blue-600 transition"
        >
          {task.completed ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <p className={`text-gray-800 font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </p>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${categoryColors[task.category]}`}>
            {task.category === 'Work' ? '💼 Work' : '🏠 Personal'}
          </span>
        </div>
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-1 text-gray-500 hover:text-blue-600 transition"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 text-gray-500 hover:text-red-600 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}