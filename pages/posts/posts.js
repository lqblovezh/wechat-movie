import { postList } from '../../data/post-data'

Page({
  data: {
    list: [],
  },
  onLoad: function(options) {
    wx.showShareMenu({
      withShareTicket: false,
    })
    this.setData({
      list: postList,
      banner: [
        {
          image:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548743877533&di=6c1ed53df57030feb1b586ff6962c30c&imgtype=0&src=http%3A%2F%2Fimg.qqtz.com%2F2011%2F0906%2F1315268719703638.jpg',
          url: 'www.baidu.com',
          id: '1',
        },
        {
          image:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549338905&di=1e5fd17a1c3a879f8885168a57de6f13&imgtype=jpg&er=1&src=http%3A%2F%2Fpic111.huitu.com%2Fres%2F20181027%2F302959_20181027170755727070_1.jpg',
          url: 'www.baidu.com',
          id: '2',
        },
        {
          image:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548743710922&di=658f90d54df7727b48087bb859d799df&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1209%2F25%2Fc4%2F14123077_14123077_1348552474031_mthumb.jpg',
          url: 'www.baidu.com',
          id: '0',
        },
      ],
    })
  },
  imageLoad: function(e) {
    var $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height //图片的真实宽高比例
    var viewWidth = 718, //设置图片显示宽度，左右留有16rpx边距
      viewHeight = 718 / ratio //计算的高度值
    var image = this.data.images
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight,
    }
    this.setData({
      images: image,
    })
  },
  onCatchtap: function(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + id,
      success: result => {
        // console.log(result,1111,data)
      },
      fail: () => {},
      complete: () => {},
    })
  },
})
