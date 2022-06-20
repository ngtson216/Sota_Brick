const mongoose = require('mongoose')

const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://blueace99:1234@cluster0.ble7q.mongodb.net/qlbh-db2?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  console.log('DB Connected: ' + conn.connection.host)
}

module.exports = connectDB