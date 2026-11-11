/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
const { cleanTags } = require('../utils/tags');
const { cleanStudioName } = require('../utils/studio');

const { cloudinary } = require('../utils/cloudinary');
const { replaceCloudinaryImage } = require('../utils/replaceCloudinaryImage');

const editingModel = require('../models/editingModel');
const editingMovieModel = require('../models/editingMovieModel');

const DEFAULT_IMAGE = '00_item_default.png';
const CLOUD_FOLDER = process.env.CLOUDINARY_FOLDER;

//-----------------------------
// EDIT DIRECTOR
//-----------------------------
const addDirector = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Director's name is required" });
    }
    await editingModel.insertDirector(name);

    return res.status(201).json({ message: 'Director successfully created' });
  } catch (error) {
    console.error('Error director creation :', error);
    return res.status(500).json({ message: 'Error director creation' });
  }
};

const editingDirector = async (req, res) => {
  try {
    const {
      name,
      pitch,
      wikilink,
      imdblink,
      senscritiquelink,
      websitelink,
      birthDate,
      deathDate,
      isFocus,
    } = req.body;
    const { id } = req.params;

    const existing = await editingModel.findDirectorById(id);
    if (!existing.length) {
      return res.status(404).json({ message: 'Director not found' });
    }

    const old = existing[0];

    // Détection des changements
    const noChange =
      old.name === name &&
      old.pitch === pitch &&
      old.wikilink === wikilink &&
      old.imdblink === imdblink &&
      old.senscritiquelink === senscritiquelink &&
      old.websitelink === websitelink &&
      old.birthDate === birthDate &&
      old.deathDate === deathDate &&
      Boolean(old.isFocus) === Boolean(isFocus);

    if (noChange) {
      return res.status(400).json({ message: 'No change detected for director' });
    }

    // Mise à jour
    const result = await editingModel.editDirector(
      name,
      pitch,
      wikilink,
      imdblink,
      senscritiquelink,
      websitelink,
      birthDate,
      deathDate,
      isFocus,
      id
    );

    if (result.affectedRows !== 0) {
      return res.status(200).json({ message: 'Director successfully updated' });
    }
    return res.status(400).json({ message: 'Error updating director' });
  } catch (error) {
    console.error('Stack trace :', error.stack);
    return res.status(500).json({ message: 'Error updating director' });
  }
};

const uploadDirectorImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'Aucun fichier fourni' });
    }

    const [director] = await editingModel.findDirectorById(id);

    if (!director) {
      return res.status(404).json({ message: 'Director introuvable' });
    }

    const { filename, url, warning } = await replaceCloudinaryImage({
      buffer: req.file.buffer,
      width: 500,
      height: 500,
      prefix: 'director',
      folder: CLOUD_FOLDER,
      oldImage: director.image,
      defaultImage: DEFAULT_IMAGE,
      updateDatabase: (newFilename) => editingModel.editDirectorImage(newFilename, id),
    });

    return res.status(200).json({
      message: 'Image successfully updated',
      filename,
      url,
      ...(warning && { warning }),
    });
  } catch (err) {
    console.error('❌ uploadDirectorImage:', err);
    return res.status(500).json({ message: 'Error updating image' });
  }
};

const eraseDirector = async (req, res = null) => {
  try {
    const directorId = req.params.id;

    const rows = await editingModel.findDirectorById(directorId);
    if (!rows || rows.length === 0) {
      if (res) return res.status(404).json({ message: 'Director non trouvé' });
      return;
    }

    // Vérifier si le réalisateur est associé à des films
    const [count] = await editingMovieModel.countMoviesByDirector(directorId);

    if (count.movieCount > 0) {
      if (res) {
        return res.status(409).json({
          message: `Impossible de supprimer ce réalisateur : il est associé à ${count.movieCount} film(s).`,
        });
      }
      return;
    }

    const imageUrl = rows[0].image;

    // Suppression SQL en premier
    await editingModel.deleteDirector(directorId);

    // Nettoyage Cloudinary indépendant
    if (imageUrl && imageUrl !== DEFAULT_IMAGE) {
      try {
        const publicId = `${CLOUD_FOLDER}/${imageUrl.replace(/\.[^.]+$/, '')}`;
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error('❌ Cloudinary delete error:', err);
      }
    }

    if (res) return res.sendStatus(204);
  } catch (err) {
    console.error('❌ eraseDirector:', err);
    if (res) {
      return res.status(500).json({ message: 'Erreur lors de la suppression du réalisateur' });
    }
  }
};

