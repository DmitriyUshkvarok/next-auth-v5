import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import HeroPhoto from './hero-photo';

const HeroContainer = () => {
  return (
    <section className="h-screen container mx-auto px-2">
      <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
        <div className="order-2 xl:order-none">
          <span></span>
          <h1>text</h1>
          <br />
          <span></span>
          <p></p>
          <div>
            <Button
              variant="outline"
              size="lg"
              className="uppercase flex items-center gap-2"
            >
              <span>Download CV</span>
              <Download />
            </Button>
          </div>
        </div>
        <div className="order-1 xl:order-none mb-8 xl:mb-0">
          <HeroPhoto />
        </div>
      </div>
    </section>
  );
};

export default HeroContainer;
