const createBlogPost = {
  title: { required: true, type: 'string', maxLength: 255 },
  preview_text: { required: false, type: 'string', maxLength: 1000 },
  content: { required: false, type: 'string' },
  image_url: { required: false, type: 'string', maxLength: 500 },
};

const updateBlogPost = {
  title: { required: false, type: 'string', maxLength: 255 },
  preview_text: { required: false, type: 'string', maxLength: 1000 },
  content: { required: false, type: 'string' },
  image_url: { required: false, type: 'string', maxLength: 500 },
};

module.exports = { createBlogPost, updateBlogPost };
