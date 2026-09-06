import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

export default function Home() {
    const { games, loadingGames, gamesError, getGames } = useGlobalContext();

    if (loadingGames) {
        return (
            <div className="container mt-4 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Caricamento...</span>
                </div>
                <p className="mt-3">Caricamento giochi...</p>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-3">Lista Games</h1>

            {gamesError && (
                <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
                    <span>{gamesError}</span>
                    <button className="btn btn-outline-danger btn-sm" onClick={getGames}>
                        Riprova
                    </button>
                </div>
            )}

            {!gamesError && games.length === 0 && (
                <div className="alert alert-info" role="alert">
                    Non ci sono giochi disponibili.
                </div>
            )}

            {!gamesError && games.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Titolo</th>
                                <th>Descrizione</th>
                                <th>Data di uscita</th>
                                <th>Prezzo</th>
                                <th>Sviluppatore</th>
                                <th>Generi</th>
                                <th>Piattaforme</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {games.map((game) => (
                                <tr key={game.id}>
                                    <td>{game.id}</td>
                                    <td>{game.title}</td>
                                    <td className="game-description">
                                        {game.description
                                            ? `${game.description.slice(0, 80)}${game.description.length > 80 ? "..." : ""}`
                                            : "Nessuna descrizione"}
                                    </td>
                                    <td>{game.releaseDate ?? "-"}</td>
                                    <td>
                                        {game.price != null
                                            ? `${Number(game.price).toFixed(2)} €`
                                            : "-"}
                                    </td>
                                    <td>{game.developer?.name ?? "Nessuno"}</td>
                                    <td>
                                        {game.genres?.length > 0
                                            ? game.genres.map((genre) => genre.name).join(", ")
                                            : "-"}
                                    </td>
                                    <td>
                                        {game.platforms?.length > 0
                                            ? game.platforms.map((platform) => platform.name).join(", ")
                                            : "-"}
                                    </td>
                                    <td>
                                        <Link
                                            className="btn btn-primary btn-sm"
                                            to={`/single-game/${game.id}`}
                                        >
                                            Dettagli
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
