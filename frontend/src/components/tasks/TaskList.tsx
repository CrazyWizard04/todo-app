import { useRef } from 'react';
import { Reorder } from 'framer-motion';
import { useTask } from '../../hooks/useTask';
import TaskCard from './TaskCard';
import Button from '../ui/Button';

const TaskList = () => {
  const { tasks, filter, removeCompletedTasks, updateTaskPosition, setFilter } =
    useTask();
  const container = useRef(null);

  const activeTasks = tasks.filter((tasks) => !tasks.is_completed);
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.is_completed;
    if (filter === 'completed') return task.is_completed;
    return task;
  });

  return (
    <Reorder.Group
      ref={container}
      values={tasks}
      onReorder={updateTaskPosition}
      className="relative bg-surface p-4 rounded-lg space-y-4 shadow-2xl"
    >
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TaskCard key={task.id} dragConstraints={container} task={task} />
        ))
      ) : (
        <div
          key="tasks_placeholder"
          className="bg-surface-sec text-center p-4 text-text md:text-lg rounded-lg"
        >
          No tasks here yet :)
        </div>
      )}

      <div className="flex justify-between items-center text-muted">
        <p>{activeTasks.length} items left</p>

        <div
          className="absolute md:static -bottom-20 left-0 w-full md:w-auto bg-surface 
            flex-center gap-2 rounded-lg p-4 md:p-0 shadow-2xl md:shadow-none font-bold"
        >
          <Button
            type="button"
            description="All"
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'text-blue-500' : 'text-muted'}
          />
          <Button
            type="button"
            description="Active"
            onClick={() => setFilter('active')}
            className={filter === 'active' ? 'text-blue-500' : 'text-muted'}
          />
          <Button
            type="button"
            description="Completed"
            onClick={() => setFilter('completed')}
            className={filter === 'completed' ? 'text-blue-500' : 'text-muted'}
          />
        </div>

        <Button
          type="button"
          description="Clear Completed"
          onClick={() => removeCompletedTasks()}
        />
      </div>
    </Reorder.Group>
  );
};

export default TaskList;
