'use strict';

const logger = require('../utils/logger');
const spotify = require('../models/spotify');
const playlistStore = require('../models/songs-store');

const about = {
  
  index(request, response) {
    
    const songId = request.params.id;
    const song = playlistStore.getPlaylist(songId);
    const info = spotify.getArtist(song.artist);
    
    logger.info('about rendering');  
  
    info.then(
    function(data) {
       console.log(data.body.artists.items[0]);
      const viewData = {
        title : data.body.artists.items[0].name,
        genres: data.body.artists.items[0].genres,
        followers : data.body.artists.items[0].followers.total,
        artistimage : data.body.artists.items[0].images[1].url,
    };
      response.render('artistabout', viewData);
    });
  },
  
  
};

module.exports = about;
