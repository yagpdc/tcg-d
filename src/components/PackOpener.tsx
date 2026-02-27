import { useState, useCallback, useRef, type MouseEvent } from "react";
import type { Card, AddCardsOptions } from "../types";
import type { Page } from "./Header";
import { usePackTimer } from "../hooks/usePackTimer";
import { openPack } from "../lib/pack";
import { cardCatalog } from "../data/cards";
import { CardDisplay } from "./CardDisplay";
import { PackVisual } from "./PackVisual";

function getRarityDropShadow(rarity: string): string {
  switch (rarity) {
    case "prismatico":
      return "drop-shadow(0 0 40px rgba(196,181,253,0.5)) drop-shadow(0 0 80px rgba(167,139,250,0.3)) drop-shadow(0 25px 50px rgba(0,0,0,0.6))";
    case "supremo":
      return "drop-shadow(0 0 50px rgba(240,127,45,0.7)) drop-shadow(0 0 100px rgba(255,215,0,0.4)) drop-shadow(0 25px 50px rgba(0,0,0,0.6))";
    case "lendario":
      return "drop-shadow(0 0 30px rgba(251,191,36,0.5)) drop-shadow(0 25px 50px rgba(0,0,0,0.6))";
    case "epico":
      return "drop-shadow(0 0 30px rgba(139,92,246,0.4)) drop-shadow(0 25px 50px rgba(0,0,0,0.6))";
    case "raro":
      return "drop-shadow(0 0 25px rgba(96,165,250,0.4)) drop-shadow(0 25px 50px rgba(0,0,0,0.6))";
    case "incomum":
      return "drop-shadow(0 0 20px rgba(74,222,128,0.3)) drop-shadow(0 25px 50px rgba(0,0,0,0.6))";
    default:
      return "drop-shadow(0 0 15px rgba(156,163,175,0.3)) drop-shadow(0 25px 50px rgba(0,0,0,0.6))";
  }
}

type Phase =
  | "idle"
  | "selecting"
  | "centering"
  | "ripping"
  | "stacked"
  | "done";
type CardState = "down" | "opening" | "revealed";

interface PackOpenerProps {
  packCount: number;
  lastPackTick: number;
  onPackOpened: (cards: Card[], options?: AddCardsOptions) => void;
  onNavigate: (page: Page) => void;
}

