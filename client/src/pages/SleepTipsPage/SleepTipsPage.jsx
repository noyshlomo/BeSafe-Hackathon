import { useParams } from "react-router-dom";
import SleepTip from '../../components/SleepTip/SleepTips';

const SleepTips = () => {
    const { id } = useParams();
    return (
        <div>
          <h1>Sleep Tips</h1>
                < SleepTip userId={id} />
        </div>
      );
    };

export default SleepTips;
