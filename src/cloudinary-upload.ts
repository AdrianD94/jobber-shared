import cloudinary, {UploadApiErrorResponse, UploadApiResponse} from 'cloudinary';

export async function uploads(file:string, public_id?:string, overwrite?:boolean, invalidate?:boolean):Promise<UploadApiResponse | UploadApiErrorResponse | undefined>{
    try {
       return await cloudinary.v2.uploader.upload(file, {
        public_id,
        overwrite,
        invalidate,
        resource_type: 'auto'
    });
    } catch (error) {
        console.log(error);
        throw error;
    }
}