const program = require("commander");
const { prompt } = require("inquirer");
const dependencies = require("./modules/npmPackages");
const { purple, white, green, red } = require("./modules/colors");

console.info(purple, `----------------------------------------`)
console.info(green, "MUNCLE'S PROJECT GENERATOR (v 1.0.0)")
console.info(purple, `----------------------------------------`)

const questions = [
    {
        name: "type",
        message:
            "Nice to see you! \n What kind of project do you want to generate?",
        type: "list",
        choices: ["HTML / CSS / JS", "React", "Django", "Gatsby", "Node CLI App"],
        filter(input) {
            switch (input) {
                case "HTML / CSS / JS":
                    return "html";
                case "React":
                    return "react";
                case "Django":
                    return "django";
                case "Gatsby":
                    return "gatsby";
                case "Node CLI App":
                    return "node_cli"
                default:
                    return;
            }
        }
    },
    {
        name: "name",
        message:
            "What would you like to call your project? (Remember that it MUST be camel case!) ",
        type: "input"
        // TODO: put some validation logic in
    },
    {
        name: "dependencies",
        message: "Please select the dependencies you would like to include",
        type: "checkbox",
        choices: require("./modules/npmPackages"),
        filter(input) {
            return input.map(i => {
                return i.toLowerCase().replace(" ", "-");
            });
        }
    },
    {
        name: "github_repo",
        message: "Please enter your GitHub repo URL: ",
        type: "input"
        // TODO: put some validation logic in
    }
];

const Project = require("./modules/Project");

program.version("0.0.1").description("New web app builder");

program
    .command("new")
    .alias("n")
    .action(() => {
        prompt(questions).then(answers => {
            const project = new Project(answers)
            // do something
            project
                .init()
                .then(() =>
                    project
                        .installDependencies()
                        .then(() => project.attachGitHubRepo())
                        .then(() => project.launchEditor())
                        .then(() => project.startDevServer())
                )
                .catch(err => console.error(err));
        });
    });

//Dummy data
// const project = new Project({
//     name: "prototype",
//     type: "django",
//     dependencies: ["bootstrap", "reactstrap"],
//     github_repo: "https://github.com/dandroos/my-test.git"
// });

program.parse(process.argv);