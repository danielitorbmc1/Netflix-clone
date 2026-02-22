const API_KEY = 'b215a47e60204c84cf7f4d135e386f74';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original';

const app = {
    init() {
        this.showHome();
        this.setupEventListeners();
    },

    async fetchMovies(endpoint) {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}&api_key=${API_KEY}&language=es-ES`);
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    },

    async showHome() {
        const main = document.getElementById('app');
        const popular = await this.fetchMovies('/movie/popular?page=1');
        const topRated = await this.fetchMovies('/movie/top_rated?page=1');
        const featured = popular[0];

        main.innerHTML = `
            <header class="hero" style="background-image: url('${IMG_URL}${featured.backdrop_path}')">
                <div class="hero-overlay"></div>
                <div class="hero-content">
                    <h1>${featured.title}</h1>
                    <p>${featured.overview.substring(0, 150)}...</p>
                    <button class="play-btn" onclick="app.showDetails(${featured.id}, 'movie')">Más información</button>
                </div>
            </header>
            <section class="row">
                <h2 class="row-header">Tendencias</h2>
                <div class="row-posters">${this.renderCards(popular, 'movie')}</div>
            </section>
            <section class="row">
                <h2 class="row-header">Aclamadas por la crítica</h2>
                <div class="row-posters">${this.renderCards(topRated, 'movie')}</div>
            </section>
        `;
    },

    renderCards(movies, type) {
        return movies.map(movie => `
            <div class="movie-card" onclick="app.showDetails(${movie.id}, '${type}')">
                <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title || movie.name}">
            </div>
        `).join('');
    },

    async showDetails(id, type) {
        const details = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=es-ES&append_to_response=videos,credits`).then(res => res.json());
        const trailer = details.videos.results.find(v => v.type === 'Trailer');
        const modal = document.getElementById('modal');

        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal" onclick="app.closeModal()">&times;</span>
                <div class="modal-video">
                    ${trailer ? `<iframe src="https://www.youtube.com/embed/${trailer.key}?autoplay=1" allowfullscreen></iframe>` : `<img src="${IMG_URL}${details.backdrop_path}" style="width:100%">`}
                </div>
                <div class="modal-info">
                    <h2>${details.title || details.name}</h2>
                    <p class="meta">${details.release_date || details.first_air_date} • ⭐ ${details.vote_average}</p>
                    <p class="overview">${details.overview}</p>
                    <h3>Reparto Principal</h3>
                    <div class="cast">
                        ${details.credits.cast.slice(0, 5).map(actor => `<span>${actor.name}</span>`).join(', ')}
                    </div>
                </div>
            </div>
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    },

    closeModal() {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
        modal.innerHTML = '';
        document.body.style.overflow = 'auto';
    },

    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value;
                const results = await this.fetchMovies(`/search/multi?query=${query}`);
                document.getElementById('app').innerHTML = `
                    <div class="row" style="margin-top: 100px;">
                        <h2>Resultados para: ${query}</h2>
                        <div class="row-posters" style="flex-wrap: wrap;">${this.renderCards(results, 'movie')}</div>
                    </div>
                `;
            }
        });

        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            if (window.scrollY > 100) nav.style.background = '#141414';
            else nav.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)';
        });
    },

    async showMovies() {
        const data = await this.fetchMovies('/discover/movie?sort_by=popularity.desc');
        this.renderGrid("Películas Populares", data, 'movie');
    },

    async showSeries() {
        const data = await this.fetchMovies('/discover/tv?sort_by=popularity.desc');
        this.renderGrid("Series de TV", data, 'tv');
    },

    renderGrid(title, data, type) {
        document.getElementById('app').innerHTML = `
            <div class="row" style="margin-top: 100px;">
                <h2>${title}</h2>
                <div class="row-posters" style="flex-wrap: wrap; justify-content: center;">${this.renderCards(data, type)}</div>
            </div>
        `;
    }
};

// Iniciar aplicación
app.init();