const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'chocowi/chats',
        resource_type: 'auto',
        public_id: (req, file) => file.originalname
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
});

module.exports = upload;
