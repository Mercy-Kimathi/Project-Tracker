import Image from "next/image";
import Nav from "./components/navbar";
import Hero from "./components/hero";
import Sidebar from "./components/Dashboard";
import Board from "./components/Board";
export default function Home() {
  return (
    <div className="flex flex-col justify-between">
      <main>
        <Nav />
        <Hero />
        <br />
        <Sidebar />
      </main>
    </div>
  );
}
