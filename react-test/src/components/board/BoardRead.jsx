import React from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './css/BoardRead.module.css'
import * as format from '../../utils/format'


const BoardRead = ({ board,mainFile, fileList, onDownload }) => {

  const { id } = useParams()

  return (
    <div className="container">
      <h1 className='title'>게시글 조회</h1>

    <div>
      {
        mainFile
         ?
        // &&
    <img src={`/api/files/img/${mainFile?.id}`} className='file-img' alt={mainFile?.originName} />
        :
        // :
        <></>
        // <span>파일없음</span>
  }
    </div>

      {/* <h3>id : {id}</h3> */}
      <table className={styles.table}>
        <tbody>
        <tr>
          <th>제목</th>
          {/* 
          vlaue vs defaultValue

          - Controllered Component (상태관리 하는 컴포넌트)
            * 상태들이 변경되면 UI에 업데이트
            * value 값의 변경을 UI 업데이트 가능

          - Uncontrollered Component (상태관리를 하지않는 컴포넌트)
            * 상태 변경 감지 안 함 ㅇㅋ
            * defaultValue 값은 초기에만 세팅
          */}
          <td>
            <input type="text" defaultValue={board.title ?? ''} readOnly className={styles['form-input']} />
          </td>
        </tr>
        <tr>
          <th>작성자</th>
          <td>
            <input type="text" defaultValue={board.writer ?? ''} readOnly className={styles['form-input']} />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <textarea cols={40} rows={10} defaultValue={board.content ?? ''} readOnly className={styles['form-input']}></textarea>
          </td>
        </tr>

          <tr>
            <td colSpan={2}>
            {
              fileList.map((file) => (
              <div className='flex-box' key={file.id}>
                <div className='item'> 
                  <div className='item-img'>
                    {file.type == 'MAIN' && <span className='badge'>대표</span>}
                  <img src={`/api/files/img/${file.id}`} className='file-img' alt={file.originName} />
                  {/* 썸네일 이미지 */}
                  </div>
                <span>{file.originName} ({format.byteTounit( file.fileSize)})</span>
                </div>
                <div className='item'>
                <button className='btn' onClick={ () => onDownload(file.id, file.originName)}>다운로드</button>
                </div>
              </div>
              ))
           }

            </td>
          </tr>

        </tbody>
      </table>
      <div className="btn-box">
        <Link to="/boards" className="btn">목록</Link>
        <Link to={`/boards/update/${id}`} className="btn">수정</Link>
      </div>
    </div>
  )
}

export default BoardRead