import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        mongoose.set('strictQuery' , false)
        const connected = await mongoose.connect(
            process.env.MONGO_URL) ;  //asign a response as connectted || mongoose.connec(pass in the url of mongodb connection string)
          console.log(`Mongodb is connected ${connected.connection.host}`)
    } catch (error) {
        console.log(`error ${error.message}`);
        process.exit(1); // stop the app
    };

};

export default dbConnect ; 






//vp9v1INXgD9yTMLs 



//yQ5HHWZgL83Z6lxN