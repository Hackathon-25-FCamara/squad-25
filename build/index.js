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
const app_1 = __importDefault(require("./app"));
const connection_1 = __importDefault(require("./connection"));
app_1.default.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.default.raw('SELECT * FROM Users;');
        res.send(result.length === 1 ? result[0][0] : result[0]);
    }
    catch (error) {
        res.send(error.message);
    }
}));
app_1.default.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
           "${req.body.role}"
); `);
        res.status(201).send("Success!");
    }
    catch (error) {
        res.status(500).send("An unexpected error occurred");
    }
}));
app_1.default.put("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.raw(`
       UPDATE Users
        SET 
           name = "${req.body.name}",
           email = "${req.body.email}",
           password = "${req.body.password}",
           photo = "${req.body.photo}",
           bio = "${req.body.bio}",
           links = "${req.body.links}",
           role = "${req.body.role}",
        
       WHERE id = ${req.params.id}; `);
        res.status(200).send("Success!");
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("An unexpected error occurred");
    }
}));
app_1.default.delete("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.raw(`
       DELETE FROM Users  
           WHERE id = ${req.params.id}; `);
        res.status(200).send("Success!");
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("An unexpected error occurred");
    }
}));
app_1.default.get("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield connection_1.default.raw(`
       SELECT name, email, password, photo, bio, links, role FROM Users
       WHERE id = ${req.params.id}; `);
        //res.status(201).json(data);
        console.log(data[0]);
        res.status(200).send("Success!");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("An unexpected error occurred");
    }
}));
