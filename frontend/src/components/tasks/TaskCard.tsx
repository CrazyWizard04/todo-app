import { useEffect, useRef, useState } from 'react';
import type { Task } from '../../lib/types';
import { Reorder, useDragControls } from 'framer-motion';
import { Check, Pencil, Trash, X } from 'lucide-react';
import { useTask } from '../../hooks/useTask';
import Button from '../ui/Button';

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const { id, description, is_completed } = task;
  const { removeTask, updateTask } = useTask();

  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(description);
  const editInputRef = useRef<HTMLInputElement>(null);
  const controls = useDragControls();

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <Reorder.Item
      key={id}
      value={task}
      dragListener={false}
      dragControls={controls}
      className="bg-surface flex justify-between items-center gap-4 p-4 rounded-lg"
    >
      {isEditing ? (
        <>
          <input
            ref={editInputRef}
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="w-full h-5 text-text placeholder:text-muted md:text-lg p-4
                focus:outline-2 focus:outline-purple-500 rounded-md"
          />

          <div className="flex-center gap-2 text-text">
            <Button
              type="button"
              Icon={Check}
              onClick={() => {
                updateTask(id, { description: newDescription });
                setIsEditing(false);
              }}
              className="bg-green-500 hover:bg-green-600 px-2 py-1 rounded-md"
            />
            <Button
              type="button"
              Icon={X}
              onClick={() => setIsEditing(false)}
              className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md"
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex-center gap-4">
            <button
              type="button"
              onClick={() => updateTask(id, { is_completed: !is_completed })}
              className={`size-8 border-2 border-border rounded-full 
                flex-center ${is_completed && 'bg-check'} cursor-pointer focus-visible:outline-2 
                focus-visible:outline-purple-500 focus-visible:outline-offset-2`}
            >
              {is_completed && <Check className="size-4 stroke-4 text-white" />}
            </button>

            <p
              onPointerDown={(e) => controls.start(e)}
              className="text-text md:text-lg cursor-grab active:cursor-grabbing select-none"
            >
              {description}
            </p>
          </div>

          <div className="flex-center gap-4 text-text">
            <Button
              type="button"
              Icon={Pencil}
              onClick={() => setIsEditing(true)}
              className="hover:text-blue-500"
            />
            <Button
              type="button"
              Icon={Trash}
              onClick={() => removeTask(id)}
              className="hover:text-red-500"
            />
          </div>
        </>
      )}
    </Reorder.Item>
  );
};

export default TaskCard;
