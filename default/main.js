var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleMiner1 = require('role.miner1');
var roleMiner2 = require('role.miner2');
var roleTowerCharger = require('role.towercharger');
var roleTower = require('role.Tower');
var roleAttacker = require('role.Attacker');
var roleRangedAttacker = require('role.RangedAttacker');
var roleScout = require('role.Scout');

module.exports.loop = function () {
    
    var attack_flag = Game.flags.attackFlag1; //melee
    var attack_flag_2 = Game.flags.attackFlag2;//range
    var capture_flag = Game.flags.captureFlag1;//scout
    
    var construction_num=0;
    
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
   
    
    
       
 
    
    ///////////////////////////////////////////////////////////////////////////////
    
   
    ///////////////////////////////////////////////////////////////////////////////
   
   /////////////////////////////////////////////////////////////////////////////////////////// 
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');    //
   // console.log('Harvesters: ' + harvesters.length);                                        //
                                                                                            //  
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');        //////(CREEP_FILTERS)
   // console.log('Builders: ' + builders.length);                                            //
                                                                                            //
    var upgraders = _.filter(Game.creeps,(creep) => creep.memory.role == 'upgrader');       //
   // console.log('Upgraders: ' + upgraders.length);                                          //
    
    var repairers = _.filter(Game.creeps,(creep) => creep.memory.role == 'repairer');
   // console.log('Repairers: ' + repairers.length);
    
    var miner1 =_.filter(Game.creeps, (creep) => creep.memory.role == 'miner1');
   // console.log('Miner1: ' + miner1.length);
    
    var miner2 =_.filter(Game.creeps, (creep) => creep.memory.role == 'miner2');
   // console.log('Miner2: ' + miner1.length);
    
    var towerchargers = _.filter(Game.creeps, (creep) => creep.memory.role =='tower_charger');
   // console.log('Tower_charger: '+ towerchargers.length);
   
    var attacker = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    
    var ranged_attacker = _.filter(Game.creeps, (creep) => creep.memory.role == 'ranged_attacker');
    
    var scout = _.filter(Game.creeps,(creep)=> creep.memory.role == 'scout');
    //////////////////////////////////////////////////////////////////////////////////////////
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
                                                                                                                
    if(harvesters.length < 2) {                                                                                 
        var newName = Game.spawns['MainSpawn'].createCreep([CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);                                                      
    }  
   
    if(miner1.length <2){ /// NEW FUNCTION
        var newName =Game.spawns['MainSpawn'].createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE],undefined, {role: 'miner1'}); 
        console.log('Spawning new miner1: ' + newName);
    }
  
    if(miner2.length<1){
        var newName = Game.spawns['MainSpawn'].createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE],undefined,{role:'miner2'});
        console.log('Spawning new miner2: '+ newName);
    }        
                                                                                                                 
                                                                                                             
    if (upgraders.length <1){
        var newName = Game.spawns['MainSpawn'].createCreep([WORK,WORK,CARRY,MOVE],undefined,{role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }
 
    if (builders.length < 0){                                                                                   
        var newName = Game.spawns['MainSpawn'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE],undefined, {role: 'builder'});   
        console.log('Spawning new builder : ' + newName);                                                       
    }
  
    if(repairers.length <1 ){                                                                                   
        var newName =Game.spawns['MainSpawn'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'repairer'});  
        console.log('Spawning new repairer: ' + newName);                                                       
    } 
    if(attack_flag){
        if(attacker.length <2){
            var newName = Game.spawns['MainSpawn'].createCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE],undefined,{role: 'attacker'});
        }
    }
    if(attack_flag_2){
        if(ranged_attacker.length <0){
            var newName = Game.spawns['MainSpawn'].createCreep([RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE],undefined,{role: 'ranged_attacker'});
        }
    }
    if(capture_flag){
        if(scout.length <1){
            var newName = Game.spawns['MainSpawn'].createCreep([CLAIM,MOVE],undefined,{role: 'scout'});
        }
    }
    
   
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
//////////////////////////////////////////////////
    for(var name in Game.creeps) {              //
        var creep = Game.creeps[name];          //
        if(creep.memory.role == 'harvester') {  //
            roleHarvester.run(creep);           //
        }                                       //
        if(creep.memory.role == 'upgrader') {   ///////(CREEP_RUN_LOOP)
            roleUpgrader.run(creep);            //
        }                                       //
        if(creep.memory.role == 'builder') {    //
            roleBuilder.run(creep);             //
        }
        if(creep.memory.role == 'repairer'){
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'miner1'){
            roleMiner1.run(creep);
        }
        if(creep.memory.role == 'miner2'){
            roleMiner2.run(creep);
        }
        if(creep.memory.role == 'attacker'){
            roleAttacker.run(creep,attack_flag);
        }
        if(creep.memory.role == 'ranged_attacker'){
            roleRangedAttacker.run(creep,attack_flag_2);
        }
        if(creep.memory.role == 'scout'){
            roleScout.run(creep,capture_flag);
        }
        
       roleTower.run(creep);
       
    }
   
       
        
   
    /////////////////////////////////////////////                                           
} //end of main loop