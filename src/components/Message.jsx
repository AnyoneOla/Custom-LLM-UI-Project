import React from 'react';

function Message({ message }) {
  return (
    <div className={`message ${message.sender}`}>
        {
            (message.sender==='bot' && <div style={{fontSize:'12px', color:'#9B9B9B'}}>
                                            Ollama:
                                        </div>)
        }
        
        <div>
            <p>{message.text}</p>
        </div>
    </div>
    
  );
}

export default Message;
