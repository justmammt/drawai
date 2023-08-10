
module.exports = [{
    name: "getmodels",
    code: `
    
        $createFile[
            $djsEval[
                const fs = require("fs")
                async function getModels() {
            const response = await fetch('http://localhost:9090/api/v1/models/?base_models=sd-1&model_type=main');
            const myJson = await response.json();
            const val = JSON.stringify(myJson, null, 4);
            fs.rm("cache/models.json", { recursive: true }, (err) => {
                if (err) {
                    console.error("No cache stored.");
                    return;
                }
                console.log("File deleted successfully");
            })
            setTimeout(() => {
                fs.writeFile("cache/models.json", val, function (err, result) {
                    if (err) console.log('error', err);
                });
                console.log("File writed successfully")
            }, 1000)
            return val;
        }
        
        
                getModels()
                ;true]
                ;models.json]
    `

}]