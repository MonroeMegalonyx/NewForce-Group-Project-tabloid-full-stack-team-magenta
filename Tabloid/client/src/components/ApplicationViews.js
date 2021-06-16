import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import PostList from "./posts/PostList";
import PostForm from "./posts/PostForm";
import PostDetail from "./posts/PostDetail";
import UserPostList from "./posts/UserPosts";
import TagList from "./tagComponents/TagList";
import AddTagForm from "./tagComponents/AddTagForm"
import CategoryList from "./Category/CategoryList"
import CreateCategory from "./Category/AddCategory"
import EditCategory from "./Category/EditCategory";
import EditTagForm from "./tagComponents/EditTagForm"

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/new" exact>
          {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/details/(\d+)" exact>
          {isLoggedIn ? <PostDetail /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/user" exact>
          {isLoggedIn ? <UserPostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category" exact>
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category/create" exact>
          {isLoggedIn ? <CreateCategory /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category/edit/:categoryId(\d+)" exact>
          {isLoggedIn ? <EditCategory /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tags" exact>
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/tags/addForm" exact>
          {isLoggedIn ? <AddTagForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tags/edit/(\d+)" exact>
          {isLoggedIn ? <EditTagForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};
