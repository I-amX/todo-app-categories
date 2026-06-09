import TaskItem from './TaskItem';
import { ClipboardList } from 'lucide-react';

export default function TaskList({ tasks, onToggleComplete, onEdit, onDelete, filter }) {
  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    return task.category === filter;
  });

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-md">
        <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No tasks found</p>
        <p className="text-gray-400 text-sm">Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}