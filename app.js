var RESULT_HTML_TEMPLATE = (
  '<div class="result">' +
      '<div class="row">' + 
          '<img class="js-result-image result-image" src="" alt="Awesome Movie Poster">' + 
      '</div>' + 

      '<div class="row">' + 
        '<div class="category">'+
          '<p class="js-summary summary tooltip">Summary<span class="tooltip-text summary-tooltip"></span></p>' + 
        '</div>'+
        '<div class="category">'+
          '<p class="js-netflix netflix tooltip">Netflix<span class="tooltip-text netflix-tooltip">Not on Netflix Roulette</span></p>' + 
        '</div>'+
      '</div>'+

      '<div class="row">' + 
        '<div class="category-2">'+
          '<p class="js-cast cast tooltip">Cast<span class="tooltip-text cast-tooltip"></span></p>' + 
        '</div>'+
        '<div class="category-2">'+
          '<p class="js-genre genre tooltip">Genre<span class="tooltip-text genre-tooltip"></span></p>' +
        '</div>'+
        '<div class="category-2">'+
          '<p class="js-details details tooltip">Details<span class="tooltip-text detail-tooltip"></span></p>' +
        '</div>'+
      '</div>' +

      '<div class="row">' + 
        '<button type="button" class="js-add add">Add to List</button>' +
        '<div class="go-button">' + 
          '<a href="#chosen-link" class="js-go go">' +
            '<button type="button go-list">Go to Your List</button>' + 
          '</a>' +
        '</div>' +
      '</div>' +

  '</div>'
);

var state = {
  wish_list : [],
  rec_list : []
};

function addToWishList(state, item) {
  // createCopy
  var template = $(RESULT_HTML_TEMPLATE);
  var string = item.find(".js-result-image").attr("src");
  template.find(".js-result-image").attr("src", string);
  var summary = item.find('.summary-tooltip').val();
  template.find('.summary-tooltip').html(summary);
  var details = item.find('.detail-tooltip').val();
  template.find('.detail-tooltip').html(details);

  // Change add button to remove button
  target = template.find('.js-add');
  target.text("Remove");
  target.addClass("js-remove");
  target.addClass("remove");
  target.removeClass("add");
  target.removeClass("js-add");
  template.find(".js-go").addClass('hidden');



  // Add to List
  state.wish_list.push(template);
}

function addToRecList(state, item) {
  state.rec_list.push(item);
}


function removeFromWishList(state, item) {
  var index = state.wish_list.indexOf(item);
  state.wish_list.splice(index, 1);
}

// function getDataFromKeywordApi(searchTerm, callback) {
//   var query = {
//     q: searchTerm,
//     info: 1,
//     k: "277746-TasteTex-TMP1RQ9L"
//     // Insert relevant parameters here
//   }
//   $.getJSON(NETFLIX_SEARCH_URL, query, callback);
// }

function getMovieFromApi(searchTerm, callback) {
  stringUrl = "https://api.themoviedb.org/3/search/movie";
  var query = {
    query: searchTerm,
    api_key: "89ac11ce0fa4d53d4c4df236630139ab"
    // Insert relevant parameters here
  };
  $.ajax({
    url: stringUrl, 
    data: query, 
    dataType: "jsonp",
    success: callback
  });
}

function getTVFromApi(searchTerm, callback) {
  stringUrl = "https://api.themoviedb.org/3/search/tv";
  var query = {
    query: searchTerm,
    api_key: "89ac11ce0fa4d53d4c4df236630139ab"
    // Insert relevant parameters here
  };
  $.ajax({
    url: stringUrl, 
    data: query, 
    dataType: "jsonp",
    success: callback
  });
}

// function getDataFromDirectorApi(searchTerm, callback) {
//   var query = {
//     q: searchTerm,
//     info: 1,
//     k: "277746-TasteTex-TMP1RQ9L"
//     // Insert relevant parameters here
//   }
//   $.getJSON(NETFLIX_SEARCH_URL, query, callback);
// }

function displaySearchData(data) {
  var results = data.results.map(function(item) {
     renderResult(state, item);
  });
  renderRecList(state);
}

function getDataFromNetflix(template, searchTitle, callback) {
  // https://netflixroulette.net/api/api.php
  var query = {
    title: searchTitle,
    data: 1
  };
  $.getJSON("https://netflixroulette.net/api/api.php", query, callback);
}

function displayNetflixData(data, template) {
  var ratingString = "On Netflix Roulette\nRating: ";
  if (data.rating !== null) {
    ratingString += data.rating;
  } else {
    ratingString += "Unregistered"
  }
  template.find('.netflix-tooltip').text(ratingString);
}

function getMoreDetails(template, movieID, callback) {
  var query = {
    api_key: "89ac11ce0fa4d53d4c4df236630139ab"
    // Insert relevant parameters here
  }
  $.ajax({
    url: "https://api.themoviedb.org/3/movie/" + movieID, 
    data: query, 
    dataType: "jsonp",
    success: callback
  });
}

