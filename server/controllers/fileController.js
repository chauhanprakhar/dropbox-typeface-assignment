const fileService = require('../services/fileService');
const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/apiResponse');

exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) return errorResponse(res, "No file uploaded");
    const username = req.headers['x-username'] || req.body.username;
    const password = req.headers['x-password'] || req.body.password;
    if (!username || !password) return errorResponse(res, "Username and password required", 400);
    const user = await User.findOne({ username, password });
    if (!user) return errorResponse(res, "Invalid username or password", 401);
    const file = await fileService.uploadFile({ file: req.file, userId: user._id });
    successResponse(res, file, "File uploaded successfully");
  } catch (error) {
    next(error);
  }
};

exports.listFiles = async (req, res, next) => {
  try {
    const files = await fileService.listFiles();
    successResponse(res, files);
  } catch (error) {
    next(error);
  }
};

exports.downloadFile = async (req, res, next) => {
  try {
    const file = await fileService.getFileById(req.params.id);
    if (!file) return errorResponse(res, "File not found", 404);
    const s3 = require('../config/aws');
    const s3Stream = s3.getObject({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: file.s3Key
    }).createReadStream();
    res.setHeader('Content-Disposition', `attachment; filename=${file.originalName}`);
    res.setHeader('Content-Type', file.mimeType);
    s3Stream.pipe(res);
  } catch (error) {
    next(error);
  }
};
