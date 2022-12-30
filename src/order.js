import fs from 'fs'
import { grabMetadata } from './metadata'
import { mergeSort, replaceAt } from './util'

export const order = (locations) => {
  console.log(locations)
  locations.forEach(async (location) => {
    const files = mergeSort(await grabFiles(location))

    const digits = files.length.toString().length
    files.forEach((file, index) => {
      const filePaths = file.file.split('/')
      const filename = file.file.split('/')[file.file.split('/').length - 1]
      const filenameExt = filename.split('.')[filename.split('.').length - 1]
      const newFile = [
        ...filePaths.slice(0, filePaths.length - 1),
        `IMG_ORD_${index.toString().padStart(digits, '0')}.${filenameExt}`,
      ].join('/')
      fs.renameSync(file.file, newFile)

      console.log(`Renamed: '${file.file}' to '${newFile}`)
    })
  })
}

export const grabFiles = async (location, path = '', allFiles = []) => {
  if (!['.', '/'].includes(Array.from(location)[0]) && path === '') {
    location = './' + location
  }

  path = path !== '' ? path + '/' : ''
  location = path + location
  const files = fs.readdirSync(location)

  await Promise.all(
    files.map(async (file) => {
      const stats = fs.lstatSync(location + '/' + file)

      if (stats.isFile()) {
        try {
          const date = await grabMetadata(location + '/' + file)
          const formattedDate = Date.parse(replaceAt(date, [4, 7], '/'))
          allFiles.push({
            file: location + '/' + file,
            date: formattedDate,
          })
        } catch (e) {
          console.log(e)
        }
      } else if (stats.isDirectory()) {
        // Uncomment to enable recursive
        // grabFiles(file, location, allFiles)
      } else {
        throw Error(
          `Unable to determine format of file '${location + '/' + file}'`
        )
      }
    })
  )

  return allFiles
}
