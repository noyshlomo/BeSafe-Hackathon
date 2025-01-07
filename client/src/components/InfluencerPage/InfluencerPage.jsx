import { useParams } from 'react-router';
import InfluencerInfo from './InfluencerInfo';

const InfluencerPage = () => {
  const { id } = useParams();

  return (
    <div>
      <InfluencerInfo influencerId={id} />
    </div>
  );
};

export default InfluencerPage;
