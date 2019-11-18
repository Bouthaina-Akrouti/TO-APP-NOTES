const fs = require ('fs')


function help () {
    
    console.log('node main.js --help \t\t\t\t\t for help')
    console.log('node main.js list \t\t\t\t\t to show the list of todos')
    console.log('node main.js add --title your_title --body your_body \t to add a todo note')
    console.log('node main.js read --title your_title \t\t\t to read a todo note')
    console.log('node main.js remove --title your_title \t\t\t to remove a todo note')
}


function list () {
    let todos = JSON.parse(fs.readFileSync('todos.json').toString())
    console.log ('printing', todos.length, 'notes')


    for (const todo of todos) {
        console.log ('-title: ', todo.title, '\t-Body:', todo.body)
    }
}


function add () {
    let newTodo = {}

    let indexTitle= process.argv.findIndex(el => el === '--title')
    if (indexTitle === -1 || process.argv[indexTitle+1] === 'undefined'){
        console.log('Missing required argument --title')
        return
    }
    else {
        newTodo['Title']= process.argv[indexTitle+1]
    }
    let indexBody= process.argv.findIndex(el => el==='--body')
    if (indexBody===-1 || process.argv[indexBody+1]==='undefined'){
        console.log('Missing required argument --body')
        return

    }
    else {
        newTodo['Body']= process.argv[indexBody+1]
    }
    let todos= JSON.parse(fs.readFileSync('todos.json').toString())
    fs.writeFileSync(todos.json, JSON.stringify(todos.concat([newTodo])))




}


function read () {
    let title=''

    let indexTitle=process.argv.findIndex(el => el === '--title')
    if ( indexTitle===-1 || process.argv[indexTitle+1] === 'undefined'){
        console.log ('Missing required argument --title')
        return
    }
    else title=process.argv[indexTitle+1]

    let todos=JSON.parse(fs.readFileSync('todos.json').toString())
    let todo= todos.find(x => x.title===title)
    if (todo) console.log('-Title:', todo.Title, '\t-Body:', todo.Body)
    else console.log ('todo not found')


}




function remove () {
    let title=''

    let indexTitle= process.argv.findIndex(el => el === '--title')
    if (indexTitle===-1 || process.argv[indexTitle+1]=== 'undefined'){
        console.log('Missing required argument --title')
        return
    }
    else title = process.argv[indexTitle+1]
    let todos = JSON.parse(fs.readFileSync('todos.json').toString())
    let todo= todos.find(x => x.title===title)
    todos.filter(el => el.title !== title)
}


switch (process.argv[2]) {
    case 'list' : list(); break;
    case 'add' : add(); break;
    case 'read' : read(); break;
    case 'remove' : remove(); break;
    default : help(); break;
}

if (process.argv.length < 3) help();