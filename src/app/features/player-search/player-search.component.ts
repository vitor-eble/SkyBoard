import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SkyblockService } from '../../services/skyblock.service';

@Component({
  selector: 'app-player-search',
  standalone: false,
  templateUrl: './player-search.component.html',
  styleUrl: './player-search.component.css'
})
export class PlayerSearchComponent {

  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private skyBlockService: SkyblockService) {
      this.form =this.fb.group({
        playerNickname: ['', Validators.required]
      })
  }

  buscarPerfil(){
    const nickname = this.form.value.playerNickname;

    this.skyBlockService.getUUID(nickname).subscribe({
      next: (uuid: string) => {
        this.router.navigate(['/profile', uuid]);
      },
      error: (err) => {
        console.error('Error fetching UUID:', err);
        alert('Error fetching player data. Please check the nickname and try again.');
      }
    })


  }
}
