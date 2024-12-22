import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/discussion.css';  // Correct path based on your folder structure

const DiscussionList = () => {
  const [discussions, setDiscussions] = useState([]);
  const [expandedDiscussion, setExpandedDiscussion] = useState(null);
  const [newDiscussion, setNewDiscussion] = useState({ title: "", description: "", createdBy: "" });
  const [newReply, setNewReply] = useState({});
  const [replyUser, setReplyUser] = useState("");  // Capturing the username for the replies

  // Fetch all discussions
  useEffect(() => {
    axios.get("https://backend-discussion-4.onrender.com/api/discussions")
      .then((res) => setDiscussions(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle like action
  const handleLike = async (id) => {
    try {
      const response = await axios.patch(`https://backend-discussion-4.onrender.com/api/discussions/${id}/like`);
      setDiscussions(discussions.map(discussion =>
        discussion._id === id ? response.data : discussion
      ));
    } catch (err) {
      console.error(err);
    }
  };

  // Handle dislike action
  const handleDislike = async (id) => {
    try {
      const response = await axios.patch(`https://backend-discussion-4.onrender.com/api/discussions/${id}/dislike`);
      setDiscussions(discussions.map(discussion =>
        discussion._id === id ? response.data : discussion
      ));
    } catch (err) {
      console.error(err);
    }
  };

  // Handle reply action
  const handleReply = (id) => {
    if (newReply[id]?.trim()) {
      // Include the repliedBy field with the value of replyUser (username of the person replying)
      axios.post(`https://backend-discussion-4.onrender.com/api/discussions/${id}/reply`, { 
        replyText: newReply[id], 
        repliedBy: replyUser 
      })
        .then((response) => {
          setDiscussions(discussions.map(discussion =>
            discussion._id === id ? response.data : discussion
          ));
          setNewReply({ ...newReply, [id]: "" });  // Clear the reply input after submission
        })
        .catch((err) => console.error(err));
    }
  };

  // Toggle to expand or collapse discussion details
  const toggleDiscussionDetails = (id) => {
    if (expandedDiscussion === id) {
      setExpandedDiscussion(null);  // Hide details if already expanded
    } else {
      setExpandedDiscussion(id);  // Show details for the clicked discussion
    }
  };

  // Create a new discussion
  const handleCreateDiscussion = async () => {
    if (!newDiscussion.title || !newDiscussion.description || !newDiscussion.createdBy) {
      alert("Please provide title, description, and your name.");
      return;
    }

    try {
      const response = await axios.post("https://backend-discussion-4.onrender.com/api/discussions", newDiscussion);
      setDiscussions([response.data, ...discussions]);
      setNewDiscussion({ title: "", description: "", createdBy: "" });
      document.getElementById('create-discussion-form').style.display = 'none';  // Hide form after submission
    } catch (err) {
      console.error("Error creating discussion:", err);
    }
  };

  return (
    <div className="discussion-list">
      <button className="create-discussion-btn" onClick={() => document.getElementById('create-discussion-form').style.display = 'block'}>
        Create Discussion
      </button>

      {/* Create Discussion Form */}
      <div id="create-discussion-form" className="create-discussion-form">
        <h3>Create Discussion</h3>
        <input
          type="text"
          placeholder="Title"
          value={newDiscussion.title}
          onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newDiscussion.description}
          onChange={(e) => setNewDiscussion({ ...newDiscussion, description: e.target.value })}
        ></textarea>
        <input
          type="text"
          placeholder="Your Name"
          value={newDiscussion.createdBy}
          onChange={(e) => setNewDiscussion({ ...newDiscussion, createdBy: e.target.value })}
        />
        <button onClick={handleCreateDiscussion}>Submit</button><br></br>
        <button onClick={() => document.getElementById('create-discussion-form').style.display = 'none'}>Cancel</button>
      </div>

      <h2 className="discussion-list-title">Discussions</h2>
      {discussions.map((discussion) => (
        <div key={discussion._id} className="discussion-item">
          <h3 className="discussion-item-title" onClick={() => toggleDiscussionDetails(discussion._id)}>
            {discussion.title}
          </h3>
          <p className="discussion-item-description">{discussion.description}</p>

          {/* Display like, dislike, and reply buttons with symbols */}
          <div className="discussion-item-actions">
            <button onClick={() => handleLike(discussion._id)} className="like-btn">
              👍 {discussion.likeCount}
            </button><br></br>
            <button onClick={() => handleDislike(discussion._id)} className="dislike-btn">
              👎 {discussion.dislikeCount}
            </button><br></br>

            {/* Reply functionality */}
            <input
              type="text"
              placeholder="Write a reply..."
              value={newReply[discussion._id] || ""}
              onChange={(e) => setNewReply({ ...newReply, [discussion._id]: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleReply(discussion._id);
                }
              }}
              className="reply-input"
            />
            <input
              type="text"
              placeholder="Your Name"
              value={replyUser}
              onChange={(e) => setReplyUser(e.target.value)}  // Capture username for replies
              className="reply-user-input"
            />
            <button className="send-reply-btn" onClick={() => handleReply(discussion._id)}>
              Send Reply
            </button>
          </div>

           {/* Display replies */}
           {discussion.replies && discussion.replies.length > 0 && (
            <div className="discussion-replies">
              <h4>Replies:</h4>
              <ul>
                {discussion.replies.map((reply, index) => (
                  <li key={index} className="reply-item">
                    {reply.replyText} - <small>by {reply.repliedBy}</small>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DiscussionList;