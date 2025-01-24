import React from 'react'

const TodoFooter = ({ onRemoveAll, onUpdate}) => {
  return (
    <div className='footer'>
        <div className='item'>
            <button className='btn' onClick={onRemoveAll}> 전체삭제</button>
        </div>
        <div className='item'>
            <button className='btn'  onClick={onUpdate} >전체완료</button>
        </div>
    </div>
  )
}

export default TodoFooter