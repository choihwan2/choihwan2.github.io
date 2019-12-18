let config = {
  title: 'Happy Hwan',
  author: 'Hwan Choi',
  description: 'Hwan Log',
  siteUrl: 'https://choihwan2.github.io/',

  // # Header config
  titleLogo: () => {
    // need a square image
    
    return require('./src/images/profile.png'); // file
    //return 'https://source.unsplash.com/random/100x100' // url
  },
  titleLogoShow: true,
  bio: "Coding...",
  bioShow: true,

  // # Addtional
  googleAnalyticsTrackingId: '',
  disqusShortname: 'choihwan2',

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
