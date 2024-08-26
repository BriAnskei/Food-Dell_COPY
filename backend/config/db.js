import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://brianebrahim7:8970117@cluster0.fb4jp.mongodb.net/food-del"
    )
    .then(() => console.log("DB connected"));
};