export function PackOpener({
  packCount,
  lastPackTick,
  onPackOpened,
  onNavigate,
}: PackOpenerProps) {
  const { canClaim, timeToNextPack } = usePackTimer(packCount, lastPackTick);
  const [phase, setPhase] = useState<Phase>("idle");
  const [cards, setCards] = useState<Card[]>([]);
  const [cardStates, setCardStates] = useState<CardState[]>([]);
  const [revealOrder, setRevealOrder] = useState<number[]>([]);
  const [dismissingPacks, setDismissingPacks] = useState(false);

  // Prevent double-clicks
  const isAnimating = useRef(false);

  // 3D tilt state for pack
  const packRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = packRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ rotateX: (0.5 - y) * 20, rotateY: (x - 0.5) * 30 });
    setGlarePos({ x: x * 100, y: y * 100 });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlarePos({ x: 50, y: 50 });
  }, []);

  // Click on stacked packs → selecting (or straight to centering if only 1)
  const handleClickStack = useCallback(() => {
    if (!canClaim || phase !== "idle") return;
    if (packCount === 1) {
      // Skip selecting, go straight to opening
      const generated = openPack(cardCatalog);
      setCards(generated);
      setCardStates(generated.map(() => "down"));
      setRevealOrder([]);
      setPhase("centering");
      setTimeout(() => setPhase("ripping"), 600);
    } else {
      setPhase("selecting");
    }
  }, [canClaim, phase, packCount]);

  // Select a pack from the fan → generate cards, animate to center
  const handleSelectPack = useCallback(
    (index: number) => {
      void index;
      if (phase !== "selecting" || dismissingPacks) return;
      setDismissingPacks(true);

      const generated = openPack(cardCatalog);
      setCards(generated);
      setCardStates(generated.map(() => "down"));
      setRevealOrder([]);

      // Dismiss non-selected packs, then move to centering
      setTimeout(() => {
        setDismissingPacks(false);
        setPhase("centering");
        setTimeout(() => setPhase("ripping"), 600);
      }, 400);
    },
    [phase, dismissingPacks],
  );

  // Back from selecting to idle
  const handleBackToIdle = useCallback(() => {
    setPhase("idle");
  }, []);

  // Click centered pack → rip it
  const handleClickRip = useCallback(() => {
    if (phase !== "ripping") return;
    setPhase("stacked");
  }, [phase]);

  // Click top card in stack → show as modal popup
  const handleClickCard = useCallback(
    (index: number) => {
      if (phase !== "stacked" || isAnimating.current) return;

      const topDown = cardStates.reduce(
        (last, s, i) => (s === "down" ? i : last),
        -1,
      );
      if (index !== topDown) return;

      isAnimating.current = true;

      setCardStates((prev) => {
        const next = [...prev];
        next[index] = "opening";
        return next;
      });
    },
    [phase, cardStates],
  );

  // Click the modal card → dismiss it to revealed row
  const handleDismissCard = useCallback(
    (index: number) => {
      setCardStates((prev) => {
        const next = [...prev];
        next[index] = "revealed";
        return next;
      });
      setRevealOrder((order) => [...order, index]);

      const allRevealed = cardStates.every((s, i) =>
        i === index ? true : s === "revealed",
      );
      if (allRevealed) {
        setTimeout(() => setPhase("done"), 600);
      }

      setTimeout(() => {
        isAnimating.current = false;
      }, 500);
    },
    [cardStates],
  );

  const handleClose = useCallback(() => {
    onPackOpened(cards, { decrementPack: true, grantCoins: true });
    setPhase("idle");
    setCards([]);
    setCardStates([]);
    setRevealOrder([]);
    isAnimating.current = false;
  }, [cards, onPackOpened]);

  // Pack visual with optional interactive glare overlay
  const packVisual = (interactive: boolean = false) => (
    <div className="relative" style={{ width: "200px", height: "310px" }}>
      <PackVisual />
      {interactive && (
        <div
          className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
          style={{
            background: isHovering
              ? `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(240,127,45,0.12) 0%, rgba(255,255,255,0.1) 30%, transparent 60%)`
              : "none",
            opacity: isHovering ? 1 : 0,
          }}
        />
      )}
    </div>
  );

  return (
    <div className="relative flex w-full flex-col items-start">
      {/* === IDLE: Stacked packs or empty state === */}
      {phase === "idle" &&
        (canClaim ? (
          <div className="flex items-start gap-8">
            {/* Stacked packs */}
            <div
              className="relative shrink-0"
              style={{
                perspective: "800px",
                width: `${200 + (packCount - 1) * 10}px`,
                height: "310px",
              }}
            >
              {Array.from({ length: packCount }).map((_, i) => {
                const isTop = i === packCount - 1;
                return (
                  <div
                    key={`stack-${i}`}
                    ref={isTop ? packRef : undefined}
                    onClick={isTop ? handleClickStack : undefined}
                    onMouseMove={isTop ? handleMouseMove : undefined}
                    onMouseEnter={isTop ? handleMouseEnter : undefined}
                    onMouseLeave={isTop ? handleMouseLeave : undefined}
                    className="absolute"
                    style={{
                      width: "200px",
                      height: "310px",
                      left: `${i * 10}px`,
                      top: `${-i * 3}px`,
                      zIndex: i,
                      cursor: isTop ? "pointer" : "default",
                      transform: isTop
                        ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
                        : "none",
                      transition: isTop
                        ? isHovering
                          ? "transform 0.1s ease-out"
                          : "transform 0.4s ease-out"
                        : "none",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {packVisual(isTop)}
                    {isTop && (
                      <div
                        className="pointer-events-none absolute -bottom-4 left-1/2 -z-10 h-8 w-[80%] -translate-x-1/2 rounded-full bg-black/40 blur-xl transition-all duration-300"
                        style={{
                          opacity: isHovering ? 0.8 : 0.4,
                          transform: `translateX(calc(-50% + ${tilt.rotateY * 0.5}px))`,
                        }}
                      />
                    )}
                  </div>
                );
              })}
              {/* Pack count badge */}
              {packCount > 1 && (
                <div
                  className="absolute z-50 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-lg"
                  style={{
                    left: `${(packCount - 1) * 10 + 200 - 8}px`,
                    top: "-8px",
                  }}
                >
                  x{packCount}
                </div>
              )}
            </div>
            {/* Text info beside packs */}
            <div className="flex flex-col gap-2 pt-8">
              <p className="text-sm font-medium text-gray-400">
                {packCount === 1
                  ? "Pack disponível!"
                  : `${packCount} packs disponíveis!`}
              </p>
              <p className="text-xs text-gray-600">Clique para abrir</p>
              {packCount < 5 && (
                <p className="text-xs text-gray-600">
                  Próximo pack em{" "}
                  <span className="font-mono text-indigo-400">
                    {timeToNextPack}
                  </span>
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-8">
            <div
              className="relative shrink-0"
              style={{ width: "200px", height: "310px" }}
            >
              <div className="absolute inset-0 rounded-xl border border-gray-800 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 opacity-50">
                <div className="flex h-full flex-col items-center justify-center gap-3">
                  <img
                    src="/driva-branco.png"
                    alt="Driva"
                    className="h-6 object-contain opacity-40"
                  />
                  <span className="text-[9px] font-semibold tracking-[0.3em] text-gray-600">
                    CARD GAME
                  </span>
                  <div className="mt-1 h-px w-20 bg-gray-800" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-8">
              <p className="text-sm text-gray-500">Próximo pack em</p>
              <p className="font-mono text-2xl font-bold text-indigo-400">
                {timeToNextPack}
              </p>
              <button
                onClick={() => onNavigate("loja")}
                className="mt-2 text-left text-sm text-amber-400 transition-colors hover:text-amber-300"
              >
                Visite a Loja para comprar mais packs!
              </button>
            </div>
          </div>
        ))}

      {/* === SELECTING: Packs fanned out side by side === */}
      {phase === "selecting" && (
        <div className="flex flex-col items-center gap-6">
          <p className="text-sm text-gray-400">Escolha um pack para abrir</p>
          <div className="flex items-center justify-center gap-5">
            {Array.from({ length: packCount }).map((_, i) => (
              <div
                key={`fan-${i}`}
                onClick={() => handleSelectPack(i)}
                className={`relative cursor-pointer transition-all duration-500 hover:scale-105 ${
                  dismissingPacks
                    ? "animate-pack-fan-return"
                    : "animate-pack-fan-in"
                }`}
                style={{
                  width: "180px",
                  height: "279px",
                  animationDelay: `${i * 60}ms`,
                  animationFillMode: "both",
                }}
              >
                {packVisual()}
              </div>
            ))}
          </div>
          <button
            onClick={handleBackToIdle}
            className="text-xs text-gray-600 transition-colors hover:text-gray-400"
          >
            Voltar
          </button>
        </div>
      )}

      {/* === CENTERING: Pack slides to center === */}
      {phase === "centering" && (
        <div
          className="pack-to-center relative"
          style={{ width: "200px", height: "310px" }}
        >
          {packVisual()}
        </div>
      )}

      {/* === RIPPING: Pack in center, click to rip === */}
      {phase === "ripping" && (
        <div className="flex flex-col items-center gap-4">
          <div
            onClick={handleClickRip}
            className="relative cursor-pointer transition-transform duration-200 hover:scale-105"
            style={{ width: "200px", height: "310px" }}
          >
            {packVisual()}
          </div>
          <p className="animate-pulse text-xs text-gray-500">
            Clique para rasgar
          </p>
        </div>
      )}

      {/* === STACKED: 3D deck on top, revealed cards row below === */}
      {phase === "stacked" && (
        <div className="flex w-full flex-col items-center gap-0">
          {/* 3D deck area */}
          <div
            className="relative"
            style={{
              width: "200px",
              height: "240px",
              perspective: "800px",
            }}
          >
            <div
              className="relative h-full w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {cards.map((_card, i) => {
                const state = cardStates[i];
                if (state !== "down") return null;

                const randomRot = -43 + ((i * 7 + 2) % 4);
                const zTranslate = i * 3;
                const topDownIndex = cardStates.reduce(
                  (last, s, idx) => (s === "down" ? idx : last),
                  -1,
                );
                const isTopDown = i === topDownIndex;

                return (
                  <div
                    key={`card-${i}`}
                    onClick={() => handleClickCard(i)}
                    className="absolute rounded-xl"
                    style={{
                      width: "200px",
                      height: "300px",
                      left: "0",
                      top: "0",
                      transition: "all 700ms ease",
                      transform: `rotateX(60deg) rotateY(0deg) rotateZ(${randomRot}deg) translateZ(${zTranslate}px)`,
                      zIndex: i,
                      cursor: isTopDown ? "pointer" : "default",
                      boxShadow:
                        i === 0
                          ? "12px 12px 0px 12px rgba(0,0,0,0.3)"
                          : isTopDown
                            ? "-10px 40px 20px 2px rgba(0,0,0,0.15)"
                            : "-10px 40px 20px 2px rgba(0,0,0,0)",
                    }}
                  >
                    {/* Card back */}
                    <div
                      className="card-font absolute inset-0 overflow-hidden rounded-xl"
                      style={{
                        background:
                          "linear-gradient(135deg, #003355, #001c30 40%, #002a47 60%, #003355)",
                        border: "1px solid rgba(240,127,45,0.25)",
                      }}
                    >
                      {/* Crosshatch pattern */}
                      <div
                        className="pointer-events-none absolute inset-0 opacity-[0.04]"
                        style={{
                          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 8px, white 8px, white 9px), repeating-linear-gradient(-45deg, transparent, transparent 8px, white 8px, white 9px)`,
                        }}
                      />
                      {/* Top bar */}
                      <div
                        className="flex h-3 w-full items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(to right, rgba(0,51,85,0.4), rgba(240,127,45,0.15), rgba(0,51,85,0.4))",
                        }}
                      >
                        <div
                          className="h-px w-3/4"
                          style={{
                            background:
                              "linear-gradient(to right, transparent, rgba(240,127,45,0.2), transparent)",
                          }}
                        />
                      </div>
                      {/* Center content */}
                      <div className="flex h-full flex-col items-center justify-center gap-3">
                        {/* Logo circle */}
                        <div className="relative h-16 w-16">
                          <div
                            className="absolute -inset-1 rounded-full blur-sm"
                            style={{
                              background:
                                "radial-gradient(circle, rgba(240,127,45,0.2) 0%, transparent 70%)",
                            }}
                          />
                          <div
                            className="relative h-full w-full overflow-hidden rounded-full"
                            style={{ border: "1px solid rgba(240,127,45,0.3)" }}
                          >
                            <img
                              src="/driva-logo.png"
                              alt="Driva"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                        {/* Separator */}
                        <div
                          className="h-px w-20"
                          style={{
                            background:
                              "linear-gradient(to right, transparent, rgba(240,127,45,0.3), transparent)",
                          }}
                        />
                        {/* Brand */}
                        <img
                          src="/driva-branco.png"
                          alt="Driva"
                          className="h-3.5 object-contain opacity-50"
                        />
                        <span
                          className="text-[7px] font-semibold tracking-[0.25em] opacity-40"
                          style={{ color: "#F07F2D" }}
                        >
                          CARD GAME
                        </span>
                        {/* Separator */}
                        <div
                          className="h-px w-20"
                          style={{
                            background:
                              "linear-gradient(to right, transparent, rgba(240,127,45,0.3), transparent)",
                          }}
                        />
                      </div>
                      {/* Bottom bar */}
                      <div
                        className="absolute bottom-0 flex h-3 w-full items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(to right, rgba(0,51,85,0.4), rgba(240,127,45,0.15), rgba(0,51,85,0.4))",
                        }}
                      >
                        <div
                          className="h-px w-3/4"
                          style={{
                            background:
                              "linear-gradient(to right, transparent, rgba(240,127,45,0.2), transparent)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hint */}
          {cardStates.some((s) => s === "down") &&
            !cardStates.some((s) => s === "opening") && (
              <p className="mt-2 text-xs text-gray-500">
                Clique na carta do topo
              </p>
            )}

          {/* Modal overlay for "opening" card */}
          {cardStates.map((state, i) =>
            state === "opening" ? (
              <div
                key={`modal-${i}`}
                className={`fixed inset-0 z-50 flex cursor-pointer items-center justify-center ${
                  cards[i].rarity === "supremo"
                    ? "animate-supremo-shake"
                    : ""
                }`}
                onClick={() => handleDismissCard(i)}
              >
                {/* Backdrop */}
                <div className="animate-modal-backdrop absolute inset-0 bg-black/70" />

                {/* Prismatic screen effect */}
                {cards[i].rarity === "prismatico" && (
                  <>
                    <div className="animate-prismatic-screen absolute inset-0 z-20" />
                    <div
                      className="animate-prismatic-rays absolute z-20"
                      style={{
                        width: "150vmax",
                        height: "150vmax",
                        left: "50%",
                        top: "50%",
                        marginLeft: "-75vmax",
                        marginTop: "-75vmax",
                      }}
                    />
                  </>
                )}

                {/* Supremo screen effect */}
                {cards[i].rarity === "supremo" && (
                  <>
                    <div className="animate-supremo-screen absolute inset-0 z-20" />
                    <div
                      className="animate-supremo-rays absolute z-20"
                      style={{
                        width: "200vmax",
                        height: "200vmax",
                        left: "50%",
                        top: "50%",
                        marginLeft: "-100vmax",
                        marginTop: "-100vmax",
                      }}
                    />
                  </>
                )}

                {/* Card popup */}
                <div className="animate-card-popup relative z-30 cursor-pointer">
                  <div
                    className="rounded-xl"
                    style={{
                      filter: getRarityDropShadow(cards[i].rarity),
                    }}
                  >
                    <CardDisplay card={cards[i]} tier="prata" />
                  </div>
                  <p className="mt-4 animate-pulse text-center text-xs text-gray-400">
                    Clique para continuar
                  </p>
                </div>
              </div>
            ) : null,
          )}

          {/* Revealed cards row - pushed further down */}
          {revealOrder.length > 0 && (
            <div className="mt-16 flex flex-wrap justify-center gap-3">
              {revealOrder.map((cardIndex) => (
                <div
                  key={`revealed-${cardIndex}`}
                  className="animate-card-reveal"
                >
                  <CardDisplay card={cards[cardIndex]} tier="prata" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* === DONE: All revealed === */}
      {phase === "done" && (
        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-3">
            {revealOrder.map((cardIndex) => (
              <div key={`final-${cardIndex}`} className="animate-card-reveal">
                <CardDisplay card={cards[cardIndex]} tier="prata" />
              </div>
            ))}
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg border border-gray-700 px-6 py-2 text-sm text-gray-400 transition-colors hover:border-gray-500 hover:text-white"
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  );
}
