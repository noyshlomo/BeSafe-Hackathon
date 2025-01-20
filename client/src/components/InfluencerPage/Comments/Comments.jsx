import styles from './InfluencerComments.module.css';
import Comment from '../Comment/Comment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import plusSvg from './../../../assets/plus.svg';

const Comments = () => {
  const { category, id } = useParams();
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState();
  const [newComment, setNewComment] = useState('');
  const [showTextarea, setShowTextarea] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/inspiration-boards/${category}/${id}`
        );
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
  }, [category, id, comments]);

  useEffect(() => {
    if (comments && comments.length === 0) {
      setMessage('No comments for this influencer yet');
    }
  }, [comments]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = async () => {
    if (newComment.trim() === '') return; // Do not add empty comments

    try {
      // Send the new comment to the server
      const response = await fetch(
        `http://localhost:5000/inspiration-boards/${category}/${id}/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: 'Candy',
            influencerId: { id },
            content: newComment,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      // Fetch updated comments from the server and update the state
      const newCommentData = await response.json();
      setComments((prevComments) => [...prevComments, newCommentData]);

      setMessage('');
      // Reset the textarea and hide it after submission
      setNewComment('');
      setShowTextarea(false); // Hide the textarea after submitting
    } catch (err) {
      console.log('Error adding comment: ', err);
    }
  };

  const handleToggleTextarea = () => {
    setShowTextarea(true); // Show the textarea when button is clicked
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Comments{' '}
        <button className={styles.button} onClick={handleToggleTextarea}>
          <img src={plusSvg} alt="plus" />
        </button>
      </div>
      {showTextarea && (
        <div>
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            rows="3"
            className={styles.textarea}
          />
          <button onClick={handleAddComment}>Submit</button>
        </div>
      )}

      {message && <p>{message}</p>}
      {comments &&
        comments.map((comment, index) => (
          <div key={index}>
            <Comment userName={comment.userName} content={comment.content} />
          </div>
        ))}
    </div>
  );
};
export default Comments;
