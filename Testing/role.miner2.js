var roleMiner2 = {

run: function(creep){
    var spawn= creep.room.find(FIND_STRUCTURES,{filter:(i)=>{return(i.structureType == STRUCTURE_SPAWN);}});
    var structure= _.filter(creep.room.find(STRUCTURE_SPAWN),{structureType: STRUCTURE_SPAWN});
    var sources = creep.room.find(FIND_SOURCES);
    var hello = creep.memory.working;
    var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN||
                                structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
                                
                    }
            });
     var containers= creep.room.find(FIND_STRUCTURES,{filter:(i)=>{return(i.structureType==STRUCTURE_CONTAINER || i.structureType == STRUCTURE_STORAGE)&& i.store[RESOURCE_ENERGY]<i.storeCapacity || i.energy < i.energyCapacity;}});
     var main_containers = creep.pos.findClosestByPath(containers);
    if(creep.carry.energy < creep.carryCapacity){
       creep.moveTo(sources[1]);
       creep.harvest(sources[1]);
    }
    if(creep.carry.energy == creep.carryCapacity){
       if(creep.transfer(spawn[0],RESOURCE_ENERGY) ==ERR_NOT_IN_RANGE && spawn[0].energy < spawn[0].energyCapacity){
            creep.moveTo(spawn[0]);
        }else{/////////////////
            if(creep.transfer(main_containers,RESOURCE_ENERGY)== ERR_NOT_IN_RANGE){
               creep.moveTo(main_containers);
            }else{
                creep.transfer(main_containers,RESOURCE_ENERGY);
            }/////////////////
               
              
          
        }
     
   }
    
   
   
    
    
    
    
    
}


};
module.exports = roleMiner2;



/* if(creep.carry.energy == creep.carryCapacity){
      //  creep.say('mine 2.0')
        //creep.moveTo(Game.getObjectById('597aba57015b3337e2c8f8a1'))==ERR_NOT_IN_RANGE //THIS WAS IN THE IF STATEMENT BELOW
        if(creep.moveTo(Game.spawns['MainSpawn']) ==ERR_NOT_IN_RANGE){
          //creep.moveTo(Game.getObjectById('597aba57015b3337e2c8f8a1'));
            creep.moveTo(Game.spawns['MainSpawn']);
        }else{
         // creep.transfer(Game.getObjectById('597aba57015b3337e2c8f8a1'),RESOURCE_ENERGY);
            creep.transfer(Game.spawns['MainSpawn'],RESOURCE_ENERGY);
        }
        
    }*/