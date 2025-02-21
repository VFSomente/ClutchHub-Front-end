import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit, AfterViewInit {
  cadastroForm: FormGroup;
  loginForm: FormGroup;
  erroMensagem: string = '';
  containerClass: string = 'inactive';
  carregando: boolean = false; // Estado inicial como 'inactive'

  @ViewChild('container') container!: ElementRef;
  @ViewChild('registerBtn', { static: false }) registerBtn!: ElementRef;
  @ViewChild('loginBtn', { static: false }) loginBtn!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router,
    private cdRef:  ChangeDetectorRef
  ) {
    this.cadastroForm = this.fb.group({
      nickname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],

    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('LoginComponent inicializado.');
  

  // setTimeout(() => {
  //   this.cadastroForm.get('email')?.setErrors({ emailEmUso: true });
  //   this.cadastroForm.get('email')?.markAsTouched();
  //   console.log('Erro de teste adicionado ao email:', this.cadastroForm.get('email')?.errors);
  // }, 3000);
}


  ngAfterViewInit(): void {
    // Usando binding de eventos do Angular em vez de addEventListener
    if (this.registerBtn && this.registerBtn.nativeElement) {
      this.registerBtn.nativeElement.onclick = () => {
        this.containerClass = 'active';
      };
    }

    if (this.loginBtn && this.loginBtn.nativeElement) {
      this.loginBtn.nativeElement.onclick = () => {
        this.containerClass = 'inactive';
      };
    }
  }

  toggleForm(formType: string): void {
    this.containerClass = formType; // Alterna entre 'active' e 'inactive'
  }
  
  onSubmitCadastro(): void {
    if (this.cadastroForm.valid) {
      console.log('Cadastro enviado:', this.cadastroForm.value);
      const { nickname, email, senha } = this.cadastroForm.value;
      this.erroMensagem = '';

      this.authService.cadastrar(nickname, email, senha).subscribe({
        next: (usuario) => {
          console.log('Usuário cadastrado com sucesso:', usuario);
          this.usuarioService.setUsuario(usuario);
        },
        error: (err) => {
          console.error('Erro no cadastro:', err);
        
          if (err.status === 409) {
            this.cadastroForm.get('email')?.setErrors({ emailEmUso: true });
            this.cadastroForm.get('email')?.markAsTouched();
            this.cdRef.detectChanges(); // Força a atualização da tela
          } else {
            this.erroMensagem = 'Erro ao cadastrar usuário. Verifique os dados e tente novamente.';
          }
        }
      });
    } else {
      this.erroMensagem = 'Preencha todos os campos corretamente!';
    }
  }

  onSubmitLogin(): void {
    if (this.loginForm.invalid) {
      this.erroMensagem = 'Preencha todos os campos corretamente!';
      return;
    }
  
    this.erroMensagem = '';
    this.carregando = true;
  
    const { email, senha } = this.loginForm.value;
  
    this.authService.login(email, senha).subscribe({
      next: (response) => { // O response contém { token, usuario }
        console.log('Login bem-sucedido!', response.usuario);
        this.authService.salvarUsuarioLocal(response.usuario); // Salvando apenas o usuário
        this.usuarioService.setUsuario(response.usuario); // Setando no serviço de usuário
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.erroMensagem = err?.error?.message || 'Credenciais inválidas! Verifique seu email e senha.';
        console.error('Erro no login:', err);
      },
      complete: () => {
        this.carregando = false;
      }
    });
  }


  voltarInicio(): void {
    this.router.navigate(['/']);
  }
}