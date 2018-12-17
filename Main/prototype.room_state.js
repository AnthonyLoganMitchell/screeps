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

Room.prototype.runRoom = function() {
	//console.log(this.memory.roomContainersIDs);
  var towersInRoom = [];
  var spawnsInRoom = [];
  var type;
  if (this.executeOnTicks(10)) {
    console.log("Room_update: " + this.name)
    this.setRoomState();
		this.setRoomCreeps();
    this.setRoomObjects();
		this.setConstructionSites();

    type = this.getNextCreepToSpawn();
    if (type != '') {
      this.spawnNextCreep(type);
    }
  }
	//console.log(this.memory.roomFlagsNames);
  if (this.memory.roomSpawnIDs != null) {
    for (let i = 0; i < this.memory.roomSpawnIDs.length; i++) {
      spawnsInRoom.push(Game.getObjectById(this.memory.roomSpawnIDs[i]));
    }
  }
  if (this.memory.roomTowersIDs != null) {
    for (let i = 0; i < this.memory.roomTowersIDs.length; i++) {
      towersInRoom.push(Game.getObjectById(this.memory.roomTowersIDs[i]));
    }
  }

  for (let i = 0; i < this.memory.myCreepsInRoom.length; i++) {
    if ((Game.getObjectById(this.memory.myCreepsInRoom[i]) == null || this.memory.myCreepsInRoom == null) && !spawnsInRoom[0].spawning) {
      this.setRoomCreeps();
      type = this.getNextCreepToSpawn();
      if (type != '') {
        this.spawnNextCreep(type);
      }
    }
  }

  for (var i in towersInRoom) {
    this.runTower(towersInRoom[i]);
  }
  for (var name in Memory.creeps) {
    var creep = Game.creeps[name];
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      this.setRoomCreeps();
      continue;
    }
    switch (creep.memory.role) {
      case 'harvester':
        this.runHarvester(creep);
        break;
      case 'upgrader':
        this.runUpgrader(creep);
        break;
      case 'builder':
        this.runBuilder(creep);
        break;
      case 'repairer':
        this.runRepairer(creep);
        break;
      case 'miner1':
        this.runMiner1(creep);
        break
      case 'miner2':
        this.runMiner2(creep);
        break
      case 'attacker':
        this.runAttacker(creep, attack_flag);
        break;
      case 'ranged_attacker':
        this.runRangedAttacker(creep, attack_flag_2);
        break;
      case 'scout':
        this.runScout(creep, capture_flag);
        break;
    }
  }
}
//SETROOMSTATE
Room.prototype.setRoomState = function() {
  //set controller level to room memory
	if (!this.memory.roomName){
		this.memory.roomName = this.name;
	}
  if (!this.memory.controllerLevel) {
    this.memory.controllerLevel = this.controller.level;
  } else if (this.memory.controllerLevel != this.controller.level) {
    this.memory.controllerLevel = this.controller.level;
  }
  var containers = this.memory.roomContainers;
  if (containers != undefined) {
    if (this.memory.roomStorageID != undefined) {
    this.memory.roomState = "ROOM_STATE_ADVANCED";
    } else {
      this.memory.roomState = "ROOM_STATE_INTERMEDIATE";
    }
  } else {
    this.memory.roomState = "ROOM_STATE_BEGINNER";
  }
}
//SETROOMCREEPS
Room.prototype.setRoomCreeps = function() {
  ///////////////////////////////////////////////////////////////
  this.memory.enemyCreeps = []; ///
  this.memory.myCreepsInRoom = []; ///
  var enemyCreeps = this.find(FIND_HOSTILE_CREEPS); ///
  if (enemyCreeps != undefined) { ///
    for (let i = 0; i < enemyCreeps.length; i++) { ///
      this.memory.enemyCreeps.push(enemyCreeps[i].id); ///
    } ///
  } ///
  //creep in room																						///
  var myCreepsInRoom = this.find(FIND_MY_CREEPS); ///
  if (myCreepsInRoom != undefined) { ///
    for (let i = 0; i < myCreepsInRoom.length; i++) { ///
      this.memory.myCreepsInRoom.push(myCreepsInRoom[i].id) ///
    } ///
  } ///
}
//SETROOMOBJECTS
Room.prototype.setRoomObjects = function() {
  //containers,extensions, constructionSites, towers, ramparts, walls, spawns, extensions, terminals, creeps, sources, roads
	//DONE///////////////////////////////////////////////////SOURCES
	this.memory.roomSourcesIDs = [];
	var roomSources = this.find(FIND_SOURCES);
	if (roomSources != undefined) {
		for (let i =0; i< roomSources.length; i++) {
			this.memory.roomSourcesIDs.push(roomSources[i].id);
		}
	}
	//DONE///////////////////////////////////////////////////SOURCES_END

  var controllerLevel = this.controller.level;
  //DONE////////////////////////////////////////////////// ROADS
  this.memory.roomRoadsIDs = [];
  var roomRoads = this.find(FIND_STRUCTURES, {
    filter: (i) => {
      return (i.structureType == STRUCTURE_ROAD);
    }
  });
  if (roomRoads != undefined) {
    for (let i = 0; i < roomRoads.length; i++) {
      this.memory.roomRoadsIDs.push(roomRoads[i].id);
    }
  }
  //DONE////////////////////////////////////////////////////ROADS_END

  //DONE//////////////////////////////////////////////////////// SPAWN
  this.memory.roomSpawnIDs = [];
  var roomSpawn = this.find(FIND_MY_SPAWNS);
  if (roomSpawn != undefined) {
    this.memory.roomSpawnIDs.push(roomSpawn[0].id);
  }
  //DONE/////////////////////////////////////////////////////// SPAWN_END

    //DONE////////////////////////////////////////////////////////////CONTAINERS
    this.memory.roomContainersIDs = [];
    var roomContainers = this.find(FIND_STRUCTURES, {
      filter: (i) => {
        return (i.structureType == STRUCTURE_CONTAINER);
      }
    });
    if (roomContainers != undefined) {
      for (let i = 0; i < roomContainers.length; i++) {
        this.memory.roomContainersIDs.push(roomContainers[i].id);
      }
    }
    //DONE///////////////////////////////////////////////////////////CONTAINERS_END

    //DONE///////////////////////////////////////////////////////////RAMPARTS
    this.memory.roomRampartsIDs = [];
    this.memory.roomRamparts = [];
    var roomRamparts = this.find(FIND_MY_STRUCTURES, {
      filter: (i) => {
        return (i.structureType == STRUCTURE_RAMPART);
      }
    });
    if (roomRamparts != undefined) {
      for (let i = 0; i < roomRamparts.length; i++) {
        this.memory.roomRampartsIDs.push(roomRamparts[i].id);
      }
    }
    //DONE///////////////////////////////////////////////////////////RAMPARTS_END

    //DONE///////////////////////////////////////////////////////////WALLS
    this.memory.roomWallsIDs = [];
    this.memory.roomWalls = [];
    var roomWalls = this.find(FIND_STRUCTURES, {
      filter: (i) => {
        return (i.structureType == STRUCTURE_WALL);
      }
    });
    if (roomWalls != undefined) {
      for (let i = 0; i < roomWalls.length; i++) {
        this.memory.roomWallsIDs.push(roomWalls[i].id);
      }
    }
    //DONE///////////////////////////////////////////////////////////WALLS_END

    //DONE///////////////////////////////////////////////////////////EXTENSIONS
    this.memory.roomExtensionsIDs = [];
    this.memory.roomExtensions = [];
    var roomExtensions = this.find(FIND_MY_STRUCTURES, {
      filter: (i) => {
        return (i.structureType == STRUCTURE_EXTENSION);
      }
    });
    if (roomExtensions != undefined) {
      for (let i = 0; i < roomExtensions.length; i++) {
        this.memory.roomExtensionsIDs.push(roomExtensions[i].id);
      }
    }
    //DONE/////////////////////////////////////////////////////////////EXTENSIONS_END


  if (controllerLevel > 2) { /// level 3 or higher controller
    this.memory.roomTowersIDs = [];
    //DONE///////////////////////////////////////////////////////TOWERS
    var roomTowers = this.find(FIND_STRUCTURES, {
      filter: (i) => {
        return (i.structureType == STRUCTURE_TOWER);
      }
    });
    if (roomTowers != undefined) {
      //console.log("debug: "+roomTowers)
      for (let i = 0; i < roomTowers.length; i++) {
        this.memory.roomTowersIDs.push(roomTowers[i].id)
      }
    }
  } // Level 3 or higher controller_end
  //DONE////////////////////////////////////////////////////////TOWERS_END
  if (controllerLevel > 4) { // Level 5 or higher controller
    //DONE////////////////////////////////////////////////////////LINKS
    this.memory.roomLinksIDs = [];
    var roomLinks = this.find(FIND_MY_STRUCTURES, {
      filter: (i) => {
        return (i.structureType == STRUCTURE_LINK);
      }
    });
    if (roomLinks != undefined) {
      for (let i = 0; i < roomLinks.length; i++) {
        this.memory.roomLinksIDs.push(roomLinks[i].id);
      }
    }
    //DONE//////////////////////////////////////////////////////////LINK_END

    //DONE//////////////////////////////////////////////////////////STORAGE
    var storage = this.storage.id;
    if (storage != null) {
      this.memory.roomStorageID = storage;
    }
    //DONE//////////////////////////////////////////////////////////STORAGE_END
  } // Level 5 or higher controller_end
  if (controllerLevel > 5) { // Level 6 or higher controller
    //DONE//////////////////////////////////////////////////////////EXTRACTOR
    this.memory.roomExtractorsIDs = [];
    var roomExtractors = this.find(FIND_MY_STRUCTURES, {
      filter: (i) => {
        return (i.structureType == STRUCTURE_EXTRACTOR);
      }
    });
    if (roomExtractors != undefined) {
      for (let i = 0; i < roomExtractors.length; i++) {
        this.memory.roomExtractorsIDs.push(roomExtractors[i].id);
      }
    }
    //DONE//////////////////////////////////////////////////////////EXTRACTOR_END

    //DONE//////////////////////////////////////////////////////////TERMINAL
    this.memory.roomTerminalIDs = [];
    var roomTerminal = this.find(FIND_MY_STRUCTURES, {
      filter: (i) => {
        return (i.structureType == STRUCTURE_TERMINAL);
      }
    });
    if (roomTerminal != undefined) {
      for (let i = 0; i < roomTerminal.length; i++) {
        this.memory.roomTerminalIDs.push(roomTerminal[i].id);
      }
    }
    //DONE//////////////////////////////////////////////////////////TERMINAL_END

    //DONE//////////////////////////////////////////////////////////LABS
    this.memory.roomLabsIDs = [];
    var roomLabs = this.find(FIND_MY_STRUCTURES, {
      filter: (i) => {
        return (i.structureType == STRUCTURE_LAB);
      }
    });
    if (roomLabs != undefined) {
      for (let i = 0; i < roomLabs.length; i++) {
        this.memory.roomLabsIDs.push(roomLabs[i].id);
      }
    }
    //DONE//////////////////////////////////////////////////////////LABS_END
  } // Level 6 or higher controller_end
  if (controllerLevel > 7) { // Level 8 or higher controller_end
    this.memory.roomObserversIDs = [];
    var roomObservers = this.find(FIND_MY_STRUCTURES, {
      filter: (i) => {
        return (i.structureType == STRUCTURE_OBSERVER);
      }
    });
    if (roomObservers != undefined) {
      for (let i = 0; i < roomObservers.length; i++) {
        this.memory.roomObservers = roomObservers;
      }
    }
  } // Level 8 or higher controller_end
}
//CONSTRUCTIONSITES
Room.prototype.setConstructionSites = function() {
	//DONE/////////////////////////////////////////////////////////// CONSTRUCTIONSITES
  this.memory.roomConstructSitesIDs = [];
  var roomConstructSites = this.find(FIND_CONSTRUCTION_SITES);
  if (roomConstructSites != undefined) {
    for (let i = 0; i < roomConstructSites.length; i++) {
      this.memory.roomConstructSitesIDs.push(roomConstructSites[i].id);
    }
  }
  //DONE/////////////////////////////////////////////////////// CONSTRUCTIONSITES_END
}
//EXECUTEONTICKS
Room.prototype.executeOnTicks = function(ticks) {
  //reduces cpu load on specific ticks by shifting the true tick for each room based on controller position
  return (Game.time + this.controller.pos.x + this.controller.pos.y) % ticks === 0;
}
