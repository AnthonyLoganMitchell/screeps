var roleScout={
    run:function(creep,flag){
      var capture_flag = creep.room.find(FIND_FLAGS,{filter:(i)=>{return(i.name=='captureFlag1');}});
      var room_cont = creep.room.find(FIND_STRUCTURES,{filter:(i)=>{return(i.structureType==STRUCTURE_CONTROLLER && i.owner != 'smokums');}});
   
      if(flag!=capture_flag[0]){
        creep.moveTo(flag);
      }else{
          
          if(creep.claimController(room_cont[0])==ERR_NOT_IN_RANGE && creep.claimController(room_cont[0]) != ERR_GCL_NOT_ENOUGH){
              creep.moveTo(room_cont[0]);
              
            }else{
             
              if(creep.reserveController(room_cont[0])==ERR_NOT_IN_RANGE){
                creep.moveTo(room_cont[0]); 
              
              }
            }
          
      }
      
      
        
        
    }


};

module.exports = roleScout;