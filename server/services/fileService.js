const s3 = require('../config/aws');
const File = require('../models/File');

const uploadFile = async ({ file, userId }) => {
  const s3Response = await s3.upload({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype
  }).promise();

  return File.create({
    originalName: file.originalname,
    s3Key: s3Response.Key,
    mimeType: file.mimetype,
    size: file.size,
    user: userId
  });
};

const listFiles = async () => {
  return File.find().sort({ uploadDate: -1 });
};

const listFilesByUser = async (userId) => {
  return File.find({ user: userId }).sort({ uploadDate: -1 });
};

const getFileById = async (id) => {
  return File.findById(id);
};

module.exports = {
  uploadFile,
  listFiles,
  listFilesByUser,
  getFileById,
}; 