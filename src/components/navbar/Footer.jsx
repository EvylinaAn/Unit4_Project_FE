import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { MdOutlineEmail } from "react-icons/md";
import { SiInstagram } from "react-icons/si";
import { PiFacebookLogoBold } from "react-icons/pi";
import { FaPinterestP } from "react-icons/fa";


export default function Footer() {
  return (
    <Navbar bg="light" data-bs-theme="light" className="fixed-bottom">
      <Container>
        <Nav className="me-auto justify-content-around w-100">
          <Nav.Link target='_blank' href="mailto: thatfashiontale@gmail.com">
            <MdOutlineEmail style={{color: "rgb(74, 62, 53)"}} />
          </Nav.Link>
          <Nav.Link target='_blank'  href="https://www.instagram.com/thatfashiontale/">
            <SiInstagram style={{color: "rgb(74, 62, 53)"}} />
          </Nav.Link>
          <Nav.Link style={{color: "rgb(74, 62, 53)"}}  href="/">
          &#x2628; ThatFashionTale
          </Nav.Link>
          <Nav.Link target='_blank' href="https://www.facebook.com/evyan05">
            <PiFacebookLogoBold style={{color: "rgb(74, 62, 53)"}}/>
          </Nav.Link>
          <Nav.Link target='_blank' href="https://www.pinterest.co.uk/evyan_thatfashiontale/">
          <FaPinterestP style={{color: "rgb(74, 62, 53)"}}/>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
