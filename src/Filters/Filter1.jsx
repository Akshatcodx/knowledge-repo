import React, { Fragment, useEffect, useState } from "react";
import { getAllproducts } from "./FilterApi";
import ProductCard from "./ProductCard";
import FilterSection1 from "./FilterSection1";
import FilterSection2 from "./FilterSection2";
import FilterSection3 from "./FilterSection3";
import HeaderFilter from "./HeaderFilter";
// https://fakeapi.platzi.com/en/rest/products-filter/
const buildQueryFromObject = (filters) => {
  const queryParams = [];
  for (let key in filters) {
    queryParams.push(`${key}=${filters[key]}`);
  }
  return queryParams.join("&");
  // for array
  //   const arr = ["value1", "value2" ,"value3" ,"value4"];
  // const convert = (arr) => {
  // console.log(arr);
  // const queryparams = [];
  //  arr.map((val)=>queryparams.push(`category=${val}`));
  //  queryparams.join("&");
  //  console.log(queryparams.join("&"))
  // }
};
export const buildQueryFromSelectedFilters = (queryData) => {
  const queryParts = [];

  for (const key in queryData) {
    const value = queryData[key];

    if (Array.isArray(value)) {
      if (value.length > 0) {
        queryParts.push(value.map((item) => `${key}=${item}`).join("&"));
      }
    } else if (typeof value === "object") {
      const subQueryParts = [];
      for (const subKey in value) {
        const subValue = value[subKey];
        if (subValue !== "") {
          subQueryParts.push(`${subKey}=${subValue}`);
        }
      }
      if (subQueryParts.length > 0) {
        queryParts.push(subQueryParts.join("&"));
      }
    } else if (value !== "") {
      queryParts.push(`${key}=${value}`);
    }
  }

  return `${queryParts.join("&")}`;
};

const Filter1 = () => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [headerFilters, setHeaderFilters] = useState({
    name: "",
    sortBy: "newest",
  });
  const [filters, setFilters] = useState({});
  const [filters2, setFilters2] = useState({
    category: "",
    gender: "",
    interests: [],
    salaryRange: {
      salary_amount_currency: "",
      range: "",
      salary_amount_type: "",
      salary_amount_max: "",
      salary_amount_min: "",
    },
  });
  useEffect(() => {
    // const query = `category=${categoryFilter}`;
    // const query = buildQueryFromObject(filters);
    // const query = buildQueryFromSelectedFilters(filters2);
    const query = `name=${headerFilters?.name}&sortBy=${headerFilters?.sortBy}`;
    console.log(query, "qqqqq");
    getAllproducts(query)
      .then((res) => {
        console.log(res?.data);
        const onlyTen = res?.data?.products?.filter((_, idx) => idx < 10);
        setProducts(res?.data?.products);
      })
      .catch((err) => console.log(err));
  }, [categoryFilter, filters, filters2, headerFilters]);
  console.log(products, "products");
  const handleSelectFilter = (e) => {
    const { value, name, type } = e.target;
    if (type === "radio") {
      const temp = { ...filters2 };
      if (temp.gender === value) {
        temp[name] = "";
      } else {
        temp[name] = value;
      }
      setFilters2(temp);
    } else if (type === "checkbox") {
      const temp = [...filters2[name]];
      const index = temp.findIndex((val) => val === value);
      if (index === -1) {
        temp.push(value);
      } else {
        temp.splice(index, 1);
      }
      setFilters2({
        ...filters2,
        [name]: [...temp],
      });
    } else {
      setFilters2({
        ...filters2,
        [name]: value,
      });
    }
  };
  console.log(filters2, "filters2");
  return (
    <div>
      Filter 1
      {/* <FilterSection3 filters2={filters2} setFilters2={setFilters2} /> */}
      <HeaderFilter
        setHeaderFilters={setHeaderFilters}
        headerFilters={headerFilters}
      />
      {/* <FilterSection1
        setCategoryFilter={setCategoryFilter}
        categoryFilter={categoryFilter}
      /> */}
      {/* <FilterSection2 filters={filters} setFilters={setFilters} /> */}
      {products.length > 0
        ? products.map((curProduct, idx) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                width: "100%",
              }}
              key={idx}
            >
              <ProductCard curProduct={curProduct} />
            </div>
          ))
        : "No data found"}
    </div>
  );
};

export default Filter1;
