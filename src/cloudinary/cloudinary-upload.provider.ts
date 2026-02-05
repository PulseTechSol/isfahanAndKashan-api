import * as fs from 'fs';
import { ActionContext, UploadedFile } from 'adminjs';
import { v2 as cloudinary } from 'cloudinary';
import { BaseProvider } from '@adminjs/upload';

/**
 * Custom AdminJS upload provider for Cloudinary.
 * Stores files in Cloudinary and uses public_id as key for path resolution.
 */
export class CloudinaryUploadProvider extends BaseProvider {
  private cloudName: string;

  constructor(cloudName: string, bucket: string) {
    super(bucket);
    this.name = 'BaseProvider'; // Required for getProvider to recognize custom provider
    this.cloudName = cloudName;
  }

  async upload(
    file: UploadedFile,
    key: string,
    _context: ActionContext,
  ): Promise<void> {
    // Support both path (formidable v1) and filepath (formidable v2+)
    const filePath =
      (file as { path?: string; filepath?: string }).path ||
      (file as { path?: string; filepath?: string }).filepath;

    if (!filePath || !fs.existsSync(filePath)) {
      throw new Error(
        `Invalid file: no path (path=${!!(file as any).path}, filepath=${!!(file as any).filepath})`,
      );
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: this.bucket,
          public_id: key.replace(/\.[^/.]+$/, ''), // Cloudinary public_id without extension
          overwrite: true,
        },
        (error) => {
          if (error) return reject(error);
          resolve();
        },
      );
      const readStream = fs.createReadStream(filePath);
      readStream.on('error', reject);
      readStream.pipe(uploadStream);
    });
  }

  async delete(
    key: string,
    bucket: string,
    _context: ActionContext,
  ): Promise<void> {
    const publicId = key.replace(/\.[^/.]+$/, '');
    const fullPath = bucket ? `${bucket}/${publicId}` : publicId;
    await cloudinary.uploader.destroy(fullPath);
  }

  path(key: string, bucket: string, _context: ActionContext): string {
    const publicId = key.replace(/\.[^/.]+$/, '');
    const fullPath = bucket ? `${bucket}/${publicId}` : publicId;
    return `https://res.cloudinary.com/${this.cloudName}/image/upload/${fullPath}`;
  }
}
