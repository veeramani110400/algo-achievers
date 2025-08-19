import { LearningModule, ModuleProgress } from "@/types/learning";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";
import { Trophy, Clock, CheckCircle } from "lucide-react";

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {modules.map((module) => {
        const progress = userModules[module.id];
        const isSelected = selectedModule === module.id;
        const completionRate = progress?.completedTopics.length || 0;
        
        return (
          <Card 
            key={module.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              isSelected ? 'ring-2 ring-primary shadow-lg' : ''
            }`}
            onClick={() => onModuleSelect(module.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{module.icon}</div>
                  <div>
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </div>
                </div>
                {isSelected && (
                  <CheckCircle className="h-5 w-5 text-primary" />
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  <span>{progress?.totalPoints || 0} points</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{module.totalSteps} steps</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{completionRate} topics completed</span>
                </div>
                <ProgressBar 
                  progress={completionRate > 0 ? (completionRate / 10) * 100 : 0} 
                  size="sm" 
                />
              </div>
              
              <Button 
                variant={isSelected ? "default" : "outline"} 
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onModuleSelect(module.id);
                }}
              >
                {isSelected ? "Continue Learning" : "Start Learning"}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};