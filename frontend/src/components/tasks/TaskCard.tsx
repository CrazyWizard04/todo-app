import { useEffect, useRef, useState, type RefObject } from 'react';
import type { DragItemProps, ItemAnimationProps, Task } from '../../lib/types';
import { Reorder, useAnimate, useDragControls } from 'framer-motion';
import { Check, Pencil, Trash, X } from 'lucide-react';
import { useTask } from '../../hooks/useTask';
import Button from '../ui/Button';

type TaskCardProps = {
  task: Task;
  dragConstraints: RefObject<null>;
};

const TaskCard = ({ task, dragConstraints }: TaskCardProps) => {
  const { id, description, is_completed } = task;
  const { removeTask, updateTask } = useTask();

  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(description);
  const editInputRef = useRef<HTMLInputElement>(null);
  const [scope, animate] = useAnimate();
  const controls = useDragControls();

  const itemAnimation = {
    layout: true,
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: 'easeOut' },
  } as ItemAnimationProps;

  const dragProps = {
    dragListener: false,
    dragControls: controls,
    dragConstraints,
    dragElastic: 0.1,
  } as DragItemProps;

  async function handleTaskRemove(id: string) {
    animate(
      'p',
      { color: is_completed ? '#6ee7b7' : '#fca5a5' },
      { ease: 'easeIn', duration: 0.125 },
    );
    await animate(
      scope.current,
      { scale: 1.025, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)' },
      { ease: 'easeIn', duration: 0.125 },
    );
    await animate(
      scope.current,
      { opacity: 0, x: is_completed ? 24 : -24 },
      { delay: 0.75 },
    );
    removeTask(id);
  }

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <Reorder.Item
      key={id}
      value={task}
      ref={scope}
      {...itemAnimation}
      {...dragProps}
      data-completed={is_completed}
      className="bg-surface-sec flex justify-between items-center gap-4 p-4 
        rounded-lg active:shadow-2xl active:cursor-grabbing"
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
              onClick={() => handleTaskRemove(id)}
              className="hover:text-red-500"
            />
          </div>
        </>
      )}
    </Reorder.Item>
  );
};

export default TaskCard;
