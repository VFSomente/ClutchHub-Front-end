package com.example.competicao.repository;


import org.springframework.data.jpa.repository.Modifying;
import com.example.competicao.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, String> {
    List<Usuario> findByNickname(String nickname);

  @Query("SELECT u FROM Usuario u WHERE LOWER(u.email) = LOWER(:email)")
  Optional<Usuario> findFirstByEmail(@Param("email") String email);

    @Modifying
    @Transactional
    void deleteByEmail(String email);

}
