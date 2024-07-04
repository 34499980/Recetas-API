import * as service from  '../services/recetaservice';
import {StatusCodes} from 'http-status-codes';
//var service = require('../services/CategoryService');
import * as helper from '../helpers/Time';
import { Receta } from '../models/receta.model';
const res = require('express/lib/response');

export async function add(req, res,){
    const entity = await getByNamePrivate(req, res)
    if(entity == undefined) {
        const newEntity: Receta ={
            key: '',
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            ingredientes: req.body.ingredientes
        }
        const  key = await service.add(newEntity);  
        newEntity.key = key;
        
       // req.body.modifiedDate = helper.getNowWithHours();
    
        service.edit(newEntity)
        res.status(StatusCodes.CREATED). send({
         menssage: 'Se genero la receta ' + req.body.name
     });
    } else {
        res.status(500). send({
            menssage: 'La receta ' + req.body.name + ' ya existe'
        });
    }
    
}  
  
export async function edit(req, res){
    const dbEntity = await getByNamePrivate(req, res)   
   
    if(dbEntity == undefined || dbEntity.key == req.body.key) { 
       const entity: Receta = {
        key: req.body.key,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        ingredientes: req.body.ingredientes
        } 
      
        await service.edit(entity);
            res.status(StatusCodes.CREATED).send({
                menssage: 'Se actualizo la receta ' + req.body.name
         });
    } else {
        res.status(StatusCodes.NOT_ACCEPTABLE). send({
            menssage: 'La receta ' + req.body.name + ' ya existe'
        });
    }
   
 }
 export async function remove(req, res){
    let key = ''; 
    
    if(req.body.key == undefined){
        key = req.query.key;
   } else {
         key = req.body.key;
   }
    const dbEntity = await getByIdPrivate(key, res)     
   
        if(dbEntity){
            service.remove(key);
           
        }
        res.status(200).send({
            menssage: 'Se elimino la receta: '+ dbEntity.nombre
        });
    }
export async function getAll(req, res){
    let list = await service.getAll()
    res.status(StatusCodes.ACCEPTED).json(list);
 }
 export async function getByNamePrivate(req, res){
    let list =  await service.getByName(req)
    return list;
 }
 export async function getByName(req, res){
    let list =  await service.getByName(req)
    res.status(StatusCodes.ACCEPTED).json(list);
 }
export async function getById(req, res){
    let entity = await service.getById(req)
    res.status(StatusCodes.ACCEPTED).json(entity);
 }
 export async function getByIdPrivate(key, res){
    return await service.getById(key)
    
 }
 
// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    add,
    edit,
    remove,
    getAll,
    getByName,
    getById
};
