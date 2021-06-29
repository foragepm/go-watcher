const fetch = require('node-fetch');

checkPackages()
setInterval(async function(){
 checkPackages()
}, 10000)

async function checkPackages(callback) {
  try{
    var currentDate = new Date();
    var date = new Date(currentDate.getTime() - 10000).toISOString();
    var res = await fetch(`https://index.golang.org/index?since=${date}`)
    var text = await res.text()
    var lines = text.trim().split("\n")
    lines.forEach(async(line) => {
      if(line.length > 0){
        var json = JSON.parse(line)
        var url = `https://index.foragepm.com/packages/import?platform=Go&name=${json.Path}&api_key=${process.env.IMPORT_API_KEY}`
        var rs = await fetch(url, {method: 'POST'});

        console.log(json.Path, rs.status)
      }
    });
  } catch(e){
    console.error("Failed to connect to the changes feed", e)
  }
}
