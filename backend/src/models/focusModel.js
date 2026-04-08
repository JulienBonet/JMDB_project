const db = require('../../database/client');

// -------------------------------------------------
// FOCUS
// -------------------------------------------------

const findAllFocusSortedNameAsc = () => {
  return db.query(
    `SELECT f.id, f.name, f.pitch, f.image, f.categoryId, fc.name AS categoryName
     FROM focus f
     LEFT JOIN focuscategory fc ON f.categoryId = fc.id
     ORDER BY f.name ASC;`
  );
};

const findAllFocusSortedIdDesc = () => {
  return db.query(
    `SELECT f.id, f.name, f.pitch, f.image, f.categoryId, fc.name AS categoryName
     FROM focus f
     LEFT JOIN focuscategory fc ON f.categoryId = fc.id
     ORDER BY f.id DESC;`
  );
};

const findAllFocusByCategoryIdRandom = (id) => {
  return db.query(
    `SELECT f.id, f.name, f.pitch, f.image, f.categoryId, fc.name AS categoryName
     FROM focus f
     LEFT JOIN focuscategory fc ON f.categoryId = fc.id
     JOIN movie_focus mf ON mf.focusId = f.id
     WHERE f.categoryId = ?
     GROUP BY f.id
     HAVING COUNT(mf.movieId) > 0
     ORDER BY RAND();`,
    [id]
  );
};

const findAllFocusByCategoryIdAsc = (id) => {
  return db.query(
    `SELECT f.id, f.name, f.pitch, f.image, f.categoryId, fc.name AS categoryName
     FROM focus f
     LEFT JOIN focuscategory fc ON f.categoryId = fc.id
     JOIN movie_focus mf ON mf.focusId = f.id
     WHERE f.categoryId = ?
     GROUP BY f.id
     HAVING COUNT(mf.movieId) > 0
     ORDER BY 
       CASE
         WHEN LOWER(f.name) LIKE 'le %' THEN SUBSTRING(f.name, 4)
         WHEN LOWER(f.name) LIKE 'la %' THEN SUBSTRING(f.name, 4)
         WHEN LOWER(f.name) LIKE 'les %' THEN SUBSTRING(f.name, 5)
         WHEN LOWER(f.name) LIKE 'l'' %' THEN SUBSTRING(f.name, 3)
         WHEN LOWER(f.name) LIKE 'l’ %' THEN SUBSTRING(f.name, 3)
         WHEN LOWER(f.name) LIKE 'une %' THEN SUBSTRING(f.name, 5)
         ELSE f.name
       END ASC;`,
    [id]
  );
};

const findAllFocusByCategoryIdDesc = (id) => {
  return db.query(
    `SELECT f.id, f.name, f.pitch, f.image, f.categoryId, fc.name AS categoryName
     FROM focus f
     LEFT JOIN focuscategory fc ON f.categoryId = fc.id
     JOIN movie_focus mf ON mf.focusId = f.id
     WHERE f.categoryId = ?
     GROUP BY f.id
     HAVING COUNT(mf.movieId) > 0
     ORDER BY 
       CASE
         WHEN LOWER(f.name) LIKE 'le %' THEN SUBSTRING(f.name, 4)
         WHEN LOWER(f.name) LIKE 'la %' THEN SUBSTRING(f.name, 4)
         WHEN LOWER(f.name) LIKE 'les %' THEN SUBSTRING(f.name, 5)
         WHEN LOWER(f.name) LIKE 'l'' %' THEN SUBSTRING(f.name, 3)
         WHEN LOWER(f.name) LIKE 'l’ %' THEN SUBSTRING(f.name, 3)
         WHEN LOWER(f.name) LIKE 'une %' THEN SUBSTRING(f.name, 5)
         ELSE f.name
       END DESC;`,
    [id]
  );
};

// -------------------------------------------------
// MOVIES BY FOCUS
// -------------------------------------------------

const findAllMoviesByCategoryId = (id) => {
  return db.query(
    `SELECT m.*, f.id AS focusId, fc.name AS categoryName
     FROM movies m
     JOIN movie_focus mf ON mf.movieId = m.id
     JOIN focus f ON f.id = mf.focusId
     LEFT JOIN focuscategory fc ON f.categoryId = fc.id
     WHERE f.id = ?;`,
    [id]
  );
};

