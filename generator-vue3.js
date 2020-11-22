/**
 *@param
 * Created by darkmoon on 2020/11/21.
 */
const fs = require("fs");
const shell = require("shelljs");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");
const Rx = require("rxjs")
let template = [];
const log = console.log;
let pagePath = "./src/page/";
let componentPath = "./src/components/";
//todo 接受参数定义生成路径 接受模板
template[0] = `<template>
</template>
<script lang="ts" src="./{{ name }}.ts"></script>
<style scoped  src="./{{ name }}.scss"></style>
`
;
template[1] = `
import { defineComponent } from 'vue'
export default defineComponent ({
     name: "{{ name }}",
     data() {
        return {
        }
     },
     methods: {}
})`;
template[2] = ``;
module.exports = (configs) => {
	const name = configs.name;
	log(' [-] configs', configs)
	if (!name) {
		shell.echo("Sorry, this file requires a filename");
		shell.exit(1);
	}
	let filePath;
	if (configs.type === "page") {
		filePath = `${pagePath}${name}`;
	} else {
		filePath = `${componentPath}${name}`;
	}
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

	let templatePath = [];
	templatePath[0] = `${filePath}/${name}.vue`;
	templatePath[1] = `${filePath}/${name}.ts`;
	templatePath[2] = `${filePath}/${name}.scss`;
	//TODO 判断是否存在 覆盖
	for (let i = 0; i < templatePath.length; i++) {
		try {
			fs.writeFileSync(templatePath[i], template[i]);
			log(' [-] replace this file name in the file')
			shell.sed("-i", "{{ name }}", configs.name, templatePath[i]);
		} catch (err) {
			log(chalk.red(err));
		}
	}

};
