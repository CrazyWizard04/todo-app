import CreateTaskInput from '../components/tasks/CreateTaskInput';
import Navbar from '../components/tasks/Navbar';
import TaskList from '../components/tasks/TaskList';

const TasksPage = () => {
  return (
    <main className="min-w-9/10 md:min-w-3xl space-y-10">
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
