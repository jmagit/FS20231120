const express = require('express');
const multer = require('multer')

const upload = multer({
    limits: { fileSize: 2 * 1024 * 1024 /* 2mb */},
    storage: multer.diskStorage({
      destination: (req, file, cb) => cb(null, 'uploads/'),
      filename: (req, file, cb) => cb(null, file.originalname)
    })
  })
  
const router = express.Router();
router.use('/files', express.static('uploads'))
router.get('/fileupload', function (req, res) {
  res.status(200).end(`
    <html><body><h1>Multiple file uploads</h1>
    <form action="fileupload" method="post" enctype="multipart/form-data">
        <input type="file" name="filestoupload" multiple="multiple" required><input type="submit">
    </form>
    </body></html>`)
})
router.post('/fileupload', upload.array('filestoupload'), async (req, res, next) => {
  let rutas = req.files.map(f => ({ url: `${req.protocol}://${req.headers.host}/files/${f.originalname}` }))
  if (req.headers?.accept?.includes('application/json'))
    res.status(200).json(rutas).end();
  else {
    res.status(200).end(`
    <html><body><h1>Uploads</h1>
    <ul>${rutas.map(r => `<li><a href="${r.url}">${r.url}</a></li>`).join('')}</ul>
    </body></html>`);
  }
})
module.exports = router;