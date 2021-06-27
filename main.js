$(".search-button").on("click", function () {
  $.ajax({
    url:
      "http://www.omdbapi.com/?i=tt3896198&apikey=8dc93ab4&s=" +
      $(".input-keyword").val(),
    success: (results) => {
      const movies = results.Search;
      let cards = "";

      movies.forEach((movie) => {
        cards += showCards(movie);
      });

      $(".movie-container").html(cards);

      // Ketika tombol Detail di click
      $(".modal-detail-button").on("click", function () {
        $.ajax({
          url:
            "http://www.omdbapi.com/?apikey=8dc93ab4&i=" +
            $(this).data("imdbid"),
          success: (detail) => {
            const movieDetail = showMovieDetail(detail);
            $(".modal-body").html(movieDetail);
          },
          error: (e) => console.log(e),
        });
      });
    },
    error: (e) => console.log(e.responseText),
  });
});

function showCards(movie) {
  return /*html*/ `<div class="col-md-4 my-3">
      <div class="card">
        <img src="${movie.Poster}" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">${movie.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
          <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${movie.imdbID}">Show Details</a>
        </div>
      </div>
    </div>`;
}

function showMovieDetail(detail) {
  return /* html */ `<div class="container-fluid">
                        <div class="row">
                          <div class="col-md-3">
                            <img src="${detail.Poster}" alt="" class="img-fluid">
                          </div>
                          <div class="col-md">
                              <ul class="list-group">
                                  <li class="list-group-item">
                                      <h4>${detail.Title} (${detail.Year})</h4>
                                  </li>
                                  <li class="list-group-item"><strong>Director : </strong>${detail.Director}</li>
                                  <li class="list-group-item"><strong>Actors : </strong>${detail.Actors}</li>
                                  <li class="list-group-item"><strong>Genre : </strong>${detail.Genre}</li>
                                  <li class="list-group-item"><strong>Plot : </strong> <br> ${detail.Plot} </li>
                              </ul>
                          </div>
                        </div>
                    </div>`;
}
