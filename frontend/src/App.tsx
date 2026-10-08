import { Route, Routes } from 'react-router';
import TasksPage from './pages/TasksPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<TasksPage />} />
    </Routes>
  );
};

export default App;
