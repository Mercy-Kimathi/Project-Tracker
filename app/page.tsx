import Image from "next/image";
import Nav from "./components/navbar";
import Hero from "./components/hero";
import Sidebar from "./components/Dashboard";
import Board from "./components/Board";
export default function Home() {
  return (
    <div>
      <main>
    <div className="flex flex-col justify-between">
      
        <Nav />
        <Hero />
        <br />
        <Sidebar />
        
        </div>
      </main>
    </div>
  );
}
