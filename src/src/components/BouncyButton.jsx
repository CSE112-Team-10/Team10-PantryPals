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
      const hover_area = (hover ? 0.7 : 0.5);
      const mouse_x = e.clientX;
      const mouse_y = e.clientY;
      const distance = Math.sqrt((mouse_x - x) ** 2 + (mouse_y - y) ** 2);

      if (distance < (width * hover_area)) {
        if (!hover) {
          setHover(true);
        }
        onHover(mouse_x, mouse_y);
      } else {
        if (hover) {
          setHover(false);
          onLeave();
        }
      }
    };

    const onHover = (mouse_x, mouse_y) => {
      gsap.to(el, {
        x: (mouse_x - x) * 0.4,
        y: (mouse_y - y) * 0.4,
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