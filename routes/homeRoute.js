import express from 'express'
import Url from '../mongodb/models/url.js'
const router = express.Router()

// '/' = http://localhost:8080
router.route('/:uid').get(async (req, res) => {
    try {
        const urlObj = await Url.findOne({ uid: req.params.uid })
        if (urlObj) {
            await Url.updateOne(
                {
                    uid: req.params.uid
                },
                {
                    $inc: { clicks: 1 }
                })
            return res.redirect(urlObj.ogUrl)
        }
        else {
            res.status(404).json({ message: 'Couldnt find the url' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Something went wrong', err })
    }
})

export default router