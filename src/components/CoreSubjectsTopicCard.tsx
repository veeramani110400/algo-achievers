import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Play, BookOpen, Lock, ExternalLink } from "lucide-react";
import { CoreSubjectsTopic } from "@/types/learning";

interface CoreSubjectsTopicCardProps {
  topic: CoreSubjectsTopic;
  isCompleted: boolean;
  isLocked: boolean;
  onComplete: (topicId: string) => void;
}

export const CoreSubjectsTopicCard = ({ 
  topic, 
  isCompleted, 
  isLocked, 
  onComplete 
}: CoreSubjectsTopicCardProps) => {
  const handleComplete = () => {
    if (!isLocked && !isCompleted) {
      onComplete(topic.id);
    }
  };

  return (
    <Card className={`
      card-modern transition-all duration-300 hover:scale-[1.02] group
      ${isCompleted ? 'ring-2 ring-success/50 bg-success/5' : ''}
      ${isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-glow'}
    `}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <div className={`
              flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300
              ${isCompleted 
                ? 'bg-success text-white shadow-success' 
                : isLocked 
                  ? 'bg-muted text-muted-foreground' 
                  : 'bg-gradient-primary text-white shadow-glow group-hover:scale-110'
              }
            `}>
              {isCompleted ? (
                <CheckCircle className="h-6 w-6" />
              ) : isLocked ? (
                <Lock className="h-5 w-5" />
              ) : (
                <BookOpen className="h-5 w-5" />
              )}
            </div>
            
            <div className="space-y-2 flex-1">
              <h3 className={`
                font-semibold text-lg leading-tight transition-colors
                ${isCompleted ? 'text-success' : 'text-foreground group-hover:text-primary'}
              `}>
                {topic.title}
              </h3>
              
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs font-medium">
                  Topic {topic.sl_no_in_step}
                </Badge>
                {isCompleted && (
                  <Badge variant="default" className="text-xs bg-success/10 text-success border-success/20">
                    Completed
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {topic.yt_link && (
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-primary/10 border-primary/20"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(topic.yt_link, '_blank');
                }}
                disabled={isLocked}
              >
                <Play className="h-4 w-4 mr-2" />
                Video
              </Button>
            )}
            
            {topic.article_link && (
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-primary/10 border-primary/20"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(topic.article_link, '_blank');
                }}
                disabled={isLocked}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Article
              </Button>
            )}
          </div>
          
          {!isCompleted && !isLocked && (
            <Button
              onClick={handleComplete}
              className="bg-gradient-primary hover:bg-gradient-primary/90 text-white shadow-glow hover:shadow-glow-lg transition-all duration-300"
            >
              Mark Complete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};