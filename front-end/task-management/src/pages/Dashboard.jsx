import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../redux/taskSlice';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(getTasks({ userId: user._id || user.id, isAdmin: user.role === 'admin' }));
    }
  }, [dispatch, user]);

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setTaskToEdit(null);
    setShowForm(false);
  };

  const handleNewTask = () => {
    setTaskToEdit(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              {user?.role === 'admin' ? 'All Tasks' : 'My Tasks'}
            </h1>
            <p className="text-gray-600 mt-2">
              {user?.role === 'admin'
                ? 'Manage all tasks across the system'
                : 'Manage your personal tasks'}
            </p>
          </div>
          <button
            onClick={handleNewTask}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105 shadow-lg"
          >
            + New Task
          </button>
        </div>

        {/* ✅ الفورم كيكون واحد فقط */}
        {showForm && (
          <TaskForm
            key={taskToEdit?._id || 'new'}
            taskToEdit={taskToEdit}
            onClose={handleCloseForm}
          />
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-20">
            <svg
              className="mx-auto h-24 w-24 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="mt-4 text-xl font-semibold text-gray-700">No tasks yet</h3>
            <p className="mt-2 text-gray-600">Get started by creating your first task!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} onEdit={handleEdit} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
