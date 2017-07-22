var RESULT_HTML_TEMPLATE = (
  '<div class="result">' +
      '<div class="row tooltip">' + 
          '<img class="js-result-image result-image" src="" alt="Awesome Movie Poster">' + 
      '</div>' + 

      '<div class="row">' + 
        '<div class="category">'+
          '<p class="js-summary summary tooltip">Summary<span class="tooltip-text summary-tooltip"></span></p>' + 
        '</div>'+
        '<div class="category">'+
          '<p class="js-genre genre tooltip">Netflix<span class="tooltip-text">Netflix</span></p>' + 
        '</div>'+
      '</div>'+

      '<div class="row">' + 
        '<div class="category-2">'+
          '<p class="js-cast cast tooltip">Cast<span class="tooltip-text">Cast</span></p>' + 
        '</div>'+
        '<div class="category-2">'+
          '<p class="js-netflix netflix tooltip">Genre<span class="tooltip-text">Genre</span></p>' +
        '</div>'+
        '<div class="category-2">'+
          '<p class="js-details details tooltip">Details<span class="tooltip-text detail-tooltip">Detals</span></p>' +
        '</div>'+
      '</div>' +

      '<div class="row">' + 
        '<button class="js-add add">Add to List?</button>' + 
      '</div>' +

  '</div>'
);

var state = {
  wish_list : []
};

function addToWishList(state, item) {
  state.wish_list.push(item);
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

function getDataFromApi(searchTerm, callback) {
  var query = {
    query: searchTerm,
    api_key: "89ac11ce0fa4d53d4c4df236630139ab"
    // Insert relevant parameters here
  }
  $.ajax({
    url: "https://api.themoviedb.org/3/search/movie", 
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



function renderResult(result) {
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
  var details = "<span>Popularity: " + result.popularity + "</span><br>" + 
                "<span>Release: " + result.release_date + "</span><br>";
  template.find('.detail-tooltip').html(details);

  return template;
}

function renderWishList(state) {
  var results = state.wish_list.map(function(item) {
     return item;
  });
  $('.js-chosen-list').html(results);
}

// Done
function displaySearchData(data) {
  var results = data.results.map(function(item) {
     return renderResult(item);
  });
  $('.js-rec-list').html(results);
}


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

function watchSearch() {
  $('.search-button').click(function(event) {
    var queryTarget = $('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    // ALL OF THE ABOVE WILL REMAIN THE SAME
    getDataFromApi(query, displaySearchData);
  });
}

function watchAddtoList(state) {
  $('.js-add').click(function(event) {
    console.log(event);
    var target = $(this).parent().parent();
    console.log(target);
    addToWishList(state, target);
    renderWishList(state);
  });
}

// This is also fine
$(function() {
  watchSearch();
  watchAddtoList(state);
  // watchClick();
  // watchDirector();
  // watchKeyword();

  // Need to do something that will activate the jumping mechanism?
  // Need to do something to watch for Previous and Next
});
