package com.example.competicao.controller;

import com.example.competicao.model.Times;
import com.example.competicao.model.Usuario;
import com.example.competicao.repository.TimesRepository;
import com.example.competicao.repository.UsuarioRepository;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
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

  private String gerarIdNumerico() {
    Random random = new Random();
    long numero = 1000000000L + (long) (random.nextDouble() * 9000000000L);
    return String.valueOf(numero);
  }

  @PostMapping("/times")
  public Times salvarTimes(@RequestBody Times times) {
    System.out.println("Time salvo: " + times);
    times.setId(gerarIdNumerico());
    timesRepository.save(times);

    return times;
  }

  @PostMapping("/usuario")
  public Usuario salvarUsuario(@RequestBody Usuario usuario) {
    System.out.println("Usuário salvo: " + usuario);
    usuario.setId(gerarIdNumerico());

    usuarioRepository.save(usuario);

    return usuario;
  }

  @GetMapping("/times/{id}")
  public Times obterPorIdTimes(@PathVariable("id") String id) {
    return timesRepository.findById(id).orElse(null);
  }


  @GetMapping("/usuario/{id}")
  public Usuario obterPorIdUsuario(@PathVariable("id") String id) {
    return usuarioRepository.findById(id).orElse(null);
  }

  @DeleteMapping("{email}")
  public void deletar(@PathVariable("email") String email) {
    usuarioRepository.deleteByEmail(email);
  }

  @PutMapping("/times{id}")
  public void atualizar(@PathVariable("id") String id, @RequestBody Times times) {
    times.setId(id);
    timesRepository.save(times);
  }

  @PutMapping("usuario/{id}")
  public void atualizarUsuario(@PathVariable("id") String id, @RequestBody Usuario usuario) {

    usuario.setId(id);
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

  @GetMapping("/usuario/email")
  public Usuario buscarUsuarioPorEmail(@RequestParam String email) {
    System.out.println("Buscando usuário pelo email: " + email);

    Optional<Usuario> usuarioOpt = usuarioRepository.findFirstByEmail(email);

    if (usuarioOpt.isPresent()) {
      Usuario usuario = usuarioOpt.get();
      System.out.println("Usuário encontrado: " + usuario);
      return usuario;
    } else {
      System.out.println("Nenhum usuário encontrado para o email: " + email.trim());
      return null;
    }

  }
}

