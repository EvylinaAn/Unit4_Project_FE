import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom"
import "./navbar.css"

export default function MainNavbar() {
  return (
    <Navbar expand="lg" className="my-nav mb-3">
      <Container>
        <Link to="/">
          <Navbar.Brand href="#home">That Fashion Tale</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbarLinks">
            <Nav.Link href="/looks">Looks</Nav.Link>
            <NavDropdown title="Blogs" id="basic-nav-dropdown" style={{ paddingLeft: '1.9vmin'}}>
              <NavDropdown.Item href="/category">Collection</NavDropdown.Item>
              <NavDropdown.Item href="/travel">Travel</NavDropdown.Item>
              <NavDropdown.Item href="/fashion">Fasihon & Lifestyle</NavDropdown.Item>
              <NavDropdown.Item href="/beauty">Beauty</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Socials" id="basic-nav-dropdown" style={{ paddingLeft: '1.5vmin'}}>
              <NavDropdown.Item href="https://www.instagram.com/thatfashiontale/" target='_blank'>Instagram</NavDropdown.Item>
              <NavDropdown.Item href="https://www.facebook.com/evyan05" target='_blank'>Facebook</NavDropdown.Item>
              <NavDropdown.Item href="https://www.pinterest.co.uk/evyan_thatfashiontale/" target='_blank'>Pinterest</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link style={{ paddingLeft: '2vmin'}} href="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

