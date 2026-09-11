import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import "./SingleGame.css";

export default function SingleGame() {
    const { id } = useParams();
    const { currentGame, loadingGame, gameError, getGameById } = useGlobalContext();

    useEffect(() => {
        getGameById(id);
    }, [id, getGameById]);

    if (loadingGame) {
        return (
            <div className="single-game-page d-flex justify-content-center align-items-center">
                <div className="text-center text-light">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Caricamento...</span>
                    </div>
                    <p className="mt-3 mb-0">Caricamento gioco...</p>
                </div>
            </div>
        );
    }

    if (gameError || !currentGame) {
        return (
            <div className="single-game-page">
                <div className="container py-5">
                    <div className="alert alert-danger" role="alert">
                        {gameError || "Gioco non trovato."}
                    </div>

                    <Link className="btn btn-light" to="/">
                        Torna ai Games
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="single-game-page text-light">
            <div className="container py-5">
                <Link
                    className="btn btn-outline-light btn-sm mb-4"
                    to="/"
                >
                    ← Torna allo Store
                </Link>

                <div className="row g-5 align-items-start">
                    <div className="col-lg-7">
                        <div className="single-game-cover overflow-hidden rounded-4">
                            <img
                                src={`https://picsum.photos/seed/${currentGame.id}/1200/800`}
                                className="w-100 h-100"
                                alt={currentGame.title}
                            />
                        </div>
                    </div>

                    <div className="col-lg-5">
                        <div className="py-lg-3">
                            <h1 className="display-5 fw-bold mb-3">
                                {currentGame.title}
                            </h1>

                            <p className="text-secondary fs-5 mb-4">
                                {currentGame.description || "Nessuna descrizione disponibile."}
                            </p>

                            <div className="d-flex flex-wrap gap-2 mb-4">
                                {currentGame.genres?.length > 0 &&
                                    currentGame.genres.map((genre) => (
                                        <span
                                            className="badge rounded-pill text-bg-secondary px-3 py-2"
                                            key={genre.id}
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                            </div>

                            <h3 className="fw-semibold mb-4">
                                {currentGame.price != null
                                    ? `${Number(currentGame.price).toFixed(2)} €`
                                    : "Prezzo non disponibile"}
                            </h3>

                            <div className="single-game-info">
                                <div className="d-flex justify-content-between gap-3 py-3 border-bottom border-secondary">
                                    <span className="text-secondary">Sviluppatore</span>
                                    <span className="text-end">
                                        {currentGame.developer?.name ?? "Nessuno"}
                                    </span>
                                </div>

                                <div className="d-flex justify-content-between gap-3 py-3 border-bottom border-secondary">
                                    <span className="text-secondary">Data di uscita</span>
                                    <span className="text-end">
                                        {currentGame.releaseDate ?? "Non disponibile"}
                                    </span>
                                </div>

                                <div className="d-flex justify-content-between gap-3 py-3 border-bottom border-secondary">
                                    <span className="text-secondary">Piattaforme</span>

                                    <div className="text-end">
                                        {currentGame.platforms?.length > 0
                                            ? currentGame.platforms
                                                .map((platform) => platform.name)
                                                .join(", ")
                                            : "Nessuna piattaforma"}
                                    </div>
                                </div>
                            </div>

                            <button className="btn btn-light w-100 fw-semibold py-3 mt-4">
                                Acquista ora
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
