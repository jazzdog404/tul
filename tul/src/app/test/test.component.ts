import { Component, OnInit } from '@angular/core';
import { ExersizeService } from '../exersize.service';
import { Exersize } from '../exersize';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  status = 'ready to test';
  exersizes = Array<Exersize>();

  constructor(
    private exersizeService: ExersizeService,
  ) { }

  ngOnInit() {
  }

  exersizeCrud(): void {
    this.logMessage('starting exersize crud');
    this.logMessage('clearing all exersizes');
    for (const exersize of this.exersizeService.getAllExersizes().Values() ) {
      this.exersizeService.deleteExersize(exersize.name);
    }
    this.logMessage('adding  exersize "seated row"');
    const exersize1 = new Exersize();
    exersize1.name = 'seated row';
    this.exersizeService.addExersize(exersize1);
    this.loadExersizes();

    this.logMessage('adding  exersize "chest press"');
    const exersize2 = new Exersize();
    exersize2.name = 'chest press';
    this.exersizeService.addExersize(exersize2);
    this.loadExersizes();

    this.logMessage('adding  exersize "shoulder press"');
    const exersize3 = new Exersize();
    exersize3.name = 'shoulder press';
    this.exersizeService.addExersize(exersize3);
    this.loadExersizes();

    this.logMessage('deleting  exersize "chest press"');
    this.exersizeService.deleteExersize('chest press');
    this.loadExersizes();

    this.logMessage('deleting  exersize "shoulder press"');
    this.exersizeService.deleteExersize('shoulder press');
    this.loadExersizes();

    this.logMessage('deleting  exersize "seated row"');
    this.exersizeService.deleteExersize('seated row');
    this.loadExersizes();

    this.assert(this.exersizes.length === 0, 'exersize crud');

  }

  private logMessage(message: string): void {
    this.status = message;
  }

  private loadExersizes(): void {
    this.exersizes =  this.exersizeService.getAllExersizes().Values();
  }

  private assert(condition: boolean, testName: string): void {
    if (condition) {
      this.logMessage(testName + ' worked');
    } else {
      this.logMessage(testName + ' failed');
    }
  }
}