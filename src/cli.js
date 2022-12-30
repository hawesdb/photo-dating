import { order } from './order'

export const cli = (args) => {
  try {
    if (args.length < 3) {
      throw Error('Please add a file location')
    } else {
      const locations = args.slice(2)
      order(locations)
    }
  } catch (e) {
    throw Error(`Unable to order files: ${e.message}`)
  }
}
