import React, { useEffect, useState } from "react";
import "./App.css";

const Displaydata = () => {
  const [userData, setUserData] = useState([]);
  const [userID, setUserID] = useState(0);

  const [postData, setPostData] = useState([]);
  const [postId, setPostId] = useState(0);
  const [commentData, setCommentData] = useState([]);

  const fetchUserData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      });
  };

  const fetchPostData = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPostData(data);
      });
  };

  const fetchCommentData = () => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCommentData(data);
      });
  };

  useEffect(() => {
    fetchUserData();
    fetchPostData();
    fetchCommentData();
  }, []);

  const MyUser = (props) => {
    let user = props.user1;
    return (
      <ul
        onClick={() => {
          props.onClick();
        }}
        style={{ backgroundColor: "lightgrey", borderRadius: 8 }}
      >
        <li>
          <b>User Id : {user.id}</b>
        </li>
        <li>Name : {user.name}</li>
        <li>Username : {user.username}</li>
        <li>Street : {user.address.street}</li>
        <li>City : {user.address.city}</li>
        <li>Zipcode : {user.address.zipcode}</li>
        <li>Lat : {user.address.geo.lat}</li>
        <li>Lng : {user.address.geo.lng}</li>
        <li>Phone : {user.phone}</li>
        <li>Website : {user.website}</li>
        <li>Company name :{user.company.name}</li>
        <li>Company CatchPhrase : {user.company.catchPhrase}</li>
        <li>Bs : {user.company.bs}</li>
      </ul>
    );
  };

  const MyPost = (props) => {
    let post = { ...props.post1 };
    return (
      <ul
        onClick={() => {
          props.onClick();
        }}
        style={{ backgroundColor: "yellow", borderRadius: 8 }}
      >
        <li>
          <b>User Id : {post.userId}</b>
        </li>
        <li>Id : {post.id}</li>
        <li>Title : {post.title}</li>
        <li>Body : {post.body}</li>
      </ul>
    );
  };
  const Comments = (props) => {
    let comment = { ...props.comment1 };
    return (
      <ul style={{ backgroundColor: "green", borderRadius: 8 }}>
        <li>
          <b>User Id : {userID}</b>
        </li>
        <li>
          <b>Post Id : {comment.postId}</b>
        </li>
        <li>Body : {comment.body}</li>
      </ul>
    );
  };

  return (
    <div>
      <div class="scrolling-wrapper">
        {userData.map((user, index) => {
          return (
            <MyUser
              key={index}
              user1={user}
              onClick={() => setUserID(user.id)}
            />
          );
        })}
      </div>
      {userID ? (
        <div>
          <button onClick={() => setUserID(0)}> BACK To Users</button>
          <div class="scrolling-wrapper">
            {postData.map((post, index) => {
              if (userID === post.userId)
                return (
                  <MyPost
                    key={index}
                    post1={post}
                    onClick={() => {
                      setPostId(post.id);
                      console.log(post.id);
                    }}
                  />
                );
              else return null;
            })}
          </div>
        </div>
      ) : null}

      {userID && postId ? (
        <div>
          <button onClick={() => setPostId(0)}> BACK To Posts</button>
          <div class="scrolling-wrapper">
            {commentData.map((comment, index) => {
              if (userID && postId === comment.postId)
                return <Comments key={index} comment1={comment} />;
              else return null;
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Displaydata;
