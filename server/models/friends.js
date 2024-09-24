import mongoose from "mongoose";

const friendSchema = new mongoose.Schema(
  {
userid:{
    type:String

},
useridfriend:{
  type:String
}


},
  { timestamps: true }
  
);

const Friend = mongoose.model("friend", friendSchema);
export default User;