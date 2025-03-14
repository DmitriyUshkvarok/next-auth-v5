type ResumeSkillsPropsData = {
  skillsData: {
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
};

const ResumeSkills = ({ skillsData }: ResumeSkillsPropsData) => {
  return (
    <div>
      <h2>{skillsData?.title.en}</h2>
      <p>{skillsData?.description.en}</p>
      <ul>
        {skillsData?.skills?.map((skill, index) => (
          <li key={index}>
            <strong>{skill?.skillName.en}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeSkills;
