import { HeaderTitle} from '.';

const HowToPlay = () => {
  return (
    <div className="hidden lg:block">
      <HeaderTitle title="Plan Your Route" />
      <ol className="text-blue-200 list-decimal list-inside space-y-2">
        <li>Select the squares</li>
        <li>Select a direction</li>
        <li>Click "Add Move"</li>
      </ol>
    </div>
  )
};

export default HowToPlay;
