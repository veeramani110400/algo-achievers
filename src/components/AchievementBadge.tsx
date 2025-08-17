import { cn } from "@/lib/utils";
import { Achievement } from "@/types/learning";

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: "sm" | "md" | "lg";
  showDetails?: boolean;
}

export const AchievementBadge = ({ 
  achievement, 
  size = "md", 
  showDetails = false 
}: AchievementBadgeProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-lg",
    md: "w-12 h-12 text-xl", 
    lg: "w-16 h-16 text-3xl"
  };

  return (
    <div className={cn(
      "group relative",
      showDetails && "p-4 bg-gradient-card rounded-lg border border-border shadow-card"
    )}>
      <div className={cn(
        "rounded-full border-2 flex items-center justify-center transition-all duration-300",
        sizeClasses[size],
        achievement.earned 
          ? "bg-achievement-gold border-achievement-gold shadow-glow animate-bounce-in" 
          : "bg-muted border-muted-foreground opacity-50"
      )}>
        <span className="filter drop-shadow-sm">
          {achievement.badgeIcon}
        </span>
      </div>
      
      {showDetails && (
        <div className="mt-3">
          <h4 className="text-sm font-semibold text-foreground">{achievement.name}</h4>
          <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
          <div className="flex items-center justify-between mt-2">
            <span className={cn(
              "text-xs px-2 py-1 rounded-full",
              achievement.earned 
                ? "bg-success text-success-foreground" 
                : "bg-muted text-muted-foreground"
            )}>
              {achievement.earned ? "Earned" : "Locked"}
            </span>
            <span className="text-xs text-xp-primary font-medium">
              +{achievement.pointsReward} XP
            </span>
          </div>
        </div>
      )}
      
      {!showDetails && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <div className="bg-popover border border-border rounded-lg p-3 shadow-card min-w-48">
            <h4 className="text-sm font-semibold text-foreground">{achievement.name}</h4>
            <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
            <p className="text-xs text-xp-primary font-medium mt-2">+{achievement.pointsReward} XP</p>
          </div>
        </div>
      )}
    </div>
  );
};