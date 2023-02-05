const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");
const app = express();


let saveJournal = [{
    title: "testing lang",
    text: "Lorem ipsum dolor sit amet, vestibulum vivamus mauris imperdiet dolor mauris, vitae erat non eu. Tellus nec quam lorem vel erat nisl, vestibulum luctus sed, augue sit cursus duis, magnis nisl, a pede integer sed. Quis id ligula libero donec porttitor enim, id mi lorem a, diam adipiscing odio, iaculis ante dolores quis. Metus a posuere et ultrices, iure veritatis elit venenatis ridiculus. Lobortis in et, consequat metus. In rhoncus venenatis etiam duis, arcu integer aliquam tincidunt adipiscing, in pede ut. Turpis eget eu adipiscing, varius tellus tortor mi semper wisi maecenas, placerat feugiat iaculis volutpat neque, mus etiam quisque aliquam dui amet eu, lorem in eu. Sit montes suspendisse, labore ipsum ut massa congue cras. Magnis in. Nonummy aliquam, non dolor sit elit sagittis lacus, mus ut nulla molestie, dictum in."
}];


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname+"/public"));

app.get("/", (req, res) => {

    res.render("index", {numOfDay: saveJournal.length, composed: saveJournal});
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.get("/contact", (req, res) => {
    res.render("contact");
})

app.get("/compose", (req, res) => {
    res.render("compose");
})

app.get("/posts/:postTitle", (req, res) => {
    const requestedTitle =  _.kebabCase(req.params.postTitle);
    
    saveJournal.forEach((journal) => {
        const storedTitle = _.kebabCase(journal.title);
        
        if (storedTitle === requestedTitle){
            res.render("journal", { 
                title: journal.title,
                text: journal.text
            });
        }
    });
})


app.post("/compose", (req, res) => {
    let journalTitle = req.body.titleJournal;
    let journalText = req.body.textJournal;


    let day = {
        title: journalTitle,
        text: journalText
    };

    saveJournal.push(day);
    res.redirect("/compose");
})







app.listen(3000, () => {
    console.log("Listening to port 3000");
})

