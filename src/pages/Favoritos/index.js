import { useEffect, useState } from "react"
import "./favoritos.css"
import { Link } from "react-router-dom"
import { jsx } from "react/jsx-runtime"

function Favoritos () {
    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        const minhaLista = localStorage.getItem("@primeflix")
        setFilmes(JSON.parse(minhaLista) || [])
    }, [])

    function excluirFilme (id) {
        let filtroFilmes = filmes.filter((filme) => {
            return (filme.id !== id)
        })
        setFilmes(filtroFilmes)
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
    }

    return (
        <div className="favoritos-lista">
            <h1>Favoritos</h1>
            {filmes.length === 0 && <span>Lista vazia...</span>}
            <ul>
                {filmes.map((filme) => {
                    return (
                        <li key={filme.id}>
                            <span>{filme.title}</span>
                            <div>
                                <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos