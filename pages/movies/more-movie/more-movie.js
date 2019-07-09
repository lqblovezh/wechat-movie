let app = getApp()
import { convertToStarsArray, http } from '../../../utils/util'

Page({
  data: {
    navigateTitle: '',
    movies: {},
    requestUrl: '',
    totalCount: 0,
    isEmpty: true,
  },
  onLoad: function(options) {
    let category = options.category
    this.data.navigateTitle = category
    wx.setNavigationBarTitle({
      title: category,
    })
    let dataUrl = ''
    switch (category) {
      case '正在热映':
        dataUrl = '/v2/movie/in_theaters'
        break
      case '即将上映':
        dataUrl = '/v2/movie/coming_soon'
        break
      case '经典电影':
        dataUrl = '/v2/movie/top250'
        break
    }
    this.data.requestUrl = dataUrl
    wx.showNavigationBarLoading()
    http(dataUrl, this.processData)
  },
  processData: function(data) {
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
    this.data.totalCount += 20
    let totalMovies = {}
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies)
    } else {
      totalMovies = movies
      this.data.isEmpty = false
    }
    this.setData({ movies: totalMovies })
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },
  onScrollLower: function(event) {
    let nextUrl =
      this.data.requestUrl + '?start=' + this.data.totalCount + '&count=20'
    wx.showNavigationBarLoading()
    http(nextUrl, this.processData)
  },
  onPullDownRefresh: function() {
    let refreshUrl = this.data.requestUrl + '?start=0&count=20'
    this.data.movies = {}
    this.data.isEmpty = true
    this.data.totalCount = 0
    wx.showNavigationBarLoading()
    http(refreshUrl, this.processData)
  },
  onMovieTap(event) {
    let movieId = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId,
    })
  },
})
