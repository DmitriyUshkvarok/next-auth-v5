interface ResumeExperiencePropsData {
  experienceData: {
    title: string;
    description: string;
    experiences:
      | {
          position: string;
          company: string;
          start: string;
          end: string;
        }[]
      | null;
  } | null;
}
const ResumeExperience = ({ experienceData }: ResumeExperiencePropsData) => {
  return (
    <div>
      <h2>{experienceData?.title}</h2>
      <p>{experienceData?.description}</p>
      <ul>
        {experienceData?.experiences?.map((experience, index) => (
          <li key={index}>
            <strong>{experience.position}</strong> at {experience.company} (
            {experience.start} - {experience.end})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeExperience;
