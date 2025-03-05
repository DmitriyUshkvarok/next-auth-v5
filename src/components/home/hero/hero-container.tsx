import HeroPhoto from './hero-photo';
import { getHomePageHero, getHomePageResume } from '@/action/homePageActions';
import HeroResumeButton from './hero-resume-button';

const HeroContainer = async () => {
  const resultResume = await getHomePageResume();
  const data = await getHomePageHero();
  const result = Array.isArray(data.data) ? data.data[0] : data.data;
  const heroPhoto = result.image;
  return (
    <section className="h-screen container mx-auto px-2">
      <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
        <div className="order-2 xl:order-none">
          <span className="text-xl">{result.position}</span>
          <h1>{result.title}</h1>
          <span className="mb-6 inline-flex text-[48px] xl:text-[80px] leading-[1.1] font-semibold text-primaryGreen">
            {result.developerName}
          </span>
          <p className="max-w-[500px] mb-9">{result.description}</p>
          <div>
            <HeroResumeButton resume={resultResume?.resumeUrl} />
          </div>
        </div>
        <div className="order-1 xl:order-none mb-8 xl:mb-0">
          <HeroPhoto photo={heroPhoto} />
        </div>
      </div>
    </section>
  );
};

export default HeroContainer;
