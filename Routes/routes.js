const express = require('express')
const router = express.Router();
const path = require('path')

const Rates = require('../Models/rates')

router.get('/', (req, res) => {
    res.render('home')
})

// Global
let local_context = {
    'title': '',
    'url': '',
};

router.get('/rate/:slug', (req, res) => {
    globalThis.local_context;
    let slug = req.params.slug

    if (slug == 'calc') { local_context['title'] = "Calculator"; local_context['url'] = 'https://Calculator.jaysk.repl.co' }
    else if (slug == 'tictactoe') { local_context['title'] = "TicTacToe"; local_context['url'] = 'https://TicTacToe.jaysk.repl.co' }
    else if (slug == 'cricket') { local_context['title'] = "Cricket Player Stats"; local_context['url'] = 'https://Cricket-Player-Statistics.jaysk.repl.co' }
    else if (slug == 'notes') { local_context['title'] = "My Notes"; local_context['url'] = 'https://My-Notes.jaysk.repl.co' }
    else if (slug == "toss") { local_context['title'] = "Toss"; local_context['url'] = 'https://Toss.jaysk.repl.co' }

    res.render('rates', local_context)

})

router.post('/submit', (req, res) => {
    let my_local_context = {
        'title': local_context.title,
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