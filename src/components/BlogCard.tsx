import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, Calendar, ExternalLink } from "lucide-react";
import { BlogArticle } from "@/types/learning";

interface BlogCardProps {
  article: BlogArticle;
  isCompleted: boolean;
  isLocked: boolean;
  onComplete: (articleId: string) => void;
}

export const BlogCard = ({ article, isCompleted, isLocked, onComplete }: BlogCardProps) => {
  const handleReadComplete = () => {
    if (!isCompleted && !isLocked) {
      onComplete(article.id);
    }
  };

  return (
    <Card className={`card-modern transition-all duration-300 ${
      isLocked 
        ? 'opacity-50 cursor-not-allowed' 
        : 'hover:shadow-glow cursor-pointer floating-action'
    } ${isCompleted ? 'border-success/30 bg-success/5' : ''}`}>
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <img
            src={article.featured_image}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-white/90 text-black">
              {article.category}
            </Badge>
          </div>
          {isCompleted && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-success text-white">
                ✓ Read
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-xl mb-2 line-clamp-2">
              {article.title}
            </h3>
            <p className="text-muted-foreground line-clamp-2">
              {article.excerpt}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.read_time}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(article.published_date).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              className="flex-1" 
              onClick={handleReadComplete}
              disabled={isLocked}
              variant={isCompleted ? "secondary" : "default"}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              {isCompleted ? "Read Again" : "Read Article"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};