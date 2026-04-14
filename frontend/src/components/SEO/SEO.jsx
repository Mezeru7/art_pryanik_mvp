import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Арт-Пряник';
const SITE_URL = 'https://art-pryanik.ru';
const DEFAULT_IMAGE = '/assets/images/og-image.png';
const DEFAULT_LOCALE = 'ru_RU';

/**
 * SEO-компонент с поддержкой OpenGraph
 *
 * @param {string}  title        — заголовок страницы (без суффикса сайта)
 * @param {string}  description  — мета-описание
 * @param {string}  [image]      — URL OG-изображения
 * @param {string}  [path]       — путь страницы (например "/catalog")
 * @param {'website'|'article'} [type] — тип OG-объекта
 * @param {string}  [publishedAt] — дата публикации (для статей блога, ISO 8601)
 * @param {string}  [author]     — автор (для статей блога)
 */
function SEO({
  title,
  description,
  image,
  path = '',
  type = 'website',
  publishedAt,
  author,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const url = `${SITE_URL}${path}`;
  const ogImage = image
    ? image.startsWith('http') ? image : `${SITE_URL}${image}`
    : `${SITE_URL}${DEFAULT_IMAGE}`;

  return (
    <Helmet>
      {/*Основные мета-теги*/}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/*OpenGraph*/}
      <meta property="og:type"        content={type} />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:locale"      content={DEFAULT_LOCALE} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={url} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt"    content={title || SITE_NAME} />

      {/* Дополнительные теги для статей */}
      {type === 'article' && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/*Canonical*/}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}

export default SEO;
