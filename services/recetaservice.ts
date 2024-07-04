import { Receta } from "../models/receta.model";


const table = 'Recetas';
 //const admin = require('firebase-admin')
 const admin = require('firebase-admin');
 const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, collection } = require('firebase-admin/firestore');


 var serviceAccount = require("../recetas-36674-firebase-adminsdk-e8pf4-4e0a9350b6.json");
 admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://recetas-36674.firebaseio.com"
  });
  const firebaseConfig = {
    apiKey: "AIzaSyCbkIpV_Nvw5U_7zr0OH97SWISJjKHfpUw",
    authDomain: "recetas-36674.firebaseapp.com",
    databaseURL: "https://recetas-36674.firebaseio.com",
    projectId: "recetas-36674",
    storageBucket: "recetas-36674.appspot.com",
    messagingSenderId: "995657037391",
    appId: "1:995657037391:web:035825b8c8d4b4b3a01c3a"
  };

 //const db = admin.database();
 const db = admin.firestore()
// const db = admin.firestore();
export async function add(req): Promise<string>{
  
    
  
  return db.collection(table)
  
  .add({
    key: '',
    name: req.name,
    image: req.image,
    createdDate: req.createdDate,
    modifiedDate: ''
}).then(response => {
  
    return response.id;
   })
  

   
  

 
}  
  
export async function edit(req): Promise<void>{
 
    var ref = db.collection(table);
   
    var upref = ref.doc(req.key);
            upref.update( {
                                    key: req.key,
                                    name: req.name,
                                    image: req.image,                                  
                                    modifiedDate: req.modifiedDate,
                                    createdDate: req.createdDate
                         })
     
    }
export async function remove(key){
     await db.collection(table).doc(key).delete();
    }
export async function getAll(): Promise<Receta[]>{
    let list: Receta[] = [];
     return  await db.collection(table).get().then(snap => {
        snap.forEach(doc => {           
           
            list.push(doc.data())
        });
        return list;
    });  
    
}
export async function getById(key): Promise<Receta>{
    
     return await db.collection(table).doc(key).get().then(snap => {
        return snap.data()
    });     
 }   
  
export async function getByName(req): Promise<Receta>{
    let entity: Receta;
    return await db.collection(table).where("name", "==", req.body.name).get().then(snap => {
        snap.forEach(doc => {          
            entity = doc.data()
        });
        return entity;
    });     
}
 
module.exports = {
    add,
    edit,
    remove,
    getAll,
    getByName,
    getById
};
