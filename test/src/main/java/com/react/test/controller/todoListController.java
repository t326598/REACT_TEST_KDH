package com.react.test.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageInfo;
import com.react.test.domain.Pagination;
import com.react.test.domain.Todos;
import com.react.test.service.todoListService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/todos")
@CrossOrigin("*") 

@RestController
public class todoListController {

    
    @Autowired
    private todoListService todolistService;

    @GetMapping()
    public ResponseEntity<?> getAlltodo(
        @RequestParam(value = "page", defaultValue = "1", required = false) int page,
        @RequestParam(value = "size", defaultValue = "10", required = false) int size
    ) {
        try {
            log.info("todos 넘어옴?");
            PageInfo<Todos> todosList = todolistService.list(page, size); 
            Pagination pagination = new Pagination();
            pagination.setPage(page);
            pagination.setSize(size);
            pagination.setTotal(todosList.getTotal());
            List<Todos> list = todosList.getList();
            Map<String, Object> response = new HashMap<>();
            response.put("list", list);
            response.put("pagination", pagination);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id")  String id) {
        try {
            Todos todos = todolistService.selectById(id);
            return new ResponseEntity<>(todos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

  
    @PostMapping()
    public ResponseEntity<?> create(@RequestBody Todos todos) {
        try {
            boolean result = todolistService.insert(todos);
            if (result) {

                return new ResponseEntity<>("SUCCESS", HttpStatus.CREATED);
            }
            else return new ResponseEntity<>("FAIL",HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping()
    public ResponseEntity<?> update(@RequestBody Todos todos) {
        try {
            
            String id = todos.getId();
            boolean result = false;
            if(id == null){
            result = todolistService.updateAll();
        }
            else {result = todolistService.updateById(todos);
            }
            
            if (result) {

                return new ResponseEntity<>("SUCCESS", HttpStatus.CREATED);
            }
            else return new ResponseEntity<>("FAIL",HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @PutMapping("/updateAll")
    // public ResponseEntity<?> updateAll() {
    //         boolean result = todolistService.updateAll();
    //         log.info(result + "이거 찍힘?");
    //         if (result) {
                
    //             return new ResponseEntity<>("SUCCESS", HttpStatus.CREATED);
    //         }
    //         else {

    //             return new ResponseEntity<>("FAIL",HttpStatus.BAD_REQUEST);
    //         }
    // }
    
    @DeleteMapping({"", "/{id}"})
    public ResponseEntity<?> destroy(@PathVariable(value = "id", required = false) String id) {
        try {
            boolean result = false;
            if( id == null){
                result = todolistService.deleteAll();
            }else
                 result = todolistService.deleteById(id);
            if (result) {

                return new ResponseEntity<>("SUCCESS", HttpStatus.CREATED);
            }
            else return new ResponseEntity<>("FAIL",HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // @DeleteMapping("")
    // public ResponseEntity<?> destroyAll() {
    //     try {
    //         boolean result = todolistService.deleteAll();
    //         if (result) {

    //             return new ResponseEntity<>("SUCCESS", HttpStatus.CREATED);
    //         }
    //         else return new ResponseEntity<>("FAIL",HttpStatus.BAD_REQUEST);
    //     } catch (Exception e) {
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    


    
}
