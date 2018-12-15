Room.prototype.runHarvester = function(creep) {
  var targetsReal = [];
  var targetsTMP = [];
  var containers = [];
  var storage = Game.getObjectById(this.memory.roomStorageID);

  var roomTowersIDs = this.memory.roomTowersIDs;
  for (let i = 0; i < this.memory.roomExtensionsIDs.length; i++) {
    targetsTMP.push(this.memory.roomExtensionsIDs[i]);
  }
  for (let i = 0; i < this.memory.roomSpawnIDs.length; i++) {
    targetsTMP.push(this.memory.roomSpawnIDs[i]);
  }
  for (let i = 0; i < this.memory.roomTowersIDs.length; i++) {
    targetsTMP.push(this.memory.roomTowersIDs[i]);
  }
  for (let i = 0; i < this.memory.roomContainersIDs.length; i++) {
    containers.push(Game.getObjectById(this.memory.roomContainersIDs[i]));
  }
  for (let i = 0; i < targetsTMP.length; i++) {
    var tar = Game.getObjectById(targetsTMP[i]);
    if (tar.energy < tar.energyCapacity) {
      targetsReal.push(tar);
    }
  }
  var main_target = creep.pos.findClosestByPath(targetsReal);

	var main_withdraw;
  if (storage != "undefined" && storage.store[RESOURCE_ENERGY] > 0) {
    main_withdraw = storage;
  } else {
    main_withdraw = creep.pos.findClosestByPath(containers);
  }
  var main_deposit;
  if (storage != "undefined" && storage.store[RESOURCE_ENERGY] < storage.storeCapacity) {
    main_deposit = storage;
  } else {
    main_deposit = creep.pos.findClosestByPath(containers, {
      filter: (structure) => {
        return (structure.energy < structure.energyCapacity);
      }
    });
  }

  var idleFlag = creep.room.find(FIND_FLAGS, {
    filter: (i) => {
      return (i.name == 'IdleFlag1');
    }
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  if (creep.carry.energy < 1 / 2 * creep.carryCapacity && main_target != undefined) {
    if (creep.withdraw(main_withdraw, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(main_withdraw);
    }
  } else {
    if (main_target != undefined) {

      if (creep.transfer(main_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(main_target);
      }
    } else if (main_target == undefined && creep.carry.energy != 0) {
      if (creep.transfer(main_deposit, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && main_deposit != null) {
        creep.moveTo(main_deposit);
      } else {
        creep.moveTo(idleFlag[0]);
      }
    } else {
      creep.moveTo(idleFlag[0]);
    }
  }
}
