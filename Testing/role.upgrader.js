var roleUpgrader = {

    /** @param {Creep} creep **/
    
    run: function(creep) {
       var spawn = creep.room.find(FIND_STRUCTURES,{filter:(i)=>{return(i.structureType == STRUCTURE_SPAWN);}});
       var source = creep.room.find(FIND_STRUCTURES,{filter:(i)=>{return(i.structureType==STRUCTURE_EXTENSION)&& i.energy >= i.energyCapacity;}});
       var main_source = creep.pos.findClosestByPath(source);
       var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION||structure.structureType == STRUCTURE_SPAWN);
                                
                    }
            });
        var main_target = creep.pos.findClosestByPath(targets);
       // console.log('debug_upgrader_main_source: '+main_source);
       // console.log('debug_upgrader_main_target: '+main_target);
         
       
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            console.log(creep.name+' 🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        console.log(creep.name+' ⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
           
            if(creep.carry.energy < creep.carryCapacity){
                
                    
                    if(creep.withdraw(main_source,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(main_source);
                    }
                 
               
                
            }
            else{
            //creep.moveTo(Game.spawns['Spawn1']);
            creep.moveTo(spawn);
            }
            
        }
            
        
	}
};

module.exports = roleUpgrader;