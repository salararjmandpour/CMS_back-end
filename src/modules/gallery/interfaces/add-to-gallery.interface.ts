export interface AddToGalleryInput {
  path: string;
  type: 'image' | 'video' | 'audio' | 'file';
  filename: string;
  mimetype: string;
  size: number;
  dimensions: {
    width: number;
    height: number;
  };
  uploadedBy: string;
  uploadedIn: string;
}
