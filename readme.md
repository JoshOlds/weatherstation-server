# Boise Weather Server

Boise Weather Server is the Node.js backend half of the 'Boise Weather' project. This server is hosted on Heroku.com



### Front End:
The Boise Weather server hosts a front-end interface for viewing a graphical representation of the logged weather data. This is a single-page application that heavily utilizes [Chart.js](www.chartjs.org/) for data visualization. The page utilizes [Zurb Foundation](http://foundation.zurb.com/) for the styling, as well as [jQuery](https://jquery.com/) for DOM manipulation and AJAX calls. 

### Back End:
The Boise Weather server backend is running [Node.js](https://nodejs.org/en/) and a suite of server-specific libraries. All weather data is stored using [Google Firebase](https://firebase.google.com/). The purpose of the server backend is to both host the static front-end HTML page, as well as to provide a robust API for interfacing with the Firebase Database. The API provided by the server backend is also used by the Beaglebone Weather hardware when POSTing data to the Firebase Database.

#### Credits:
Both the hardware and software for this project was designed and coded by [Joshua Olds](https://www.linkedin.com/in/joshua-olds-91499b122)