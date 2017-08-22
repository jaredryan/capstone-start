// A template for producing a result item
var RESULT_HTML_TEMPLATE = (
  '<div class="result-container">' + 
    '<div class="result">' +
        '<div class="row">' + 
            '<img class="js-result-image result-image" src="" alt="Awesome Movie Poster">' + 
        '</div>' + 

        '<div class="row">' + 
          '<div class="category cat-left">'+
            '<p class="js-summary summary tooltip">Summary<span class="tooltip-text summary-tooltip">Summary: \nNot registered</span></p>' + 
          '</div>'+
          '<div class="category cat-right">'+
            '<p class="js-netflix netflix tooltip">Netflix<span class="tooltip-text netflix-tooltip">Not on Netflix Roulette</span></p>' + 
          '</div>'+
        '</div>'+

        '<div class="row">' + 
          '<div class="category-2 cat-left">'+
            '<p class="js-similar similar tooltip">Similar<span class="tooltip-text similar-tooltip">Similar Movies: \nUndetermined</span></p>' + 
          '</div>'+
          '<div class="category-2">'+
            '<p class="js-genre genre tooltip">Genre<span class="tooltip-text genre-tooltip">Genre: \nNot registered</span></p>' +
          '</div>'+
          '<div class="category-2 cat-right">'+
            '<p class="js-details details tooltip">Details<span class="tooltip-text detail-tooltip">Details: \nNot registered</span></p>' +
          '</div>'+
        '</div>' +

        '<div class="row">' + 
          '<div class="category-3">'+
            '<p class="js-recommend recommend tooltip">Other Recommendations<span class="tooltip-text recommended-tooltip">Recommended Movies: \nUndetermined</span></p>' + 
          '</div>'+
        '</div>' +

        '<div class="row">' + 
          '<button type="button" class="js-add add">Add to Wish List</button>' +
          '<div class="go-button">' + 
            '<a href="#chosen-link" class="js-go go">' +
              '<button type="button" class="go-list">Go to Wish List</button>' + 
            '</a>' +
          '</div>' +
        '</div>' +

    '</div>' + 
  '</div>'
);

// A template for producing a wish list item
var WISH_HTML_TEMPLATE = (
  '<div class="result-container">' +
    '<div class="result">' +
      '<div class="row">' + 
          '<img class="js-result-image result-image" src="" alt="Awesome Movie Poster">' + 
      '</div>' + 

      '<div class="row">' + 
        '<div class="category cat-left">'+
          '<p class="js-summary summary tooltip">Summary<span class="tooltip-text summary-tooltip">Summary: \nNot registered</span></p>' + 
        '</div>'+
        '<div class="category cat-right">'+
          '<p class="js-netflix netflix tooltip">Netflix<span class="tooltip-text netflix-tooltip">Not on Netflix Roulette</span></p>' + 
        '</div>'+
      '</div>'+

      '<div class="row">' + 
        '<div class="category-2 cat-left">'+
          '<p class="js-similar similar tooltip">Similar<span class="tooltip-text similar-tooltip">Similar Movies: \nUndetermined</span></p>' + 
        '</div>'+
        '<div class="category-2">'+
          '<p class="js-genre genre tooltip">Genre<span class="tooltip-text genre-tooltip">Genre: \nNot registered</span></p>' +
        '</div>'+
        '<div class="category-2 cat-right">'+
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

    '</div>' +
  '</div>'
);

