/**
 *@param
 * Created by darkmoon on 2020/11/21.
 */
const fs = require("fs");
const shell = require("shelljs");
const path = require("path");
const chalk = require("chalk");
const log = console.log;
const template = require('./template');

//todo  接受模板
const list = ['vue', 'ts', 'scss', 'router'];
let pagePath = path.join('./', "src/views/");
let componentPath = path.join('./', 'src/components/');
module.exports = (configs) => {

	const name = configs.name;
	const fileType = configs.type || "component";
	let realPath;
	if (configs.path && configs.path.search(/\/$/) <= -1) {
		configs.path += '/';
	}
	if (configs.path) {
		realPath = path.join('./', configs.path);
	}else {
		switch (fileType) {
			case "page":
				realPath = pagePath;
				break;
			case "component":
				realPath = componentPath;
				break;
			case "freedom":
				realPath = path.join('./', configs.path);
				break;
			default:
				realPath = pagePath;
		}
	}

	log(' [-] configs', configs)
	if (!name) {
		shell.echo("Sorry, this file requires a filename");
		shell.exit(1);
	}
	let	filePath = `${realPath}${name}`;
	//是否存在主目录
	try {
		fs.accessSync(filePath, fs.constants.F_OK)
	} catch (err) {
		log(chalk.yellow(' [-] filePath no exist'));
		log(chalk.blue(' [-] create file dir'));
		if (err) {
			fs.mkdirSync(filePath, {recursive: true}, (err) => {
				log(chalk.red(err));
				shell.exit(1);
			});
		}
	}

	let templatePath = {};
	for (let i = 0; i < list.length; i++) {
		let pix = list[i];
		if (list[i] === 'router') {
			pix = 'ts'
		}
		templatePath[list[i]] = `${filePath}/${template.name[list[i]]}.${pix}`;
	}
	//TODO 判断是否存在 覆盖
	for (let i = 0; i < list.length; i++) {
		// log(chalk.red(' [-] '+templatePath[list[i]]));
		if (!(fileType === 'component' && list[i] === 'router')) {
			try {
				fs.writeFileSync(templatePath[list[i]], template[fileType][list[i]]);
				log(' [-] replace this file name in the file')
				shell.sed("-i", "{{ name }}", configs.name, templatePath[list[i]]);
			} catch (err) {
				log(chalk.red(err));
			}
		}
	}

};
