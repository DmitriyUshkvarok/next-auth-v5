import HeroPhoto from './hero-photo';
import { getHomePageHero, getHomePageResume } from '@/action/homePageActions';
import HeroResumeButton from './hero-resume-button';
import HeroSocialLinks from './hero-social-links';

const HeroContainer = async () => {
  const resultResume = await getHomePageResume();
  const data = await getHomePageHero();
  const result = Array.isArray(data.data) ? data.data[0] : data.data;
  const heroPhoto = result.image;
  return (
    <section className="h-screen container mx-auto px-2 py-4">
      <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
        <div className="order-2 xl:order-none">
          <div className="flex justify-center sm:justify-start text-xl mb-2">
            {result.position}
          </div>
          <h1 className="text-center sm:text-left">{result.title}</h1>
          <div className="mb-6 text-center sm:text-left text-[48px] xl:text-[80px] leading-[1.1] font-semibold text-primaryGreen">
            {result.developerName}
          </div>
          <p className="max-w-[500px] mb-9 text-center sm:text-left">
            {result.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <HeroResumeButton resume={resultResume?.resumeUrl} />
            <HeroSocialLinks />
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
