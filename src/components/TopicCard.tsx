import { ExternalLink, Play, FileText, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DSATopic } from "@/types/learning";

interface TopicCardProps {
  topic: DSATopic;
  isCompleted?: boolean;
  isLocked?: boolean;
  onComplete?: (topicId: string) => void;
}

export const TopicCard = ({ topic, isCompleted = false, isLocked = false, onComplete }: TopicCardProps) => {
  const difficultyColors = {
    0: "bg-success text-success-foreground",
    1: "bg-warning text-warning-foreground", 
    2: "bg-destructive text-destructive-foreground"
  };

  const difficultyLabels = {
    0: "Easy",
    1: "Medium",
    2: "Hard"
  };

  const handleComplete = () => {
    if (!isCompleted && !isLocked && onComplete) {
      onComplete(topic.id);
    }
  };

  return (
    <div className={cn(
      "group bg-gradient-card border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-card",
      isCompleted && "border-success shadow-success",
      isLocked && "opacity-60"
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
              {topic.question_title}
            </h3>
            {isCompleted && (
              <CheckCircle2 className="w-5 h-5 text-success animate-bounce-in" />
            )}
            {isLocked && (
              <Lock className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-3">{topic.sub_step_title}</p>
          
          <div className="flex items-center gap-2 mb-4">
            <Badge className={cn("text-xs", difficultyColors[topic.difficulty as keyof typeof difficultyColors])}>
              {difficultyLabels[topic.difficulty as keyof typeof difficultyLabels]}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Step {topic.step_no}.{topic.sub_step_no}
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {topic.yt_link && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              disabled={isLocked}
              asChild
            >
              <a href={topic.yt_link} target="_blank" rel="noopener noreferrer">
                <Play className="w-3 h-3 mr-1" />
                Video
              </a>
            </Button>
          )}
          {topic.post_link && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              disabled={isLocked}
              asChild
            >
              <a href={topic.post_link} target="_blank" rel="noopener noreferrer">
                <FileText className="w-3 h-3 mr-1" />
                Article
              </a>
            </Button>
          )}
          {topic.plus_link && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              disabled={isLocked}
              asChild
            >
              <a href={topic.plus_link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 mr-1" />
                Practice
              </a>
            </Button>
          )}
        </div>

        <Button 
          onClick={handleComplete}
          disabled={isCompleted || isLocked}
          className={cn(
            "w-full transition-all duration-300",
            isCompleted 
              ? "bg-success hover:bg-success text-success-foreground" 
              : "bg-gradient-primary hover:shadow-glow"
          )}
        >
          {isCompleted ? "Completed ✓" : isLocked ? "Locked" : "Mark Complete"}
        </Button>
      </div>
    </div>
  );
};