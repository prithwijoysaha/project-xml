import EventEmitter from "events";
import fs from "fs";
import xml2js from "xml2js";
import noSqlDb0Models from "../../databases/index.js";

const { Contact } = noSqlDb0Models;

const myEmitter = new EventEmitter();

export const uploadContacts = async (req, res) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.status = 400;
    return next(error);
  }
  myEmitter.emit("parseContact", { file });
  res.send("File uploaded successfully");
};

const parseContacts = async (event) => {
  const { file } = event;
  const xml = fs.readFileSync(file.path, "utf-8");
  xml2js.parseString(xml, (err, result) => {
    if (err) {
      console.error("Error parsing XML:", err);
      return;
    }
    Contact.insertMany(result?.contacts?.contact || []);
  });
};

myEmitter.on("parseContact", parseContacts);
