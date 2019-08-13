const shell = require("shelljs");
const { purple, white, green, red } = require("./colors");

const startDevServer = options => {
    return new Promise((res, rej) => {
        console.info();
        console.info(purple, "Starting a development server...");
        switch (options.type) {
            case "django":
                shell.exec(
                    "python3 manage.py migrate",
                    {
                        silent: true
                    },
                    () => {
                        shell.exec("python3 manage.py runserver");
                        res(true);
                    }
                );
                break;
            case "gatsby":
                shell.exec(`gatsby develop -H 0.0.0.0`);
                res(true);
            case "html":
                console.info(
                    white,
                    "Please launch a live server in Visual Studio Code instead."
                );
                res(true);
                break;
            case "react":
                shell.exec(`npm start`);
                res(true);
                break;
            case "node_cli":
                console.info(green, 'No development server required.')
                // TODO: add Nodemon as a kind-of dev server
                break;
            default:
                rej("There was an error starting the development server");
        }
    });
};

module.exports = startDevServer;
