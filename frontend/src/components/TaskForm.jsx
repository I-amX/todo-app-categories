import { useState, useEffect } from 'react';
import { Plus, Edit2 } from 'lucide-react';

export default function TaskForm({ onAddTask, onUpdateTask, editingTask, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Personal');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setCategory(editingTask.category);
    } else {
      setTitle('');
      setCategory('Personal');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Please enter a task title');
      return;
    }
    
    if (editingTask) {
      onUpdateTask({
        ...editingTask,
        title: title.trim(),
        category
      });
    } else {
      onAddTask({
        id: Date.now(),
        title: title.trim(),
        category,
        completed: false,
        createdAt: new Date().toISOString()
      });
    }
    
    setTitle('');
    setCategory('Personal');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        {editingTask ? <Edit2 size={20} /> : <Plus size={20} />}
        {editingTask ? 'Edit Task' : 'Add New Task'}
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Task Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Enter task..."
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Work"
                checked={category === 'Work'}
                onChange={(e) => setCategory(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">💼 Work</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Personal"
                checked={category === 'Personal'}
                onChange={(e) => setCategory(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">🏠 Personal</span>
            </label>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md"
          >
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
          
          {editingTask && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}