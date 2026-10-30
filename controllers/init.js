
const fs= require('fs').promises;
const path=require("path");
const { json } = require("stream/consumers");



async function initRepo() {
 const repoPath=path.resolve(process.cwd(),".apnaGit");
 const commitsPath=path.join(repoPath,"commits");

 try{
await fs.mkdir(repoPath,{recursive:true});
await fs.mkdir(commitsPath,{recursive:true});
await fs.writeFile(
  path.join(repoPath,"config.json"),
  JSON.stringify({bucket:"S3 Bucket"})
);
console.log("Repository Initialised!");

 }catch(err){
  console.log("Error initialising repository",err);
 }
}

module.exports = { initRepo };
