import { useState } from 'react'
import { Navbar, Nav, Form, Button, InputGroup } from 'react-bootstrap'

import { useLocation, Link, useHistory } from 'react-router-dom'


const Header = (props) => {
    let { pathname } = useLocation();
    const [q, setQ] = useState("");
    const history = useHistory();

    const searchForm = function(e){
        e.preventDefault();
        // location.href = "/search/" + q;
        history.push("/post/?q="+ q)
    }

    return (
        <div>
            <div className="text-center">
                <a href="/">
                    <img src="/images/LifestyleLogo.png" alt=""/>
                </a>
            </div>
            <Navbar bg="primary" className="navbar-dark">
                <div className="container">
                    <Nav>
                    <Nav.Link as={Link} to="/" className={pathname === "/" ? "active" : ""}>
                        <i className="fa fa-home"></i> Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/post" className={pathname === "/post" ? "active" : ""}>All Posts</Nav.Link>
                    <Nav.Link as={Link} to="/post-management"  className={pathname === "/post-management" ? "active" : ""}>Posts Management</Nav.Link>
                    </Nav>
                    <Form inline onSubmit={searchForm}>
                        <InputGroup>
                            <Form.Control
                            placeholder="Search"
                            aria-label="Search"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            />
                            <InputGroup.Append>
                            <Button variant="outline-light"><i className="fa fa-search"></i></Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </div>
            </Navbar>
        </div>
    );

}

export default Header;