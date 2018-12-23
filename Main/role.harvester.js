Room.prototype.runHarvester = function(creep) {
  var idleFlag;
  var roomFlags = [];
  var targetsReal = [];
  var targetsTMP = [];
  var containers = [];
  var storage = Game.getObjectById(this.memory.roomStorageID);
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
  if (this.memory.roomExtensionsIDs != null) {
    for (let i = 0; i < this.memory.roomExtensionsIDs.length; i++) {
      targetsTMP.push(this.memory.roomExtensionsIDs[i]);
    }
  }
  if (this.memory.roomSpawnIDs != null) {
    for (let i = 0; i < this.memory.roomSpawnIDs.length; i++) {
      targetsTMP.push(this.memory.roomSpawnIDs[i]);
    }
  }
  if (this.memory.roomTowersIDs != null) {
    for (let i = 0; i < this.memory.roomTowersIDs.length; i++) {
      targetsTMP.push(this.memory.roomTowersIDs[i]);
    }
  }
  if (this.memory.roomContainersIDs != null) {
    for (let i = 0; i < this.memory.roomContainersIDs.length; i++) {
      containers.push(Game.getObjectById(this.memory.roomContainersIDs[i]));
    }
  }
	//console.log(containers);
  if (targetsTMP != null) {
    for (let i = 0; i < targetsTMP.length; i++) {
      var tar = Game.getObjectById(targetsTMP[i]);
      if (tar.energy < tar.energyCapacity) {
        targetsReal.push(tar);
      }
    }
  }
  var main_target = creep.pos.findClosestByRange(targetsReal);

  var main_withdraw = creep.pos.findClosestByRange(containers, {filter: (i) => {
		return(i.store[RESOURCE_ENERGY] > 1/4*i.storeCapacity);
	}});
  if ((main_withdraw == null && storage != null)&& storage.store[RESOURCE_ENERGY] > 0 && storage.room.name == creep.memory.homeRoom) {
    main_withdraw = storage;
  }

  var main_deposit;
  if (storage != null && storage.store[RESOURCE_ENERGY] < storage.storeCapacity && storage.room.name == creep.memory.homeRoom) {
    main_deposit = storage;
  } else {
    main_deposit = creep.pos.findClosestByRange(containers, {
      filter: (structure) => {
        return (structure.store[RESOURCE_ENERGY] < structure.energyCapacity);
      }
    });
  }
	//console.log(main_withdraw);
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  if (creep.carry.energy < 1 / 2 * creep.carryCapacity && main_target != null) {
    if (creep.withdraw(main_withdraw, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(main_withdraw);
    }else if (main_withdraw == null) {
			creep.moveTo(idleFlag);
		}
  } else {
    if (main_target != null) {
      if (creep.transfer(main_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(main_target);
      }
    } else if (main_target == null && creep.carry.energy != 0) {
      if (creep.transfer(main_deposit, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && main_deposit != null) {
        creep.moveTo(main_deposit);
      } else {
        creep.moveTo(idleFlag);
      }
    } else {
      creep.moveTo(idleFlag);
    }
  }
}
