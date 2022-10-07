const MONGO_PASS = 'admin';
const MONGODB_URL = `mongodb+srv://admin:${MONGO_PASS}@cluster0.hsx0hhi.mongodb.net/?retryWrites=true&w=majority`;
const mongoseOptions = {
    useNewUrlParser : true,
    useUnifieTopology : true,
    useCreateIndex : true,
}

module.exports = {
    MONGO_PASS : MONGO_PASS,
    MONGODB_URL : MONGODB_URL,
    mongoseOptions : mongoseOptions
}