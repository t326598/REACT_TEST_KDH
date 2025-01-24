import React, { useEffect, useState } from 'react'
import TodoHeader from './TodoHeader'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import TodoFooter from './TodoFooter'
import { Link } from 'react-router-dom'

const TodoContainer = () => {

  // state
  const [todoList, settodoList] = useState([])

  const [input, setInput] = useState('')
  // 이벤트 함수
  // 체크체크체크체크박스 토글 함수

  const onRemove = async (id) => {  
    const option = {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json'
      }
    }

    try{
      const url = `http://localhost:8080/todos/${id}`
      const response = await fetch(url, option)
      console.log({response});
    } catch(error){
      console.log(error);

    }
    getList()
 
  }

  const onRemoveAll = async () => {  
    const option = {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json'
      }
    }

    try{
      const url = `http://localhost:8080/todos`
      const response = await fetch(url, option)
      console.log({response});
    } catch(error){
      console.log(error);

    }
    getList()
 
  }


  // 클라이언트에서 status 변경
  // const newTodoList = todoList.map((item) => {
  //   return item.id == todo.id ? {...item, status: !item.status } : item;
  // })
  
  // // 클라이언트에서 sort 정렬
  //   newTodoList.sort( (a, b) => {
  //     return a.status == b.status ? a.seq - b.seq : (a.status ? 1 : -1)
  //   })

  // 상태 수정 요청

  const onToggle = async (todo) => {

    const data = {
      ...todo,
      status: !todo.status
    }
    const option = {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    }

    try{
      const url = 'http://localhost:8080/todos'
      const response = await fetch(url, option)
      console.log({response});
    } catch(error){
      console.log(error);

    }
    getList()
    // state 업데이트
    // settodoList(newTodoList)
    
    // 서버로부터 할 일 목록 요청
    
    
  }
  // 전체 완료
  const onUpdate = async () => {
    const option = {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({"id" : null})
    }

  try {
    const url = 'http://localhost:8080/todos';
    console.log(url, "이거 찍힘");
    const response = await fetch(url, option);
    const result = await response.text();
    console.log('Response:', result);

    if (response.ok) {
      console.log('Update successful');
    } else {
      console.error('Update failed', response.status);
    }
  } catch (error) {``
    console.error('Error during request:', error);
  }
  getList();
};

const getList = () => {
    // 할일 목록 요청
    fetch('http://localhost:8080/todos')
    .then(response =>  response.json() )
    .then(data =>  {
      settodoList(data.list)
     
    })
    .catch(error => {console.error('Request failed:', error) });
}

// 할 일 입력 변경 이벤트 함수
  const onChange = (e) => {
    console.log(e.target.value);
    setInput(e.target.value)
  }

  const onSubmit = async (e) =>{
    e.preventDefault(); // 기본 이벤트 동작 방지
     let name = '제목 없음'
    if(input != null && input != '') name = input


    // 데이터 등록 요청
    const data = { 
      name : name,
      seq : 1
    }
    const option = {
      method : 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
    body: JSON.stringify(data)
  }
  try{
    const url = 'http://localhost:8080/todos'
    const response = await fetch(url, option)
    const msg = await response.text()
  } catch(error){
    console.log(error)
  }
getList()
setInput('')
}

  useEffect(() => {
   getList()
  }, [])
  

  //전체 완료

  return (
    
    <div className='todos'>
      <div className='container'>
        <Link to='/boards' style={{marginRight:"30px" }}>게시판이동</Link>
          <Link to='/'>메인으로이동</Link>
        <TodoHeader/>
        <TodoInput onChange={onChange} input={input} onSubmit={onSubmit}/>
        <TodoList todoList={todoList} onToggle={onToggle} onRemove={onRemove} />
        <TodoFooter onRemoveAll={onRemoveAll} onUpdate={onUpdate} />
        </div>
    </div>
  )
}

export default TodoContainer