package com.example.competicao.controller;

import com.example.competicao.model.Times;
import com.example.competicao.model.Usuario;
import com.example.competicao.repository.TimesRepository;
import com.example.competicao.repository.UsuarioRepository;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("geralcontroller")
public class GeralController {

  private final TimesRepository timesRepository;
  private final UsuarioRepository usuarioRepository;

  @Autowired
  public GeralController(
    @NonNull TimesRepository timesRepository,
    @NonNull UsuarioRepository usuarioRepository) {
    this.timesRepository = timesRepository;
    this.usuarioRepository = usuarioRepository;
  }



  @PostMapping("/times")
  public Times salvarTimes(@RequestBody Times times) {
    System.out.println("Time salvo: " + times);
    timesRepository.save(times);

    return times;
  }

  @PostMapping("/usuario")
  public Usuario salvarUsuario(@RequestBody Usuario usuario) {
    System.out.println("Usuário salvo: " + usuario);


    usuarioRepository.save(usuario);

    return usuario;
  }

  @GetMapping("/times/{id}")
  public Times obterPorIdTimes(@PathVariable("id") Long id) {
    return timesRepository.findById(id).orElse(null);
  }


  @GetMapping("/usuario/{id}")
  public Usuario obterPorIdUsuario(@PathVariable("id") Long id) {
    return usuarioRepository.findById(id).orElse(null);
  }

  @DeleteMapping("{email}")
  public void deletar(@PathVariable("email") String email) {
    usuarioRepository.deleteByEmail(email);
  }

  @PutMapping("/times{id}")
  public void atualizar(@PathVariable("id") Long id, @RequestBody Times times) {
    timesRepository.save(times);
  }

  @PutMapping("usuario/{id}")
  public void atualizarUsuario(@PathVariable("id") Long id, @RequestBody Usuario usuario) {

   
    usuarioRepository.save(usuario);
  }

  @GetMapping("/usuario/nickname")
  public List<Usuario> buscarUsuario(@RequestParam String nickname) {
    return usuarioRepository.findByNickname(nickname);
  }

  @DeleteMapping("/usuario/email/{email}")
  public void deletarEmail(@PathVariable("email") String email) {
    System.out.println("Deletando usuário com email: " + email);
    usuarioRepository.deleteByEmail(email);
  }

  @GetMapping("/usuario/email/{email}")
  public ResponseEntity<Usuario> buscarUsuarioPorEmail(@RequestParam String email) {
    return usuarioRepository.findByEmail(email)
      .map(ResponseEntity::ok)
      .orElseGet(() -> ResponseEntity.notFound().build());
  }
}

