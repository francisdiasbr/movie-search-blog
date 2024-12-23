import AppStoreButton from './buttons/AppStoreButton';
import PlayStoreButton from './buttons/PlayStoreButton';

const StoreButtons = () => (
  <div className="flex flex-wrap justify-center gap-6">
    <PlayStoreButton />
    <AppStoreButton />
  </div>
);

export default StoreButtons;
