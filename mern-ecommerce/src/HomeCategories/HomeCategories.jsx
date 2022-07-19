import React from "react";
import {
  categoriesData1,
  categoriesData2,
  categoriesData3,
  categoriesData4,
} from "../Fakedata/FakeHomeCategoriesData";
import HomeCategoriesDetails from "./HomeCategoriesDetails";
import "./HomeCategories.css";
import HomeCategoriesTwo from "./HomeCategoriesTwo";

const HomeCategories = () => {
  return (
    <div className="HomeCategories">
      {categoriesData1.map((categoryData) => (
        <HomeCategoriesDetails
          key={categoryData.name}
          categoryData={categoryData}
        />
      ))}
      {categoriesData2.map((categoryDataTwo) => (
        <HomeCategoriesTwo
          key={categoryDataTwo.name}
          categoryDataTwo={categoryDataTwo}
        ></HomeCategoriesTwo>
      ))}

      {categoriesData3.map((categoryData) => (
        <HomeCategoriesDetails
          key={categoryData.name}
          categoryData={categoryData}
        ></HomeCategoriesDetails>
      ))}
      {categoriesData4.map((categoryDataTwo) => (
        <HomeCategoriesTwo
          key={categoryDataTwo.name}
          categoryDataTwo={categoryDataTwo}
        ></HomeCategoriesTwo>
      ))}
    </div>
  );
};

export default HomeCategories;
