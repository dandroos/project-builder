const shell = require("shelljs");
const { purple, white, green, red } = require("./colors");

const init = options => {
    return new Promise((res, rej) => {
        switch (options.type) {
            case "django":
                console.info(
                    purple,
                    `Creating a new Django project called ${options.name}...`
                );
                shell.exec(
                    `django-admin startproject ${options.name}`,
                    {
                        silent: true
                    },
                    () => {
                        console.info(green, "Django project created");
                        shell.cd(options.name);
                        shell.exec("git init", { silent: true });
                        shell.exec("npm init -y", { silent: true }, () => {
                            res(true);
                        });
                    }
                );
                break;
            case "gatsby":
                console.info(
                    purple,
                    `Creating a new Gatsby project called ${options.name}...`
                );
                shell.exec(
                    `gatsby new ${options.name}`,
                    {
                        silent: true
                    },
                    () => {
                        console.info(green, "Gatsby project created");
                        shell.cd(options.name);
                        res(true);
                    }
                );
                break;
            case "html":
                console.info(
                    purple,
                    `Creating an HTML/CSS/JS project called ${options.name}...`
                );
                shell.mkdir(
                    options.name,
                    `${options.name}/css`,
                    `${options.name}/js`
                );
                shell.touch(
                    `${options.name}/index.html`,
                    `./${options.name}/css/styles.css`,
                    `./${options.name}/js/scripts.js`
                );
                shell.cd(options.name);
                shell.exec("git init", {
                    silent: true
                });
                shell.exec(
                    "npm init -y",
                    {
                        silent: true
                    },
                    () => {
                        console.info(green, "Project created");
                        res(true);
                    }
                );
                break;
            case "node_cli":
                console.info(purple, `Creating a Node CLI App called ${options.name}`)
                shell.mkdir(options.name);
                shell.cd(options.name)
                shell.exec('npm init -y', ()=>{
                    shell.touch('index.js');
                    shell.mkdir('modules');
                    shell.exec('npm i commander inquirer shelljs', {silent: true}, ()=>{
                        console.info(green, "Project created")
                        res(true);
                    })
                })
                break;
            case "react":
                console.info(
                    purple,
                    `Creating a React project called ${options.name}...`
                );
                shell.exec(
                    `npx create-react-app ${options.name}`,
                    {
                        silent: true
                    },
                    () => {
                        console.info(green, "Project created");
                        console.info("");
                        shell.cd(options.name);
                        res(true);
                    }
                );
                break;
            default:
                rej("There was an error");
        }
    });
};

module.exports = init;
