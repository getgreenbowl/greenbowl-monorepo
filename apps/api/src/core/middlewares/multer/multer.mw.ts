import multer from 'multer';

const getStorage = (path = 'generic') => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, file.fieldname + '-' + uniqueSuffix);
    },
  });
  return multer({ storage });
};

export const ItemImageUpload = getStorage('/');
