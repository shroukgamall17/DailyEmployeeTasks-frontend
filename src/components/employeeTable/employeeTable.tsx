import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store'; // Adjust the import path if necessary
import { fetchAllTasks, fetchTasks } from '../../Store/Slices/Tasks/tasksSlice'; 

const ProductivityTable: React.FC = () => {
  const dispatch = useDispatch();

  const { tasks, loading, error, remaining_hours } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const calculateRemainingTime = (remainingHours: number) => {
    const hours = Math.floor(Math.abs(remainingHours));
    const minutes = Math.floor((Math.abs(remainingHours) % 1) * 60);
    return `${remainingHours >= 0 ? '' : '-'}${hours}h ${minutes}m`;
  };

  return (
    <div className="container mx-auto flex justify-center mt-4">
      {loading && <p>Loading...</p>}
      {/* {error && <p>Error loading tasks: {error}</p>} */}
      <table className="border border-slate-300 border-spacing-4 border-rounded-lg text-center">
        <thead>
          <tr>
            <th rowSpan={2} className="border border-slate-300 px-4 py-4">Employee Name</th>
            <th colSpan={3} className="border border-slate-300 px-4 py-4">Tasks</th>
            <th rowSpan={2} className="border border-slate-300 px-4 py-4">Productivity</th>
            <th rowSpan={2} className="border border-slate-300 px-4 py-4">Remaining Time</th>
          </tr>
          <tr>
            <th className="border border-slate-300 px-4 py-2">Task Name</th>
            <th className="border border-slate-300 px-4 py-2">From</th>
            <th className="border border-slate-300 px-4 py-2">To</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="border border-slate-300 px-4 py-4">
                {`Employee ${task.employee_id}`}
              </td>
              <td className="border border-slate-300 px-4 py-4">{task.description}</td>
              <td className="border border-slate-300 px-4 py-4">{task.start_time}</td>
              <td className="border border-slate-300 px-4 py-4">{task.end_time}</td>
              <td className="border border-slate-300 px-4 py-4">
                <div className="flex flex-col items-center">
                  <div className="flex items-center mb-1">
                    <span className="text-purple-600 text-sm mr-2">20</span>
                    <span className="text-gray-500 text-sm">%</span>
                  </div>
                  <div className="w-32 bg-gray-200 h-1 rounded-full">
                    <div className="bg-purple-600 h-1 rounded-full" />
                  </div>
                </div>
              </td>
              <td className="border border-slate-300 px-4 py-4">
                {calculateRemainingTime(remaining_hours)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductivityTable;
