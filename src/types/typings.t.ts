import type { ReactNode } from 'react';

export interface LoginData {
  id: string;
  password: string;
}

export type User = {
  id: number;
  email: string;
  role: string;
  name: string;
};

export type Route = {
  inactiveIcon?: ReactNode;
  activeIcon?: ReactNode;
  name?: string;
  to: string;
};

export type SelectionOption = {
  name: string;
  value: string;
};

export type APIStudent = {
  id: number;
  attributes: {
    regNumber: string;
    name: string;
    email: string;
    createdAt: string;
  };
  relationships: {
    course: APICourse;
    results: APIResult[];
    discussions: APIDiscussion[];
  };
};

export type APIResult = {
  id: number;
  attributes: {
    points: number;
    doneIn: string;
    tutorial_id: number;
  };
  relationships: { tutorial: APITutorial; student: APIStudent };
};

export type APILecturer = {
  id: number;
  attributes: {
    workNumber: string;
    name: string;
    email: string;
    createdAt: string;
  };
  relationships: {
    units: APIUnit[];
    tutorials: APITutorial[];
    discussions: APIDiscussion[];
  };
};

export type APITutorial = {
  id: number;
  attributes: {
    description: string;
    icon: string;
    numberOfPointsForEachQuestion: string;
    numberOfQuestions: string;
    published: boolean;
    timeToTakeInTutorial: string;
    bgColor: string;
    dueDate: string;
    numberOfValidDays: string;
    code: string;
  };
  relationships: {
    unit: APIUnit;
    questions: APIQuestion[];
    results: APIResult[];
  };
};

export type APIQuestion = {
  id: number;
  attributes: {
    question: string;
    correctAnswer: string;
  };
  relationships: {
    answers: APIAnswer[];
  };
};

export type APIAnswer = {
  id: number;
  attributes: {
    identity: string;
    answer: string;
  };
};

export type APICourse = {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
  };
  relationships: {
    units: APIUnit[];
  };
};

export type APIUnit = {
  id: string;
  attributes: {
    name: string;
    createdAt: string;
  };
  relationships: {
    course: APICourse;
  };
};

export type APIDiscussion = {
  id: number;
  attributes: {
    discussion: string;
    bgColor: string;
    createdAt: string;
  };
  relationships: {
    owner: APIStudent | APILecturer;
    unit: APIUnit;
    comments: APIComment[];
  };
};

export type APIComment = {
  id: number;
  attributes: {
    comment: string;
    createdAt: string;
  };
  relationships: {
    owner: APIStudent | APILecturer;
  };
};

export type StudentData = {
  id?: number;
  regNumber: string;
  name: string;
  email: string;
  createdAt?: string;
  course_id?: string;
  password?: string;
};

export type LecturerData = {
  id?: number;
  workNumber: string;
  name: string;
  email: string;
  createdAt?: string;
  password?: string;
  units?: APIUnit[];
  unitIds?: number[];
};

export type CourseData = {
  id?: number;
  name: string;
  createdAt?: string;
};

export type UnitData = {
  id?: number;
  name: string;
  course?: string;
  course_id: string;
  createdAt?: string;
};

export type TutorialData = {
  description: string;
  unit_id: string;
  icon: string;
  numberOfQuestions: string;
  numberOfValidDays: string;
  numberOfPointsForEachQuestion: string;
  timeToTakeInTutorial: string;
  bgColor: string;
  lecturer_id?: number;
  code?: string;
};

export type QN = {
  question: string;
  correctAnswer: string;
  tutorial_id?: number;
  answers: {
    identity: string;
    answer: string;
  }[];
};

export type Result = {
  tutorial_id: number;
  points: number;
  student_id: number;
};

export type DiscussionData = {
  discussion: string;
  unit_id: string;
  bgColor?: string;
  user_id?: number;
};

export type DiscussionCommentData = {
  comment: string;
  discussion_id: number;
  user_id?: number;
};

export interface ForgotPassword {
  email: string;
}
