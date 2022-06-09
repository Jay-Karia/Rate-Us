const express = require('express')
const router = express.Router();
const path = require('path')

const fs = require('fs')
const projectsData = fs.readFileSync(path.join(__dirname, '../data/projects.json'));
const projects = JSON.parse(projectsData);

const Rates = require('../Models/rates');

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

let context = [];
let cont = {};

router.get('/', (req, res) => {
    globalThis.cont;
    globalThis.context
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
    // cont = {
    //     'title': titles,
    //     'slug': slugs,
    //     'desc': desc
    // }

})

// Global

router.get('/rate/:slug', (req, res) => {
    let title = req.params.slug.replace('-', ' ')
    res.render('rates', {
        "title": title,
        "url": `https://${req.params.slug}.jaysk.repl.co`
    })
})

router.post('/submit', (req, res) => {
    globalThis.cont;
    let my_local_context = {
        'title': cont.title,
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

module.exports = router;
