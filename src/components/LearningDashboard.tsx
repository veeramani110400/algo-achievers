import { useState } from "react";
import { dsaData, learningModules, userProgress, achievements, levels } from "@/data/learningData";
import { systemDesignData } from "@/data/systemDesignData";
import { coreSubjectsData } from "@/data/coreSubjectsData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { XPIndicator } from "@/components/XPIndicator";
import { AchievementBadge } from "@/components/AchievementBadge";
import { StepOverview } from "@/components/StepOverview";
import { SystemDesignStepOverview } from "@/components/SystemDesignStepOverview";
import { CoreSubjectsStepOverview } from "@/components/CoreSubjectsStepOverview";
import { TopicCard } from "@/components/TopicCard";
import { SystemDesignTopicCard } from "@/components/SystemDesignTopicCard";
import { CoreSubjectsTopicCard } from "@/components/CoreSubjectsTopicCard";
import { ModuleSelector } from "@/components/ModuleSelector";
import { Trophy, BookOpen, ArrowLeft, Zap, Target, Award, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import dsaLogo from "@/assets/dsa-logo.png";

export const LearningDashboard = () => {
  const [selectedModule, setSelectedModule] = useState<string>(userProgress.selectedModule);
  const [completedTopics, setCompletedTopics] = useState<Record<string, string[]>>({
    dsa: userProgress.modules.dsa.completedTopics,
    "system-design": userProgress.modules["system-design"].completedTopics,
    "core-subjects": userProgress.modules["core-subjects"].completedTopics
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
      <div className="min-h-screen bg-gradient-hero bg-grid-pattern">
        {/* Enhanced Header */}
        <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white/80 backdrop-blur-xl">
          <div className="container flex h-20 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src={dsaLogo} alt="SwitchWise Logo" className="h-12 w-12 rounded-xl shadow-glow" />
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-primary rounded-full animate-glow"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">SwitchWise</h1>
                <p className="text-sm text-muted-foreground font-medium">Career Transition Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => window.location.href = '/leaderboard'}
                className="glass-effect px-4 py-2 rounded-full hover:bg-primary/10 transition-colors"
              >
                <Users className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-semibold">Leaderboard</span>
              </Button>
              <div className="glass-effect px-4 py-2 rounded-full">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-achievement-gold" />
                  <span className="text-sm font-semibold">{userProgress.currentLevel}</span>
                </div>
              </div>
              <div className="glass-effect px-4 py-2 rounded-full">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-xp-primary" />
                  <span className="text-sm font-semibold">{points} XP</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container py-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-gradient-primary/10 px-4 py-2 rounded-full border border-primary/20">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Accelerate Your Career Growth</span>
              </div>
              <h2 className="text-5xl font-bold gradient-text leading-tight">
                Choose Your Learning Path
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Master the skills that matter. Join thousands of professionals who've successfully switched careers with our platform.
              </p>
              <div className="mt-6 p-4 bg-gradient-primary/10 rounded-xl border border-primary/20 max-w-xl mx-auto">
                <p className="text-sm italic text-muted-foreground">
                  "Every professional was once an amateur. Every expert was once a beginner."
                </p>
                <p className="text-xs text-primary font-medium mt-1">- Helen Hayes</p>
              </div>
            </div>
            
            <div className="animate-fade-in">
              <ModuleSelector
                modules={learningModules}
                userModules={userProgress.modules}
                selectedModule={selectedModule}
                onModuleSelect={handleModuleSelect}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowModuleSelector(true)}
              className="mr-2 hover:bg-primary/10 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <img src={dsaLogo} alt="SwitchWise Logo" className="h-10 w-10 rounded-lg shadow-card" />
            <div>
              <h1 className="text-xl font-bold">SwitchWise</h1>
              <p className="text-xs text-muted-foreground font-medium">{currentModule?.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="glass-effect px-3 py-1.5 rounded-full">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-achievement-gold" />
                <span className="text-sm font-medium">{userProgress.currentLevel}</span>
              </div>
            </div>
            <div className="glass-effect px-3 py-1.5 rounded-full">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-info" />
                <span className="text-sm">{currentModuleCompletedTopics.length} completed</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Enhanced Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="animate-fade-in">
            <XPIndicator 
              currentXp={points}
              level={userProgress.currentLevel}
              nextLevelXp={500}
            />
          </div>
          
          <Card className="card-modern floating-action animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-secondary/20 rounded-xl">
                  <Zap className="h-5 w-5 text-xp-secondary" />
                </div>
                <span className="font-semibold">Streak</span>
              </div>
              <div className="text-3xl font-bold text-gradient">{userProgress.streakDays}</div>
              <p className="text-sm text-muted-foreground">Days in a row</p>
            </CardContent>
          </Card>

          <Card className="card-modern floating-action animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-info/20 rounded-xl">
                  <Target className="h-5 w-5 text-info" />
                </div>
                <span className="font-semibold">Progress</span>
              </div>
              <div className="text-3xl font-bold text-gradient">{currentModuleCompletedTopics.length}</div>
              <p className="text-sm text-muted-foreground">Topics completed</p>
            </CardContent>
          </Card>

          <Card className="card-modern floating-action animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-achievement-gold/20 rounded-xl">
                  <Award className="h-5 w-5 text-achievement-gold" />
                </div>
                <span className="font-semibold">Achievements</span>
              </div>
              <div className="text-3xl font-bold text-gradient">{achievements.filter(a => a.earned).length}</div>
              <p className="text-sm text-muted-foreground">Badges earned</p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Achievements Section */}
        <Card className="card-modern mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-achievement-gold/20 rounded-xl">
                <Trophy className="h-5 w-5 text-achievement-gold" />
              </div>
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {achievements.map((achievement, index) => (
                <div key={achievement.id} className="animate-fade-in">
                  <AchievementBadge 
                    achievement={achievement}
                    size="lg"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Module Content */}
          <div className="lg:col-span-1 animate-fade-in">
          {selectedModule === 'dsa' ? (
            <StepOverview
              step={dsaData.find(s => s.step_no === selectedStep) || dsaData[0]}
              completedTopics={currentModuleCompletedTopics}
              selectedSubStep={selectedSubStep}
              onSubStepSelect={setSelectedSubStep}
            />
          ) : selectedModule === 'system-design' ? (
              <SystemDesignStepOverview
                steps={systemDesignData}
                completedTopics={currentModuleCompletedTopics}
                currentStep={selectedStep}
                onStepSelect={setSelectedStep}
              />
            ) : (
              <CoreSubjectsStepOverview
                steps={coreSubjectsData}
                completedTopics={currentModuleCompletedTopics}
                currentStep={selectedStep}
                onStepSelect={setSelectedStep}
              />
            )}
          </div>

          {/* Current Topics */}
          <div className="lg:col-span-2 space-y-8 animate-fade-in">
            <div className="card-modern p-8">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">
                      {selectedModule === 'dsa' 
                        ? dsaData.find(s => s.step_no === selectedStep)?.sub_steps.find(s => s.sub_step_no === selectedSubStep)?.sub_step_title || "Topics"
                        : selectedModule === 'system-design'
                          ? systemDesignData.find(s => s.step_no === selectedStep)?.head_step_no || "Topics"
                          : coreSubjectsData.find(s => s.step_no === selectedStep)?.topic || "Topics"
                      }
                    </h2>
                    <p className="text-muted-foreground">
                      {selectedModule === 'dsa' 
                        ? "Complete these topics to progress in your DSA journey"
                        : selectedModule === 'system-design'
                          ? "Master these system design concepts for senior engineering roles"
                          : "Build strong fundamentals in computer science core subjects"
                      }
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-6">
                {selectedModule === 'dsa' ? (
                  dsaData.find(s => s.step_no === selectedStep)?.sub_steps
                    .find(s => s.sub_step_no === selectedSubStep)
                    ?.topics.map((topic, index) => {
                      const isCompleted = currentModuleCompletedTopics.includes(topic.id);
                      const isLocked = index > 0 && !currentModuleCompletedTopics.includes(
                        dsaData.find(s => s.step_no === selectedStep)?.sub_steps
                          .find(s => s.sub_step_no === selectedSubStep)
                          ?.topics[index - 1].id || ""
                      );
                      
                      return (
                        <div key={topic.id} className="animate-fade-in">
                          <TopicCard
                            topic={topic}
                            isCompleted={isCompleted}
                            isLocked={isLocked}
                            onComplete={handleTopicComplete}
                          />
                        </div>
                      );
                    })
                ) : selectedModule === 'system-design' ? (
                  systemDesignData
                    .find(s => s.step_no === selectedStep)
                    ?.topics.map((topic, index) => {
                      const isCompleted = currentModuleCompletedTopics.includes(topic.id);
                      const isLocked = index > 0 && !currentModuleCompletedTopics.includes(
                        systemDesignData
                          .find(s => s.step_no === selectedStep)
                          ?.topics[index - 1].id || ""
                      );
                      
                      return (
                        <div key={topic.id} className="animate-fade-in">
                          <SystemDesignTopicCard
                            topic={topic}
                            isCompleted={isCompleted}
                            isLocked={isLocked}
                            onComplete={handleTopicComplete}
                          />
                        </div>
                      );
                    })
                ) : (
                  coreSubjectsData
                    .find(s => s.step_no === selectedStep)
                    ?.data.map((topic, index) => {
                      const isCompleted = currentModuleCompletedTopics.includes(topic.id);
                      const isLocked = index > 0 && !currentModuleCompletedTopics.includes(
                        coreSubjectsData
                          .find(s => s.step_no === selectedStep)
                          ?.data[index - 1].id || ""
                      );
                      
                      return (
                        <div key={topic.id} className="animate-fade-in">
                          <CoreSubjectsTopicCard
                            topic={topic}
                            isCompleted={isCompleted}
                            isLocked={isLocked}
                            onComplete={handleTopicComplete}
                          />
                        </div>
                      );
                    })
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};