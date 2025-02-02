document.addEventListener('DOMContentLoaded', () => {
    let movies = JSON.parse(localStorage.getItem('movies')) || [];
    movies.sort((a, b) => b.id - a.id);
    const recentMovies = movies.slice(0, 5);
    const section2_1 = document.getElementById('section2_1');
    section2_1.innerHTML = '';

    recentMovies.forEach(movie => {
        const movieBox = document.createElement('div');
        movieBox.className = 'box';

        const movieImage = document.createElement('img');
        movieImage.src = movie.image || './assets/images/default-movie.png';
        movieImage.alt = movie.title;

        const movieTitle = document.createElement('h1');
        movieTitle.textContent = movie.title;

        movieBox.appendChild(movieImage);
        movieBox.appendChild(movieTitle);
        section2_1.appendChild(movieBox);
    });
});