// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  const dateString = req.params.date;

  // Jika tanggal kosong, gunakan waktu saat ini
  const dateValue = dateString
    ? isNaN(dateString)
      ? dateString
      : parseInt(dateString)
    : new Date(); // Gunakan waktu saat ini jika tanggal tidak diberikan

  // Membuat objek Date dari tanggal angka atau waktu saat ini jika tanggal kosong
  const dateObject = new Date(dateValue);

  // Memeriksa apakah tanggal valid
  if (isNaN(dateObject.getTime())) {
    // Jika tanggal tidak valid, kirim objek kesalahan
    return res.json({ error: "Invalid Date" });
  }

  // Mengirim respon dengan format yang diinginkan
  res.json({
    unix: dateObject.getTime(),
    utc: dateObject.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
