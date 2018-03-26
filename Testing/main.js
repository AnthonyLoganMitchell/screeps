
module.exports.loop = function () {

    var attack_flag = Game.flags.attackFlag1; //melee
    var attack_flag_2 = Game.flags.attackFlag2;//range
    var capture_flag = Game.flags.captureFlag1;//scout
    var construction_num=0;
   ///////////////////////////////////////memory clear keep in main
    for(var i in Memory.creeps) {       //
        if(!Game.creeps[i]) {           //
            delete Memory.creeps[i];    //
        }                               //
    }                                   //
   ///////////////////////////////////////
    for(var name in Game.rooms){
      Game.rooms[name].runRoom();
    }




} //end of main loop
