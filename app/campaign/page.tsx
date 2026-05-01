"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function CampaignPage() {
  const [campaignName, setCampaignName] = useState("My D&D Campaign");
  const [characterName, setCharacterName] = useState("Unnamed Adventurer");
  const [characterClass, setCharacterClass] = useState("Fighter");
  const [characterRace, setCharacterRace] = useState("Human");
  const [level, setLevel] = useState(1);
  const [hp, setHp] = useState(25);
  const [maxHp, setMaxHp] = useState(25);
  const [ac, setAc] = useState(10);
  const [strength, setStrength] = useState(15);
  const [dexterity, setDexterity] = useState(10);
  const [constitution, setConstitution] = useState(14);
  const [intelligence, setIntelligence] = useState(8);
  const [wisdom, setWisdom] = useState(13);
  const [charisma, setCharisma] = useState(11);
  const [traits, setTraits] = useState("Brave\nLoyalty");
  const [languages, setLanguages] = useState("Common");
  const [inventory, setInventory] = useState("10m Rope\nTorch x5\nGold x50");
  const [equipment, setEquipment] = useState("Long Sword\nPlate Armor");

  // Sauvegarder les stats dans localStorage quand elles changent
  useEffect(() => {
    const characterStats = {
      campaignName,
      characterName,
      characterClass,
      race: characterRace,
      level,
      hp,
      maxHp,
      ac,
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
      traits,
      languages,
      inventory,
      equipment
    };
    localStorage.setItem("characterStats", JSON.stringify(characterStats));
    
    // Dispatch custom event so hook in other components listens
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("characterStatsUpdated"));
    }
  }, [campaignName, characterName, characterClass, characterRace, level, hp, maxHp, ac, strength, dexterity, constitution, intelligence, wisdom, charisma, traits, languages, inventory, equipment]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-amber-100">⚔️ D&D Campaign Master</h1>
          <p className="text-amber-200/60">An immersive AI-powered tabletop experience</p>
        </div>

        {/* Campaign Info Card */}
        <div className="bg-slate-800/50 border border-amber-700/30 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-amber-100">📜 Campaign</h2>
          <div className="space-y-2">
            <label className="block text-amber-200">Campaign Name</label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="w-full bg-slate-900 border border-amber-700/50 rounded px-4 py-2 text-amber-100"
            />
          </div>
        </div>

        {/* Character Card */}
        <div className="bg-slate-800/50 border border-amber-700/30 rounded-lg p-6 space-y-6">
          <h2 className="text-2xl font-bold text-amber-100">🧙 Character Sheet</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-amber-200">Character Name</label>
              <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                className="w-full bg-slate-900 border border-amber-700/50 rounded px-4 py-2 text-amber-100"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-amber-200">Class</label>
              <select
                value={characterClass}
                onChange={(e) => setCharacterClass(e.target.value)}
                className="w-full bg-slate-900 border border-amber-700/50 rounded px-4 py-2 text-amber-100"
              >
                <option>Barbarian</option>
                <option>Bard</option>
                <option>Cleric</option>
                <option>Druid</option>
                <option>Fighter</option>
                <option>Monk</option>
                <option>Paladin</option>
                <option>Ranger</option>
                <option>Rogue</option>
                <option>Sorcerer</option>
                <option>Warlock</option>
                <option>Wizard</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-amber-200">Race</label>
              <select
                value={characterRace}
                onChange={(e) => setCharacterRace(e.target.value)}
                className="w-full bg-slate-900 border border-amber-700/50 rounded px-4 py-2 text-amber-100"
              >
                <option>Human</option>
                <option>Elf</option>
                <option>Dwarf</option>
                <option>Halfling</option>
                <option>Dragonborn</option>
                <option>Gnome</option>
                <option>Half-Elf</option>
                <option>Half-Orc</option>
                <option>Tiefling</option>
              </select>
            </div>
          </div>

          {/* HP Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-amber-200">Hit Points</label>
              <span className="text-amber-100 font-mono">{hp} / {maxHp}</span>
            </div>
            <div className="w-full bg-slate-900 border border-amber-700/50 rounded-full h-8 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 flex items-center justify-center text-sm font-bold ${
                  hp > maxHp * 0.5
                    ? "bg-green-600"
                    : hp > maxHp * 0.25
                    ? "bg-yellow-600"
                    : "bg-red-600"
                }`}
                style={{ width: `${(hp / maxHp) * 100}%` }}
              >
                {hp > maxHp * 0.3 && <span className="text-white">{hp}</span>}
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <label className="text-amber-200 text-sm">Current HP</label>
              <input
                type="number"
                value={hp}
                onChange={(e) => setHp(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-amber-700/50 rounded px-4 py-2 text-amber-100"
              />
            </div>

            <div className="space-y-1 pt-2">
              <label className="text-amber-200 text-sm">Max HP</label>
              <input
                type="number"
                value={maxHp}
                onChange={(e) => setMaxHp(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-900 border border-amber-700/50 rounded px-4 py-2 text-amber-100"
              />
            </div>
          </div>

          {/* Inventory */}
          <div className="space-y-2">
            <label className="text-amber-200">Inventory</label>
            <textarea
              value={inventory}
              onChange={(e) => setInventory(e.target.value)}
              placeholder="10m Rope
