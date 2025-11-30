"use client";

interface ErrorProps {
  title?: string;
  message: string;
  className?: string;
}

export function Error({ 
  title = "error!",
  message,
  className = "" 
}: ErrorProps) {
  return (
    <div className={`
      inline-flex gap-[14px]
      px-[8px] py-[8px]
      bg-error-bg
      rounded-sm
      ${className}
    `}>
      <span className="text-caps text-red">{title}</span>
      <span className="text-caps text-red">{message}</span>
    </div>
  );
}

