import React from "react";
import { Link } from "react-router-dom";

const CreateApartmentButton = () => {
  return (
    <React.Fragment>
      <Link to="/addApartment" className="btn btn-lg btn-info">
        Add new Apartment
      </Link>
    </React.Fragment>
  );
};

export default CreateApartmentButton;
