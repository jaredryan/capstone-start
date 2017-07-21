var NETFLIX_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


var RESULT_HTML_TEMPLATE = (
  '<div class="result">' +
      // Insert relevant content that I want to display
  '</div>'
);

function getDataFromApi(searchTerm, callback) {
  var query = {
    q: searchTerm,
    // Insert relevant parameters here
  }
  $.getJSON(NETFLIX_SEARCH_URL, query, callback);
}


function renderResult(result) {
  
  var template = $(RESULT_HTML_TEMPLATE);
  // Alter what needs to be altered
  
  return template;
}

function displaySearchData(data) {
  var results = data.items.map(function(item, index) {
     return renderResult(item);
  });
  $('.js-rec-list').html(results);
}


// This is fine
function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    // ALL OF THE ABOVE WILL REMAIN THE SAME
    getDataFromApi(query, displaySearchData);
  });
}

// This is also fine
$(function() {
  watchSubmit();
  watchAddtoList();
  // Need to do something that will activate the jumping mechanism?
  // Need to do something to watch for Previous and Next
});
