import User from "../models/user.model";

export const getUser = async (req, res) => {
  const { name } = req.query;

  const user = await User.findOne({ username: name });

  if (user) {
    res.json({
      user: user.username,
      email: user.email,
      id: user._id,
    });
    return;
  }

  res.json({
    success: false,
    message: "User not found",
  });
};

export const createUser = async (req, res) => {
  try {
    console.log("User just posted something.");

    // show the posted data
    console.log(req.body);

    const { username, password, repassword, email, fullname } = req.body;
    // destructuring
    // const username = req.body.username;
    // const password = req.body.password;
    // const repassword = req.body.repassword;

    // check if one missing, show error
    if (!username || !password || !repassword || !email || !fullname) {
      throw new Error("Vui lòng điền đầy đủ thông tin.");
    }

    // check if password and repassword are not the same
    if (password !== repassword) {
      throw new Error("Mật khẩu không trùng khớp");
    }

    // check if password is less than 6 characters
    if (password.length < 6) {
      throw new Error("Mật khẩu phải có ít nhất 6 ký tự");
    }

    // check if username is less than 6 characters
    if (username.length < 6) {
      throw new Error("Tên đăng nhập phải có ít nhất 6 ký tự");
    }

    // check if email is valid
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      throw new Error("Email không hợp lệ");
    }

    // mongoose add user to database
    const user = await User.create({ username, password, email, fullname });

    console.log("success: ", user);

    return res.redirect("/login");
  } catch (err) {
    console.log(err);
    return res.render("signup", {
      title: "Đăng ký",
      error: err,
    });
  }
};
