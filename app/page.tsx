import TodoStack from "@/components/todo-stack"

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-400">TodoStack</h1>
          <p className="text-zinc-400">A LIFO stack-based todo application</p>
        </header>
        <TodoStack />
      </div>
    </main>
  )
}

