//====================VARIABLES====================//

//----------To obtain the Keys----------//
var keys = require("./keys.js");


//----------Twitter Variables----------//
var Twitter = require("twitter");
var twitterClient = new Twitter(keys.twitterKeys);
var twitterName = "genieegengen";
var params = {
	screen_name: twitterName,
	count: 8
};


//----------Spotify Variables----------//
var Spotify = require("node-spotify-api");
var spotifyClient = new Spotify(keys.spotifyKeys);


//----------Movie Variables----------//
var request = require("request");
var nodeArgs = process.argv[2];


//----------Do What it Says & Log Variable-----//
var fs = require("fs");




//====================Twitter Information====================//

if(nodeArgs === "my-tweets") {
	myTweets();
}

function myTweets() {

	//-----Checking if keys are loading-----//
	// console.log(keys.twitterKeys);
	// console.log(twitterClient);
	//-------------------------------------//

	twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
		
		//-----success-----..
		if (!error && response.statusCode === 200) {

			//----- twitter name-----//
			console.log("=====MY TWITTER TWEETS=====");
			console.log(tweets[0].user.name + " @" + tweets[0].user.screen_name);
			console.log(" ");
			
			// log //
			log("\n==================================================" + 
				"\nMy Twitter Name: " + tweets[0].user.name + " @" + tweets[0].user.screen_name + 
				"\n==================================================");

			//-----gets my tweets-----//
			for (var i = 0; i < (params.count); i++) {
				console.log(" ");	
				console.log("My Tweets: " + tweets[i].text);
				console.log(tweets[i].created_at);
				console.log("------------------------------");
				
				// log //
				log("\nMy Tweets: " + tweets[i].text + 
					"\nCreated On: " + tweets[i].created_at + 
					"\n--------------------\n");
			}
		}

		//-----error-----//
		else {
	    	console.log('Error occurred: ' + error);
		}
	});
}


//====================Song Information====================//

if (nodeArgs === "spotify-this-song") {

	//-----user's song-----//	
	var songName = process.argv.slice(3).join(" ");

	//-----no user input, then default-----//
	if (songName === ""){
		songName = "The Sign";
		console.log("Since you did not type a song, I recommend listening to " + songName +" by Ace of Base.");
		console.log(" ");
	}
	spotifyThisSong(songName);
}


function spotifyThisSong(songName) {
	
	//-----Searching for song name-----//
	console.log("=====MY SONG SEARCH=====");
	console.log("Searching for: " + songName);
	
	// log //
	log("\n==================================================" +
		"\nSearching For: " + songName +
		"\n==================================================");

	//-----Checking if keys are loading-----//
	//console.log(keys.spotifyKeys);
	//console.log(spotifyClient);
	//-------------------------------------//

	//-----API method to find a song-----//
	spotifyClient.search({ type: 'track', query: songName }, function(error, songInfo) {
		
		//-----error-----//
		if (error) {
	    	console.log('Error occurred: ' + error);
		}

		//-----success-----//
		else {

			//-----info about the results-----//
		  	console.log('I got ' + songInfo.tracks.total + ' results!');
			console.log(" ");	

		  	//-----gets artist, title, album, etc-----//
			var firstPage = songInfo.tracks.items;
			firstPage.forEach(function(track) {
				console.log(" ");
			 	console.log("Song Title: " + track.name);
			 	console.log("Artist: " + track.artists[0].name);
			 	console.log("Preview Link: " + track.preview_url);
			 	console.log("Album Name: " + track.album.name);
				console.log("------------------------------");

				// log //
				log("\n--------------------------------------------------\n" +
					"\nSong Title: " + track.name +
					"\nArtist: " + track.artists[0].name +
			 		"\nPreview Link: " + track.preview_url +
			 		"\nAlbum Name: " + track.album.name +
					"\n\n--------------------------------------------------\n");
			});
		}
	});
}

//====================Movie Information====================//

if(nodeArgs === "movie-this") {

	//-----user's movie-----//
	var movieName = process.argv.slice(3).join("+");

	//-----no user input, then default-----//
	if (movieName === ""){
		movieName = "Mr. Nobody";
		console.log("Since you did not type a movie, I recommend watching " + movieName +".");
		console.log(" ");
	}
	movieThis(movieName);
}

function movieThis(movieName) {

	// log //
	log("\n==================================================" +
		"\nSearching For: " + movieName);

	//-----request to the OMDB API-----//
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
	console.log(queryUrl);

	// log //
	log("\nUrl: " + queryUrl +
		"\n==================================================\n");

	//-----Searching for movie name-----//
	console.log("=====MY MOVIE SEARCH=====");
	console.log("Searching for: " + movieName);
	console.log(" ");

	//-----create a request to the queryUrl-----//
	request(queryUrl, function(error, response, movieInfo) {

		//-----Successful-----//
		if (!error && response.statusCode === 200) {
		  	
		  	//-----gets title, date, rating, plot, etc-----//
			console.log(" ");
			console.log("Movie Title: " + JSON.parse(movieInfo).Title);
			console.log("Release Date: " + JSON.parse(movieInfo).Released);
			console.log("IMDB Rating: " + JSON.parse(movieInfo).imdbRating + " out of 10");
			
			// log //
			log("\nMovie Title: " + JSON.parse(movieInfo).Title +
				"\nRelease Date: " + JSON.parse(movieInfo).Released +
				"\nIMDB Rating: " + JSON.parse(movieInfo).imdbRating + " out of 10");

			if (JSON.parse(movieInfo).Ratings.length == 1) {
				console.log("There are no Rotten Tomatoes rating available. ");
				log("\nThere are no Rotten Tomatoes rating available.\n");
			}
			else {
				console.log("Rotten Tomatoes Rating: " + JSON.parse(movieInfo).Ratings[1].Value);
				log("\nRotten Tomatoes Rating: " + JSON.parse(movieInfo).Ratings[1].Value + "\n");
			}

			console.log("Counties produced in: " + JSON.parse(movieInfo).Country);
			console.log("Languages: " + JSON.parse(movieInfo).Language);
			console.log("Plot: " + JSON.parse(movieInfo).Plot);
			console.log("Actors/ Actresses: " + JSON.parse(movieInfo).Actors);

			// log //
			log("\nCounties produced in: " + JSON.parse(movieInfo).Country +
				"\nLanguages: " + JSON.parse(movieInfo).Language +
				"\nPlot: " + JSON.parse(movieInfo).Plot +
				"\nActors/ Actresses: " + JSON.parse(movieInfo).Actors);

		}

		//-----error-----//
		else {
	    	console.log('Error occurred: ' + error);
		}
	});
}

//====================Do What it Says====================//

if (nodeArgs === "do-what-it-says") {
    
	//-----reads file-----//
    fs.readFile('random.txt', "utf8", function(error, data){

    	//-----splits data and store into results array-----//
		results = data.split(",");
		
		//-----if looking for a song, run spotify-----//
		if (results[0] === "spotify-this-song") {
			spotifyThisSong(results[1]);
		}

		//-----if looking for a movie, run movie-----//
		else if (results[0] === "movie-this") {
			movieThis(results[1]);
		}

		//-----error-----//
		else {
			console.log("Error");
		}
    });
}   



//====================Log====================//

function log(results) {
	fs.appendFile("log.txt", results, function(error) {
    	if(error) {
    		console.log("Error");
    	}
	});
}