//-----------------------------
// EDIT CASTING
//-----------------------------
const addCasting = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Casting's name is required" });
    }
    await editingModel.insertCasting(name);

    return res.status(201).json({ message: 'Casting successfully created' });
  } catch (error) {
    console.error('Error Casting creation :', error);
    return res.status(500).json({ message: 'Error Casting creation' });
  }
};

const editingCasting = async (req, res) => {
  try {
    const { name, pitch, wikilink, imdblink, birthDate, deathDate, isFocus } = req.body;
    const { id } = req.params;

    const existing = await editingModel.findCastingById(id);
    if (!existing.length) {
      return res.status(404).json({ message: 'Casting not found' });
    }

    const old = existing[0];

    // Vérifier les changements
    const noChange =
      old.name === name &&
      old.pitch === pitch &&
      old.wikilink === wikilink &&
      old.imdblink === imdblink &&
      old.birthDate === birthDate &&
      old.deathDate === deathDate &&
      Boolean(old.isFocus) === Boolean(isFocus);

    if (noChange) {
      return res.status(400).json({ message: 'No change detected for casting' });
    }

    // Mise à jour
    const result = await editingModel.editCasting(
      name,
      pitch,
      wikilink,
      imdblink,
      birthDate,
      deathDate,
      isFocus,
      id
    );

    if (result.affectedRows !== 0) {
      return res.status(200).json({ message: 'Casting successfully updated' });
    }
    return res.status(400).json({ message: 'Error updating casting' });
  } catch (error) {
    console.error('Stack trace :', error.stack);
    return res.status(500).json({ message: 'Error updating casting' });
  }
};

const uploadCastingImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'Aucun fichier fourni' });
    }

    const [casting] = await editingModel.findCastingById(id);

    if (!casting) {
      return res.status(404).json({ message: 'Casting introuvable' });
    }

    const { filename, url, warning } = await replaceCloudinaryImage({
      buffer: req.file.buffer,
      width: 500,
      height: 500,
      prefix: 'casting',
      folder: CLOUD_FOLDER,
      oldImage: casting.image,
      defaultImage: DEFAULT_IMAGE,
      updateDatabase: (newFilename) => editingModel.editCastingImage(newFilename, id),
    });

    return res.status(200).json({
      message: 'Image successfully updated',
      filename,
      url,
      ...(warning && { warning }),
    });
  } catch (err) {
    console.error('❌ uploadCastingImage:', err);
    return res.status(500).json({ message: 'Error updating image' });
  }
};

const eraseCasting = async (req, res = null) => {
  try {
    const castingId = req.params.id;

    const rows = await editingModel.findCastingById(castingId);
    if (!rows || rows.length === 0) {
      if (res) return res.status(404).json({ message: 'Casting non trouvé' });
      return;
    }

    const [count] = await editingMovieModel.countMoviesByCasting(castingId);

    if (count.movieCount > 0) {
      if (res) {
        return res.status(409).json({
          message: `Impossible de supprimer ce membre du casting : il est associé à ${count.movieCount} film(s).`,
        });
      }
      return;
    }

    const imageUrl = rows[0].image;

    await editingModel.deleteCasting(castingId);

    if (imageUrl && imageUrl !== DEFAULT_IMAGE) {
      try {
        const publicId = `${CLOUD_FOLDER}/${imageUrl.replace(/\.[^.]+$/, '')}`;
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error('❌ delete cast:', err);
      }
    }

    if (res) return res.sendStatus(204);
  } catch (err) {
    console.error('❌ eraseCasting:', err);
    if (res) {
      return res.status(500).json({ message: 'Erreur lors de la suppression du casting' });
    }
  }
};

