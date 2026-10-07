import CreateTaskInput from '../components/tasks/CreateTaskInput';
import Navbar from '../components/tasks/Navbar';
import TaskList from '../components/tasks/TaskList';

const TasksPage = () => {
  return (
    <main className="w-full max-w-9/10 md:max-w-200 space-y-10">
      <Navbar />
      <CreateTaskInput />
      <TaskList />

      <p className="text-muted md:text-lg text-center mt-30 md:m-0">
        Drag and drop to reorder list
      </p>
    </main>
  );
};

export default TasksPage;
