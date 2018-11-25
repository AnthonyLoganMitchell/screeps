
Room.prototype.runRepairer= function(creep){
		var idleFlag = creep.room.find(FIND_FLAGS,{filter:(i)=>{return(i.name=='IdleFlag1');}});
    var structure = creep.room.find(FIND_STRUCTURES,{filter:(i)=>{return(i.structureType==STRUCTURE_TOWER
                                || i.structureType==STRUCTURE_CONTAINER
																|| i.structureType==STRUCTURE_SPAWN
                                || i.structureType==STRUCTURE_RAMPART) && i.hits< 2/10*i.hitsMax;}});
    var target_structure = creep.pos.findClosestByPath(structure);
	  var containers= creep.room.find(FIND_STRUCTURES,{filter:(i)=>{return(i.structureType==STRUCTURE_CONTAINER)}});
    var main_source= creep.pos.findClosestByPath(containers);
		//console.log('STRUC'+structure);
		//console.log('TAR_STRUC'+target_structure);
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
       } else if (target_structure == null){
				 creep.moveTo(idleFlag[0]);
			 }
    }
    if(creep.memory.task == true){
				 //console.log(creep.repair(target_structure));
         if(creep.repair(target_structure)==ERR_NOT_IN_RANGE){
            creep.moveTo(target_structure);
         } else if (target_structure == null){
					 creep.moveTo(idleFlag[0]);
				 }
    }
}
