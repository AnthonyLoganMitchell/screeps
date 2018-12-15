Room.prototype.runMiner2= function(creep){
    var sources = creep.room.find(FIND_SOURCES);
    var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN
                                ) && structure.energy < structure.energyCapacity;

                    }
            });
		var storage = creep.room.storage;
    var containers= creep.room.find(FIND_STRUCTURES,{filter:(i)=>{return(i.structureType==STRUCTURE_CONTAINER || i.structureType == STRUCTURE_STORAGE)&& i.store[RESOURCE_ENERGY]<i.storeCapacity || i.energy < i.energyCapacity;}});
    var main_containers = creep.pos.findClosestByPath(containers);
    //console.log('miner1_container_search= '+containers[0]);

    if(creep.carry.energy < creep.carryCapacity){
      creep.moveTo(sources[1]);
        creep.harvest(sources[1]);
    }

    if(creep.carry.energy == creep.carryCapacity){
       if(creep.transfer(targets[0],RESOURCE_ENERGY) ==ERR_NOT_IN_RANGE){
          creep.moveTo(targets[0]);

        }else{/////////////////
            if(creep.transfer(main_containers ,RESOURCE_ENERGY)== ERR_NOT_IN_RANGE){
               creep.moveTo(main_containers);
            }
        }
   }
}
