const Clarifai=require('clarifai');

const app=new Clarifai.App({
  apiKey:'c4a23b28cbd44101b76a39e3262116ca'
});

const apiCall=(req,res)=>{
 app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
  .then(data=>{
    res.json(data);
  })
    .catch(err=>res.status(400).json("Unable to work with API"));
}


const handleImage= (req,res,db)=>{

  let found=false;
  const {id}=req.body;
  db('users')
  .where('id', '=', id)
  .increment('entries',1)
  .returning('entries')
  .then(entries=>{
    res.json(entries[0])
  })
    .catch(err=>{
      res.status(400).json(err);
    })
}

module.exports=(
  {
    handleImage,
    apiCall
  }
)