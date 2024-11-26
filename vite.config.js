import { defineConfig } from "vite";
import * as glob from "glob";
import path, { resolve } from "node:path";
import htmlPurge from 'vite-plugin-purgecss';
import handlebars from 'vite-plugin-handlebars';
import { generarContextoDePagina } from './data/index';

// Función para obtener las entradas HTML automáticamente
const getHtmlEntries = () => {
    return Object.fromEntries(
        glob.sync('.//.html', { ignore: ['./dist/', './node_modules/*'] }).map(file => [
            file.slice(0, file.length - path.extname(file).length),
            resolve(__dirname, file)
        ])
    );
};

export default defineConfig({
    appType: 'mpa', // Multi-Page Application
    base: "/PROYECTO_WEB2/",
    build: {
        rollupOptions: {
            input: {
                // Define manualmente las páginas para garantizar su inclusión
                main: resolve(__dirname, 'index.html'), // Página principal
                about: resolve(__dirname, 'blogs.html'), // Página "Acerca de Nosotros"
                // Si necesitas más páginas, simplemente agrégalas aquí
            },
        },
    },
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'partials'),
            context: generarContextoDePagina // Función para datos dinámicos en Handlebars
        }),
        htmlPurge({}), // Plugin para purgar CSS no utilizado
    ]
});