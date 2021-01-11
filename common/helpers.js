module.exports = {
  eq: (v1, v2) => v1 === v2,
  ne: (v1) => !v1,
  lt: (v1, v2) => v1 < v2,
  gt: (v1, v2) => v1 > v2,
  lte: (v1, v2) => v1 <= v2,
  gte: (v1, v2) => v1 >= v2,
  and () {
    return Array.prototype.every.call(arguments, Boolean)
  },
  or () {
    return Array.prototype.slice.call(arguments, 0, -1).some(Boolean)
  },
  dateFormat: (val) => {
    return new Date(val).toDateString()
  },
  inputDate: (val) => {
    const date = new Date(val)
    return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
  }
}
