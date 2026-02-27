import { useState } from "react";
import { Header, type Page } from "./components/Header";
import { PackOpener } from "./components/PackOpener";
import { Backpack } from "./components/Backpack";
import { Shop } from "./components/Shop";
import { usePlayerState } from "./hooks/usePlayerState";

function App() {
  const [page, setPage] = useState<Page>("packs");
  const { state, addCards, fuseSlots, buyPack, spendCoins } = usePlayerState();

  return (
    <div className="min-h-screen bg-[#0a1929] text-white dot-grid">
      <Header currentPage={page} onNavigate={setPage} coins={state.coins} />

      <main className="mx-auto max-w-7xl  py-6">
        {page === "packs" && (
          <div className="flex flex-col items-start gap-6 pt-12">
            <PackOpener
              packCount={state.packCount}
              lastPackTick={state.lastPackTick}
              onPackOpened={addCards}
              onNavigate={setPage}
            />
          </div>
        )}

        {page === "mochila" && (
          <div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight">Mochila</h2>
            <Backpack
              backpackSlots={state.backpackSlots}
              onFuse={fuseSlots}
            />
          </div>
        )}

        {page === "loja" && (
          <div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight">Loja</h2>
            <Shop
              coins={state.coins}
              onBuyPack={buyPack}
              onSpendCoins={spendCoins}
              onPackOpened={addCards}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
