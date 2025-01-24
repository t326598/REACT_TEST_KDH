package com.react.test.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.react.test.domain.Todos;

@Mapper
public interface todoListMapper extends BaseMapper<Todos> {
    
    public int deleteAll();
    
    public int updateAll();

}
