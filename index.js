var http = require('http')
var android = require('node-on-android')

var server = http.createServer(function (req, res) {
  res.end(`
    <html>
    <body>
    <h1>XMR Miner</h1>
    <button type="button" id="button" onclick="callMiner()">Start Mining</button>
    <p id='output">
    <p id='error">
    <p id='close">
    <script>
      function callMiner() {
        const { spawn } = require('child_process');
        if(document.getElementById("button").innerHTML == "Start Mining"){
            document.getElementById("button").innerHTML = "Stop Mining";
            const child = spawn('node ./miner.js')
            child.stdout.on('data', (data) => {
                document.getElementById("output").innerHTML = data;
            });

            child.stderr.on('data', (data) => {
                console.log('stderr: ${data}');
            });

            child.on('close', (code) => {
                console.log('child process exited with code ${code}');
            });
        } else {
            document.getElementById("button").innerHTML = "Start Mining";
            spawn.kill(SIGINT);
        }
    }
    </script>
    </body>
    </html>
  `)
})

server.listen(0, function () {
  android.loadUrl(`http://localhost:${server.address().port}`)
  console.log(`${server.address().port}`);
})