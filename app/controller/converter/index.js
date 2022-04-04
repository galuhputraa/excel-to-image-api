const FormData = require("form-data");
const fs = require("fs");
const { convertImage, createLink } = require("../../services");

module.exports = {
  xlsToImage: async (req, res) => {
    const formData = new FormData();

    formData.append(
      "instructions",
      JSON.stringify({
        parts: [
          {
            file: "document",
          },
        ],
        output: {
          type: "image",
          format: "jpg",
          dpi: 500,
        },
      })
    );

    formData.append("document", fs.createReadStream(req.file.path));

    try {
      const file = await convertImage(formData);
      if (file) {
        setTimeout(async () => {
          const result = await createLink(file.path);
          if (result.status == 200) {
            response = {
              link: result.data?.link,
              expires: result.data.expires,
            };
          } else {
            response = {
              message: "internal server error",
            };
          }
          return res.status(200).send(response);
        }, 5000);
      }
    } catch (error) {
      return res.send(error.message);
    }
  },
};
