const app = getApp()
import { convertToStarsArray, http } from '../../utils/util'

Page({
  data: {
    intheaters: {},
    comingSoon: {},
    top250: {},
    containerShow: true,
    searchPanelShow: false,
    searchResult: {},
  },
  onLoad: function(options) {
    let book1220562 = 'https://douban.uieee.com/v2/book/1220562'
    let intheatersUrl = '/v2/movie/in_theaters?start=0&count=3' //正在上映的电影-北京
    let comingSoonUrl = '/v2/movie/coming_soon?start=0&count=3' //即将上映的电影
    let top250Url = '/v2/movie/top250?start=0&count=3' //豆瓣电影Top250
    http(intheatersUrl, (res) => {
      this.processData(res,'intheaters')
    })
    http(comingSoonUrl,(res) => {
      this.processData(res,'comingSoon')
    })
    http(top250Url,(res) => {
      this.processData(res,'top250')
    })
  },
  processData: function(data, key) {
    let movies = []
    data.subjects &&
      data.subjects.forEach(element => {
        let title = element.title
        if (title.length >= 6) {
          title = title.substring(0, 6) + '...'
        }
        movies.push({
          title: title,
          stars: convertToStarsArray(element.rating.stars),
          average: element.rating.average,
          coveragerUrl: element.images.large,
          movieId: element.id,
        })
      })
    let readData = {}
    readData[key] = {
      movies: movies,
    }
    this.setData(readData)
  },
  onMoreTap: function(event) {
    let category = event.currentTarget.dataset.category
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
    })
  },
  onMovieTap(event) {
    let movieId = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId,
    })
  },
  onBindFocus: function() {
    this.setData({
      containerShow: false,
      searchPanelShow: true,
    })
  },
  onBindConfirm: function(event) {
    let text = event.detail.value
    let searchUrl = '/v2/movie/search?q=' + text
    http(searchUrl, res => {
      this.processData(res, 'searchResult')
    })
  },
  onCancelImgTap: function() {
    this.setData({
      containerShow: true,
    })
  },
})
