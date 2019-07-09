import {
  http,
  convertToStarsArray,
  convertToCastString,
  convertToCastInfos,
} from '../../../utils/util'
import Movie from './class/Movie'

Page({
  data: {
    movie: {},
  },
  onLoad: function(options) {
    let movieId = options.id
    let movieUrl = '/v2/movie/subject/' + movieId
    let movie = new Movie(movieUrl)
    movie.getMovieDetail(movie => {
      this.setData({
        movie: movie,
      })
    })
    // http(movieUrl, this.processData)
  },
  processData: function(data) {
    let director = {
      avatar: '',
      name: '',
      id: '',
    }
    if (data.directors && data.directors[0]) {
      if (data.directors[0].avatars) {
        director.avatar = data.directors[0].avatars.large
      }
      director.name = data.directors[0].name
      director.id = data.directors[0].id
    }
    let movie = {
      movieImg: data.images ? data.images.large : '',
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join('、'),
      stars: convertToStarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: convertToCastString(data.casts),
      castsInfo: convertToCastInfos(data.casts),
      summary: data.summary,
    }
    this.setData({
      movie: movie,
    })
  },
  viewMoviePostImg: function(e) {
    let src = e.currentTarget.dataset.src
    wx.previewImage({
      current: src,
      urls: [src],
    })
  },
})
