import express from "express"

import cors from 'cors'
import { teste } from "./enpoints/ping"
import { createUser } from "./enpoints/createUser"
import { getAllUsers } from "./enpoints/getAllUsers"
import { createProduct } from "./enpoints/createProduct"
import {getAllProducts} from "./enpoints/getAllProducts"
import { createPurchase } from "./enpoints/createPurchase"

const app = express()

app.use(express.json())

app.use(cors())

app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003");
});

app.get("/ping", teste);

app.post("/users", createUser);

app.get("/users", getAllUsers);

app.post("/products", createProduct);

app.get("/products", getAllProducts);

app.post("/purchases", createPurchase);
