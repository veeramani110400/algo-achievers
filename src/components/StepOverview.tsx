import { ChevronRight, BookOpen, Target, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "./ProgressBar";
import { cn } from "@/lib/utils";
import { DSAStep } from "@/types/learning";

interface StepOverviewProps {
  step: DSAStep;
  completedTopics: string[];
  onSubStepSelect?: (subStepNo: number) => void;
  selectedSubStep?: number;
}

export const StepOverview = ({ 
  step, 
  completedTopics, 
  onSubStepSelect,
  selectedSubStep 
}: StepOverviewProps) => {
  const totalTopics = step.sub_steps.reduce((acc, subStep) => acc + subStep.topics.length, 0);
  const completedCount = step.sub_steps.reduce((acc, subStep) => 
    acc + subStep.topics.filter(topic => completedTopics.includes(topic.id)).length, 0
  );
  const overallProgress = (completedCount / totalTopics) * 100;

  return (
    <div className="bg-gradient-hero border border-border rounded-xl p-6 mb-8 shadow-card">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
          <BookOpen className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{step.step_title}</h1>
          <p className="text-muted-foreground">Step {step.step_no}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-card/50 rounded-lg p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">Progress</span>
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">
            {completedCount}/{totalTopics}
          </div>
          <p className="text-xs text-muted-foreground">Topics completed</p>
        </div>

        <div className="bg-card/50 rounded-lg p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-xp-primary" />
            <span className="text-sm font-medium text-foreground">Sub-steps</span>
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">
            {step.sub_steps.length}
          </div>
          <p className="text-xs text-muted-foreground">Learning modules</p>
        </div>

        <div className="bg-card/50 rounded-lg p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-foreground">Completion</span>
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">
            {Math.round(overallProgress)}%
          </div>
          <p className="text-xs text-muted-foreground">Overall progress</p>
        </div>
      </div>

      <ProgressBar 
        progress={overallProgress} 
        variant="success" 
        size="lg"
        showLabel={false}
      />

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Sub-steps</h3>
        <div className="space-y-2">
          {step.sub_steps.map((subStep) => {
            const subStepCompleted = subStep.topics.filter(topic => 
              completedTopics.includes(topic.id)
            ).length;
            const subStepProgress = (subStepCompleted / subStep.topics.length) * 100;
            const isSelected = selectedSubStep === subStep.sub_step_no;

            return (
              <div
                key={subStep.sub_step_no}
                onClick={() => onSubStepSelect?.(subStep.sub_step_no)}
                className={cn(
                  "flex items-center justify-between p-4 bg-card/30 rounded-lg border border-border/50 cursor-pointer transition-all duration-200 hover:bg-card/50 hover:border-accent/50",
                  isSelected && "bg-accent/10 border-accent"
                )}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground">{subStep.sub_step_title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {subStep.sub_step_no}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {subStepCompleted}/{subStep.topics.length} topics
                    </span>
                    <div className="flex-1 max-w-32">
                      <ProgressBar 
                        progress={subStepProgress} 
                        showLabel={false}
                        size="sm"
                        animated={false}
                      />
                    </div>
                  </div>
                </div>
                <ChevronRight className={cn(
                  "w-5 h-5 text-muted-foreground transition-transform duration-200",
                  isSelected && "rotate-90 text-accent"
                )} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};