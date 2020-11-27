#!/usr/bin/env node
const inquirer = require("inquirer");
const shell = require("shelljs");
const generator = require("./generator-vue3");
const commander = require("commander");

//命令行接受参数
commander
	.version('0.1.7','-v, --version')
	// .option('-n, --name <items>', 'folder name')
	.option('-f, --folder <items>', 'folder name')
	.option('-p, --path <items>', 'folder path')
	.option('-t, --type <items>', 'folder type(page or component)',)
	.parse(process.argv);
if (commander.type && (commander.type !== 'page' || commander.type === 'component')) {
	console.error('Please enter a current type!!!', commander.type);
	shell.exit(1);
}
console.log(commander.folder);
var questions = [
	{//文件夹名称
		type: "input",
		name: "name",
		message: "What's your file name?",
		validate: function (value) {
			if (value) {
				return true;
			}
			return "Please enter a valid name";
		},
		when: () => {
			return !commander.folder;
		}
	},
	{//文件类型
		type: "list",
		message: "choice page or components ?",
		name: "type",
		choices: [
			"component",
			"page",
			"freedom"
		],
		default: "component",
		when: () => {
			return !commander.type
		}

	},
	{//目标文件路径
		type: "input",
		message: "enter the destination folder path (relative path)",
		name: "path",
		when: (res) => {
			return res.type === "freedom";
		}
	},
	// {
	// 	type: "list",
	// 	message: " ",
	// 	name: "name_type",
	// 	choices: [
	// 		"default",
	// 		"file_name",
	// 	],
	// 	default: "default",
	// 	when: (res) => {
	// 		return (res.type === "freedom");
	// 	}
	//
	// }
];

inquirer.prompt(questions).then((configs) => {
	//命令行接受文件名称
	if (commander.folder) {
		configs.name = commander.folder;
	}
	//命令行接受类型
	if (commander.type) {
		configs.type = commander.type;
	}
	//命令行接受参数
	if (commander.path) {
		configs.path = commander.path;
	}
	generator(configs);
});
