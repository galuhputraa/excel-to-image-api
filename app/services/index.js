const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { API_KEY_FILEIO, API_KEY_PDF, ROOT_PATH } = require("../../config/");

let target_path = path.resolve(ROOT_PATH, `public/images`);

const createLink = async (path) => {
  var axios = require("axios");
  var FormData = require("form-data");
  var fs = require("fs");
  var data = new FormData();
  data.append("expires", "7d");
  data.append("maxDownloads", "1");
  data.append("autoDelete", "true");
  data.append("file", fs.createReadStream(path));

  var config = {
    method: "post",
    url: "https://file.io/",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY_FILEIO}`,
      ...data.getHeaders(),
    },
    data: data,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
  convertImage: async (formData) => {
    try {
      const response = await axios.post(
        "https://api.pspdfkit.com/build",
        formData,
        {
          headers: formData.getHeaders({
            Authorization: `Bearer ${API_KEY_PDF}`,
          }),
          responseType: "stream",
        }
      );

      const file = await response.data.pipe(
        fs.createWriteStream(`${target_path}/image.jpg`)
      );

      

      return file
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  createLink
};
