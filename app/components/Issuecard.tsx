import { useSortable} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
function Card({ id, title, subtitle }: { id: string; title: string; subtitle: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="flex h-[100px] w-[150px] flex-col items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#1b1c1f] py-4 transition-colors duration-200 hover:bg-[#2a2b2e] touch-none"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="flex flex-col items-center justify-between gap-8 p-2 text-white">
        <h2 className="text-center text-sm font-bold">{title}</h2>
        <p className="border-b border-gray-600 text-center text-sm text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}
export default Card;