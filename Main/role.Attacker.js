Room.prototype.runAttacker = function(creep,flag){
        var attack_flag = creep.room.find(FIND_FLAGS,{filter:(i)=>{return(i.name=='attackFlag1');}});
        var allies = creep.room.find(FIND_MY_CREEPS,{filter:(i)=>{return(i.memory.role == 'attacker');}});
        var my_controller_query = creep.room.find(FIND_STRUCTURES,{filter:(i)=>{return(i.structureType==STRUCTURE_CONTROLLER && i.owner !='smokums')}});
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var target_structures = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);

       if(attack_flag[0] != flag){

        creep.moveTo(flag);
       }else{

           if(creep.attack(target) == ERR_NOT_IN_RANGE){
               creep.moveTo(target);
           }
           else if(creep.attack(target_structures) == ERR_NOT_IN_RANGE && target_structures.structureType != STRUCTURE_CONTROLLER){
               creep.moveTo(target_structures);

             }else{
                creep.moveTo(flag);
             }



         }




}
