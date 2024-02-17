import * as eventData from './data/events.js';
import * as attendeeData from './data/attendees.js';
import {dbConnection, closeConnection} from './config/mongoConnection.js';
//lets drop the database each time this is run

const main=async()=>{
    const db = await dbConnection();
    await db.dropDatabase();
    
    let AddData1 = undefined;
    let AddData2 = undefined;
    let AddData3 = undefined;
    let Attendee1 = undefined;

    try{
        AddData1 = await eventData.create("mahesh ka birthday","Aau kabhi haveli pe tu merer saath achievement achievement achievement",{streetAddress:"181 congress street",city:"jersey city",state:"NJ",zip:"07307"},"mpisharo@stevens.edu",100,12.20,"08/25/2024","2:00 PM","8:00 PM",false);
    }catch(e){
        console.log(e);
    }

    try{
        AddData2 = await eventData.create("Atharva ka birthday","Chalo Chalein Party ko achievement achievement achievement",{streetAddress:"1 castle point",city:"Hoboken",state:"NJ",zip:"07030"},"aparte@stevens.edu",50,5,"11/09/2025","12:00 PM","12:30 PM",true);
    }catch(e){
        console.log(e);
    }
    
    try{
        Attendee1 = await attendeeData.createAttendee(AddData1._id,"Ken","Adams","KenAdams@gmail.com");
    }catch(e){
        console.log(e);
    }

    try{
        AddData3 = await eventData.create("John's Graduation Party", "Let's celebrate John's achievement! achievement achievement achievement", { streetAddress: "123 Main St", city: "Anytown", state: "NJ", zip: "12345" }, "john@example.com", 100, 10, "05/20/2024", "3:00 PM", "7:00 PM", true);
    }catch(e){
        console.log(e);
    }

    try{
        let Attendee2 = await attendeeData.createAttendee(AddData1._id,"don","Adams","KenAdams@gmail.com");
    }catch(e){
        console.log(e);
    }

    try{
        let Attendee3 = await attendeeData.createAttendee(AddData2._id,"lex","Adams","KenAdams@gmail.com");
    }catch(e){
        console.log(e);
    }
    try{
        AddData2 = await eventData.update(AddData2._id,"Atharva","Chalo Chalein Party ko achievement achievement achievement",{streetAddress:"1 castle point",city:"Hoboken",state:"NJ",zip:"07030"},"aparte@stevens.edu",50,5,"11/09/2025","12:00 PM","1:00 PM",true);
    }catch(e){
        console.log(e);
    }
    try{
        let Attendee4 = await attendeeData.createAttendee(AddData3._id,"max","Adams","KenAdams@gmail.com");
    }catch(e){
        console.log(e);
    }

    await closeConnection();
    console.log('Done!');
}

main();