require("dotenv").config();

const express = require("express");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Fix: Customized Helmet to allow external CDNs for styles, fonts, and icons
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                styleSrc: [
                    "'self'", 
                    "'unsafe-inline'", 
                    "https://fonts.googleapis.com", 
                    "https://cdnjs.cloudflare.com"
                ],
                fontSrc: [
                    "'self'", 
                    "https://fonts.gstatic.com", 
                    "https://cdnjs.cloudflare.com"
                ],
                imgSrc: ["'self'", "data:"],
                connectSrc: ["'self'"],
            },
        },
    })
);

app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

// 404 Catch-all
app.use((req, res) => {
    res.status(404).send("404 Page Not Found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Bedrock Labs running on port ${PORT}`);
});

