var roleTower = {
    run:function(creep){
        var tower = creep.room.find(FIND_STRUCTURES,{filter:(structure)=> {return(structure.structureType==STRUCTURE_TOWER);}});
        var ramparts = creep.room.find(FIND_STRUCTURES,{filter:(structure)=> {return(structure.structureType==STRUCTURE_RAMPART);}});
        var defence_call = Game.flags.attackFlag1;
        var defence_call2= Game.flags.attackFlag2;
        
         if(tower) {
            for(i=0;i<tower.length;i++){ 
                var closestDamagedStructure = tower[i].pos.findClosestByRange(FIND_STRUCTURES, {
                 filter: (structure) => structure.hits < structure.hitsMax && structure.structureType == STRUCTURE_ROAD 
                 });
        
                var closestDamagedStructure2 = tower[i].pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.structureType == STRUCTURE_CONTAINER
                });
        
                var closestDamagedStructure3 = tower[i].pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.structureType == STRUCTURE_STORAGE 
                });
              
                var closestDamagedStructure4 = tower[i].pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax && structure.structureType == STRUCTURE_RAMPART && structure.hits < 20000
                });
                var closestHostile = tower[i].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                //console.log(closestHostile);
                if(closestHostile) {
                    tower[i].attack(closestHostile);
                   // tower[i].room.createFlag(29,42,'attackFlag1');
                
                }
            
        
                if(closestDamagedStructure) {
                    tower[i].repair(closestDamagedStructure);
                }else if(closestDamagedStructure2){
                    tower[i].repair(closestDamagedStructure2);
                }else if(closestDamagedStructure3){
                    tower[i].repair(closestDamagedStructure3);
                }else if(closestDamagedStructure4){
                    tower[i].repair(closestDamagedStructure4);
                }
        

            
           
            }
        }
        
    }////
    
};
module.exports = roleTower;

