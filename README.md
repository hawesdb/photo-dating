# photo-dating

When downloading photos from an IPhone, the order doesn't seem to track with the naming convention of the photos, and they can get out of order.

## How this works

**CAUTION: In it's current state it will overwrite all files (not subfolders) in a folder**

Run:

```
date-photos <folder1> <folder2> ...
```

This will grab the creation date from the metadata of the image, and change the name of the file to be: `<DATE>_IMG_<INDEX>.<EXT>`

A handy progress bar has been added in to provide visual feedback of how many images are left

## Improvments down the road

- Add logging options
- allow recursive folder renaming
- strictly check whether the file has been renamed already to prevent overwriting names completely (have to see about viability)
- strictly check file extension to prevent other files from being changed