//-----------------------------
// EDIT SCREENWRITER
//-----------------------------
const addScreenwriter = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Screenwriter's name is required" });
    }
    await editingModel.insertScreenwriter(name);

    return res.status(201).json({ message: 'Screenwriter successfully created' });
  } catch (error) {
    console.error('Error Screenwriter creation :', error);
    return res.status(500).json({ message: 'Error Screenwriter creation' });
  }
};

const editingScreenwriter = async (req, res) => {
  try {
    const { name, pitch, wikilink, imdblink } = req.body;
    const { id } = req.params;

    const existingScreenwriter = await editingModel.findScreenwriterById(id);

    if (!existingScreenwriter.length) {
      return res.status(404).json({ message: 'Screenwriter introuvable' });
    }

    if (
      existingScreenwriter[0].name === name &&
      existingScreenwriter[0].pitch === pitch &&
      existingScreenwriter[0].wikilink === wikilink &&
      existingScreenwriter[0].imdblink === imdblink
    ) {
      return res.status(400).json({ message: 'Error updating Screenwriter: no changes detected' });
    }

    const result = await editingModel.editScreenwriter(name, pitch, wikilink, imdblink, id);

    if (result.affectedRows !== 0) {
      return res.status(200).json({ message: 'Screenwriter successfully updated' });
    }
    return res.status(400).json({ message: 'Error updating Screenwriter' });
  } catch (error) {
    console.error('Stack trace :', error.stack);
    return res.status(500).json({ message: 'Error updating Screenwriter' });
  }
};

const uploadScreenwriterImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'Aucun fichier fourni' });
    }

    const [screenwriter] = await editingModel.findScreenwriterById(id);

    if (!screenwriter) {
      return res.status(404).json({ message: 'Screenwriter introuvable' });
    }

    const { filename, url, warning } = await replaceCloudinaryImage({
      buffer: req.file.buffer,
      width: 500,
      height: 500,
      prefix: 'screenwriter',
      folder: CLOUD_FOLDER,
      oldImage: screenwriter.image,
      defaultImage: DEFAULT_IMAGE,
      updateDatabase: (newFilename) => editingModel.editScreenwriterImage(newFilename, id),
    });

    return res.status(200).json({
      message: 'Image successfully updated',
      filename,
      url,
      ...(warning && { warning }),
    });
  } catch (err) {
    console.error('❌ uploadScreenwriterImage:', err);
    return res.status(500).json({ message: 'Error updating image' });
  }
};

const eraseScreenwriter = async (req, res = null) => {
  try {
    const id = req.params.id;

    const rows = await editingModel.findScreenwriterById(id);
    if (!rows || rows.length === 0) {
      if (res) return res.status(404).json({ message: 'Screenwriter non trouvé' });
      return;
    }

    const [count] = await editingMovieModel.countMoviesByScreenwriter(id);

    if (count.movieCount > 0) {
      if (res) {
        return res.status(409).json({
          message: `Impossible de supprimer ce scénariste : il est associé à ${count.movieCount} film(s).`,
        });
      }
      return;
    }

    const imageUrl = rows[0].image;

    await editingModel.deleteScreenwriter(id);

    if (imageUrl && imageUrl !== DEFAULT_IMAGE) {
      try {
        const publicId = `${CLOUD_FOLDER}/${imageUrl.replace(/\.[^.]+$/, '')}`;
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error('❌ delete screenwriter image:', err);
      }
    }

    if (res) return res.sendStatus(204);
  } catch (err) {
    console.error('❌ eraseScreenwriter:', err);
    if (res) {
      return res.status(500).json({ message: 'Erreur lors de la suppression du scénariste' });
    }
  }
};

//-----------------------------
// EDIT COMPOSITOR
//-----------------------------

const addCompositor = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Compositor's name is required" });
    }
    await editingModel.insertCompositor(name);

    return res.status(201).json({ message: 'Compositor successfully created' });
  } catch (error) {
    console.error('Error Compositor creation :', error);
    return res.status(500).json({ message: 'Error Compositor creation' });
  }
};

