package com.example.competicao.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_Times")
public class Times {
    @Id
    @Column
    private Long id;

    @Column
    private String nomeSigla;

    @Column
    private String pais;

    @Column
    private int dataCriacao;

    @Column
    private String organização;

    @Column
    private String jogadores;


}
