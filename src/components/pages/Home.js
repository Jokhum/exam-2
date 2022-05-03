import React from "react";
import Heading from "../Heading";
import FeaturedList from "../FeaturedList";

function Home() {
  return (
    <>
      <Heading title="Welcome to Holidaze!" />
      <p>We are a leading accommodations booking company based in Lillehammer, Norway and we can make your vacation dreams come through!</p>
      <p>
        If your looking for low spending or high quality living, it does not matter, go right ahead and check our accommodation list for our full selection or take a quick peak at the featured hotel
        listed below!
      </p>
      <h2>Featured Accommodations</h2>
      <div className="featured">
        <FeaturedList />
      </div>
    </>
  );
}

export default Home;
