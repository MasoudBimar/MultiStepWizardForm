import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Select File';
  fileInfos?: Observable<any>;
  @Output() change: EventEmitter<File> = new EventEmitter<File>();

  // constructor(private uploadService: FileUploadService) {}
  constructor() {}

  ngOnInit(): void {
    // this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event: any): void {
    if (event.target?.files && event.target?.files[0]) {
      this.change.emit(event);
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.change.emit(undefined);
      this.fileName = 'Select File';
    }
  }

  remove(){
    this.currentFile = undefined;
    this.fileName = 'Select File';
    this.change.emit(undefined);

  }

  // upload(): void {
  //   this.progress = 0;
  //   this.message = '';

  //   if (this.currentFile) {
  //     this.uploadService.upload(this.currentFile).subscribe(
  //       (event: any) => {
  //         if (event.type === HttpEventType.UploadProgress) {
  //           this.progress = Math.round((100 * event.loaded) / event.total);
  //         } else if (event instanceof HttpResponse) {
  //           this.message = event.body.message;
  //           this.fileInfos = this.uploadService.getFiles();
  //         }
  //       },
  //       (err: any) => {
  //         console.log(err);
  //         this.progress = 0;

  //         if (err.error && err.error.message) {
  //           this.message = err.error.message;
  //         } else {
  //           this.message = 'Could not upload the file!';
  //         }

  //         this.currentFile = undefined;
  //       }
  //     );
  //   }
  // }
}

