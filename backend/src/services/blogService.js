const { BlogPost, User } = require('../models');

const AUTHOR_ATTRS = ['id', 'first_name', 'last_name'];

const authorInclude = {
  model: User,
  as: 'author',
  attributes: AUTHOR_ATTRS,
};

/**
 * Генерация slug из заголовка (транслитерация + нормализация)
 */
const generateSlug = (title) => {
  const map = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh',
    з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
    п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts',
    ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu',
    я: 'ya',
  };
  return title
    .toLowerCase()
    .split('')
    .map((c) => map[c] ?? c)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 280);
};

const getAll = async () => {
  return BlogPost.findAll({
    include: [authorInclude],
    order: [['created_at', 'DESC']],
  });
};

const getById = async (id) => {
  return BlogPost.findByPk(id, {
    include: [authorInclude],
  });
};

const getBySlug = async (slug) => {
  return BlogPost.findOne({
    where: { slug },
    include: [authorInclude],
  });
};

const create = async ({ title, preview_text, content, image_url, author_id }) => {
  const slug = generateSlug(title);

  // Проверяем уникальность slug
  const existing = await BlogPost.findOne({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  return BlogPost.create({
    title,
    slug: finalSlug,
    preview_text: preview_text || null,
    content: content || null,
    image_url: image_url || null,
    author_id: author_id || null,
  });
};

const update = async (id, { title, preview_text, content, image_url }) => {
  const post = await BlogPost.findByPk(id);
  if (!post) {
    const err = new Error('Статья не найдена');
    err.status = 404;
    throw err;
  }

  const updateFields = {};
  if (title !== undefined) {
    updateFields.title = title;
    // Обновляем slug при смене заголовка
    const newSlug = generateSlug(title);
    const existing = await BlogPost.findOne({
      where: { slug: newSlug },
    });
    updateFields.slug = existing && existing.id !== id ? `${newSlug}-${Date.now()}` : newSlug;
  }
  if (preview_text !== undefined) updateFields.preview_text = preview_text;
  if (content !== undefined) updateFields.content = content;
  if (image_url !== undefined) updateFields.image_url = image_url;

  await post.update(updateFields);
  return post.reload({ include: [authorInclude] });
};

const remove = async (id) => {
  const post = await BlogPost.findByPk(id);
  if (!post) {
    const err = new Error('Статья не найдена');
    err.status = 404;
    throw err;
  }
  await post.destroy();
  return { message: 'Статья удалена' };
};

module.exports = { getAll, getById, getBySlug, create, update, remove };