const editingCompositor = async (req, res) => {
  try {
    const { name, pitch, wikilink, imdblink } = req.body;
    const { id } = req.params;

    const existingCompositor = await editingModel.findCompositorById(id);

    if (!existingCompositor.length) {
      return res.status(404).json({ message: 'Compositor introuvable' });
    }

    if (
      existingCompositor[0].name === name &&
      existingCompositor[0].pitch === pitch &&
      existingCompositor[0].wikilink === wikilink &&
      existingCompositor[0].imdblink === imdblink
    ) {
      return res.status(400).json({ message: 'Error updating Compositor: no changes detected' });
    }

    const result = await editingModel.editCompositor(name, pitch, wikilink, imdblink, id);

    if (result.affectedRows !== 0) {
      return res.status(200).json({ message: 'Compositor successfully updated' });
    }
    return res.status(400).json({ message: 'Error updating Compositor' });
  } catch (error) {
    console.error('Stack trace :', error.stack);
    return res.status(500).json({ message: 'Error updating Compositor' });
  }
};

const uploadCompositorImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'Aucun fichier fourni' });
    }

    const [compositor] = await editingModel.findCompositorById(id);

    if (!compositor) {
      return res.status(404).json({ message: 'Compositor introuvable' });
    }

    const { filename, url, warning } = await replaceCloudinaryImage({
      buffer: req.file.buffer,
      width: 500,
      height: 500,
      prefix: 'compositor',
      folder: CLOUD_FOLDER,
      oldImage: compositor.image,
      defaultImage: DEFAULT_IMAGE,
      updateDatabase: (newFilename) => editingModel.editCompositorImage(newFilename, id),
    });

    return res.status(200).json({
      message: 'Image successfully updated',
      filename,
      url,
      ...(warning && { warning }),
    });
  } catch (err) {
    console.error('❌ uploadCompositorImage:', err);
    return res.status(500).json({ message: 'Error updating image' });
  }
};

const eraseCompositor = async (req, res = null) => {
  try {
    const id = req.params.id;

    const rows = await editingModel.findCompositorById(id);
    if (!rows || rows.length === 0) {
      if (res) return res.status(404).json({ message: 'Compositor non trouvé' });
      return;
    }

    const [count] = await editingMovieModel.countMoviesByMusic(id);

    if (count.movieCount > 0) {
      if (res) {
        return res.status(409).json({
          message: `Impossible de supprimer ce compositeur : il est associé à ${count.movieCount} film(s).`,
        });
      }
      return;
    }

    const imageUrl = rows[0].image;

    await editingModel.deleteCompositor(id);

    if (imageUrl && imageUrl !== DEFAULT_IMAGE) {
      try {
        const publicId = `${CLOUD_FOLDER}/${imageUrl.replace(/\.[^.]+$/, '')}`;
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error('❌ delete compositor image:', err);
      }
    }

    if (res) return res.sendStatus(204);
  } catch (err) {
    console.error('❌ eraseCompositor:', err);
    if (res) {
      return res.status(500).json({ message: 'Erreur lors de la suppression du compositeur' });
    }
  }
};

//-----------------------------
// EDIT STUDIO
//-----------------------------

const addStudio = async (req, res) => {
  try {
    const { name } = req.body;

    // clean du nom
    const cleanedName = cleanStudioName(name);

    if (!cleanedName) {
      return res.status(400).json({ message: "Studio's name is required" });
    }

    await editingModel.insertStudio(cleanedName);

    return res.status(201).json({ message: 'Studio successfully created' });
  } catch (error) {
    console.error('Error Studio creation :', error);
    return res.status(500).json({ message: 'Error Studio creation' });
  }
};

