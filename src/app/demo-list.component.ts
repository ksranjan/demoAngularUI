import { Component, Input, OnInit } from '@angular/core';
import { DemoService } from './demo.service';
import { Demo } from './demo';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'demo-list',
  templateUrl: './demo-list.component.html'
})

export class DemoListComponent implements OnInit {
  demos: Demo[];
  newDemo: Demo = new Demo();
  editing: boolean = false;
  editingDemo: Demo = new Demo();

  constructor(
    private demoService: DemoService,
  ) {}

  ngOnInit(): void {
    this.getDemos();
  }

  getDemos(): void {
    this.demoService.getDemos()
      .then(demos => this.demos = demos );
  }

  createDemo(demoForm: NgForm): void {
    this.demoService.createDemo(this.newDemo)
      .then(createDemo => {
        demoForm.reset();
        this.newDemo = new Demo();
        this.demos.unshift(createDemo)
      });
  }

  deleteDemo(id: string): void {
    this.demoService.deleteDemo(id)
    .then(() => {
      this.demos = this.demos.filter(demo => demo.id != id);
    });
  }

  updateDemo(demoData: Demo): void {
    console.log(demoData);
    this.demoService.updateDemo(demoData)
    .then(updatedDemo => {
      let existingDemo = this.demos.find(demo => demo.id === updatedDemo.id);
      Object.assign(existingDemo, updatedDemo);
      this.clearEditing();
    });
  }

  toggleCompleted(demoData: Demo): void {
    demoData.completed = !demoData.completed;
    this.demoService.updateDemo(demoData)
    .then(updatedDemo => {
      let existingDemo = this.demos.find(demo => demo.id === updatedDemo.id);
      Object.assign(existingDemo, updatedDemo);
    });
  }

  editDemo(demoData: Demo): void {
    this.editing = true;
    Object.assign(this.editingDemo, demoData);
  }

  clearEditing(): void {
    this.editingDemo = new Demo();
    this.editing = false;
  }
}
