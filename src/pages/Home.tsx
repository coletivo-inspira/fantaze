import HomeHero from '../components/home/HomeHero';
import HowItWorks from '../components/home/HowItWorks';
import ThemeSpotlight from '../components/home/ThemeSpotlight';
import MenuPreview from '../components/home/MenuPreview';
import VotePreview from '../components/home/VotePreview';
import VisitInfo from '../components/home/VisitInfo';

export default function Home() {
  return (
    <>
      <HomeHero />
      <HowItWorks />
      <ThemeSpotlight />
      <MenuPreview />
      <VotePreview />
      <VisitInfo />
    </>
  );
}
