const shell = require("shelljs");
const fs = require("fs");
const { purple, white, green, red } = require("./colors");

const attachGitHubRepo = options => {
    return new Promise((res, rej) => {
        if (fs.existsSync(".gitignore")) {
            fs.readFileSync(".gitignore", (err, data) => {
                if (!data.includes("node_modules/")) {
                    fs.appendFile(".gitignore", "\n node_modules/", err => {
                        if (err) rej(err);
                        console.info(
                            green,
                            "node_modules/ added to .gitignore"
                        );
                    });
                } else {
                    console.info(
                        white,
                        ".gitignore file alreadys exists and contains node_modules/"
                    );
                }
            });
        } else {
            fs.writeFile(".gitignore", "node_modules/", err => {
                if (err) throw err;
                console.info(
                    green,
                    "new .gitignore file created and node_modules/ added"
                );
            });
        }

        shell.exec(
            `git remote add origin ${
                options.github_repo
            } && git add . && git commit -m 'initial commit' 
            `,
            {
                silent: true
            },
            () => {
                res(true);
            }
        );
    });
};

module.exports = attachGitHubRepo;
