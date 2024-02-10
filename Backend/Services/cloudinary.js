const cloudinary = require('cloudinary').v2
const cloudinaryConfig = require('../Config/cloudinary.Config')
cloudinary.config({cloudinaryConfig})

uploadToCloudinary = (path, folder) => {
    return cloudinary.uploader.upload(path, {
        folder
    }).then((data) => {
        return { url: data.url, public_id: data.public_id };
    }).catch((error) => {
        console.log(error)
    })
}
removeFromCloudinary = async (public_id) => {
    await cloudinary.uploader.destroy(public_id, function (error, result) {
        console.log(result, error)
    })
}
module.exports = { uploadToCloudinary, removeFromCloudinary }