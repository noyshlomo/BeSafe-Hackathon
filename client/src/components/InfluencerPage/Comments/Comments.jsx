import styles from './InfluencerComments.module.css';
import Comment from '../Comment/Comment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Comments = () => {
  const { id } = useParams();
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/influencers/${id}`);
        if (!response.ok) {
          return new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data.comments);
      } catch (err) {
        console.log('Error fetching comments: ', err);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!comments || comments.length === 0) {
    return <p>No comments for this influencer yet</p>;
  }

  return (
    <div className={styles.container}>
      <div>Comments</div>
      {comments.map((comment, index) => (
        <div key={index}>
          <Comment userName={comment.userName} content={comment.content} />
        </div>
      ))}
    </div>
  );
};
export default Comments;
