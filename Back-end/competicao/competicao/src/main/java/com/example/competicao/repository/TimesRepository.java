package com.example.competicao.repository;

import com.example.competicao.model.Times;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TimesRepository extends JpaRepository<Times, Long> {
}
