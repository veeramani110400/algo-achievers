import { Trophy, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface XPIndicatorProps {
  currentXp: number;
  level: string;
  nextLevelXp?: number;
  className?: string;
}

export const XPIndicator = ({ currentXp, level, nextLevelXp = 500, className }: XPIndicatorProps) => {
  const progress = (currentXp / nextLevelXp) * 100;
  
  return (
    <div className={cn("bg-gradient-card p-4 rounded-lg border border-border shadow-card", className)}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <Trophy className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{level}</p>
            <p className="text-xs text-muted-foreground">Level</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Zap className="w-4 h-4 text-xp-primary" />
          <span className="text-lg font-bold text-foreground">{currentXp}</span>
          <span className="text-sm text-muted-foreground">XP</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Next Level</span>
          <span className="text-foreground">{nextLevelXp - currentXp} XP to go</span>
        </div>
        <div className="w-full bg-progress-bg rounded-full h-2">
          <div
            className="bg-gradient-primary h-2 rounded-full transition-all duration-500 ease-out shadow-glow"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      </div>
    </div>
  );
};