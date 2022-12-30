import { datePhotos } from './util'

export const cli = (args) => {
  try {
    if (args.length < 3) {
      throw Error('Please add a file location')
    } else {
      const locations = args.slice(2)
      datePhotos(locations)
    }
  } catch (e) {
    throw Error(`Unable to order files: ${e.message}`)
  }
}
