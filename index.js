const path = require("path");
const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 8000;

// to convert jpg into required format 
// dest - yk ( where to store ) req, file of user and cb is callback 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`); // to make the file unique, to avoid overwriting 
    },
});

const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    return res.render("homepage");
});

// single file 
 app.post("/upload", upload.single("profileImage"), (req, res) => {
    // to upload multiple images
    //app.post("/upload", upload.fields([{name: 'profileImage'}, {name:'coverImage'}]), (req,res) => {
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/");
});

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`)); // corrected to use the PORT variable
