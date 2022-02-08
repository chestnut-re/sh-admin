/*
 * @Description:
 * @LastEditTime: 2022-02-08 10:28:44
 */

export const unique = (date) => {
  const idObj = {}
  return date.reduce(function (item, next) {
    idObj[next.goodsId] ? '' : (idObj[next.goodsId] = true && item.push(next))
    console.log(idObj,'idObj')
    return item
  }, [])
}
