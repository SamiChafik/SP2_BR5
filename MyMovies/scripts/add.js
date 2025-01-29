document.addEventListener('DOMContentLoaded', () => {
    const addMovieBtn = document.getElementById('addMovie');
    let id = 0;

    const movies = JSON.parse(localStorage.getItem('movies')) || [];

    addMovieBtn.addEventListener('click', () => {
        const title = document.getElementById('title').value;
        const publisher = document.getElementById('publisher').value;
        const release = document.getElementById('release').value;
        const genre = document.getElementById('genre').value;
        const status = document.getElementById('status').value;
        const description = document.getElementById('description').value;
        const imgUpload = document.getElementById('imgUpload');
        let imagePath = '';

        function addMovie () {
            if (!title || !publisher || !release || !genre || !status) {
                alert('Please fill out all required fields!');
                return
            } else {id++;}

            const movie = {
                id,
                title,
                publisher,
                release,
                genre,
                status,
                description: description || 'Not specified',
                image: imagePath || 'No image uploaded',
            }

            movies.push(movie);
            localStorage.setItem('movies', JSON.stringify(movies));

            alert('movie added');
            console.log(movie);

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
    });

});

document.addEventListener('DOMContentLoaded', () => {

    const movieList = document.getElementById('movieList');

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
                <button class="option-button">Edit</button>
                <button class="option-button">Delete</button>
            </td>
        `;

        movieList.appendChild(movieItm);    

    });
   

});


// const btn = document.getElementById("addMovie");

// btn.addEventListener('click', () => {
//     alert('btn working');
// });