const findAllMoviesByCategoryIdAsc = (id) => {
  return db.query(
    `SELECT m.*, f.id AS focusId, fc.name AS categoryName
     FROM movies m
     JOIN movie_focus mf ON mf.movieId = m.id
     JOIN focus f ON f.id = mf.focusId
     LEFT JOIN focuscategory fc ON f.categoryId = fc.id
     WHERE f.id = ?
     ORDER BY 
      LOWER(
        CASE
          WHEN LOWER(m.title) LIKE 'le %' THEN SUBSTRING(m.title, 4)
          WHEN LOWER(m.title) LIKE 'la %' THEN SUBSTRING(m.title, 4)
          WHEN LOWER(m.title) LIKE 'les %' THEN SUBSTRING(m.title, 5)
          WHEN LOWER(m.title) LIKE "l'%" THEN SUBSTRING(m.title, 3)
          WHEN LOWER(m.title) LIKE "l’%" THEN SUBSTRING(m.title, 3)
          ELSE m.title
        END
      ) ASC;`,
    [id]
  );
};

const findAllMoviesByCategoryIdDesc = (id) => {
  return db.query(
    `SELECT m.*, f.id AS focusId, fc.name AS categoryName
     FROM movies m
     JOIN movie_focus mf ON mf.movieId = m.id
     JOIN focus f ON f.id = mf.focusId
     LEFT JOIN focuscategory fc ON f.categoryId = fc.id
     WHERE f.id = ?
     ORDER BY 
      LOWER(
        CASE
          WHEN LOWER(m.title) LIKE 'le %' THEN SUBSTRING(m.title, 4)
          WHEN LOWER(m.title) LIKE 'la %' THEN SUBSTRING(m.title, 4)
          WHEN LOWER(m.title) LIKE 'les %' THEN SUBSTRING(m.title, 5)
          WHEN LOWER(m.title) LIKE "l'%" THEN SUBSTRING(m.title, 3)
          WHEN LOWER(m.title) LIKE "l’%" THEN SUBSTRING(m.title, 3)
          ELSE m.title
        END
      ) DESC;`,
    [id]
  );
};

const findAllMoviesByCategoryIdYearAsc = (id) => {
  return db.query(
    `SELECT m.*, f.id AS focusId, fc.name AS categoryName
     FROM movies m
     JOIN movie_focus mf ON mf.movieId = m.id
     JOIN focus f ON f.id = mf.focusId
     LEFT JOIN focuscategory fc ON f.categoryId = fc.id
     WHERE f.id = ?
     ORDER BY m.year ASC;`,
    [id]
  );
};

const findAllMoviesByCategoryIdYearDesc = (id) => {
  return db.query(
    `SELECT m.*, f.id AS focusId, fc.name AS categoryName
     FROM movies m
     JOIN movie_focus mf ON mf.movieId = m.id
     JOIN focus f ON f.id = mf.focusId
     LEFT JOIN focuscategory fc ON f.categoryId = fc.id
     WHERE f.id = ?
     ORDER BY m.year DESC;`,
    [id]
  );
};

// -------------------------------------------------
// SINGLE FOCUS
// -------------------------------------------------

const findFocusByName = (name) => {
  return db.query(
    `SELECT f.*, fc.name AS categoryName
     FROM focus f
     LEFT JOIN focuscategory fc ON f.categoryId = fc.id
     WHERE f.name = ?;`,
    [name]
  );
};

const findFocusById = (id) => {
  return db.query(
    `SELECT f.*, fc.name AS categoryName
     FROM focus f
     LEFT JOIN focuscategory fc ON f.categoryId = fc.id
     WHERE f.id = ?;`,
    [id]
  );
};

// -------------------------------------------------
// FOCUS CATEGORY
// -------------------------------------------------

const findAllFocusCategory = () => {
  return db.query(`SELECT * FROM focuscategory;`);
};

const findFocusCategoryById = (id) => {
  return db.query(`SELECT * FROM focuscategory WHERE id = ?;`, [id]);
};

const findFocusCategoryByName = (name) => {
  return db.query(`SELECT * FROM focuscategory WHERE name = ?;`, [name]);
};

// -------------------------------------------------
// EXPORTS
// -------------------------------------------------

module.exports = {
  findAllFocusSortedNameAsc,
  findAllFocusSortedIdDesc,
  findAllFocusByCategoryIdRandom,
  findAllFocusByCategoryIdAsc,
  findAllFocusByCategoryIdDesc,
  findAllMoviesByCategoryId,
  findAllMoviesByCategoryIdAsc,
  findAllMoviesByCategoryIdDesc,
  findAllMoviesByCategoryIdYearAsc,
  findAllMoviesByCategoryIdYearDesc,
  findFocusByName,
  findFocusById,
  findAllFocusCategory,
  findFocusCategoryById,
  findFocusCategoryByName,
};
