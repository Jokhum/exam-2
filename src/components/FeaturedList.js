import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../constants/api";

function FeaturedList() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(api + "accommodations/?populate=*");

        if (response.ok) {
          const json = await response.json();

          setAccommodations(json.data);
        } else {
          setError("An error has occured!");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  if (loading) {
    return <div className="loader"></div>;
  }
  if (error) {
    return <div>Error: An error has occured.</div>;
  }

  return (
    <>
      {accommodations
        .filter((accommodations) => accommodations.attributes.featured === true)
        .map((accommodation) => (
          <section className="featuredCard" key={accommodation.id}>
            <Link to={`hotels/accommodation/${accommodation.id}`}>
              <img src={accommodation.attributes.image.data[0].attributes.url} alt={accommodation.attributes.image.data[0].attributes.alternativeText}></img>
              <h2 className="featuredCard__item__title">{accommodation.attributes.name}</h2>
              <p className="featuredCard__item__type">{accommodation.attributes.type}</p>
              <p className="featuredCard__item__description>">{accommodation.attributes.description}</p>
            </Link>
          </section>
        ))}
    </>
  );
}

export default FeaturedList;
