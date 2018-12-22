Room.prototype.runBuilder = function(creep) {
  var idleFlag;
  var roomFlags = [];
  var sites = [];
  var containers = [];
  var spawns =[];
  var storage = Game.getObjectById(this.memory.roomStorageID);
  for (var i in Game.flags) {
    if (Game.flags[i].room.name == this.name) {
      roomFlags.push(Game.flags[i]);
    }
  }
  for (let i = 0; i < roomFlags.length; i++) {
    if (roomFlags[i].color == COLOR_WHITE) {
      idleFlag = roomFlags[i];
    }
  }
	for (let i=0; i<this.memory.roomSpawnIDs.length; i++) {
		if (Game.getObjectById(this.memory.roomSpawnIDs[i]) != null) {
			spawns.push(Game.getObjectById(this.memory.roomSpawnIDs[i]));
		}
	}
  for (let i = 0; i < this.memory.roomConstructSitesIDs.length; i++) {
    if (Game.getObjectById(this.memory.roomConstructSitesIDs[i]) != null)
      sites.push(Game.getObjectById(this.memory.roomConstructSitesIDs[i]));
  }
  if (this.memory.roomContainersIDs != null) {
    for (let i = 0; i < this.memory.roomContainersIDs.length; i++) {
      if (Game.getObjectById(this.memory.roomContainersIDs[i]) != null) {
        containers.push(Game.getObjectById(this.memory.roomContainersIDs[i]));
      }
    }
  }
	
  var main_withdraw;
  if (storage != null && storage.store[RESOURCE_ENERGY] > 0) {
    main_withdraw = storage;
  } else if (containers.length >0) {
		main_withdraw = creep.pos.findClosestByRange(containers, {filter: (i) => {
			return i.store[RESOURCE_ENERGY] > 1/2*i.storeCapacity;
		}});
  } else {
		main_withdraw = creep.pos.findClosestByRange(spawns);
	}

  var main_deposit;
  if (storage != null && storage.store[RESOURCE_ENERGY] < storage.storeCapacity) {
    main_deposit = storage;
  } else {
    main_deposit = creep.pos.findClosestByPath(containers, {
      filter: (structure) => {
        return (structure.energy < structure.energyCapacity);
      }
    });
  }

  if (creep.memory.building && creep.carry.energy == 0) {
    creep.memory.building = false;
  }
  if (!creep.memory.building && creep.carry.energy == creep.carryCapacity && sites.length > 0) {
    creep.memory.building = true;
  }

  if (creep.memory.building) {
    if (sites.length > 0) {
      var build_target = creep.pos.findClosestByPath(sites)
      if (creep.build(build_target) == ERR_NOT_IN_RANGE && creep.carry.energy != 0) {
        creep.moveTo(build_target);
      }
    }

    if (sites.length == 0 && creep.carry.energy > 0) {
      if (creep.transfer(main_deposit, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(main_deposit);
      }
    }
  } else {
    if (sites.length > 0 && creep.withdraw(main_withdraw, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(main_withdraw);
    } else {
      if (creep.carry.energy > 0) {
        if (creep.transfer(main_deposit, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(main_deposit);
        }
      } else {
        creep.moveTo(idleFlag);
      }
    }
  }
}
