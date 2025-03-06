import HeroPhoto from './hero-photo';
import {
  getHomePageHero,
  getHomePageResume,
  getHomePageStatistics,
} from '@/action/homePageActions';
import HeroResumeButton from './hero-resume-button';
import HeroSocialLinks from './hero-social-links';
import HeroStatistic from './hero-statistic';
import HeroAdminInfo from './hero-admin-info';

const HeroContainer = async () => {
  const resultResume = await getHomePageResume();
  const data = await getHomePageHero();
  const resultStatistics = await getHomePageStatistics();
  const result = Array.isArray(data.data) ? data.data[0] : data.data;
  const heroPhoto = result.image;

  return (
    <section className="h-screen container mx-auto px-2 pt-4 pb-4">
      <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-4">
        <div className="order-2 xl:order-none">
          <HeroAdminInfo result={result} />
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <HeroResumeButton resume={resultResume?.resumeUrl} />
            <HeroSocialLinks />
          </div>
        </div>
        <div className="order-1 xl:order-none mb-8 xl:mb-0">
          <HeroPhoto photo={heroPhoto} />
        </div>
      </div>
      <div className="mt-6 py-4">
        <HeroStatistic data={resultStatistics.data ?? []} />
      </div>
    </section>
  );
};

export default HeroContainer;
