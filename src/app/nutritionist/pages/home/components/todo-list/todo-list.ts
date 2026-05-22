import { Component, input, linkedSignal } from '@angular/core';
import { TaskItem } from '../../../../models/task.model';
import {
  Check,
  EllipsisVertical,
  LucideAngularModule,
  ClipboardCheck,
  PlusIcon,
} from 'lucide-angular';
import { Button } from '../../../../../shared';

@Component({
  selector: 'app-todo-list',
  imports: [LucideAngularModule, Button],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  protected readonly CHECK = Check;
  protected readonly OPTIONS = EllipsisVertical;
  protected readonly EMPTY = ClipboardCheck;
  protected readonly PLUS = PlusIcon;

  taskList = input.required<TaskItem[]>();
  list = linkedSignal(() => this.taskList());

  protected toggleCompletion(index: number): void {
    this.list.update((prev) => {
      prev[index].isCompleted = !prev[index].isCompleted;
      return [...prev];
    });

    // send here
  }
}
