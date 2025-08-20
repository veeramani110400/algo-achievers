import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle, Clock } from "lucide-react";
import { CoreSubjectsStep } from "@/types/learning";

interface CoreSubjectsStepOverviewProps {
  steps: CoreSubjectsStep[];
  completedTopics: string[];
  currentStep: number;
  onStepSelect: (stepNo: number) => void;
}

export const CoreSubjectsStepOverview = ({
  steps,
  completedTopics,
  currentStep,
  onStepSelect
}: CoreSubjectsStepOverviewProps) => {
  return (
    <Card className="card-modern h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary/20 rounded-xl">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          Core Subjects Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((step) => {
          const stepCompletedCount = step.data.filter(topic => 
            completedTopics.includes(topic.id)
          ).length;
          const totalTopics = step.data.length;
          const isCompleted = stepCompletedCount === totalTopics;
          const isActive = step.step_no === currentStep;
          
          return (
            <div
              key={step.step_no}
              onClick={() => onStepSelect(step.step_no)}
              className={`
                p-4 rounded-2xl border transition-all duration-300 cursor-pointer group
                ${isActive 
                  ? 'bg-gradient-primary/10 border-primary shadow-glow' 
                  : 'bg-card hover:bg-primary/5 border-border hover:border-primary/30'
                }
              `}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300
                      ${isCompleted 
                        ? 'bg-success text-white' 
                        : isActive 
                          ? 'bg-primary text-white' 
                          : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'
                      }
                    `}>
                      {isCompleted ? <CheckCircle className="h-4 w-4" /> : step.step_no}
                    </div>
                    <h3 className={`
                      font-semibold transition-colors
                      ${isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'}
                    `}>
                      {step.topic}
                    </h3>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {stepCompletedCount}/{totalTopics} topics
                      </span>
                    </div>
                    
                    <Badge 
                      variant={isCompleted ? "default" : "secondary"} 
                      className={`
                        text-xs transition-all duration-300
                        ${isCompleted ? 'bg-success/10 text-success border-success/20' : ''}
                      `}
                    >
                      {isCompleted ? 'Complete' : 'In Progress'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};