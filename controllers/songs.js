'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const playlistStore = require('../models/songs-store');
const playlistStor = require('../models/playlist-store');
const uuid = require('uuid');

const playlist = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Playlist',
      getsongs: playlistStore.getAllPlaylists(),
      playlist: playlistStor.getUserPlaylists(loggedInUser.id)
    };
    response.render('songs', viewData);
  },

  
  deleteSong(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    logger.debug(`Deleting Song ${songId} from Playlist ${playlistId}`);
    playlistStore.removeSong(playlistId, songId);
    response.redirect('/playlist/' + playlistId);
  },

  addSong(request, response) {
    const playlistId = request.params.id;
    const playlist = playlistStore.getPlaylist(playlistId);
    const newSong = {
      id: uuid(),
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration),
    };
    logger.debug('New Song = ', newSong);
    playlistStore.addSong(playlistId, newSong);
    response.redirect('/playlist/' + playlistId);
  },
  
  
};

module.exports = playlist;
