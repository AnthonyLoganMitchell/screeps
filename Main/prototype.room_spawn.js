require('prototype.spawn');
Room.prototype.getNextCreepToSpawn = function() {
  //console.log('GetNextCreepToSpawn:debug');
  var myCreepsInRoom =[];
	for (let i=0; i<this.memory.myCreepsInRoom.length;i++) {
		if (Game.getObjectById(this.memory.myCreepsInRoom[i]) != null)
		myCreepsInRoom.push(Game.getObjectById(this.memory.myCreepsInRoom[i]))
	}
  var myConstructionSites = this.memory.roomConstructSites;
  var creepType= '';
  const roomState = this.memory.roomState;
  //console.log('roomState: '+roomState);

  var minMiners1, minMiners2, minHarvesters, minBuilders, minRemoteHarvesters, minUpgraders;
  var numMiners1, numMiners2, numHarvesters, numBuilders, numRemoteHarvesters, numUpgraders;

  //get num of miners
  numMiners1 = _.sum(myCreepsInRoom, c => c.memory.role === 'miner1');
  numMiners2 = _.sum(myCreepsInRoom, c => c.memory.role === 'miner2');
  console.log('numMiners1: '+numMiners1.toString());
	console.log('numMiners2: '+numMiners2.toString());
  //get num of harvesters
  numHarvesters = _.sum(myCreepsInRoom, c => c.memory.role === 'harvester');
	console.log('numHarvesters: '+numHarvesters.toString());
  //get num of Builders
  numBuilders = _.sum(myCreepsInRoom, c => c.memory.role === 'builder');
	console.log('numBuilders: '+numBuilders.toString());

  numRepairers = _.sum(myCreepsInRoom, c => c.memory.role === 'repairer');
	console.log('numRepairers: '+numRepairers.toString());
  numUpgraders = _.sum(myCreepsInRoom, c => c.memory.role === 'upgrader');
	console.log('numUpgraders: '+numUpgraders.toString());

  //get num of remote harvesters
  //numRemoteHarvesters = _.sum(creepsInRoom, c => c.memory.role === 'remoteHarvester');


  //check state of room to decide what creep priorities are
  switch (roomState) {
    case 'ROOM_STATE_BEGINNER':

      minMiners1 = 1;
      minMiners2 = 1;
      minHarvesters = 2;
      minBuilders = 1;
      minUpgraders = 1;
      //  minRemoteHarvesters = 0;

      //run through priority of creeps looking for first one that is below the desired limit
      if (numMiners1 < minMiners1) {
        //  console.log('B:M1');
        creepType = 'miner1';

      } else if (numMiners2 < minMiners2) {
        //  console.log('B:M2');
        creepType = 'miner2';

      } else if (numHarvesters < minHarvesters) {
        //    console.log('B:H');
        creepType = 'harvester';

      } else if (numBuilders < minBuilders && myConstructionSites[0] != undefined) {
        //  console.log('B:B');
        creepType = 'builder';

      } else if (numUpgraders < minUpgraders) {
        //  console.log('B:U');
        creepType = 'upgrader';

      }
      break;
      //----------

    case 'ROOM_STATE_INTERMEDIATE':

      minMiners1 = 1;
      minMiners2 = 1;
      minHarvesters = 2;
      minBuilders = 1;
      minUpgraders = 1;
      minRepairers = 1;
      //  minRemoteHarvesters = 0;

      //run through priority of creeps looking for first one that is below the desired limit
      if (numMiners1 < minMiners1) {
        //    console.log('I:M1');
        creepType = 'miner1';

      } else if (numMiners2 < minMiners2) {
        //  console.log('I:M2');
        creepType = "miner2"

      } else if (numHarvesters < minHarvesters) {
        //    console.log('I:H');
        creepType = 'harvester';

      } else if (numBuilders < minBuilders && myConstructionSites[0] != undefined) {
        //    console.log('I:B');
        creepType = 'builder';

      } else if (numUpgraders < minUpgraders) {
        //  console.log('I:U');
        creepType = 'upgrader';

      } else if (numRepairers < minRepairers) {
        creepType = 'repairer'
      }
      /*  if(numRemoteHarvesters < minRemoteHarvesters)
        {
            creepType = 'remoteHarvester';
            break;
        }*/
      break;
      //----------

    case 'ROOM_STATE_ADVANCED':

      minMiners1 = 1;
      minMiners2 = 1;
      minHarvesters = 2;
      minBuilders = 1;
      minUpgraders = 1;
      minRepairers = 1;
      //    minRemoteHarvesters = 0;

      //run through priority of creeps looking for first one that is below the desired limit
      if (numMiners1 < minMiners1) {
        //  console.log('A:M1');
        creepType = 'miner1';

      } else if (numMiners2 < minMiners2) {
        //console.log('A:M2');
        creepType = 'miner2';

      } else if (numHarvesters < minHarvesters) {
        //  console.log('A:H');
        creepType = 'harvester';

      } else if (numBuilders < minBuilders && myConstructionSites[0] != undefined) {
        //  console.log('A:B');
        creepType = 'builder';

      } else if (numUpgraders < minUpgraders) {
        //console.log('A:U');
        creepType = 'upgrader';

      } else if (numRepairers < minRepairers) {
        creepType = 'repairer'
      }
      /*  if(numRemoteHarvesters < minRemoteHarvesters)
        {
            creepType = 'remoteHarvester';
            break;
        }*/
      break;
      //----------

    default:
      //print error code
      console.log("ERROR: " + this.name + " :: getNextCreepToSpawn received an unhandled roomState.");
      break;
      //----------
  }
  //----------
  //console.log('creepType: ' + creepType);
  return creepType;


}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////// TO DO!!!!!

