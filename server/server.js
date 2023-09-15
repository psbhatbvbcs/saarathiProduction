import { app, server } from "./app.js";
import { connectDb } from "./data/connectDB.js";
import { CollegeSchema } from "./models/College.js";

connectDb();

server.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});

const addDefaultKle = async () => {
  const isKle = await CollegeSchema.findOne({
    collegeName: "KLE Technological University",
  });

  if (!isKle) {
    await CollegeSchema.create({
      collegeName: "KLE Technological University",
      collegeAddress: "hubli",
      collegeEmail: "fals@ldkfa.com",
      collegeWebsite: "https://www.kletech.ac.in",
    });
  }
};

addDefaultKle();