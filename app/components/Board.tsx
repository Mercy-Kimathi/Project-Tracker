"use client";

import { Circle, Kanban } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
  DragOverlay,
  type DragStartEvent,
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
  const [draggedCard, setDraggedCard] = useState<BoardCard | null>(null);
  const [cards, setCards] = useState<BoardCard[]>(initialCards);
  const [addIssue, setAddIssue] =useState(true);
  const [newTitle, setNewTitle]=useState("");
  const [newDescription, setNewDescription]=useState("");
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const getColumnCards = (status: ColumnId) => cards.filter((card) => card.status === status);

  const handleAddIssue=()=>{
    if(!newTitle.trim()) return;
    const newCard: BoardCard ={
      id: crypto.randomUUID(),
      title:newTitle,
      subtitle: newDescription,
      status: "backlog"
    }
      setCards((currentCards)=> [...currentCards,newCard])

      setNewTitle ("")
      setNewDescription("")
      setAddIssue(false)

  };

  const handleDragStart =(event: DragStartEvent)=> {
    const selectedCard = cards.find((card)=> card.id === String(event.active.id));
    setDraggedCard(selectedCard || null);
  }

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
         
      
      {addIssue && (
        <form onSubmit={(e)=>{
          e.preventDefault();
          handleAddIssue();
        }}>
          <input 
      value={newTitle}
      onChange={(event)=>setNewTitle(event.target.value)}
      placeholder="Issue title"
      />
      <input
      value={newDescription} 
      onChange={(event)=>setNewDescription(event.target.value)}
      placeholder="Issue Description"
      />
      <div className="flex gap-6 justify-between items-left mt-1">
      <button className="bg-white text-black rounded-lg px-4 py-2" onClick={()=> setAddIssue(true)}>+ Add Project</button>
      <button className="bg-white text-black rounded-lg px-4 py-2" onClick={()=> setAddIssue(false)}>close</button>
      <button className="bg-white text-black rounded-lg px-4 py-2 " onClick={()=>setAddIssue(false)}>Cancel</button>
      </div>
      </form>
      )};
      
      
      </div>

      <DndContext id ="Kanban-Board" sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd} >
        <div className="grid grid-cols-4 items-start justify-between gap-4 px-4 ">
          {columns.map((column) => {
            const columnCards = getColumnCards(column.id);

            <DragOverlay>
              {draggedCard ? (
                <Card 
                id={draggedCard.id}
                title={draggedCard.title}
                subtitle={draggedCard.subtitle}
                />
              ): null}
            </DragOverlay>

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
      <footer className="text-white">
        contact: <a href="mailto:contact@example.com">contact@example.com</a>
        &copy; 2024 Your Company. All rights reserved.
      </footer>
    </>
  );
}

export default Board;