const express = require("express");
const {Videos, VideosDetails} = require("../models/videos")
 const { JsonWebTokenError } = require("jsonwebtoken")
 const jwtAuth = require("../middleware/jwtAuth")

const router = express.Router(); 
router.get("/", (req,res)=>{
    res.send("This is  API Routes Page")
})

   //all videos//

   
router.get("/videos", jwtAuth, async (req, res) => {
    const allVideos = await Videos.find({});
    console.log(allVideos);
    res.json({ Videos: allVideos });
})






   

   // individual api//
   router.get("/videos/:id",jwtAuth,async(req,res)=>{
    const{id} = req.params;
    const video = await VideosDetails.findOne({_id:id});
    if(!video){
        return res.json({message:"video not found"})

    }
    //  console.log(video);

      const videoTitle = video.title

    const similarVideos = await Videos.find({
        title:{$regex:videoTitle, $options:'i'},
        _id:{$ne:id}
    })

        res.status(200).json({videoDetails:video, similarVideos:similarVideos})
   })


   router.get("/:category",jwtAuth,async(req,res)=>{
    const{category} = req.params;
    const videosInCategory = await VideosDetails.findOne({category:category});
    if(!videosInCategory || videosInCategory.length === 0){
        return res.json({message:"video not found"})

    }
    //  console.log(video);

      const videoCategory = video.title
 
      

      const similarVideos = await Videos.find({
         title:{$regex:videoCategory, $options:'i'},
         category:{$ne:category}
      })
    

        res.status(200).json({videosInCategory:videosInCategory})
   })

  

  


module.exports = router;