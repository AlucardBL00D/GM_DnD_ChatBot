import { useEffect, useState } from "react";

export interface CharacterStatsData {
  campaignName: string;
  characterName: string;
  characterClass: string;
  race: string;
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
  traits: string;
  languages: string;
  inventory: string;
  equipment: string;
}

export function useCharacterStats() {
  const [stats, setStats] = useState<CharacterStatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadStats = () => {
    try {
      const saved = localStorage.getItem("characterStats");
      if (saved) {
        const parsed = JSON.parse(saved);
        setStats(parsed);
      } else {
        setStats(null);
      }
    } catch (error) {
      console.error("Failed to parse character stats from localStorage:", error);
      setStats(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Load on mount
    loadStats();

    // Listen for storage changes (from other tabs or same tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "characterStats") {
        loadStats();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Also listen for custom event from same page
    const handleCustomUpdate = () => {
      loadStats();
    };
    window.addEventListener("characterStatsUpdated", handleCustomUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("characterStatsUpdated", handleCustomUpdate);
    };
  }, []);

  return { stats, isLoading };
}
