import RestaurantCard from "./RestaurantCard";
// import resList from "../utils/MockData";
import { useState, useEffect } from "react";
import Card from "./shimmer";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);


  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

  // console.log('anuj')

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.61610&lng=73.72860&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    setRestaurantList(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

    setFilteredRestaurant(
      json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );
  };

  const handleFilter = () => {
    const filteredList = restaurantList.filter(
      (restaurant) => restaurant?.info.avgRating > 4.0
    );
    setFilteredRestaurant(filteredList);
  };

  const handleSearch = () => {  
    const filteredRes = restaurantList.filter((res) =>
      res?.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    // console.log(searchText)
    setFilteredRestaurant(filteredRes);
  };

  // conditinal rendering-> rendering on the basis of conditional rendering.

  return restaurantList.length === 0 ? (
    <>
      <Card />
    </>
  ) : (
    <>
          <div className="body">

      <div className="filter">
          <input
            className="searchInput"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button onClick={handleSearch}>search</button>

          <button className="filter-btn" onClick={handleFilter}>
            Top Rated Restaurant 
          </button>
      </div>

        <div className="res-container">
          {filteredRestaurant.map((restaurant) => (
            <RestaurantCard
              key={restaurant.info.id}
              resData={restaurant.info}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Body;
