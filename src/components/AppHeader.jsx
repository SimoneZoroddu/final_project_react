import { Link, NavLink } from "react-router-dom";

export default function AppHeader() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Game Store
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Apri navigazione"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    Games
                                </NavLink>
                            </li>
                        </ul>
                        <div className="ms-auto">
                            <a
                                className="btn btn-outline-light"
                                href="http://localhost:8080/login"
                            >
                                Login Admin
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
