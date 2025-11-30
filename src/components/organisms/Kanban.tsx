"use client";

import { useState } from "react";
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
  onCardMove?: (cardId: string, fromColumn: string, toColumn: string) => void;
  className?: string;
}

export function Kanban({
  columns: initialColumns,
  onCardClick,
  onCardMove,
  className = "",
}: KanbanProps) {
  const [columns, setColumns] = useState(initialColumns);
  const [draggedCard, setDraggedCard] = useState<{ card: KanbanCard; fromColumnId: string } | null>(null);
  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);

  const handleDragStart = (card: KanbanCard, columnId: string) => {
    setDraggedCard({ card, fromColumnId: columnId });
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDragOverColumnId(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumnId(null);
  };

  const handleDrop = (e: React.DragEvent, toColumnId: string) => {
    e.preventDefault();
    setDragOverColumnId(null);

    if (!draggedCard || draggedCard.fromColumnId === toColumnId) {
      setDraggedCard(null);
      return;
    }

    const { card, fromColumnId } = draggedCard;

    setColumns(prevColumns => {
      return prevColumns.map(column => {
        if (column.id === fromColumnId) {
          return {
            ...column,
            cards: column.cards.filter(c => c.id !== card.id),
          };
        }
        if (column.id === toColumnId) {
          return {
            ...column,
            cards: [...column.cards, card],
          };
        }
        return column;
      });
    });

    onCardMove?.(card.id, fromColumnId, toColumnId);
    setDraggedCard(null);
  };

  const handleDragEnd = () => {
    setDraggedCard(null);
    setDragOverColumnId(null);
  };

  return (
    <div className={`flex gap-[14px] overflow-x-auto ${className}`}>
      {columns.map((column) => (
        <div 
          key={column.id} 
          className={`
            flex-1 min-w-[280px] flex flex-col gap-[14px] p-[8px] rounded-lg transition-colors
            ${dragOverColumnId === column.id ? "bg-mint/50" : ""}
          `}
          onDragOver={(e) => handleDragOver(e, column.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          {/* Column Header */}
          <div className="flex items-center justify-between p-[14px] bg-gray-200 rounded-sm">
            <span className="text-pixel">{column.title}</span>
            <span className="text-caps text-gray-500">{column.cards.length}</span>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-[8px] min-h-[100px]">
            {column.cards.map((card) => (
              <div 
                key={card.id}
                draggable
                onDragStart={() => handleDragStart(card, column.id)}
                onDragEnd={handleDragEnd}
                onClick={() => onCardClick?.(card.id)}
                className={`
                  cursor-grab active:cursor-grabbing
                  hover:opacity-80 transition-all
                  ${draggedCard?.card.id === card.id ? "opacity-50 scale-95" : ""}
                `}
              >
                <Profile
                  variant="short"
                  name={card.name}
                  role={card.role}
                  avatarSrc={card.avatarSrc || "/assets/avatar-katya.png"}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
