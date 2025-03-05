import { getHomePageSocialLinks } from '@/action/homePageActions';
import { Button } from '@/components/ui/button';
import { getSocialIcon } from '@/utils/getSocialIcon';

const HeroSocialLinks = async () => {
  const result = await getHomePageSocialLinks();
  const links = result.data;

  return (
    <ul className="flex gap-4">
      {links?.map((link) => {
        const Icon = getSocialIcon({ name: link.name });

        return (
          <li key={link.name}>
            <Button
              asChild
              variant="outline"
              size="icon"
              className="rounded-full text-primaryGreen border-primaryGreen"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                {Icon && <Icon className="w-5 h-5" />}
              </a>
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default HeroSocialLinks;
