import axios from "axios"

// https://api.themoviedb.org/3/

// https://api.themoviedb.org/3/movie/now_playing?api_key=d11d3677f295611bc034723273a2cab5&language=pt-BR

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
})

export default api