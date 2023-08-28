import mongoose from "mongoose";

const connection = () => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => {
      console.log("Database is connected");
    })
    .catch(() => {
      console.log("Database is not connected!");
    });
};
export default connection;
