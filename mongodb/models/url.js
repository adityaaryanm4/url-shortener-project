import mongoose from 'mongoose'

const UrlSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    ogUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    clicks: { type: Number, required: true, default: 0 },
})

const Url = mongoose.model('Url', UrlSchema)

export default Url