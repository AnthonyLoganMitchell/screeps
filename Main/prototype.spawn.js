Spawn.prototype.createMiner1 = function(homeRoom, energy) {
  const rand = Game.time.toString();
  var body = [];
  if (energy <= 300) {
    body = [MOVE];
    energy -= 50;
  } else if (energy <= 400) {
    body = [MOVE, WORK];
    energy -= 150;
  } else {
    body = [MOVE, WORK, WORK];
    energy -= 250;
  }

  const maxParts = Math.floor(energy / 100);

  //loop through and add carry and move parts the remaining allowed amount
  for (let i = 0; i < maxParts; ++i) {
    body.push(CARRY);
    body.push(WORK);
  }

  //create remoteHarvester
  this.spawnCreep(body, rand, {
    memory: {
      role: 'miner1',
      homeRoom: homeRoom,
      //   targetRoom: targetRoom
    }
  });
}
Spawn.prototype.createMiner2 = function(homeRoom, energy) {
	const rand = Game.time.toString();
  var body = [];
  if (energy <= 300) {
    body = [MOVE];
    energy -= 50;
  } else if (energy <= 400) {
    body = [MOVE, WORK];
    energy -= 150;
  } else {
    body = [MOVE, WORK, WORK];
    energy -= 250;
  }

  const maxParts = Math.floor(energy / 100);

  //loop through and add carry and move parts the remaining allowed amount
  for (let i = 0; i < maxParts; ++i) {
    body.push(CARRY);
    body.push(WORK);
  }

  //create remoteHarvester
  this.spawnCreep(body, rand, {
    memory: {
      role: 'miner2',
      homeRoom: homeRoom,
      //     targetRoom: targetRoom
    }
  });
}



Spawn.prototype.createHarvester = function(homeRoom, energy) {
  const rand = Game.time.toString();
  var body = [];
  const maxParts = Math.floor(energy / 100);

  //loop through and add carry and move parts the remaining allowed amount
  for (let i = 0; i < maxParts; ++i) {
    body.push(CARRY);
    body.push(MOVE);
  }

  //create remoteHarvester
  this.spawnCreep(body, rand, {
    memory: {
      role: 'harvester',
      homeRoom: homeRoom,
      //     targetRoom: targetRoom
    }
  });
}

Spawn.prototype.createBuilder = function(homeRoom, energy) {
  const rand = Game.time.toString();
  var body = [];
  if (energy <= 300) {
    body = [WORK];
    energy -= 100;

  } else {
    {
      body = [WORK, WORK];
      energy -= 200;
    }
  }

  const maxParts = Math.floor(energy / 100);

  //loop through and add carry and move parts the remaining allowed amount
  for (let i = 0; i < maxParts; ++i) {
    body.push(CARRY);
    body.push(MOVE);
  }

  //create remoteHarvester
  this.spawnCreep(body, rand, {
    memory: {
      role: 'builder',
      homeRoom: homeRoom,
      //     targetRoom: targetRoom
    }
  });

}

Spawn.prototype.createRepairer = function(homeRoom, energy) {
  const rand = Game.time.toString();
  var body = [];
  if (energy <= 300) {
    body = [WORK];
    energy -= 100;

  } else {
    {
      body = [WORK, WORK];
      energy -= 200;
    }
  }

  const maxParts = Math.floor(energy / 100);

  //loop through and add carry and move parts the remaining allowed amount
  for (let i = 0; i < maxParts; ++i) {
    body.push(CARRY);
    body.push(MOVE);
  }

  //create remoteHarvester
  this.spawnCreep(body, rand, {
    memory: {
      role: 'repairer',
      homeRoom: homeRoom,
      //     targetRoom: targetRoom
    }
  });
}

Spawn.prototype.createUpgrader = function(homeRoom, energy) {

  const rand = Game.time.toString();
  var body = [];
  if (energy <= 300) {
    body = [WORK];
    energy -= 100;

  } else {
    {
      body = [WORK, WORK];
      energy -= 200;
    }
  }

  const maxParts = Math.floor(energy / 100);

  //loop through and add carry and move parts the remaining allowed amount
  for (let i = 0; i < maxParts; ++i) {
    body.push(CARRY);
    body.push(MOVE);
  }

  //create remoteHarvester
  this.spawnCreep(body, rand, {
    memory: {
      role: 'upgrader',
      homeRoom: homeRoom,
      //     targetRoom: targetRoom
    }
  });
}
