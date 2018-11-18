'use strict';

const logger = require('../utils/logger');
const spotify = require('../models/spotify');

const about = {
  
  index(request, response) {
    logger.info('about rendering');
    const viewData = {
      title: 'spotifyview',
      content: spotify.getSong()
    };
   
    response.render('about', viewData);
  },
  
};

module.exports = about;
