const awssdk = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new awssdk.S3();

const uploadPlace = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'ourplace-bucket',
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, 'place/' + Date.now() + '.' + file.originalname.split('.').pop());
        }

    })
}, 'NONE');

module.exports = { uploadPlace };