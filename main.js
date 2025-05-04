
import { getPopularMovies, searchMovie, reSearchMovie } from "./api.js";
import { openMovieModal, renderMovies } from "./ui.js";

// 검색 기능
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

//검색 버튼 이용 검색
searchBtn.addEventListener('click',()=>{
    const query = searchInput.value.trim();
    if(query){
        searchMovie(query).then(movies=>{
            if (movies && movies.length > 0) {
                hideError();
                renderMovies(movies);
            } else {
                showError("검색 결과가 없습니다. 다시 시도해 주세요.");
            }
        });
    }
    else{
        loadMovies();
    }
})

//엔터 이용 검색
searchInput.addEventListener('keydown',(event)=>{
    if(event.key === 'Enter'){
        const query = searchInput.value.trim();
        if(query){
            searchMovie(query).then(movies=>{
                if (movies && movies.length > 0) {
                    hideError();
                    renderMovies(movies);
                } else {
                    showError("검색 결과가 없습니다. 다시 시도해 주세요.");
                }
            });
        }
        else{
            loadMovies();
        }
    }
})

//filter를 이용한 재검색 기능
const reSearch = document.getElementById("reSearch");
const reSearchInput = document.getElementById('reSearchInput');
const reSearchBtn = document.getElementById('reSearchBtn');

//검색 버튼 이용 재검색
reSearchBtn.addEventListener('click',()=>{
    const query = reSearchInput.value.trim();
    if(query){
        const movies = reSearchMovie(query);
        if (movies && movies.length > 0) {
            hideError();
            renderMovies(movies);
        } 
        else {
            showError("검색 결과가 없습니다. 다시 시도해 주세요.");
        }
    }
})

//엔터 이용 재검색
reSearchInput.addEventListener('keydown',(event)=>{
    if(event.key === 'Enter'){
        const query = reSearchInput.value.trim();
        if(query){
            const movies = reSearchMovie(query);
            if (movies && movies.length > 0) {
                hideError();
                renderMovies(movies);
            } else {
                showError("검색 결과가 없습니다. 다시 시도해 주세요.");
            }
        }
    }
})

//error 처리 
function showError(message) {
    const errorEl = document.getElementById('errorMessage');
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
}

function hideError() {
    const errorEl = document.getElementById('errorMessage');
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
}

//title 클릭시 인기 영화 다시 불러오기
const siteTitle = document.getElementById('siteTitle');
siteTitle.addEventListener('click',()=>{
    loadMovies();
})



//이벤트 위임
const movieList = document.getElementById('movieList');

movieList.addEventListener('click', e =>{
    const card = e.target.closest('.movieCard');
    if(card && card.dataset.movieId){
        openMovieModal(card.dataset.movieId);
    }
})


// 모달 기능
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');

//모달 되돌아가기
modalClose.addEventListener('click',()=>{
    modal.classList.add('hidden');
    
});

document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        e.target.classList.add('hidden');
    }
});

// 인기 영화 로드 및 검색창 초기화
async function loadMovies() {
    searchInput.value = null;
    reSearch.classList.add('hidden');
    const data = await getPopularMovies(); 
    if (data && data.length > 0) {
        hideError();
        renderMovies(data);  
    } else {
        showError("인기 영화를 불러오지 못했습니다.");
    }
}

loadMovies();


