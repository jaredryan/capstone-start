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

// Helper function to convert a recommended item to a wish-list item.
function recToWishCopy(item) {
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

  return item;
}

// STATE

var state = {
  wish_list : [],
  rec_list : [],
  page_num: 1,
  last_page: 1,
  last_url: "",
  last_query: null,
  type: ""
};

// FUNCTIONS THAT UPDATE STATE

// Good
function addToWishList(state, item) {
  var template = $(WISH_HTML_TEMPLATE);
  var copy = recToWishCopy(item)
  state.wish_list.push(copy);
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

// Good
function setMovieAsType(state) {
  state.type = "movie";
}

// Good
function setTVAsType(state) {
  state.type = "tv";
}

// Good
function moveUpAPage(state) {
  state.page_num += 1;
  state.last_query.page += 1;
}

// Good
function moveDownAPage(state) {
  state.page_num -= 1;
  state.last_query.page -= 1;
}

// Good
function updateLastPage(state, numPages) {
  state.last_page = numPages;
}

// Good
function updateURL(state, url) {
  state.last_url = url;
}

// Good
function updateLastQuery(state, query) {
  state.last_query = query;
}

// DATA RETRIEVERS

// Good
function getDataFromApi(state, searchTerm) {
  // Configure state accordingly
  var url = "https://api.themoviedb.org/3/search/" + state.type;
  updateURL(state, url);
  updateLastQuery(state, {
    query : searchTerm,
    api_key : "89ac11ce0fa4d53d4c4df236630139ab",
    page : state.page_num,
  });
  // Request Page
  getPageFromApi(state);
};

// Good
function getPageFromApi(state) {
  // Wrapper for formatAndAddSearchData
  var toCallback = function(data) {
    formatAndAddSearchData(data, state);
  };
  // Make request and on data received, run toCallback(data)
  $.ajax({
    url: state.last_url, 
    data: state.last_query, 
    dataType: "jsonp",
    success: toCallback
  });
}

// NETFLIX RETRIEVAL

// Good
function getDataFromNetflix(template, searchTitle) {
  // Wrapper for addNetflixData
  var callback = function(data) {
    addNetflixData(data, template);
  };
  // Configure query
  var query = {
    title: searchTitle,
    data: 1
  };
  // Make the request
  $.getJSON("https://netflixroulette.net/api/api.php", query, callback);
}

// Good
function addNetflixData(data, template) {
  // Format the results
  var ratingString = "On Netflix Roulette\nRating: ";
  if (data.rating !== null) {
    ratingString += data.rating;
  } else {
    ratingString += "Undetermined"
  }
  // Add the results, if any
  template.find('.netflix-tooltip').text(ratingString);
}

// TMDB SIMILAR SECTION RETRIEVAL

function getSimilarTitles(template, ID, state) {
  // Wrapper for addNetflixData
  var callback = function(data) {
    addSimilarData(data, template);
  };
  // Configure query
  var query = {
    api_key: "89ac11ce0fa4d53d4c4df236630139ab"
  }
  var stringUrl = "https://api.themoviedb.org/3/" + state.type + "/" + ID + "/similar";
  // Make the request
  $.ajax({
    url: stringUrl, 
    data: query, 
    dataType: "jsonp",
    success: callback
  });
}

// The double if statements here is bad...fix later
function addSimilarData(data, template) {
  var string = '';
  if (data.results !== null) {
      // Format the results
      data.results.map(function(item) {
        string += item.title + ", ";
      });
      string = string.slice(0, -2);
      var similarString = "Similar Movies: \n" + string;
      // Add the results, if any
      if (string !== "") {
        template.find('.similar-tooltip').text(similarString);
      }
  } 
}

// TMDB RECOMMENDED SECTION RETRIEVAL

// Good
function getRecommendedTitles(template, ID, state) {
  // Wrapper for addRecommendedData
  var callback = function(data) {
    addRecommendedData(data, template);
  };
  // Configure query
  var query = {
    api_key: "89ac11ce0fa4d53d4c4df236630139ab"
  }
  var stringUrl = "https://api.themoviedb.org/3/" + state.type + "/" + ID + "/recommendations";
  // Make the request
  $.ajax({
    url: stringUrl, 
    data: query, 
    dataType: "jsonp",
    success: callback
  });
}

// The double if statements here is bad...fix later
function addRecommendedData(data, template) {
  var string = '';
  if (data.results !== null) {
      // Format the results
      data.results.map(function(item) {
        string += item.title + ", ";
      });
      string = string.slice(0, -2);
      var recString = "Recommended Movies: \n" + string;
      // Add results, if any
      if (string !== "") {
        template.find('.recommended-tooltip').text(recString);
      }
  } 
}

// TMDB DETAILS SECTION RETRIEVAL

// Good
function getMoreDetails(template, ID, state) {
  // Wrapper for addTitleData
  var callback = function(data) {
    addTitleData(data, template);
  };
  // Configure query
  var query = {
    api_key: "89ac11ce0fa4d53d4c4df236630139ab"
  }
  var stringUrl = "https://api.themoviedb.org/3/" + state.type + "/" + ID;
  // Make the request
  $.ajax({
    url: stringUrl,
    data: query, 
    dataType: "jsonp",
    success: callback
  });
}

// It's okay...
function addTitleData(data, template) {
  // Add Genre...the double if statements here is bad...fix later
  var string = '';
  if (data.genres !== null) {
    // Format the results
    data.genres.map(function(item) {
      string += item.name + ", ";
    });
    string = string.slice(0, -2);
    var genre = "Genres: \n" + string;
    // Add the results, if any
    if (string !== "") {
        template.find('.genre-tooltip').text(genre);
    }
  } 

  // Format Details
  var newDetail = "<span>Runtime: ";
  if (data.runtime !== null && data.runtime !== 0) {
    newDetail += (data.runtime + " min</span>");
  } else {
    newDetail += "Not Registered</span>";
  }
  // Get Previous Details
  var detailHTML = template.find('.detail-tooltip').val();
  var finalHTML = detailString + newDetail;
  // Add New Details
  template.find('.detail-tooltip').html(finalHTML);
}


// FORMATS RETRIEVED DATA

// Good
function formatAndAddSearchData(data, state) {
  // First update state to this page
  var lastPage = data.total_pages;
  updateLastPage(state, lastPage);
  // Now, process the data.
  data.results.map(function(item) {
     formatAndAddResult(state, item);
  });
}

// As good as I can
function formatAndAddResult(state, result) {
  // Create template
  var template = $(RESULT_HTML_TEMPLATE);

  // Retrive and add movie poster...what do I do in the case of a bad poster?
  if (result.poster_path !== null) {
    var string = "http://image.tmdb.org/t/p/w185/" + result.poster_path;
    template.find(".js-result-image").attr("src", string);
  }

  // Retrieve and add title and overview to the Summary.
  var summary = "<span>Title: " + result.title + "\n</span>" + 
                "<span>Description: " + result.overview + "\n</span>";
  template.find('.summary-tooltip').html(summary);
  // Retrieve and add details to the Details.
  var details = "<span>Popularity: " + result.popularity + "\n</span>" + 
                "<span>Release: " + result.release_date + "\n</span>";
  template.find('.detail-tooltip').html(details);

  // Attempts to retrieve and add Netflix Roulette data.
  try {
    getDataFromNetflix(template, result.title);
  } catch(e) {
    console.log(e);
  }
  // Attempts to retrieve and add Similar Titles data.
  try {
    getSimilarTitles(template, result.id, state);
  } catch(e) {
    console.log(e);
  }
  // Attempts to retrieve and add Recommended Titles from TMDB.
  try {
    getRecommendedTitles(template, result.id, state);
  } catch(e) {
    console.log(e);
  }
  // Attempts to retrieve and add Details from TMDB.
  try {
    getMoreDetails(template, result.id, state);
  } catch(e) {
    console.log(e);
  }

  // Adds the formatted entry to the Recommended List.
  addToRecList(state, template);
}

// RENDER ELEMENTS

// GOOD
function renderWishList(state) {
  if (state.wish_list === []) {
    $('.js-chosen-list').html("");
  } else {
    var results = state.wish_list.map(function(item) {
       return item;
    });
    $('.js-chosen-list').html(results);
  }
}

// Good
function renderRecList(state) {
  // Render Items
  if (state.rec_list === []) {
    $('.js-chosen-list').html("");
  } else {
    var results = state.rec_list.map(function(item) {
      return item;
    });
    $('.js-rec-list').html(results);
  }
  
  // Render Prev and Next, respectively
  if (state.page_num === 1) {
    $('.previous').addClass("hidden");
  } else {
    $('.previous').removeClass("hidden");
  }

  if (state.page_num < state.last_page) {
    $('.next').removeClass("hidden");
  } else {
    $('.next').addClass("hidden");
  }
}

// Helper function to prepare for Searches
function prepareForSearch(state) {
  // Clean up
  clearRecState(state);
  clearRecList(state);
  // Get new input
  var queryTarget = $('.js-query');
  var query = queryTarget.val();
  // Account for lack of input, if necessary
  if (query === "") {
    queryTarget.attr("placeholder", "TYPE IN ME TO SEARCH :)");
    return;
  } else {
    queryTarget.attr("placeholder", "Genre, movie, TV show...");
  }
  // Clear out the input and return it
  queryTarget.val("");
  return query;
}

// EVENT LISTENERS

// Good. For the more static introduction elements, this works.
function watchStart(state) {
  $('.explanation').on('click', '.js-start-button', function(event) {
    $(this).addClass('hidden');
    $('.explanation').addClass('hidden');
    $('.js-search-form').removeClass('hidden');
    $('.js-confused').removeClass('hidden');
    $('.your-list').removeClass('hidden');
  });
}

// Good. For the more static introduction elements, this works.
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

// Good but doesn't function
function watchSearchMovie(state) {
  $('.search-movie').click(function(event) {
    setMovieAsType(state);
    var query = prepareForSearch(state);
    getDataFromApi(state, query);
    renderRecList(state);
  });
}

// Good but doesn't function
function watchSearchTV(state) {
  $('.search-tv').click(function(event) {
    setTVAsType(state);
    var query = prepareForSearch(state);
    getDataFromApi(state, query);
    renderRecList(state);
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

// Good but doesn't function
function watchNext(state) {
  $('.next').click(function(event) {
    moveUpAPage(state);
    clearRecList(state);
    getPageFromApi(state);
    renderRecList(state);
  });
}

// Good but doesn't function
function watchPrevious(state) {
  $('.previous').click(function(event) {
    moveDownAPage(state);
    clearRecList(state);
    getPageFromApi(state);
    renderRecList(state);
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

// Good
function watchClear(state) {
  $('.js-clear').click(function(event) {
    clearWishState(state);
    renderWishList(state);
  });
}

// Good
$(function() {
  watchStart();
  watchConfused();
  watchSearchMovie(state);
  watchSearchTV(state);
  watchNewSearch(state);
  watchNext(state);
  watchPrevious(state);
  watchAddtoList(state);
  watchRemoveFromList(state);
  watchClear(state);
});
