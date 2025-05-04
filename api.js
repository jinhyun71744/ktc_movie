//config.js 저장 후 파일을 .gitignore에 추가하였습니다 
import { API_KEY } from "./config.js";
const BASE_URL = 'https://api.themoviedb.org/3';

//받은 영화 정보를 저장할 배열
let cachedMovies = [];
let searchResults = [];

//인기 영화를 가져오는 함수
export async function getPopularMovies(){
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
    try{
        const response = await fetch(url);
        const data = await response.json();

        return data.results;
    }catch(error){
        console.error("영화 데이터를 불러오는 중 오류 발생:",error)
    }
}

//영화를 검색하여 가져오는 함수
export async function searchMovie(query){
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(query)}`;

    try{
        const response = await fetch(url);
        const data = await response.json();

        cachedMovies = data.results;
        searchResults = JSON.parse(JSON.stringify(cachedMovies));

        console.log(searchResults.length);
        if(searchResults.length){
            document.getElementById('reSearch').classList.remove('hidden');
        }
        document.getElementById('reSearchInput').value = null;
        return data.results;

    } catch(error){
        console.error('검색 실패: ',error);
    }
}

//검색한 영화중에서 재검색하는 함수
//필터링 로직 구현
//api 사용하는 함수는 아니나 기능상 api.js 파일에 두었습니다.
//추후 api를 활용하는 방식으로 성능을 개선해볼 예정
export function reSearchMovie(query){
    const filteredMovie = searchResults.filter(movie=>{
        return movie.title.toLowerCase().includes(query.toLowerCase());
    })

    if(filteredMovie.length){
        searchResults = JSON.parse(JSON.stringify(filteredMovie));
    }

    return filteredMovie;
}

//모달에서 보여줄 세부 내용을 가져오는 함수
export async function fetchMovieDetails(movieId) {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;

    try{
        const response = await fetch(url);
        const movie = await response.json();

        return movie;
    } catch(error){
        console.error('영화 세부 정보 로드 실패:',error);
    } 
}

