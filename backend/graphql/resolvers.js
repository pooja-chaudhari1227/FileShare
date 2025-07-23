const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/auth');
const User = require('../models/User');
const File = require('../models/File');
const path = require('path');
const fs = require('fs');
const { GraphQLUpload } = require('graphql-upload');

module.exports = {
  Upload: GraphQLUpload,

  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return await User.findByPk(user.userId);
    },

    myFiles: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return await File.findAll({
        where: { UserId: user.userId },
        include: { model: User, as: 'uploadedBy' },
      });
    },

    allFiles: async () => {
      return await File.findAll({
        order: [['createdAt', 'DESC']],
        include: { model: User, as: 'uploadedBy' },
      });
    },
  },

  Mutation: {
    register: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashedPassword });
      const token = generateToken(user);
      return { token, user };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error('Invalid credentials');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid credentials');

      const token = generateToken(user);
      return { token, user };
    },

    uploadFile: async (_, { file }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      const { createReadStream, filename, mimetype } = await file;
      const uploadPath = path.join(__dirname, '..', 'uploads', filename);
      const stream = createReadStream();

      await new Promise((resolve, reject) =>
        stream
          .pipe(fs.createWriteStream(uploadPath))
          .on('finish', resolve)
          .on('error', reject)
      );

      const savedFile = await File.create({
        filename,
        originalName: filename,
        mimetype,
        path: `/uploads/${filename}`,
        UserId: user.userId,
      });

      return await File.findByPk(savedFile.id, {
        include: { model: User, as: 'uploadedBy' },
      });
    },
  },
};
