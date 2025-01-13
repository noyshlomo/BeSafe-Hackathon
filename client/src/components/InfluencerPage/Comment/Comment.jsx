import styles from './Comment.module.css';

// eslint-disable-next-line react/prop-types
const Comment = ({ userName, content }) => {
  return (
    <div className={styles.commentcontainer}>
      <div className={styles.username}>{userName}</div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};
export default Comment;
