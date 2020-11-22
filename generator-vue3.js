/**
 *@param
 * Created by darkmoon on 2020/11/21.
 */
const fs = require("fs");
const shell = require("shelljs");
const  path = require("path");
const  inquirer = require("inquirer");
let template = [];
 template[0]=`
<template>


</template>
<script lang="ts" src="./{{ name }}"></script>
<style scoped  src="./{{ name }}"></style>
`
;
 template[1]=`
import { defineComponent } from 'vue'
export default defineComponent ({
     name: "{{ name }}",
     data() {
        return {
        }
     },
     methods: {}
})`;
template[2]=``;
module.exports = (configs) => {
	const name = configs.name;
	console.log('[-] configs',configs)
	if (!name) {
		shell.echo("Sorry, this file requires a filename");
		shell.exit(1);
	}
	console.log('__dirname',__dirname)
	let filePath;
	if (configs.type) {
		 filePath=`./src/views/${name}` ;
	} else {
		 filePath=`./src/components/${name}`;
	}
	//是否存在主目录
	try{
		fs.accessSync(filePath,fs.constants.F_OK)
	}catch (err){
		console.log(' [-] filePath no exist');
		console.log(' [-] create file dir');
		if (err){
			fs.mkdirSync(filePath,{ recursive: true },(err)=>{
				console.log(err);
				shell.exit(1);
			});
		}
	}

	let templatePath = [];
	templatePath[0] = `${filePath}/${name}.vue`;
	templatePath[1] = `${filePath}/${name}.ts`;
	templatePath[2] = `${filePath}/${name}.scss`;
	for (let i = 0; i < templatePath.length; i++) {
		try{
			fs.accessSync(templatePath[i],fs.constants.F_OK)
		}catch (err){
			if (err) {
				fs.writeFileSync(templatePath[i], template[i]);
			}else {
				inquirer.prompt([{
					type: "confirm",
					message: "overwritten?  yes/no",
					name: "over",
					default:true,
				}],(config)=>{
					if (config.over) {
						fs.writeFileSync(templatePath[i], template[i]);
					}
				})
			}
		}
	}
	shell.sed("-i", "{{ name }}",configs.name, templatePath[0]);
	shell.sed("-i", "{{ name }}", configs.name, templatePath[1]);


};

