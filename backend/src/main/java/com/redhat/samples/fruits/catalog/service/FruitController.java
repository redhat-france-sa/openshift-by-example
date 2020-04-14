/*
 * MIT License

 * Copyright (c) 2020 RH France Solution Architects

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
package com.redhat.samples.fruits.catalog.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.micrometer.core.annotation.Timed;

import com.redhat.samples.fruits.catalog.domain.Fruit;
import com.redhat.samples.fruits.catalog.repository.FruitRepository;

/**
 * A Spring REST Controller for exposing an API for managing fruits.
 */
@RestController
public class FruitController {

    @Autowired
    private FruitRepository repository;

    @RequestMapping(value = "/api/fruits", method = RequestMethod.GET)
    public List<Fruit> listFruits() {
        return repository.findAll();
    }

    @RequestMapping(value = "/api/fruits", method = RequestMethod.POST)
    public ResponseEntity<Fruit> createFruit(@RequestBody Fruit fruit) {
        return new ResponseEntity<>(repository.save(fruit), HttpStatus.CREATED);
    }
}