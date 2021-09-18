const tailwindcss = require('tailwindcss');
module.exports = {
    plugins: [
        tailwindcss('./src/js/tailwind.js'),
        require('autoprefixer')
    ],
};
