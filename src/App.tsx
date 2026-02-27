function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-indigo-400">Driva</span> TCG
          </h1>
          <nav className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Coleção</a>
            <a href="#" className="hover:text-white transition-colors">Decks</a>
            <a href="#" className="hover:text-white transition-colors">Batalha</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Bem-vindo ao <span className="text-indigo-400">Driva TCG</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            O Trading Card Game da Driva. Colecione, monte decks e batalhe!
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
