const User = require('../model/User');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getUserInterests = async (req, res) => {
    if (!req?.params?.email) return res.status(400).json({ "message": 'Email required' });
    const user = await User.findOne({ email: req.params.email }).exec();
    if (!user) {
      return res.status(204).json({ 'message': `User with email ${req.params.email} not found` });
    }
    res.json(user);

    console.log('.....the user...')
    console.log(user)
  }

  const  updateUser = async (req,res) =>{
    if (!req?.params?.email) return res.status(400).json({ "message": 'Email required' });
    const user = await User.findOne({ email: req.params.email }).exec();
    if(!user){
        res.status(204).json({ 'message': `No user matches ID ${req.params.id}`})
    }
    if(req.body?.interests) user.interests = req.body.interests;
    

    const result = await user.save();
    res.json(result)
}
  

module.exports = {
    getAllUsers,
    deleteUser,
    getUserInterests,
    updateUser
}