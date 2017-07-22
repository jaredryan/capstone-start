var RESULT_HTML_TEMPLATE = (
  '<div class="result">' +
      '<a class="js-result-image" href="">Video?</a>' + 
      '<p class="js-result-title"></p>' + 
      '<p class="js-result-type"></p>' + 
      '<p class="js-result-teaser"></p>' + 
      '<a class="js-result-wURL" href="">Learn More</a>' + 
  '</div>'
);


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
    q: searchTerm,
    key: "QS2J66v7DgzghRrE21wvg"
    // Insert relevant parameters here
  }
  $.ajax({
    url: "https://www.goodreads.com/search/index.xml", 
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

  template.find(".js-result-image").attr("href", result.yURL);
  template.find(".js-result-title").text(result.Name);
  template.find(".js-result-type").text(result.Type);
  template.find(".js-result-teaser").text(result.wTeaser);
  template.find(".js-result-wURL").attr("href", result.wURL);
  return template;
}

// Done
function displaySearchData(data) {
  console.log(data);
  // var results = data.Similar.Results.map(function(item) {
  //    return renderResult(item);
  // });
  // $('.js-rec-list').html(results);
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

// This is also fine
$(function() {
  // watchClick();
  watchSearch();
  // watchDirector();
  // watchKeyword();
  // watchAddtoList();

  // Need to do something that will activate the jumping mechanism?
  // Need to do something to watch for Previous and Next
});
