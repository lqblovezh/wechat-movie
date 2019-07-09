
Page({
  test: function(event) {
    // wx.navigateTo({
    //   url: '../posts/posts',
    // });
    // wx.redirectTo({
    //   url: '../posts/posts',
    // });
    wx.switchTab({
      url: '../posts/posts',
    });
  },
  onUnload: function() {
    // console.log('onUnload');
  },
  onHide: function() {
    // console.log('onHide');
  }
});
  