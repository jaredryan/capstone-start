var RESULT_HTML_TEMPLATE = (
  '<div class="result">' +
      '<div class="row">' + 
          '<img class="js-result-image result-image" src="" alt="Awesome Movie Poster">' + 
      '</div>' + 

      '<div class="row">' + 
        '<div class="category">'+
          '<p class="js-summary summary tooltip">Summary<span class="tooltip-text summary-tooltip">Summary: \nNot registered</span></p>' + 
        '</div>'+
        '<div class="category">'+
          '<p class="js-netflix netflix tooltip">Netflix<span class="tooltip-text netflix-tooltip">Not on Netflix Roulette</span></p>' + 
        '</div>'+
      '</div>'+

      '<div class="row">' + 
        '<div class="category-2">'+
          '<p class="js-similar similar tooltip">Similar<span class="tooltip-text similar-tooltip">Similar Movies: \nUndetermined</span></p>' + 
        '</div>'+
        '<div class="category-2">'+
          '<p class="js-genre genre tooltip">Genre<span class="tooltip-text genre-tooltip">Genre: \nNot registered</span></p>' +
        '</div>'+
        '<div class="category-2">'+
          '<p class="js-details details tooltip">Details<span class="tooltip-text detail-tooltip">Details: \nNot registered</span></p>' +
        '</div>'+
      '</div>' +

      '<div class="row">' + 
        '<div class="category-3">'+
          '<p class="js-recommend recommend tooltip">Other Recommendations<span class="tooltip-text recommended-tooltip">Recommended Movies: \nUndetermined</span></p>' + 
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

var WISH_HTML_TEMPLATE = (
  '<div class="result">' +
      '<div class="row">' + 
          '<img class="js-result-image result-image" src="" alt="Awesome Movie Poster">' + 
      '</div>' + 

      '<div class="row">' + 
        '<div class="category">'+
          '<p class="js-summary summary tooltip">Summary<span class="tooltip-text summary-tooltip">Summary: \nNot registered</span></p>' + 
        '</div>'+
        '<div class="category">'+
          '<p class="js-netflix netflix tooltip">Netflix<span class="tooltip-text netflix-tooltip">Not on Netflix Roulette</span></p>' + 
        '</div>'+
      '</div>'+

      '<div class="row">' + 
        '<div class="category-2">'+
          '<p class="js-similar similar tooltip">Similar<span class="tooltip-text similar-tooltip">Similar Movies: \nUndetermined</span></p>' + 
        '</div>'+
        '<div class="category-2">'+
          '<p class="js-genre genre tooltip">Genre<span class="tooltip-text genre-tooltip">Genre: \nNot registered</span></p>' +
        '</div>'+
        '<div class="category-2">'+
          '<p class="js-details details tooltip">Details<span class="tooltip-text detail-tooltip">Details: \nNot registered</span></p>' +
        '</div>'+
      '</div>' +

      '<div class="row">' + 
        '<div class="category-3">'+
          '<p class="js-recommend recommend tooltip">Other Recommendations<span class="tooltip-text recommended-tooltip">Recommended Movies: \nUndetermined</span></p>' + 
        '</div>'+
      '</div>' +

      '<div class="row">' + 
        '<button type="button" class="js-remove remove">Remove</button>' +
      '</div>' +

  '</div>'
);

// Good?
var state = {
  wish_list : [],
  rec_list : [],
  page_num: 1,
  last_page: 1,
  last_url: "",
  last_query: null,
  type: ""
};

// Good
function addToWishList(state, item) {
  // Create a copy with template and changing attributes as needed
  var template = $(WISH_HTML_TEMPLATE);

  var image = item.find(".js-result-image").attr("src");
  var summary = item.find('.summary-tooltip').val();
  var netflix = item.find('.netflix-tooltip').val();
  var similar = item.find('.similar-tooltip').val();
  var genre = item.find('.genre-tooltip').val();
  var details = item.find('.detail-tooltip').val();
  var otherRecs = item.find('.recommended-tooltip').val();

  template.find(".js-result-image").attr("src", image);
  template.find('.summary-tooltip').html(summary);
  template.find('.netflix-tooltip').html(netflix);
  template.find('.similar-tooltip').html(similar);
  template.find('.genre-tooltip').html(genre);
  template.find('.detail-tooltip').html(details);
  template.find('.recommended-tooltip').html(otherRecs);

  // Add to State List
  state.wish_list.push(template);
}

// Good
function addToRecList(state, item) {
  state.rec_list.push(item);
}

// Good
function removeFromWishList(state, item) {
  var index = state.wish_list.indexOf(item);
  state.wish_list.splice(index, 1);
}

// Good
function clearWishState(state) {
  state.wish_list = [];
}

// Good
function clearRecState(state) {
  state.page_num = 1;
  state.last_page = 1;
  state.last_url = "";
  state.last_query = null;
  state.type = "";
};

// Good
function clearRecList(state) {
  state.rec_list = [];
}





// Bad
var getDataFromApi = function(searchTerm, state, type) {
  state.last_url = "https://api.themoviedb.org/3/search/" + type;
  state.last_query = {
    query: searchTerm,
    api_key: "89ac11ce0fa4d53d4c4df236630139ab",
    page : state.page_num,
    // Insert relevant parameters here
  };

  var toCallback = function(data) {
    displaySearchData(data, state);
  };

  $.ajax({
    url: state.last_url, 
    data: state.last_query, 
    dataType: "jsonp",
    success: toCallback
  });
};

// Bad
// function getTVFromApi(searchTerm, state) {
//   state.last_url = "https://api.themoviedb.org/3/search/tv";
//   state.last_query = {
//     query: searchTerm,
//     api_key: "89ac11ce0fa4d53d4c4df236630139ab",
//     page : state.page_num,
//     // Insert relevant parameters here
//   };

//   var toCallback = function(data) {
//     displaySearchData(data, state);
//   };

//   $.ajax({
//     url: state.last_url, 
//     data: state.last_query, 
//     dataType: "jsonp",
//     success: toCallback
//   });
// }

// Bad
function getNewPageFromApi(state) {

  var toCallback = function(data) {
    displaySearchData(data, state);
  };

  $.ajax({
    url: state.last_url, 
    data: state.last_query, 
    dataType: "jsonp",
    success: toCallback
  });
}

// Bad
function displaySearchData(data, state) {
  state.last_page = data.total_pages;
  var results = data.results.map(function(item) {
     renderResult(state, item);
  });
  renderRecList(state);
}

// Bad
function getDataFromNetflix(template, searchTitle, callback) {
  // https://netflixroulette.net/api/api.php
  var query = {
    title: searchTitle,
    data: 1
  };
  $.getJSON("https://netflixroulette.net/api/api.php", query, callback);
}

// Bad
function displayNetflixData(data, template) {
  var ratingString = "On Netflix Roulette\nRating: ";
  if (data.rating !== null) {
    ratingString += data.rating;
  } else {
    ratingString += "Unregistered"
  }
  template.find('.netflix-tooltip').text(ratingString);
}

// Bad
function getSimilarTitles(template, movieID, callback, state) {
  var query = {
    api_key: "89ac11ce0fa4d53d4c4df236630139ab"
    // Insert relevant parameters here
  }
  var stringUrl = "https://api.themoviedb.org/3/" + state.type + "/" + movieID + "/similar";

  $.ajax({
    url: stringUrl, 
    data: query, 
    dataType: "jsonp",
    success: callback
  });
}

// Bad
function displaySimilarData(data, template) {
  var string = '';
  if (data.results !== null) {
      data.results.map(function(item) {
        string += item.title + ", ";
      });
      string = string.slice(0, -2);
      var similarString = "<span>Similar Movies: \n" + string + "</span>";
      if (string !== "") {
        template.find('.similar-tooltip').html(similarString);
      }
  } 
}

// Bad
function getRecommendedTitles(template, movieID, callback, state) {
  var query = {
    api_key: "89ac11ce0fa4d53d4c4df236630139ab"
    // Insert relevant parameters here
  }
  var stringUrl = "https://api.themoviedb.org/3/" + state.type + "/" + movieID + "/recommendations";

  $.ajax({
    url: stringUrl, 
    data: query, 
    dataType: "jsonp",
    success: callback
  });
}


// Bad
function displayRecommendedData(data, template) {

  // alter as needed
  console.log(data.results);
  var string = '';
  if (data.results !== null) {
      data.results.map(function(item) {
        string += item.title + ", ";
      });
      string = string.slice(0, -2);
      console.log(string);
      var similarString = "<span>Recommended Movies: \n" + string + "</span>";
      if (string !== "") {
        template.find('.recommended-tooltip').html(similarString);
      }
  } 
}

// Bad
function getMoreDetails(template, movieID, callback, state) {
  var query = {
    api_key: "89ac11ce0fa4d53d4c4df236630139ab"
    // Insert relevant parameters here
  }
  var stringUrl = "https://api.themoviedb.org/3/" + state.type + "/" + movieID;

  $.ajax({
    url: stringUrl,
    data: query, 
    dataType: "jsonp",
    success: callback
  });
}

// Bad
function displayTitleData(data, template) {

  var string = '';
  if (data.genres !== null) {
    data.genres.map(function(item) {
      string += item.name + ", ";
    });
    string = string.slice(0, -2);
    var genre = "<span>Genres: \n" + string + "</span>";
    if (string !== "") {
        template.find('.genre-tooltip').html(genre);
    }
  } 

  var newDetail;
  if (data.runtime !== null && data.runtime !== 0) {
    newDetail = "Runtime: " + data.runtime + " min";
  } else {
    newDetail = "Runtime: Not Registered";
  }
  var detailString = template.find('.detail-tooltip').text();
  template.find('.detail-tooltip').text(detailString + newDetail);
  
}

// So very ugly
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

  var receiveSimilarData = function(data) {
    displaySimilarData(data, template);
  };

  var receiveRecommendedData = function(data) {
    displayRecommendedData(data, template);
  };

  getDataFromNetflix(template, result.title, receiveNetflixData);
  getMoreDetails(template, result.id, receiveTitleData, state);
  getSimilarTitles(template, result.id, receiveSimilarData, state);
  getRecommendedTitles(template, result.id, receiveRecommendedData, state);

  addToRecList(state, template);
}


