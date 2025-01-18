import { useParams } from "react-router-dom";
import SleepTip from '../../components/SleepTip/SleepTips';

const SleepTips = () => {
    const { userId } = useParams();
    return (
        <div>
          <h1>Sleep Tips</h1>
                < SleepTip userId={userId} />
        </div>
      );
    };

export default SleepTips;
