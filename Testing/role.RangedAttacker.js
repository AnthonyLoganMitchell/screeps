var roleRangedAttacker={
    
    run:function(creep,flag){
        var attack_flag = creep.room.find(FIND_FLAGS,{filter:(i)=>{return(i.name=='attackFlag2');}});
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var target_structures = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
        //console.log(target);
       if(attack_flag[0] != flag){
         
        creep.moveTo(flag);   
       }else{
           
           if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE){
               creep.moveTo(target);
           }else{
               
               if(creep.rangedAttack(target_structures) == ERR_NOT_IN_RANGE && target_structures != null){
                   creep.moveTo(target_structures);
               }
           }
       }
       
        
        
    }
    
    



};
module.exports = roleRangedAttacker;