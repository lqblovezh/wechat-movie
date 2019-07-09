//app.js
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  onLaunch: function(options) {
    wx.showShareMenu({
      withShareTicket: false,
    })
  },
  onShow: function(options) {
    // console.log('onShow')
  },
  onHide: function() {
    // console.log('onHide')
  },
  onError: function(msg) {},
  //options(path,query,isEntryPage)
  onPageNotFound: function(options) {},
  globalData: {
    g_isMusicPaly: false,
    g_currentMusicPostId: null,
    g_doubanBase: 'https://douban.uieee.com',
  },
})
