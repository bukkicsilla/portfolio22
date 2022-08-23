const express = require('express');
const mongodb = require('mongodb')
const db = require('../data/database')
const ObjectId = mongodb.ObjectId;
const router = express.Router();

router.get('/', function(req, res) {
  res.render('index')
});

router.get('/resume', function(req, res) {
  res.render('resumetest')
});

router.get('/new-projects', async function(req, res){
  
const apps = await db.getDB().collection('applications').find({}).toArray()
  res.render('newprojects', {apps: apps})
})

router.get('/new-projects/:id', async function(req, res){
  let projectId = req.params.id;
   try{
     projectId = new ObjectId(projectId)
   } catch(err){
     return res.status(404).render('fourofour')
   }
   const project = await db.getDB().collection('applications').findOne({_id: projectId});
  if (!project){
    return res.status(404).render('fourofour')
  }
  res.render('detail', {project: project})
})

router.get('/new-projects/:id/facts', async function (req, res) {
  const appId = new ObjectId(req.params.id);
  const facts = await db
    .getDB()
    .collection('facts')
    .find({ appId: appId }).toArray();
  res.json(facts)
});

router.get('/outschool-projects', async function(req, res){
  
const apps = await db.getDB().collection('outschool').find({}).toArray()
  res.render('outschoolprojects', {apps: apps})
})

router.get('/outschool-projects/:id', async function(req, res){
  let projectId = req.params.id;
   try{
     projectId = new ObjectId(projectId)
   } catch(err){
     return res.status(404).render('fourofour')
   }
   const project = await db.getDB().collection('outschool').findOne({_id: projectId});
  if (!project){
    return res.status(404).render('fourofour')
  }
  res.render('outschooldetail', {project: project})
})

router.get('/outschool-projects/:id/images', async function (req, res) {
  const outschoolId = new ObjectId(req.params.id);
  const images = await db
    .getDB()
    .collection('outschoolimages')
    .find({ outschoolId: outschoolId }).toArray();
  res.json(images)
});


module.exports = router;