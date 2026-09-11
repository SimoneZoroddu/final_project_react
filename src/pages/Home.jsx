import { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import "./Home.css";

export default function Home() {
    const { games, loadingGames, gamesError, getGames } = useGlobalContext();
    const [selectedGameId, setSelectedGameId] = useState(null);

    const selectedGame =
        games.find((game) => game.id === selectedGameId) ??
        games[0] ??
        null;

    if (loadingGames) {
        return (
            <div className="home-store min-vh-100 d-flex justify-content-center align-items-center text-light">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Caricamento...</span>
                    </div>
                    <p className="mt-3 mb-0">Caricamento giochi...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="home-store min-vh-100 text-light py-4 py-lg-5">
            <div className="container-xl">
                <div className="mb-4">
                    <Link to="/" className="text-white text-decoration-none fw-bold fs-4">
                        STORE
                    </Link>
                </div>

                <section className="store-sale-banner rounded-4 overflow-hidden mb-4 mb-lg-5 shadow-sm">
                    <div className="store-sale-banner-content d-flex justify-content-center align-items-center text-center p-4">
                        <div>
                            <p className="text-uppercase small fw-semibold mb-2">Game Store</p>
                            <h1 className="display-5 fw-bold mb-2">SALDI DI FINE ESTATE</h1>
                            <p className="mb-0 text-white-50">
                                Scopri i giochi disponibili e scegli il prossimo titolo da giocare.
                            </p>
                        </div>
                    </div>
                </section>

                {gamesError && (
                    <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
                        <span>{gamesError}</span>
                        <button className="btn btn-outline-danger btn-sm" onClick={getGames}>
                            Riprova
                        </button>
                    </div>
                )}

                {!gamesError && games.length === 0 && (
                    <div className="alert alert-secondary" role="alert">
                        Non ci sono giochi disponibili.
                    </div>
                )}

                {!gamesError && selectedGame && (
                    <section className="row g-3 g-lg-4 align-items-stretch">
                        <div className="col-lg-9">
                            <Link
                                to={`/single-game/${selectedGame.id}`}
                                className="text-decoration-none text-white"
                            >
                                <article className="featured-game rounded-4 overflow-hidden shadow-lg h-100">
                                    <div className="featured-game-media h-100 d-flex align-items-end p-4 p-md-5">
                                        <div className="featured-game-content">
                                            <span className="badge rounded-pill text-bg-light text-dark mb-3">
                                                In evidenza
                                            </span>

                                            <h2 className="display-5 fw-bold mb-3">{selectedGame.title}</h2>

                                            <p className="lead mb-4 text-white-50">
                                                {selectedGame.description || "Nessuna descrizione disponibile."}
                                            </p>

                                            <div className="d-flex flex-wrap gap-2 gap-md-3 small">
                                                <span className="badge rounded-pill text-bg-dark px-3 py-2">
                                                    {selectedGame.developer?.name ?? "Sviluppatore non disponibile"}
                                                </span>
                                                <span className="badge rounded-pill text-bg-dark px-3 py-2">
                                                    {selectedGame.price != null
                                                        ? `${Number(selectedGame.price).toFixed(2)} €`
                                                        : "Prezzo non disponibile"}
                                                </span>
                                                <span className="badge rounded-pill text-bg-dark px-3 py-2">
                                                    {selectedGame.releaseDate ?? "Data non disponibile"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </div>

                        <div className="col-lg-3">
                            <div className="game-list d-flex flex-column gap-2 h-100 pe-lg-1">
                                {games.map((game) => (
                                    <button
                                        key={game.id}
                                        type="button"
                                        className={`game-option btn text-start border-0 rounded-3 p-2 p-lg-3 ${
                                            selectedGame.id === game.id ? "active" : ""
                                        }`}
                                        onClick={() => setSelectedGameId(game.id)}
                                    >
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="game-thumb rounded-2 flex-shrink-0 d-flex align-items-center justify-content-center fw-bold fs-4">
                                                {game.title?.charAt(0)?.toUpperCase() || "G"}
                                            </div>

                                            <div className="overflow-hidden flex-grow-1">
                                                <div className="fw-semibold text-white text-truncate mb-1">
                                                    {game.title}
                                                </div>
                                                <div className="small text-white-50 game-option-description">
                                                    {game.description || "Nessuna descrizione"}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}
