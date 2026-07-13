export interface PersonalInfo {
  _id?: string;
  dateOfBirth: string;
  location: string;
  email: string;
  phone: string;
  languages: string;
}

export interface AboutData {
  _id: string;
  name: string;
  title: string;
  introduction: string;
  journey: string;
  currentWork: string;
  profileImage: string;
  personal: PersonalInfo[];
  createdAt?: string;
  updatedAt?: string;
}

export interface GET_ABOUT_RESPONSE {
  message: string;
  result: AboutData;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface GET_PROJECT_RESPONSE {
  message: string;
  result: Project[];
}

export interface Skill {
  _id: string;
  skillName: string;
  category: string;
  icon: string;
  level: number;
  order: number;
}

export interface GET_SKILL_RESPONSE {
  message: string;
  result: Skill[];
}

export interface Experience {
  _id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  responsibilities: string[];
  order: number;
}

export interface GET_EXPERIENCE_RESPONSE {
  message: string;
  result: Experience[];
}

export interface Education {
  _id: string;
  degree: string;
  university: string;
  location: string;
  startYear: number;
  endYear: number;
}

export interface GET_EDUCATION_RESPONSE {
  message: string;
  result: Education[];
}

export interface Status {
  _id: string;
  yearsExperience: string;
  projectsCompleted: string;
  technologies: string;
  happyClients: string;
}

export interface GET_STATUS_RESPONSE {
  message: string;
  result: Status[];
}

