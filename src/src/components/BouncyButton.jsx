import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const BouncyButton = ({ children, className, onClick }) => {
  const element = useRef(null);
  const [hover, setHover] = useState(false);
  const [first_time_loading, set_first_time_loading] = useState(true)
  let x, y, width, height;

  useEffect(() => {
    const el = element.current;

    const calculatePosition = () => {
      gsap.set(el, {
        x: 0,
        y: 0,
        scale: 1
      });
      const box = el.getBoundingClientRect();
      x = box.left + (box.width * 0.5);
      y = box.top + (box.height * 0.5);
      width = box.width;
      height = box.height;
    };

    const onMouseMove = (e) => {
      const hoverArea = (hover ? 0.7 : 0.5);
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);

      if (distance < (width * hoverArea)) {
        if (!hover) {
          setHover(true);
        }
        onHover(mouseX, mouseY);
      } else {
        if (hover) {
          setHover(false);
          onLeave();
        }
      }
    };

    const onHover = (mouseX, mouseY) => {
      gsap.to(el, {
        x: (mouseX - x) * 0.4,
        y: (mouseY - y) * 0.4,
        scale: 1.15,
        ease: 'power2.out',
        duration: 0.4
      });
      el.style.zIndex = 10;
    };

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        scale: 1,
        ease: 'elastic.out(1.2, 0.4)',
        duration: 0.7
      });
      el.style.zIndex = 1;
    };

    if(first_time_loading) {
      setTimeout(() => {
        calculatePosition();
        set_first_time_loading(false)
      }, 260)
    } else {
      calculatePosition();
    }
      
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', calculatePosition);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [hover]);

  return (
    <div ref={element} className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export default BouncyButton;