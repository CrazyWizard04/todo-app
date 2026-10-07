import CreateTaskInput from '../components/tasks/CreateTaskInput';
import Navbar from '../components/tasks/Navbar';

const TasksPage = () => {
  return (
    <main className="min-w-9/10 md:min-w-150 space-y-10">
      <Navbar />
      <CreateTaskInput />
    </main>
  );
};

export default TasksPage;
