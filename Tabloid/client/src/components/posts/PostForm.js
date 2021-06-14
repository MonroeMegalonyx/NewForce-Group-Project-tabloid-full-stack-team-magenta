import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../.././providers/PostProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Redirect } from "react-router-dom";

const PostForm = () => {
  const { addPost, response, setResponse } = useContext(PostContext);
  // get the categories for a dropdown selector
  const { category, getAllCategories } = useContext(CategoryContext);

  // get the logged in user from session storage
  const loggedInUserId = sessionStorage.getItem("userProfile");
  // set the local timezone for saving timestamp
  var tzoffset = new Date().getTimezoneOffset() * 60000; //gets offset in milliseconds

  //const history = useHistory();
  // Define the inital state of a new post
  const [postState, setPost] = useState({
    title: null,
    content: null,
    imageLocation: "http://lorempixel.com/920/360/",
    createDateTime: null,
    publishDateTime: null,
    isApproved: true,
    categoryId: 0,
    userProfileId: 0,
  });

  /*
    Reach out to the world and get customers state
    and locations state on initialization.
    */
  useEffect(() => {
    setResponse(0);
    getAllCategories();
  }, []);

  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
    const newPost = { ...postState };
    /* Post is an object with properties.
      Set the property to the user entered value
      using object bracket notation. */
    newPost[event.target.id] = event.target.value;
    // update state
    setPost(newPost);
  };

  // Stop auto refreshing
  const handleClickSavePost = (event) => {
    event.preventDefault(); //Prevents the browser from submitting the form
    const newPost = { ...postState };

    // extract the userID from the loggedinuser string
    function extractId() {
      var str = loggedInUserId;
      var matches = str.match(/\d+/g);
      return matches[0];
    }

    newPost.userProfileId = extractId();

    // extract a timestamp for the SQL db
    newPost.createDateTime = new Date(Date.now() - tzoffset).toISOString();
    //   .slice(0, -1)
    //   .replace('T', ' ');
    // newPost.createDateTime = "6/10/2021 3:36:50 PM";

    if (
      newPost.title === null ||
      newPost.content === null ||
      newPost.dateCreateTime === null ||
      newPost.categoryId === 0 ||
      newPost.userProfileId === 0
    ) {
      window.alert(
        "Something is wrong. Please fill in all required information"
      );
    } else {
      addPost(newPost);
    }
  };

  // Hack to wait for server to give id then redirect to the details page, using a .then in the submit function did not let the response state update in time to redirect

  if (response > 0) {
    //console.log(response);
    //reset response
    setResponse(null);
    return <Redirect to={'/posts/details/'+response} />;
  } else {
    return (
      <form className="postForm">
        <h2 className="postForm__title">New Post</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="title">Post title:</label>
            <input
              type="text"
              id="title"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="form-control"
              placeholder="Post title"
              value={postState.title}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="content">Post content:</label>
            <input
              type="text"
              id="content"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="form-control"
              placeholder="Content of post"
              value={postState.content}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="imageLocation">
              URL for header image (optional):
            </label>
            <input
              type="text"
              id="imageLocation"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="form-control"
              placeholder="Image URL"
              value={postState.imageLocation}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="publishDateTime">
              Publication Date (optional):
            </label>
            <input
              type="datetime-local"
              id="publishDateTime"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="form-control"
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="categoryId">Pick a Category: </label>
            <select
              onChange={handleControlledInputChange}
              defaultValue={postState.categoryId}
              name="categoryId"
              id="categoryId"
              className="form-control"
            >
              <option value="0">Select a category</option>
              {category
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
        </fieldset>
        <button className="btn btn-primary" onClick={handleClickSavePost}>
          Save
        </button>
      </form>
    );
  }
};
export default PostForm;
