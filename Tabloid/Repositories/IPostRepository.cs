using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAllPublishedPosts();
        //List<Post> GetAllPostsByUser(int userProfileId);
        //Post GetSinglePostById(int id);
        //void AddPost(Post post);
        //void DeletePost(int PostId);
        //Post EditPost(int id);
    }
}