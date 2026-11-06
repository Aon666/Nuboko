import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkbenchComponent } from './workbench';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorkbenchComponent],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Nuboko');
  protected readonly rightWidth = signal(20);
  private isResizing = false;
  activeNoteContent = "This is a test";

  protected startResize(event: MouseEvent): void {
    this.isResizing = true;

    const mouseMoveListener = (e: MouseEvent) => {
      if (!this.isResizing) return;

      const newWidth = e.clientX;     
      
      this.rightWidth.set(newWidth);
    };

    const mouseUpListener = () => {
      this.isResizing = false;
      window.removeEventListener('mousemove', mouseMoveListener);
      window.removeEventListener('mouseup', mouseUpListener);
    };

    window.addEventListener('mousemove', mouseMoveListener);
    window.addEventListener('mouseup', mouseUpListener);
  }

  onContentChanged(newText: string) {
    this.activeNoteContent = newText;
  }
}
