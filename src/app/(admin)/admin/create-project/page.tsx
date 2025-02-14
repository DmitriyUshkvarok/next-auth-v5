import CreateProjectForm from '@/components/forms/create-project-form';

const CreateProjectPage = () => {
  return (
    <main>
      <h1 className="px-4 text-3xl mb-4">
        Start a New Project – Add Details & Technologies
      </h1>
      <CreateProjectForm />
    </main>
  );
};

export default CreateProjectPage;