// GOOD
function renderWishList(state) {
  var results = state.wish_list.map(function(item) {
     return item;
  });
  $('.js-chosen-list').html(results);
}

// Good
function renderRecList(state) {
  // Render Items
  var results = state.rec_list.map(function(item) {
     return item;
  });
  $('.js-rec-list').html(results);

  // Render Prev and Next
  if (state.page_num < state.last_page) {
    $('.next').removeClass("hidden");
  } else {
    $('.next').addClass("hidden");
  }

  if (state.page_num === 1) {
    $('.previous').addClass("hidden");
  } else {
    $('.previous').removeClass("hidden");
  }
}


// Bad
function watchSearchMovie(state) {
  $('.search-movie').click(function(event) {
    state.type = "movie";
    clearRecState(state);
    clearRecList(state);
    renderRecList(state);
    var queryTarget = $('.js-query');
    var query = queryTarget.val();
    if (query === "") {
      queryTarget.attr("placeholder", "TYPE IN ME TO SEARCH :)");
      return;
    } else {
      queryTarget.attr("placeholder", "Genre, movie, TV show...");
    }
    // clear out the input
    queryTarget.val("");

    // ALL OF THE ABOVE WILL REMAIN THE SAME
    getDataFromApi(query, state, "movie");
  });
}

