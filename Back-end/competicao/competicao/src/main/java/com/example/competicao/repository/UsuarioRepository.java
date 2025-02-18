package com.example.competicao.repository;


import org.springframework.data.jpa.repository.Modifying;
import com.example.competicao.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;


public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    List<Usuario> findByNickname(String nickname);

//    Optional<Usuario> findByEmail(@Param("email") String email);

//      Optional<Usuario> findByEmail(String email);

    Usuario findByEmail(String email);

    @Modifying
    @Transactional
    void deleteByEmail(String email);

}
