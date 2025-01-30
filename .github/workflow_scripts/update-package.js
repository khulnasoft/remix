const fs = require("fs");
const path = require("path");

module.exports = async ({ github, context }, versionPostfix) => {
  const packagesDir = path.join(__dirname, "..", "..", "packages");
  const devPackageJSONPath = path.join(
    packagesDir,
    "remix-dev",
    "package.json"
  );
  const khulnasoftPackageJSONPath = path.join(
    packagesDir,
    "khulnasoft-remix",
    "package.json"
  );

  const devPackageJSON = JSON.parse(
    fs.readFileSync(devPackageJSONPath, "utf-8")
  );

  devPackageJSON.name = "@khulnasoft/remix-run-dev";

  if (versionPostfix !== "") {
    if (!/[a-z]+\.\d+/.test(versionPostfix)) {
      throw new Error(
        `version-postfix, '${versionPostfix}', is invalid. Must be a word and a number seperated by a '.' character. Example: 'patch.1'`
      );
    }
    devPackageJSON.version = `${devPackageJSON.version}-${versionPostfix}`;

    const khulnasoftPackageJSON = JSON.parse(
      fs.readFileSync(khulnasoftPackageJSONPath, "utf-8")
    );
    khulnasoftPackageJSON.version = `${khulnasoftPackageJSON.version}-${versionPostfix}`;
    fs.writeFileSync(
      khulnasoftPackageJSONPath,
      JSON.stringify(khulnasoftPackageJSON, null, 2) + "\n"
    );
  }

  fs.writeFileSync(
    devPackageJSONPath,
    JSON.stringify(devPackageJSON, null, 2) + "\n"
  );

  return devPackageJSON.version;
};
