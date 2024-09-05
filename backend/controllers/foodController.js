import foodModel from "../models/foodModel.js";
import filesystem from "fs";

// add food item

const addFood = async (request, response) => {
  let image_filename = `${request.file.filename}`;

  const food = new foodModel({
    name: request.body.name,
    description: request.body.description,
    price: request.body.price,
    category: request.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    response.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error" });
  }
};

// All food list
const listFood = async (request, response) => {
  try {
    const foods = await foodModel.find({});
    response.json({ success: true, data: foods });
  } catch (error) {
    response.json({ success: false, message: "Error" });
  }
};

// remove food item
const removeFood = async (request, response) => {
  try {
    const food = await foodModel.findById(request.body.id);

    filesystem.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(request.body.id);
    response.json({ success: true, message: "Food Remove" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
