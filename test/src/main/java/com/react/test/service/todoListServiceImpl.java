package com.react.test.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.react.test.domain.Todos;
import com.react.test.mapper.todoListMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class todoListServiceImpl implements todoListService {

    @Autowired
    private todoListMapper todolistma1pper;

    @Override
    public List<Todos> list() {

        return todolistma1pper.list();
    }

    @Override
    public Todos select(Long no) {
        return todolistma1pper.select(no);
    }

    @Override
    public Todos selectById(String id) {
        return todolistma1pper.selectById(id);
    }

    @Override
    public boolean insert(Todos todos) {

       return todolistma1pper.insert(todos) > 0 ;
    }

    @Override
    public boolean update(Todos todos) {
        return todolistma1pper.update(todos) > 0 ;
    }

    @Override
    public boolean updateById(Todos todos) {
        return todolistma1pper.updateById(todos) > 0 ;
    }

    @Override
    public boolean delete(Long no) {
        return todolistma1pper.delete(no) > 0 ;
    }

    @Override
    public boolean deleteById(String id) {
        return todolistma1pper.deleteById(id) > 0 ;
    }

    @Override
    public PageInfo<Todos> list(int page, int size) {
        PageHelper.startPage(page, size);

        List<Todos> list = todolistma1pper.list();
        PageInfo<Todos> pageInfo = new PageInfo<>(list);

        // status 오름차순
        // seq 기준 오름차순
        pageInfo.getList().sort((t1,t2) ->{
            int statusCompare = t1.getStatus().compareTo(t2.getStatus());
            if(statusCompare != 0){
                return statusCompare;
            }
            return t1.getSeq().compareTo(t2.getSeq());
        });
        
        return pageInfo;
    }

    @Override
    public boolean deleteAll() {
        return todolistma1pper.deleteAll() > 0 ;

    }

    
    @Override
    public boolean updateAll() {
        return todolistma1pper.updateAll() > 0 ;
    }
    
}
