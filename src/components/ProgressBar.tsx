import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "xp";
  animated?: boolean;
}

export const ProgressBar = ({ 
  progress, 
  showLabel = true, 
  size = "md", 
  variant = "default",
  animated = true 
}: ProgressBarProps) => {
  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  };

  const variantClasses = {
    default: "bg-progress-fill",
    success: "bg-gradient-success",
    xp: "bg-gradient-primary"
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-foreground font-medium">{Math.round(progress)}%</span>
        </div>
      )}
      <div className={cn(
        "w-full bg-progress-bg rounded-full overflow-hidden",
        sizeClasses[size]
      )}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            variantClasses[variant],
            animated && "animate-pulse-slow"
          )}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
};