// Bad
function watchSearchTV(state) {
  $('.search-tv').click(function(event) {
    state.type = "tv";
    clearRecState(state);
    clearRecList(state);
    renderRecList(state);
    var queryTarget = $('.js-query');
    var query = queryTarget.val();
    if (query === "") {
      queryTarget.attr("placeholder", "TYPE IN ME TO SEARCH :)");
      return;
    } else {
      queryTarget.attr("placeholder", "Genre, movie, TV show...");
    }
    // clear out the input
    queryTarget.val("");
    // ALL OF THE ABOVE WILL REMAIN THE SAME
    getDataFromApi(query, state, "tv");
  });
}



// Good
function watchAddtoList(state) {
  $('.js-rec-list').on('click', '.js-add', function(event) {
    var target = $(this).parent().parent();
    addToWishList(state, target);
    renderWishList(state);
  });
}

// Good
function watchRemoveFromList(state) {
  $('.js-chosen-list').on('click', '.js-remove', function(event) {
    var target = $(this).parent().parent();
    removeFromWishList(state, target);
    renderWishList(state);
  });
}

// For the more static introduction elements, this works.
function watchStart(state) {
  $('.explanation').on('click', '.js-start-button', function(event) {
    $(this).addClass('hidden');
    $('.explanation').addClass('hidden');
    $('.js-search-form').removeClass('hidden');
    $('.js-confused').removeClass('hidden');
    $('.your-list').removeClass('hidden');
  });
}

// For the more static introduction elements, this works.
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

// Good
function watchClear(state) {
  $('.js-clear').click(function(event) {
    clearWishState(state);
    renderWishList(state);
  });
}

// Fix
function watchNext(state) {
  $('.next').click(function(event) {
    state.page_num += 1;
    state.last_query.page += 1;
    clearRecList(state);
    renderRecList(state); // seems wrong
    getNewPageFromApi(state);
  });
}

// Fix
function watchPrevious(state) {
  $('.previous').click(function(event) {
    state.page_num -= 1;
    state.last_query.page -= 1;
    clearRecList(state);
    renderRecList(state); // Seems wrong
    getNewPageFromApi(state);
  });
}

// Good
function watchNewSearch(state) {
  $('.new-search').click(function(event) {
    clearRecState(state);
    clearRecList(state);
    renderRecList(state);
  });
}

// Good?
$(function() {
  watchSearchMovie(state);
  watchSearchTV(state);
  watchAddtoList(state);
  watchRemoveFromList(state);
  watchStart();
  watchConfused();
  watchClear(state);
  watchNewSearch(state);
  watchNext(state);
  watchPrevious(state);

  // watchClick();
  // watchDirector();
  // watchKeyword();

  // Need to do something that will activate the jumping mechanism?
  // Need to do something to watch for Previous and Next
});
