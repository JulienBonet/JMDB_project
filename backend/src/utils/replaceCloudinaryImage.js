const { cloudinary, uploadBufferToCloudinary } = require('./cloudinary');
const { resizeAndCropBuffer } = require('./imageUtils');

/**
 * Remplace une image Cloudinary et sa référence en base de données.
 *
 * Ordre :
 * 1. Redimensionnement
 * 2. Upload nouvelle image
 * 3. Mise à jour SQL
 * 4. Suppression ancienne image
 *
 * En cas d'échec SQL, la nouvelle image est supprimée.
 * En cas d'échec de suppression de l'ancienne image,
 * la mise à jour est conservée et un avertissement est retourné.
 */
const replaceCloudinaryImage = async ({
  buffer,
  width,
  height,
  prefix,
  folder,
  oldImage,
  defaultImage,
  updateDatabase,
}) => {
  let newPublicId = null;

  try {
    // 1. Redimensionnement
    const resizedBuffer = await resizeAndCropBuffer(buffer, width, height, 'jpeg');

    // 2. Upload de la nouvelle image
    const { publicId, url } = await uploadBufferToCloudinary(resizedBuffer, folder, prefix);

    newPublicId = publicId;

    const filename = `${publicId.split('/').pop()}.jpg`;

    // 3. Mise à jour de la base de données
    const result = await updateDatabase(filename);

    if (!result || result.affectedRows === 0) {
      throw new Error('Aucune ligne mise à jour en base de données');
    }

    // 4. Suppression de l'ancienne image
    let warning = null;

    if (oldImage && oldImage !== defaultImage) {
      const oldPublicId = oldImage.includes('/')
        ? oldImage.replace(/\.[^.]+$/, '')
        : `${folder}/${oldImage.replace(/\.[^.]+$/, '')}`;

      try {
        const deletionResult = await cloudinary.uploader.destroy(oldPublicId);

        if (deletionResult.result !== 'ok' && deletionResult.result !== 'not found') {
          warning = "L'ancienne image n'a pas pu être supprimée de Cloudinary.";

          console.error('Ancienne image non supprimée :', oldPublicId, deletionResult);
        }
      } catch (deleteError) {
        warning = "L'ancienne image n'a pas pu être supprimée de Cloudinary.";

        console.error('Erreur suppression ancienne image :', oldPublicId, deleteError);
      }
    }

    return {
      filename,
      url,
      warning,
    };
  } catch (error) {
    // Nettoyage de la nouvelle image si le traitement échoue
    if (newPublicId) {
      try {
        await cloudinary.uploader.destroy(newPublicId);
      } catch (cleanupError) {
        console.error('Erreur nettoyage nouvelle image :', newPublicId, cleanupError);
      }
    }

    throw error;
  }
};

module.exports = { replaceCloudinaryImage };
