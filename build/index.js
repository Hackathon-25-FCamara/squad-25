"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./connection"));
const app = (0, express_1.default)();
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.raw(`
        INSERT INTO Users
           (name, email, password, photo, bio, links, role)
        VALUES (
           "${req.body.name}",
           "${req.body.email}",
           "${req.body.password}",
           "${req.body.photo}",
           "${req.body.bio}",
           "${req.body.links}",
           "${req.body.role}",
); `);
        res.status(201).send("Success!");
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("An unexpected error occurred");
    }
}));
app.get("/", (req, res) => {
    res.send("Rodei");
});
