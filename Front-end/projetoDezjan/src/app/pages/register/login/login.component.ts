import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
  containerClass: string = 'inactive'; // Estado inicial como 'inactive'

  @ViewChild('container') container!: ElementRef;
  @ViewChild('registerBtn', { static: false }) registerBtn!: ElementRef;
  @ViewChild('loginBtn', { static: false }) loginBtn!: ElementRef;
  

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
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
  }

  // Implementação do ngAfterViewInit para manipulação de eventos no DOM
  ngAfterViewInit(): void {
    if (this.registerBtn && this.registerBtn.nativeElement) {
      this.registerBtn.nativeElement.addEventListener('click', () => {
        this.containerClass = 'active';
      });
    }

    if (this.loginBtn && this.loginBtn.nativeElement) {
      this.loginBtn.nativeElement.addEventListener('click', () => {
        this.containerClass = 'inactive';
      });
    }
  }

  toggleForm(formType: string): void {
    this.containerClass = formType;  // A variável é alterada entre 'active' e 'inactive'

  if (formType === 'active') {
    this.containerClass = 'active';  // Ativa o formulário de cadastro
  } else {
    this.containerClass = 'inactive';  // Ativa o formulário de login
  }
}
  onSubmitCadastro(): void {
    if (this.cadastroForm.valid) {
      console.log('Cadastro enviado:', this.cadastroForm.value);
      const { nickname, email, senha } = this.cadastroForm.value;

      this.authService.cadastrar(nickname,email,senha).subscribe({
        next: (usuario) => {
          console.log('Usuário cadastrado com sucesso:', usuario);
          this.usuarioService.setUsuario(usuario);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.erroMensagem = 'Erro ao cadastrar usuário.';
          console.error(err);
        }
      });
    } else {
      this.erroMensagem = 'Preencha todos os campos corretamente!';
    }
  }

  onSubmitLogin(): void {
    if (this.loginForm.valid) {
      console.log('Login enviado:', this.loginForm.value);
      const { email, senha } = this.loginForm.value;

      this.authService.login(email, senha).subscribe({
        next: (usuario) => {
          console.log('Login bem-sucedido!', usuario);
          this.authService.salvarUsuarioLocal(usuario);
          this.usuarioService.setUsuario(usuario);
          this.router.navigate(['/']);
        },
        error: () => {
          this.erroMensagem = 'Credenciais inválidas!';
          console.error('Erro no login');
        }
      });
    } else {
      this.erroMensagem = 'Preencha todos os campos corretamente!';
    }
  }

  voltarInicio(): void {
    this.router.navigate(['/']);
  }
}
