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
		type: "confirm",
		message: "page or components y=page ?",
		name: "type",
		default:true,

	},
];

inquirer.prompt(questions).then((configs) => {
	generator(configs);
});
