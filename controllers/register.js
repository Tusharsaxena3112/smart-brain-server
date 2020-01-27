
const handleRegister=(req,res,db,bcrypt)=>{
  const {email,password,name}=req.body;
  if (!email||!password||!name){
    return res.status(400).json("unable to register");
  }
  const hash  = bcrypt.hashSync(password);
  db.transaction(trx=>{
    trx.insert({
      email:email,
      hash:hash
    })
      .into('login')
      .returning('email')
      .then(loginEmail=>{
          return  db('users')
            .returning('*')
            .insert({
              email:loginEmail[0],
              name:name
            }).then(response=>{
              res.json(response[0]);
          })
      })
        .then(trx.commit)
        .catch(trx.rollback)
  })
    .catch(err=>res.status(400).json("unable to register! Try out another name"));
  }

  module.exports=(
    {handleRegister:handleRegister}
    );