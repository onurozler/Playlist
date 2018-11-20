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
  
  getArtist(artist)
  {  
    return spotifyApi.getArtist(artist);
  },
  
  getSong(songName)
  {
    return spotifyApi.searchTracks('track:'+songName, {limit: 1});
  },
  
  getAudioFeatures(songName)
  {
    return spotifyApi.searchTracks(songName);
  },
};

module.exports = spotify;
  