Room.prototype.spawnNextCreep = function(creepType) {
  //console.log('SpawnNextCreep:debug');
  //get energy available and check if its enough for the cost of the creep
  //if so proceed with spawning
  const energyAvailable = this.energyAvailable;
  const creepEnergyCost = this.getCreepEnergyCost(creepType);
  //console.log(creepEnergyCost);
  var creepsInRoom = this.memory.creepsInRoom;

  if (energyAvailable >= creepEnergyCost) {

    //get all spawns in the room
    var allSpawns = this.find(FIND_STRUCTURES, {
      filter: {
        structureType: STRUCTURE_SPAWN
      }
    });
    var activeSpawn;

    //loop through spawns to find the first one currently available
    for (let spawn in allSpawns) {
      if (!spawn.spawning) {
        activeSpawn = allSpawns[spawn];
      }
    }


    //check which type of creep is being requested
    switch (creepType) {
      case 'miner1':
        //  console.log(creepType);
        //get miners in room
        var miners1InRoom = _.filter(creepsInRoom, c => c.memory.role === 'miner1');
        if (activeSpawn != undefined) {
          activeSpawn.createMiner1(this.name, creepEnergyCost);
        }

        break;

      case 'miner2':
        //      console.log(creepType);
        var miners2InRoom = _.filter(creepsInRoom, c => c.memory.role === 'miner2')
        if (activeSpawn != undefined) {
          activeSpawn.createMiner2(this.name, creepEnergyCost);
        }

        break;

      case 'harvester':
        //      console.log(creepType);
        //spawn harvester
        if (activeSpawn != undefined) {
          activeSpawn.createHarvester(this.name, creepEnergyCost);
        }
        //////////////////////<<<<<<<<<<<<
        break;

      case 'builder':
        //    console.log(creepType);
        //spawn worker
        if (activeSpawn != undefined) {
          activeSpawn.createBuilder(this.name, creepEnergyCost);
        }
        //////////////////////<<<<<<<<<<<<
        break;
      case 'repairer':
        if (activeSpawn != undefined) {
          activeSpawn.createRepairer(this.name, creepEnergyCost);
        }
        break;

      case 'upgrader':
        if (activeSpawn != undefined) {
          activeSpawn.createUpgrader(this.name, creepEnergyCost);
        }

      default:
        //something went wrong, print error message
        //    console.log("ERROR: " + this.name + " attempted to spawn a " + creepType + ", this is an invalid parameter.")
        break;
    }
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
          if (energyCapacity > 300) {
            temp_energy = 300;
          }
          energyCost = temp_energy;
          break;

        case 'ROOM_STATE_INTERMEDIATE':
          if (energyCapacity > 400) {
            temp_energy = 400;
          }
          energyCost = temp_energy;
          break;

        case 'ROOM_STATE_ADVANCED':
          if (energyCapacity > 500) {
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
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    case 'miner2':
      switch (roomState) {
        case 'ROOM_STATE_BEGINNER':
          if (energyCapacity > 300) {
            temp_energy = 300;
          }
          energyCost = temp_energy;
          break;

        case 'ROOM_STATE_INTERMEDIATE':
          if (energyCapacity > 400) {
            temp_energy = 400;
          }
          energyCost = temp_energy;
          break;

        case 'ROOM_STATE_ADVANCED':
          if (energyCapacity > 500) {
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
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    case 'harvester':
      //check room state to decide the cost of the harvester
      switch (roomState) {
        case 'ROOM_STATE_BEGINNER':
          //beginner room, scale harvester cost and cap at 900 (1 work, 400 capacity)
          if (energyCapacity > 200) {
            temp_energy = 200;
          }

          energyCost = temp_energy;
          break;


        case 'ROOM_STATE_INTERMEDIATE':
          //intermediate room, scale harvester cost and cap at 900 (1 work, 400 capacity)
          if (energyCapacity > 250) {
            temp_energy = 250;
          }

          energyCost = temp_energy;
          break;


        case 'ROOM_STATE_ADVANCED':
          //advanced room, scale harvester cost and cap at 1100 (1 work, 500 capacity)
          if (energyCapacity > 300) {
            temp_energy = 300;
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
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    case 'builder':
      //check room state to decide the cost of the harvester
      switch (roomState) {
        case 'ROOM_STATE_BEGINNER':
          //beginner room, scale worker, cap at 800 (4 work, 200 capacity)
          if (energyCapacity > 300) {
            temp_energy = 300;
          }

          energyCost = temp_energy;
          break;
          //----------

        case 'ROOM_STATE_INTERMEDIATE':
          //intermediate room, scale worker, cap at 1100 (5 work, 300 capacity)
          if (energyCapacity > 400) {
            temp_energy = 400;
          }

          energyCost = temp_energy;
          break;
          //----------

        case 'ROOM_STATE_ADVANCED':
          //advanced room, scale worker, cap at 1500 (5 work, 500 capacity)
          if (energyCapacity > 400) {
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
      //--------------
    case 'upgrader':
      switch (roomState) {
        case 'ROOM_STATE_BEGINNER':

          if (energyCapacity > 200) {
            temp_energy = 200;
          }
          energyCost = temp_energy;
          break;
        case 'ROOM_STATE_INTERMEDIATE':

          if (energyCapacity > 400) {
            temp_energy = 400;
          }
          energyCost = temp_energy;
          break;
        case 'ROOM_STATE_ADVANCED':

          if (energyCapacity > 400) {
            temp_energy = 400;
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
          if (energyCapacity > 200) {
            temp_energy = 200;
          }

          energyCost = temp_energy;
          break;


        case 'ROOM_STATE_INTERMEDIATE':
          //intermediate room, scale harvester cost and cap at 900 (1 work, 400 capacity)
          if (energyCapacity > 250) {
            temp_energy = 250;
          }

          energyCost = temp_energy;
          break;


        case 'ROOM_STATE_ADVANCED':
          //advanced room, scale harvester cost and cap at 1100 (1 work, 500 capacity)
          if (energyCapacity > 300) {
            temp_energy = 300;
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
          if (energyCapacity > 200) {
            temp_energy = 200;
          }

          energyCost = temp_energy;
          break;


        case 'ROOM_STATE_INTERMEDIATE':
          //intermediate room, scale harvester cost and cap at 900 (1 work, 400 capacity)
          if (energyCapacity > 250) {
            temp_energy = 250;
          }

          energyCost = temp_energy;
          break;


        case 'ROOM_STATE_ADVANCED':
          //advanced room, scale harvester cost and cap at 1100 (1 work, 500 capacity)
          if (energyCapacity > 300) {
            temp_energy = 300;
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
    default:
      //something went wrong, print error message
      //console.log("ERROR: " + this.name + " :: getCreepEnergyCost received an unreadable room state: " + roomState);
      energyCost = 0;
      break;
  }

  //return the decided energy cost of the creep
  return energyCost;
}
