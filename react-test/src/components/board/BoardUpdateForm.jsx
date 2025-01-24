import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './css/BoardUpdateForm.module.css'
import * as format from '../../utils/format'
import ClearIcon from '@mui/icons-material/Clear';
import Checkbox from '@mui/material/Checkbox';
import DownloadIcon from '@mui/icons-material/Download';


const BoardUpdateForm = ({ board, onUpdate, onDelete,onDeleteFile, fileList, onDownload, deleteChckedFiles, mFile }) => {

  const { id } = useParams()

  // 🧊 state 선언
  const [title, setTitle] = useState('')
  const [writer, setWriter] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState(null) // files state 추가
  const [mainFile, setMainFile] = useState(null) // mainfiles state 추가
  const [fileIdList, setFileIdList] = useState([])

  const changeTitle = (e) => { setTitle( e.target.value ) }
  const changeWriter = (e) => { setWriter( e.target.value ) }
  const changeContent = (e) => { setContent( e.target.value ) }

  // 파일 변경 이벤트 핸들러 추가
  const changeFile = (e) =>{
    setFiles(e.target.files)
    
  }

  const changeMainFile =(e) =>{
    setMainFile(e.target.files[0])
  }

  const onSubmit = () => {
    const formData = new FormData()

    formData.append('id', id)               //
    formData.append('title', title)
    formData.append('writer', writer)
    formData.append('content', content)

    if(mainFile){
      formData.append('mainFile', mainFile)
    }

    // 파일 데이터 세팅
    if( files ){
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append('files', file)
      }
    }

    // 헤더
    const headers = {
      'Content-Type' : 'multipart/form-data'
    }
 // onUpdate(title, writer, content) application/json
    onUpdate(formData, headers) //'multipart/form-data'

  }

  const handleDelete = () => {
    const check = window.confirm('정말로 삭제하시겠습니까?')
    if( check )
        onDelete(id)
  }

  const handleFileDelete = (id) => {
    const check = window.confirm('파일을 삭제하시겠습니까?')
    if(check)
      onDeleteFile(id)

  }

  const handleCheckedFileDelete = () => {
    const check = window.confirm(`선택한 ${fileIdList.length}개 파일을 삭제하시겠습니까?`)
    if(check)
      deleteChckedFiles(fileIdList)
      setFileIdList([]) // 삭제할 id 리스트 초기화

  }

  // 채크박스 클릭 핸들러
  const checkFileId = (id) => {

    let checked = false
    console.log(`아이디 : ${id}`)

    // 체크 여부 확인
    for (let i = 0; i < fileIdList.length; i++) {
      const fileId = fileIdList[i];
      // 체크 : 체크박스 해제 -> 제거
      if(fileId == id){
        fileIdList.splice(i, 1)
      checked = true
    }
    }
    //  체크가 안된 값: 체크박스 지정
    if(!checked){
      // 체크한 아이디 추가
      fileIdList.push(id)
    }
    console.log(`체크한 아이디: ${fileIdList}`);
    setFileIdList(fileIdList)
  }

  useEffect( () => {
    if( board ) {
      setTitle(board.title)
      setWriter(board.writer)
      setContent(board.content)
    }
  }, [board])

  return (
    <div className="container">
      <h1 className='title'>게시글 수정</h1>
      {/* <h3>id : {id}</h3> */}
      <table className={styles.table}>
        <tbody>
        <tr>
          <th>제목</th>
          <td>
            <input type="text" value={title} onChange={changeTitle} className={styles['form-input']} />
          </td>
        </tr>
        <tr>
          <th>작성자</th>
          <td>
            <input type="text" value={writer} onChange={changeWriter} className={styles['form-input']} />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <textarea cols={40} rows={10} value={content}
                      onChange={changeContent}
                      className={styles['form-input']}></textarea>
          </td>
        </tr>

          {
            !mFile ?(
        <tr>
            

          <td>대표 파일</td>
          <td>
            <input type="file" onChange={changeMainFile} />
          </td>
          </tr>
          ):null
        }
        <tr>
          <td>첨부 파일</td>
          <td>
            <input type="file"  multiple onChange={changeFile} />
          </td>
        </tr>

         <tr>
                    <td colSpan={2}>
                    {
                      fileList.map((file) => (
                      
                      <div className='flex-box' key={file.id}>
                        {/* <input type="checkbox" onClick={() => checkFileId(file.id)} /> */}
                        <Checkbox onChange={() => checkFileId(file.id)}/>
                        <div className='item'> 
                        <div className='item-img'>
                    {file.type == 'MAIN' && <span className='badge'>대표</span>}
                  <img src={`/api/files/img/${file.id}`} className='file-img' alt={file.originName} />
                  {/* 썸네일 이미지 */}
                  </div>
                          {/* 썸네일 이미지 */}
                        <span>{file.originName} ({format.byteTounit( file.fileSize)})</span>
                        </div>
                        <div className='item'>
                        <button className='btn' onClick={ () => onDownload(file.id, file.originName)}><DownloadIcon/></button>
                        <button className='btn' onClick={() => onDeleteFile(file.id)} ><ClearIcon/></button>
                        </div>
                      </div>
                      ))
                   }
        
                    </td>
                  </tr>
                  </tbody>
      </table>
      <div className="btn-box">
        <div>
          <Link to="/boards" className="btn">목록</Link>
          <button className='btn' onClick={handleCheckedFileDelete}>선택 삭제</button>
        </div>
        <div>
          <button onClick={onSubmit} className='btn'>수정</button>
          <button onClick={handleDelete} className='btn'>삭제</button>
        </div>
      </div>
    </div>
  )
}

export default BoardUpdateForm