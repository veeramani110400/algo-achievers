import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogStep } from "@/types/learning";
import { FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogStepOverviewProps {
  steps: BlogStep[];
  completedTopics: string[];
  currentStep: number;
  onStepSelect: (step: number) => void;
}

export const BlogStepOverview = ({ 
  steps, 
  completedTopics, 
  currentStep, 
  onStepSelect 
}: BlogStepOverviewProps) => {
  return (
    <Card className="card-modern">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary/20 rounded-xl">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          Blog Categories
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((step) => {
          const completedInStep = step.articles.filter(article => 
            completedTopics.includes(article.id)
          ).length;
          
          const totalInStep = step.articles.length;
          const isActive = currentStep === step.step_no;
          const isCompleted = completedInStep === totalInStep;
          const progressPercentage = totalInStep > 0 ? (completedInStep / totalInStep) * 100 : 0;

          return (
            <Button
              key={step.step_no}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start h-auto p-4 ${
                isActive ? 'ring-2 ring-primary/20' : ''
              }`}
              onClick={() => onStepSelect(step.step_no)}
            >
              <div className="flex items-start gap-3 w-full">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  isCompleted 
                    ? 'bg-success text-white' 
                    : isActive 
                      ? 'bg-primary text-white' 
                      : 'bg-muted text-muted-foreground'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    step.step_no
                  )}
                </div>
                
                <div className="flex-1 text-left space-y-2">
                  <div>
                    <h3 className="font-semibold text-sm">{step.topic}</h3>
                    <p className="text-xs text-muted-foreground">
                      {completedInStep} of {totalInStep} articles read
                    </p>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-primary h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Badge variant={isCompleted ? "default" : "secondary"} className="text-xs">
                    {Math.round(progressPercentage)}%
                  </Badge>
                </div>
              </div>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};