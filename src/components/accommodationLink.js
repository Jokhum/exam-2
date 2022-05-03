import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function AccommodationLink({ id, name }) {
  return (
    <Link to={`hotels/${id}`}>
      <h2>{name}</h2>
    </Link>
  );
}

AccommodationLink.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default AccommodationLink;
