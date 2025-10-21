import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../services/api"
import "./filme.css"

function Filme() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "d11d3677f295611bc034723273a2cab5",
                language: "pt-BR"
                }
            })
            .then((response) => {
                setFilme(response.data)
                setLoading(false)
            })
            .catch(() => {
                console.log("Filme não encontrado")
                navigate('/', {replace: true})
                return
            })
        }
        loadFilme()
        return () => {
            console.log("componente desmontado")
        }
    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilme){
            alert("ESSE FILME JÁ ESTA NA LISTA");
            return;
        }

        filmesSalvos.push(filme);
            localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
            alert("FILME SALVO COM SUCESSO")
    }

    if (loading) {
        return (
            <div className="loading-filme">
                <h1>Carregando...</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>
            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button><a href={`https://youtube.com/results?search_query=${filme.title} Trailer`} target="_blank">Trailer</a></button>
            </div>
        </div>
    )
}

export default Filme