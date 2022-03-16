import {v2 as cloudinary} from "cloudinary"

cloudinary.config({ 
    cloud_name: 'dazsbswu1', 
    api_key: process.env.API_KEY_CLOUDINARY, 
    api_secret: process.env.API_SECRET_CLOUDINARY 
  });

  export {cloudinary}