import { useState } from "react";
import { Flame, Calendar, Star, Trophy, BookOpen } from "lucide-react";
import { StepOverview } from "./StepOverview";
import { TopicCard } from "./TopicCard";
import { XPIndicator } from "./XPIndicator";
import { AchievementBadge } from "./AchievementBadge";
import { learningData, userProgress, achievements } from "@/data/learningData";
import { useToast } from "@/hooks/use-toast";
import dsaLogo from "@/assets/dsa-logo.png";

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
      {/* Header with Logo */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={dsaLogo} 
                alt="DSA Learning Platform" 
                className="w-10 h-10 rounded-lg shadow-glow"
              />
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  DSA Mastery
                </h1>
                <p className="text-sm text-muted-foreground">
                  Master Data Structures & Algorithms
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-accent/20 px-3 py-1 rounded-full">
                <Trophy className="w-4 h-4 text-achievement-gold" />
                <span className="text-sm font-medium text-foreground">
                  Level {userProgress.currentLevel}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-success/20 px-3 py-1 rounded-full">
                <BookOpen className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-foreground">
                  {completedTopics.length} / {learningData.sub_steps.reduce((acc, sub) => acc + sub.topics.length, 0)} Topics
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-fade-in">
          <XPIndicator 
            currentXp={points}
            level={userProgress.currentLevel}
            nextLevelXp={500}
          />
          
          <div className="bg-gradient-card p-6 rounded-xl border border-border shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-xp-secondary/20 rounded-lg group-hover:bg-xp-secondary/30 transition-colors">
                <Flame className="w-5 h-5 text-xp-secondary" />
              </div>
              <span className="text-sm font-semibold text-foreground">Fire Streak</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {userProgress.streakDays}
            </div>
            <p className="text-xs text-muted-foreground">Days in a row</p>
          </div>

          <div className="bg-gradient-card p-6 rounded-xl border border-border shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-info/20 rounded-lg group-hover:bg-info/30 transition-colors">
                <Calendar className="w-5 h-5 text-info" />
              </div>
              <span className="text-sm font-semibold text-foreground">Progress</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {completedTopics.length}
            </div>
            <p className="text-xs text-muted-foreground">Topics completed</p>
          </div>

          <div className="bg-gradient-card p-6 rounded-xl border border-border shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-achievement-gold/20 rounded-lg group-hover:bg-achievement-gold/30 transition-colors">
                <Star className="w-5 h-5 text-achievement-gold" />
              </div>
              <span className="text-sm font-semibold text-foreground">Achievements</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {achievements.filter(a => a.earned).length}
            </div>
            <p className="text-xs text-muted-foreground">Badges earned</p>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-10 bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-border/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-achievement-gold/20 rounded-lg">
              <Trophy className="w-5 h-5 text-achievement-gold" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Recent Achievements</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
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
          <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-border/50">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-lg font-bold text-primary-foreground">
                  {selectedSubStepData.sub_step_no}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {selectedSubStepData.sub_step_title}
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  {selectedSubStepData.topics.length} topics to master
                </p>
              </div>
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