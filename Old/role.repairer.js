var roleRepairer = {
run: function(creep){
    var spawn = creep.room.find(FIND_STRUCTURES,{filter:(i)=>{return(i.structureType==STRUCTURE_SPAWN);}});
    var structure = creep.room.find(FIND_STRUCTURES,{filter:(i)=>{return(i.structureType==STRUCTURE_TOWER 
                                || i.structureType==STRUCTURE_CONTAINER
                                || i.structureType==STRUCTURE_RAMPART) && i.hits< 2/10*i.hitsMax;}});
    var main_structure = creep.pos.findClosestByPath(structure);                            
    var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN
                               );
                    }
            });
    var main_target= creep.pos.findClosestByPath(targets);
    var containers= creep.room.find(FIND_STRUCTURES,{filter:(i)=>{return(i.structureType==STRUCTURE_CONTAINER)}});
    var main_source= creep.pos.findClosestByPath(containers);
     if(!creep.memory.task && creep.carry.energy == 0){ // this is for new creeps to turn on
         creep.memory.task = true;
     }
    
     if(creep.memory.task && creep.carry.energy == 0) {
            creep.memory.task = false;
            console.log(creep.name+' 🔄 harvest');
	    }
	    if(!creep.memory.task && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.task = true;
	        console.log(creep.name+' Repair');
	    }

  
    
    if(creep.memory.task == false){
       
       if(creep.withdraw(main_source,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
         creep.moveTo(main_source);
       }

        
    } 
    if(creep.memory.task == true){
        
            
         if(creep.repair(main_structure)==ERR_NOT_IN_RANGE){
            creep.moveTo(main_structure);  
           }
       
        
    }
    
    
   
}
};

module.exports = roleRepairer;