const editingStudio = async (req, res) => {
  try {
    const { name, pitch, wikilink, imdblink } = req.body;
    const { id } = req.params;

    const existingStudio = await editingModel.findStudioById(id);

    if (!existingStudio.length) {
      return res.status(404).json({ message: 'Studio introuvable' });
    }

    if (
      existingStudio[0].name === name &&
      existingStudio[0].pitch === pitch &&
      existingStudio[0].wikilink === wikilink &&
      existingStudio[0].imdblink === imdblink
    ) {
      return res.status(400).json({ message: 'Error updating Studio: no changes detected' });
    }

    const result = await editingModel.editStudio(name, pitch, wikilink, imdblink, id);

    if (result.affectedRows !== 0) {
      return res.status(200).json({ message: 'Studio successfully updated' });
    }
    return res.status(400).json({ message: 'Error updating Studio' });
  } catch (error) {
    console.error('Stack trace :', error.stack);
    return res.status(500).json({ message: 'Error updating Studio' });
  }
};

const uploadStudioImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'Aucun fichier fourni' });
    }

    const [studio] = await editingModel.findStudioById(id);

    if (!studio) {
      return res.status(404).json({ message: 'Studio introuvable' });
    }

    const { filename, url, warning } = await replaceCloudinaryImage({
      buffer: req.file.buffer,
      width: 500,
      height: 500,
      prefix: 'studio',
      folder: CLOUD_FOLDER,
      oldImage: studio.image,
      defaultImage: '00_jmtb_item_default.jpg',
      updateDatabase: (newFilename) => editingModel.editStudioImage(newFilename, id),
    });

    return res.status(200).json({
      message: 'Image successfully updated',
      filename,
      url,
      ...(warning && { warning }),
    });
  } catch (err) {
    console.error('❌ uploadStudioImage:', err);
    return res.status(500).json({ message: 'Error updating image' });
  }
};

const eraseStudio = async (req, res = null) => {
  try {
    const id = req.params.id;

    const rows = await editingModel.findStudioById(id);
    if (!rows || rows.length === 0) {
      if (res) return res.status(404).json({ message: 'Studio non trouvé' });
      return;
    }

    const [count] = await editingMovieModel.countMoviesByStudio(id);

    if (count.movieCount > 0) {
      if (res) {
        return res.status(409).json({
          message: `Impossible de supprimer ce studio : il est associé à ${count.movieCount} film(s).`,
        });
      }
      return;
    }

    const imageUrl = rows[0].image;

    await editingModel.deleteStudio(id);

    if (imageUrl && imageUrl !== DEFAULT_IMAGE) {
      try {
        const publicId = `${CLOUD_FOLDER}/${imageUrl.replace(/\.[^.]+$/, '')}`;
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error('❌ delete studio image:', err);
      }
    }

    if (res) return res.sendStatus(204);
  } catch (err) {
    console.error('❌ eraseStudio:', err);
    if (res) {
      return res.status(500).json({ message: 'Erreur lors de la suppression du studio' });
    }
  }
};

//-----------------------------
// EDIT COUNTRY
//-----------------------------

const addCountry = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Country's name is required" });
    }
    await editingModel.insertCountry(name);

    return res.status(201).json({ message: 'Country successfully created' });
  } catch (error) {
    console.error('Error Country creation :', error);
    return res.status(500).json({ message: 'Error Country creation' });
  }
};

const editingCountry = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const existingcountry = await editingModel.findCountryById(id);

    if (!existingcountry.length) {
      return res.status(404).json({ message: 'Country introuvable' });
    }

    if (existingcountry[0].name === name) {
      return res.status(400).json({ message: 'Error updating Country: no changes detected' });
    }

    const result = await editingModel.editCountry(name, id);

    if (result.affectedRows !== 0) {
      return res.status(200).json({ message: 'Country successfully updated' });
    }
    return res.status(400).json({ message: 'Error updating Country' });
  } catch (error) {
    console.error('Stack trace :', error.stack);
    return res.status(500).json({ message: 'Error updating Country' });
  }
};

const uploadCountryImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'Aucun fichier fourni' });
    }

    const [country] = await editingModel.findCountryById(id);

    if (!country) {
      return res.status(404).json({ message: 'Country introuvable' });
    }

    const { filename, url, warning } = await replaceCloudinaryImage({
      buffer: req.file.buffer,
      width: 500,
      height: 281,
      prefix: 'country',
      folder: CLOUD_FOLDER,
      oldImage: country.image,
      defaultImage: '00_jmtb_flag_item_default.jpg',
      updateDatabase: (newFilename) => editingModel.editCountryImage(newFilename, id),
    });

    return res.status(200).json({
      message: 'Image successfully updated',
      filename,
      url,
      ...(warning && { warning }),
    });
  } catch (err) {
    console.error('❌ uploadCountryImage:', err);
    return res.status(500).json({ message: 'Error updating image' });
  }
};

const eraseCountry = async (req, res = null) => {
  try {
    const { id } = req.params;

    const rows = await editingModel.findCountryById(id);
    if (!rows || rows.length === 0) {
      if (res) return res.status(404).json({ message: 'Country non trouvé' });
      return;
    }

    const [count] = await editingMovieModel.countMoviesByCountry(id);

    if (count.movieCount > 0) {
      if (res) {
        return res.status(409).json({
          message: `Impossible de supprimer ce pays : il est associé à ${count.movieCount} film(s).`,
        });
      }
      return;
    }

    const imageUrl = rows[0].image;

    await editingModel.deleteCountry(id);

    if (imageUrl && imageUrl !== '00_jmtb_flag_item_default.jpg') {
      try {
        const publicId = `${CLOUD_FOLDER}/${imageUrl.replace(/\.[^.]+$/, '')}`;
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error('❌ delete country image:', err);
      }
    }

    if (res) return res.sendStatus(204);
  } catch (err) {
    console.error('❌ eraseCountry:', err);
    if (res) {
      return res.status(500).json({ message: 'Erreur lors de la suppression du pays' });
    }
  }
};

const getCountryByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const [[country]] = await editingModel.findCountryByName(name);
    res.status(200).json(country);
  } catch (error) {
    next(error);
  }
};

//-----------------------------
// EDIT GENRE
//-----------------------------

const addGenre = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Genre's name is required" });
    }
    const result = await editingModel.insertGenre(name);

    return res.status(201).json({ id: result.insertId, name });
  } catch (error) {
    console.error('Error Genre creation :', error);
    return res.status(500).json({ message: 'Error Genre creation' });
  }
};

const editingGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const existingGenre = await editingModel.findGenreById(id);

    if (!existingGenre.length) {
      return res.status(404).json({ message: 'Genre introuvable' });
    }

    if (existingGenre[0].name === name) {
      return res.status(400).json({ message: 'Error updating Genre: no changes detected' });
    }

    const result = await editingModel.editGenre(name, id);

    if (result.affectedRows !== 0) {
      return res.status(200).json({ message: 'Genre successfully updated' });
    }
    return res.status(400).json({ message: 'Error updating Genre' });
  } catch (error) {
    console.error('Stack trace :', error.stack);
    return res.status(500).json({ message: 'Error updating Genre' });
  }
};

const eraseGenre = async (req, res, next) => {
  try {
    const genreId = req.params.id;

    const genres = await editingModel.findGenreById(genreId);

    if (!genres || genres.length === 0) {
      return res.status(404).json({ message: 'Genre non trouvé' });
    }

    const [count] = await editingMovieModel.countMoviesByKind(genreId);

    if (count.movieCount > 0) {
      return res.status(409).json({
        message: `Impossible de supprimer ce genre : il est associé à ${count.movieCount} film(s).`,
      });
    }

    await editingModel.deleteGenre(genreId);
    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

//-----------------------------
// EDIT LANGUAGE
//----------------------------

const addLanguage = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Language's name is required" });
    }
    await editingModel.insertLanguage(name);

    return res.status(201).json({ message: 'Language successfully created' });
  } catch (error) {
    console.error('Error Language creation :', error);
    return res.status(500).json({ message: 'Error Language creation' });
  }
};

