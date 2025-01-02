import React, {useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import '../styles/Navbar.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Dropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const location = useLocation(); // Ottieni il percorso corrente

    useEffect(() => {
        // Forza un controllo ogni volta che il percorso cambia
        //console.log('Percorso cambiato:', location.pathname);
    }, [location]);

    const handleLogout = () => {
        logout();
    }


    return (
        <div className="navbar">
            <Link to="/">
                <div className="logo">
                    <div id="valigia-logo"></div>
                    <div id="scritta-logo"></div>
                </div>
            </Link>
            {isAuthenticated && (
                <Dropdown drop="down">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {/*<i className="bi bi-passport"></i>*/}
                        <i className="bi bi-person-fill"></i>
                    </Dropdown.Toggle>

                    {/* Usa la classe CSS personalizzata per il menu */}
                    <Dropdown.Menu className="dropdown-menu-custom">
                        <Dropdown.Item as={Link} to="/profile">My profile</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/main">My trips</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as={Link} to="/" onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )}
            {!isAuthenticated && location.pathname !== '/logout' && (<Link to="/login" className="nav-right">Login</Link>)}
            </div>

                );
            }

export default Navbar;
