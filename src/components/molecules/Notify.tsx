"use client";

interface NotifyProps {
  message: string;
  className?: string;
}

export function Notify({
  message,
  className = "",
}: NotifyProps) {
  return (
    <div className={`p-[30px] bg-mint rounded-lg ${className}`}>
      <p className="text-description text-green">{message}</p>
    </div>
  );
}

