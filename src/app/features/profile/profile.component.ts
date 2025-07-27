import { Component } from '@angular/core';
import { SkyblockService } from '../../services/skyblock.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  uuid!: string;
  perfil!: any;
  erro: string | null = null;

  constructor(private skyblockService: SkyblockService, private route: ActivatedRoute) { }

  ngOnInit(){
    this.uuid = this.route.snapshot.paramMap.get('uuid') || '';
    this.skyblockService.getSkyblockProfile(this.uuid).subscribe({
      next: (res: any) => {
        this.perfil = res
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
        this.erro = 'Erro ao buscar perfil. Verifique o UUID e tente novamente.';
      }
    })
  }
}
