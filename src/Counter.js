import React, { useState, useEffect } from 'react';

function Counter() {
  const [text, setText] = useState(''); // 입력값을 저장하는 상태
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem('myTodoList');
    return storedItems ? JSON.parse(storedItems) : [];
  });

  // items 상태가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('myTodoList', JSON.stringify(items));
  }, [items]);

  const handleChange = (e) => {
    setText(e.target.value); // 입력값 변경될 때마다 상태 업데이트
  };
  const handleAdd = () => {
    if (text.trim() === '') return; // 공백은 추가 안되게

    setItems([...items, text]); // 기존 배열에 새로운 항목 추가
    setText(''); // 입력창 초기화
  };
  const handleDelete = (indexToDelete) => {
    const updatedItems = items.filter((_, index) => index !== indexToDelete);
    setItems(updatedItems);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>✏️ 입력내용을 완전히 수정해보자:</h2>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="여기에 입력하세요"
        style={{ padding: '8px', fontSize: '16px' }}
      />
      <p style={{ marginTop: '20px' }}>💬 {text}</p>
      <button onClick={handleAdd} style={{ marginLeft: '10px' }}>
        추가
      </button>
      <ul style={{ marginTop: '30px', listStyleType: 'none', padding: 0 }}>
        {items.map((item, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            ✅ {item}
            <button
              onClick={() => handleDelete(index)}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Counter;