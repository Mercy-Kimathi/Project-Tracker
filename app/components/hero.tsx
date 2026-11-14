import Button from "./button";
function Hero(){
    return(
        <>
        <div className="flex flex-col items-center align-center px-2 py-4 bg-white text-black gap-2">
            <h1 className="py-2">The system for modern products</h1>
            <p className="py-2">
                “Plan, track, and collaborate on projects effortlessly—all in one beautifully simple workspace.”
            </p>
        </div>
        <div className="flex items-center justify-center gap-10">
            <button className="rounded-lg bg-black text-white hover:bg-[#2a2b2e] font-bold px-2 py-2 ">Get Started</button>
            <button className="rounded-lg bg-black text-white hover:bg-[#2a2b2e] font-bold px-2 py-2 ">See how it works</button>
        </div>
        </>
    )
}
export default Hero;