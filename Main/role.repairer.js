Room.prototype.runRepairer = function(creep) {
  //TODO: add resource deposit to this creep. If creep has energy and nothing to repair, deposit before returning to idle zone.
  var idleFlag;
  var roomFlags = [];
  var targetsReal = [];
  var targetsTMP = [];
  var containers = [];
  var roads = [];
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
  if (this.memory.roomContainersIDs != null) {
    for (let i = 0; i < this.memory.roomContainersIDs.length; i++) {
      containers.push(Game.getObjectById(this.memory.roomContainersIDs[i]));
			targetsTMP.push(this.memory.roomContainersIDs[i]);
    }
  }
  if (this.memory.roomTowersIDs != null) {
    for (let i = 0; i < this.memory.roomTowersIDs.length; i++) {
      targetsTMP.push(this.memory.roomTowersIDs[i]);
    }
  }
  if (this.memory.roomRampartsIDs != null) {
    for (let i = 0; i < this.memory.roomRampartsIDs.length; i++) {
      targetsTMP.push(this.memory.roomRampartsIDs[i]);
    }
  }
  if (this.memory.roomSpawnIDs != null) {
    for (let i = 0; i < this.memory.roomSpawnIDs.length; i++) {
      targetsTMP.push(this.memory.roomSpawnIDs[i]);
    }
  }
  if (this.memory.roomRoadsIDs != null) {
    for (let i = 0; i < this.memory.roomRoadsIDs.length; i++) {
      targetsTMP.push(this.memory.roomRoadsIDs[i]);
    }
  }
  for (let i = 0; i < targetsTMP.length; i++) {
    if (Game.getObjectById(targetsTMP[i]).structureType == STRUCTURE_RAMPART && Game.getObjectById(targetsTMP[i]).hits < 1 / 1000 * Game.getObjectById(targetsTMP[i]).hitsMax) {
      targetsReal.push(Game.getObjectById(targetsTMP[i]));
    } else if (Game.getObjectById(targetsTMP[i]).structureType != STRUCTURE_RAMPART && Game.getObjectById(targetsTMP[i]).hits < Game.getObjectById(targetsTMP[i]).hitsMax) {
      targetsReal.push(Game.getObjectById(targetsTMP[i]));
    }
  }
  var target_structure = creep.pos.findClosestByRange(targetsReal);

  var main_withdraw;
  if (storage != null && storage.store[RESOURCE_ENERGY] > 0) {
    main_withdraw = storage;
  } else {
    main_withdraw = creep.pos.findClosestByRange(containers, {filter: (i) => {
			return i.store[RESOURCE_ENERGY] > 1/2*i.storeCapacity;
		}});
  }
  //console.log(main_withdraw);
  if (!creep.memory.task && creep.carry.energy == 0) { // this is for new creeps to turn on
    creep.memory.task = true;
  }
  if (creep.memory.task && creep.carry.energy == 0) {
    creep.memory.task = false;
  }
  if (!creep.memory.task && creep.carry.energy == creep.carryCapacity) {
    creep.memory.task = true;
  }
  if (creep.memory.task == false) {
		//console.log(creep.withdraw(main_withdraw,RESOURCE_ENERGY));
    if (creep.withdraw(main_withdraw, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(main_withdraw);
    } else if (target_structure == null || target_structure == ERR_INVALID_TARGET) {
      creep.moveTo(idleFlag);
    }
  }
  if (creep.memory.task == true) {
    //console.log(creep.repair(target_structure));
    if (creep.repair(target_structure) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target_structure);
    } else if (target_structure == null) {
      creep.moveTo(idleFlag);
    }
  }
	//console.log(creep.memory.task);
}
