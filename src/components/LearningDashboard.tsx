import { useState } from "react";
import { dsaData, learningModules, userProgress, achievements, levels } from "@/data/learningData";
import { systemDesignData } from "@/data/systemDesignData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { XPIndicator } from "@/components/XPIndicator";
import { AchievementBadge } from "@/components/AchievementBadge";
import { StepOverview } from "@/components/StepOverview";
import { SystemDesignStepOverview } from "@/components/SystemDesignStepOverview";
import { TopicCard } from "@/components/TopicCard";
import { SystemDesignTopicCard } from "@/components/SystemDesignTopicCard";
import { ModuleSelector } from "@/components/ModuleSelector";
import { Trophy, BookOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import dsaLogo from "@/assets/dsa-logo.png";

export const LearningDashboard = () => {
  const [selectedModule, setSelectedModule] = useState<string>(userProgress.selectedModule);
  const [completedTopics, setCompletedTopics] = useState<Record<string, string[]>>({
    dsa: userProgress.modules.dsa.completedTopics,
    "system-design": userProgress.modules["system-design"].completedTopics
  });
  const [selectedSubStep, setSelectedSubStep] = useState<number>(userProgress.modules.dsa.currentSubStep || 1);
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const [points, setPoints] = useState(userProgress.totalPoints);
  const [showModuleSelector, setShowModuleSelector] = useState(false);

  const handleTopicComplete = (topicId: string) => {
    const moduleCompletedTopics = completedTopics[selectedModule] || [];
    if (!moduleCompletedTopics.includes(topicId)) {
      setCompletedTopics({
        ...completedTopics,
        [selectedModule]: [...moduleCompletedTopics, topicId]
      });
      setPoints(points + 50);
      toast.success("Topic completed! +50 XP", {
        description: "Keep up the great work!",
      });
    }
  };

  const handleModuleSelect = (moduleId: string) => {
    setSelectedModule(moduleId);
    setShowModuleSelector(false);
  };

  const currentModule = learningModules.find(m => m.id === selectedModule);
  const currentModuleCompletedTopics = completedTopics[selectedModule] || [];

  // Show module selector if requested or no module selected
  if (showModuleSelector || !selectedModule) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={dsaLogo} alt="SwitchWise Logo" className="h-8 w-8" />
              <h1 className="text-xl font-bold">SwitchWise</h1>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium">{userProgress.currentLevel}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-info" />
                <span className="text-sm">{points} XP</span>
              </div>
            </div>
          </div>
        </header>

        <main className="container py-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Choose Your Learning Path</h2>
              <p className="text-muted-foreground">
                Select a module to begin your journey towards landing your dream job
              </p>
            </div>
            
            <ModuleSelector
              modules={learningModules}
              userModules={userProgress.modules}
              selectedModule={selectedModule}
              onModuleSelect={handleModuleSelect}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowModuleSelector(true)}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <img src={dsaLogo} alt="SwitchWise Logo" className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">SwitchWise</h1>
              <p className="text-xs text-muted-foreground">{currentModule?.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">{userProgress.currentLevel}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-info" />
              <span className="text-sm">{currentModuleCompletedTopics.length} topics completed</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <XPIndicator 
            currentXp={points}
            level={userProgress.currentLevel}
            nextLevelXp={500}
          />
          
          <Card className="hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🔥</span>
                <span className="font-semibold">Streak</span>
              </div>
              <div className="text-2xl font-bold">{userProgress.streakDays}</div>
              <p className="text-sm text-muted-foreground">Days in a row</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">📊</span>
                <span className="font-semibold">Progress</span>
              </div>
              <div className="text-2xl font-bold">{currentModuleCompletedTopics.length}</div>
              <p className="text-sm text-muted-foreground">Topics completed</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🏆</span>
                <span className="font-semibold">Achievements</span>
              </div>
              <div className="text-2xl font-bold">{achievements.filter(a => a.earned).length}</div>
              <p className="text-sm text-muted-foreground">Badges earned</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Achievements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {achievements.map((achievement) => (
                <AchievementBadge 
                  key={achievement.id}
                  achievement={achievement}
                  size="lg"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Module Content */}
          <div className="lg:col-span-1">
            {selectedModule === 'dsa' ? (
              <StepOverview
                step={dsaData}
                completedTopics={currentModuleCompletedTopics}
                selectedSubStep={selectedSubStep}
                onSubStepSelect={setSelectedSubStep}
              />
            ) : (
              <SystemDesignStepOverview
                steps={systemDesignData}
                completedTopics={currentModuleCompletedTopics}
                currentStep={selectedStep}
                onStepSelect={setSelectedStep}
              />
            )}
          </div>

          {/* Current Topics */}
          <div className="lg:col-span-2 space-y-6">
            {selectedModule === 'dsa' ? (
              <div>
                <div>
                  <h2 className="text-2xl font-semibold mb-1">
                    {dsaData.sub_steps.find(s => s.sub_step_no === selectedSubStep)?.sub_step_title || "Topics"}
                  </h2>
                  <p className="text-muted-foreground">
                    Complete these topics to progress in your DSA journey
                  </p>
                </div>
                
                <div className="grid gap-4">
                  {dsaData.sub_steps
                    .find(s => s.sub_step_no === selectedSubStep)
                    ?.topics.map((topic, index) => {
                      const isCompleted = currentModuleCompletedTopics.includes(topic.id);
                      const isLocked = index > 0 && !currentModuleCompletedTopics.includes(
                        dsaData.sub_steps
                          .find(s => s.sub_step_no === selectedSubStep)
                          ?.topics[index - 1].id || ""
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
            ) : (
              <div>
                <div>
                  <h2 className="text-2xl font-semibold mb-1">
                    {systemDesignData.find(s => s.step_no === selectedStep)?.head_step_no || "Topics"}
                  </h2>
                  <p className="text-muted-foreground">
                    Master these system design concepts for senior engineering roles
                  </p>
                </div>
                
                <div className="grid gap-4">
                  {systemDesignData
                    .find(s => s.step_no === selectedStep)
                    ?.topics.map((topic, index) => {
                      const isCompleted = currentModuleCompletedTopics.includes(topic.id);
                      const isLocked = index > 0 && !currentModuleCompletedTopics.includes(
                        systemDesignData
                          .find(s => s.step_no === selectedStep)
                          ?.topics[index - 1].id || ""
                      );
                      
                      return (
                        <SystemDesignTopicCard
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
      </main>
    </div>
  );
};