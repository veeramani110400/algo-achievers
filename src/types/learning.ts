// Common interfaces for both DSA and System Design modules
export interface BaseTopic {
  id: string;
  step_no: number;
  title: string;
  post_link?: string;
  yt_link?: string;
  company_tags?: string;
  completed?: boolean;
}

// DSA-specific topic structure
export interface DSATopic extends BaseTopic {
  sub_step_no: number;
  sl_no: number;
  step_title: string;
  sub_step_title: string;
  question_title: string;
  plus_link?: string;
  editorial_link?: string;
  lc_link?: string;
  difficulty: number;
  ques_topic: string;
}

// Legacy interface for backward compatibility
export interface LearningStep extends DSAStep {}

// System Design specific topic structure
export interface SystemDesignTopic extends BaseTopic {
  sl_no_in_step: number;
  head_step_no: string;
}

export type Topic = DSATopic | SystemDesignTopic;

export interface SubStep {
  sub_step_no: number;
  sub_step_title: string;
  topics: DSATopic[];
}

export interface DSAStep {
  step_no: number;
  step_title: string;
  sub_steps: SubStep[];
}

export interface SystemDesignStep {
  step_no: number;
  head_step_no: string;
  topics: SystemDesignTopic[];
}

export interface LearningModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  totalSteps: number;
  type: 'dsa' | 'system-design';
}

export interface ModuleProgress {
  moduleId: string;
  currentStep: number;
  currentSubStep?: number;
  completedTopics: string[];
  totalPoints: number;
}

export interface UserProgress {
  userId: string;
  selectedModule: string;
  modules: Record<string, ModuleProgress>;
  currentLevel: string;
  streakDays: number;
  achievements: string[];
  timeSpent: Record<string, number>;
  totalPoints: number;
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