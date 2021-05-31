import axios from 'axios';


const apiKey = `${process.env.React_app_API_KEY}`;
const url = `${process.env.React_app_BASE_URL}`;
const movieUrl = `${url}/movie`;
const moviesUrl = `${url}/discover/movie`;


export const fetchMovieByGenre = async (genre_id) => {
    try {
        const { data } = await axios.get(moviesUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1,
                with_genres: genre_id
            }
        })
        const posterUrl = `${process.env.React_app_IMAGES_BASE_PATH}`;
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            year: m['release_date'],
        }))

        return modifiedData;
    } catch (error) { }
}


export const fetchMovieDetail = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}`, {
            params: {
                api_key: apiKey,
                language: 'en_US'
            }
        });
        return data;
    } catch (error) { }
}


