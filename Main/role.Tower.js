Room.prototype.runTower=function(tower){
		//console.log("Tower: "+tower);
		var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
		filter: (structure) => structure.hits < structure.hitsMax && (structure.structureType == STRUCTURE_ROAD
			|| structure.structureType == STRUCTURE_CONTAINER
			|| structure.structureType == STRUCTURE_STORAGE
			|| structure.structureType == STRUCTURE_ROAD)});
		var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(closestHostile) {
			tower.attack(closestHostile);
    }
    if(closestDamagedStructure) {
			tower.repair(closestDamagedStructure);
		}
}////
