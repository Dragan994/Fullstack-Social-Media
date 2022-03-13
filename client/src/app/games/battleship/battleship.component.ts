import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-battleship',
  templateUrl: './battleship.component.html',
  styleUrls: ['./battleship.component.scss']
})
export class BattleshipComponent implements OnInit {
  battleShips = []
  battlefieldSize = {
    rows: 10,
    columns: 10
  }
  battlefieldMap = []

  constructor() { }

  ngOnInit(): void {
    this.generateBattlefieldMap(this.battlefieldSize)
    this.generateWarships(this.battlefieldSize)
  }


  generateBattlefieldMap(mapSize){
    let id = 0
    for(let i = 0;mapSize.rows > i; i++){
      const row = []
      for(let j = 0; mapSize.columns > j; j++ ){
        const fieldCell = {
          row: i,
          column: j,
          status: 'empty',
          id,
        }
        id++
        row.push(fieldCell)
      }
      this.battlefieldMap.push(row)
    }
    console.log(this.battlefieldMap)
  }

  generateWarships(mapSize){
    const maxFleetSize = this.battlefieldSize.rows + this.battlefieldSize.columns
    let rawBattleShips = []
    let fleetSize = 0

    let row =0
    function generateShip(){

    for(let i= 0; row >i; i++){
      
      for(let j=0; row-i > j; j++){
        rawBattleShips.push({size:i+1, cells:[]})
        fleetSize += i+1
        console.log(fleetSize)
      }
      
    }
    if(maxFleetSize > fleetSize){
      rawBattleShips = []
      row++
      generateShip()
    }else{
      return
    }
  }
  generateShip()
  this.battleShips = rawBattleShips
    console.log(maxFleetSize > fleetSize)
    console.log(fleetSize)
    console.log(rawBattleShips)
    const shipCells = []
    rawBattleShips.forEach((ship)=>{
      for(let i = 0; i < ship.size; i++){
        const cell = {}
        ship.cells.push(ship.size)
      }
      console.log(ship)
    })


  }

  logCell(bfCell){
    console.log(bfCell)
    const row = bfCell.row
    const column = bfCell.column
    // Mark cell
    console.log(this.battlefieldMap[row][column].marked = 'ship')




    const surroundCells ={
      top:[ {row: row-1 , column: column -1, corner: true},{row: row-1 , column: column}, {row: row-1 , column: column +1 ,corner: true} ],
      mid:[{row: row , column: column -1}, {row: row , column: column +1}],
      bot:[{row: row+1 , column: column -1, corner: true},{row: row+1 , column: column}, {row: row+1 , column: column +1, corner: true}]
    }

    for( let cellRow in surroundCells){
      surroundCells[cellRow]
      console.log(surroundCells[cellRow])
    }

    this.markCell(1,3)

  }


  markCell(row, column){
    this.battlefieldMap[row][column].marked = true

     console.log(this.battlefieldMap)
  }

}
