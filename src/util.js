export const mergeSort = (array) => {
  if (array.length < 2) return array

  const middle = parseInt(array.length / 2)
  const left = array.slice(0, middle)
  const right = array.slice(middle, array.length)

  return merge(mergeSort(left), mergeSort(right))
}

const merge = (left, right) => {
  const result = []

  while (left.length && right.length) {
    if (left[0].date <= right[0].date) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  while (left.length) {
    result.push(left.shift())
  }

  while (right.length) {
    result.push(right.shift())
  }

  return result
}

export const replaceAt = (str, indices, replacement) => {
  let finalString = str

  indices.sort().forEach((index) => {
    finalString =
      finalString.substring(0, index) +
      replacement +
      finalString.substring(index + replacement.length)
  })

  return finalString
}
