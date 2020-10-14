module.exports = {
  /** Site MetaData (Required all)*/
  title: `Happy Hwan`,                           // (* Required)
  description: `Hwan Log`,          // (* Required)
  author: `Hwan Choi`,                         // (* Required)
  siteUrl: 'https://choihwan2.github.io',                      // (* Required)
    // ex.'https://junhobaik.github.io'
    // ex.'https://junhobaik.github.io/' << X, Do not enter "/" at the end.

  /** Header */
  profileImageFileName: 'profile.jpeg', // include filename extension ex.'profile.jpg'
    // The Profile image file is located at path "./images/"
    // If the file does not exist, it is replaced by a random image.

  /** Home > Bio information*/
  comment: 'Studying / Java, Backend...',
  name: 'Hwan Choi',
  company: 'Seoul',
  location: 'Korea',
  email: 'choihwan2@naver.com',
  website: 'https://choihwan2.github.io',           // ex.'https://junhobaik.github.io'
  linkedin: '',                                                          // ex.'https://www.linkedin.com/in/junho-baik-16073a19ab'
  facebook: '',                                                          // ex.'https://www.facebook.com/zuck' or 'https://www.facebook.com/profile.php?id=000000000000000'
  instagram: 'https://www.instagram.com/pavlov_hwan/',                                                         // ex.'https://www.instagram.com/junhobaik'
  github: 'https://github.com/choihwan2',                                                            // ex.'https://github.com/junhobaik'

  /** Post */
  enablePostOfContents: true,     // TableOfContents activation (Type of Value: Boolean. Not String)
  disqusShortname: 'choihwan2',            // comments (Disqus sort-name)
  enableSocialShare: true,        // Social share icon activation (Type of Value: Boolean. Not String)

  /** Optional */
  googleAnalytics: '',     // Google Analytics TrackingID. ex.'UA-123456789-0'
  googleSearchConsole: '1ePjBmUVXB5R-1xjGLNnAx9YlIC6gUqfe-Cm2dEdRXc', // content value in HTML tag of google search console ownership verification. ex.'w-K42k14_I4ApiQKuVPbCRVV-GxlrqWxYoqO94KMbKo'
  googleAdsenseSlot: '',   // Google Adsense Slot. ex.'5214956675'
  googleAdsenseClient: '', // Google Adsense Client. ex.'ca-pub-5001380215831339'
    // Please correct the adsense client number(ex.5001380215831339) in the './static/ads.txt' file.
};
