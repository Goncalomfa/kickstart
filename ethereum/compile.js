//compile one time, write the output to a new file and then access the compile version
const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

//delete build folder if exist
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath); //remove the folder and it's content

//read Campaign.sol from the contract folder
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath,'utf8');

//compile everything we have from that file
const output = solc.compile(source,1).contracts; //we don't care about any other property but the contracts

//create build directory
fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':','') + '.json'),
    output[contract]
  );
}
