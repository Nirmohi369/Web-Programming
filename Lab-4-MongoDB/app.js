/*
    1. Create a event of your choice.
    2. Log the newly created event. (Just that event, not all events)
    3. Create another event of your choice.
    4. Query all events, and log them all
    5. Create the 3rd event of your choice.
    6. Log the newly created 3rd event. (Just that event, not all events)
    7. Rename the first event
    8. Log the first event with the updated name. 
    9. Remove the second event you created.
    10. Query all events, and log them all
    11. Try to create an event with bad input parameters to make sure it throws errors.
    12. Try to remove an event that does not exist to make sure it throws errors.
    13. Try to rename an event that does not exist to make sure it throws errors.
    14. Try to rename an event passing in invalid data for the newEventName parameter to make sure it throws errors.
    15. Try getting an event by ID that does not exist to make sure it throws errors.
*/
import * as eventData from './data/events.js';
import {dbConnection, closeConnection} from './config/mongoConnection.js';
//lets drop the database each time this is run

const db = await dbConnection();
await db.dropDatabase();

let event1 = undefined;
let event2 = undefined;
let event3 = undefined;
let deleted = undefined;
let badevent = undefined;
let event = undefined;

try {
    event1 = await eventData.create("Student Social","Come join us for student social event",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "npatel.24@steven-s.edu",30,25.550,"02/21/2025","12:00pm","2:30pm",true);
    console.log(event1);
} catch (error) {
    console.log(error);
}
try {
    event = await eventData.get(event1._id.toString());
    console.log(event);
} catch (error) {
    console.log(error);
}
try {
    event2 = await eventData.create("Navratri 2023","Come join us for our this garba dance event",{streetAddress: "42 Chrisibar Dr", city: "Manhattan", state: "NY", zip: "05679"}, "phillbh@gmail.com",50,0,"10/31/2023","6:00PM","6:30Pm",false);
} catch (error) {
    console.log(error);
}
try {
    const event = await eventData.getAll();
    console.log(event);
} catch (error) {
    console.log(error);
}
try {
    event3 = await eventData.create("Diwali Bash","Come join us with your family for celebrating light",{streetAddress: "303 Columbia Ave", city: "Jersey City", state: "NJ", zip: "07307"}, "xyzdd@mail.org",30,15.5,"11/30/2023","8:00PM","11:00PM",false);
} catch (error) {
    console.log(error);
}
try {
    event = await eventData.get(event3._id.toString());
    console.log(event);
} catch (error) {
    console.log(error);
}
try {
    event1 = await eventData.rename(event1._id.toString(), "New event");
    console.log(event1);
} catch (error) {
    console.log(error);
}
try {
    event = await eventData.get(event1._id.toString());
    console.log(event);
} catch (error) {
    console.log(error);
}
try {
    deleted = await eventData.remove(event2._id.toString());
    console.log(deleted);
} catch (error) {
    console.log(error);
}
try {
    const event = await eventData.getAll();
    console.log(event);
} catch (error) {
    console.log(error);
}
try {
    badevent = await eventData.create("Student Social","Come join us for student social event",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "npatel24@stevens.edu",30,25.550,"2/21/2025","12:00pm","2:30pm",true);
} catch (error) {
    console.log(error);
}
try {
    badevent = await eventData.create("St  ","Come join us for student social event",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "npatel24@stevens.edu",30,25.550,"02/21/2025","12:00pm","2:30pm",true);
} catch (error) {
    console.log(error);
}
try {
    badevent = await eventData.create("Student Social","Come join us ",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "npatel24@stevens.edu",30,25.550,"02/21/2025","12:00pm","2:30pm",true);
} catch (error) {
    console.log(error);
}
try {
    badevent = await eventData.create("Student Social","Come join us for student social event",{ city: "Hoboken", state: "NJ", zip: "07030"}, "npatel24@stevens.edu",30,25.550,"02/21/2025","12:00pm","2:30pm",true);
} catch (error) {
    console.log(error);
}
try {
    badevent = await eventData.create("Student Social","Come join us for student social event",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NA", zip: "07030"}, "npatel24@stevens.edu",30,25.550,"02/21/2025","12:00pm","2:30pm",true);
} catch (error) {
    console.log(error);
}
try {
    badevent = await eventData.create("Student Social","Come join us for student social event",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "-npatel24@stevens.edu",30,25.550,"02/21/2025","12:00pm","2:30pm",true);
} catch (error) {
    console.log(error);
}
try {
    badevent = await eventData.create("Student Social","Come join us for student social event",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "npatel24@stevens.edu",30.35,25.550,"02/21/2025","12:00pm","2:30pm",true);
} catch (error) {
    console.log(error);
}
try {
    badevent = await eventData.create("Student Social","Come join us for student social event",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "npatel24@stevens.edu",30,25.755,"02/21/2025","12:00pm","2:30pm",true);
} catch (error) {
    console.log(error);
}
try {
    badevent = await eventData.create("Student Social","Come join us for student social event",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "npatel24@stevens.edu",30,25.550,"02/21/2025","12:00pm","11:30am",true);
} catch (error) {
    console.log(error);
}
try {
    badevent = await eventData.create("Student Social","Come join us for student social event",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "npatel24@stevens.edu",30,25.550,"02/21/2025","12:00pm","2:30pm","true");
} catch (error) {
    console.log(error);
}
try {
    event = await eventData.remove(event2._id.toString());
    console.log(event);
} catch (error) {
    console.log(error);
}
try {
    event1 = await eventData.rename(event1._id.toString(), "New event");
    console.log(event1);
} catch (error) {
    console.log(error);
}
try {
    event = await eventData.rename(event2._id.toString(),"Name Event");
} catch (error) {
    console.log(error);
}
try {
    event1 = await eventData.rename(event1._id.toString(), "Ne  ");
    console.log(event1);
} catch (error) {
    console.log(error);
}
try {
    event = await eventData.get(event2._id.toString());
    console.log(event);
} catch (error) {
    console.log(error);
}
await closeConnection();
