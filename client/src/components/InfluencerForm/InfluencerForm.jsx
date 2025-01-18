import React, { useEffect, useState } from 'react';
import topics from "../../../../server/data/topicsData.js"
import styles from "./InfluencerForm.module.css"

const InfluencerForm = () => {


    return (
        <div>
            <form className={styles.container}>
            <label htmlFor="Topic">Topic</label>
                <select id="topic" name="topic" required defaultValue="">
                    <option value="" disabled>
                    Select Topics
                    </option>
                    {topics.map((category) => (
                    <option key={category.id} value={category.category}>
                        {category.category}
                    </option>
                    ))}
                </select>

                <label htmlFor="influencerName">Influencer&apos;s Name</label>
                <input type="text" id="influencerName" required placeholder="Enter Influencer's Name"/>

                <label htmlFor="InstgramUrl">Instgram URL</label>
                <input type="url" id="InstgramUrl" placeholder="Enter Instgram URL"/>

                <label htmlFor="TiktokUrl">Tiktok URL</label>
                <input type="url" id="TiktokUrl" placeholder="Enter Tiktok URL"/>

                <label htmlFor="FacebookUrl">Facebook URL</label>
                <input type="url" id="FacebookUrl" placeholder="Enter Facebook URL"/>

                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default InfluencerForm;