Torch x5
Gold x50"
              className="w-full bg-slate-900 border border-amber-700/50 rounded px-4 py-2 text-amber-100 h-24 font-mono text-sm"
            />
            <p className="text-amber-100/60 text-xs">One item per line (e.g.: "Torch x5", "10m Rope")</p>
          </div>

          {/* Equipment */}
          <div className="space-y-2">
            <label className="text-amber-200">Equipment</label>
            <textarea
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              placeholder="Long Sword
Plate Armor"
              className="w-full bg-slate-900 border border-amber-700/50 rounded px-4 py-2 text-amber-100 h-20 font-mono text-sm"
            />
            <p className="text-amber-100/60 text-xs">Equipped items (one per line)</p>
          </div>

          {/* Level & AC */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-amber-200">Level</label>
              <input
                type="number"
                min="1"
                max="20"
                value={level}
                onChange={(e) => setLevel(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-900 border border-amber-700/50 rounded px-4 py-2 text-amber-100"
              />
            </div>
            <div className="space-y-2">
              <label className="text-amber-200">AC (Armor Class)</label>
              <input
                type="number"
                value={ac}
                onChange={(e) => setAc(parseInt(e.target.value) || 10)}
                className="w-full bg-slate-900 border border-amber-700/50 rounded px-4 py-2 text-amber-100"
              />
            </div>
          </div>

          {/* Ability Scores */}
          <div className="space-y-3">
            <h3 className="text-amber-200 font-semibold">Ability Scores</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-amber-200 text-sm">STR (Force)</label>
                <input
                  type="number"
                  min="3"
                  max="20"
                  value={strength}
                  onChange={(e) => setStrength(parseInt(e.target.value) || 3)}
                  className="w-full bg-slate-900 border border-amber-700/50 rounded px-2 py-1 text-amber-100 text-center"
                />
              </div>
              <div className="space-y-1">
                <label className="text-amber-200 text-sm">DEX (Dextérité)</label>
                <input
                  type="number"
                  min="3"
                  max="20"
                  value={dexterity}
                  onChange={(e) => setDexterity(parseInt(e.target.value) || 3)}
                  className="w-full bg-slate-900 border border-amber-700/50 rounded px-2 py-1 text-amber-100 text-center"
                />
              </div>
              <div className="space-y-1">
                <label className="text-amber-200 text-sm">CON (Constitution)</label>
                <input
                  type="number"
                  min="3"
                  max="20"
                  value={constitution}
                  onChange={(e) => setConstitution(parseInt(e.target.value) || 3)}
                  className="w-full bg-slate-900 border border-amber-700/50 rounded px-2 py-1 text-amber-100 text-center"
                />
              </div>
              <div className="space-y-1">
                <label className="text-amber-200 text-sm">INT (Intelligence)</label>
                <input
                  type="number"
                  min="3"
                  max="20"
                  value={intelligence}
                  onChange={(e) => setIntelligence(parseInt(e.target.value) || 3)}
                  className="w-full bg-slate-900 border border-amber-700/50 rounded px-2 py-1 text-amber-100 text-center"
                />
              </div>
              <div className="space-y-1">
                <label className="text-amber-200 text-sm">WIS (Wisdom)</label>
                <input
                  type="number"
                  min="3"
                  max="20"
                  value={wisdom}
                  onChange={(e) => setWisdom(parseInt(e.target.value) || 3)}
                  className="w-full bg-slate-900 border border-amber-700/50 rounded px-2 py-1 text-amber-100 text-center"
                />
              </div>
              <div className="space-y-1">
                <label className="text-amber-200 text-sm">CHA (Charisma)</label>
                <input
                  type="number"
                  min="3"
                  max="20"
                  value={charisma}
                  onChange={(e) => setCharisma(parseInt(e.target.value) || 3)}
                  className="w-full bg-slate-900 border border-amber-700/50 rounded px-2 py-1 text-amber-100 text-center"
                />
              </div>
            </div>
          </div>

          {/* Traits and Languages */}
          <div className="space-y-3">
            <h3 className="text-amber-200 font-semibold">Personality & Communication</h3>
            <div className="space-y-2">
              <label className="text-amber-200">Traits</label>
              <textarea
                value={traits}
                onChange={(e) => setTraits(e.target.value)}
                placeholder="Brave
Loyalty"
                className="w-full bg-slate-900 border border-amber-700/50 rounded px-4 py-2 text-amber-100 h-20 font-mono text-sm"
              />
              <p className="text-amber-100/60 text-xs">One trait per line (ex: "Brave", "Loyal")</p>
            </div>

            <div className="space-y-2">
              <label className="text-amber-200">Languages</label>
              <textarea
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                placeholder="Common"
                className="w-full bg-slate-900 border border-amber-700/50 rounded px-4 py-2 text-amber-100 h-16 font-mono text-sm"
              />
              <p className="text-amber-100/60 text-xs">Languages known (one per line)</p>
            </div>
          </div>
        </div>

        {/* How to Play */}
        <div className="bg-slate-800/50 border border-amber-700/30 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-amber-100">📖 How to Play</h2>
          <div className="space-y-3 text-amber-100/80 text-sm">
            <p>
              <strong>1. Go to Chat:</strong> Start a conversation in the chat interface. Describe what your character does.
            </p>
            <p>
              <strong>2. Game Master Responds:</strong> The AI Game Master describes the world, encounters, and consequences.
            </p>
            <p>
              <strong>3. Roll Dice:</strong> When needed, the Game Master will roll dice using notation like <code className="bg-slate-900 px-2 py-1 rounded">1d20+5</code>
            </p>
            <p>
              <strong>4. Consult Rules:</strong> The AI can search your D&D rulebooks for mechanics, monsters, and spells.
            </p>
            <p>
              <strong>5. Track State:</strong> Character inventory, HP, conditions, and world changes are remembered throughout the campaign.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800/50 border border-amber-700/30 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-amber-100">⚡ Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={() => setHp(Math.max(0, hp - 5))}
              className="bg-red-600/50 hover:bg-red-600 border border-red-700 rounded px-4 py-2 text-amber-100 font-semibold transition"
            >
              Take 5 Damage
            </button>
            <button
              onClick={() => setHp(Math.min(maxHp, hp + 5))}
              className="bg-green-600/50 hover:bg-green-600 border border-green-700 rounded px-4 py-2 text-amber-100 font-semibold transition"
            >
              Heal 5 HP
            </button>
            <button
              onClick={() => setHp(maxHp)}
              className="bg-blue-600/50 hover:bg-blue-600 border border-blue-700 rounded px-4 py-2 text-amber-100 font-semibold transition"
            >
              Full Heal
            </button>
            <button
              onClick={() => setHp(0)}
              className="bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded px-4 py-2 text-amber-100 font-semibold transition"
            >
              Unconscious
            </button>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
          <p className="text-amber-100 text-sm">
            💡 <strong>Tip:</strong> Upload your D&D 5e rulebooks, monster manuals, and campaign setting documents at /documents.
            The Game Master will reference them to ensure accurate gameplay!
          </p>
        </div>

        {/* Start Game Button */}
        <div className="text-center">
          <a
            href="/chat"
            className="inline-block bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 px-8 py-3 rounded-lg font-bold text-amber-50 transition transform hover:scale-105"
          >
            🎲 Start Campaign
          </a>
        </div>
      </div>
    </div>
  );
}
