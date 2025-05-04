import { fetchMovieDetails } from "./api.js";

const movieList = document.getElementById('movieList');
export function renderMovies(movies){
    movieList.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movieCard';
        movieCard.dataset.movieId = movie.id;
        movieCard.innerHTML=`
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>⭐ 평점: ${movie.vote_average}</p>
        `;

        movieList.appendChild(movieCard);
    });
}

const modalBody = document.getElementById('modalBody');

export async function openMovieModal(movieId){
    
    try{
        const movie = await fetchMovieDetails(movieId);
        modalBody.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}">
        <p><strong>개봉일: </strong>${movie.release_date}</p>
        <p><strong>평점: </strong>${movie.vote_average}</p>
        <p><strong>줄거리: </strong>${movie.overview}</p>
        `;

        modal.classList.remove('hidden');
    } catch(error){
        console.error('모달 정보 로드 실패:',error);
    }
}