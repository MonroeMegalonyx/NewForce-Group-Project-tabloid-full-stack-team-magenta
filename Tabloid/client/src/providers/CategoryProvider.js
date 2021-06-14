import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import "firebase/auth";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {

    const apiUrl = "/api/quote";
    const { getToken } = useContext(UserProfileContext);
    const [category, setCategory] = useState([]);


    const getAllCategories = () =>
        getToken().then((token) =>
            fetch("/api/category", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(setCategory));

    const addCategory = (category) =>
        getToken().then((token) =>
            fetch("/api/category/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(category)
            }));

<<<<<<< HEAD
    const updateCategory = (categoryId) =>
        getToken().then((token) =>
            fetch(`/api/category/${categoryId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }, body: JSON.stringify(category)
            }).then(getAllCategories));




    return (
        <CategoryContext.Provider value={{ category, getAllCategories, addCategory, updateCategory }}>
=======
    const deleteCategory = (categoryId) =>
        getToken().then((token) =>
            fetch(`/api/category/${categoryId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`                
                }}).then(getAllCategories));

    return (
        <CategoryContext.Provider value={{ category, getAllCategories, addCategory, deleteCategory }}>
>>>>>>> main
            {props.children}
        </CategoryContext.Provider>
    );
}