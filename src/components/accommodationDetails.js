import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../constants/api";
import axios from "axios";

export default function AccommodationDetails() {
  const [accommodation, setAccommodation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let history = useNavigate();

  const { id } = useParams();

  if (!id) {
    history.push("/");
  }

  const url = api + "accommodations/" + id + "/?populate=*";

  useEffect(
    function () {
      async function fetchAccommodation() {
        try {
          const response = await axios.get(url);
          setAccommodation(response.data.data);
          console.log(response.data.data);
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      fetchAccommodation();
    },
    [url]
  );

  if (loading) {
    return <div className="loader"></div>;
  }
  if (error) {
    return <div>Error: An error has occured.</div>;
  }

  return (
    <>
      <section className="details">
        <h1>{accommodation.attributes.name}</h1>
        <div className="details__container">
          <img className="details__image" src={accommodation.attributes.image.data[0].attributes.url} alt={accommodation.attributes.image.data[0].attributes.alternativeText}></img>
          <div className="details__subtext">
            <p>{accommodation.attributes.location}</p>
            <p className="details__subtext__price">{accommodation.attributes.price} NOK per night</p>
          </div>
        </div>
        <p className="details__description">{accommodation.attributes.description}</p>
        <div className="centered">
          <button>Enquiry</button>
        </div>
      </section>
    </>
  );
}
