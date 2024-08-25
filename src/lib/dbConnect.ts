import mongoose from 'mongoose'

type ConnectionObject = {
  isConnected?:number
}
const connection: ConnectionObject = {} // initially empty

// Since DB in another continent, so 'async' and since this is a function, 
// we need to mention its return type as well (typescript demands!!).
// So, it will return me a Promise. Now we don't care what value is inside Promise, so we write
// 'void' . 
// Note: 'void' of C++ and 'void' of Typescript, both are different. 
async function dbConnect(): Promise<void> {
  if(connection.isConnected){
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {}) // can pass more options as well.
    // Nextjs handles the bringing of env files (as you can see above, nothing is imported, we just mentioned a value and we got our env variable value)
    connection.isConnected = db.connections[0].readyState
    // ready state is itself a number, so if you see above in 'type', we are returning a 'number'
    
    console.log("DB Connected Successfully");
  
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1)    
  }
}

export default dbConnect