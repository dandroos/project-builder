const shell = require("shelljs");
const { purple, white, green, red } = require("./colors");

const installDependencies = options => {
    return new Promise((res, rej) => {
        console.info();
        console.info(purple, "Installing dependencies...");
        const dependencies = options.dependencies.join(" ");
        shell.exec(
            `npm i ${dependencies}`,
            {
                silent: true
            },
            () => {
                console.info(green, "Dependencies installed");
                console.info("");
                res(true);
            }
        );
    });
};

module.exports = installDependencies;
