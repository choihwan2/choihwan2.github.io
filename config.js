let config = {
  title: 'TITLE',
  author: 'Author',
  description: 'Site description',
  siteUrl: 'https://',

  // # Header config
  titleLogo: () => {
    // need a square image
    
    // return require('./src/images/profile.png'); // file
    return 'https://source.unsplash.com/random/100x100' // url
  },
  titleLogoShow: true,
  bio: "edit your 'config.js' file",
  bioShow: true,

  // # Addtional
  googleAnalyticsTrackingId: '',
  disqusShortname: '',

  // ## google AdSense
  // In addition, client-id in '/static/ads.txt' file needs to be modified
  googleAdsense: true,
  adsenseClient: 'ca-pub-5001380215831339',
  adsenseSlot: '5214956675',
};

/********************************************** */

if (process.env.NODE_ENV === 'development') {
  config.googleAnalyticsTrackingId = '';
  config.disqusShortname = '';
  config.googleAdsense = false;
}

module.exports = config;
