const { GraphQLUpload } = require('graphql-upload');
const { User, File } = require('../models');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/auth');
const path = require('path');
const fs = require('fs');

module.exports = {
  Upload: GraphQLUpload,

  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return await User.findByPk(user.userId);
    },

    myFiles: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return await File.findAll({ where: { UserId: user.userId } });
    },

    allFiles: async () => {
      return await File.findAll({
        include: [
          {
            model: User,
            as: 'uploadedBy',
            attributes: ['email'],
          },
        ],
        order: [['createdAt', 'DESC']],
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

      return await File.create({
        filename,
        originalName: filename,
        mimetype,
        path: `/uploads/${filename}`,
        UserId: user.userId,
      });
    },

    deleteFile: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      const file = await File.findByPk(id);
      if (!file) throw new Error('File not found');
      if (file.UserId !== user.userId) throw new Error('Not authorized');

      const filePath = path.join(__dirname, '..', file.path);

      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (err) {
        console.error('File deletion failed:', err.message);
      }

      await file.destroy();
      return true;
    },

    editFile: async (_, { id, filename }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      const file = await File.findByPk(id);
      if (!file) throw new Error('File not found');
      if (file.UserId !== user.userId) throw new Error('Not authorized');

      const oldPath = path.join(__dirname, '..', file.path);
      const newPath = path.join(__dirname, '..', 'uploads', filename);

      try {
        fs.renameSync(oldPath, newPath);
      } catch (err) {
        throw new Error('Failed to rename file on disk: ' + err.message);
      }

      file.filename = filename;
      file.originalName = filename;
      file.path = `/uploads/${filename}`;
      await file.save();

      return file;
    },
  },
};
