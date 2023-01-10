const User = require('../model/User');
const bcrypt = require('bcrypt');
const Premium = require('../model/Premium');
const Purchase = require('../model/Purchases');
const Databases = require("../model/Databases");
const Port = require("../model/Ports");
const Workspace = require("../model/Workspaces");
var dockerCLI = require('docker-cli-js');
var Docker = dockerCLI.Docker;

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



const updateUser = async (req, res) => {
    if (!req?.params?.email) return res.status(400).json({ "message": 'Email required' });
    const user = await User.findOne({ email: req.params.email }).exec();
    if (!user) {
        res.status(204).json({ 'message': `No user matches ID ${req.params.id}` })
    }
    if (req.body?.interests) user.interests = req.body.interests;


    const result = await user.save();
    res.json(result)
}

const handlePremiumRequest = async (req, res) => {

    if (!req?.body?.suitName || !req?.body?.requesterEmail) {
        return res.status(400).json({ 'message': 'all details not added' })
    }

    try {
        const result = await Premium.create({
            "suitName": req.body.suitName,
            "requesterEmail": req.body.requesterEmail,

        });
        console.log(result);
        res.status(201).json({ 'success': `New premium   request made by  ${req.body.requesterEmail} ` });
    } catch (err) {
        console.error(err);

    }
}

const handlePurchases = async (req, res) => {

    if (!req?.body?.paymentAmount || !req?.body?.buyer || !req?.body?.suitName) {
        return res.status(400).json({ 'message': 'all details not added' })
    }

    try {
        const result = await Purchase.create({
            "paymentAmount": req.body.paymentAmount,
            "suitName": req.body.suitName,
            "buyer": req.body.buyer

        });
        console.log(result);
        res.status(201).json({ 'success': `New payment details  added  by  ${req.body.buyer} ` });
    } catch (err) {
        console.error(err);

    }
}

const getUniqueDatabase = async (req, res) => {
    if (!req?.params?.Database_Name) return res.status(400).json({ "message": 'Database_Name required' });
    const db = await Databases.findOne({ databaseName: req.params.Database_Name }).exec();
    if (!db) {
        return res.status(204).json({ 'message': `User with db Name ${req.params.Database_Name} not found` });
    }
    res.json(db);

    console.log('.....the db...')
    console.log(db)
}