// Helper function to create a wish list item matching a result item.
function recToWishCopy(item) {
  var template = $(WISH_HTML_TEMPLATE);
  console.log(item);

  var image = item.find(".js-result-image").attr("src");
  var summary = item.find('.summary-tooltip').text();
  var netflix = item.find('.netflix-tooltip').text();
  var similar = item.find('.similar-tooltip').text();
  var genre = item.find('.genre-tooltip').text();
  var details = item.find('.detail-tooltip').text();
  var otherRecs = item.find('.recommended-tooltip').text();

  console.log(image);
  console.log(summary);
  console.log(netflix);
  console.log(similar);
  console.log(genre);
  console.log(details);
  console.log(otherRecs);

  template.find(".js-result-image").attr("src", image);
  template.find('.summary-tooltip').html(summary);
  template.find('.netflix-tooltip').html(netflix);
  template.find('.similar-tooltip').html(similar);
  template.find('.genre-tooltip').html(genre);
  template.find('.detail-tooltip').html(details);
  template.find('.recommended-tooltip').html(otherRecs);

  return template;
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

function addToWishList(state, item) {
  var template = $(WISH_HTML_TEMPLATE);
  var copy = recToWishCopy(item)
  state.wish_list.push(copy);
}

function removeFromWishList(state, item) {
  var index = state.wish_list.indexOf(item);
  state.wish_list.splice(index, 1);
}

function clearWishState(state) {
  state.wish_list = [];
}

function clearRecState(state) {
  state.page_num = 1;
  state.last_page = 1;
  state.last_url = "";
  state.last_query = null;
  state.type = "";
};

function clearRecList(state) {
  state.rec_list = [];
}

function setRecList(state, recList) {
  state.rec_list = recList;
}

function setMovieAsType(state) {
  state.type = "movie";
}

function setTVAsType(state) {
  state.type = "tv";
}

function moveUpAPage(state) {
  if (state.last_page > state.page_num) {
    state.page_num += 1;
    state.last_query.page += 1;
  }
}

function moveDownAPage(state) {
  if (state.page_num > 1) {
    state.page_num -= 1;
    state.last_query.page -= 1;
  }
}

function updateLastPage(state, numPages) {
  state.last_page = numPages;
}

function updateURL(state, url) {
  state.last_url = url;
}

function updateLastQuery(state, query) {
  state.last_query = query;
}

// DATA RETRIEVERS

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

function getDataFromNetflix(template, searchTitle) {
  // Wrapper for addNetflixData
  var toCallback = function(data) {
    addNetflixData(data, template);
  };
  // Configure query
  var query = {
    title: searchTitle,
    data: 1
  };
  // Make the request
  $.getJSON("https://netflixroulette.net/api/api.php", query, toCallback);
}

function addNetflixData(data, template) {
  // Format the results
  var ratingString = "On Netflix Roulette\nRating: ";
  if (data.rating !== null) {
    ratingString += data.rating;
  } else {
    ratingString += "Undetermined"
  }
  // Insert the results, if any
  template.find('.netflix-tooltip').text(ratingString);
}

// TMDB SIMILAR SECTION RETRIEVAL

function getSimilarTitles(template, ID, state) {
  // Wrapper for addNetflixData
  var callback = function(data) {
    addSimilarData(data, template, state);
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

function addSimilarData(data, template, state) {
  var string = '';
  if (data.results !== null) {
      // Format the results

      // If movie, else tv
      if (state.type === "movie") {
        data.results.map(function(item) {
          string += item.title + ", ";
        });
      } else {
        data.results.map(function(item) {
          string += item.name + ", ";
        });
      }

      string = string.slice(0, -2);
      var similarString = "Similar Movies: \n" + string;
      // Insert the results, if any
      if (string !== "") {
        template.find('.similar-tooltip').text(similarString);
      }
  } 
}

// TMDB RECOMMENDED SECTION RETRIEVAL

function getRecommendedTitles(template, ID, state) {
  // Wrapper for addRecommendedData
  var callback = function(data) {
    addRecommendedData(data, template, state);
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

function addRecommendedData(data, template, state) {
  var string = '';
  if (data.results !== null) {
      // Format the results
      if (state.type === "movie") {
        data.results.map(function(item) {
          string += item.title + ", ";
        });
      } else {
        data.results.map(function(item) {
          string += item.name + ", ";
        });
      }

      string = string.slice(0, -2);
      var recString = "Recommended Movies: \n" + string;
      // Insert results, if any
      if (string !== "") {
        template.find('.recommended-tooltip').text(recString);
      }
  } 
}



function getMoreDetails(template, ID, state, details) {
  // Wrapper for add functions for movie/tv
  var callback;
  if (state.type === "movie") {
    callback = function(data) {
      addTitleData(data, template, details);
    };
  } else {
    callback = function(data) {
      addNameData(data, template, details);
    };
  }

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

// TMDB movie retrieval
function addTitleData(data, template, newDetail) {
  // Get genre and insert
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

  // Format and insert new details
  newDetail += "<span>Runtime: ";
  if (data.runtime !== null && data.runtime !== 0 && data.runtime !== "") {
    newDetail += (data.runtime + " min</span>");
  } else {
    newDetail += "Not Registered</span>";
  }
  // Insert details
  template.find('.detail-tooltip').html(newDetail);
}

// TMDB TV retrieval
function addNameData(data, template, newDetail) {
  // Get genre and insert
  var string = '';
  if (data.genres !== null) {
    // Format the results
    data.genres.map(function(item) {
      string += item.name + ", ";
    });
    string = string.slice(0, -2);
    var genre = "Genres: \n" + string;
    // Insert the results, if any
    if (string !== "") {
        template.find('.genre-tooltip').text(genre);
    }
  } 

  // FORMAT AND ADD NEW DETAILS

  // Accomodate seasons
  newDetail += "<span>Number of Seasons: ";
  if (data.number_of_seasons !== null && data.number_of_seasons !== 0 && data.number_of_seasons !== "") {
    newDetail += (data.number_of_seasons + "\n</span>");
  } else {
    newDetail += "Not Registered\n</span>";
  }

  // Accomodate airtime 
  newDetail += "<span>Airtime: ";
  if (data.first_air_date !== null && data.first_air_date !== "") {
    if (data.last_air_date !== null && data.last_air_date !== "") {
      newDetail += (data.first_air_date + " to " + data.last_air_date + "\n</span>");
    } else {
      newDetail += ("Began in " + data.first_air_date + "\n</span>");
    }
  } else if (data.last_air_date !== null && data.last_air_date !== "") {
    newDetail += ("Ended in " + data.last_air_date + "\n</span>");
  } else {
    newDetail += ("Not registered\n</span>");
  }

  // Accomodate episode length
  newDetail += "<span>Episode Length: ";
  if (data.episode_run_time !== null && data.episode_run_time !== 0 && data.episode_run_time == []) {
    newDetail += (data.episode_run_time + " min</span>");
  } else {
    newDetail += "Not Registered</span>";
  }

  // Insert details
  template.find('.detail-tooltip').html(newDetail);
}


// FORMATS RETRIEVED DATA

// Callback function for getPageFromApi to process the result
function formatAndAddSearchData(data, state) {
  // First update state to this page
  var lastPage = data.total_pages;
  updateLastPage(state, lastPage);
  // Now, process the data.
  var recList;
  if (state.type == "movie") {
    recList = data.results.map(function(item) {
       return formatMovieResult(state, item);
    });
  } else {
    recList = data.results.map(function(item) {
       return formatTVResult(state, item);
    });
  }
  
  // Done to make sure recList is updated before rendering it
  function orderExec(state1, rec_list, callback) {
    setRecList(state1, rec_list);
    callback(state1);
  }

  orderExec(state, recList, renderRecList);
}

// 1. For movies
// 2. Performed on each result item received in JSON file.
// 3. It retrieves data from the item, performs more searches to retrieve
// more information, and inserts all data into a RESULT_HTML_TEMPLATE item.
function formatMovieResult(state, result) {
  // Create template
  var template = $(RESULT_HTML_TEMPLATE);

  // Retrieve and add movie poster...what do I do in the case of a bad poster?
  if (result.poster_path !== null) {
    var string = "http://image.tmdb.org/t/p/w185/" + result.poster_path;
    template.find(".js-result-image").attr("src", string);
  }

  // Retrieve attributes, making sure they exist
  var sumTitle;
  if (result.title !== null && result.title !== "") {
    sumTitle = result.title;
  } else {
    sumTitle = "Not registered";
  }

  var sumOverview;
  if (result.overview !== null && result.overview !== "") {
    sumOverview = result.overview;
  } else {
    sumOverview = "Not registered";
  }

  var detPop;
  if (result.popularity !== null && result.popularity !== 0) {
    detPop = result.popularity;
  } else {
    detPop = "Not registered";
  }

  var detRel;
  if (result.release_date !== null && result.release_date !== "") {
    detRel = result.release_date;
  } else {
    detRel = "Not registered";
  }

  // Prepare attributes for template
  var summary = "<span>Title: " + sumTitle + "\n</span>" + 
                "<span>Description: " + sumOverview + "\n</span>";

  var details = "<span>Popularity: " + detPop + "\n</span>" + 
                "<span>Release: " + detRel + "\n</span>";


  // Add attributes to template
  template.find('.summary-tooltip').html(summary);
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
    getMoreDetails(template, result.id, state, details);
  } catch(e) {
    console.log(e);
  }
  // Adds the formatted entry to the Recommended List.
  return template;
}

// 1. For TV shows
// 2. Performed on each result item received in JSON file.
// 3. It retrieves data from the item, performs more searches to retrieve
// more information, and inserts all data into a RESULT_HTML_TEMPLATE item.
function formatTVResult(state, result) {
  // Create template
  var template = $(RESULT_HTML_TEMPLATE);

  // Retrive and add TV poster...what do I do in the case of a bad poster?
  if (result.poster_path !== null) {
    var string = "http://image.tmdb.org/t/p/w185/" + result.poster_path;
    template.find(".js-result-image").attr("src", string);
  }

  // Retrieve attributes, making sure they exist
  var sumTitle;
  if (result.title !== null && result.title !== "") {
    sumTitle = result.name;
  } else {
    sumTitle = "Not registered";
  }

  var sumOverview;
  if (result.overview !== null && result.overview !== "") {
    sumOverview = result.overview;
  } else {
    sumOverview = "Not registered";
  }

  var detPop;
  if (result.popularity !== null && result.popularity !== 0) {
    detPop = result.popularity;
  } else {
    detPop = "Not registered";
  }

  // Prepare attributes for template
  var summary = "<span>Title: " + sumTitle + "\n</span>" + 
                "<span>Description: " + sumOverview + "\n</span>";

  var details = "<span>Popularity: " + detPop + "\n</span>";

  // Add attributes to template
  template.find('.summary-tooltip').html(summary);
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
    getMoreDetails(template, result.id, state, details);
  } catch(e) {
    console.log(e);
  }
  // Adds the formatted entry to the Recommended List.
  return template;
}


// RENDER ELEMENTS

function renderWishList(state) {
  console.log(state.wish_list);
  if (state.wish_list.length === 0) {
    $('.js-chosen-list').html("");
    $('.js-clear').addClass("hidden")
  } else {
    var results = state.wish_list.map(function(item) {
       return item;
    });
    $('.js-chosen-list').html(results);
    $('.js-clear').removeClass("hidden");
  }
}

function renderRecList(state) {
  // Render Items
  if (state.rec_list == []) {
    $('.js-rec-list').html("");
  } else {
    var results = state.rec_list.map(function(item) {
      return item;
    });
    $('.js-rec-list').html(results);
  }

  // Render Prev, Try Again,  and Next, respectively
  if (state.page_num === 1) {
    $('.previous').addClass("hidden");
  } else {
    $('.previous').removeClass("hidden");
  }

  $('.js-try-again').removeClass("hidden");

  if (state.page_num < state.last_page) {
    $('.next').removeClass("hidden");
  } else {
    $('.next').addClass("hidden");
  }
}

// Helper function to getTerm for Searches
function getTerm(state) {
  // Get new input
  var queryTarget = $('.js-query');
  var query = queryTarget.val();
  // Account for lack of input, if necessary
  if (query === "") {
    queryTarget.attr("placeholder", "TYPE IN ME TO SEARCH :)");
  } else {
    // Reset search bar
    queryTarget.attr("placeholder", "Movie, TV show...");
    queryTarget.val("");
  }
  return query;
}

// EVENT LISTENERS


// When "Start" is clicked, makes format changes for it
function watchStart(state) {
  $('.explanation').on('click', '.js-start-button', function(event) {
    $(this).addClass('hidden');
    $('.explanation').addClass('hidden');
    $('.js-search-form').removeClass('hidden');
    $('.js-confused').removeClass('hidden');
    $('.your-list').removeClass('hidden');
  });
}

// When "Confused?" is clicked, makes format changes for it
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

// When "Search Movie!" is clicked, makes the request and displays it
function watchSearchMovie(state) {
  $('.search-movie').click(function(event) {
    var searchTerm = getTerm(state);
    if (searchTerm === "") {
      return;
    }
    clearRecState(state);
    clearRecList(state);
    setMovieAsType(state);
    getDataFromApi(state, searchTerm);
    // Hacky solution
    var renderFunct = function(state) {
      renderRecList(state);
    };
    renderFunct(state);
  });
}

// When "Search TV!" is clicked, makes the request and displays it
function watchSearchTV(state) {
  $('.search-tv').click(function(event) {
    var searchTerm = getTerm(state);
    if (searchTerm === "") {
      return;
    }
    clearRecState(state);
    clearRecList(state);
    setTVAsType(state);
    getDataFromApi(state, searchTerm);
    // Hacky solution
    var renderFunct = function(state) {
      renderRecList(state);
    };
    renderFunct(state);
  });
}

// When "New Search" is clicked, it clears the recommended list
function watchNewSearch(state) {
  $('.new-search').click(function(event) {
    clearRecState(state);
    clearRecList(state);
    renderRecList(state);
    $('.js-try-again').addClass("hidden");
  });
}

// When "Next" is clicked, it performs a new query for the next page and displays it
function watchNext(state) {
  $('.next').click(function(event) {
    moveUpAPage(state);
    clearRecList(state);
    getPageFromApi(state);
    // Hacky solution
    var renderFunct = function(state) {
      renderRecList(state);
    };
    renderFunct(state);
  });
}

// When "Try Again" is clicked, it performs a new query and displays it
function watchTryAgain(state) {
  $('.js-try-again').click(function(event) {
    clearRecList(state);
    getPageFromApi(state);
    // Hacky solution
    var renderFunct = function(state) {
      renderRecList(state);
    };
    renderFunct(state);
  });
}

// When "Previous" is clicked, it performs a new query for the next page and displays it
function watchPrevious(state) {
  $('.previous').click(function(event) {
    moveDownAPage(state);
    clearRecList(state);
    getPageFromApi(state);
    // Hacky solution
    // var renderFunct = function(state) {
    //   renderRecList(state);
    // };
    // renderFunct(state);
  });
}

// When "Add to List" is clicked, it adds the result item to the wish list
function watchAddtoList(state) {
  $('.js-rec-list').on('click', '.js-add', function(event) {
    var target = $(this).parent().parent();
    addToWishList(state, target);
    renderWishList(state);
  });
}

// When "Remove" is clicked, it removes the wish list item from the wish list
function watchRemoveFromList(state) {
  $('.js-chosen-list').on('click', '.js-remove', function(event) {
    var target = $(this).parent().parent();
    removeFromWishList(state, target);
    renderWishList(state);
  });
}

// When "Clear List" is clicked, it removes all wish list items from the wish list
function watchClear(state) {
  $('.js-clear').click(function(event) {
    clearWishState(state);
    renderWishList(state);
  });
}

// EVENT LISTENERS AT WORK

$(function() {
  watchStart();
  watchConfused();
  watchSearchMovie(state); // Hacky solution
  watchSearchTV(state); // Hacky solution
  watchNewSearch(state);
  watchNext(state); // Hacky solution
  watchTryAgain(state); // Hacky solution
  watchPrevious(state); // // Hacky solution
  watchAddtoList(state);
  watchRemoveFromList(state);
  watchClear(state);
});
