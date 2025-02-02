document.addEventListener('DOMContentLoaded', () => {
    const addMovieBtn = document.getElementById('addMovie');
    let isEditing = false;
    let editMovieId = null;
    let currentImagePath = '';

    let movies = JSON.parse(localStorage.getItem('movies')) || [];
    showMovies();

    addMovieBtn.addEventListener('click', () => {
        const title = document.getElementById('title');
        const publisher = document.getElementById('publisher');
        const release = document.getElementById('release');
        const genre = document.getElementById('genre');
        const status = document.getElementById('status');
        const description = document.getElementById('description');
        const imgUpload = document.getElementById('imgUpload');
        let imagePath = currentImagePath;

        function addOrUpdateMovie() {
            if (!title.value || !publisher.value || !release.value || !genre.value || !status.value) {
                alert('Please fill out all required fields!');
                return;
            }

            const movie = {
                id: isEditing ? editMovieId : Date.now(),
                title: title.value,
                publisher: publisher.value,
                release: release.value,
                genre: genre.value,
                status: status.value,
                description: description.value || 'No desription',
                image: imagePath || 'No image uploaded',
            };        

            if (isEditing) {
                const index = movies.findIndex(m => m.id === editMovieId);
                if (index !== -1) {
                    movies[index] = movie;
                }
            } else {
                movies.push(movie);
            }

            localStorage.setItem('movies', JSON.stringify(movies));
            alert(isEditing ? 'Movie updated' : 'Movie added');

            title.value = '';
            publisher.value = '';
            release.value = '';
            genre.value = '';
            status.value = '';
            description.value = '';
            imgUpload.value = '';
            isEditing = false;
            editMovieId = null;
            currentImagePath = '';

            showMovies();
        }

        if (imgUpload.files.length > 0) {
            const file = imgUpload.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                imagePath = e.target.result;
                addOrUpdateMovie();
            };

            reader.readAsDataURL(file);
        } else {
            addOrUpdateMovie();
        }
    });

    const deleteAll = document.getElementById('deleteAll');
    deleteAll.addEventListener('click', () => {
        localStorage.removeItem('movies');
        movies = [];
        alert('All movies deleted');
        showMovies();
    });

    function editMovieById(movieId) {
        const movie = movies.find(m => m.id === movieId);

        if (movie) {
            document.getElementById('title').value = movie.title;
            document.getElementById('publisher').value = movie.publisher;
            document.getElementById('release').value = movie.release;
            document.getElementById('genre').value = movie.genre;
            document.getElementById('status').value = movie.status;
            document.getElementById('description').value = movie.description;

            currentImagePath = movie.image;
            isEditing = true;
            editMovieId = movieId;

            document.getElementById('section1').scrollIntoView();
        }
    }

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
                <td><img src="${movie.image}" alt="${movie.title}" width="100"></td>
                <td>${movie.title}</td>
                <td id="option">
                    <button class="optionButton editBtn" data-id="${movie.id}">Edit</button>
                    <button class="optionButton deleteBtn" data-id="${movie.id}">Delete</button>
                </td>
            `;

            movieList.appendChild(movieItm);
        });

        const editButtons = document.querySelectorAll('.editBtn');
        editButtons.forEach(button => {
            button.addEventListener('click', () => {
                const movieId = parseInt(button.getAttribute('data-id'));
                editMovieById(movieId);
            });
        });

        const deleteButtons = document.querySelectorAll('.deleteBtn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const movieId = parseInt(button.getAttribute('data-id'));
                deleteMovieById(movieId);
            });
        });
    }

    function deleteMovieById(movieId) {
        let movies = JSON.parse(localStorage.getItem('movies')) || [];
        movies = movies.filter(movie => movie.id !== movieId);
        localStorage.setItem('movies', JSON.stringify(movies));
        showMovies();
        alert('Movie deleted');
    }

});