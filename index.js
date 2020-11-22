#!/usr/bin/env node
const inquirer = require("inquirer");
const generator = require("./generator-vue3");


var questions = [
	{
		type: "input",
		name: "name",
		message: "What's your file name?",
		validate: function (value) {
			if (value) {
				return true;
			}
			return "Please enter a valid name";
		},
	},
	{
		type: "list",
		message: "choice page or components ?",
		name: "type",
		choices:[
			"component",
			"page"
			],
		default:"component",

	},
];

inquirer.prompt(questions).then((configs) => {
	generator(configs);
});
