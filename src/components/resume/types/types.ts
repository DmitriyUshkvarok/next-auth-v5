export type NavigationItem = {
  name: {
    en: string;
    ru: string;
    uk: string;
  };
  url: string;
};

export type ResumeExperienceProps = {
  title: {
    en: string;
    ru: string;
    uk: string;
  };
  description: {
    en: string;
    ru: string;
    uk: string;
  };
  experiences:
    | {
        start: string;
        end: string;
        position: {
          en: string;
          ru: string;
          uk: string;
        };
        company: {
          en: string;
          ru: string;
          uk: string;
        };
      }[]
    | null;
} | null;

export type ResumeEducationProps = {
  title: {
    en: string;
    ru: string;
    uk: string;
  };
  description: {
    en: string;
    ru: string;
    uk: string;
  };
  educations:
    | {
        start: string;
        end: string;
        course: {
          en: string;
          ru: string;
          uk: string;
        };
        typeCourse: {
          en: string;
          ru: string;
          uk: string;
        };
      }[]
    | null;
} | null;

export type ResumeSkillsProps = {
  title: {
    en: string;
    ru: string;
    uk: string;
  };
  description: {
    en: string;
    ru: string;
    uk: string;
  };
  skills: Array<{
    skillName: {
      en: string;
      ru: string;
      uk: string;
    };
  }> | null;
} | null;

export type ResumeAboutProps = {
  title: {
    en: string;
    ru: string;
    uk: string;
  };
  description: {
    en: string;
    ru: string;
    uk: string;
  };
  subDescription: {
    en: string;
    ru: string;
    uk: string;
  };
  name: {
    en: string;
    ru: string;
    uk: string;
  };
  email: string;
  experience: {
    en: string;
    ru: string;
    uk: string;
  };
  nationality: {
    en: string;
    ru: string;
    uk: string;
  };
  dateOfBirth: string;
  location: {
    en: string;
    ru: string;
    uk: string;
  };
} | null;
