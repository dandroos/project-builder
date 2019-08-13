const shell = require("shelljs");
const { purple, white, green, red } = require("./colors");

const launchEditor = () =>{
    return new Promise((res, rej) => {
        console.info(purple, "Launching Visual Studio Code...");
        shell.exec("code .", () => {
            res(true);
        });
    });
}

module.exports = launchEditor;