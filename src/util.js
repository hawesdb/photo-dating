import fs from 'fs'
import cliProgress from 'cli-progress'
import { grabMetadata, exiftool } from './metadata'

export const datePhotos = async (locations) => {
  await Promise.all(
    locations.map(async (location) => {
      if (!['.', '/', '~'].includes(Array.from(location)[0])) {
        location = './' + location
      }
      const bar = new cliProgress.SingleBar(
        {},
        cliProgress.Presets.shades_classic
      )
      const filesDir = fs.readdirSync(location)
      console.info(`\nRenaming files in '${location}'\n`)
      bar.start(filesDir.length, 0)
      try {
        const files = await dateFolder(location, bar)
      } catch (e) {
        console.error(`Unable to date folder '${location}'`)
      }
      bar.stop()
    })
  )

  exiftool.end()
  console.info('\nFinished renaming files\n')
}

export const dateFolder = async (location, bar, path = '', allFiles = []) => {
  path = path !== '' ? path + '/' : ''
  location = path + location
  const files = fs.readdirSync(location)

  await Promise.all(
    files.map(async (file, index) => {
      const stats = fs.lstatSync(location + '/' + file)

      if (stats.isFile()) {
        try {
          const date = await grabMetadata(location + '/' + file)
          const ext = file.split('.')[file.split('.').length - 1]
          fs.renameSync(
            location + '/' + file,
            location + '/' + date + '_IMG_' + index + '.' + ext
          )
          bar.increment()
        } catch (e) {
          console.error(e)
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
