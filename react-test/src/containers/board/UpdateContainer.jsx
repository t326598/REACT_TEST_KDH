import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as boards from '../../apis/boards'
import * as files from '../../apis/files'
import BoardUpdateForm from '../../components/board/BoardUpdateForm'


const UpdateContainer = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  // 🧊 state
  const [board, setBoard] = useState({})
    const [fileList, setFileList] = useState([])
      const [mainFile, setMainFile] = useState()

  // 게시글 데이터 요청
  const getBoard = async () => {
    const response = await boards.select(id)
    const data = await response.data
    setBoard(data.board)
    setFileList(data.fileList)

    const no = await data.board.no
    getMainFile(no)
  }


  // 다운로드
  const onDownload = async (id, fileName) => {
    // API 요청
    const response = await files.download(id)
    console.log(response);

    // 1. 서버에서 응답 파일 데이터를 Blob으로 변환
    // 2. 브라우저를 통해 a태그로 등록
    // 3. a태그의 다운로드 기능으로 요청
    const url = window.URL.createObjectURL(new Blob([response.data]))
    //  <a href="data" download="파일명.png"></a>
    const link = document.createElement('a') // a태그 생성
    link.href = url
    link.setAttribute('download', fileName);
    document.body.appendChild(link)
    link.click()                    // 다운로드 기능을 가진 a태그 클릭
    document.body.removeChild(link)
  }



  // 게시글 수정 요청 이벤트 핸들러
  const onUpdate = async (formData, headers) => {
    try {
      const response = await boards.update(formData, headers)
      const data = await response.data
      console.log(data);
      alert('수정 완료')
      // 게시글 목록으로 이동
      navigate('/boards')      
      
    } catch (error) {
      console.log(error);
      
    }
  }

  // 게시글 삭제 요청 이벤트 핸들러
  const onDelete = async (id) => {
    try {
      const response = await boards.remove(id)
      const data = await response.data
      console.log(data);
      alert('삭제 완료')
      // 게시글 목록으로 이동
      navigate('/boards')      
      
    } catch (error) {
      console.log(error);
      
    }
  }

 const onDeleteFile = async (fileid) => {
    try {
      const response = await files.remove(fileid)
      console.log(response);
      alert('파일 삭제 완료')

      // 파일 목록 갱신
      const boardResponse = await boards.select(id)
      const data = boardResponse.data
      const fileList = data.fileList
      setFileList(fileList)

 
        setMainFile();
      

    } catch(error){
      console.log(error);
    }
    }

    // 선택 삭제 요청
    const deleteChckedFiles = async (idList) => {
      const fileIdList = idList.join(",")
      console.log(fileIdList);

      try{
        // 파일 선택 삭제 요청
        const response = await files.removeFiles(fileIdList)
        console.log(response.data)

            // 파일 목록 갱신
        const boardResponse = await boards.select(id)
        const data = boardResponse.data
        const fileList = data.fileList
        setFileList(fileList)

        setMainFile();
       

      }catch(error){
        console.log(error);
      }
    }

    // 메인 파일 조회
    const getMainFile = async (no) => {
      const response = await files.fileByType("boards", no, "MAIN")
      const file = await response.data
      setMainFile(file)
    
    }

  useEffect( () => {
    getBoard()
  }, [])

  return (
    <>
      <BoardUpdateForm  board={board}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        fileList = {fileList} 
                        onDownload={onDownload}
                        onDeleteFile ={onDeleteFile}
                        deleteChckedFiles ={deleteChckedFiles}
                        mFile = {mainFile}
                        />
    </>

  )
}

export default UpdateContainer