import { LearningModule, ModuleProgress } from "@/types/learning";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";
import { Trophy, Clock, CheckCircle, ArrowRight, Star, Zap } from "lucide-react";

interface ModuleSelectorProps {
  modules: LearningModule[];
  userModules: Record<string, ModuleProgress>;
  selectedModule: string;
  onModuleSelect: (moduleId: string) => void;
}

export const ModuleSelector = ({ 
  modules, 
  userModules, 
  selectedModule, 
  onModuleSelect 
}: ModuleSelectorProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {modules.map((module, index) => {
        const progress = userModules[module.id];
        const isSelected = selectedModule === module.id;
        const completionRate = progress?.completedTopics.length || 0;
        
        return (
          <Card 
            key={module.id}
            className={`group cursor-pointer transition-all duration-500 hover:shadow-elevated border-2 ${
              isSelected 
                ? 'border-primary shadow-glow bg-gradient-to-br from-primary/5 to-accent/5' 
                : 'border-border/50 hover:border-primary/50 bg-gradient-card'
            } animate-bounce-in`}
            style={{ animationDelay: `${index * 0.2}s` }}
            onClick={() => onModuleSelect(module.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`relative p-4 rounded-2xl transition-all duration-300 ${
                    isSelected 
                      ? 'bg-gradient-primary shadow-glow transform scale-110' 
                      : 'bg-gradient-secondary/20 group-hover:bg-gradient-primary/20'
                  }`}>
                    <span className="text-3xl">{module.icon}</span>
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 h-3 w-3 bg-success rounded-full animate-glow"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold gradient-text mb-2 group-hover:text-primary transition-colors">
                      {module.name}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {module.description}
                    </CardDescription>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  {isSelected && (
                    <div className="flex items-center gap-1 bg-success/20 px-2 py-1 rounded-full">
                      <CheckCircle className="h-3 w-3 text-success" />
                      <span className="text-xs font-medium text-success">Active</span>
                    </div>
                  )}
                  {completionRate > 0 && (
                    <div className="flex items-center gap-1 bg-warning/20 px-2 py-1 rounded-full">
                      <Star className="h-3 w-3 text-warning" />
                      <span className="text-xs font-medium text-warning">In Progress</span>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gradient-secondary/10 rounded-xl">
                  <div className="p-2 bg-xp-primary/20 rounded-lg">
                    <Trophy className="h-4 w-4 text-xp-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{progress?.totalPoints || 0}</div>
                    <div className="text-xs text-muted-foreground">XP Points</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-info/10 rounded-xl">
                  <div className="p-2 bg-info/20 rounded-lg">
                    <Clock className="h-4 w-4 text-info" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{module.totalSteps}</div>
                    <div className="text-xs text-muted-foreground">Chapters</div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Progress */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Learning Progress</span>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-xp-primary" />
                    <span className="text-sm font-semibold text-xp-primary">
                      {completionRate} topics
                    </span>
                  </div>
                </div>
                <ProgressBar 
                  progress={completionRate > 0 ? Math.min((completionRate / 10) * 100, 100) : 0} 
                  size="md"
                  variant={completionRate > 5 ? "success" : "default"}
                />
              </div>
              
              {/* Enhanced CTA Button */}
              <Button 
                variant={isSelected ? "default" : "outline"} 
                size="lg"
                className={`w-full h-12 text-base font-semibold transition-all duration-300 ${
                  isSelected 
                    ? 'btn-interactive bg-gradient-primary hover:shadow-glow' 
                    : 'hover:bg-primary hover:text-white border-2 hover:border-primary'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onModuleSelect(module.id);
                }}
              >
                <span className="flex items-center gap-2">
                  {isSelected ? "Continue Learning" : "Start Learning"}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};