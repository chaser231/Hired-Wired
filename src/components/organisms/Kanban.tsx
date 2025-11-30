"use client";

import { Profile } from "@/components/molecules";

interface KanbanCard {
  id: string;
  name: string;
  role: string;
  avatarSrc?: string;
  statusType?: "green" | "red" | "purple" | "stopped";
}

interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

interface KanbanProps {
  columns: KanbanColumn[];
  onCardClick?: (cardId: string) => void;
  className?: string;
}

export function Kanban({
  columns,
  onCardClick,
  className = "",
}: KanbanProps) {
  return (
    <div className={`flex gap-[14px] overflow-x-auto ${className}`}>
      {columns.map((column) => (
        <div 
          key={column.id} 
          className="flex-1 min-w-[280px] flex flex-col gap-[14px]"
        >
          {/* Column Header */}
          <div className="flex items-center justify-between p-[14px] bg-gray-200 rounded-sm">
            <span className="text-pixel">{column.title}</span>
            <span className="text-caps text-gray-500">{column.cards.length}</span>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-[8px]">
            {column.cards.map((card) => (
              <div 
                key={card.id}
                onClick={() => onCardClick?.(card.id)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <Profile
                  variant="short"
                  name={card.name}
                  role={card.role}
                  avatarSrc={card.avatarSrc}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

