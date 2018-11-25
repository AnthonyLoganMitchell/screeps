require('prototype.room_state');
module.exports.loop = function () {
//console.log('Main:Debug');

   ///////////////////////////////////////memory clear keep in main
    for(var i in Memory.creeps) {       //
        if(!Game.creeps[i]) {           //
            delete Memory.creeps[i];    //
        }                               //
    }                                   //
   ///////////////////////////////////////
    for(var name in Game.rooms){
      Game.rooms[name].runRoom();
     //console.log(Game.rooms[name].memory.roomSpawn);
    }

} //end of main loop
