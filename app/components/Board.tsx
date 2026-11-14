"use client";

import { Circle } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState, type ReactNode } from "react";
import Card from "./Issuecard";

type ColumnId = "backlog" | "todo" | "in-progress" | "done";

type BoardCard = {
  id: string;
  title: string;
  subtitle: string;
  status: ColumnId;
};

const columns: { id: ColumnId; label: string }[] = [
  { id: "backlog", label: "Backlog" },
  { id: "todo", label: "Todo" },
  { id: "in-progress", label: "In progress" },
  { id: "done", label: "Done" },
];

const initialCards: BoardCard[] = [
  { id: "card-1", title: "Research Competitors", subtitle: "Web-12-Low", status: "backlog" },
  { id: "card-2", title: "Gather feedback", subtitle: "Web-13-Medium", status: "backlog" },
  { id: "card-3", title: "Plan sprint", subtitle: "Web-14-High", status: "todo" },
  { id: "card-4", title: "Prototype layouts", subtitle: "Web-15-High", status: "todo" },
  { id: "card-5", title: "Review wireframes", subtitle: "Web-16-Medium", status: "in-progress" },
  { id: "card-6", title: "Update copy", subtitle: "Web-17-Low", status: "in-progress" },
  { id: "card-7", title: "Ship polish pass", subtitle: "Web-18-Low", status: "done" },
  { id: "card-8", title: "Finalize QA", subtitle: "Web-19-Medium", status: "done" },
];

function Droppable({ id, children }: { id: ColumnId; children: ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`flex min-h-[200px] flex-col gap-4 rounded-lg px-4 ${isOver ? "bg-white/10" : ""}`}
    >
      {children}
    </div>
  );
}

function Board() {
  const [cards, setCards] = useState<BoardCard[]>(initialCards);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const getColumnCards = (status: ColumnId) => cards.filter((card) => card.status === status);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setCards((currentCards) => {
      const activeId = String(active.id);
      const overId = String(over.id);
      const activeCard = currentCards.find((card) => card.id === activeId);

      if (!activeCard) return currentCards;

      const targetColumn = columns.find((column) => column.id === overId);
      const targetCard = currentCards.find((card) => card.id === overId);

      const newStatus = targetColumn?.id ?? targetCard?.status;

      if (!newStatus) return currentCards;

      const remainingCards = currentCards.filter((card) => card.id !== activeCard.id);
      const updatedCard = { ...activeCard, status: newStatus };
      const updatedCards = [...remainingCards];

      if (targetCard) {
        const targetIndex = updatedCards.findIndex((card) => card.id === targetCard.id);
        updatedCards.splice(targetIndex, 0, updatedCard);
      } else {
        updatedCards.push(updatedCard);
      }

      return updatedCards;
    });
  };

  return (
    <>
      <div className="flex justify-between bg-black px-4 py-4">
        <div className="flex flex-col justify-left py-1">
          <h5 className="text-[#cccccc]">projects/website</h5>
          <h1 className="text-white font-bold">Web redesign</h1>
        </div>
        <p className="text-[#cccccc]">Filters</p>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-4 items-start gap-4 px-4 sm:grid-cols-4 xl:grid-cols-2">
          {columns.map((column) => {
            const columnCards = getColumnCards(column.id);

            return (
              <Droppable key={column.id} id={column.id}>
                <h4 className="grid grid-cols-[auto_auto] items-center justify-center gap-2 px-6 font-bold text-white font-sm">
                  <Circle size={12} />
                  {column.label} {columnCards.length}
                </h4>

                <SortableContext items={columnCards.map((card: BoardCard) => card.id)} strategy={verticalListSortingStrategy}>
                  {columnCards.map((card: BoardCard) => (
                    <Card key={card.id} id={card.id} title={card.title} subtitle={card.subtitle} />
                  ))}
                </SortableContext>
              </Droppable>
            );
          })}
          
        </div>
      </DndContext>
    </>
  );
}

export default Board;