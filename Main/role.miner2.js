Room.prototype.runMiner2 = function(creep) {
  var sources = [];
  var targetsTMP = [];
	var storage = [];
	if (this.memory.roomSourcesIDs != null) {
  for (let i = 0; i < this.memory.roomSourcesIDs.length; i++) {
    sources.push(Game.getObjectById(this.memory.roomSourcesIDs[i]));
  }
}
  if (this.memory.roomExtensionsIDs != null) {
    for (let i = 0; i < this.memory.roomExtensionsIDs.length; i++) {
			if (Game.getObjectById(this.memory.roomExtensionsIDs[i]).energy < Game.getObjectById(this.memory.roomExtensionsIDs[i]).energyCapacity) {
					targetsTMP.push(Game.getObjectById(this.memory.roomExtensionsIDs[i]));
			}
    }
  }
	if (this.memory.roomSpawnIDs != null) {
		for (let i = 0; i< this.memory.roomSpawnIDs.length; i++) {
			if (Game.getObjectById(this.memory.roomSpawnIDs[i]).energy < Game.getObjectById(this.memory.roomSpawnIDs[i]).energyCapacity) {
					targetsTMP.push(Game.getObjectById(this.memory.roomSpawnIDs[i]));
			}
		}
	}
	if (this.memory.roomContainersIDs != null) {
		for (let i = 0; i< this.memory.roomContainersIDs.length; i++) {
			storage.push(Game.getObjectById(this.memory.roomContainersIDs[i]));
		}
	}
	if (this.memory.roomStorageID != null) {
		storage.push(Game.getObjectById(this.memory.roomStorageID));
	}
	//TODO: Start right here with the overhaul.
  var main_storage = creep.pos.findClosestByPath(storage,{filter: (i) => {return (i.store[RESOURCE_ENERGY] < i.storeCapacity);}});

  if (creep.carry.energy < creep.carryCapacity) {
		if (this.memory.roomSourcesIDs != undefined && this.memory.roomSourcesIDs.length > 1 && creep.memory.homeRoom == this.name){
			creep.moveTo(sources[1]);
			creep.harvest(sources[1]);
		}else if (this.memory.roomSourcesIDs != undefined && this.memory.roomSourcesIDs.length == 1 && creep.memory.homeRoom == this.name){
			creep.moveTo(sources[0]);
			creep.harvest(sources[0]);
		}

  }
	var main_target = creep.pos.findClosestByRange(targetsTMP);
  if (creep.carry.energy == creep.carryCapacity) {
    if (creep.transfer(main_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && storage == null) {
      creep.moveTo(main_target);

    } else { /////////////////
      if (creep.transfer(main_storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(main_storage);
      }
    }
  }
}
