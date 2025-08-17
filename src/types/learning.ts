export interface Topic {
  id: string;
  step_no: number;
  sub_step_no: number;
  sl_no: number;
  step_title: string;
  sub_step_title: string;
  question_title: string;
  post_link?: string;
  yt_link?: string;
  plus_link?: string;
  editorial_link?: string;
  lc_link?: string;
  company_tags?: string;
  difficulty: number;
  ques_topic: string;
  completed?: boolean;
}

export interface SubStep {
  sub_step_no: number;
  sub_step_title: string;
  topics: Topic[];
}

export interface LearningStep {
  step_no: number;
  step_title: string;
  sub_steps: SubStep[];
}

export interface UserProgress {
  userId: string;
  currentStep: number;
  currentSubStep: number;
  completedTopics: string[];
  totalPoints: number;
  currentLevel: string;
  streakDays: number;
  achievements: string[];
  timeSpent: Record<string, number>;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  criteria: any;
  pointsReward: number;
  badgeIcon: string;
  earned?: boolean;
}

export interface Level {
  name: string;
  minXp: number;
  benefits: string[];
}