"use client";

type ConnectorType = "in" | "out";

interface NodeConnectorProps {
  type: ConnectorType;
  size?: number;
  className?: string;
}

export function NodeConnector({ 
  type, 
  size = 12,
  className = "" 
}: NodeConnectorProps) {
  const bgColor = type === "in" ? "bg-gray-400" : "bg-black";
  
  return (
    <div
      className={`rounded-full flex-shrink-0 cursor-pointer hover:scale-110 transition-transform ${bgColor} ${className}`}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`
      }}
      title={type === "in" ? "Input" : "Output"}
    />
  );
}

