import fs from 'fs';
import path from 'path';

const rootPath = path.resolve(__dirname, '../');
const sitesPath = path.resolve(rootPath, 'sites');
const utilsPath = path.resolve(rootPath, 'utils');

// enumerate top level folders in sites directory
const sites = fs.readdirSync(sitesPath).filter((file: any) => {
    return fs.statSync(path.join(sitesPath, file)).isDirectory();
});

export const constants = {
    rootPath,
    sitesPath,
    utilsPath,
    sites
};