function displayTitleData(data, template) {

  var string = '';
  if (data.genres !== null) {
    data.genres.map(function(item) {
      string += item.name + ", ";
    });
    string = string.slice(0, -2);
  }

  var genre = "<span>Genres: " + string + "</span>";
  template.find('.genre-tooltip').html(genre);

  var newDetail;
  if (data.runtime !== null && data.runtime !== 0) {
    newDetail = "Runtime: " + data.runtime + " min";
  } else {
    newDetail = "Runtime: Not Registered";
  }
  var detailString = template.find('.detail-tooltip').text();
  template.find('.detail-tooltip').text(detailString + newDetail);
  
}


function renderResult(state, result) {
  var template = $(RESULT_HTML_TEMPLATE);
  // Movie Poster
  if (result.poster_path !== null) {
    var string = "http://image.tmdb.org/t/p/w185/" + result.poster_path;
    template.find(".js-result-image").attr("src", string);
  }

  // First, summary
  var summary = "<span>" + result.title + "</span><br>" + 
                "<span>" + result.overview + "</span><br>";
  template.find('.summary-tooltip').html(summary);
  // Skip Genre for now
  var details = "<span>Popularity: " + result.popularity + "\n</span>" + 
                "<span>Release: " + result.release_date + "\n</span>";
  template.find('.detail-tooltip').html(details);


  var receiveTitleData = function(data) {
    displayTitleData(data, template);
  };

  var receiveNetflixData = function(data) {
    displayNetflixData(data, template);
  };

  getDataFromNetflix(template, result.title, receiveNetflixData);
  getMoreDetails(template, result.id, receiveTitleData);
  addToRecList(state, template);
}

function renderWishList(state) {
  var results = state.wish_list.map(function(item) {
     return item;
  });
  $('.js-chosen-list').html(results);
}

function renderRecList(state) {
  var results = state.rec_list.map(function(item) {
     return item;
  });
  $('.js-rec-list').html(results);
}

// Done



// This is fine
// function watchKeyword() {
//   $('.keyword').click(function(event) {
//     var queryTarget = $('.js-query');
//     var query = queryTarget.val();
//     // clear out the input
//     queryTarget.val("");
//     // ALL OF THE ABOVE WILL REMAIN THE SAME
//     getDataFromKeywordApi(query, displaySearchData);
//   });
// }

// function watchDirector() {
//   $('.director').click(function(event) {
//     var queryTarget = $('.js-query');
//     var query = queryTarget.val();
//     // clear out the input
//     queryTarget.val("");
//     // ALL OF THE ABOVE WILL REMAIN THE SAME
//     getDataFromDirectorApi(query, displaySearchData);
//   });
// }

function watchSearchMovie() {
  $('.search-movie').click(function(event) {
    var movieFlag = "true";
    var queryTarget = $('.js-query');
    var query = queryTarget.val();
    if (query === "") {
      return;
    }
    // clear out the input
    queryTarget.val("");
    // ALL OF THE ABOVE WILL REMAIN THE SAME
    getMovieFromApi(query, displaySearchData);
  });
}

function watchSearchTV() {
  $('.search-tv').click(function(event) {
    var tvFlag = "false";
    var queryTarget = $('.js-query');
    var query = queryTarget.val();
    if (query === "") {
      return;
    }
    // clear out the input
    queryTarget.val("");
    // ALL OF THE ABOVE WILL REMAIN THE SAME
    getTVFromApi(query, displaySearchData);
  });
}

function watchAddtoList(state) {
  $('.js-rec-list').on('click', '.js-add', function(event) {
    // console.log(event);
    var target = $(this).parent().parent();
    // console.log(target);
    addToWishList(state, target);
    renderWishList(state);
  });
}

function watchRemoveFromList(state) {
  $('.js-chosen-list').on('click', '.js-remove', function(event) {
    console.log(event);
    var target = $(this).parent().parent();
    // console.log(target);
    removeFromWishList(state, target);
    renderWishList(state);
  });
}

function watchStart(state) {
  $('.explanation').on('click', '.js-start-button', function(event) {
    $(this).addClass('hidden');
    $('.explanation').addClass('hidden');
    $('.js-search-form').removeClass('hidden');
    $('.js-confused').removeClass('hidden');
    $('.your-list').removeClass('hidden');
  });
}

function watchConfused(state) {
  $('header').on('click', '.js-confused', function(event) {
    $(this).addClass('hidden');
    $('.explanation').removeClass('hidden');
    $('.js-start-button').removeClass('hidden');
    $('.js-search-form').addClass('hidden');
    $('.js-confused').addClass('hidden');
    $('.your-list').addClass('hidden');
  });
}

// This is also fine
$(function() {
  watchSearchMovie();
  watchSearchTV();
  watchAddtoList(state);
  watchRemoveFromList(state);
  watchStart();
  watchConfused();
  // watchClick();
  // watchDirector();
  // watchKeyword();

  // Need to do something that will activate the jumping mechanism?
  // Need to do something to watch for Previous and Next
});
