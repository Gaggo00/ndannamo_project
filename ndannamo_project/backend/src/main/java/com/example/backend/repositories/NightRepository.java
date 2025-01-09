package com.example.backend.repositories;

import com.example.backend.model.Night;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NightRepository extends JpaRepository<Night, Long> {

    Optional<Night> findById(Long id);
}
