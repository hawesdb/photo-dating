export const exiftool = require("exiftool-vendored").exiftool

export const grabMetadata = (file) => {
  const metadataPromise = new Promise((resolve, reject) => {
    try {
      exiftool.read(file)
        .then((tags) => {
          const date = tags.CreateDate || tags.AdjustmentTimestamp
          resolve(`${date.year}${date.month.toString().padStart(2, '0')}${date.day.toString().padStart(2, '0')}`)
        })
        .catch((err) => {
          throw Error(`Unable to get the metadata of the file: ${file}`)
        })
    } catch (e) {
      reject(e)
    }
  })
  return metadataPromise
}
