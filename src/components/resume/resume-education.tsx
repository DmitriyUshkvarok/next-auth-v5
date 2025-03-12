interface ResumeEducationPropsData {
  educationData: {
    title: string;
    description: string;
    educations:
      | {
          course: string;
          typeCourse: string;
          start: string;
          end: string;
        }[]
      | null;
  } | null;
}
const ResumeEducation = ({ educationData }: ResumeEducationPropsData) => {
  return (
    <div>
      <h2>{educationData?.title}</h2>
      <p>{educationData?.description}</p>
      <ul>
        {educationData?.educations?.map((education, index) => (
          <li key={index}>
            <strong>{education.course}</strong> at {education.typeCourse} (
            {education.start} - {education.end})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeEducation;
