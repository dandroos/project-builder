const program = require('commander');
const { prompt } = require('inquirer');

const Project = require('./modules/Project');

program.version("0.0.1").description('New web app builder');

//Dummy data
const project = new Project({
    name: 'my-amazing-site',
    type: 'html',
    dependencies: ['bootstrap', 'reactstrap'],
    github_repo: 'https://github.com/dandroos/my-test.git'
})

project.init()
    .then(()=>project.installDependencies()
    .then(()=>project.attachGitHubRepo())
    .then(()=>console.log('binished!')))

// Q1 What kind of project do you want to create?
// React, Vue, Gatsby, MERN stack, Basic HTML/CSS/JS boilerplate, Django, Laravel

// Q2 What name do you want to give to your project?

// Q3 Which of your favourite libraries would you like to install?
// Bootstrap, Reactstrap, Redux, React Reveal, Mongoose, Material UI....

// Q4 Enter the GitHub repo you have set up for this project

// Q5 Would you like to open the project in VS Code when ready? (y/N)