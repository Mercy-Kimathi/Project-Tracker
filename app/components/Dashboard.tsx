import { Gem } from "lucide-react";
import Board from "./Board";
function Sidebar(){
    return(
        <>
        <div className="bg-black flex gap-12 rounded-r-lg h-screen w-[default]">
        <div className="flex flex-col items-left justify-left px-4 py-6 gap-4 text-[#cccccc] bg-black">
           <div className="flex gap-2 text-white">
            <Gem size={19} />
            <h4>Acmes Workplace</h4>
           </div>
            
            <a href="#">Inbox</a>
            <a href="#">My Issues</a>
            <a href="#">Projects</a>
            <a href="#" className="20px Arial">WORKSPACE</a>
            <a href="#">Roadmap</a>
            <a href="#">Settings</a>
        </div>
        <div className="flex-1">
            <Board />
        </div>
        </div>

        </>
    )
}
export default Sidebar;