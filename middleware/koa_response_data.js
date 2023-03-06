// 处理业务逻辑的中间件,读取某个json文件的数据：获取请求路径并拼接
const path = require("path");
const fileUtils = require("../utils/file_utils");
module.exports = async (ctx, next) => {
  // 根据url
  const url = ctx.request.url; // /api/seller   ../data/seller.json
  let filePath = url.replace("/api", ""); //  /seller
  filePath = "../data" + filePath + ".json"; // ../data/seller.json
  filePath = path.join(__dirname, filePath);
  //如果找不到文件是会报错的，为了不让它报错，所以要进行try,catch
  try {
    const ret = await fileUtils.getFileJsonData(filePath); //返回的是promise对象
    ctx.response.body = ret;
  } catch (error) {
    const errorMsg = {
      message: "读取文件内容失败, 文件资源不存在",
      status: 404,
    };
    ctx.response.body = JSON.stringify(errorMsg);
  }

  console.log(filePath);
  await next();
};