const editingLanguage = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const existingLanguage = await editingModel.findLanguageById(id);

    if (!existingLanguage.length) {
      return res.status(404).json({ message: 'Language introuvable' });
    }

    if (existingLanguage[0].name === name) {
      return res.status(400).json({ message: 'Error updating Language: no changes detected' });
    }

    const result = await editingModel.editLanguage(name, id);

    if (result.affectedRows !== 0) {
      return res.status(200).json({ message: 'Language successfully updated' });
    }
    return res.status(400).json({ message: 'Error updating Language' });
  } catch (error) {
    console.error('Stack trace :', error.stack);
    return res.status(500).json({ message: 'Error updating Language' });
  }
};

const eraseLanguage = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [language] = await editingModel.findLanguageById(id);

    if (!language) {
      return res.status(404).json({ message: 'Language not found.' });
    }

    const [count] = await editingMovieModel.countMoviesByLanguage(id);

    if (count.movieCount > 0) {
      return res.status(409).json({
        message:
          'Impossible de supprimer cette langue : elle est associée à un ou plusieurs films.',
      });
    }

    await editingModel.deleteLanguage(id);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const getLanguageByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const [[language]] = await editingModel.findLanguageByName(name);
    res.status(200).json(language);
  } catch (error) {
    next(error);
  }
};

//-----------------------------
// EDIT TAG
//-----------------------------

const addTag = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Tag's name is required" });
    }

    // 🔹 Nettoyage et normalisation
    const cleanedTags = cleanTags([{ name }]);

    if (cleanedTags.length === 0) {
      return res.status(400).json({ message: 'No valid tag found' });
    }

    // 🔹 Vérifie l'existence ou insère en parallèle
    const insertedTags = await Promise.all(
      cleanedTags.map(async (tagName) => {
        const existingTag = await editingModel.findTagByName(tagName);
        if (existingTag) return existingTag.id;

        const insertedId = await editingModel.insertTag(tagName);
        return insertedId;
      })
    );

    return res.status(201).json({
      message: 'Tag(s) successfully created',
      tags: await Promise.all(insertedTags.map((id) => editingModel.findTagById(id))),
    });
  } catch (error) {
    console.error('Error Tag creation :', error);
    return res.status(500).json({ message: 'Error Tag creation' });
  }
};

const editingTag = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Tag name is required' });
    }

    const existingTag = await editingModel.findTagById(id);

    if (!existingTag || existingTag.length === 0) {
      return res.status(404).json({ message: 'Tag non trouvé' });
    }

    if (existingTag[0].name === name.trim()) {
      return res.status(400).json({
        message: 'Error updating Tag: no changes detected',
      });
    }

    const [result] = await editingModel.editTag(name.trim(), id);

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Tag successfully updated' });
    }

    return res.status(400).json({ message: 'Error updating Tag' });
  } catch (error) {
    console.error('Error updating Tag:', error);
    return res.status(500).json({ message: 'Error updating Tag' });
  }
};

const eraseTag = async (req, res, next) => {
  try {
    const tagId = req.params.id;

    const tags = await editingModel.findTagById(tagId);
    if (!tags || tags.length === 0) {
      return res.status(404).json({ message: 'Tag non trouvé' });
    }

    const [count] = await editingMovieModel.countMoviesByTag(tagId);

    if (count.movieCount > 0) {
      return res.status(409).json({
        message: `Impossible de supprimer ce tag : il est associé à ${count.movieCount} film(s).`,
      });
    }

    await editingModel.deleteTag(tagId);
    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

const getTagByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const tag = await editingModel.findTagByName(name); // déjà l'objet ou null
    res.status(200).json(tag);
  } catch (error) {
    next(error);
  }
};

//-----------------------------
// EDIT FOCUS
//-----------------------------

const addFocus = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
      return res.status(400).json({ message: 'name and categoryId required' });
    }

    await editingModel.insertFocus(name, categoryId);
    return res.status(201).json({ message: 'Focus successfully created' });
  } catch (error) {
    console.error('Error Focus creation :', error);
    return res.status(500).json({ message: 'Error Focus creation' });
  }
};

