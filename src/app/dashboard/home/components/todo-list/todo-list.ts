import { Component, input } from '@angular/core';
import { TaskItem } from '../../../models/task.model';
import { Check, EllipsisVertical, LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'app-todo-list',
  imports: [LucideAngularModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  protected readonly CHECK = Check;
  protected readonly OPTIONS = EllipsisVertical;
  taskList = input.required<TaskItem[]>();
}
