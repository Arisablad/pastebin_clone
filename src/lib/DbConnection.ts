import React from 'react'
import mongoose from "mongoose"


type TConnect = {
    isConnected: boolean | mongoose.ConnectionStates
}

const connection:TConnect= {
    isConnected: false
}


export const DbConnect = async() => {

    if(connection.isConnected){
        console.log("Using Existed connection")
        return;
    }
    if(process.env.MongoURL)
    try{
        const db = await mongoose.connect(process.env.MongoURL);
        connection.isConnected = db.connections[0].readyState
        console.log("successfully conected to db")
    }
    catch(error){
        console.log(error)
        throw new Error('Error estabilishing connection')

    }

}