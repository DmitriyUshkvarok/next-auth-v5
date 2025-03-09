type SidebarTextDataProps = {
  dataText: {
    title: string;
    description: string;
  };
};
const ResumeNavigationTextInfo = ({ dataText }: SidebarTextDataProps) => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-primaryHome text-[28px] sm:text-[36px] uppercase">
        {dataText.title}
      </h1>
      <p className="text-[14px] sm:text-[18px] w-full max-w-[500px]">
        {dataText.description}
      </p>
    </div>
  );
};

export default ResumeNavigationTextInfo;
