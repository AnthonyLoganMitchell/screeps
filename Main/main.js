require('prototype.room_state');
module.exports.loop = function() {
  for (var name in Game.rooms) {
    Game.rooms[name].runRoom();
  }
} //end of main loop
