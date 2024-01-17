const fs = require("fs");

async function uploadDocs(file, folderName) {
  return await new Promise((resolve, reject) => {
    let d = `uploads/${file.name.toString()}`;
    const fileAccessURL = process.env.fileAccessURL;

    fs.writeFile(d, file.data, "binary", async function () {
      console.log(`${fileAccessURL}${d}`)
      resolve(`${fileAccessURL}${d}`);
    });
  });
}

module.exports = {
  uploadDocs
};
