import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{
  content: string // in TS, 'string' mae 's' is small
  createdAt: Date
}
// In the end, these all data will be going to Mongoose Document, so we write 'extends Document' 

// Schema<Message> is a type -> MessageSchema has a type of Schema which we have defined above (custom schema) named Message. This name is represented in '<..>'
const MessageSchema: Schema<Message> = new Schema({
  content: { // if -> type: Number, it will show an error, because TS ensures that the datatype which you have provided above and written currently are same.
    type: String, // in mongoose, 'String' mae 'S' is capital
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
}) 

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date; 
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}

const UserSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  verifyCode: { 
    type: String,
    required: [true, 'Verify Code is required'],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, 'Verify Code Expiry is required'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema)) 
// Typescript : as mongoose.Model<User> 
export default UserModel