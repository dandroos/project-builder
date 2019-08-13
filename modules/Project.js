const shell = require('shelljs');

module.exports = class Project {
    constructor(options) {
        this.name = options.name;
        this.type = options.type;
        this.dependencies = options.dependencies;
        this.github_repo = options.github_repo;
    }

    init() {
        return new Promise((res, rej)=>{
            switch (this.type) {
                case 'gatsby':
                    shell.exec(`gatsby new ${this.name}`, () => {
                        console.info('Project created.')
                        shell.cd(`./${this.name}`) // needs fixing
                        res(true)
                    })
                    break;
                case 'html':
                    shell.mkdir(this.name, `${this.name}/css`, `${this.name}/js`)
                    shell.touch(`${this.name}/index.html`, `./${this.name}/css/styles.css`, `./${this.name}/js/scripts.js`)
                    shell.cd(this.name) // needs fixing
                    shell.exec('git init')
                    shell.exec('npm init -y', ()=>{
                        res(true)
                    })
                    break;
                default: 
                    rej('There was an error');
            }
        })
    }

    installDependencies(){
        return new Promise((res, rej)=>{
            const dependencies = this.dependencies.join(' ');
            shell.exec(`npm i ${dependencies}`, ()=>{
                shell.exec('code .');
                res(true);
            })
        })
    }

    attachGitHubRepo(){
        return new Promise((res, rej)=>{
            // check if gitignore file exists, if not create it and check that it includes node_modules
            shell.exec(`git remote add origin ${this.github_repo} && git add . && git commit -m 'initial commit' 
                `, ()=>{
                res(true);
            })
        })
    }
}