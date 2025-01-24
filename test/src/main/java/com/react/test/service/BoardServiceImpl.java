package com.react.test.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.react.test.domain.Boards;
import com.react.test.domain.Files;
import com.react.test.mapper.BoardMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BoardServiceImpl implements BoardService {

    @Autowired BoardMapper boardMapper;

    @Autowired FileService fileService;

    @Override
    public List<Boards> list() {
        return boardMapper.list();
    }

    @Override
    public Boards select(Long no) {
        return boardMapper.select(no);
    }

    @Override
    public Boards selectById(String id) {
        return boardMapper.selectById(id);
    }

    @Override
    @Transactional
    public boolean insert(Boards entity) {
        // 게시글 등록
        int result = boardMapper.insert(entity);
        result += upload(entity);
        return result > 0;
    }

    // 파일 업로드

    public int upload(Boards entity){
        int result = 0;
          // 파일 업로드
          String pTable = "boards";
          Long pNo = entity.getNo();      // 🎈
  
          List<Files> uploadFileList = new ArrayList<>();
  
          MultipartFile mainFile = entity.getMainFile();
          if( mainFile != null && !mainFile.isEmpty() ){
              Files mainFileInfo = new Files();
              mainFileInfo.setPTable(pTable);
              mainFileInfo.setPNo(pNo);
              mainFileInfo.setData(mainFile);
              mainFileInfo.setType("MAIN");
              uploadFileList.add(mainFileInfo);
          }
  
          List<MultipartFile> files = entity.getFiles();
          if( files != null && !files.isEmpty() ) {
              for (MultipartFile multipartFile : files) {
                  if( multipartFile.isEmpty() )
                      continue;
                  Files fileInfo = new Files();
                  fileInfo.setPTable(pTable);
                  fileInfo.setPNo(pNo);
                  fileInfo.setData(multipartFile);
                  fileInfo.setType("SUB");
                  uploadFileList.add(fileInfo);
              }
          }
          try {
              result += fileService.upload(uploadFileList);
          } catch (Exception e) {
              log.error("게시글 파일 업로드 중 에러 발생");
              e.printStackTrace();
          }
                  return result;
    }

    @Override
    public boolean update(Boards entity) {
        int result = boardMapper.update(entity);
        
        result += upload(entity);

        return result > 0;
    }

    @Override
    public boolean updateById(Boards entity) {
            Boards board = boardMapper.selectById(entity.getId());
            entity.setNo(board.getNo());
           int result = boardMapper.updateById(entity);
        
        result += upload(entity);
        
        return result > 0;
    }

    @Override
    public boolean delete(Long no) {
        boolean result =  boardMapper.delete(no) > 0;

        Files file = new Files();
        file.setPTable("boards");
        file.setPNo(no);

        int deltedCount = fileService.deleteByParent(file);
        
        log.info(deltedCount + "개의 파일이 삭제되었습니다.");

        return result;


    }

    @Override
    public boolean deleteById(String id) {
        Boards board = boardMapper.selectById(id);
        Long no = board.getNo();

        boolean result = boardMapper.deleteById(id) > 0;

        Files file = new Files();
        file.setPTable("boards");
        file.setPNo(no);

        int deltedCount = fileService.deleteByParent(file);
        log.info(deltedCount + "개의 파일이 삭제되었습니다.");

        return result;
    }

    @Override
    public PageInfo<Boards> list(int page, int size) {
        PageHelper.startPage(page, size);
        List<Boards> list = boardMapper.list();
        PageInfo<Boards> pageInfo = new PageInfo<>(list);
        return pageInfo;
    }


    
}
