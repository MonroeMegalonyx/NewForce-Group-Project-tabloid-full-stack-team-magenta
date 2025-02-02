# Tabloid: The Blog Management Platform

## _Team Magenta Edition_

## Setup

1. Pull down this repo

1. Run the two scripts that are in the SQL folder. These will create the Tabloid database and add some test data. The database it creates is identitical to the prototype from the last MVC sprint, except now we're capturing the `FirebaseUserId` in the UserProfile table

1. Create a Firebase project for authentication:

   - Go to [Firebase](https://console.firebase.google.com/u/0/) and add a new project. You can name it whatever you want (Tabloid is a good name)
   - Go to the Authentication tab, click "Set up sign in method", and enable the Username and Password option.
   - Add at least two new users in firebase. Use email addresses that you find in the UserProfile table of your SQL Server database
   - Once firebase creates a UID for these users, copy the UID from firebase and update the `FirebaseUserId` column for the same users in your SQL Server database.
   - Click the Gear icon in the sidebar to go to Project Settings. You'll need the information on this page for the next few steps

1. Go to the `appSettings.Local.json.example` file. Replace the value for FirebaseProjectId with your own

1. Rename the `appSettings.Local.json.example` file to remove the `.example` extension. This file should now just be called `appSettings.Local.json`

1. Open your `client` directory in VsCode. Open the `.env.local.example` file and replace `__YOUR_API_KEY_HERE__` with your own firebase Web API Key

1. Rename the `.env.local.example` file to remove the `.example` extension. This file should now just be called `.env.local`

1. Install your dependencies by running `npm install` from the same directory as your `package.json` file

## Design
For this project, our team utilized both a wireframe and ERD to plan the final app design. Before building a full stack application, we worked in teams to develop a prototype in C# in the command line, then built a server side application using ASP.NET Core MVC before refactoring into the current full stack project in this repository.

|![ERD](/images/ERD.png)|
|---|
| *ERD of our database.* |

|![Wireframe](/images/Wireframe.png)|
|---|
| *Wireframe made using only whiteboard tools to plan layout and UX of application.* |
## Features

### Server Side - API
I created a RESTful Web API with C#/ .NET Core and connected it to a React front-end. The API had full CRUD funcationality for many components including Categories, Posts, and Tags.

|![APIs running in Swagger Console](/images/API-swagger.png)|
|---|
| *Screenshot of the APIs exposed by our application in the Swagger console.* |

|![More APIs in Swagger Console](/images/API-swagger2.png)|
|---|
| *Screenshot of more APIs exposed by our application in the Swagger console.* |

### Authentication
Authentication was integrated with Google Firebase to provide reliable and secure 3rd party login functionality. Authenticated users were also managed in the application database using Firebase's user keys to sync credentials.

|![Login Page](/images/Login.png)|
|---|
| *Screenshot of the login page showing how an existing user can sign in or a new user could register.* |
### Posts
Posts can be accessed once logged in. This feature will allow a user to view published posts from themselves and other users. A user can also see just a list of posts they created, including ones that haven't been approved or given a publication date yet. Users can edit or delete their own posts, but all users can read each published post. All posts appear with the most recently published shown first. 

On the details page, users can also chose to view comments if any have been left. Users can also create a new post by clicking the New Post button at the top of either page for posts. Posts are only published if given a publication date. This component is reused from the Edit Post form according to best practices.

|![Published Posts Page](/images/Posts.png)|
|---|
| *Screenshot of the posts page showing the list of published posts.* |

|![User Post Page](/images/User-Posts.png)|
|---|
| *Screenshot of the posts page showing the list of posts created by the logged in user.* |

|![Deatil Post Page](/images/Details-Post.png)|
|---|
| *Screenshot of the details page showing all the information about a post, with the options to edit or delete if the user is the author and view comments left by other users.* |

|![Edit Post Page](/images/Edit-Post.png)|
|---|
| *Screenshot of the edit page showing a post's information that can be edited by the user. Add a new post would look the same without the information prefilled* |

|![Comment Post Page](/images/Post-Comments.png)|
|---|
| *Screenshot of the comments page showing all the posts left by other users.* |

### Categories
Categories can managed by admin users. This feature lets users edit, delete, or add new categories to be used on an author's post. A category is required to be used for each post, so only categories that haven't been used yet can be deleted. However, all categories can be edited to something new while in use.

|![Categories Page](/images/Categories.png)|
|---|
| *Screenshot of the categories management page showing an alphabetically sorted list of categories.* |

### Tags
Tags can managed by admin users. This feature lets users edit, delete, or add new tags to be used on an author's post. A tag is an optional tool for each post, and multiple tags can be added to a single post.

|![Tag Page](/images/Tags.png)|
|---|
| *Screenshot of the tags management page showing an alphabetically sorted list of tags.* |
