import React from "react";
import { MDBCol } from "mdbreact";
import "./search.css"

const SearchPage = () => {
  return (
    <div> 
    <MDBCol md="">
      <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
    </MDBCol>
    </div>
  );
}

export default SearchPage;