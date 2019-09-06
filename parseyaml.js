const fs = require('fs');
const { yamlParse, yamlDump } = require('yaml-cfn');
const argv = require('yargs').argv

const input = fs.readFileSync('saml-pre.yaml', 'utf8');

const parsed = yamlParse(input);

for (var key in argv.param) {
    if (parsed.Mappings === undefined) {
        parsed.Mappings = {};
    }
    if (parsed.Mappings.Constants === undefined) {
        parsed.Mappings.Constants = {};
    }
    if (parsed.Mappings.Constants.InstanceValues === undefined) {
        parsed.Mappings.Constants.InstanceValues = {};
    }
    parsed.Mappings.Constants.InstanceValues[key] = argv.param[key];
}

fs.writeFileSync('saml.yaml', yamlDump(parsed));


