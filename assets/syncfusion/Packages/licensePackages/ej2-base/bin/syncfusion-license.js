#! /usr/bin/env node
"use strict";
var fs = global.fs = global.fs || require('fs');
const args = process.argv.slice(2);
const isActivate = (args[0] == 'activate')
const customPath = args[1];
const platform = /JavaScript|ASPNET|ASPNETCORE|ASPNETMVC|FileFormats|essentialstudio/i;
const prefixRegex = /essentialui|pdfviewersdk|documentsdk|spreadsheeteditorsdk|docxeditorsdk/i;
const incorrectPlatform = /JavaScript|ASPNET|ASPNETCORE|ASPNETMVC|FileFormats/i;
const version = '33';
var errorMsg = false;
const envKey = process.env.SYNCFUSION_LICENSE;
const readline = require('readline');
const { exec } = require('child_process');
const value = process.argv.slice(2);
const isValidate = (value[0] === 'validate');
let isMessage = '';
let mostUsedVersion1 = '';
if (isActivate) {
    getLicense();
} else if (isValidate) {
    validatePackageJson();
} else {
    console.log('Supported command: npx syncfusion-license activate || npx syncfusion-license validate');
}
function getLicense(callback) {
    var licKey = '';
    if (fs.existsSync('./syncfusion-license.txt')) {
        licKey = fs.readFileSync('./syncfusion-license.txt', 'UTF8');
    } else if (envKey) {
        licKey = envKey;
    } else if (customPath && fs.existsSync(customPath)) {
        licKey = fs.readFileSync(customPath, 'UTF8');
    }
    if (licKey != '') {
        var licKeySplit = licKey.split(';');
        var pkey = [5439488, 7929856, 5111808, 6488064, 4587520, 7667712, 5439488,
            6881280, 5177344, 7208960, 4194304, 4456448, 6619136, 7733248, 5242880, 7077888,
            6356992, 7602176, 4587520, 7274496, 7471104, 7143424];
        var decryptedStr = [];
        var resultArray = [];
        var encryptedKeys = [];
        for (var i = 0; i < licKeySplit.length; i++) {
            var lKey = licKeySplit[i];
            var decodeStr = getDecryptedData(lKey);
            if (!decodeStr) {
                continue;
            }
            var k = 0;
            var buffr = '';
            for (var j = 0; j < decodeStr.length; j++, k++) {
                if (k === pkey.length) {
                    k = 0;
                }
                var c = decodeStr.charCodeAt(j);
                buffr += String.fromCharCode(c ^ (pkey[k] >> 16));
            }
            decryptedStr = buffr.split(';');
            // checked the length to verify the key in proper structure
            if (decryptedStr.length > 3) {
                var minVersion = parseInt(decryptedStr[1].split('.')[0], 10);
                var lastValue = parseInt(decryptedStr[4], 10);
                resultArray.push({
                    currentPlatform: decryptedStr[0],
                    version: decryptedStr[1],
                    expiryDate: decryptedStr[2],
                    lastValue: lastValue,
                    minVersion: minVersion
                });
                if (resultArray && resultArray.length) {
                    for (const res of resultArray) {
                        if (!platform.test(res.currentPlatform) && !prefixRegex.test(res.currentPlatform)) {
                            errorMsg = true;
                            console.log(`The key entered is for the ${res.currentPlatform} platform. Please enter a valid key.`);
                        }  else if (incorrectPlatform.test(res.currentPlatform) && parseInt(res.version.split('.')[0], 10) > 30) {
                            errorMsg = true;
                            console.log(`The key entered is for the ${res.currentPlatform} ${parseInt(res.version.split('.')[0], 10)}.*.* platform. Please enter a valid key.`);
                        } else {
                            if (((res.minVersion >= res.lastValue) && (res.minVersion != res.lastValue)) || (res.lastValue < version)) {
                                errorMsg = true;
                                console.log(`The key entered is for ${res.version.substring(0, 2)}.*.* version, please enter the key for ${version}.*.* version.`);
                            }
                            else {
                                if (lastValue == null || isNaN(lastValue)) {
                                    errorMsg = true;
                                    console.log('(Error) License key is not valid.');
                                }
                            }
                            if (!isActivate) {
                                if (res.version.substring(0, 2) !== version) {
                                    callback(res.version.substring(0, 2));
                                }
                            }
                        }
                        if (res.expiryDate) {
                            const expDate = new Date(res.expiryDate);
                            const currDate = new Date();
                            if (expDate !== currDate && expDate < currDate) {
                                errorMsg = true;
                                console.log("The included Syncfusion license key has expired.");
                            } else {
                                break;
                            }
                        }
                    }
                }
                if (isValidate && !errorMsg && !isActivate) {
                    if (resultArray[0].version.substring(0, 2) == version) {
                        callback(resultArray[0].version.substring(0, 2));
                    }
                }
                var licData = resultArray[i].currentPlatform + ';' + resultArray[i].version + ';' + resultArray[i].expiryDate + ';'  + ' ;' + resultArray[i].lastValue + ';';
                var encryptedKey = getEncryptedKey(licData);
                encryptedKeys.push(encryptedKey);
                var jsFiles = ['./node_modules/@syncfusion/ej2-base/src/validate-lic.js', './node_modules/@syncfusion/ej2-base/dist/es6/ej2-base.es2015.js', './node_modules/@syncfusion/ej2-base/dist/es6/ej2-base.es5.js', './node_modules/@syncfusion/ej2-base/dist/ej2-base.umd.min.js'];
                for (var n = 0; n < jsFiles.length; n++) {
                    if (fs.existsSync(jsFiles[n])) {
                        var finalEncryptedKey = encryptedKeys.join(';');
                        var content = fs.readFileSync(jsFiles[n], "UTF8");
                        var regex = jsFiles[n] === './node_modules/@syncfusion/ej2-base/dist/ej2-base.umd.min.js' ? /npxKeyReplace[^"]*/ : /npxKeyReplace[^']*/;
                        content = content.replace(regex, 'npxKeyReplace' + finalEncryptedKey);
                        fs.writeFileSync(jsFiles[n], content);
                    }
                }
                if (!errorMsg && !isValidate) {
                    console.log('(INFO) Syncfusion License imported successfully.');
                }
    
            } else {
                console.log('(Error) License key is not valid.');
            }
        }
    } else {
        console.log('Please add the syncfusion-license.txt file or set environment variable SYNCFUSION_LICENSE');
    }
}

function validatePackageJson() {
    var packagejson = fs.readFileSync('./package.json', 'UTF8');
    var packageObj = JSON.parse(packagejson);
    var dependencies = packageObj.dependencies || {};
    var devDependencies = packageObj.devDependencies || {};
    let tildeMissing = false;
    let caretPresent = false;
    let versionCounts = {};
    let wrongVersions = new Set();
    let platformCounts = {};
    let platformName = 'typescript';
    if (dependencies.hasOwnProperty('next') || devDependencies.hasOwnProperty('next')) {
        platformName = 'Next js';
    } else if (dependencies.hasOwnProperty('vite') || devDependencies.hasOwnProperty('vite')) {
        platformName = 'vite';
    }
    let hasAngular = false, hasReact = false, hasVue = false, hasTypeScript = false;
    for (const key of Object.keys(dependencies)) {
        if (key.startsWith('@syncfusion/ej2-angular-')) hasAngular = true;
        else if (key.startsWith('@syncfusion/ej2-react-')) hasReact = true;
        else if (key.startsWith('@syncfusion/ej2-vue-')) hasVue = true;
        else if (key.startsWith('@syncfusion/ej2-')) hasTypeScript = true;
    }
    if (hasAngular) platformName = 'angular';
    else if (hasReact) platformName = 'react';
    else if (hasVue) platformName = 'vue';
    else if (hasTypeScript) platformName = 'typescript';
    const checkVersion = (packageName, version, callback) => {
        exec(`npm view ${packageName}@${version} version`, (error, stdout, stderr) => {
            if (error || stderr) {
                callback(false);
            } else {
                callback(true);
            }
        });
    };
    const getLatestVersion = (packageName, majorVersion, callback) => {
        exec(`npm view ${packageName}@${majorVersion} version`, (error, stdout, stderr) => {
            if (!error && !stderr) {
                const versions = stdout.trim().split('\n').map(v => v.trim().replace(/'/g, ''));
                const latestVersion = versions[versions.length - 1];
                callback(latestVersion);
            }
        });
    };
    const platformSpecificMessage = {
        'angular': 'Please delete the .angular folder in the root directory',
        'react': 'Please delete the .cache folder from the node_modules directory',
        'vue': 'Please delete cache folder from the node_modules directory',
        'vite': 'Please delete the .vite folder in the node_modules directory',
        'Next js': 'Please delete the .next folder in the root directory'
    };
    const additionalMessage = platformSpecificMessage[platformName] || '';
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    // Ask user to update the major version
    const askQuestion = (licenseVersion) => {
        const majorVersions = new Set(Object.values(dependencies).map(version => version.match(/\d+/)[0]));
        const majorVersionOptions = Array.from(majorVersions).join(', ');
        isMessage = `Your package.json contains two major versions. Based on your license key, you should use ${licenseVersion}.*.* version. Would you like me to auto-correct the version in package.json? (Yes/No): `;
        rl.question(isMessage, (answer) => {
            answer = answer.trim().toLowerCase();
            if (answer === 'yes' || answer === 'y') {
                rl.question(`Kindly enter the major version number from the available options ${majorVersionOptions} : `, (versionInput) => {
                    mostUsedVersion1 = versionInput.trim();
                    updateMajorVersions(mostUsedVersion1, (hasUpdates) => {
                        if (hasUpdates) {
                            fs.writeFileSync('./package.json', JSON.stringify(packageObj, null, 2));
                            console.log(`The package.json file has been successfully updated. ${additionalMessage} remove the @syncfusion folder from node_modules and delete the package-lock.json from the root directory. Then, reinstall the packages. Also, ensure that you are using a valid license key.`);
                        } else {
                            fs.writeFileSync('./package.json', JSON.stringify(packageObj, null, 2));
                            console.log(`The package.json file has been updated. ${additionalMessage} remove the @syncfusion folder from node_modules and delete the package-lock.json from the root directory. Then, reinstall the packages. Also, ensure that you are using a valid license key`);
                        }
                        rl.close();
                    });
                });
            } else {
                console.log(`Your package.json contains two major versions. Based on your license key, you should use ${licenseVersion}.*.* version.`);
                console.log('\nHere is the correct format for dependencies:\n');
                for (const [key, version] of Object.entries(dependencies)) {
                    if (key.startsWith('@syncfusion')) {
                        const correctVersion = `~${licenseVersion}.*.*`;
                        console.log(`"${key}": "${correctVersion}",`);
                    }
                }
                console.log(`After making this changes. ${additionalMessage} remove the @syncfusion folder from node_modules and delete the package-lock.json from the root directory. Then, reinstall the packages and ensure that you are using a valid license key`);
                rl.close();
            }
        });
    };
    // Ask user to update the minor version
   const askMinorVersionUpdate = () => {
        isMessage = `Your packages have an incorrect minor version. Would you like me to update them to the latest version? Please enter yes or no: `;
        rl.question(isMessage, (answer) => {
            answer = answer.trim().toLowerCase();
            if (answer === 'yes' || answer === 'y') {
                updateToLatestVersions();
            } else {
                console.log('Ensure that all packages in the dependencies follow the correct minor version.');
                console.log('Here is the correct format for dependencies:\n');
                for (const [key, version] of Object.entries(dependencies)) {
                    if (key.startsWith('@syncfusion')) {
                        const majorVersion = version.match(/\d+/)[0];
                        getLatestVersion(key, majorVersion, (latestVersion) => {
                            const correctVersion = `~${latestVersion.match(/\d+\.\d+\.\d+/)[0]}`;
                            console.log(`"${key}": "${correctVersion}",`);
                        });
                    }
                }
                rl.close();
            }
        });
    };
    // Ask user to update the caret symbol
    const askCaretUpdate = () => {
        isMessage = `It looks like your Syncfusion component packages use the caret (^) symbol. To avoid unexpected behavior and compatibility issues, would you like me to replace it with the tilde (~) symbol? Please enter "yes" or "no": `;
        rl.question(isMessage, (answer) => {
            answer = answer.trim().toLowerCase();
            if (answer === 'yes' || answer === 'y') {
                for (const [key, version] of Object.entries(dependencies)) {
                    if (key.startsWith('@syncfusion') && version.startsWith('^')) {
                        packageObj.dependencies[key] = '~' + version.slice(1);
                    }
                }
                fs.writeFileSync('./package.json', JSON.stringify(packageObj, null, 2));
                console.log(`The package.json file has been updated with the tilde (~) symbol. ${additionalMessage} remove the @syncfusion folder from node_modules and delete the package-lock.json from the root directory. Then, reinstall the packages.`);
                rl.close();
            } else {
                if (caretPresent) {
                    console.log('Ensure that all packages in the dependencies use the tilde (~) symbol. Note: Avoid using both the tilde (~) and caret (^) symbols together in your dependencies');
                    console.log('Here is the correct format for dependencies:\n');
                    for (const [key, version] of Object.entries(dependencies)) {
                        if (key.startsWith('@syncfusion')) {
                            console.log(`"${key}": "~${version.match(/\d+\.\d+\.\d+/)[0]}",`);
                        }
                    }
                    console.log(`\nThe package.json file has been updated with the tilde (~) symbol. ${additionalMessage} remove the @syncfusion folder from node_modules and delete the package-lock.json from the root directory. Then, reinstall the packages.`);
                }
                rl.close();
            }
        });
    };
    // Ask user to remove TypeScript packages
    const askRemoveTypescriptPackages = () => {
        isMessage = `Your dependencies contain both TypeScript and ${platformName.charAt(0).toUpperCase() + platformName.slice(1)} packages. Would you like me to remove the TypeScript packages? Please enter yes or no: `;
        rl.question(isMessage, (answer) => {
            answer = answer.trim().toLowerCase();
            if (answer === 'yes' || answer === 'y') {
                for (const key of Object.keys(dependencies)) {
                    if (key.startsWith('@syncfusion/ej2-') && !key.includes('-angular') && !key.includes('-react') && !key.includes('-vue')) {
                        delete dependencies[key];
                    }
                }
                fs.writeFileSync('./package.json', JSON.stringify(packageObj, null, 2));
                console.log(`TypeScript packages have been removed successfully. ${additionalMessage} remove the @syncfusion folder from node_modules and delete the package-lock.json from the root directory.`);
            }
            else {
                console.log(`Your dependencies contain both TypeScript and ${platformName} packages. Mixing platform packages in package.json is not recommended.`);
                console.log('Here is the correct format for dependencies:\n');
                for (const [key, version] of Object.entries(dependencies)) {
                    if (key.includes('-angular') || key.includes('-react') || key.includes('-vue')) {
                        console.log(`"${key}": "${version}",`);
                    }
                }
                console.log(`After making this changes. ${additionalMessage} remove the @syncfusion folder from node_modules and delete the package-lock.json from the root directory. Then, reinstall the packages and ensure that you are using a valid license key`);
            }
            rl.close();
        });
    };
   if ((hasAngular || hasReact || hasVue) && hasTypeScript) {
        askRemoveTypescriptPackages();
    }
    // Ask user to add tilde symbol
    const askTildeUpdate = () => {
        isMessage = `It looks like the tilde (~) symbol is missing in your packages for our Syncfusion components. Would you like me to add it? Please enter "yes" or "no": `;
        rl.question(isMessage, (answer) => {
            answer = answer.trim().toLowerCase();
            if (answer === 'yes' || answer === 'y') {
                for (const [key, version] of Object.entries(dependencies)) {
                    if (key.startsWith('@syncfusion') && !version.startsWith('~')) {
                        packageObj.dependencies[key] = '~' + version;
                    }
                }
                fs.writeFileSync('./package.json', JSON.stringify(packageObj, null, 2));
                console.log(`The package.json file has been updated with the tilde (~) symbol. ${additionalMessage} remove the @syncfusion folder from node_modules and delete the package-lock.json from the root directory. Then, reinstall the packages.`);
                rl.close();
            } else {
                if (tildeMissing) {
                    console.log('Please make sure that all packages in the dependencies use the tilde (~) symbol.\nNote: You should not use both the tilde (~) and caret (^) symbols together in your dependencies.');
                    console.log('Here is the correct format for dependencies:\n');
                    for (const [key, version] of Object.entries(dependencies)) {
                        if (key.startsWith('@syncfusion')) {
                            console.log(`"${key}": "~${version.match(/\d+\.\d+\.\d+/)[0]}",`);
                        }
                    }
                    console.log(`After making this changes. ${additionalMessage} remove the @syncfusion folder from node_modules and delete the package-lock.json from the root directory. Then, reinstall the packages and ensure that you are using a valid license key`);
                }
                rl.close();
            }
        });
    };
    // Ask user to update mixed symbols
   const askMixedSymbolUpdate = () => {
        isMessage = ` Your dependencies currently contains both tilde and caret (^) symbols. To ensure stability and prevent compatibility issues, would you like me to replace all caret (^) symbols with tilde ()? Please enter "yes" or "no": `;
        rl.question(isMessage, (answer) => {
            answer = answer.trim().toLowerCase();
            if (answer === 'yes' || answer === 'y') {
                for (const [key, version] of Object.entries(dependencies)) {
                    if (key.startsWith('@syncfusion') && (version.startsWith('^') || !version.startsWith('~'))) {
                        packageObj.dependencies[key] = '~' + version.slice(1);
                    }
                }
                fs.writeFileSync('./package.json', JSON.stringify(packageObj, null, 2));
                console.log(`The package.json file has been updated with the tilde (~) symbol. ${additionalMessage} remove the @syncfusion folder from node_modules and delete the package-lock.json from the root directory. Then, reinstall the packages.`);
                rl.close();
            } else {
                if (caretPresent) {
                    console.log('Please make sure that all packages in the dependencies use the tilde (~) symbol.\nNote: You should not use both the tilde (~) and caret (^) symbols together in your dependencies.');
                    console.log('Here is the correct format for dependencies:\n');
                    for (const [key, version] of Object.entries(dependencies)) {
                        if (key.startsWith('@syncfusion')) {
                            console.log(`"${key}": "~${version.match(/\d+\.\d+\.\d+/)[0]}",`);
                        }
                    }
               }
                rl.close();
            }
        });
    };
    // Update all packages to the latest version
   const updateToLatestVersions = () => {
        let pendingUpdates = 0;
        for (const [key, version] of Object.entries(dependencies)) {
            if (key.startsWith('@syncfusion')) {
                pendingUpdates++;
                const majorVersion = version.match(/\d+/)[0];
                getLatestVersion(key, majorVersion, (latestVersion) => {
                    const newVersion = latestVersion.match(/\d+\.\d+\.\d+/)[0];
                    packageObj.dependencies[key] = '~' + newVersion;
                    pendingUpdates--;
                    if (pendingUpdates === 0) {
                        fs.writeFileSync('./package.json', JSON.stringify(packageObj, null, 2));
                        console.log(`The package.json file has been updated to the latest versions. ${additionalMessage} remove the @syncfusion folder from node_modules and delete the package-lock.json from the root directory. Then, reinstall the packages.`);
                        rl.close();
                    }
                });
            }
        }
    };
    // Update all packages to the latest major version
   const updateMajorVersions = (mostUsedVersion1, callback) => {
        let pendingUpdates = 0;
        let hasUpdates = false;
       for (const [key, version] of Object.entries(dependencies)) {
            if (key.startsWith('@syncfusion')) {
                const majorVersion = version.match(/\d+/)[0];
                if (majorVersion !== mostUsedVersion1) {
                    pendingUpdates++;
                    getLatestVersion(key, mostUsedVersion1, (latestVersion) => {
                        const newVersion = latestVersion.match(/\d+\.\d+\.\d+/)[0];
                        packageObj.dependencies[key] = '~' + newVersion;
                        hasUpdates = true;
                        pendingUpdates--;
                        if (pendingUpdates === 0) {
                            callback(hasUpdates);
                        }
                    });
                }
            }
        }
      if (pendingUpdates === 0) {
            callback(hasUpdates);
        }
    };
    // Verify all versions
    const verifyVersions = (callback) => {
        let pendingChecks = 0;
        let hasUpdates = false;
       for (const [key, version] of Object.entries(dependencies)) {
            if (key.startsWith('@syncfusion')) {
                pendingChecks++;
                checkVersion(key, version, (isValid) => {
                    if (!isValid) {
                        hasUpdates = true;
                    }
                    pendingChecks--;
                    if (pendingChecks === 0) {
                        callback(hasUpdates);
                    }
                });
            }
        }
      if (pendingChecks === 0) {
            callback(hasUpdates);
        }
    };
       // Initial check for errors
    for (const [key, version] of Object.entries(dependencies)) {
        if (key.startsWith('@syncfusion')) {
          if (version.startsWith('^')) caretPresent = true;
            else {
                if (!version.startsWith('~')) tildeMissing = true;
            }
            const majorMinorVersion = version.match(/\d+\.\d+/)[0];
            versionCounts[majorMinorVersion] = (versionCounts[majorMinorVersion] || 0) + 1;
            if (majorMinorVersion !== Object.keys(versionCounts)[0]) {
                wrongVersions.add(majorMinorVersion);
            }

            if (platformName !== 'Next js' && platformName !== 'vite') {
                const platformMatch = key.match(/ej2-(\w+)-/);
                platformName = platformMatch ? platformMatch[1] : 'typescript';
                platformCounts[platformName] = (platformCounts[platformName] || 0) + 1;
            }
        }
    }
   if (platformName !== 'Next js' && platformName !== 'vite') {
        platformName = Object.keys(platformCounts).reduce((a, b) => platformCounts[a] > platformCounts[b] ? a : b);
    }
   // Check if all versions are using the same major version
    const majorVersions = new Set(Object.values(dependencies).map(version => version.match(/\d+/)[0]));
    if (majorVersions.size === 1) {
        // Check for incorrect minor versions
        verifyVersions((hasUpdates) => {
            if (hasUpdates) {
                askMinorVersionUpdate();
            } else if (tildeMissing && caretPresent) {
                askMixedSymbolUpdate();
            } else if (caretPresent) {
                askCaretUpdate();
            } else if (tildeMissing) {
                askTildeUpdate();
            } else {
                console.log('No issues found in package.json.');
            }
        });
    } else {
        const hasErrors = tildeMissing || caretPresent || wrongVersions.size > 0;
       if (hasErrors) {
            getLicense((licenseVersion) => {
                if (licenseVersion) {
                    askQuestion(licenseVersion);
                } else {
                    console.log('Failed to retrieve the license version.');
                }
            });
        } else {
            verifyVersions((hasUpdates) => {
                if (hasUpdates) {
                    fs.writeFileSync('./package.json', JSON.stringify(packageObj, null, 2));
                    console.log(`The package.json file has been updated with correct versions. ${additionalMessage} remove the @syncfusion folder from node_modules and delete the package-lock.json from the root directory. Then, reinstall the packages.`);
                } else {
                    console.log('No issues found in package.json.');
                }
            });
        }
    }
}

function getEncryptedKey(uniKey) {
    const crypto = typeof window === 'undefined' ? require('crypto') : window.crypto;
    var resKey = '';
    var uniVal = [];
    var alpVal = [];
    var encString = new Array();
    for (var a = 0; a < uniKey.length; a++) {
        uniVal[a] = uniKey[a].charCodeAt(0);
    }
    for (var b = 0, m = 65; b < 26; b++, m++) {
        alpVal[b] = String.fromCharCode(m);
    }
    // Use crypto.getRandomValues in browser, crypto.randomBytes in Node.js
    let pos;
    try {
        if (typeof crypto.getRandomValues === 'function') {
            // Browser or Node.js 15.7.0+
            const array = new Uint8Array(1);
            crypto.getRandomValues(array);
            pos = array[0] % 26;
        } else {
            // Node.js (all versions)
            const buffer = crypto.randomBytes(1);
            pos = buffer[0] % 26;
        }
    } catch (error) {
        console.error('(Error) Failed to generate random index:', error.message);
        return ''; // Return empty string to indicate failure
    }
    var uniAlpVal = alpVal[pos].charCodeAt(0);
    for (var c = 0; c < uniKey.length; c++) {
        encString[c] = parseInt(uniVal[c]) + parseInt(alpVal[pos].charCodeAt(0));
    }
    encString[uniVal.length] = uniAlpVal;
    for (var d = 0; d < encString.length; d++) {
        resKey += String.fromCharCode(encString[d]);
    }
    return Buffer.from(resKey, 'ascii').toString('base64');
}

function getDecryptedData(key) {
    try {
        return Buffer.from(key, 'base64').toString('binary');
    }
    catch (error) {
        return '';
    }
};
