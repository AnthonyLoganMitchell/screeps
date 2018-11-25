var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
       
        var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                                
                    }
            });
        var main_target = creep.pos.findClosestByPath(targets);
        var source_withdraw = creep.room.find(FIND_STRUCTURES,{filter:(structure)=> {return(structure.structureType== STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY]>0 ;}});
        var main_withdraw = creep.pos.findClosestByPath(source_withdraw);
        var source_deposit = creep.room.find(FIND_STRUCTURES,{filter:(structure)=> {return(structure.structureType== STRUCTURE_CONTAINER || structure.structureType==STRUCTURE_STORAGE)&& structure.store[RESOURCE_ENERGY] < structure.storeCapacity || structure.energy< structure.energyCapacity ;}});
	    var main_deposit = creep.pos.findClosestByPath(source_deposit);
	    var idleFlag = creep.room.find(FIND_FLAGS,{filter:(i)=>{return(i.name=='IdleFlag1');}});
	  //////////////////////////////////////////////////////////////////////////////////////////////////////
	  
	  
	    if(creep.carry.energy < 1/2 * creep.carryCapacity && main_target!=null) {
	       
           
            if(creep.withdraw(main_withdraw,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
               creep.moveTo(main_withdraw);
            }
            /*else{
                if(creep.withdraw(source_withdraw[1],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
                   creep.moveTo(source_withdraw[1]);
                }
            }*/
            
            
        }
        
        else {
        
        
            if(targets.length > 0) {
                
                if(creep.transfer(main_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && main_target.structureType == STRUCTURE_SPAWN) {
                    console.log(creep.name+' rch: spawn');
                    creep.moveTo(main_target);
                    
                } 
                
                if(creep.transfer(main_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && main_target.structureType == STRUCTURE_EXTENSION) {
                    console.log(creep.name+' rch: ext');
                    creep.moveTo(main_target);
                    
                } 
                if(creep.transfer(main_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && main_target.structureType == STRUCTURE_TOWER) {
                    console.log(creep.name+' rch: tow');
                    creep.moveTo(main_target);
                }
            
            }else if(targets.length == 0 && creep.carry.energy != 0){
              
                    if(creep.transfer(main_deposit,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && main_deposit!= null){
                        creep.moveTo(main_deposit);  
                    }
                   
                
            }else{
             creep.moveTo(idleFlag[0]);
            }
        }///
	   
	}
};

module.exports = roleHarvester;