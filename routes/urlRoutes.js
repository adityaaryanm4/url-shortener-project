import express from 'express'
import { isValidHttpUrl } from '../utils/utils.js'
import Url from '../mongodb/models/url.js'
import { nanoid } from 'nanoid'
import * as dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

router.route('/').get((req, res) => {
    res.send('hello from url routes !')
})

// '/' = http://localhost:8080/api/shorten

router.route('/').post(async (req, res) => {
    const { ogUrl } = req.body
    const baseUrl = process.env.BASE_URL
    if (isValidHttpUrl(ogUrl)) {
        try {
            const urlObj = await Url.findOne({ ogUrl })
            if (urlObj) {
                res.status(200).json({ url: urlObj.shortUrl })
            } else {
                const uid = nanoid(8)
                const shortUrl = `${baseUrl}/${uid}`
                const newUrl = new Url({
                    uid, shortUrl, ogUrl
                })
                await newUrl.save()
                res.status(200).json({ shortUrl })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Something went wrong', err })
        }

    }
    else {
        res.status(404).json({ message: 'Invalid url' })
    }
})

export default router