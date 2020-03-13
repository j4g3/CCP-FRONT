import React, { useEffect, useState } from 'react'
function ReadMore({ textaa }) {
  const [text, setText] = useState('')
  useEffect(() => {
    const textFor = textaa.substring(0, 60)
    setText(textFor)
  }, [textaa])
  useEffect(() => {
    console.log(text)
  })
  return (
    <>
      <p>{text}...</p>
    </>
  )
}

export default ReadMore;