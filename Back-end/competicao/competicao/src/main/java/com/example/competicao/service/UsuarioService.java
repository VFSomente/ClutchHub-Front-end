package com.example.competicao.service;

import com.example.competicao.model.Usuario;
import com.example.competicao.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class UsuarioService {

  private final UsuarioRepository usuarioRepository;

  public Usuario buscarUsuarioPorEmail(String email) {
    log.info(email);
    return usuarioRepository.findByEmail(email);
  }
}
