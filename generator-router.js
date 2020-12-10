#!/usr/bin/env node
/**
 *@param
 * Created by darkmoon on 2020/11/21.
 */
let fs = require('fs');
let path = require('path');
let chalk = require('chalk');
let pagePath = path.join('./', 'src/views');
let routerFileName = 'router.ts';
let imports = ['import { RouteRecordRaw } from \'vue-router\';'];
let routesNames = [];
let log = console.log;
pagePath = path.resolve(pagePath)
getRoutes(pagePath);
let fileString = imports.join('\n');
fileString += '\n\n'
fileString += 'const routes: Array<RouteRecordRaw> = [];'
fileString += '\nexport default routes.concat(\n  ';
fileString += routesNames.join(',\n  ');
fileString += ',\n);\n';
fs.writeFileSync('./src/Routers.ts', fileString);

function getRoutes(filePath, fileName, modulesName) {
	if (!modulesName) {
		modulesName = fileName;
	}else {
		modulesName += fileName;
	}

	let stat = fs.statSync(filePath);
	let isDir = stat.isDirectory();
	if (isDir) {
		let files = fs.readdirSync(filePath)
		if (files && files.length) {
			files.forEach(function (fn, index) {
				let fp = path.join(filePath, fn);
				getRoutes(fp, fn, modulesName);
			});
		}
	} else {
		if (fileName === routerFileName) {
			let pathName = filePath.replace(pagePath, '');
			let routesPath = './views' + pathName.replace('.ts', '');

			if (process.platform.indexOf('win') >= 0) {
				routesPath = routesPath.replace(/\\/g, "\/");
			}

			pathName = pathName.replace('.ts', '');
			pathName = pathName.split('/');
			let pName = '';
			pathName.forEach(function (p) {
				if (p) {
					let ps = p.split('-');
					ps.forEach(function (v) {
						pName += v.replace(/(\w)/, function (v) {
							return v.toUpperCase()
						});
					});
				}
			});
			log(chalk.blue(' [-] router path ',routesPath));
			modulesName = 'modules' + (modulesName + '').replace(/-/g, '_').replace(/router.ts/,'');
			routesNames.push(modulesName);
			imports.push(`import ${modulesName} from '${routesPath}';`)
		}
	}
}

