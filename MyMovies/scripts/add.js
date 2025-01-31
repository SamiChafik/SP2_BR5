document.addEventListener('DOMContentLoaded', () => {
    const addMovieBtn = document.getElementById('addMovie');
    let id = 0;

    const movies = JSON.parse(localStorage.getItem('movies')) || [];

    addMovieBtn.addEventListener('click', () => {
        const title = document.getElementById('title');
        const publisher = document.getElementById('publisher');
        const release = document.getElementById('release');
        const genre = document.getElementById('genre');
        const status = document.getElementById('status');
        const description = document.getElementById('description');
        const imgUpload = document.getElementById('imgUpload');
        let imagePath = '';

        function addMovie () {
            if (!title || !publisher || !release || !genre || !status) {
                alert('Please fill out all required fields!');
                return
            } else {id++;}

            const movie = {
                id,
                title: title.value,
                publisher: publisher.value,
                release: release.value,
                genre: genre.value,
                status: genre.value,
                description: description || 'Not specified',
                image: imagePath || 'No image uploaded',
            }

            movies.push(movie);
            localStorage.setItem('movies', JSON.stringify(movies));

            alert('movie added');
            console.log(movie);

            title.value = '';
            publisher.value = '';
            release.value = '';
            genre.value = '';
            status.value = '';
            description.value = '';

            showMovies();
        }

        if (imgUpload.files.length > 0) {
            const file = imgUpload.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                imagePath = e.target.result;
                addMovie();
            };

            reader.readAsDataURL(file);
        } else {
            addMovie();
        }

                  

    });

    const deleteAll = document.getElementById('deleteAll');

    deleteAll.addEventListener('click', () => {
        localStorage.removeItem('movies');
        alert('All movies deleted');
        showMovies();
    });

onload(showMovies());
});

function showMovies() {

    const movieList = document.getElementById('movieListBody');

    movieList.innerHTML = '';

    const movies = JSON.parse(localStorage.getItem('movies')) || [];

    if (movies.length === 0) {
        return;
    }

    movies.forEach(movie => {
        const movieItm = document.createElement('tr');

        movieItm.innerHTML = `
            <td><img src="${movie.image}"></td>
            <td>${movie.title}</td>
            <td id="option">
                <button class="optionButton" id="editBtn">Edit</button>
                <button class="optionButton" id="deleteBtn">Delete</button>
            </td>
        `;

        movieList.appendChild(movieItm);    

    });
};