import { Component, inject, ElementRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgxGridpatternComponent } from '@omnedia/ngx-gridpattern';

@Component({
	selector: 'app-search',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatRippleModule, MatIconModule, RouterLink, NgxGridpatternComponent],
	templateUrl: './search.component.html',
	styleUrl: './search.component.scss'
})
export class SearchComponent {
	@ViewChild('responseDiv') responseDiv: ElementRef | undefined;

	router = inject(Router);
	snackBar = inject(MatSnackBar);
	http = inject(HttpClient);

	imageSrc: string | ArrayBuffer | null = null;
	isClicked: boolean = false;
	buttonDisabled: boolean = false;

	prompt = new FormControl(
		{ value: 'What Sign Language Symbol is this?', disabled: true },
		[Validators.required]
	);
	responseData: string = '';
	file: FileList | null = null;
	uploadedFile: File | null = null;

	constructor() {

	}

	onImageUpload(event: Event): void {
		const fileInput = event.target as HTMLInputElement;
		const file = fileInput.files?.[0];

		if (file) {
			this.uploadedFile = file;
			const reader = new FileReader();
			reader.onload = () => {
				this.imageSrc = reader.result;
			};
			reader.readAsDataURL(file);
		}
	}

	onSubmit() {
		if(this.imageSrc) this.isClicked = true;
		if (!this.imageSrc) {
			this.openSnackBar("Upload an Image", 'OK');
		}
		else if (!this.prompt.value) {
			this.openSnackBar("Write a Prompt", 'OK');
		}
		else {
			const formData = new FormData();
			formData.append("prompt", this.prompt.value || '');

			if (this.uploadedFile) {
				formData.append("image", this.uploadedFile);
			}
			this.buttonDisabled = true;
			this.http.post("https://sign-language-detection-backend.onrender.com/chats", formData)
				.subscribe({
					next: (res: any) => {
						console.log(res.Response);
						this.responseData = res.Response;
						this.openSnackBar("Response Generated", "OK");
						this.buttonDisabled = false;
					},
					error: (error: HttpErrorResponse) => {
						this.openSnackBar('Server Error: ', 'OK');
					}
				});
		}
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, { duration: 3000 });
	}
}
