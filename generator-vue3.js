/**
 *@param
 * Created by darkmoon on 2020/11/21.
 */
const fs = require("fs");
const shell = require("shelljs");
const  path = require("path");
const templateVue=`
<template>


</template>
<script lang="ts" src="./{{ name }}"></script>
<style scoped  src="./{{ name }}"></style>
`
;
const templateTs=`
import { defineComponent } from 'vue'
export default defineComponent ({
     name: "{{ name }}",
     data() {
        return {
        }
     },
     methods: {}
})`;
const templateScss=``;
module.exports = (configs) => {
	const name = configs.name;

	if (!name) {
		shell.echo("Sorry, this script requires a filename");
		shell.exit(1);
	}
	console.log('__dirname',__dirname)
	let filePath;
	if (configs.type) {
		 filePath=`./src/views/${name}` ;
	} else {
		 filePath=`./src/components/${name}`;
	}
	const fileVue = `${filePath}/${name}.vue`;
	const fileTs = `${filePath}/${name}.ts`;
	const fileScss = `${filePath}/${name}.scss`;
	createDir(filePath);
	if (true) {
		console.log('is');
		fs.writeFileSync(`${fileVue}`, templateVue);
		fs.writeFileSync(`${fileTs}`, templateTs);
		fs.writeFileSync(`${fileScss}`, templateScss);
		shell.sed("-i", "{{ name }}",configs.name, fileVue);
		shell.sed("-i", "{{ name }}", configs.name, fileTs);
	}



};
function createDir(path){
	fs.opendir(path,(err)=>{
		if (err){
			fs.mkdir(path,(err)=>{
				console.log(err);
			})
		}
	})
}
