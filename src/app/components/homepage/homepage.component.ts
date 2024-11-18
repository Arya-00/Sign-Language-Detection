import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
	selector: 'app-homepage',
	standalone: true,
	imports: [MatIconModule, MatButtonModule, RouterLink],
	templateUrl: './homepage.component.html',
	styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
	router = inject(Router);
	navigate()
	{
		this.router.navigate(['/search']);
	}
}
