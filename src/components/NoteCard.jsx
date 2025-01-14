import {useRef, useEffect, useState} from 'react'
import Trash from '../icons/trash';
const noteCard = ({note}) => {
    const body =JSON.parse (note.body);
    const [position, setPosition] = useState(JSON.parse(note.position));
    const colors =JSON.parse ( note.colors);

    let mouseStartPos = { x: 0, y: 0 };
    const cardRef = useRef(null);

    const textAreaRef =useRef(null);

    useEffect(() => {
      autoGrow(textAreaRef);
    }
    ,[])

    const autoGrow = (textarea) => {
      const {current} = textAreaRef
      current.style.height= "auto";
      current.style.height = `${current.scrollHeight}px`;
    }

    const mouseDown = (e) => {
      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;
   
      document.addEventListener("mousemove", mouseMove);
  };
  const mouseMove = (e) => {
    //1 - Calculate move direction
    let mouseMoveDir = {
        x: mouseStartPos.x - e.clientX,
        y: mouseStartPos.y - e.clientY,
    };
    console.log("mouse", mouseMoveDir)
    //2 - Update start position for next move.
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;
 
    //3 - Update card top and left position.
    setPosition({
        x: cardRef.current.offsetLeft - mouseMoveDir.x,
        y: cardRef.current.offsetTop - mouseMoveDir.y,
    });
  };

  return (
    <div 
    ref ={cardRef}
      className="card" 
      style ={{ backgroundColor : colors.colorBody,
        left : `${position.x}px`,
        top : `${position.y}px`,
      }}
    >
    <div 
    onMouseDown={mouseDown}
      className="card-header" 
      style ={{backgroundColor:colors.colorHeader}}>
            

    <Trash></Trash>
    </div>
      <div className="card-body">
        <textarea 
          ref ={textAreaRef}
          style={{color: colors.colorText}} 
          defaultValue={body}
          onInput={() => {autoGrow(textAreaRef)}}>
        </textarea>
      </div>
    </div>
  )
}

export default noteCard
