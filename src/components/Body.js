import RestaurantCard from "./RestaurantCard";
// import resList from "../utils/MockData";
import { useState, useEffect } from "react";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.61610&lng=73.72860&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    setRestaurantList(
      json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );
  };


const handleFilter = () => {
  const filteredList = restaurantList.filter(
    (restaurant) => restaurant.rating > 4
  );
  setRestaurantList(filteredList);
};

// conditinal rendering-> rendering on the basis of conditional rendering.

return restaurantList.length === 0 ? (
  <h1>Loading..............</h1>
) : (
  <>
    <div className="filter">
      <div className="search-container">
        <input className="searchInput" type="text" />
        <button className="filter-btn" onClick={handleFilter}>
          Top Rated Restaurant
        </button>
      </div>
    </div>

    <div className="body">
      <div className="res-container">
        {restaurantList.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant.info} />
        ))}
      </div>
    </div>
  </>
)
};

export default Body;
