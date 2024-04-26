import Recruiter from "../models/Recruiter.js";

export const createRecruiter = async (req, res) => {
  const { name, email, password, role, phone, profilePic, company, isActive } =
    req.body;
  const newRecruiter = new Recruiter({
    name,
    email,
    password,
    role,
    phone,
    profilePic,
    company,
    isActive,
  });
  try {
    await newRecruiter.save();
    res.status(201).json(newRecruiter);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getRecruiters = async (req, res) => {
  try {
    const allRecruiters = await Recruiter.find();
    res.status(200).json(allRecruiters);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRecruiter = async (req, res) => {
  const { id } = req.params;
  try {
    const recruiter = await Recruiter.findById(id);
    res.status(200).json(recruiter);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateRecruiter = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, phone, profilePic, company, isActive } =
    req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No recruiter with id: ${id}`);
  const updatedRecruiter = {
    name,
    email,
    password,
    role,
    phone,
    profilePic,
    company,
    isActive,
    _id: id,
  };
  await Recruiter.findByIdAndUpdate(id, updatedRecruiter, { new: true });
  res.json(updatedRecruiter);
};

export const deleteRecruiter = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No recruiter with id: ${id}`);
  await Recruiter.findByIdAndRemove(id);
  res.json({ message: "Recruiter deleted successfully." });
};

export const loginRecruiter = async (req, res) => {
  const { email, password } = req.body;
  try {
    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) return res.status(404).send("Recruiter not found");
    const isPasswordCorrect = await bcrypt.compare(
      password,
      recruiter.password
    );
    if (!isPasswordCorrect) return res.status(400).send("Invalid credentials");
    res.status(200).json(recruiter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecruiterProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const recruiter = await Recruiter.findById(id);
    res.status(200).json(recruiter);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateRecruiterProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, company, profilePic } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No recruiter with id: ${id}`);
  const updatedRecruiter = {
    name,
    email,
    phone,
    company,
    profilePic,
    _id: id,
  };
  await Recruiter.findByIdAndUpdate(id, updatedRecruiter, { new: true });
  res.json(updatedRecruiter);
};

export const updateRecruiterPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No recruiter with id: ${id}`);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const updatedRecruiter = { password: hashedPassword, _id: id };
  await Recruiter.findByIdAndUpdate(id, updatedRecruiter, { new: true });
  res.json(updatedRecruiter);
};

export const forgotRecruiterPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const recruiter = await Recruiter.findOne({
      email,
    });
    if (!recruiter) return res.status(404).send("Recruiter not found");
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const resetPasswordExpires = Date.now() + 3600000;
    const updatedRecruiter = {
      resetPasswordToken,
      resetPasswordExpires,
      _id: recruiter._id,
    };
    await Recruiter.findByIdAndUpdate(recruiter._id, updatedRecruiter, {
      new: true,
    });
    res.json(resetToken);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetRecruiterPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const recruiter = await Recruiter.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!recruiter) return res.status(400).send("Invalid or expired token");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const updatedRecruiter = {
      password: hashedPassword,
      resetPasswordToken: "",
      resetPasswordExpires: "",
      _id: recruiter._id,
    };
    await Recruiter.findByIdAndUpdate(recruiter._id, updatedRecruiter, {
      new: true,
    });
    res.json(updatedRecruiter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { createRecruiter, getRecruiters, getRecruiter, updateRecruiter, deleteRecruiter, loginRecruiter, getRecruiterProfile, updateRecruiterProfile, updateRecruiterPassword, forgotRecruiterPassword, resetRecruiterPassword };
