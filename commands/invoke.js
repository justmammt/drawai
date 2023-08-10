
module.exports = [{
    name: "invoke",
    aliases: ["dream"],
    code: `
        $djsEval[
            fetch("https://jsonplaceholder.typicode.com/todos", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ userId: 1, title: "Fix the bugs", completed: false })
          });
        ]
        
    `

}]