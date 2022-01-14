import { Carousel } from "react-bootstrap";
import "./carousel.css" 

const Carousel1 = () => {
    return (
        <>
        <div className="carouselSize">
        <Carousel fade>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://s3-eu-west-1.amazonaws.com/intercare-web-public/wysiwyg-uploads%2F1580196666465-doctor.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>Multiple data backups</h3>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/doctor-holding-stethoscope-7523-f1a9a751cae1595d78e45e2478e4b12a@1x.jpg"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>Multi-level security checks</h3>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://www.juniordoctors.eu/themes/custom/ejd/images/ejd-home-header.jpg"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>Stringent data privacy policies</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </div>
        </>
    );
  }
  
  export default Carousel1;