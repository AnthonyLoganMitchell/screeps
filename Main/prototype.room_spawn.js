require('prototype.spawn');
Room.prototype.getNextCreepToSpawn = function() {
	this.memory.attackCondition = false;
  //console.log('GetNextCreepToSpawn:debug');
  var myCreepsInRoom = [];
  var globalCreeps = [];
  var globalAttackers = [];
  var attackFlag = null;
  var minMiners1, minMiners2, minHarvesters, minBuilders, minRemoteHarvesters, minUpgraders;
  var numMiners1, numMiners2, numHarvesters, numBuilders, numRemoteHarvesters, numUpgraders;
  var minAttackers;
  var numAttackers = 0;


  for (let i = 0; i < this.memory.myCreepsIDs.length; i++) {
    if (Game.getObjectById(this.memory.myCreepsIDs[i]) != null && Game.getObjectById(this.memory.myCreepsIDs[i]).room.name == this.name) {
      myCreepsInRoom.push(Game.getObjectById(this.memory.myCreepsIDs[i]));
      if (Game.getObjectById(this.memory.myCreepsIDs[i]).memory.role == 'attacker' && Game.getObjectById(this.memory.myCreepsIDs[i]).room.name == this.name) {
        numAttackers++;
      }
    }
  }

  var myConstructionSites = this.memory.roomConstructSitesIDs;
  var creepType = '';
  const roomState = this.memory.roomState;
  switch (roomState) {
    case 'ROOM_STATE_BEGINNER':
      minMiners1 = 1;
      minMiners2 = 1;
      minHarvesters = 1;
      minBuilders = 1;
      minUpgraders = 1;
      minRepairers = 1;
      minAttackers = 0;
      break;
    case 'ROOM_STATE_INTERMEDIATE':
      minMiners1 = 1;
      minMiners2 = 1;
      minHarvesters = 2;
      minBuilders = 1;
      minUpgraders = 1;
      minRepairers = 1;
      minAttackers = 0;
      break;
    case 'ROOM_STATE_ADVANCED':
      minMiners1 = 1;
      minMiners2 = 1;
      minHarvesters = 2;
      minBuilders = 1;
      minUpgraders = 1;
      minRepairers = 1;
      minAttackers = 3;
      break;
  }
	if (this.memory.attackCondition == undefined && numAttackers == minAttackers) {
		this.memory.attackCondition = true;
	} else if (this.memory.attackCondition == undefined && numAttackers < minAttackers){
		this.memory.attackCondition = false;
	} else if (this.memory.attackCondition != undefined && numAttackers == minAttackers) {
		this.memory.attackCondition = true;
	} else if (this.memory.attackCondition != undefined && numAttackers < minAttackers) {
		this.memory.attackCondition = false;
	}



  for (name in Game.creeps) {
    if (Game.creeps[name].room.name != this.name) {
      globalCreeps.push(Game.creeps[name]);
    }
  }
  for (let i = 0; i < globalCreeps.length; i++) {
    if (globalCreeps[i].memory.role === 'attacker' && globalCreeps[i].memory.homeRoom == this.name) {
      numAttackers++;
    }
  }
  for (i in Game.flags) {
    if (Game.flags[i].name == "attackFlag" && this.controller.pos.getRangeTo(Game.flags[i].pos) < 1000) {
      attackFlag = Game.flags[i];
    }
  }
  console.log("AttackFlag: " + attackFlag);

  //get num of miners
  numMiners1 = _.sum(myCreepsInRoom, c => c.memory.role === 'miner1');
  numMiners2 = _.sum(myCreepsInRoom, c => c.memory.role === 'miner2');
  console.log('numMiners1: ' + numMiners1.toString());
  console.log('numMiners2: ' + numMiners2.toString());
  //get num of harvesters
  numHarvesters = _.sum(myCreepsInRoom, c => c.memory.role === 'harvester');
  console.log('numHarvesters: ' + numHarvesters.toString());
  //get num of Builders
  numBuilders = _.sum(myCreepsInRoom, c => c.memory.role === 'builder');
  console.log('numBuilders: ' + numBuilders.toString());

  numRepairers = _.sum(myCreepsInRoom, c => c.memory.role === 'repairer');
  console.log('numRepairers: ' + numRepairers.toString());
  numUpgraders = _.sum(myCreepsInRoom, c => c.memory.role === 'upgrader');
  console.log('numUpgraders: ' + numUpgraders.toString());
  console.log('numAttackers: ' + numAttackers.toString());


  //get num of remote harvesters
  //numRemoteHarvesters = _.sum(creepsInRoom, c => c.memory.role === 'remoteHarvester');


  //check state of room to decide what creep priorities are
  switch (roomState) {
    case 'ROOM_STATE_BEGINNER':
      //run through priority of creeps looking for first one that is below the desired limit
      if (numMiners1 < minMiners1) {
        creepType = 'miner1';
        break;
      } else if (numMiners2 < minMiners2) {
        creepType = 'miner2';
        break;
      } else if (numBuilders < minBuilders && myConstructionSites.length > 0 && myConstructionSites != null) {
        creepType = 'builder';
        break;
      } else if (numHarvesters < minHarvesters) {
        creepType = 'harvester';
        break;
      } else if (numUpgraders < minUpgraders) {
        creepType = 'upgrader';
        break;
      } else if (numRepairers < minRepairers) {
        creepType = 'repairer'
        break;
      }
      break;
      //----------

    case 'ROOM_STATE_INTERMEDIATE':
      //run through priority of creeps looking for first one that is below the desired limit
      if (numMiners1 < minMiners1) {
        creepType = 'miner1';
        break;
      } else if (numMiners2 < minMiners2) {
        creepType = "miner2"
        break;
      } else if (numHarvesters < minHarvesters) {
        creepType = 'harvester';
        break;
      } else if (numBuilders < minBuilders && myConstructionSites.length > 0 && myConstructionSites != null) {
        creepType = 'builder';
        break;
      } else if (numUpgraders < minUpgraders) {
        creepType = 'upgrader';
        break;
      } else if (numRepairers < minRepairers) {
        creepType = 'repairer'
        break;
      }
      break;
      //----------

    case 'ROOM_STATE_ADVANCED':
      //run through priority of creeps looking for first one that is below the desired limit
      if (numMiners1 < minMiners1) {
        creepType = 'miner1';
        break;
      } else if (numMiners2 < minMiners2) {
        creepType = 'miner2';
        break;
      } else if (numHarvesters < minHarvesters) {
        creepType = 'harvester';
        break;
      } else if (numBuilders < minBuilders && myConstructionSites.length > 0 && myConstructionSites != null) {
        creepType = 'builder';
        break;
      } else if (numUpgraders < minUpgraders) {
        //console.log('A:U');
        creepType = 'upgrader';
        break;
      } else if (numRepairers < minRepairers) {
        creepType = 'repairer'
        break;
      } else if (numAttackers < minAttackers && attackFlag != null) {
        creepType = 'attacker'
        break;
      }
      break;

    default:
      console.log("ERROR: " + this.name + " :: getNextCreepToSpawn received an unhandled roomState.");
      break;
  }
  return creepType;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////// TO DO!!!!!
Room.prototype.spawnNextCreep = function(creepType) {
  //get energy available and check if its enough for the cost of the creep
  //if so proceed with spawning
  const energyAvailable = this.energyAvailable;
  const creepEnergyCost = this.getCreepEnergyCost(creepType);
  console.log("CREEPCOST: " + creepEnergyCost);
  //console.log(creepEnergyCost);
  var creepsInRoom = this.memory.creepsInRoom;

  if (energyAvailable >= creepEnergyCost) {
    //get all spawns in the room
    var allSpawns = this.memory.roomSpawnIDs;
    var activeSpawn;

    //loop through spawns to find the first one currently available
    if (allSpawns != null) {
      for (let i = 0; i < allSpawns.length; i++) {
        if (!Game.getObjectById(allSpawns[i]).spawning) {
          activeSpawn = Game.getObjectById(allSpawns[i]);
        }
      }
    }

    //check which type of creep is being requested
    switch (creepType) {
      case 'miner1':
        //  console.log(creepType);
        //get miners in room
        var miners1InRoom = _.filter(creepsInRoom, c => c.memory.role === 'miner1');
        if (activeSpawn != null) {
          activeSpawn.createMiner1(this.name, creepEnergyCost);
        }

        break;

      case 'miner2':
        //      console.log(creepType);
        var miners2InRoom = _.filter(creepsInRoom, c => c.memory.role === 'miner2')
        if (activeSpawn != null) {
          activeSpawn.createMiner2(this.name, creepEnergyCost);
        }

        break;

      case 'harvester':
        //      console.log(creepType);
        //spawn harvester
        if (activeSpawn != null) {
          activeSpawn.createHarvester(this.name, creepEnergyCost);
        }
        //////////////////////<<<<<<<<<<<<
        break;

      case 'builder':
        //    console.log(creepType);
        //spawn worker
        if (activeSpawn != null) {
          activeSpawn.createBuilder(this.name, creepEnergyCost);
        }
        //////////////////////<<<<<<<<<<<<
        break;
      case 'repairer':
        if (activeSpawn != null) {
          activeSpawn.createRepairer(this.name, creepEnergyCost);
        }
        break;

      case 'upgrader':
        if (activeSpawn != null) {
          activeSpawn.createUpgrader(this.name, creepEnergyCost);
        }
      case 'attacker':
        if (activeSpawn != null) {
          activeSpawn.createAttacker(this.name, creepEnergyCost);
        }
      default:
        //something went wrong, print error message
        //    console.log("ERROR: " + this.name + " attempted to spawn a " + creepType + ", this is an invalid parameter.")
        break;
    }
  } else {
    //console.log("NOT ENOUGH");
  }




}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////TO DO!!!!!
Room.prototype.getCreepEnergyCost = function(creepType) {
  //console.log('GetCreepEnergyCost:debug');
  const roomState = this.memory.roomState;
  var energyCost;
  var energyCapacity = this.energyCapacityAvailable;
  var temp_energy;

  //check which type of creep is being requested
  switch (creepType) {
    case 'miner1':
      switch (roomState) {
        case 'ROOM_STATE_BEGINNER':
          if (energyCapacity >= 300) {
            temp_energy = 300;
          }
          energyCost = temp_energy;
          break;

        case 'ROOM_STATE_INTERMEDIATE':
          if (energyCapacity >= 400) {
            temp_energy = 400;
          }
          energyCost = temp_energy;
          break;

        case 'ROOM_STATE_ADVANCED':
          if (energyCapacity >= 500) {
            temp_energy = 500;
          }
          energyCost = temp_energy;
          break;



        default:
          //something went wrong, print error message
          //  console.log("ERROR: " + this.name + " :: getCreepEnergyCost received an unreadable room state: " + roomState);
          energyCost = 0;
          break;
      }
      break;
    case 'miner2':
      switch (roomState) {
        case 'ROOM_STATE_BEGINNER':
          if (energyCapacity >= 300) {
            temp_energy = 300;
          }
          energyCost = temp_energy;
          break;

        case 'ROOM_STATE_INTERMEDIATE':
          if (energyCapacity >= 400) {
            temp_energy = 400;
          }
          energyCost = temp_energy;
          break;

        case 'ROOM_STATE_ADVANCED':
          if (energyCapacity >= 500) {
            temp_energy = 500;
          }
          energyCost = temp_energy;
          break;



        default:
          //something went wrong, print error message
          //  console.log("ERROR: " + this.name + " :: getCreepEnergyCost received an unreadable room state: " + roomState);
          energyCost = 0;
          break;
      }
      break;
    case 'harvester':
      //check room state to decide the cost of the harvester
      switch (roomState) {
        case 'ROOM_STATE_BEGINNER':
          //beginner room, scale harvester cost and cap at 900 (1 work, 400 capacity)
          if (energyCapacity >= 200) {
            temp_energy = 200;
          }

          energyCost = temp_energy;
          break;


        case 'ROOM_STATE_INTERMEDIATE':
          //intermediate room, scale harvester cost and cap at 900 (1 work, 400 capacity)
          if (energyCapacity >= 300) {
            temp_energy = 300;
          }

          energyCost = temp_energy;
          break;


        case 'ROOM_STATE_ADVANCED':
          //advanced room, scale harvester cost and cap at 1100 (1 work, 500 capacity)
          if (energyCapacity >= 500) {
            temp_energy = 500;
          }

          energyCost = temp_energy;
          break;
          //----------

        default:
          //something went wrong, print error message
          //    console.log("ERROR: " + this.name + " :: getCreepEnergyCost received an unreadable room state: " + roomState);
          energyCost = 0;
          break;

      }


      break;
    case 'builder':
      //check room state to decide the cost of the harvester
      switch (roomState) {
        case 'ROOM_STATE_BEGINNER':
          //beginner room, scale worker, cap at 800 (4 work, 200 capacity)
          if (energyCapacity >= 300) {
            temp_energy = 300;
          }

          energyCost = temp_energy;
          break;
          //----------

        case 'ROOM_STATE_INTERMEDIATE':
          //intermediate room, scale worker, cap at 1100 (5 work, 300 capacity)
          if (energyCapacity >= 400) {
            temp_energy = 400;
          }

          energyCost = temp_energy;
          break;
          //----------

        case 'ROOM_STATE_ADVANCED':
          //advanced room, scale worker, cap at 1500 (5 work, 500 capacity)
          if (energyCapacity >= 400) {
            temp_energy = 400;
          }

          energyCost = temp_energy;
          break;
          //----------

        default:
          //something went wrong, print error message
          console.log("ERROR: " + this.name + " :: getCreepEnergyCost received an unreadable room state: " + roomState);
          energyCost = 0;
          break;

      }
      //-------------------

      break;
    case 'upgrader':
      switch (roomState) {
        case 'ROOM_STATE_BEGINNER':

          if (energyCapacity >= 200) {
            temp_energy = 200;
          }
          energyCost = temp_energy;
          break;
        case 'ROOM_STATE_INTERMEDIATE':

          if (energyCapacity >= 400) {
            temp_energy = 400;
          }
          energyCost = temp_energy;
          break;
        case 'ROOM_STATE_ADVANCED':

          if (energyCapacity >= 500) {
            temp_energy = 500;
          }
          energyCost = temp_energy;
          break;
        default:

          //something went wrong, print error message
          console.log("ERROR: " + this.name + " :: getCreepEnergyCost received an unreadable room state: " + roomState);
          energyCost = 0;
          break;
      }
      break;
    case 'repairer':
      //check room state to decide the cost of the harvester
      switch (roomState) {
        case 'ROOM_STATE_BEGINNER':
          //beginner room, scale harvester cost and cap at 900 (1 work, 400 capacity)
          if (energyCapacity >= 200) {
            temp_energy = 200;
          }
          energyCost = temp_energy;
          break;
        case 'ROOM_STATE_INTERMEDIATE':
          //intermediate room, scale harvester cost and cap at 900 (1 work, 400 capacity)
          if (energyCapacity >= 300) {
            temp_energy = 300;
          }
          energyCost = temp_energy;
          break;
        case 'ROOM_STATE_ADVANCED':
          //advanced room, scale harvester cost and cap at 1100 (1 work, 500 capacity)
          if (energyCapacity >= 400) {
            temp_energy = 400;
          }
          energyCost = temp_energy;
          break;
          //----------
        default:
          //something went wrong, print error message
          console.log("ERROR: " + this.name + " :: getCreepEnergyCost received an unreadable room state: " + roomState);
          energyCost = 0;
          break;
      }
      break;
    case 'upgrader':
      //check room state to decide the cost of the harvester
      switch (roomState) {
        case 'ROOM_STATE_BEGINNER':
          //beginner room, scale harvester cost and cap at 900 (1 work, 400 capacity)
          if (energyCapacity >= 200) {
            temp_energy = 200;
          }
          energyCost = temp_energy;
          break;
        case 'ROOM_STATE_INTERMEDIATE':
          //intermediate room, scale harvester cost and cap at 900 (1 work, 400 capacity)
          if (energyCapacity >= 300) {
            temp_energy = 300;
          }
          energyCost = temp_energy;
          break;
        case 'ROOM_STATE_ADVANCED':
          //advanced room, scale harvester cost and cap at 1100 (1 work, 500 capacity)
          if (energyCapacity >= 400) {
            temp_energy = 400;
          }
          energyCost = temp_energy;
          break;
          //----------
        default:
          //something went wrong, print error message
          //    console.log("ERROR: " + this.name + " :: getCreepEnergyCost received an unreadable room state: " + roomState);
          energyCost = 0;
          break;
      }
      break;
    case 'attacker':
      switch (roomState) {
        case 'ROOM_STATE_ADVANCED':
          if (energyCapacity >= 600) {
            temp_energy = 600;
          }
          energyCost = temp_energy;
          break;
        default:
          break;
      }
      break;
    default:
      //something went wrong, print error message
      //console.log("ERROR: " + this.name + " :: getCreepEnergyCost received an unreadable room state: " + roomState);
      energyCost = 0;
      break;
  }

  //return the decided energy cost of the creep
  return energyCost;
}
