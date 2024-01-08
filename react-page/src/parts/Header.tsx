import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate()

    return (
        <>
            <header>
                <Navbar bg="primary">
                    <Container>
                        <Navbar.Brand onClick={event => navigate("/")}>Saku Shirakura</Navbar.Brand>
                        <NavDropdown title="Clocks" id={`navbar`}>
                            <NavDropdown.Item onClick={event => {navigate("/star_orbit_clock/")}}>星の軌道時計(適当)</NavDropdown.Item>
                        </NavDropdown>
                        <Nav onClick={event => {navigate("/signup")}}>Signup</Nav>
                        <Nav onClick={event => {navigate("/login")}}>Login</Nav>
                    </Container>
                </Navbar>
                <div style={{paddingBottom: "20px"}}/>
            </header>
        </>
    );
}