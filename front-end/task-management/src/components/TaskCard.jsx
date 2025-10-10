import { useDispatch, useSelector } from 'react-redux';
import { editTask, removeTask } from '../redux/taskSlice';

const TaskCard = ({ task, onEdit }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleToggleStatus = () => {
    const newStatus = task.status === 'pending' ? 'done' : 'pending';
    dispatch(editTask({ taskId: task.id, updates: { status: newStatus } }));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(removeTask(task._id));
    }
  };

  const isOwner = user?._id === task.user_id || user?.id === task.user_id;
  const isAdmin = user?.role === 'admin';
  const canEdit = isOwner || isAdmin;

  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-l-4 ${
      task.status === 'done' ? 'border-green-500' : 'border-yellow-500'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{task.description}</p>
          {task.profiles && (
            <p className="text-xs text-gray-500">
              Assigned to: <span className="font-semibold">{task.profiles.name}</span>
            </p>
          )}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          task.status === 'done'
            ? 'bg-green-100 text-green-700'
            : 'bg-yellow-100 text-yellow-700'
        }`}>
          {task.status}
        </span>
      </div>

      {canEdit && (
        <div className="flex space-x-2">
          <button
            onClick={handleToggleStatus}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105 shadow-sm ${
              task.status === 'pending'
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-yellow-500 text-white hover:bg-yellow-600'
            }`}
          >
            {task.status === 'pending' ? 'Mark Done' : 'Mark Pending'}
          </button>
          <button
            onClick={() => onEdit(task)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition transform hover:scale-105 shadow-sm"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition transform hover:scale-105 shadow-sm"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
