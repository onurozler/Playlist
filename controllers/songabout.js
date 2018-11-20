'use strict';

const logger = require('../utils/logger');
const spotify = require('../models/spotify');
const playlistStore = require('../models/songs-store');

const about = {
  
  index(request, response) {
    
    const songId = request.params.id;
    const song = playlistStore.getPlaylist(songId);
    const info = spotify.getSong(song.songname);
    logger.info('about rendering');  
    info.then(
    function(data) {
       
      const viewData = {
      title: data.body.tracks.items[0].name,
      artist: data.body.tracks.items[0].artists[0].name,
      albumname: data.body.tracks.items[0].album.name,
      albumimage: data.body.tracks.items[0].album.images[1].url
    };
      response.render('songabout', viewData);
    });

  },
  
  
};

module.exports = about;
