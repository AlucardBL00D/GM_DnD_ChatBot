"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { AccountNav } from "@/components/chat/account-nav";
import { CharacterCreationDialog } from "@/components/chat/character-creation-dialog";

export default function HomePage() {
  const { data: session } = useSession();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-amber-700/20 bg-slate-900/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:opacity-75 transition">
            <span className="text-2xl">⚔️</span>
            <span className="hidden sm:inline text-amber-100">D&D Master AI</span>
          </Link>
          
          <AccountNav session={session} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 to-transparent"></div>
          
          <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-32">
          <div className="text-center space-y-6">
            <h1 className="text-5xl sm:text-6xl font-bold">
              <span className="text-amber-100">⚔️ D&D Game Master</span>
            </h1>
            <p className="text-xl sm:text-2xl text-amber-200/80">
              Experience epic fantasy adventures powered by AI and the world's most loved tabletop game
            </p>
            <p className="text-amber-200/60 max-w-2xl mx-auto">
              The Game Master is ready to craft immersive worlds, manage encounters, and bring your D&D stories to life with intelligent responses and adherence to 5th Edition rules.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-amber-100 mb-12">What You Get</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Feature 1 */}
          <div className="bg-slate-800/50 border border-amber-700/30 rounded-lg p-6 space-y-3 hover:border-amber-700/60 transition">
            <div className="text-3xl">🎭</div>
            <h3 className="font-bold text-amber-100">Intelligent Game Master</h3>
            <p className="text-amber-100/70 text-sm">
              An AI trained on D&D 5e mechanics that understands player agency, creates tension, and describes immersive scenes.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-800/50 border border-amber-700/30 rounded-lg p-6 space-y-3 hover:border-amber-700/60 transition">
            <div className="text-3xl">🎲</div>
            <h3 className="font-bold text-amber-100">Transparent Dice Rolling</h3>
            <p className="text-amber-100/70 text-sm">
              All rolls are shown (2d10+3, Attack: 18, etc). No hidden mechanics - true tabletop fairness.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-800/50 border border-amber-700/30 rounded-lg p-6 space-y-3 hover:border-amber-700/60 transition">
            <div className="text-3xl">📚</div>
            <h3 className="font-bold text-amber-100">Rulebook References</h3>
            <p className="text-amber-100/70 text-sm">
              Upload your Player's Handbook, Monster Manual, and campaign guides. The Game Master references them for accuracy.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-slate-800/50 border border-amber-700/30 rounded-lg p-6 space-y-3 hover:border-amber-700/60 transition">
            <div className="text-3xl">👥</div>
            <h3 className="font-bold text-amber-100">Rich NPCs</h3>
            <p className="text-amber-100/70 text-sm">
              Every NPC has personality, motivations, and unique dialogue. They evolve based on player interactions.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-slate-800/50 border border-amber-700/30 rounded-lg p-6 space-y-3 hover:border-amber-700/60 transition">
            <div className="text-3xl">🌍</div>
            <h3 className="font-bold text-amber-100">Dynamic World</h3>
            <p className="text-amber-100/70 text-sm">
              Your choices matter. The world remembers NPC deaths, destroyed buildings, and legendary accomplishments.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-slate-800/50 border border-amber-700/30 rounded-lg p-6 space-y-3 hover:border-amber-700/60 transition">
            <div className="text-3xl">⚡</div>
            <h3 className="font-bold text-amber-100">Balanced Encounters</h3>
            <p className="text-amber-100/70 text-sm">
              Combat challenges are tailored to your party's abilities, ensuring epic battles without cheap shots.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-amber-100 mb-12">How It Works</h2>
        
        <div className="space-y-4">
          {[
            { step: "1", title: "Create Your Character", desc: "Start at the Campaign page to set up your character with a name, class, and hit points." },
            { step: "2", title: "Enter the Chat", desc: "Describe what your character does. The Game Master will narrate the world and present choices." },
            { step: "3", title: "Dice Determine Fate", desc: "When outcomes are uncertain, the Game Master rolls the dice. Attacks, saves, and checks are transparent." },
            { step: "4", title: "The World Reacts", desc: "NPCs respond to your actions with personality and consequence. The story evolves based on your choices." },
            { step: "5", title: "Epic Tales Unfold", desc: "Over multiple sessions, your character's legend grows. Adventures end, campaigns conclude, legends are born." },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-amber-600 text-amber-50 font-bold text-lg">
                  {item.step}
                </div>
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-bold text-amber-100">{item.title}</h3>
                <p className="text-amber-100/70 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-700/50 rounded-lg p-8 text-center space-y-6">
          <h2 className="text-2xl font-bold text-amber-100">Ready for Adventure?</h2>
          <p className="text-amber-100/80">
            Set up your character and step into a world of infinite possibilities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CharacterCreationDialog session={session} />
            {session?.user?.type === "regular" && (
              <Link
                href="/chat"
                className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-bold text-amber-100 border border-slate-600 transition transform hover:scale-105 h-11"
              >
                💬 Go to Chat
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700 mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-amber-100/60 text-sm space-y-2">
          <p>
            Built with Next.js, Claude AI, and a passion for storytelling.
          </p>
          <p>
            Adheres to D&D 5th Edition rules. Your rulebooks power accurate gameplay.
          </p>
        </div>
      </div>
      </main>
    </div>
  );
}
