Application: MovieRecs
Summary: Search for TV shows or movies to find recommendations based off them, learn more about them, and see availability on Netflix.
Demo URL: https://jaredryan.github.io/capstone-start/

Table of Contents:
1. Summary
2. Files
3. How the Application Works
4. How to Use the Application
5. Credits
  
1. Summary

This app uses an API from The Movie Database (https://www.themoviedb.org/documentation/api) and an API from Netflix Roulette (https://netflixroulette.net/api/). It performs a search for a movie or for a TV using the appropriate method of the API from The Movie Database. Upon retrieving movies or TV shows, it performs additional queries within the The Movie Database and Netflix Roulette to gather mre information about the movie or TV show. It then displays 20 of these results within the "Results" portion of the application.

An essential part of the application is that it also keeps a running "Wish List". When the results are displayed, one may select to add them to the "Wish List", which is displayed at the bottom of the application. This helps the user to look through the movies and keep track of the ones they want to look at later.

An explanation on how to use the application, as well as various navigational and display-altering buttons, are included for the user's convenience.

2. Files

The following files are contained within one folder: (https://github.com/jaredryan/capstone-start)
  README.md (https://github.com/jaredryan/capstone-start/blob/master/README.md)
  index.html (https://github.com/jaredryan/capstone-start/blob/master/index.html)
  main.css (https://github.com/jaredryan/capstone-start/blob/master/main.css)
  app.js (https://github.com/jaredryan/capstone-start/blob/master/app.js)
  favicon.ico (https://github.com/jaredryan/capstone-start/blob/master/favicon.ico)
  
3. How the Application Works

This application employs the heavy use of JavaScript to function. It also makes extensive use of the API from The Movie Database—the following link takes you to the documentation of how to use it: https://developers.themoviedb.org/3/getting-started. The starting point is https://api.themoviedb.org/3.

First, depending on user input, a GET /search/movies or GET /search/TV is performed, which returns a 20 element of array.
  The title of the movie, or name of the TV show, is recorded along with the appropriate ID. 
Second, using GET /movie/id or /tv/id, the object returned contains additional details about the movie.
Third, a GET /movie/id/similar or /tv/id/similar query is done to retrieve an array of objects corresponding to similar movies.
Fourth, in a similarly (pun intended) fashion, a GET /movie/id/recommendations or /tv/id/recommendations is done to retrieve an array of objects corresponding to recommended movies. 
All of the retrieved data is inserted into a HTML template to format the data.

While the second, third, and fourth searches are happening, a fifth query is also taking place. However, it is done through the use of a second API from Netflix Roulette (https://netflixroulette.net/api/). It performs a search for a movie or for a TV show by using GET on http://netflixroulette.net/api/api.php. A search by title is performed, and the retrieved entry's data is inserted into the HTML template.

The second, third, fourth, and fifth queries each occur 20 times, once for each of the twenty entries returned by the first query.

However, the APIs are a bit faulty, so the search is success about 70% of the time. As such, a "Try Again" button was incorporated to allow the user to perform the same query until it is successful.

JavaScript powers the rest of the application. The most notable feature is the Wish List. It's entries are added to when specificied by the user, at which point, JavaScript takes the values associated with one result item, copies them into an HTML template similar to that used by the result item, and displays it. 

Other JavaScript functions are mostly there for the convenience of the user, such as an explanation of how to use the app that you can toggle on or off by clicking the "Confused?" button, buttons that take you to the part of the application that you want to go to, a "Clear List" button to clear all entries on the Wish List, and a "New Search" button that clears the results page and guides you to the search bar.

4. How to Use the Application

5. Credits

-The Movie Database (https://www.themoviedb.org/) and 
-Netflix Roulette (https://netflixroulette.net/), for having Public APIs for developers to use. 
-Thinkful (https://www.thinkful.com/), whose Frontend Web Development course gave me the skills to do this project.
