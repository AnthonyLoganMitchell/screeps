Room.prototype.setRoomState ={
  //set controller level to room memory
 if (!this.memory.controllerLevel) {
     this.memory.controllerLevel = this.controller.level;
 }
 else if (this.memory.controllerLevel != this.controller.level) {
     this.memory.controllerLevel = this.controller.level;
 }

 //get containers in room
 var containers = this.memory.roomContainers;

 //check what the main roomstate is and set it to this
 //container exists
 if (containers != undefined) {
     //storage exists
     if (this.room.storage != undefined) {
         //stage 3 room, advanced
         this.memory.roomState = "ROOM_STATE_ADVANCED";
     }
     else {
         //stage two room, getting there
         this.memory.roomState = "ROOM_STATE_INTERMEDIATE";
     }
 }
 else {
     //stage 1 room, beginner
     this.memory.roomState = "ROOM_STATE_BEGINNER"
 }


}
/////////////////////////////////////////////////////////////////////////////

Room.prototype.setRoomObjects={
  //containers, constructionSites, towers, ramparts, walls, spawns, extensions, terminals, creeps, sources, roads
  var controllerLevel = this.controllerLevel;

  //creep in room
  var myCreepsInRoom = this.find(FIND_MY_CREEPS);
  if (myCreepsInRoom != undefined){
    this.memory.myCreepsInRoom = myCreepsInRoom;
  }
  var roomConstructSites = this.find(FIND_CONSTRUCTION_SITES);

  if (roomConstructSites != undefined){
    this.memory.rooomConstructSites = roomConstructSites;
  }

    var roomSpawn = this.find(FIND_MY_SPAWNS);
  if (roomSpawn != undefined){
    this.memory.roomSpawn=roomSpawn;
  }


  if(controllerLevel > 1){
    var roomContainers = this.find(FIND_STRUCTURES,{filter:(i)=>{return(i.structureType==STRUCTURE_CONTAINER);}});
    if (controllerLevel != undefined){
      this.memory.roomContainers = roomContainers;
    }
    var roomRamparts = this.find(FIND_MY_STRUCTURES,{filter(i)=>{return(i.structureType==STRUCTURE_RAMPART);}});
    if (roomRamparts!=undefined){
      this.memory.roomRamparts = roomRamparts;
    }
    var roomWalls = this.find(FIND_STRUCTURES,{filter(i)=>{return(i.structureType==STRUCTURE_WALL);}});
    if (roomWalls!=undefined){
      this.memory.roomWalls=roomWalls;
    }
    var roomExtensions = this.find(FIND_MY_STRUCTURES,{filter(i)=>{return(i.structureType==STRUCTURE_EXTENSION);}});
    if (roomExtensions!=undefined){
      this.memory.roomExtensions=roomExtensions;
    }

  }

  if(controllerLevel >2){ /// level 2 controller
    var roomTowers = this.find(FIND_STRUCTURES,{filter:(i)=>{return(i.structureType==STRUCTURE_TOWER);}});
    if (roomTowers != undefined){
      this.memory.roomTowers = roomTowers;
    }
  }
  if(controllerLevel > 3){
    var roomStorage = this.find(FIND_MY_STRUCTURES,{filter:(i)=>{return(i.structureType==STRUCTURE_STORAGE);}});
    if (roomStorage!=undefined){
      this.memory.roomStorage = roomStorage;
    }
  }





}

Room.prototype.executeOnTicks={
// will do based on contoller pos
}

Room.prototype.runRoom={

}
