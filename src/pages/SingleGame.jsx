import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

export default function SingleGame() {
    const { id } = useParams();
    const { currentGame, loadingGame, gameError, getGameById } = useGlobalContext();

    useEffect(() => {
        getGameById(id);
    }, [id, getGameById]);

    if (loadingGame) {
        return (
            <div className="container mt-4 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Caricamento...</span>
                </div>
                <p className="mt-3">Caricamento gioco...</p>
            </div>
        );
    }

    if (gameError || !currentGame) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    {gameError || "Gioco non trovato."}
                </div>

                <Link className="btn btn-secondary" to="/">
                    Torna ai Games
                </Link>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="card shadow overflow-hidden">
                <div className="row g-0">
                    <div className="col-md-4 p-0 d-flex align-items-center">
                        <img
                            src={`https://picsum.photos/seed/${currentGame.id}/600/800`}
                            className="img-fluid rounded-start w-100 game-detail-image"
                            alt={currentGame.title}
                        />
                    </div>

                    <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title">{currentGame.title}</h1>

                            <p className="card-text">
                                <strong>Descrizione:</strong>
                            </p>
                            <p>{currentGame.description || "Nessuna descrizione"}</p>

                            <hr />

                            <p>
                                <strong>Data uscita:</strong>{" "}
                                <span>{currentGame.releaseDate ?? "Non disponibile"}</span>
                            </p>

                            <p>
                                <strong>Prezzo:</strong>{" "}
                                <span>
                                    {currentGame.price != null
                                        ? `${Number(currentGame.price).toFixed(2)} €`
                                        : "Non disponibile"}
                                </span>
                            </p>

                            <p>
                                <strong>Sviluppatore:</strong>{" "}
                                <span>{currentGame.developer?.name ?? "Nessuno"}</span>
                            </p>

                            <p>
                                <strong>Generi:</strong>
                            </p>

                            {currentGame.genres?.length > 0 ? (
                                currentGame.genres.map((genre) => (
                                    <span className="badge bg-primary me-1" key={genre.id}>
                                        {genre.name}
                                    </span>
                                ))
                            ) : (
                                <span>Nessun genere</span>
                            )}

                            <p className="mt-3">
                                <strong>Piattaforme:</strong>
                            </p>

                            {currentGame.platforms?.length > 0 ? (
                                currentGame.platforms.map((platform) => (
                                    <span className="badge bg-success me-1" key={platform.id}>
                                        {platform.name}
                                    </span>
                                ))
                            ) : (
                                <span>Nessuna piattaforma</span>
                            )}

                            <hr />

                            <Link className="btn btn-secondary" to="/">
                                Torna ai Games
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
