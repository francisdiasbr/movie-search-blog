import Copyright from './Copyright';
import SocialLinks from './SocialLinks';

const FooterContent = () => (
  <div className="flex flex-wrap items-center justify-center md:justify-between w-full">
    <div className="w-full md:w-4/12 px-4 mx-auto text-center md:text-left">
      <Copyright />
    </div>
    <div className="w-full md:w-8/12 px-4 mx-auto">
      <SocialLinks />
    </div>
  </div>
);

export default FooterContent;