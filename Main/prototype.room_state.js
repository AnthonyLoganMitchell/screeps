require('prototype.room_spawn');
require('role.harvester');
require('role.upgrader');
require('role.builder');
require('role.repairer');
require('role.miner1');
require('role.miner2');
require('role.Tower');
require('role.Attacker');
require('role.RangedAttacker');
require('role.Scout');

Room.prototype.setRoomState = function() {
  //set controller level to room memory
  if (!this.memory.controllerLevel) {
    this.memory.controllerLevel = this.controller.level;
  } else if (this.memory.controllerLevel != this.controller.level) {
    this.memory.controllerLevel = this.controller.level;
  }

  //get containers in room

  var containers = this.memory.roomContainers;
  //console.log(this.name+' '+containers);

  //check what the main roomstate is and set it to this
  //container exists
  if (containers != undefined) {
    //storage exists
    if (this.memory.roomStorage != undefined) {
      //stage 3 room, advanced
      this.memory.roomState = "ROOM_STATE_ADVANCED";
    } else {
      //stage two room, getting there
      this.memory.roomState = "ROOM_STATE_INTERMEDIATE";
    }
  } else {
    //stage 1 room, beginner
    this.memory.roomState = "ROOM_STATE_BEGINNER";
  }


}
/////////////////////////////////////////////////////////////////////////////

Room.prototype.setRoomObjects = function() {
  //containers, constructionSites, towers, ramparts, walls, spawns, extensions, terminals, creeps, sources, roads

  var controllerLevel = this.controller.level;

  var enemyCreeps = this.find(FIND_HOSTILE_CREEPS);
  if (enemyCreeps != undefined) {
    this.memory.enemyCreeps = enemyCreeps;
  }
  //creep in room
  var myCreepsInRoom = this.find(FIND_MY_CREEPS);
  if (myCreepsInRoom != undefined) {
    this.memory.myCreepsInRoom = myCreepsInRoom;
  }
  var roomRoads = this.find(FIND_STRUCTURES, {
    filter: (i) => {
      return (i.structureType == STRUCTURE_ROAD);
    }
  });
  if (roomRoads != undefined) {
    this.memory.roomRoads = roomRoads;
  }
  var roomConstructSites = this.find(FIND_CONSTRUCTION_SITES);

  if (roomConstructSites != undefined) {
    this.memory.roomConstructSites = roomConstructSites;
  }

  var roomSpawn = this.find(FIND_MY_SPAWNS);
  if (roomSpawn != undefined) {
    this.memory.roomSpawn = roomSpawn;
  }


  if (controllerLevel > 1) {

    var roomContainers = this.find(FIND_STRUCTURES, {
      filter: (i) => {
        return (i.structureType == STRUCTURE_CONTAINER);
      }
    });
    if (roomContainers != undefined) {
      this.memory.roomContainers = roomContainers;
    }
    var roomRamparts = this.find(FIND_MY_STRUCTURES, {
      filter: (i) => {
        return (i.structureType == STRUCTURE_RAMPART);
      }
    });
    if (roomRamparts != undefined) {
      this.memory.roomRamparts = roomRamparts;
    }
    var roomWalls = this.find(FIND_STRUCTURES, {
      filter: (i) => {
        return (i.structureType == STRUCTURE_WALL);
      }
    });
    if (roomWalls != undefined) {
      this.memory.roomWalls = roomWalls;
    }
    var roomExtensions = this.find(FIND_MY_STRUCTURES, {
      filter: (i) => {
        return (i.structureType == STRUCTURE_EXTENSION);
      }
    });
    if (roomExtensions != undefined) {
      this.memory.roomExtensions = roomExtensions;
    }

  }

  if (controllerLevel > 2) { /// level 2 controller
    var roomTowers = this.find(FIND_STRUCTURES, {
      filter: (i) => {
        return (i.structureType == STRUCTURE_TOWER);
      }
    });
    if (roomTowers != undefined) {
      this.memory.roomTowers = roomTowers;
    }
  }

  if (controllerLevel > 4) {
    var roomLinks = this.find(FIND_MY_STRUCTURES, {
      filter: (i) => {
        return (i.structureType == STRUCTURE_LINK);
      }
    });
    if (roomLinks != undefined) {
      this.memory.roomLinks = roomLinks;
    }
  }
  if (controllerLevel > 5) {
    var roomExtractors = this.find(FIND_MY_STRUCTURES, {
      filter: (i) => {
        return (i.structureType == STRUCTURE_EXTRACTOR);
      }
    });
    if (roomExtractors != undefined) {
      this.memory.roomExtractors = roomExtractors;
    }
    var roomTerminal = this.find(FIND_MY_STRUCTURES, {
      filter: (i) => {
        return (i.structureType == STRUCTURE_TERMINAL);
      }
    });
    if (roomTerminal != undefined) {
      this.memory.roomTerminal = roomTerminal;
    }

    var roomLabs = this.find(FIND_MY_STRUCTURES, {
      filter: (i) => {
        return (i.structureType == STRUCTURE_LAB);
      }
    });
    if (roomLabs != undefined) {
      this.memory.roomLabs = roomLabs;
    }
  }
  if (controllerLevel > 7) {
    var roomObservers = this.find(FIND_MY_STRUCTURES, {
      filter: (i) => {
        return (i.structureType == STRUCTURE_OBSERVER);
      }
    });
    if (roomObservers != undefined) {
      this.memory.roomObservers = roomObservers;
    }
  }

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Room.prototype.executeOnTicks = function(ticks) {
  //reduces cpu load on specific ticks by shifting the true tick for each room based on controller position
  return (Game.time + this.controller.pos.x + this.controller.pos.y) % ticks === 0;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Room.prototype.runRoom = function() {
  //console.log('run_room:debug');
  this.setRoomObjects();
  var creepsInRoom = this.memory.myCreepsInRoom;
	//console.log(creepsInRoom);
  var towersInRoom = this.memory.roomTowers;
  if (this.executeOnTicks(5)) {
    this.setRoomState();
  }

  var temp = this.getNextCreepToSpawn();

  this.spawnNextCreep(temp);
  for (var i in towersInRoom) {
		//console.log(towersInRoom[i])
    this.runTower(towersInRoom[i]);
  }
  for (var name in Game.creeps) { //
		var creep = Game.creeps[name];
    //console.log(creepsInRoom[name].memory.role);
    if (creep.memory.role == 'harvester') { //
      this.runHarvester(creep); //
    } //
    if (creep.memory.role == 'upgrader') { ///////(CREEP_RUN_LOOP)
      this.runUpgrader(creep); //
    } //
    if (creep.memory.role == 'builder') { //
      this.runBuilder(creep); //
    }
    if (creep.memory.role == 'repairer') {
      this.runRepairer(creep);
    }
    if (creep.memory.role == 'miner1') {
      this.runMiner1(creep);
    }
    if (creep.memory.role == 'miner2') {
      this.runMiner2(creep);
    }
    if (creep.memory.role == 'attacker') {
      this.runAttacker(creep, attack_flag);
    }
    if (creep.memory.role == 'ranged_attacker') {
      this.runRangedAttacker(creep, attack_flag_2);
    }
    if (creep.memory.role == 'scout') {
      this.runScout(creep, capture_flag);
    }

  }

}
