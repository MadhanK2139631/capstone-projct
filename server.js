const express=require("express");
const cors=require("cors");
const dbConfig=require("./src/config/db.config");



const PORT=6969;

const app=express();

var corsOptions={
    origin:'http://localhost:8081'
}

app.use(express.json())

app.use(cors(corsOptions));

app.use(express.urlencoded({extended:true}))

const db=require('./src/models')
const Book =db.books;


db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection failed", err);
    process.exit();
  });


require("./src/routes/book.routes")(app);

app.listen(PORT,()=>{
    console.log(`Server is running on port:${PORT}`)
})

