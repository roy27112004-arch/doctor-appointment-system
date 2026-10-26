const ImageKit = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

async function uploadfile(buffer) {
  const result=await client.files.upload({
    file:buffer.toString("base64"),
    fileName:"prescription.pdf"
  })
  return result;
}
module.exports=uploadfile;