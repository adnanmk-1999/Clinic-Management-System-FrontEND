import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import "./footer.css";

const FooterPage = () => {
  return (
    <div className="footerBackground">
    <MDBFooter color="primary" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">REAL DOCTOR IS MUST</h5>
            <p>
            We understand that when it comes to health, depending solely on AI can be risky, 
            that is why we have come up with an innovative solution which will make use of the 
            benefits of AI as well as the real doctor. Using our app you will be able to talk with AI powered 
            medical chatbot, who will understand your disease and will auto generate the medical 
            prescription for you.
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Follow Us On</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Facebook</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Twitter</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Instagram</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">LinkedIn</a>
              </li>
            </ul>
            <p>Talk to Dr.Zee, your AI virtual doctor, 
              and get instant medical consultation & 
              medicine prescription approved by real 
              doctor.</p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid className="copyright">
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> HealthTech.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
    </div>
  );
}

export default FooterPage;