const handleDatabaseCreation = async (req, res) => {
    if (!req?.body?.databaseName || !req?.body?.rootPassword || !req?.body?.Admin_Email) {
      return res.status(400).json({ 'message': 'all details not added' });
    }
    
    // Extracting the relevant variables from the request
    const { databaseName, rootPassword, Admin_Email } = req.body;
    const dbname = databaseName.split(" ").join("").toLowerCase().replace(/[^a-zA-Z ]/g, "");
    const hashedPwd = await bcrypt.hash(rootPassword, 10);
    
    // Pick a random port for the database
    let chosenport = getRandomNumberBetween(13000, 13151);
    
    // Check if the port is already in use
    const port_Numbers = await Port.find({}, { port_Number: 1 });
    const allPorts = Object.values(port_Numbers);
    
    while(allPorts.indexOf(chosenport) !== -1){
      chosenport = getRandomNumberBetween(13000, 13151);
    }
  
    // Create a new Port
    try {
      await Port.create({
        "workspaceName": dbname,
        "port": chosenport,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ 'message': 'Error creating port' });
    }
  
    // Create a new Database
    try {
      const result = await Databases.create({
          "databaseName": dbname,
          "rootPassword": hashedPwd,
          "adminEmail": Admin_Email,
          "uri": `mysql://root:yourPass@164.92.77.118:${chosenport}/${dbname}`,
          "port": chosenport,
          "status": 'unpaid'
      });
      console.log(result);
      res.status(201).json({ 'success': `New db   created ` });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ 'message': 'Error creating Database' });
    }
   
  
    // Create the Docker container
    const options = {
      machineName: null, // uses local docker
      currentWorkingDirectory: null, // uses current working directory
      echo: true, // echo command output to stdout/stderr
    };
    var docker = new Docker(options);

   
    await docker.command(`run -d -it  --name ${dbname} -p ${chosenport}:3306 --cap-add=sys_nice -e MYSQL_ROOT_PASSWORD=${hashedPwd} -e MYSQL_DATABASE=${dbname} -v ${dbname}:/var/lib/mysql mysql`)
      .then(function (data) {
        console.log('data = ', data);
        console.log(data.containerId);
      }).catch(err => {
        console.log("Error when creating container: ", err);
      });
  
  };
  
  function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const getUniqueWorkspaces = async (req, res) => {
        if (!req?.params?.Workspace_Name) return res.status(400).json({ "message": 'Workspace_Name required' });
        const workspace = await Workspace.findOne({ workspaceName: req.params.Workspace_Name }).exec();
        if (!workspace) {
            return res.status(204).json({ 'message': `User with db Name ${req.params.Workspace_Name} not found` });
        }
        res.json(workspace);
    
        console.log('.....the workspace...')
        console.log(workspace)
    }

    const getWorkspaceTrials = async (req, res) => {
        if (!req?.params?.suit || !req?.params?.status || !req?.params?.company) return res.status(400).json({ "message": 'Workspace_Name required' });
        const trials = await Workspace.db.workspaces.find({
            $and: [
              { suitName: req.params.suit },
              { status: req.params.status },
              { companyName: req.params.company }
            ]
          })
          
        if (!trials) {
            return res.status(204).json({ 'message': `trials not found` });
        }
        res.json(trials);
    
        console.log('.....the trials...')
        console.log(trials)
    }
    const handleWorkspaceCreation = async (req, res) => {
        if (!req?.body?.Workspace_Name || !req?.body?.Workspace_Description || !req?.body?.Workspace_Email  || !req?.body?.company_Name || !req?.body?.suitName  || !req?.body?.status  ) {
          return res.status(400).json({ 'message': 'all details not added' });
        }
        
        // Extracting the relevant variables from the request
        const { Workspace_Name, Workspace_Description, Workspace_Email,company_Name,status,suitName } = req.body;
        const workspacename = Workspace_Name.split(" ").join("").toLowerCase().replace(/[^a-zA-Z ]/g, "");
        
        
        // Pick a random port for the database
        let chosenport = getRandomNumberBetween(13000, 13151);
        var outsidePort = (chosenport + 1000)
        const Workspace_Link = `https://datatrunk.ndovucloud.com:${outsidePort}`;
        
        // Check if the port is already in use
        const port_Numbers = await Port.find({}, { port_Number: 1 });
        const allPorts = Object.values(port_Numbers);
        
        while(allPorts.indexOf(chosenport) !== -1){
          chosenport = getRandomNumberBetween(13000, 13151);
        }
      
        // Create a new Port
        try {
          await Port.create({
            "workspaceName": workspacename,
            "port": chosenport,
          });
        } catch (err) {
          console.error(err);
          return res.status(500).json({ 'message': 'Error creating port' });
        }
      
        // Create a new Database
        try {
          const result = await Workspace.create({
              "workspaceName": workspacename,
              "workspaceDescription": Workspace_Description,
              "workspaceLink": Workspace_Link,
              "workspaceEmail": Workspace_Email,
              "companyName": company_Name,
              "suitName": suitName,
              "status": status
             
          });
          console.log(result);
          res.status(201).json({ 'success': `New workspace  created ` });
        } catch (err) {
          console.error(err);
          return res.status(500).json({ 'message': 'Error creating Database' });
        }
       
      
        // Create the Docker container
        const options = {
          machineName: null, // uses local docker
          currentWorkingDirectory: null, // uses current working directory
          echo: true, // echo command output to stdout/stderr
        };
        var docker = new Docker(options);
         //the link
    

    
       
         if (suitName == 'datatrunk') {
            docker.command(`network create ${workspacename} `).then(function (data) {
                console.log('data = ', data);

            });

            setTimeout(function () {
                docker.command(`run  -d -p ${outsidePort}:8088 -v ${workspacename}:/app --name ${workspacename} --network ${workspacename} bretton77/datatrunktrial:1.0.0`).then(function (data) {
                    console.log('data = ', data);
                    console.log(data.containerId);
                });

            }, 1800)

        }
      
      };
  

module.exports = {
    getAllUsers,
    deleteUser,
    getUserInterests,
    updateUser,
    handlePremiumRequest,
    handlePurchases,
    getUniqueDatabase,
    handleDatabaseCreation,
    getUniqueWorkspaces,
    getWorkspaceTrials,
    handleWorkspaceCreation
}