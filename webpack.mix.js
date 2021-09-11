const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .js([
            "resources/js/app.js",
            "resources/js/components/navbar"
        ], "public/js")
    .react()
    .sass("resources/sass/app.scss", "public/css")
    .sass("resources/sass/login.scss", "public/css")
    .sass("resources/sass/buildings.scss", "public/css")
    .ts("resources/js/Components/navbar-react.tsx", "public/js")
