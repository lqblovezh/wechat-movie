let app = getApp()

export function convertToStarsArray(stars) {
  let num = stars.toString().substring(0, 1)
  let array = []
  for (let i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1)
    } else {
      array.push(0)
    }
  }
  return array
}

export function http(url, callBack) {
  wx.request({
    url: app.globalData.g_doubanBase + url,
    data: {},
    header: { 'Content-type': 'json' },
    method: 'GET',
    success: res => {
      callBack(res.data)
    },
    fail: () => {},
  })
}

export function convertToCastString(casts) {
  let castsjoin = ''
  for (let key in casts) {
    castsjoin += casts[key].name + ' / '
  }
  return castsjoin.substring(0, castsjoin.length - 2)
}

export function convertToCastInfos(casts) {
  let castsArray = []
  castsArray.push(
    casts.map(item => {
      return {
        img: item.avatars ? item.avatars.large : '',
        name: item.name,
      }
    })
  )
  return castsArray[0]
}
