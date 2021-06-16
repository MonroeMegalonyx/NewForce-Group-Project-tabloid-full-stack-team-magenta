import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../.././providers/PostProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Redirect } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import Button from "reactstrap/lib/Button";


// Consider: What is different when we add an animal vs. edit? In edit mode, we should have an animalId in the URL. Otherwise, it is a new animal.

const PostForm = () => {
  // Get the content for posts to add or edit, and check the Id from response of a newly added post
  const { post, addPost, getSinglePost, editPost, response, setResponse } = useContext(PostContext);
  // Get the categories for a dropdown selector in form
  const { category, getAllCategories } = useContext(CategoryContext);

  // Get the logged in user from session storage to save as author Id
  const loggedInUser = sessionStorage.getItem("userProfile");
  // Function to set the local timezone for saving timestamp
  var tzoffset = new Date().getTimezoneOffset() * 60000; //gets offset in milliseconds

  // Define the inital state of a new post
  const [postState, setPost] = useState({
     title: null,
     content: null,
     imageLocation: null,
  //   createDateTime: null,
     publishDateTime: null,
  //   isApproved: true,
     categoryId: 0,
  //   userProfileId: 0,
  });

  // For edit, use the prop post to update state
  // const [postState, setPost] = useState({});

  // Wait for data before Save button is active
  const [isLoading, setIsLoading] = useState(true);

  // Get the Id of an existing post from URL for editing
  const postId = useParams()[0];
  const history = useHistory();
  
  // When the field is changed, update the state
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
    const newPost = { ...postState };
    /* Post is an object with properties.
      Set the property to the user entered value
      using object bracket notation. */
    newPost[event.target.id] = event.target.value;
    // Update original state with new values from user input 
    setPost(newPost);
  };

  const handleClickSavePost = (event) => {
    event.preventDefault(); // Prevents the browser from submitting the form
    const newPost = { ...postState };
    if (
      typeof newPost.title ==='undefined' ||
      typeof newPost.content ==='undefined' ||
      typeof newPost.categoryId ==='undefined' ||
      newPost.title ==="" ||
      newPost.content ==="" ||
      newPost.categoryId ==0
    ) {
      window.alert(
        "Something is wrong. Please fill in all required information"
      );
    } else { 
      //disable the button - no extra clicks
      setIsLoading(true);
      if (postId){
        // PUT - update
        
        editPost(postId, newPost).then(() => history.push(`/posts/details/${postId}`))
      } else {
        // POST - add
        // Extract the userID from the loggedinuser string
        function extractId() {
          var str = loggedInUser;
          var matches = str.match(/\d+/g);
          return matches[0];
        }
        newPost.userProfileId = extractId();
        
        // Extract a timestamp for the SQL DB
        newPost.createDateTime = new Date(Date.now() - tzoffset).toISOString();

        // Automatically approve all new posts
        newPost.isApproved = true;
        // Now add the new Post with the author and created time data
        
        addPost(newPost);
      }
    }
  };

  // Load categories on initialization. If a postId is in the URL, get the post content too
  useEffect(() => {
    //setResponse(0);
    getAllCategories().then(() => {
      if (postId){
        getSinglePost(postId)
        .then(post => {
            
          setPost(post)
            setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    });
  }, []);

  // Hack to wait for server to give id then redirect to the details page, using a .then in the submit function did not let the response state update in time to redirect

  if (response > 0) {
    //console.log(response);
    //reset response
    //setResponse(0);
    return <Redirect to={'/posts/details/'+response} />;
  } else {
    return (
      <form className="postForm">
        {postId ? <h2 className="postForm__title">Edit Post</h2> : <h2 className="postForm__title">New Post</h2>}
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
              defaultValue={postState.title}
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
              defaultValue={postState.content}
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
              defaultValue={postState.imageLocation}
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
              defaultValue={postState.publishDateTime}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="categoryId">Pick a Category: </label>
            <select
              onChange={handleControlledInputChange}
              value={postState.categoryId}
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
        <Button className="btn btn-primary" disabled={isLoading} onClick={handleClickSavePost}>
        {postId ? <>Save Post</> : <>Add Post</>}
        </Button>
        <Button onClick={() => history.push("/posts")}>Cancel</Button>
      </form>
    );
  }
};
export default PostForm;
