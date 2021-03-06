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
    .js("resources/js/app.js", "public/js")
    .js("resources/js/Components/navbar.js", "public/js")
    .js("resources/js/datatables/agenda/agenda.js", "public/js/datatables/agenda")
    .js("resources/js/datatables/buildings/buildingsOverview.js", "public/js/datatables/buildings")
    .js("resources/js/datatables/buildings/viewBuilding.js", "public/js/datatables/buildings")
    .js("resources/js/datatables/users/usersOverview.js", "public/js/datatables/users")
    .react()
    .sass("resources/sass/app.scss", "public/css")
    .sass("resources/sass/login.scss", "public/css")
    .sass("resources/sass/agenda.scss", "public/css")
    .sass("resources/sass/datatable.scss", "public/css")
