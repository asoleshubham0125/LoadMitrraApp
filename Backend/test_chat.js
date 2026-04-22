const mongoose = require('mongoose');
require('dotenv').config();
const Load = require('./model/Load.model');
const ChatMessage = require('./model/ChatMessage.model');
const Supplier = require('./model/Supplier.model');
const Driver = require('./model/Driver.model');

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Find a load
    const load = await Load.findOne({ driverId: { $ne: null } });
    if (!load) return console.log('No assigned load');
    
    console.log('Testing with Load:', load._id);
    
    // Mock user
    const user = { id: load.supplierId.toString(), role: 'supplier' };
    
    // Simulate what the POST route does
    const isAllowed =
      (load.driverId && load.driverId.toString() === user.id) ||
      (load.supplierId && load.supplierId.toString() === user.id);
      
    if (!isAllowed) {
      console.log('FAILED: isAllowed returned false');
      return;
    }
    
    console.log('isAllowed check passed');
    
    // Simulate DB insert
    let determinedRole = user.role;
    if (!determinedRole) {
      determinedRole = load.driverId?.toString() === user.id ? "driver" : "supplier";
    }

    const chat = await ChatMessage.create({
      loadId: load._id,
      senderId: user.id,
      senderRole: determinedRole,
      message: "Test msg via script",
    });
    
    console.log('SUCCESS: Message inserted:', chat._id);
    
  } catch (err) {
    console.error('ERROR CATCH BLOCK:', err);
  } finally {
    process.exit(0);
  }
}
run();
