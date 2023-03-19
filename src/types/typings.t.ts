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
  };
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
  };
};

export type APITutorial = {
  id: number;
  attributes: {
    description: string;
    icon: string;
    numberOfPointsForEachQuestion: number;
    numberOfQuestions: number;
    published: boolean;
    timeToTakeInTutorial: number;
    bgColor: string;
    dueDate: string;
  };
  relationships: {
    unit: APIUnit;
    questions: APIQuestion[];
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
};

export type APIUnit = {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
  };
  relationships: {
    course: APICourse;
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
  numberOfPointsForEachQuestion: number;
  timeToTakeInTutorial: number;
  bgColor: string;
  lecturer_id: number;
};

export type QN = {
  question: string;
  correctAnswer: string;
  tutorial_id: number;
  answers: {
    identity: string;
    answer: string;
  }[];
};
