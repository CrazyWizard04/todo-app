import { Plus } from 'lucide-react';
import { useState, type SubmitEvent } from 'react';
import { useTask } from '../../hooks/useTask';

const CreateTaskInput = () => {
  const { addTask } = useTask();
  const [description, setDescription] = useState('');

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (!description.trim().length) return;
    addTask(description);
    setDescription('');
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="relative w-full bg-surface rounded-lg shadow-2xl"
    >
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Create a new todo..."
        className="size-full text-text placeholder:text-muted md:text-lg pl-18 p-6 
            focus:outline-2 focus:outline-purple-500 rounded-lg"
      />

      <button
        type="submit"
        className={`absolute top-4 left-6 size-8 border-2 border-border rounded-full 
            flex-center ${description && 'bg-check'} cursor-pointer focus-visible:outline-2 
            focus-visible:outline-purple-500 focus-visible:outline-offset-2`}
      >
        {description && <Plus className="size-4 stroke-4 text-white" />}
      </button>
    </form>
  );
};

export default CreateTaskInput;
