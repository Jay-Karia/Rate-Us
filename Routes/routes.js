const express = require('express')
const router = express.Router();
const path = require('path')

const fs = require('fs')
const projectsData = fs.readFileSync(path.join(__dirname, '../data/projects.json'));
const projects = JSON.parse(projectsData);

const Rates = require('../Models/rates');
const { exit } = require('process');
const { exec } = require('child_process');

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

let length = projects.length
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
    if (context.length > projects.length) {
        context = context.slice(projects.length)
    }
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

var DBRates = [];
router.get('/trending', (req, res) => {
    globalThis.title;
    let count = 6;
    // Reading Database
    let DBProjects = [];

    Rates.find({}, function (err, data) {
        globalThis.DBProjects;
        let project = data.map((p) => { return p['Project Name'] });
        DBProjects = project
        getProjects(project)
        return project
    });
    function getProjects(project) {
        globalThis.DBProjects
        DBProjects = project
        DBProjects = [... new Set(DBProjects)]
        DBProjects = DBProjects.filter(e => e)
        for (let index = 0; index <= DBProjects.length; index++) {
            if (DBProjects[index] === undefined || DBProjects === null) {
                DBProjects[index] = ''
                DBProjects = DBProjects.filter(e => e)
            }
            Rates.find({ 'Project Name': DBProjects[index] }, ((err, data) => {
                let rates = data.map((ra) => { return ra['Rates'] });
                let projectName = data.map((pr) => { return pr['Project Name'] });
                console.log(projectName, rates)
                DBRates.push(rates)
                if (index == count - 1) {
                    dataDB(DBRates)
                }
            }))
        }
    }
    let list1 = []
    let indexes = [];
    let context3 = [];
    let cont3 = []
    let rgbs = []

    let titles2 = []
    let avgs = []
    // Data from database
    function dataDB(r) {
        // Other logic

        let counter;
        let one = '0, 102, 77';
        let two = '0, 26, 102';
        let three = '51, 0, 102';
        let four = '102, 0, 77';
        let five = '102, 0, 26';
        let rgb = [one, two, three, four, five];

        let obj = []
        r.forEach((e, index) => {
            let R = r[index]
            let sum = 0;
            counter = 0;
            R.forEach((e, index) => {
                counter = counter + 1
                sum = sum + e;
            })
            avgs.push(sum / counter)
            if (isNaN(avgs[index]) === true) {
                avgs[index] = 0;
            }
            obj.push(avgs[index] + ' ' + titles[index])
            sum = 0
            avgs = avgs.reverse(avgs.sort(function (a, b) { return a - b }))
            obj.sort(function (a, b) {
                return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
            });

            obj.reverse();

        })

        avgs.forEach((e, index) => {
            let avg = avgs[index]
            if (avg >= 0 && avg <= 1) {
                rgbs.push(rgb[0])
            } else if (avg > 1 && avg <= 2) {
                rgbs.push(rgb[1])
            } else if (avg > 2 && avg <= 3) {
                rgbs.push(rgb[2])
            } else if (avg > 3 && avg <= 4) {
                rgbs.push(rgb[3])
            } else if (avg > 4 && avg <= 5) {
                rgbs.push(rgb[4])
            }
            avgs[index] = Math.round(avgs[index] * 10) / 10
        })
        obj.forEach((e, index) => {
            let [first, ...rest] = obj[index].split(' ')
            rest = rest.join(' ')
            titles2.push(rest)
        })


        titles.forEach((e, index) => {
            list1.push(r[titles[index]])
            try {
                cont3 = {
                    'titles': titles2[index],
                    'avgs': avgs[index],
                    'rgb': rgbs[index]
                }
                context3.push(cont3)


            } catch (e) { }
        })


        list1 = list1.reverse(list1.sort())
        renderTemplate(context3, avgs, titles2, rgbs)
    }
    function renderTemplate(context3, avgs, titles2, rgbs) {
        res.render('trending', {
            'avgs': avgs,
            'titles2': titles2,
            'rgb': rgbs,
            "context": context3
        })
    }
})

module.exports = router;
