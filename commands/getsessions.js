


module.exports = [{
    name: "getsessions",
    code: `
    
        $createFile[
            $djsEval[
                const fs = require("fs")
                async function getSessions() {
            const response = await fetch('http://localhost:9090/api/v1/sessions/?page=0&per_page=10');
            const myJson = await response.json();
            const val = JSON.stringify(myJson, null, 4);
            fs.rm("cache/sessions.json", { recursive: true }, (err) => {
                if (err) {
                    console.error("No cache stored.");
                    return;
                }
                console.log("File deleted successfully");
            })
            setTimeout(() => {
                fs.writeFile("cache/sessions.json", val, function (err, result) {
                    if (err) console.log('error', err);
                });
                console.log("File writed successfully")
            }, 1000)
            return val;
        }
        
        
                getSessions()
                ;true]
                ;sessions.json]
    `

}]