package com.react.test.service;

import com.github.pagehelper.PageInfo;
import com.react.test.domain.Todos;


public interface todoListService extends BaseService<Todos> {

    public PageInfo<Todos> list(int page, int size);
    
    public boolean deleteAll();
    
    public boolean updateAll();

}
