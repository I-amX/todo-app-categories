import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';
import { useLocalStorage } from './hooks/useLocalStorage';
import { CheckCircle, Server } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useLocalStorage('todo-tasks', []);
  const [filter, setFilter] = useLocalStorage('todo-filter', 'All');
  const [editingTask, setEditingTask] = useState(null);
  const [apiStatus, setApiStatus] = useState(null);
  const [showApiAlert, setShowApiAlert] = useState(false);

  console.log('API URL being used:', import.meta.env.VITE_API_URL);

  useEffect(() => {
    const checkBackend = async () => {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      try {
        const response = await fetch(`${apiUrl}/api/health`);
        if (response.ok) {
          const data = await response.json();
          setApiStatus({ connected: true, message: data.message });
        } else {
          setApiStatus({ connected: false });
        }
      } catch (error) {
        setApiStatus({ connected: false });
      }
    };
    
    checkBackend();
    
    // Show API alert briefly if backend is not configured
    const timer = setTimeout(() => setShowApiAlert(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setEditingTask(null);
  };

  const deleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingTask(null);
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <CheckCircle className="w-10 h-10 text-blue-600" />
            Task Manager
          </h1>
          <p className="text-gray-600">Organize your work and personal life</p>
          
          {/* API Status Banner (optional) */}
          {apiStatus && !apiStatus.connected && showApiAlert && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 flex items-center justify-center gap-2">
              <Server size={16} />
              Backend API not connected (frontend works with localStorage only)
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </div>

        {/* Task Form */}
        <TaskForm 
          onAddTask={addTask}
          onUpdateTask={updateTask}
          editingTask={editingTask}
          onCancelEdit={cancelEdit}
        />

        {/* Filter Buttons */}
        <FilterButtons 
          currentFilter={filter}
          onFilterChange={setFilter}
        />

        {/* Task List */}
        <TaskList 
          tasks={tasks}
          onToggleComplete={toggleComplete}
          onEdit={editTask}
          onDelete={deleteTask}
          filter={filter}
        />
      </div>
    </div>
  );
}

export default App;