import { Component, input, linkedSignal } from '@angular/core';
import { TaskItem } from '../../../models/task.model';
import { Check, EllipsisVertical, LucideAngularModule, ClipboardCheck } from 'lucide-angular';

@Component({
  selector: 'app-todo-list',
  imports: [LucideAngularModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  protected readonly CHECK = Check;
  protected readonly OPTIONS = EllipsisVertical;
  protected readonly EMPTY = ClipboardCheck;
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
