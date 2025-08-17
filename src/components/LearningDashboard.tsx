import { useState } from "react";
import { Flame, Calendar, Star } from "lucide-react";
import { StepOverview } from "./StepOverview";
import { TopicCard } from "./TopicCard";
import { XPIndicator } from "./XPIndicator";
import { AchievementBadge } from "./AchievementBadge";
import { learningData, userProgress, achievements } from "@/data/learningData";
import { useToast } from "@/hooks/use-toast";

export const LearningDashboard = () => {
  const [completedTopics, setCompletedTopics] = useState<string[]>(userProgress.completedTopics);
  const [selectedSubStep, setSelectedSubStep] = useState<number>(1);
  const [points, setPoints] = useState(userProgress.totalPoints);
  const { toast } = useToast();

  const handleTopicComplete = (topicId: string) => {
    setCompletedTopics(prev => [...prev, topicId]);
    setPoints(prev => prev + 50);
    
    toast({
      title: "Topic Completed! 🎉",
      description: "You earned 50 XP! Keep up the great work!",
    });
  };

  const selectedSubStepData = learningData.sub_steps.find(
    subStep => subStep.sub_step_no === selectedSubStep
  );

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <XPIndicator 
            currentXp={points}
            level={userProgress.currentLevel}
            nextLevelXp={500}
          />
          
          <div className="bg-gradient-card p-4 rounded-lg border border-border shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-xp-secondary" />
              <span className="text-sm font-medium text-foreground">Streak</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {userProgress.streakDays}
            </div>
            <p className="text-xs text-muted-foreground">Days in a row</p>
          </div>

          <div className="bg-gradient-card p-4 rounded-lg border border-border shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-info" />
              <span className="text-sm font-medium text-foreground">This Week</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {completedTopics.length}
            </div>
            <p className="text-xs text-muted-foreground">Topics completed</p>
          </div>

          <div className="bg-gradient-card p-4 rounded-lg border border-border shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-achievement-gold" />
              <span className="text-sm font-medium text-foreground">Achievements</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {achievements.filter(a => a.earned).length}
            </div>
            <p className="text-xs text-muted-foreground">Badges earned</p>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Recent Achievements</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {achievements.map((achievement) => (
              <AchievementBadge 
                key={achievement.id}
                achievement={achievement}
                size="lg"
              />
            ))}
          </div>
        </div>

        {/* Step Overview */}
        <StepOverview 
          step={learningData}
          completedTopics={completedTopics}
          onSubStepSelect={setSelectedSubStep}
          selectedSubStep={selectedSubStep}
        />

        {/* Current Sub-step Topics */}
        {selectedSubStepData && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">
                  {selectedSubStepData.sub_step_no}
                </span>
              </div>
              <h2 className="text-xl font-bold text-foreground">
                {selectedSubStepData.sub_step_title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedSubStepData.topics.map((topic, index) => {
                const isCompleted = completedTopics.includes(topic.id);
                const isLocked = index > 0 && !completedTopics.includes(
                  selectedSubStepData.topics[index - 1].id
                );

                return (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    isCompleted={isCompleted}
                    isLocked={isLocked}
                    onComplete={handleTopicComplete}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};