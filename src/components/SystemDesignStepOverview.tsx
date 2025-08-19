import { SystemDesignStep } from "@/types/learning";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ProgressBar";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, TrendingUp } from "lucide-react";

interface SystemDesignStepOverviewProps {
  steps: SystemDesignStep[];
  completedTopics: string[];
  currentStep: number;
  onStepSelect?: (stepNo: number) => void;
}

export const SystemDesignStepOverview = ({ 
  steps, 
  completedTopics, 
  currentStep,
  onStepSelect 
}: SystemDesignStepOverviewProps) => {
  const totalTopics = steps.reduce((sum, step) => sum + step.topics.length, 0);
  const completedCount = completedTopics.length;
  const overallProgress = totalTopics > 0 ? (completedCount / totalTopics) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Overall Progress Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            System Design Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{overallProgress.toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{steps.length}</div>
              <div className="text-sm text-muted-foreground">Steps</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{completedCount}/{totalTopics}</div>
              <div className="text-sm text-muted-foreground">Topics</div>
            </div>
          </div>
          
          <ProgressBar progress={overallProgress} size="lg" variant="success" />
        </CardContent>
      </Card>

      {/* Step Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Learning Steps
        </h3>
        
        <div className="space-y-3">
          {steps.map((step) => {
            const stepCompletedTopics = step.topics.filter(topic => 
              completedTopics.includes(topic.id)
            ).length;
            const stepProgress = step.topics.length > 0 ? 
              (stepCompletedTopics / step.topics.length) * 100 : 0;
            const isCurrentStep = step.step_no === currentStep;

            return (
              <Card 
                key={step.step_no}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isCurrentStep ? 'ring-2 ring-primary shadow-lg' : ''
                }`}
                onClick={() => onStepSelect?.(step.step_no)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge variant={isCurrentStep ? "default" : "secondary"}>
                        Step {step.step_no}
                      </Badge>
                      <h4 className="font-medium">{step.head_step_no}</h4>
                    </div>
                    {isCurrentStep && (
                      <TrendingUp className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{step.topics.length} topics</span>
                      <span>{stepCompletedTopics} completed</span>
                    </div>
                    <ProgressBar 
                      progress={stepProgress} 
                      size="sm" 
                      variant={stepProgress === 100 ? "success" : "default"}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};