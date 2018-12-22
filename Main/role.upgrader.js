Room.prototype.runUpgrader = function(creep) {
  var idleFlag;
  var roomFlags = [];
  var spawns = [];
  var sources = [];
	var extensions = [];
  for (var i in Game.flags) {
		if (Game.flags[i].room === this) {
      roomFlags.push(Game.flags[i]);
    }
  }
  for (let i = 0; i < roomFlags.length; i++) {
    if (roomFlags[i].color == COLOR_WHITE) {
      idleFlag = roomFlags[i];
    }
  }

  if (this.memory.roomSpawnIDs != null) {
    for (let i = 0; i < this.memory.roomSpawnIDs.length; i++) {
      spawns.push(Game.getObjectById(this.memory.roomSpawnIDs[i]));
    }
  }
  if (this.memory.roomContainersIDs != null) {
    for (let i = 0; i < this.memory.roomContainersIDs.length; i++) {
      sources.push(Game.getObjectById(this.memory.roomContainersIDs[i]));
    }
  }
  if (this.memory.roomExtensions != null) {
    for (let i = 0; i < this.memory.roomExtensionsIDs.length; i++) {
      extensions.push(Game.getObjectById(this.memory.roomExtensionsIDs[i]));
    }
  }
	var main_source = creep.pos.findClosestByRange(sources, {filter: (i) => {
		return i.store[RESOURCE_ENERGY] > 1/2*i.storeCapacity;
	}});

  if (creep.memory.upgrading && creep.carry.energy == 0) {
    creep.memory.upgrading = false;
  }
  if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
    creep.memory.upgrading = true;
  }
  if (creep.memory.upgrading) {
    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller);
    }
  } else {
    if (creep.carry.energy < creep.carryCapacity) {
      if (creep.withdraw(main_source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && main_source != null) {
        creep.moveTo(main_source);
      } else if (main_source == null) {
				var main_source_ext = creep.pos.findClosestByRange(extensions);
				if (creep.withdraw(main_source_ext, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && main_source_ext != null) {
					creep.moveTo(main_source_ext);
				} else {
					creep.moveTo(idleFlag);
				}
			}
    } else {
      creep.moveTo(idleFlag);
    }
  }
}
