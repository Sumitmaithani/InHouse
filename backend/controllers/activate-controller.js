const Jimp = require("jimp");
const path = require("path");
const UserDto = require("../dtos/user-dto");
const userService = require("../services/user-service");

class ActivateController {
  async activate(req, res) {
    const { name, avatar } = req.body;
    if (!name || !avatar) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const buffer = Buffer.from(
      avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );

    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

    try {
      const jimpResp = await Jimp.read(buffer);
      jimpResp
        .resize(150, Jimp.AUTO)
        .write(path.resolve(__dirname, `../storage/${imagePath}`));
    } catch (err) {
     return res.status(500).json({ message: "Could not process the image" });
    }

    const userId = req.user._id;

    try {
      //update user
      const user = await userService.findUser({ _id: userId });
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      user.activated = true;
      user.name = name;
      user.avatar = `/storage/${imagePath}`;
      user.save();
      return res.json({ user: new UserDto(user), auth: true });
    } catch (err) {
      return res.status(500).json({ message: "something went wrong" });
    }
  }
}

module.exports = new ActivateController();

