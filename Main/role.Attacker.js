Room.prototype.runAttacker = function(creep) {
  var attackFlag;
  var typeArr = [];
  var enemyCreeps = [];
  var enemyTowers = [];
	var enemySpawns = [];
	var enemyExtensions = [];
  //console.log(creep.room.controller.owner.username);
  //enemyCreeps = null;
  for (var i in Game.flags) {
    if (Game.flags[i].name == "attackFlag") {
      attackFlag = Game.flags[i]
    }
  }
	//console.log(attackFlag.pos.roomName);
  if (this.memory.enemyStructureIDs == undefined || creep.room.executeOnTicks(10)) {
    this.memory.enemyStructureIDs = [];
    var tmp = creep.room.find(FIND_HOSTILE_STRUCTURES);
    for (let i = 0; i < tmp.length; i++) {
      this.memory.enemyStructureIDs.push(tmp[i].id);
    }
  } else {
		for (let i = 0; i< this.memory.enemyStructureIDs.length; i++) {
			if (Game.getObjectById(this.memory.enemyStructureIDs[i]) != null && Game.getObjectById(this.memory.enemyStructureIDs[i]).structureType == STRUCTURE_TOWER) {
				enemyTowers.push(Game.getObjectById(this.memory.enemyStructureIDs[i]));
			}
			if (Game.getObjectById(this.memory.enemyStructureIDs[i]) != null && Game.getObjectById(this.memory.enemyStructureIDs[i]).structureType == STRUCTURE_SPAWN) {
				enemySpawns.push(Game.getObjectById(this.memory.enemyStructureIDs[i]));
			}
			if (Game.getObjectById(this.memory.enemyStructureIDs[i]) != null && Game.getObjectById(this.memory.enemyStructureIDs[i]).structureType == STRUCTURE_EXTENSION) {
				enemyExtensions.push(Game.getObjectById(this.memory.enemyStructureIDs[i]));
			}

		}
  }

	if (this.memory.enemyCreepIDs == undefined || creep.room.executeOnTicks(10)) {
    this.memory.enemyCreepIDs = [];
    var tmp = creep.room.find(FIND_HOSTILE_CREEPS);
    for (let i = 0; i < tmp.length; i++) {
      this.memory.enemyCreepIDs.push(tmp[i].id);
    }
  } else {
		for (let i = 0; i< this.memory.enemyCreepIDs.length; i++) {
			if (Game.getObjectById(this.memory.enemyCreepIDs[i]) != null) {
				enemyCreeps.push(Game.getObjectById(this.memory.enemyCreepIDs[i]));
			}
		}
  }

  if ((attackFlag != null || attackFlag != undefined)) {
    if (creep.room.name == attackFlag.pos.roomName) {
			if (enemyTowers[0] != undefined) {
				var target = creep.pos.findClosestByRange(enemyTowers);
				if (creep.attack(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				}
			} else if (enemyCreeps[0] != undefined) {
				var target = creep.pos.findClosestByRange(enemyCreeps);
				if (creep.attack(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				}
			} else if (enemySpawns[0] != undefined){
				var target = creep.pos.findClosestByRange(enemySpawns);
				if (creep.attack(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				}
			} else if (enemyExtensions[0] != undefined) {
				var target = creep.pos.findClosestByRange(enemyExtensions);
				if (creep.attack(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				}
			} else {
				creep.moveTo(attackFlag);
			}
    } else {
			creep.moveTo(attackFlag);
    }
  } else {
		creep.moveTo(Game.rooms[creep.memory.homeRoom].controller);
	}
}
