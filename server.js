const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const ShortUrl  = require("./models/shortUrl")

mongoose.connect('mongodb://localhost/urlShortner').then(console.log("Db connected")).catch(err=>{console.log(err)})

app = express()

app.set('view engine','ejs')
app.use(express.urlencoded({ extended: false }))

//app.set('views', path.join(__dirname, 'views'))
app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls })
  })
  
  app.post('/shortUrls', async (req, res) => {
   await ShortUrl.create({ full: req.body.fullUrl })
  
    res.redirect('/')
  })
  
  app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++
    shortUrl.save()
  
    res.redirect(shortUrl.full)
  })


PORT = 3000

app.listen(PORT,()=>{
    console.log(`serving on ${PORT} port`)
})