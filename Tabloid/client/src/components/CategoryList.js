import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../providers/CategoryProvider";
import Category from "./Category";

const CategoryList = () => {
    const { category, getAllCategories } = useContext(CategoryContext);
  
    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="cards-column">
              {category.map((thisCategory) => (
                <Category key={thisCategory.id} category={thisCategory} />
              ))}
            </div>
          </div>
        </div>
    );
}

export default CategoryList;