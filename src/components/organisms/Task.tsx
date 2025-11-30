"use client";

import { Flag, Button, Error } from "@/components/atoms";

interface TaskProps {
  title: string;
  completed?: boolean;
  error?: string;
  actionLabel?: string;
  onToggle?: (completed: boolean) => void;
  onAction?: () => void;
  className?: string;
}

export function Task({
  title,
  completed = false,
  error,
  actionLabel = "more info",
  onToggle,
  onAction,
  className = "",
}: TaskProps) {
  return (
    <div className={`flex items-center gap-[14px] py-[14px] border-b border-gray-200 ${className}`}>
      <Flag checked={completed} onChange={onToggle} />
      <span className={`text-h3 flex-1 ${completed ? "line-through text-gray-400" : ""}`}>
        {title}
      </span>
      {error && <Error message={error} />}
      <Button variant="secondary" onClick={onAction}>
        {actionLabel}
      </Button>
    </div>
  );
}

