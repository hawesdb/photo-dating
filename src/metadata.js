import { default as metadata } from 'im-metadata'
import { extname } from 'path'

const ALLOWED_FORMATS = ['.HEIC']

export const grabMetadata = (file) => {
  const metadataPromise = new Promise((resolve, reject) => {
    try {
      if (ALLOWED_FORMATS.includes(extname(file))) {
        file = file.replace(/(\s|\(|\)+)/g, '\\$1')
        metadata(file, { exif: true }, function (error, metadata) {
          if (error) {
            throw Error(`Unable to get metadata of file: ${file}`)
          }

          if (metadata) {
            resolve(metadata.exif.DateTime)
          }
        })
      } else {
        reject(`Invalid format: ${extname(file)}`)
      }
    } catch (e) {
      console.log(e)
    }
  })
  return metadataPromise
}
