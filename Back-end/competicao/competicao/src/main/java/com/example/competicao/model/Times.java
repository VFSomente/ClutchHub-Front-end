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
    private String id;

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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNomeSigla() {
        return nomeSigla;
    }

    public void setNomeSigla(String nomeSigla) {
        this.nomeSigla = nomeSigla;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public int getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(int dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public String getOrganização() {
        return organização;
    }

    public void setOrganização(String organização) {
        this.organização = organização;
    }

    public String getJogadores() {
        return jogadores;
    }

    public void setJogadores(String jogadores) {
        this.jogadores = jogadores;
    }

    @Override
    public String toString() {
        return "Time{" +
                "id=" + id +
                ", nomeSigla='" + nomeSigla + '\'' +
                ", pais='" + pais + '\'' +
                ", dataCriacao=" + dataCriacao +
                ", organização='" + organização + '\'' +
                ", jogadores='" + jogadores + '\'' +
                '}';
    }
}
