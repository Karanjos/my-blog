import Admin from "../models/Admin.js";

export const createAdmin = async (req, res) => {
  const { name, email, password, role, phone, profilePic, isActive } = req.body;
  const newAdmin = new Admin({
    name,
    email,
    password,
    role,
    phone,
    profilePic,
    isActive,
  });
  try {
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const allAdmins = await Admin.find();
    res.status(200).json(allAdmins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(id);
    res.status(200).json(admin);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, phone, profilePic, isActive } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No admin with id: ${id}`);
  const updatedAdmin = { name, email, password, role, phone, profilePic, isActive, _id: id };
  await Admin.findByIdAndUpdate(id, updatedAdmin, { new: true });
  res.json(updatedAdmin);
};

export const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No admin with id: ${id}`);
  await Admin.findByIdAndRemove(id);
  res.json({ message: "Admin deleted successfully." });
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).send("Admin doesn't exist!");
    if (admin.password !== password) return res.status(404).send("Invalid credentials!");
    res.status(200  ).json(admin);
    }
    catch (error) {
    res.status(500).json({ message: error.message });
    }
};

export default { createAdmin, getAdmins, getAdmin, updateAdmin, deleteAdmin, loginAdmin } ;