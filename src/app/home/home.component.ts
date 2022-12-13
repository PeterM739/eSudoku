import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { PuzzleModel } from '../models/puzzle';
import { SudokuService } from '../services/sudoku.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  puzzle!: PuzzleModel;
  dataForm!: UntypedFormGroup;
  solution!: any[][];
  solutionForm!: UntypedFormBuilder;
  currentGrid!: any[][];
  solvedCorrectly: boolean = false;
  solutionStatus!: number;
  screenSize!: number;
  @ViewChild('successWindow', { static: true }) successWindow!: any;
  @ViewChild('failedWindow', { static: true }) failedWindow!: any;
  @ViewChild('showHint', { static: true }) showHint!: any;
  @ViewChild('checkMiss', { static: true }) checkMiss!: any;
  @ViewChild('notSolved', { static: true }) notSolved!: any;
  @ViewChild('successfullySolved', { static: true }) successfullySolved!: any;

  constructor(
    private modalService: NgbModal,
    public translate: TranslateService,
    private sudokuService: SudokuService,
    private formBuilder: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.sudokuService.getPuzzle(1).subscribe(res => {
      this.puzzle = res
      this.buildForm(this.puzzle.grid)
    });
    this.screenSize = window.innerWidth;

  }

  onRightClick(event: MouseEvent, content: any) {
    event.preventDefault();
    this.openHint(content)
  }

  showHintWindow(row: number, col: number) {
    this.modalService.dismissAll()
    if (this.dataForm.get(`row${row}col${col}`)?.value == this.puzzle.solution[row][col]) {
      this.openHint(this.successWindow)
    } else {
      this.openHint(this.failedWindow)
    }
  }

  openHint(content: any) {
    this.modalService.open(content, { centered: true, size : 'sm' })
  }

  openChecker(content: any) {
    this.modalService.open(content, { centered: true, size : 'md' })
  }

  createNewArray() {
    const solution = [];
    for (let indexI = 0; indexI < 9; indexI++) {
      const row = []
      for (let indexJ = 0; indexJ < 9; indexJ++) {
        const col = this.dataForm.get(`row${indexI}col${indexJ}`)?.value
        row.push(col)
      }
      solution.push(row)
    }

    return solution;
  }

  open(content: any) {
    this.modalService.open(content)
  }

  decline() {
    this.modalService.dismissAll();
  }

  check() {
    this.solution = this.createNewArray()
    if (this.solution === this.puzzle.solution) {
      return true
    } else {
      return false
    }
  }

  getCssClass(row: number, col: number) {
    if (this.dataForm.get(`row${row}col${col}`)?.value != ' ') {
      return this.getBorderCssClass(row, col) + ' ' + 'bgGray'
    } else {
      return this.getBorderCssClass(row, col) 
    }
  }

  getBorderCssClass(row: number, col: number) {
    switch (row) {
      case 2:
      case 5:
      case 8:
        if (col == 8 || col == 5 || col == 2) {
          return 'thickBorderBottomLeftSide'
        } else if (col == 0) {
          return 'thickBorderBottomRightSide'
        } else {
          return 'thickBorderBottom'
        }

      case 0:
        if (col == 8 ||col == 5 || col == 2) {
          return 'thickBorderTopLeftSide'
        } else if (col == 0) {
          return 'thickBorderTopRightSide'
        } else {
          return 'thickBorderTop'
        }

      default:
        if (col == 8 ||col == 5 || col == 2) {
          return 'thickBorderLeft'
        } else if (col == 0) {
          return 'thickBorderRight'
        } else {
          return 'normalBorder'
        }
    }
  }

  switchLang(lang: string) {
    this.translate.use(lang);

    localStorage.setItem("language", lang)
  }

  solve() {
    this.modalService.dismissAll()
    this.buildForm(this.puzzle.solution)
    this.cd.detectChanges();
  }

  getNewSudoku(difficulty: number) {
    this.sudokuService.getPuzzle(difficulty).subscribe(res => {
      this.puzzle = res
      this.buildForm(this.puzzle.grid)
      this.solvedCorrectly = false
      this.cd.detectChanges();
    });
  }

  // openShowSolution(getValue: any) {
  //   this.modalService.open(getValue)
  // }

  checkSolution() {
    console.log(this.screenSize)
    const solution = this.createNewArray()
    this.solutionStatus = this.checkSolutionNumbers(solution, this.puzzle.solution)
    if (this.solutionStatus == 0) {
      this.openChecker(this.notSolved)
    } else if (this.solutionStatus == 2) {
      this.openChecker(this.checkMiss)
    } else {
      this.openChecker(this.successfullySolved)
    }
  }

  checkSolutionNumbers(solution: any[][], check: any[][]) {
    for (let indexRow = 0; indexRow < 9; indexRow++) {
      for (let indexCol = 0; indexCol < 9; indexCol++) {
        if (solution[indexRow][indexCol] == ' ') {
          return 2
        } else {
          if (solution[indexRow][indexCol] != check[indexRow][indexCol]) {
            return 0
          } else {
            continue
          }
        }
      }
    }
    this.solvedCorrectly = true
    return 1
  }

  buildForm(grid: any[][]) {
    this.dataForm = this.formBuilder.group({
      row0col0: [grid[0][0] ?? ''],
      row0col1: [grid[0][1] ?? ''],
      row0col2: [grid[0][2] ?? ''],
      row0col3: [grid[0][3] ?? ''],
      row0col4: [grid[0][4] ?? ''],
      row0col5: [grid[0][5] ?? ''],
      row0col6: [grid[0][6] ?? ''],
      row0col7: [grid[0][7] ?? ''],
      row0col8: [grid[0][8] ?? ''],
      row1col0: [grid[1][0] ?? ''],
      row1col1: [grid[1][1] ?? ''],
      row1col2: [grid[1][2] ?? ''],
      row1col3: [grid[1][3] ?? ''],
      row1col4: [grid[1][4] ?? ''],
      row1col5: [grid[1][5] ?? ''],
      row1col6: [grid[1][6] ?? ''],
      row1col7: [grid[1][7] ?? ''],
      row1col8: [grid[1][8] ?? ''],
      row2col0: [grid[2][0] ?? ''],
      row2col1: [grid[2][1] ?? ''],
      row2col2: [grid[2][2] ?? ''],
      row2col3: [grid[2][3] ?? ''],
      row2col4: [grid[2][4] ?? ''],
      row2col5: [grid[2][5] ?? ''],
      row2col6: [grid[2][6] ?? ''],
      row2col7: [grid[2][7] ?? ''],
      row2col8: [grid[2][8] ?? ''],
      row3col0: [grid[3][0] ?? ''],
      row3col1: [grid[3][1] ?? ''],
      row3col2: [grid[3][2] ?? ''],
      row3col3: [grid[3][3] ?? ''],
      row3col4: [grid[3][4] ?? ''],
      row3col5: [grid[3][5] ?? ''],
      row3col6: [grid[3][6] ?? ''],
      row3col7: [grid[3][7] ?? ''],
      row3col8: [grid[3][8] ?? ''],
      row4col0: [grid[4][0] ?? ''],
      row4col1: [grid[4][1] ?? ''],
      row4col2: [grid[4][2] ?? ''],
      row4col3: [grid[4][3] ?? ''],
      row4col4: [grid[4][4] ?? ''],
      row4col5: [grid[4][5] ?? ''],
      row4col6: [grid[4][6] ?? ''],
      row4col7: [grid[4][7] ?? ''],
      row4col8: [grid[4][8] ?? ''],
      row5col0: [grid[5][0] ?? ''],
      row5col1: [grid[5][1] ?? ''],
      row5col2: [grid[5][2] ?? ''],
      row5col3: [grid[5][3] ?? ''],
      row5col4: [grid[5][4] ?? ''],
      row5col5: [grid[5][5] ?? ''],
      row5col6: [grid[5][6] ?? ''],
      row5col7: [grid[5][7] ?? ''],
      row5col8: [grid[5][8] ?? ''],
      row6col0: [grid[6][0] ?? ''],
      row6col1: [grid[6][1] ?? ''],
      row6col2: [grid[6][2] ?? ''],
      row6col3: [grid[6][3] ?? ''],
      row6col4: [grid[6][4] ?? ''],
      row6col5: [grid[6][5] ?? ''],
      row6col6: [grid[6][6] ?? ''],
      row6col7: [grid[6][7] ?? ''],
      row6col8: [grid[6][8] ?? ''],
      row7col0: [grid[7][0] ?? ''],
      row7col1: [grid[7][1] ?? ''],
      row7col2: [grid[7][2] ?? ''],
      row7col3: [grid[7][3] ?? ''],
      row7col4: [grid[7][4] ?? ''],
      row7col5: [grid[7][5] ?? ''],
      row7col6: [grid[7][6] ?? ''],
      row7col7: [grid[7][7] ?? ''],
      row7col8: [grid[7][8] ?? ''],
      row8col0: [grid[8][0] ?? ''],
      row8col1: [grid[8][1] ?? ''],
      row8col2: [grid[8][2] ?? ''],
      row8col3: [grid[8][3] ?? ''],
      row8col4: [grid[8][4] ?? ''],
      row8col5: [grid[8][5] ?? ''],
      row8col6: [grid[8][6] ?? ''],
      row8col7: [grid[8][7] ?? ''],
      row8col8: [grid[8][8] ?? ''],
    })
  }
}
