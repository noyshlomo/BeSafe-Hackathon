import { useParams } from 'react-router-dom';
import styles from "./AddInfluencerForm.module.css"

const AddInfluencerForm = () => {
    const { topic } = useParams(); // Get the topic from the URL parameter

    return (
        <div>
            <form className={styles.container}>
                <label htmlFor="topic">Topic</label>
                <input type="text" id="topic" value={topic} readOnly />

                <label htmlFor="platform">Platform</label>
                <select id="platform">
                    <option value="youtube">YouTube</option>
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TickTok</option>
                    <option value="facebook">Facebook</option>
                </select>

                <label htmlFor="influencerName">Influencer&apos;s Name</label>
                <input type="text" id="influencerName" placeholder="Enter Influencer's Name"/>

                <label htmlFor="profileUrl">Profile URL</label>
                <input type="url" id="profileUrl" placeholder="Enter Profile URL"/>

                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default AddInfluencerForm;
