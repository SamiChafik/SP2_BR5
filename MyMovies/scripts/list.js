document.addEventListener('DOMContentLoaded', () => {
    let movies = JSON.parse(localStorage.getItem('movies')) || [];
    const section1 = document.getElementById('section1');
    section1.innerHTML = '';

    movies.forEach(movie => {
        const movieBox = document.createElement('div');
        movieBox.className = 'box';

        const movieImage = document.createElement('img');
        movieImage.src = movie.image || './assets/images/default-movie.png';
        movieImage.alt = movie.title;

        const movieInfo = document.createElement('div');
        movieInfo.className = 'info';

        movieInfo.innerHTML = `
            <h1>Title : ${movie.title}</h1>
            <h1>Publisher : ${movie.publisher}</h1>
            <h1>Release Year : ${movie.release}</h1>
            <h1>Genre : ${movie.genre}</h1>
            <h1>Status : ${movie.status}</h1>
            <h1>Description :</h1>
            <p>${movie.description}</p>
        `;

        movieBox.appendChild(movieImage);
        movieBox.appendChild(movieInfo);
        section1.appendChild(movieBox);
    });
});