// nest imports
import { BadRequestException, Injectable } from '@nestjs/common';

// third-party imports
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiErrorResponse | UploadApiResponse> {
    try {
      if (!file) throw new BadRequestException('Invalide File');
      const allowedExtensions = [
        '.webp',
        '.png',
        '.jpg',
        '.gif',
        '.jpeg',
        '.pdf',
        '.xls',
        '.xlsx',
        '.svg',
      ];
      const fileExtensionParts = file.originalname.split('.');
      const extension = fileExtensionParts.pop();
      if (!extension) {
        throw new BadRequestException('File must have an extension');
      }
      const fileExtension = '.' + extension.toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        throw new BadRequestException('Only images are allowed');
      }
      return new Promise<UploadApiErrorResponse | UploadApiResponse>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'isfahan-kashan-admin' },
            (error, result) => {
              if (error) return reject(error);
              if (!result) {
                return reject(new Error('Upload failed: No result returned'));
              }
              resolve(result);
            },
          );
          streamifier.createReadStream(file.buffer).pipe(uploadStream);
        },
      );
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Upload failed',
      );
    }
  }

  /** Returns only the secure_url for use in product payload */
  async uploadImageAndGetUrl(
    file: Express.Multer.File,
  ): Promise<{ url: string }> {
    const result = await this.uploadImage(file);
    return { url: (result as UploadApiResponse).secure_url };
  }

  /** Extract public_id from Cloudinary URL for delete */
  private getPublicIdFromUrl(url: string): string | null {
    const match = url.match(/\/upload\/v\d+\/(.+)\.\w+$/);
    return match ? match[1] : null;
  }

  /** Delete image from Cloudinary by URL */
  async deleteImageByUrl(url: string): Promise<{ deleted: boolean }> {
    const publicId = this.getPublicIdFromUrl(url);
    if (!publicId) {
      throw new BadRequestException('Invalid Cloudinary URL');
    }
    const result = await cloudinary.uploader.destroy(publicId);
    return { deleted: result.result === 'ok' };
  }
}
