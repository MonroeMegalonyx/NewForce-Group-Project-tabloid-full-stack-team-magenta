using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();

        void Add(Category category);

        void Update(Category category);

        Category GetById(int id);

        void Delete(int id);

    }
}