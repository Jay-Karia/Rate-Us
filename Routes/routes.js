const express = require('express')
const router = express.Router();
const path = require('path')

const fs = require('fs')
const projectsData = fs.readFileSync(path.join(__dirname, '../data/projects.json'));
const projects = JSON.parse(projectsData);

const Rates = require('../Models/rates');
const { render } = require('express/lib/response');

let titles = [];
let slugs = [];
let urls = []
let desc = [];

projects.forEach((e, index) => {
    titles.push(projects[index].title)
    slugs.push(projects[index].slug)
    urls.push(projects[index].url)
    desc.push(projects[index].desc)
});

// Global
let context2 = [];
let cont2 = {}
let title = [];
let context = [];
let cont = {};

router.get('/', (req, res) => {
    globalThis.cont;
    globalThis.context;
    projects.forEach((e, index) => {
        cont = {
            'title': titles[index],
            'slug': slugs[index],
            'desc': desc[index]
        }
        context.push(cont)
    });
    res.render('home', {
        "titles": titles,
        "slugs": slugs,
        "desc": desc,
        "context": context
    })

})

router.get('/rate/:slug', (req, res) => {
    globalThis.cont2
    globalThis.context2
    globalThis.title;
    let slug = req.params.slug;
    index = slugs.indexOf(slug)
    projects.forEach(e => {
        cont2 = {
            'title': titles[index],
            'url': urls[index]
        }
        context2.push(cont2)
    });
    title.push(cont2.title)
    res.render('rates', {
        "title": cont2.title,
        "url": cont2.url
    })
})

router.post('/submit', (req, res) => {
    let my_local_context = {
        'title': title[0],
        'name': '',
        'rate': 0,
        'description': ''
    };


    let name = req.body.name
    let rate = req.body.rate
    let desc = req.body.description


    my_local_context['name'] = name
    my_local_context['rate'] = rate
    my_local_context['description'] = desc


    const rates = new Rates({
        "Project Name": my_local_context.title,
        "Name": my_local_context.name,
        "Rates": my_local_context.rate,
        "Description": my_local_context.description
    })
    rates.save();

    res.render('submit')

})

router.get('/trending', (req, res) => {
    res.render('trending')
})

module.exports = router;
