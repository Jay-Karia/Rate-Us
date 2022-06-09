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


router.get('/', (req, res) => {

    let context = []
    let cont = {};
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
let cont = {}

router.get('/rate/:slug', (req, res) => {
    // let local_context = []
    globalThis.cont;
    projects.forEach((e, index) => {
        cont = {
            'title': titles[index],
            'url': urls[index],
        }
        // local_context.push(cont)
    })

    // let slug = req.params.slug

    // if (slug == 'calc') { local_context['title'] = "Calculator"; local_context['url'] = 'https://Calculator.jaysk.repl.co' }
    // else if (slug == 'tictactoe') { local_context['title'] = "TicTacToe"; local_context['url'] = 'https://TicTacToe.jaysk.repl.co' }
    // else if (slug == 'cricket') { local_context['title'] = "Cricket Player Stats"; local_context['url'] = 'https://Cricket-Player-Statistics.jaysk.repl.co' }
    // else if (slug == 'notes') { local_context['title'] = "My Notes"; local_context['url'] = 'https://My-Notes.jaysk.repl.co' }
    // else if (slug == "toss") { local_context['title'] = "Toss"; local_context['url'] = 'https://Toss.jaysk.repl.co' }

    res.render('rates', {
        "title": cont.title,
        "url": cont.url
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
