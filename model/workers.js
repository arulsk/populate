const mongoose = require('mongoose');
const fs = require('fs')

const addressSchema = new mongoose.Schema({
    streetNo : {
        type : Number,
        
    },
    streetName:{
        type : String,
        
    },
    city : {
        type : String,
        
    },
    country : {
        type : String,
     
    }
})

const workerDetials = new mongoose.Schema({
  
    name :{
        type : String,
        required : true
     },
  
     age : {
        type : Number,
        min : 1,
        max : 100,
        required : true
    },
  
    email:{
        type : String,
        required : true,
        unique : true
    },
  
    password : {
        type : String,
        required : true,
    },
  
    phoneNo : {
        type  : Number,
        validate : {
            validator : (value)=> { 
                return String(value).length === 10;
        },
        message  : props => `${props.value} is not a valid phone number. It should have exactly 10 digits.`
      },
      required : true
},

gender : {
    type:String,
},
address :{ 
    type :  mongoose.Schema.Types.ObjectId, 
    ref: 'address'
}
})

workerDetials.methods.sayName =  function(){
    console.log(`hello ${this.name} wecome`)
}

addressSchema.virtual("nameEmail").get(function(){
    return `city : ${this.city} country : ${this.country} `
})

workerDetials.statics.findByName = function(name){
  return this.where("name").equals(name.name)
}

workerDetials.query.byEmail = function(email){
    return this.where("email").equals(email.email)
}

workerDetials.pre('save',function(next){
  this.gender = "none";
  console.log('the user going to save ',this)
  next()
})

// workerDetials.statics.findByCity = function(city) {
//     return this.find({"address.city": city});
// };


workerDetials.post('save', function(doc,next){
    const content = `name of the user is ${doc.name} \n`
    fs.writeFile('./logt.txt',content,{flag:'a'},(err)=>{
        if(err){
        console.log(err.message);
}})
    next()
})


const  model = mongoose.model('workers',workerDetials)
const address = mongoose.model('address',addressSchema)
module.exports = {model,address}