const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");
const fs = require("fs");
const axios = require("axios");

// get http response content
url =
  "https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-Riau.xml";

axios
  .get(url)
  .then((res) => {
    var xml = res.data;
    // split start <data and end </data> tags
    const start = xml.indexOf("<data source");
    const end = xml.indexOf("</data>");

    xml = xml.substring(start, end + 7);

    const parser = new XMLParser();
    const options = {
      ignoreAttributes: false,
    };

    const json = parser.parse(xml, options);

    fs.writeFileSync("test.json", JSON.stringify(json, null, 2));
    // fs.writeFileSync("test.xml", xml);
  })
  .catch((err) => {
    console.log(err);
  });
