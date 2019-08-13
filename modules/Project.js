const shell = require("shelljs");

const _init = require("./init");
const _installDependencies = require("./install_dependencies");
const _attachGitHubRepo = require("./attachGitHubRepo");
const _startDevServer = require("./startDevServer");
const _launchEditor = require("./launchEditor");

const { purple, white, green, red } = require("./colors");

class Project {
    constructor(options) {
        this.name = options.name;
        this.type = options.type;
        this.dependencies = options.dependencies;
        this.github_repo = options.github_repo;
    }

    init() {
        return _init(this);
    }

    installDependencies() {
        return _installDependencies(this);
    }

    attachGitHubRepo() {
        return _attachGitHubRepo(this);
    }

    startDevServer() {
        return _startDevServer(this);
    }

    launchEditor() {
        return _launchEditor();
    }
}

module.exports = Project;
