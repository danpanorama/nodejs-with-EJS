const Setimg = require("../../models/db/DBallStoreData");

const setItem = await new Setimg({
  itemIMG: {
    data: fs.readFileSync(
      path.join(
        __dirname + "../../../" + "/public/" + "/uploads/" + data.itemIMG
      )
    ),
    contentType: "image/png",
  },
});

setItem
  .save()
  .then((result) => {
    console.log("this is the result of editing", result);
  })
  .catch((err) => console.log(err));
