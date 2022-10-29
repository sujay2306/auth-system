const app = require("./app")
//port variable comes from process.env
const {PORT} = process.env

app.listen(PORT,()=>{
    console.log(`app is running at ${PORT}`);
});