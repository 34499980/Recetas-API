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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByName = exports.getById = exports.getAll = exports.remove = exports.edit = exports.add = void 0;
const table = 'Category';
//const admin = require('firebase-admin')
const admin = require('firebase-admin');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, collection } = require('firebase-admin/firestore');
var serviceAccount = require("../recetas-36674-firebase-adminsdk-e8pf4-3d7e47ac9a.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://recetas-36674.firebaseio.com"
});
const firebaseConfig = {
    firebase: false,
    apiKey: "AIzaSyCbkIpV_Nvw5U_7zr0OH97SWISJjKHfpUw",
    authDomain: "recetas-36674.firebaseapp.com",
    databaseURL: "https://recetas-36674.firebaseio.com",
    projectId: "recetas-36674",
    storageBucket: "recetas-36674.appspot.com",
    messagingSenderId: "995657037391"
};
//const db = admin.database();
const db = admin.firestore();
// const db = admin.firestore();
function add(req) {
    return __awaiter(this, void 0, void 0, function* () {
        return db.collection(table)
            .add({
            key: '',
            name: req.name,
            image: req.image,
            createdDate: req.createdDate,
            modifiedDate: ''
        }).then(response => {
            return response.id;
        });
    });
}
exports.add = add;
function edit(req) {
    return __awaiter(this, void 0, void 0, function* () {
        var ref = db.collection(table);
        var upref = ref.doc(req.key);
        upref.update({
            key: req.key,
            name: req.name,
            image: req.image,
            modifiedDate: req.modifiedDate,
            createdDate: req.createdDate
        });
    });
}
exports.edit = edit;
function remove(key) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.collection(table).doc(key).delete();
    });
}
exports.remove = remove;
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        let list = [];
        return yield db.collection(table).get().then(snap => {
            snap.forEach(doc => {
                list.push(doc.data());
            });
            return list;
        });
    });
}
exports.getAll = getAll;
function getById(key) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.collection(table).doc(key).get().then(snap => {
            return snap.data();
        });
    });
}
exports.getById = getById;
function getByName(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let entity;
        return yield db.collection(table).where("name", "==", req.body.name).get().then(snap => {
            snap.forEach(doc => {
                entity = doc.data();
            });
            return entity;
        });
    });
}
exports.getByName = getByName;
module.exports = {
    add,
    edit,
    remove,
    getAll,
    getByName,
    getById
};
//# sourceMappingURL=recetaservice.js.map