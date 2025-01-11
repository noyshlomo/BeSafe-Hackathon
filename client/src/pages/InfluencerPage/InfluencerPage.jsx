import { useParams } from 'react-router';
import InfluencerInfo from '../../components/InfluencerPage/InfluencerInfo/InfluencerInfo.jsx';
import Comments from '../../components/InfluencerPage/Comments/Comments.jsx';

const InfluencerPage = () => {
  const { id } = useParams();

  return (
    <div>
      <InfluencerInfo influencerId={id} />
      <Comments influencerId={id} />
    </div>
  );
};

export default InfluencerPage;
