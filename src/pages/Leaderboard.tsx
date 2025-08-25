import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Award, Crown, Zap, Target, Calendar, Clock, Flame } from "lucide-react";
import dsaLogo from "@/assets/dsa-logo.png";

// Mock data for leaderboard
const leaderboardData = [
  { rank: 1, name: "Alex Chen", username: "@alexdev", points: 2847, streak: 45, completedChallenges: 89, avatar: "/placeholder.svg" },
  { rank: 2, name: "Sarah Kim", username: "@sarahk", points: 2756, streak: 32, completedChallenges: 85, avatar: "/placeholder.svg" },
  { rank: 3, name: "Mike Johnson", username: "@mikej", points: 2698, streak: 28, completedChallenges: 82, avatar: "/placeholder.svg" },
  { rank: 4, name: "Priya Sharma", username: "@priya", points: 2543, streak: 41, completedChallenges: 78, avatar: "/placeholder.svg" },
  { rank: 5, name: "David Wilson", username: "@davidw", points: 2489, streak: 23, completedChallenges: 75, avatar: "/placeholder.svg" },
  { rank: 6, name: "Lisa Wang", username: "@lisaw", points: 2387, streak: 19, completedChallenges: 71, avatar: "/placeholder.svg" },
  { rank: 7, name: "John Martinez", username: "@johnm", points: 2234, streak: 15, completedChallenges: 68, avatar: "/placeholder.svg" },
  { rank: 8, name: "Emma Davis", username: "@emmad", points: 2156, streak: 37, completedChallenges: 64, avatar: "/placeholder.svg" },
];

const dailyChallenge = {
  title: "Binary Tree Maximum Path Sum",
  difficulty: "Hard",
  points: 100,
  timeLimit: "90 minutes",
  description: "Given a non-empty binary tree, find the maximum path sum. A path is defined as any sequence of nodes from some starting node to any node in the tree along the parent-child connections.",
  participants: 1247,
  solved: 356
};

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("all-time");

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500";
    if (rank === 3) return "bg-gradient-to-r from-amber-400 to-amber-600";
    return "bg-gradient-secondary";
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={dsaLogo} alt="SwitchWise Logo" className="h-10 w-10 rounded-lg shadow-card" />
            <div>
              <h1 className="text-xl font-bold">SwitchWise</h1>
              <p className="text-xs text-muted-foreground font-medium">Leaderboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="glass-effect px-3 py-1.5 rounded-full">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">Daily Challenge</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {/* Daily Challenge Section */}
        <Card className="card-modern animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-primary rounded-2xl shadow-glow">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl gradient-text">Today's Challenge</CardTitle>
                  <p className="text-muted-foreground">Compete with thousands of developers</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-orange-100 text-orange-700 px-3 py-1">
                <Clock className="h-3 w-3 mr-1" />
                {dailyChallenge.timeLimit}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold">{dailyChallenge.title}</h3>
                  <Badge 
                    variant={dailyChallenge.difficulty === "Hard" ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {dailyChallenge.difficulty}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{dailyChallenge.description}</p>
              </div>
              <Button className="w-full lg:w-auto h-12 bg-gradient-primary hover:scale-105 transition-transform">
                <span className="flex items-center gap-2">
                  Start Challenge
                  <Zap className="h-4 w-4" />
                  <span className="text-sm">+{dailyChallenge.points} XP</span>
                </span>
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-xl">
                  <div className="text-2xl font-bold text-primary">{dailyChallenge.participants}</div>
                  <div className="text-sm text-muted-foreground">Participants</div>
                </div>
                <div className="text-center p-4 bg-success/10 rounded-xl">
                  <div className="text-2xl font-bold text-success">{dailyChallenge.solved}</div>
                  <div className="text-sm text-muted-foreground">Solved</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Resets in 18 hours 42 minutes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard Section */}
        <Card className="card-modern animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-primary rounded-2xl shadow-glow">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl gradient-text">Leaderboard</CardTitle>
                  <p className="text-muted-foreground">Top performers in the community</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all-time">All Time</TabsTrigger>
                <TabsTrigger value="monthly">This Month</TabsTrigger>
                <TabsTrigger value="weekly">This Week</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="space-y-4">
                {/* Top 3 Special Display */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {leaderboardData.slice(0, 3).map((user, index) => (
                    <Card key={user.rank} className={`relative overflow-hidden ${getRankBadgeColor(user.rank)} border-0`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm"></div>
                      <CardContent className="relative p-6 text-center">
                        <div className="mb-4">
                          {getRankIcon(user.rank)}
                        </div>
                        <Avatar className="h-16 w-16 mx-auto mb-4 border-4 border-white shadow-lg">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="text-lg font-bold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-bold text-lg">{user.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{user.username}</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Points:</span>
                            <span className="font-bold">{user.points.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Streak:</span>
                            <span className="font-bold">{user.streak} days</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Rest of the leaderboard */}
                <div className="space-y-3">
                  {leaderboardData.slice(3).map((user) => (
                    <Card key={user.rank} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-full">
                            {getRankIcon(user.rank)}
                          </div>
                          
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-semibold">{user.name}</h3>
                                <p className="text-sm text-muted-foreground">{user.username}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-primary">{user.points.toLocaleString()}</div>
                                <div className="text-sm text-muted-foreground">points</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-4 text-sm">
                            <div className="text-center">
                              <div className="font-semibold text-orange-600">{user.streak}</div>
                              <div className="text-muted-foreground">streak</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-green-600">{user.completedChallenges}</div>
                              <div className="text-muted-foreground">solved</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Motivational Quote */}
        <Card className="card-modern border-primary/20 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gradient-primary/20 rounded-full">
                <Award className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-lg italic text-muted-foreground">
                  "Competition brings out the best in products and the worst in people. But in learning, competition brings out the best in everyone."
                </p>
                <p className="text-sm text-primary font-medium mt-2">- Growth through Challenge</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Leaderboard;
