let config = {
  title: `SITE TITLE`,
  author: 'author',
  description: "",
  siteUrl: '',

  // header config
  titleLogo: () => {
    return require('./src/images/profile.png');
  },
  titleLogoShow: true,
  bio: './conifg.js 에서 설정을 수정해주세요',
  bioShow: true,

  // addtional
  googleAnalyticsTrackingId: '',
  disqusShortname: '',
};

/********************************************** */

if (process.env.NODE_ENV === 'development') {
  config.googleAnalyticsTrackingId = '';
  config.disqusShortname = '';
}

module.exports = config;
