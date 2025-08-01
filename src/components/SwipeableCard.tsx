/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from 'react'
import styled from '@emotion/styled'

const Card = styled.div`
  transition: transform 0.3s ease, opacity 0.3s ease;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  touch-action: pan-y;
  opacity: ${(props) => (props.dismissed ? 0 : 1)};
`

const SwipeableCard = ({ onSwipeLeft, children }) => {
  const startX = useRef(0)
  const [translateX, setTranslateX] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX
    setIsSwiping(true)
  }

  const handleTouchMove = (e) => {
    if (!isSwiping) return
    const deltaX = e.touches[0].clientX - startX.current
    if (deltaX < 0) setTranslateX(deltaX) // только свайп влево
  }

  const handleTouchEnd = () => {
    setIsSwiping(false)
    if (translateX < -100) {
      setTranslateX(-window.innerWidth) // уводим влево
      setDismissed(true)
      onSwipeLeft?.()
    } else {
      setTranslateX(0) // возвращаем
    }
  }

  return (
    <Card
      dismissed={dismissed}
      style={{ transform: `translateX(${translateX}px)` }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </Card>
  )
}

export default SwipeableCard
