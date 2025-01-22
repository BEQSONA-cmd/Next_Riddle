import Game from "@/components/Game";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <main className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Game</h1>
        <Game />
      </main>
    </div>
  );
}
