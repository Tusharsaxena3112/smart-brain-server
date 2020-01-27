
const handleProfile=(req,res)=>{
  let found=false;
  const {id}=req.params;
  db.select('*').from('users').where({
    id:id
  })
    .then(user=>{
      if (user.length){
        res.json(user[0]);
      }
      else{
        res.status(400).json("Not found");
      }
    })
      .catch(err=>res.status(400).json(err));
  }

module.exports=(
  {
    handleProfile:handleProfile
  }
);