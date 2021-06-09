import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import Category from "./Category";
import { NavLink as RRNavLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, } from "reactstrap";

const CategoryList = () => {
  const { category, getAllCategories } = useContext(CategoryContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);


  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="container">
      <div>
        <Navbar color="light" light expand="md">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/category/create">
                  Create Category
                </NavLink>
                </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

      </div>
      <div className="row justify-content-center">
        <div className="cards-column">
          {category.sort((a, b) => a.name.localeCompare(b.name)).map((thisCategory) => (
            <Category key={thisCategory.id} category={thisCategory} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryList;