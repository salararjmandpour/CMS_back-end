enum FileType {
  IMAGE = 'image',
  AUDIO = 'audio',
  VIDEO = 'video',
}

// allowed extensions files in gallery
export const fileExtensions = {
  '.jpg': FileType.IMAGE,
  '.jpeg': FileType.IMAGE,
  '.png': FileType.IMAGE,
  '.gif': FileType.IMAGE,
  '.mp3': FileType.AUDIO,
  '.mp4': FileType.VIDEO,
  '.mkv': FileType.VIDEO,
};
