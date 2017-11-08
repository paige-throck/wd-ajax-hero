(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.Title
      });

      $title.tooltip({
        delay: 50
      }).text(movie.Title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.Poster,
        alt: `${movie.Poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.Id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.Id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.Title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.Plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };
  ////////////////////////////////////////////////

  function clearListings() {
    while (movies.length !== 0) {
      movies.pop();
    }

  }

  let searchButton = $("button");

  searchButton.click(function() {
    event.preventDefault();
    let searchText = $('#search').val();
    console.log(searchText);
    getMovies(searchText);

  })

  function getMovies(searchText) {
    if (searchText.length === 0) {
      alert('Search for a movie fool!')
    } else {
      clearListings();
    }



    var $xhr = $.getJSON(`https://omdb-api.now.sh/?s=${searchText}`)

    $xhr.done(function(data) {
      let films = data["Search"]
      for (let i = 0; i < films.length; i++) {
        movies.push(films[i]);

      }
      renderMovies()

    })
  }



})();
