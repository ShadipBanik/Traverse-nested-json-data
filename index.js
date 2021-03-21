const fs = require('fs');
const objectData= require('./data.json')
const jsonObject=objectData;
const refrenceObjects=[];
const referencePaths=[];
const stt=/\$ref/i;

function process(key,value) {
    if(key.match(stt)){
     let paths=key+':'+value
     let bits = paths.split("/");
     let lastOne = bits[bits.length-1];
     let objs=jsonObject.definitions[lastOne];
     refrenceObjects.push(objs);
     referencePaths.push(paths);
     
   }
}
 function traverse(o,func) {
     for (i in o) {
         func.apply(this,[i,o[i]]);    
        if (typeof(o[i])=="object") {
            traverse(o[i],func);
        }
   }
 }

 traverse(jsonObject,process);
 
//output of reference paths store in path.json file
fs.writeFileSync('paths.json','')
fs.writeFileSync('paths.json',JSON.stringify(referencePaths, null, '\t'));
//output of reference objects store in objects.json file
fs.writeFileSync('objects.json','')
fs.writeFileSync('objects.json',JSON.stringify(refrenceObjects, null, '\t'));

console.log("please see the result in path.json and object.json file");
