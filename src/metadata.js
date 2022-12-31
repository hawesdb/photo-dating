export const exiftool = require('exiftool-vendored').exiftool

export const grabMetadata = (file) => {
  const metadataPromise = new Promise((resolve, reject) => {
    try {
      exiftool
        .read(file)
        .then((tags) => {
          const date = tags.CreateDate || tags.AdjustmentTimestamp
          resolve(
            `${date.year}${date.month.toString().padStart(2, '0')}${date.day
              .toString()
              .padStart(2, '0')}`
          )
        })
        .catch((err) => {
          reject(
            `\nUnable to get the metadata of the file: ${file}, err: ${err}\n`
          )
        })
    } catch (e) {
      reject(e)
    }
  })
  return metadataPromise
}
