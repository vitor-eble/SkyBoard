import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SkyblockService } from '../../services/skyblock.service';

@Component({
  selector: 'app-player-search',
  standalone: false,
  templateUrl: './player-search.component.html',
  styleUrl: './player-search.component.css',
})
export class PlayerSearchComponent implements OnInit {
  form!: FormGroup;
  private destroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private skyBlockService: SkyblockService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      playerNickname: ['', Validators.required],
    });
  }

  buscarPerfil() {
    const { playerNickname } = this.form.getRawValue();

    this.skyBlockService
      .getUUID(playerNickname)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (uuid: string) => {
          this.router.navigate(['/profile', uuid]);
        },
        error: (err) => {
          console.error('Error fetching UUID:', err);
          alert(
            'Error fetching player data. Please check the nickname and try again.'
          );
        },
      });
  }
}
