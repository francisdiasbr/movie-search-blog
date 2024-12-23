import FooterContent from './FooterContent';
// import FooterDivider from './FooterDivider';
// import StoreButtons from './StoreButtons';

const Footer = () => {
  return (
    <footer className="relative w-full bg-gradient-to-b from-gray-900 to-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center space-y-8">
          {/* <p className="text-white text-center text-lg">
            Assine a nossa newsletter ou baixe o aplicativo e receba diariamente sugestões inéditas de filmes.
          </p> */}
          {/* <StoreButtons /> */}
          {/* <FooterDivider /> */}
          <FooterContent />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
