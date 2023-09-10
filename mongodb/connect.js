import mongoose from 'mongoose'

const connectDB = async (url) => {
    try {
        await mongoose.connect(url)
        console.log('successfully connected to the database')
    } catch (err) {
        console.log('something went wrong while conneting to the database')
        console.log(err)
    }
}

export default connectDB