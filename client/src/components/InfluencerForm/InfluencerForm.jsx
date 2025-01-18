import { useState } from "react";
import topics from "../../../../server/data/topicsData.js"
import styles from "./InfluencerForm.module.css"

const InfluencerForm = () => {
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [instagram, setInstagram] = useState("");
    const [tiktok, setTiktok] = useState("");
    const [facebook, setFacebook] = useState("");

    const handelSubmit = (event) => {
        event.preventDefault();
        
        const formData = {
            category: category,
            name: name,
            instagram: instagram,
            tiktok: tiktok,
            facebook: facebook,
        };

        fetch('http://localhost:5000/inspiration-boards/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
        
        setCategory("");
        setName("");
        setInstagram("");
        setTiktok("");
        setFacebook("");
    }
    return (
        <div>
            <form className={styles.container} onSubmit={handelSubmit}>
                <label htmlFor="Topic">Topic</label>
                <select 
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

                <label htmlFor="name">Influencer&apos;s Name</label>
                <input 
                    type="text" 
                    id="name" 
                    required 
                    placeholder="Enter Influencer's Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="instagram">Instagram URL</label>
                <input 
                    type="url" 
                    id="instagram" 
                    placeholder="Enter Instagram URL"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />

                <label htmlFor="tiktok">Tiktok URL</label>
                <input 
                    type="url" 
                    id="tiktok" 
                    placeholder="Enter Tiktok URL"
                    value={tiktok}
                    onChange={(e) => setTiktok(e.target.value)}
                />

                <label htmlFor="facebook">Facebook URL</label>
                <input 
                    type="url" 
                    id="facebook" 
                    placeholder="Enter Facebook URL"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                />

                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default InfluencerForm;
