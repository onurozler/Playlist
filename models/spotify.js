'use strict';

const SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET
});

// Using the Client Credentials auth flow, authenticate our app
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
  
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  });

const spotify = {


  getArtist()
  {  

    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
  function(data) {
    return data.body.toString();
  },
  function(err) {
    console.error(err);
    }
    );
  },
  
  getSong()
  {
    return spotifyApi.searchTracks('track:Dancing Queen', {limit: 1}).then(function(data) 
    {
    
      // Send the first (only) track obje
     Promise.resolve(data.body.tracks.items[0].name);
    
    }, function(err) {
      console.error(err);
    });
    
  },
  
};

module.exports = spotify;
  