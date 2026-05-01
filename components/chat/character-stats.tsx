"use client";

interface CharacterStats {
  campaignName?: string;
  characterName: string;
  characterClass: string;
  race?: string;
  level: number;
  hp: number;
  maxHp: number;
  ac: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  traits?: string;
  languages?: string;
  inventory?: string;
  equipment?: string;
}

interface CharacterStatsProps {
  stats?: CharacterStats;
}

export function CharacterStats({ stats }: CharacterStatsProps) {
  if (!stats) {
    return (
      <div className="w-64 border-l border-border/40 bg-sidebar p-4">
        <p className="text-sm text-muted-foreground text-center">
          Create your character to see stats
        </p>
      </div>
    );
  }

  return (
    <div className="w-96 border-l border-border/40 bg-sidebar overflow-y-auto p-4 space-y-3">
      {/* Campaign & Character Header */}
      <div className="space-y-1 pb-2 border-b border-amber-700/30">
        {stats.campaignName && (
          <p className="text-xs text-amber-100/60">📜 {stats.campaignName}</p>
        )}
        <h2 className="text-base font-bold text-amber-100">{stats.characterName}</h2>
        <p className="text-xs text-amber-100/70">
          {stats.race && `${stats.race} `}
          {stats.characterClass} · Lvl {stats.level}
        </p>
      </div>

      {/* Health Bar */}
      <div className="bg-slate-800/50 border border-amber-700/30 rounded p-2">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-xs text-amber-100 font-semibold">HP</h3>
          <span className="text-xs text-amber-100 font-bold">{stats.hp}/{stats.maxHp}</span>
        </div>
        <div className="w-full bg-slate-900 rounded-full h-4 overflow-hidden border border-amber-700/50">
          <div 
            className={`h-full ${
              stats.hp > stats.maxHp * 0.5
                ? "bg-green-600"
                : stats.hp > stats.maxHp * 0.25
                ? "bg-yellow-600"
                : "bg-red-600"
            } transition-all duration-300`}
            style={{ width: `${Math.max((stats.hp / stats.maxHp) * 100, 5)}%` }}
          />
        </div>
      </div>

      {/* AC */}
      <div className="bg-slate-800/50 border border-amber-700/30 rounded p-2">
        <div className="flex justify-between text-xs">
          <span className="text-amber-100/70">CA (Armor Class):</span>
          <span className="text-amber-100 font-bold">{stats.ac}</span>
        </div>
      </div>

      {/* Ability Scores */}
      <div className="bg-slate-800/50 border border-amber-700/30 rounded p-2">
        <h3 className="text-xs text-amber-100 font-semibold mb-2">Ability Scores</h3>
        <div className="grid grid-cols-3 gap-1">
          <div className="text-center">
            <p className="text-amber-100/60 text-xs">STR</p>
            <p className="text-amber-100 font-bold text-sm">{stats.strength}</p>
          </div>
          <div className="text-center">
            <p className="text-amber-100/60 text-xs">DEX</p>
            <p className="text-amber-100 font-bold text-sm">{stats.dexterity}</p>
          </div>
          <div className="text-center">
            <p className="text-amber-100/60 text-xs">CON</p>
            <p className="text-amber-100 font-bold text-sm">{stats.constitution}</p>
          </div>
          <div className="text-center">
            <p className="text-amber-100/60 text-xs">INT</p>
            <p className="text-amber-100 font-bold text-sm">{stats.intelligence}</p>
          </div>
          <div className="text-center">
            <p className="text-amber-100/60 text-xs">WIS</p>
            <p className="text-amber-100 font-bold text-sm">{stats.wisdom}</p>
          </div>
          <div className="text-center">
            <p className="text-amber-100/60 text-xs">CHA</p>
            <p className="text-amber-100 font-bold text-sm">{stats.charisma}</p>
          </div>
        </div>
      </div>

      {/* Equipment */}
      {stats.equipment && (
        <div className="bg-slate-800/50 border border-amber-700/30 rounded p-2">
          <h3 className="text-xs text-amber-100 font-semibold mb-1">⚔️ Equipment</h3>
          <div className="text-xs text-amber-100/80 space-y-0.5">
            {stats.equipment.split("\n").filter(item => item.trim()).map((item, idx) => (
              <div key={idx} className="flex items-start">
                <span className="text-amber-600 mr-1">•</span>
                <span className="break-words">{item.trim()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Traits */}
      {stats.traits && (
        <div className="bg-slate-800/50 border border-amber-700/30 rounded p-2">
          <h3 className="text-xs text-amber-100 font-semibold mb-1">😊 Traits</h3>
          <div className="text-xs text-amber-100/80 space-y-0.5">
            {stats.traits.split("\n").filter(item => item.trim()).map((item, idx) => (
              <div key={idx} className="flex items-start">
                <span className="text-amber-600 mr-1">•</span>
                <span className="break-words">{item.trim()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {stats.languages && (
        <div className="bg-slate-800/50 border border-amber-700/30 rounded p-2">
          <h3 className="text-xs text-amber-100 font-semibold mb-1">📖 Languages</h3>
          <div className="text-xs text-amber-100/80 space-y-0.5">
            {stats.languages.split("\n").filter(item => item.trim()).map((item, idx) => (
              <div key={idx} className="flex items-start">
                <span className="text-amber-600 mr-1">•</span>
                <span className="break-words">{item.trim()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inventory */}
      {stats.inventory && (
        <div className="bg-slate-800/50 border border-amber-700/30 rounded p-2">
          <h3 className="text-xs text-amber-100 font-semibold mb-1">🎒 Inventory</h3>
          <div className="text-xs text-amber-100/80 space-y-0.5 max-h-32 overflow-y-auto">
            {stats.inventory.split("\n").filter(item => item.trim()).map((item, idx) => (
              <div key={idx} className="flex items-start">
                <span className="text-amber-600 mr-1">•</span>
                <span className="break-words">{item.trim()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
