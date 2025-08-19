import { SystemDesignTopic } from "@/types/learning";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Play, FileText, CheckCircle, Lock } from "lucide-react";

interface SystemDesignTopicCardProps {
  topic: SystemDesignTopic;
  isCompleted: boolean;
  isLocked: boolean;
  onComplete?: (topicId: string) => void;
}

export const SystemDesignTopicCard = ({ 
  topic, 
  isCompleted, 
  isLocked, 
  onComplete 
}: SystemDesignTopicCardProps) => {
  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${
      isCompleted ? 'bg-success/5 border-success/20' : 
      isLocked ? 'bg-muted/50 opacity-60' : ''
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                #{topic.sl_no_in_step}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {topic.head_step_no}
              </Badge>
            </div>
            <CardTitle className="text-base leading-tight">
              {topic.title}
            </CardTitle>
          </div>
          
          {isCompleted && (
            <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-1" />
          )}
          {isLocked && (
            <Lock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {topic.yt_link && (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 text-xs"
              disabled={isLocked}
              asChild={!isLocked}
            >
              {isLocked ? (
                <>
                  <Play className="h-3 w-3 mr-1" />
                  Video
                </>
              ) : (
                <a href={topic.yt_link} target="_blank" rel="noopener noreferrer">
                  <Play className="h-3 w-3 mr-1" />
                  Video
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              )}
            </Button>
          )}
          
          {topic.post_link && (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 text-xs"
              disabled={isLocked}
              asChild={!isLocked}
            >
              {isLocked ? (
                <>
                  <FileText className="h-3 w-3 mr-1" />
                  Article
                </>
              ) : (
                <a href={topic.post_link} target="_blank" rel="noopener noreferrer">
                  <FileText className="h-3 w-3 mr-1" />
                  Article
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              )}
            </Button>
          )}
        </div>
        
        <Button
          onClick={() => onComplete?.(topic.id)}
          disabled={isCompleted || isLocked}
          variant={isCompleted ? "outline" : "default"}
          className="w-full"
          size="sm"
        >
          {isCompleted ? "Completed" : "Mark Complete"}
        </Button>
      </CardContent>
    </Card>
  );
};