const editingFocus = async (req, res) => {
  try {
    const { name, pitch, categoryId } = req.body;
    const { id } = req.params;

    const existingFocus = await editingModel.findFocusById(id);

    if (!existingFocus.length) {
      return res.status(404).json({ message: 'Focus introuvable' });
    }

    if (
      existingFocus[0].name === name &&
      existingFocus[0].pitch === pitch &&
      existingFocus[0].categoryId === Number(categoryId)
    ) {
      return res.status(400).json({
        message: 'Error updating Focus: no changes detected',
      });
    }

    const result = await editingModel.editFocus(name, pitch, categoryId, id);

    if (result.affectedRows !== 0) {
      return res.status(200).json({ message: 'Focus successfully updated' });
    }

    return res.status(400).json({ message: 'Error updating Focus' });
  } catch (error) {
    console.error('Stack trace :', error.stack);
    return res.status(500).json({ message: 'Error updating Focus' });
  }
};

const uploadFocusImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'Aucun fichier fourni' });
    }

    const [focus] = await editingModel.findFocusById(id);

    if (!focus) {
      return res.status(404).json({ message: 'Focus introuvable' });
    }

    const { filename, url, warning } = await replaceCloudinaryImage({
      buffer: req.file.buffer,
      width: 500,
      height: 500,
      prefix: 'focus',
      folder: CLOUD_FOLDER,
      oldImage: focus.image,
      defaultImage: '00_jmtb_item_default.jpg',
      updateDatabase: (newFilename) => editingModel.editFocusImage(newFilename, id),
    });

    return res.status(200).json({
      message: 'Image successfully updated',
      filename,
      url,
      ...(warning && { warning }),
    });
  } catch (err) {
    console.error('❌ uploadFocusImage:', err);
    return res.status(500).json({ message: 'Error updating image' });
  }
};

const eraseFocus = async (req, res = null) => {
  try {
    const focusId = req.params.id;

    const focus = await editingModel.findFocusById(focusId);
    if (!focus || focus.length === 0) {
      if (res) return res.status(404).json({ message: 'Focus non trouvé' });
      return;
    }

    // Vérification des associations avec les films
    const [count] = await editingMovieModel.countMoviesByFocus(focusId);

    if (count.movieCount > 0) {
      if (res) {
        return res.status(409).json({
          message: 'Impossible de supprimer ce Focus : il est associé à un ou plusieurs films.',
        });
      }
      return;
    }

    const imageUrl = focus[0].image;

    // Suppression SQL en premier
    await editingModel.deleteFocus(focusId);

    // Nettoyage Cloudinary indépendant
    if (imageUrl && imageUrl !== '00_jmtb_item_default.jpg') {
      try {
        const publicId = `${CLOUD_FOLDER}/${imageUrl.replace(/\.[^.]+$/, '')}`;
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudErr) {
        console.error('❌ Erreur suppression image Focus :', cloudErr);
      }
    }

    if (res) return res.sendStatus(204);
  } catch (error) {
    console.error('❌ Erreur eraseFocus :', error);
    if (res) {
      return res.status(500).json({
        message: 'Erreur lors de la suppression du Focus',
      });
    }
  }
};

module.exports = {
  addDirector,
  editingDirector,
  uploadDirectorImage,
  eraseDirector,
  addCasting,
  editingCasting,
  uploadCastingImage,
  eraseCasting,
  addScreenwriter,
  editingScreenwriter,
  uploadScreenwriterImage,
  eraseScreenwriter,
  addCompositor,
  editingCompositor,
  uploadCompositorImage,
  eraseCompositor,
  addStudio,
  editingStudio,
  uploadStudioImage,
  eraseStudio,
  addCountry,
  editingCountry,
  uploadCountryImage,
  eraseCountry,
  getCountryByName,
  addGenre,
  editingGenre,
  eraseGenre,
  addLanguage,
  editingLanguage,
  eraseLanguage,
  getLanguageByName,
  addTag,
  editingTag,
  eraseTag,
  getTagByName,
  addFocus,
  editingFocus,
  uploadFocusImage,
  eraseFocus,
};
