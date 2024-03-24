const express = require('express')
const app = express()


const port = 3000
const restaurants = require("./public/json/restaurant.json").results


const exphbs = require("express-handlebars").engine
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');


app.use(express.static('public'))


app.get('/', (req, res) => {
    res.redirect("/restaurants")
})



app.get("/restaurants", (req, res) => {
    const keyword = req.query.keyword?.trim()
    const filter_restaurants = keyword ? restaurants.filter( restaurant => {
        // 搜尋 name, name_en, category, phone, description 是否符合關鍵字
        return ["name", "name_en", "category", "phone", "description"].some( property => {         
            return restaurant[property].toLowerCase().includes(keyword.toLowerCase())         
        } )
    }) : restaurants
    
    res.render("index", { restaurants: filter_restaurants, keyword })
})


app.get("/restaurant/:id", (req, res) => {
    const id = Number(req.params.id)
    const restaurant = restaurants.find((restaurant) => {
        return restaurant.id === id
    } )

    res.render("detail", { restaurant })
})



app.listen( port, () => {
    console.log(`express server is running on http://localhost:${port}`)
})

