import {
  http,
  convertToStarsArray,
  convertToCastString,
  convertToCastInfos,
} from '../../../../utils/util'
export default class Movie {
  constructor(url) {
    this.url = url
  }
  getMovieDetail(cb) {
    this.cb = cb
    http(this.url, this.processData.bind(this))
  }
  processData(data) {
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
    this.cb(movie)
  }
}
