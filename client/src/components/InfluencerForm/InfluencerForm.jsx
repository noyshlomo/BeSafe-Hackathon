import { useState } from "react";
import topics from "../../../../server/data/topicsData.js"
import styles from "./InfluencerForm.module.css"

const InfluencerForm = () => {
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [instagram, setInstagram] = useState("");
    const [tiktok, setTiktok] = useState("");
    const [facebook, setFacebook] = useState("");

    const handelSubmit = async (event) => {
        event.preventDefault();
        
        const formData = {
            category: category,
            name: name,
            instagram: instagram,
            tiktok: tiktok,
            facebook: facebook,
        };

        try {
            const response = await fetch('http://localhost:5000/inspiration-boards/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

        if (!response.ok) {
            alert('This influencer has already been recommended.');
        }
        } catch (error) {
            console.error('Error adding influencer:', error);
        }
            
        setCategory("");
        setName("");
        setInstagram("");
        setTiktok("");
        setFacebook("");
    }
    return (
        <div>
            <form className={styles.influencerFormContainer} onSubmit={handelSubmit}>
                <label className={styles.influencerFormLabel} htmlFor="Topic">Topic</label>
                <select 
                    className={styles.influencerFormSelect}
                    id="topic" 
                    name="topic" 
                    required 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                >
                    <option value="" disabled>
                        Select Topics
                    </option>
                    {topics.map((category) => (
                        <option key={category.id} value={category.category}>
                            {category.category}
                        </option>
                    ))}
                </select>

                <label className={styles.influencerFormLabel} htmlFor="name">Influencer&apos;s Name</label>
                <input 
                    className={styles.influencerFormInput}
                    type="text" 
                    id="name" 
                    required 
                    placeholder="Enter Influencer's Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label className={styles.influencerFormLabel} htmlFor="instagram">Instagram URL</label>
                <input 
                    className={styles.influencerFormInput}
                    type="url" 
                    id="instagram" 
                    placeholder="Enter Instagram URL"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />

                <label className={styles.influencerFormLabel} htmlFor="tiktok">Tiktok URL</label>
                <input 
                    className={styles.influencerFormInput}
                    type="url" 
                    id="tiktok" 
                    placeholder="Enter Tiktok URL"
                    value={tiktok}
                    onChange={(e) => setTiktok(e.target.value)}
                />

                <label className={styles.influencerFormLabel} htmlFor="facebook">Facebook URL</label>
                <input 
                    className={styles.influencerFormInput}
                    type="url" 
                    id="facebook" 
                    placeholder="Enter Facebook URL"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                />

                <button className={styles.influencerFormButton} type="submit">Add</button>
            </form>
        </div>
    );
};

export default InfluencerForm;
