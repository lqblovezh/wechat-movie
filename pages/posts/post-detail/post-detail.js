import { postList } from '../../../data/post-data'
const app = getApp()

Page({
  data: {
    isMusicPaly: false,
  },
  onLoad: function(options) {
    this.data.currentId = options.id
    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var postCollected = postsCollected[options.id]
      this.setData({
        collected: postCollected,
      })
    } else {
      var postsCollected = {}
      postsCollected[options.id] = false
      wx.setStorageSync('posts_collected', postsCollected)
    }
    this.setData({
      postData: postList.find(item => item.id === options.id),
    })
    if (
      app.globalData.g_isMusicPaly &&
      app.globalData.g_currentMusicPostId == this.data.currentId
    ) {
      this.setData({
        isMusicPaly: true,
      })
    }
    this.setAudioMonitor()
  },
  setAudioMonitor: function() {
    wx.onBackgroundAudioPlay(result => {
      this.setData({
        isMusicPaly: true,
      })
      app.globalData.g_isMusicPaly = true
      app.globalData.g_currentMusicPostId = this.data.currentId
    })
    wx.onBackgroundAudioPause(result => {
      this.setData({
        isMusicPaly: false,
      })
      app.globalData.g_isMusicPaly = false
      app.globalData.g_currentMusicPostId = null
    })
    wx.onBackgroundAudioStop(result => {
      this.setData({
        isMusicPaly: false,
      })
      app.globalData.g_isMusicPaly = false
      app.globalData.g_currentMusicPostId = null
    })
  },
  onCollectionTap: function(event) {
    this.showModal()
  },
  showModal: function() {
    var postsCollected = wx.getStorageSync('posts_collected')
    var postCollected = postsCollected[this.data.currentId]
    postCollected = !postCollected
    postsCollected[this.data.currentId] = postCollected
    wx.showModal({
      title: postCollected ? '收藏' : '取消收藏',
      content: postCollected ? '是否收藏该文章?' : '是否取消收藏该文章?',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确定',
      confirmColor: '#405f0',
      success: result => {
        if (result.confirm) {
          wx.setStorageSync('posts_collected', postsCollected)
          this.setData({
            collected: postCollected,
          })
        }
      },
      fail: () => {},
      complete: () => {},
    })
  },
  onShareTap: function() {
    wx.showActionSheet({
      itemList: ['分享到微信好友', '分享到朋友圈', '分享到qq', '分享到微博'],
      itemColor: '#405f80',
      success: res => {
        console.log(res.tapIndex)
      },
      fail: () => {},
      complete: () => {},
    })
  },
  onMusicTap: function(event) {
    let currentDate = postList[this.data.currentId]
    const { url, title, img } = currentDate.music
    if (this.data.isMusicPaly) {
      wx.pauseBackgroundAudio()
      this.setData({
        isMusicPaly: false,
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: url,
        title: title,
        coverImgUrl: img,
      })
      this.setData({
        isMusicPaly: true,
      })
    }
  },
})
