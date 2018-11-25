var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var withdraw_target = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER)&& structure.store[RESOURCE_ENERGY] >= 1/2*structure.storeCapacity;
                                
                    }
            });
           
        var idleFlag = creep.room.find(FIND_FLAGS,{filter:(i)=>{return(i.name=='IdleFlag1');}});
        
        var deposit_target = creep.room.find(FIND_STRUCTURES,{filter:(i)=>{return(i.structureType==STRUCTURE_CONTAINER)&&i.store[RESOURCE_ENERGY]<i.storeCapacity;}});
        var build_target = creep.room.find(FIND_CONSTRUCTION_SITES);    
        var spawn = creep.room.find(FIND_STRUCTURES,{filter:(i)=>{return(i.structureType==STRUCTURE_SPAWN);}});
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            console.log(creep.name+' 🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity && build_target.length > 0) {
	        creep.memory.building = true;
	        console.log(creep.name+' 🚧 build');
	    }


	    if(creep.memory.building) {
	        
	       
            if(build_target.length>0) {
                
                if(creep.build(build_target[0]) == ERR_NOT_IN_RANGE && creep.carry.energy != 0) {
                   creep.moveTo(build_target[0], {visualizePathStyle: {stroke: '#ffffff'}}); 
                   }
           
            }
            
            if(build_target.length==0 && creep.carry.energy >0){
                if(creep.transfer(deposit_target[0],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
                  creep.moveTo(deposit_target[0]);  
                }
            }
            
	    }
	    else{
	           if(build_target.length>0 && creep.withdraw(withdraw_target[0],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
	             creep.moveTo(withdraw_target[0])
                }else{
                    if(creep.carry.energy>0){
                       if(creep.transfer(deposit_target[0],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
                        creep.moveTo(deposit_target[0]);
                        }
                    }else{
                    creep.moveTo(idleFlag[0]);    
                    }
                }
            
	         
            }
    }
};

module.exports = roleBuilder;



	  /* if (creep.room.find(creep.memory.role == 'upgrader')){                                   //// THIS IS MY ROAD BUILDER BASED ON UPGRADERS/REPAIRERS.
	      // creep.say('BU: 16');
	       var upgraders = _.filter(Game.creeps,(creep) => creep.memory.role == 'upgrader');
	       var harvesters = _.filter(Game.creeps,(creep)=> creep.memory.role == 'harvester');
	       if (upgraders.pos != STRUCTURE_ROAD){
	          for (i=0; i< upgraders.length -1; i++){
	          creep.room.createConstructionSite(upgraders[i].pos, STRUCTURE_ROAD);
	          }
	       }
	       if (harvesters.pos != STRUCTURE_ROAD){
	           for (i=0; i< harvesters.length -1; i++){
	               creep.room.createConstructionSite(harvesters[i].pos, STRUCTURE_ROAD);
	           }
	       }
	   } */
         